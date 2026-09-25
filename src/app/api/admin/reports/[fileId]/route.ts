import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';
import { getClientIdentifier } from '@/lib/security/rate-limit';

const MIME_MAP: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    // 1. Authenticated admin authorization only
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Authentication required to access medical reports.' },
        { status: 401 }
      );
    }

    const { fileId } = params;

    // 2. Strict sanitization to prevent Path Traversal attacks
    const safeFilename = path.basename(fileId);
    if (!safeFilename || !/^[a-zA-Z0-9-_\.]+$/.test(safeFilename) || fileId.includes('..') || fileId.includes('/') || fileId.includes('\\')) {
      return NextResponse.json(
        { success: false, message: 'Invalid report identifier.' },
        { status: 400 }
      );
    }

    const storageDir = path.join(process.cwd(), 'storage', 'reports');
    const filePath = path.join(storageDir, safeFilename);

    // 3. Verify file existence in private storage
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'Report document not found.' },
        { status: 404 }
      );
    }

    // 4. Record access in audit log
    const clientIp = getClientIdentifier(request);
    await recordAuditLog('report.accessed', admin.email, clientIp, {
      file_id: safeFilename,
    });

    // 5. Stream the file securely
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${safeFilename}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    console.error('[Admin Report Stream Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Server error accessing report.' },
      { status: 500 }
    );
  }
}
