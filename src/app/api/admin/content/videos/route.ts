import { NextRequest, NextResponse } from 'next/server';
import { getAllVideos, saveVideo, extractYouTubeId } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const videos = await getAllVideos(false);
  return NextResponse.json({ success: true, videos, total: videos.length });
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.youtubeUrl) {
      return NextResponse.json(
        { success: false, message: 'Video Title and YouTube URL are required.' },
        { status: 400 }
      );
    }

    const videoId = extractYouTubeId(body.youtubeUrl);
    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid YouTube URL. Please provide a valid YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).',
        },
        { status: 400 }
      );
    }

    const saved = await saveVideo({
      ...body,
      published: Boolean(body.published),
      featured: Boolean(body.featured),
    });

    await logAdminAction({
      adminEmail: admin.email,
      action: 'YOUTUBE_VIDEO_SAVE',
      target: saved.id,
      details: { title: saved.title, youtubeVideoId: saved.youtubeVideoId, published: saved.published },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({ success: true, video: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save video.';
    return NextResponse.json({ success: false, message: msg }, { status: 400 });
  }
}

