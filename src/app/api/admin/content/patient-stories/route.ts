import { NextRequest, NextResponse } from 'next/server';
import { getAllPatientStories, savePatientStory } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const stories = await getAllPatientStories(false);
  return NextResponse.json({ success: true, stories, total: stories.length });
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.displayName || !body.story) {
      return NextResponse.json(
        { success: false, message: 'Title, Display Name, and Story content are required.' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const saved = await savePatientStory({
      ...body,
      slug,
      published: Boolean(body.published),
      consentStatus: body.consentStatus || 'pending',
    });

    await logAdminAction({
      adminEmail: admin.email,
      action: 'PATIENT_STORY_SAVE',
      target: saved.id,
      details: { title: saved.title, consentStatus: saved.consentStatus, published: saved.published },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, story: saved });
  } catch (err: unknown) {
    console.error('[Admin Story Save Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to save patient story.' },
      { status: 500 }
    );
  }
}

