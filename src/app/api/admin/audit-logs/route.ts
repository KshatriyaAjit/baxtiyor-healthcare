import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { getRecentAuditLogs } from '@/lib/admin/audit';

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(200, parseInt(searchParams.get('limit') || '50', 10)));

  try {
    const logs = await getRecentAuditLogs(limit);
    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error('[Audit Logs API Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve audit logs.' },
      { status: 500 }
    );
  }
}

