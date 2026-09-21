import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limit';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  // Enforce IP-based rate limiting (20 uploads per 15 minutes)
  const clientIp = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`upload:${clientIp}`, { limit: 20, windowMs: 15 * 60 * 1000 });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Upload rate limit exceeded. Please wait a few minutes before trying again.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)),
        },
      }
    );
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files uploaded.' },
        { status: 400 }
      );
    }

    const savedFileIds: string[] = [];
    const storageDir = path.join(process.cwd(), 'storage', 'reports');

    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    for (const file of files) {
      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `Unsupported file type: ${file.type}. Please upload PDF, JPEG, PNG, or WebP.`,
          },
          { status: 400 }
        );
      }

      // Validate extension
      const fileExt = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
        return NextResponse.json(
          {
            success: false,
            message: `Unsupported file extension: ${fileExt}. Allowed: .pdf, .jpg, .jpeg, .png, .webp`,
          },
          { status: 400 }
        );
      }

      // Validate size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            message: `File ${file.name} exceeds the 15MB maximum size limit.`,
          },
          { status: 400 }
        );
      }

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const secureFileId = `${crypto.randomUUID()}${fileExt}`;
      const targetPath = path.join(storageDir, secureFileId);

      fs.writeFileSync(targetPath, fileBuffer);
      savedFileIds.push(secureFileId);
    }

    return NextResponse.json({
      success: true,
      count: savedFileIds.length,
      file_ids: savedFileIds,
      message: 'Medical reports stored securely.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'File upload processing failed.' },
      { status: 500 }
    );
  }
}

