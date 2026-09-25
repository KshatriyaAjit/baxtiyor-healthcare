import { NextRequest, NextResponse } from 'next/server';
import { getContentSummary } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const summary = await getContentSummary();
  return NextResponse.json({ success: true, summary });
}

