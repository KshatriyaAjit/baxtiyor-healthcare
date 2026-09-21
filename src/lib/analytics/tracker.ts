/**
 * Baxtiyor Healthcare Zero-Leak Analytics Dispatcher
 *
 * CRITICAL PRIVACY RULE:
 * Absolutely NO patient diagnostic file contents, file names, clinical text,
 * phone numbers, emails, or personal identifiers may EVER be logged or transmitted
 * to external measurement engines (GA4, GTM, Clarity).
 *
 * Only anonymized operational telemetry is captured.
 */

import { Locale } from '@/types';

export type AnalyticsEventName =
  | 'cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'form_start'
  | 'form_step_complete'
  | 'form_submit'
  | 'report_upload'
  | 'treatment_view'
  | 'hospital_view'
  | 'doctor_view'
  | 'patient_story_view'
  | 'language_switch';

export interface AnalyticsPayload {
  event: AnalyticsEventName;
  locale?: Locale;
  cta_name?: string;
  cta_location?: string;
  treatment_category?: string;
  destination_country?: string;
  hospital_id?: string;
  doctor_id?: string;
  file_count?: number;
  file_extension?: 'pdf' | 'image' | 'mixed';
  lead_intent_score?: 'HIGH' | 'MEDIUM' | 'LOW';
  target_locale?: Locale;
  page_path?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Dispatches an anonymized event to dataLayer and GA4.
 */
export function trackEvent(eventName: AnalyticsEventName, payload: Omit<AnalyticsPayload, 'event'> = {}) {
  if (typeof window === 'undefined') return;

  // STRICT SANITIZATION: filter out any inadvertent PII keys
  const sanitized: AnalyticsPayload = {
    event: eventName,
    locale: payload.locale,
    cta_name: payload.cta_name,
    cta_location: payload.cta_location,
    treatment_category: payload.treatment_category,
    destination_country: payload.destination_country,
    hospital_id: payload.hospital_id,
    doctor_id: payload.doctor_id,
    file_count: payload.file_count,
    file_extension: payload.file_extension,
    lead_intent_score: payload.lead_intent_score,
    target_locale: payload.target_locale,
    page_path: payload.page_path || window.location.pathname,
  };

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(sanitized as unknown as Record<string, unknown>);

  // Send to GA4 via gtag if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitized);
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[Zero-Leak Analytics]:', sanitized);
  }
}

/**
 * Shortcut helper for WhatsApp click attribution
 */
export function trackWhatsAppClick(params: {
  locale: Locale;
  location: string;
  country?: string;
  treatment?: string;
}) {
  trackEvent('whatsapp_click', {
    locale: params.locale,
    cta_location: params.location,
    destination_country: params.country,
    treatment_category: params.treatment,
  });
}

/**
 * Shortcut helper for Direct Call attribution
 */
export function trackPhoneClick(locale: Locale, location: string) {
  trackEvent('phone_click', {
    locale,
    cta_location: location,
  });
}

/**
 * Shortcut helper for CTA button clicks
 */
export function trackCtaClick(ctaName: string, location: string, locale: Locale) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
    locale,
  });
}

/**
 * Shortcut helper for Lead Submission attribution (Zero PII)
 */
export function trackLeadSubmission(params: {
  locale: Locale;
  treatment: string;
  country: string;
  hasReports: boolean;
  fileCount: number;
  score: 'HIGH' | 'MEDIUM' | 'LOW';
}) {
  trackEvent('form_submit', {
    locale: params.locale,
    treatment_category: params.treatment,
    destination_country: params.country,
    file_count: params.fileCount,
    lead_intent_score: params.score,
  });
}

