import { NextRequest, NextResponse } from 'next/server';
import { deletePatientStory } from '@/lib/admin/content';
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
    await deletePatientStory(id);

    await logAdminAction({
      adminEmail: admin.email,
      action: 'PATIENT_STORY_DELETE',
      target: id,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, message: 'Story deleted successfully.' });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete story.' },
      { status: 500 }
    );
  }
}

