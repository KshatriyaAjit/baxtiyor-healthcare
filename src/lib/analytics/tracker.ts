/**
 * Baxtiyor Healthcare Zero-Leak Analytics Dispatcher
 *
 * CRITICAL PRIVACY RULE:
 * Absolutely NO patient diagnostic file contents, file names, clinical text,
 * phone numbers, emails, WhatsApp numbers, or personal identifiers may EVER
 * be logged or transmitted to external measurement engines (Firebase Analytics, GA4, GTM).
 *
 * Only anonymized operational and behavioral telemetry is captured.
 */

import { Locale } from '@/types';
import { logFirebaseEvent } from './firebase-adapter';

export type AnalyticsEventName =
  // Traffic
  | 'page_view'
  | 'session_start'
  // Navigation & Content Engagement
  | 'language_switch'
  | 'treatment_page_view'
  | 'specialty_page_view'
  | 'hospital_page_view'
  | 'doctor_page_view'
  | 'country_page_view'
  | 'treatment_cost_view'
  | 'patient_story_view'
  | 'medical_guide_view'
  | 'treatment_view'
  | 'hospital_view'
  | 'doctor_view'
  // Conversion & Inquiries
  | 'cta_click'
  | 'medical_opinion_click'
  | 'cost_request_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'lead_form_error'
  | 'form_start'
  | 'form_step_complete'
  | 'form_submit'
  // Phase 19 Real Media, Social & Chat Conversion Events
  | 'media_view'
  | 'testimonial_view'
  | 'youtube_play'
  | 'social_click'
  | 'call_click'
  | 'lets_talk_click'
  | 'chat_open'
  | 'chat_human_request'
  | 'chat_whatsapp_click'
  | 'video_card_click'
  // Medical Report Upload Flow (Zero-Leak Metadata Only)
  | 'report_upload_started'
  | 'report_upload_completed'
  | 'report_upload_error'
  | 'report_upload';

export interface AnalyticsPayload {
  event: AnalyticsEventName;
  locale?: Locale;
  language?: string;
  page_path?: string;
  page_type?: string;
  content_type?: string;
  content_id?: string;
  content_slug?: string;
  social_platform?: string;
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
  error_type?: string;
  reason?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

// In-memory tracker for page view deduplication
let lastTrackedPath: string | null = null;

/**
 * Dispatches an anonymized event to GTM dataLayer, GA4 gtag, and Firebase Analytics.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  payload: Omit<AnalyticsPayload, 'event'> = {}
) {
  if (typeof window === 'undefined') return;

  // STRICT SANITIZATION: filter out any inadvertent PII keys
  const sanitized: AnalyticsPayload = {
    event: eventName,
    locale: payload.locale,
    language: payload.language,
    page_path: payload.page_path || window.location.pathname,
    page_type: payload.page_type,
    content_type: payload.content_type,
    content_id: payload.content_id,
    content_slug: payload.content_slug,
    social_platform: payload.social_platform,
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
    error_type: payload.error_type,
    reason: payload.reason,
  };

  // 1. Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(sanitized as unknown as Record<string, unknown>);

  // 2. Send to GA4 via gtag if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitized);
  }

  // 3. Send to Firebase Analytics SDK adapter
  logFirebaseEvent(eventName, sanitized as unknown as Record<string, unknown>);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[Zero-Leak Analytics]:', sanitized);
  }
}

/**
 * Deduplicated page_view tracking helper.
 * Prevents double-counting during hydration, Strict Mode, and quick rerenders.
 */
export function trackPageView(url: string, locale?: Locale) {
  if (typeof window === 'undefined') return;
  if (lastTrackedPath === url) return; // Prevent duplicate execution
  lastTrackedPath = url;

  trackEvent('page_view', {
    page_path: url,
    locale,
  });
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
 * Shortcut helper for Medical Opinion CTA clicks
 */
export function trackMedicalOpinionClick(locale: Locale, location: string) {
  trackEvent('medical_opinion_click', {
    locale,
    cta_location: location,
  });
}

/**
 * Shortcut helper for Cost Request CTA clicks
 */
export function trackCostRequestClick(locale: Locale, treatment?: string) {
  trackEvent('cost_request_click', {
    locale,
    treatment_category: treatment,
  });
}

/**
 * Shortcut helper for Lead Form interactions
 */
export function trackLeadFormStart(locale: Locale, pagePath?: string) {
  trackEvent('lead_form_start', {
    locale,
    page_path: pagePath,
  });
}

export function trackLeadFormError(locale: Locale, errorType?: string) {
  trackEvent('lead_form_error', {
    locale,
    error_type: errorType,
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
  trackEvent('lead_form_submit', {
    locale: params.locale,
    treatment_category: params.treatment,
    destination_country: params.country,
    file_count: params.fileCount,
    lead_intent_score: params.score,
  });
}

/**
 * Shortcut helpers for Report Upload Flow (Zero-Leak: Count only, never filenames)
 */
export function trackReportUploadStart(locale: Locale, fileCount: number) {
  trackEvent('report_upload_started', {
    locale,
    file_count: fileCount,
  });
}

export function trackReportUploadComplete(locale: Locale, fileCount: number) {
  trackEvent('report_upload_completed', {
    locale,
    file_count: fileCount,
  });
}

export function trackReportUploadError(locale: Locale, reason?: string) {
  trackEvent('report_upload_error', {
    locale,
    reason: reason || 'upload_failed',
  });
}
