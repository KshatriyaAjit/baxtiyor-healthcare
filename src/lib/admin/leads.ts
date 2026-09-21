import 'server-only';
import fs from 'fs';
import path from 'path';
import { getFirestoreDb } from '@/lib/firebase/admin';
import {
  LEAD_STATUSES,
  LeadStatus,
  StatusHistoryItem,
  AdminLead,
} from '@/types/admin';

export { LEAD_STATUSES };
export type { LeadStatus, StatusHistoryItem, AdminLead };

function getLocalLeadsFilePath(): string {
  return path.join(process.cwd(), 'storage', 'leads.json');
}

function readLocalLeads(): AdminLead[] {
  try {
    const filePath = getLocalLeadsFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[Leads Storage] Failed reading local leads:', err);
    return [];
  }
}

function writeLocalLeads(leads: AdminLead[]): boolean {
  try {
    const filePath = getLocalLeadsFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Leads Storage] Failed writing local leads:', err);
    return false;
  }
}

/**
 * Retrieves all leads from Firestore or local fallback storage.
 */
export async function getAllLeads(): Promise<AdminLead[]> {
  const db = getFirestoreDb();
  if (db) {
    try {
      const snapshot = await db
        .collection('leads')
        .orderBy('created_at', 'desc')
        .get();

      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => doc.data() as AdminLead);
      }
    } catch (firestoreErr) {
      console.warn(
        '[Leads Storage] Firestore read failed, using local storage:',
        firestoreErr
      );
    }
  }

  // Fallback to local storage
  const localLeads = readLocalLeads();
  // Sort descending by created_at
  return localLeads.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Retrieves a single lead by its lead_id.
 */
export async function getLeadById(leadId: string): Promise<AdminLead | null> {
  const db = getFirestoreDb();
  if (db) {
    try {
      const doc = await db.collection('leads').doc(leadId).get();
      if (doc.exists) {
        return doc.data() as AdminLead;
      }
    } catch (firestoreErr) {
      console.warn(
        `[Leads Storage] Firestore getLeadById failed for ${leadId}:`,
        firestoreErr
      );
    }
  }

  const localLeads = readLocalLeads();
  return localLeads.find((l) => l.lead_id === leadId) || null;
}

/**
 * Updates a lead's status and records status transition history.
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus,
  updatedBy: string
): Promise<AdminLead | null> {
  const now = new Date().toISOString();
  let updatedLead: AdminLead | null = null;

  const currentLead = await getLeadById(leadId);
  if (!currentLead) {
    return null;
  }

  const historyItem: StatusHistoryItem = {
    from: currentLead.status,
    to: newStatus,
    timestamp: now,
    updated_by: updatedBy,
  };

  const newHistory = [...(currentLead.status_history || []), historyItem];

  updatedLead = {
    ...currentLead,
    status: newStatus,
    updated_at: now,
    status_history: newHistory,
  };

  // 1. Update in Firestore if available
  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('leads').doc(leadId).update({
        status: newStatus,
        updated_at: now,
        status_history: newHistory,
      });
    } catch (err) {
      console.warn(
        `[Leads Storage] Firestore status update failed for ${leadId}:`,
        err
      );
    }
  }

  // 2. Always keep local fallback in sync
  const localLeads = readLocalLeads();
  const index = localLeads.findIndex((l) => l.lead_id === leadId);
  if (index !== -1) {
    localLeads[index] = updatedLead;
    writeLocalLeads(localLeads);
  } else {
    localLeads.push(updatedLead);
    writeLocalLeads(localLeads);
  }

  return updatedLead;
}

/**
 * Assigns a medical coordinator to a lead.
 */
export async function assignLeadCoordinator(
  leadId: string,
  coordinatorName: string,
  updatedBy: string
): Promise<AdminLead | null> {
  const now = new Date().toISOString();
  const currentLead = await getLeadById(leadId);
  if (!currentLead) {
    return null;
  }

  const updatedLead: AdminLead = {
    ...currentLead,
    assigned_coordinator: coordinatorName,
    updated_at: now,
  };

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('leads').doc(leadId).update({
        assigned_coordinator: coordinatorName,
        updated_at: now,
      });
    } catch (err) {
      console.warn(`[Leads Storage] Firestore assignment failed:`, err);
    }
  }

  const localLeads = readLocalLeads();
  const index = localLeads.findIndex((l) => l.lead_id === leadId);
  if (index !== -1) {
    localLeads[index] = updatedLead;
    writeLocalLeads(localLeads);
  }

  return updatedLead;
}

