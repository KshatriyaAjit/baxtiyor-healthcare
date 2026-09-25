import { NextRequest, NextResponse } from 'next/server';
import { deleteVideo } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

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
    await deleteVideo(id);

    await logAdminAction({
      adminEmail: admin.email,
      action: 'YOUTUBE_VIDEO_DELETE',
      target: id,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, message: 'Video deleted successfully.' });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete video.' },
      { status: 500 }
    );
  }
}

