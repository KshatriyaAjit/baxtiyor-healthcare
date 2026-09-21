import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { getFirestoreDb } from '@/lib/firebase/admin';
import { getRecentAuditLogs } from '@/lib/admin/audit';

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  try {
    // 1. Storage & Filesystem Health
    const storageDir = path.join(process.cwd(), 'storage');
    const reportsDir = path.join(storageDir, 'reports');
    const leadsFile = path.join(storageDir, 'leads.json');

    let leadsCount = 0;
    if (fs.existsSync(leadsFile)) {
      try {
        const raw = fs.readFileSync(leadsFile, 'utf-8');
        leadsCount = JSON.parse(raw).length;
      } catch {
        leadsCount = 0;
      }
    }

    let reportsCount = 0;
    if (fs.existsSync(reportsDir)) {
      reportsCount = fs.readdirSync(reportsDir).length;
    }

    // 2. Cloud Firestore Connectivity
    let firestoreStatus: 'CONNECTED' | 'FALLBACK_LOCAL' = 'FALLBACK_LOCAL';
    const db = getFirestoreDb();
    if (db) {
      firestoreStatus = 'CONNECTED';
    }

    // 3. Health & Runtime Info
    const uptimeSeconds = Math.floor(process.uptime());
    const memoryUsage = process.memoryUsage();

    // 4. Audit Log Summary
    const recentAuditLogs = await getRecentAuditLogs(15);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        nodeVersion: process.version,
        nextVersion: '14.2.35',
        runtimeEnvironment: process.env.NODE_ENV || 'development',
        uptimeSeconds,
        memoryUsageMb: {
          rss: Math.round(memoryUsage.rss / 1024 / 1024),
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        },
      },
      services: {
        healthEndpoint: {
          status: 'OPERATIONAL',
          path: '/api/health',
        },
        leadIntakeApi: {
          status: 'OPERATIONAL',
          rateLimit: '10 inquiries per 15 min',
          persistedRecords: leadsCount,
        },
        medicalUploadApi: {
          status: 'OPERATIONAL',
          rateLimit: '20 uploads per 15 min',
          storedReportsCount: reportsCount,
          maxFileSize: '15MB',
          allowedFormats: ['PDF', 'JPEG', 'PNG', 'WebP'],
        },
        database: {
          primary: 'Cloud Firestore',
          status: firestoreStatus,
          fallback: 'storage/leads.json (Local Server Fallback)',
          rulesMode: 'Strict (No public client read/write)',
        },
        analytics: {
          provider: 'Firebase Analytics + Google Analytics 4',
          measurementId:
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-G7LBLQQZ2Y',
          consentMode: 'Google Consent Mode v2 Active',
          privacyMode: 'Zero-Leak Strict Allowlist',
        },
        authentication: {
          mode: 'Temporary Development Credentials (EnvAuthService)',
          futureTarget: 'Firebase Authentication + Role-Based Access Control',
          cookiePolicy: 'HttpOnly, Secure (prod), SameSite=Lax, Path=/',
          sessionValidity: '8 hours',
        },
      },
      recentAuditLogs,
    });
  } catch (error) {
    console.error('[Operations API Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve operations telemetry.' },
      { status: 500 }
    );
  }
}

