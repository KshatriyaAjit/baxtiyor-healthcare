import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_CATEGORIES = new Set([
  'team',
  'patient-stories',
  'testimonials',
  'hospitals',
  'doctors',
  'office',
  'brand',
  'other',
]);

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; filename: string } }
) {
  const { category, filename } = params;

  if (!ALLOWED_CATEGORIES.has(category)) {
    return new NextResponse('Invalid media category', { status: 400 });
  }

  // Safe path traversal defense
  const safeFilename = path.basename(filename);
  const filePath = path.join(process.cwd(), 'storage', 'media', category, safeFilename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Media not found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    return new NextResponse('Error reading media', { status: 500 });
  }
}

