import { NextRequest, NextResponse } from 'next/server';
import { getAllTestimonials, saveTestimonial } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const testimonials = await getAllTestimonials(false);
  return NextResponse.json({ success: true, testimonials, total: testimonials.length });
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.displayName || !body.quote) {
      return NextResponse.json(
        { success: false, message: 'Display Name and Quote are required.' },
        { status: 400 }
      );
    }

    const saved = await saveTestimonial({
      ...body,
      published: Boolean(body.published),
      consentStatus: body.consentStatus || 'pending',
    });

    await logAdminAction({
      adminEmail: admin.email,
      action: 'TESTIMONIAL_SAVE',
      target: saved.id,
      details: { displayName: saved.displayName, consentStatus: saved.consentStatus, published: saved.published },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, testimonial: saved });
  } catch (err: unknown) {
    console.error('[Admin Testimonial Save Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to save testimonial.' },
      { status: 500 }
    );
  }
}

