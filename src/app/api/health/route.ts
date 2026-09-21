import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
  } catch (err) {
    storageStatus = 'read-only-or-error';
  }

  const payload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'baxtiyor-healthcare-v2',
    version: '2.0.0',
    uptimeSeconds: Math.floor(startTime),
    storage: storageStatus,
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

