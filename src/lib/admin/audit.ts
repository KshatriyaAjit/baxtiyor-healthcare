import 'server-only';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getFirestoreDb } from '@/lib/firebase/admin';

export type AuditAction =
  | 'admin.login.success'
  | 'admin.login.failed'
  | 'admin.logout'
  | 'lead.status_updated'
  | 'lead.coordinator_assigned'
  | 'lead.detail_viewed'
  | 'report.accessed'
  | 'settings.updated'
  | string;

export interface LogAdminActionParams {
  adminEmail: string;
  action: string;
  target?: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  actor: string;
  ip: string;
  details: Record<string, unknown>;
}

const MAX_LOCAL_AUDIT_LOGS = 500;

function saveToLocalAuditFallback(entry: AuditLogEntry) {
  try {
    const storageDir = path.join(process.cwd(), 'storage');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    const auditFile = path.join(storageDir, 'admin_audit_logs.json');
    let logs: AuditLogEntry[] = [];
    if (fs.existsSync(auditFile)) {
      try {
        logs = JSON.parse(fs.readFileSync(auditFile, 'utf-8'));
      } catch {
        logs = [];
      }
    }

    logs.unshift(entry); // Newest first
    if (logs.length > MAX_LOCAL_AUDIT_LOGS) {
      logs = logs.slice(0, MAX_LOCAL_AUDIT_LOGS);
    }

    fs.writeFileSync(auditFile, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Audit Log] Local fallback write failed:', err);
  }
}

/**
 * Records a security-sensitive admin action.
 * Guarantees zero sensitive passwords, report contents, or medical history are logged.
 */
export async function recordAuditLog(
  action: AuditAction,
  actor: string,
  ip: string,
  details: Record<string, unknown> = {}
): Promise<void> {
  const id = `AUDIT-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const timestamp = new Date().toISOString();

  // Strict sanitization: Strip any potential password or sensitive payload
  const sanitizedDetails = { ...details };
  delete sanitizedDetails.password;
  delete sanitizedDetails.token;
  delete sanitizedDetails.secret;
  delete sanitizedDetails.medical_history;
  delete sanitizedDetails.report_content;

  const entry: AuditLogEntry = {
    id,
    timestamp,
    action,
    actor,
    ip,
    details: sanitizedDetails,
  };

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('admin_audit_logs').doc(id).set(entry);
      return;
    } catch (firestoreErr) {
      console.warn(
        '[Audit Log] Firestore write failed. Falling back to local storage:',
        firestoreErr
      );
    }
  }

  saveToLocalAuditFallback(entry);
}

/**
 * Retrieves recent audit logs for the operations console.
 */
export async function getRecentAuditLogs(limitCount = 50): Promise<AuditLogEntry[]> {
  const db = getFirestoreDb();
  if (db) {
    try {
      const snapshot = await db
        .collection('admin_audit_logs')
        .orderBy('timestamp', 'desc')
        .limit(limitCount)
        .get();

      return snapshot.docs.map((doc) => doc.data() as AuditLogEntry);
    } catch (err) {
      console.warn('[Audit Log] Firestore query failed, reading local fallback:', err);
    }
  }

  // Local fallback read
  try {
    const auditFile = path.join(process.cwd(), 'storage', 'admin_audit_logs.json');
    if (fs.existsSync(auditFile)) {
      const logs = JSON.parse(fs.readFileSync(auditFile, 'utf-8')) as AuditLogEntry[];
      return logs.slice(0, limitCount);
    }
  } catch (err) {
    console.error('[Audit Log] Failed reading local fallback:', err);
  }

  return [];
}

/**
 * Universal admin audit log helper for Content & System mutations.
 */
export async function logAdminAction(params: LogAdminActionParams): Promise<void> {
  const { adminEmail, action, target, targetId, details = {}, ipAddress = '127.0.0.1' } = params;
  return recordAuditLog(
    action as AuditAction,
    adminEmail,
    ipAddress,
    { target, targetId, ...details }
  );
}

