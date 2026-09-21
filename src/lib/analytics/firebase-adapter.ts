import { getFirebaseAnalytics } from '@/lib/firebase/config';
import { logEvent } from 'firebase/analytics';

/**
 * Permissible non-sensitive analytics parameter keys.
 * Absolutely NO patient names, phone numbers, email addresses,
 * WhatsApp numbers, medical report filenames, or clinical notes may ever be sent.
 */
const ALLOWED_ANALYTICS_KEYS = new Set([
  'locale',
  'page_path',
  'page_type',
  'content_type',
  'landing_page_type',
  'cta_name',
  'cta_location',
  'treatment_category',
  'destination_country',
  'hospital_id',
  'doctor_id',
  'file_count',
  'file_extension',
  'lead_intent_score',
  'target_locale',
  'reason',
  'error_type',
]);

const FORBIDDEN_KEYS = new Set([
  'name',
  'patient_name',
  'phone',
  'whatsapp',
  'email',
  'file_name',
  'filename',
  'files',
  'diagnosis',
  'symptoms',
  'medical_records',
  'notes',
  'lead_id',
]);

/**
 * Sanitizes an event payload, removing all PII and unapproved keys.
 */
function sanitizeFirebasePayload(
  rawPayload: Record<string, unknown>
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawPayload)) {
    const lowerKey = key.toLowerCase();
    if (FORBIDDEN_KEYS.has(lowerKey)) {
      continue;
    }
    if (ALLOWED_ANALYTICS_KEYS.has(key)) {
      // Ensure primitives only (strings, numbers, booleans)
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        clean[key] = value;
      }
    }
  }

  return clean;
}

/**
 * Dispatches an event safely to Firebase Analytics.
 * Fails silently in unsupported or non-browser environments.
 */
export async function logFirebaseEvent(
  eventName: string,
  rawPayload: Record<string, unknown> = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const analytics = await getFirebaseAnalytics();
    if (!analytics) return;

    const sanitizedParams = sanitizeFirebasePayload(rawPayload);
    logEvent(analytics, eventName, sanitizedParams);
  } catch (err) {
    // Zero disruption: Fail silently in production
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Firebase Analytics Adapter Error]:', err);
    }
  }
}

