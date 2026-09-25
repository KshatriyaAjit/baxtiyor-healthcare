import { NextRequest, NextResponse } from 'next/server';
import { updateMediaItem, deleteMediaItem } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const updated = await updateMediaItem(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Media not found' }, { status: 404 });
    }

    await logAdminAction({
      adminEmail: admin.email,
      action: 'MEDIA_UPDATE',
      target: id,
      details: { updates: Object.keys(body) },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Failed to update media item.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const deleted = await deleteMediaItem(id);

    await logAdminAction({
      adminEmail: admin.email,
      action: 'MEDIA_DELETE',
      target: id,
      details: { deleted },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, message: 'Media item deleted.' });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete media item.' },
      { status: 500 }
    );
  }
}

