import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limit';
import { getFirestoreDb } from '@/lib/firebase/admin';

const LeadSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(6),
  email: z.string().email().optional().or(z.literal('')),
  country: z.string().optional().default('Unspecified'),
  treatment: z.string().optional().default('General Consultation'),
  relationship: z.string().optional().default('self'),
  language: z.enum(['en', 'ar']).default('en'),
  landing_page: z.string().optional().default(''),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  report_uploaded: z.boolean().default(false),
  uploaded_file_count: z.number().default(0),
});

/**
 * Persists lead to local storage fallback if Firestore is offline or unconfigured.
 */
function saveToLocalFallback(leadRecord: Record<string, unknown>) {
  try {
    const storageDir = path.join(process.cwd(), 'storage');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    const leadsFile = path.join(storageDir, 'leads.json');
    let leads: unknown[] = [];
    if (fs.existsSync(leadsFile)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      } catch (e) {
        leads = [];
      }
    }

    leads.push(leadRecord);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage Error] Failed to write to local fallback:', err);
  }
}

export async function POST(request: Request) {
  // Enforce IP-based rate limiting (10 inquiries per 15 minutes)
  const clientIp = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`lead:${clientIp}`, {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Too many requests. Please wait a few minutes before submitting another inquiry.',
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
    const body = await request.json();
    const validatedData = LeadSchema.parse(body);

    // Compute Lead Intent Score
    let score: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    if (
      validatedData.report_uploaded &&
      validatedData.treatment !== 'General Consultation'
    ) {
      score = 'HIGH';
    } else if (validatedData.treatment !== 'General Consultation') {
      score = 'MEDIUM';
    }

    const leadId = `LEAD-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    const newLead = {
      lead_id: leadId,
      created_at: nowIso,
      updated_at: nowIso,
      ...validatedData,
      score,
      status: 'NEW',
    };

    let persistedToFirestore = false;
    const db = getFirestoreDb();

    if (db) {
      try {
        await db.collection('leads').doc(leadId).set({
          ...newLead,
          storage_target: 'firestore',
        });
        persistedToFirestore = true;
      } catch (firestoreErr) {
        console.warn(
          '[Firestore Write Failed - Using Fallback]:',
          firestoreErr
        );
      }
    }

    // If Firestore is not configured or failed, preserve in local server storage
    if (!persistedToFirestore) {
      saveToLocalFallback({
        ...newLead,
        storage_target: 'local_fallback',
      });
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      score,
      message: 'Medical inquiry registered securely.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Server error processing request.' },
      { status: 500 }
    );
  }
}
