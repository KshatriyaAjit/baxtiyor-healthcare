import { NextRequest, NextResponse } from 'next/server';
import { getSocialLinks, saveSocialLinks } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const links = await getSocialLinks();
  return NextResponse.json({ success: true, links });
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.links)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload: links array required.' },
        { status: 400 }
      );
    }

    const saved = await saveSocialLinks(body.links);

    await logAdminAction({
      adminEmail: admin.email,
      action: 'SOCIAL_LINKS_UPDATE',
      target: 'siteSettings/socialLinks',
      details: { count: saved.length },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, links: saved });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Failed to update social links.' },
      { status: 500 }
    );
  }
}

