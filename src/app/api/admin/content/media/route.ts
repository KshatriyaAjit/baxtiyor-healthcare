import { NextRequest, NextResponse } from 'next/server';
import { getAllMedia, uploadMediaFile } from '@/lib/admin/content';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';
import { MediaCategory, ConsentStatus } from '@/types/content';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const language = searchParams.get('language') || undefined;
  const consentStatus = searchParams.get('consentStatus') || undefined;
  const publishedParam = searchParams.get('published');
  const published = publishedParam !== null ? publishedParam === 'true' : undefined;
  const featuredParam = searchParams.get('featured');
  const featured = featuredParam !== null ? featuredParam === 'true' : undefined;
  const search = searchParams.get('search') || undefined;

  const items = await getAllMedia({
    category,
    language,
    consentStatus,
    published,
    featured,
    search,
  });

  return NextResponse.json({ success: true, items, total: items.length });
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;

    const fileList: File[] = [];
    if (singleFile && singleFile.size > 0) {
      fileList.push(singleFile);
    }
    for (const f of files) {
      if (f && f.size > 0 && !fileList.some((existing) => existing.name === f.name && existing.size === f.size)) {
        fileList.push(f);
      }
    }

    if (fileList.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No media file provided for upload.' },
        { status: 400 }
      );
    }

    const category = (formData.get('category') as MediaCategory) || 'other';
    const baseTitle = (formData.get('title') as string) || '';
    const baseAltText = (formData.get('altText') as string) || '';
    const caption = (formData.get('caption') as string) || '';
    const language = (formData.get('language') as 'all' | 'en' | 'ar') || 'all';
    const consentStatus = (formData.get('consentStatus') as ConsentStatus) || 'pending';
    const published = formData.get('published') !== 'false';
    const featured = formData.get('featured') === 'true';
    const country = (formData.get('country') as string) || '';
    const treatment = (formData.get('treatment') as string) || '';
    const patientStoryId = (formData.get('patientStoryId') as string) || '';

    const uploadedItems = [];

    for (const file of fileList) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid file type "${file.type}". Only JPG, PNG, WebP, and AVIF images are allowed.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `File "${file.name}" exceeds maximum allowed size of 10MB.`,
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const title = baseTitle || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const altText = baseAltText || title;

      const mediaItem = await uploadMediaFile({
        buffer,
        filename: file.name,
        mimeType: file.type,
        category,
        title,
        altText,
        caption,
        language,
        consentStatus,
        published,
        featured,
        country,
        treatment,
        patientStoryId,
      });

      uploadedItems.push(mediaItem);
    }

    await logAdminAction({
      adminEmail: admin.email,
      action: 'MEDIA_UPLOAD',
      target: 'media',
      details: {
        count: uploadedItems.length,
        category,
        consentStatus,
        items: uploadedItems.map((m) => m.id),
      },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedItems.length} media item(s).`,
      items: uploadedItems,
    });
  } catch (err: unknown) {
    console.error('[Admin Media Upload Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Server error processing media upload.' },
      { status: 500 }
    );
  }
}

