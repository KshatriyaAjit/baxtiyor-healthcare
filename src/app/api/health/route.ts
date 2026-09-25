import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isFirebaseAdminConfigured } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = process.uptime();

  // Test storage writeability
  let storageStatus = 'untested';
  try {
    const testDir = path.join(process.cwd(), 'storage');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    const testFile = path.join(testDir, '.healthcheck');
    fs.writeFileSync(testFile, Date.now().toString(), 'utf8');
    fs.unlinkSync(testFile);
    storageStatus = 'writable';
  } catch {
    storageStatus = 'read-only-or-error';
  }

  // Safe server-side check for Firebase Admin without exposing credentials
  let firebaseAdminStatus = 'unconfigured';
  try {
    firebaseAdminStatus = isFirebaseAdminConfigured() ? 'operational' : 'unconfigured';
  } catch {
    firebaseAdminStatus = 'error';
  }

  const payload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'baxtiyor-healthcare-v2',
    version: '2.0.0',
    uptimeSeconds: Math.floor(startTime),
    storage: storageStatus,
    firebaseAdmin: firebaseAdminStatus,
    locales: ['en', 'ar'],
    environment: process.env.NODE_ENV || 'production',
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

