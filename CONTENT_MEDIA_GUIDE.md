# Baxtiyor Healthcare V2 — Content & Media Management Guide

This document defines the real-content architecture, media management protocols, YouTube curation, patient privacy standards, and conversion workflows for **Baxtiyor Healthcare**.

---

## 1. Architectural Overview & Storage Isolation

Baxtiyor Healthcare enforces **strict architectural separation** between public promotional media and confidential patient medical documentation.

```
                          ┌─────────────────────────┐
                          │   Next.js Application   │
                          └───────────┬─────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
┌───────────────────────────┐                   ┌───────────────────────────┐
│    PUBLIC WEBSITE MEDIA   │                   │  CONFIDENTIAL MEDICAL DOCS│
│                           │                   │                           │
│ • Facilities, Doctors,    │                   │ • Patient diagnostic scans│
│   Banners, Curated Stories│                   │ • Blood tests, Histology  │
│ • Uploaded via /admin     │                   │ • Ingested via /api/upload│
│ • Stored: Firebase Storage│                   │ • Stored: Private Storage │
│   bucket 'media/' or local│                   │   'storage/reports/'      │
│   'storage/media/'        │                   │ • NO PUBLIC URLS EVER     │
│ • Public URL via CDN or   │                   │ • Strict anti-traversal   │
│   /api/media/[cat]/[file] │                   │ • Auth-gated admin stream │
└───────────────────────────┘                   └───────────────────────────┘
```

### Critical Privacy Guarantees
1. **Zero Medical PII in Public Media:** Medical reports and patient inquiry files are stored exclusively in `/storage/reports/` and served through the authenticated admin endpoint `/api/admin/reports/[fileId]`.
2. **Anti-Traversal Defense:** Report and media file lookups reject `..`, slashes, backslashes, and enforce alphanumeric-hyphen-underscore filename validation.
3. **Controlled Delivery:** Public media URLs are generated only for approved items (`consentStatus === 'approved'` and `published === true`). Unapproved assets remain hidden from public discovery.

---

## 2. Media Upload & Asset Governance

### File Specifications
* **Accepted MIME Types:** `image/jpeg`, `image/png`, `image/webp`, `image/avif`
* **Maximum File Size:** 10 MB per asset
* **Categories:** `facilities`, `doctors`, `treatments`, `stories`, `banners`, `general`, `other`
* **Delivery Endpoints:**
  * Firebase Cloud Storage CDN (when Firebase Admin is active)
  * Resilient streaming fallback: `/api/media/[category]/[filename]`

### Admin Upload Capabilities (`/admin/content/media`)
* Drag-and-drop or file picker upload
* Preview before and after upload
* Metadata attributes:
  * Title (English)
  * Alt Text (accessibility and SEO compliant)
  * Caption (optional descriptive subtitle)
  * Category taxonomy
  * Language target (`all`, `en`, `ar`)
  * Consent verification (`approved`, `pending`, `withdrawn`)
  * Publication toggle (`published: boolean`)
* In-place metadata editing (`PATCH /api/admin/content/media/[id]`)
* Permanent asset deletion (`DELETE /api/admin/content/media/[id]`) with storage cleanup

---

## 3. Patient Stories & Testimonial Standards

### Medical Consent Verification
Every patient journey or testimonial published on Baxtiyor Healthcare requires explicit legal and medical consent from the patient or their legal guardian:
* `approved`: Documented written/recorded consent received. Eligible for public display.
* `pending`: Story drafted by coordinators but awaiting patient sign-off. Hidden from public routes.
* `withdrawn`: Patient requested removal. Immediately suppressed from all public pages.

### Zero Fabricated Claims Policy
* **No Manufactured 5-Star Ratings:** The platform displays authentic, verified coordinator quotes and documented timelines. No misleading synthetic review badges.
* **Genuine Timelines:** Every story reflects a real medical travel journey (inquiry, airport pickup, clinical assessment, treatment, discharge, and post-operative follow-up).
* **Anonymization Controls:** Patients may choose first-name-only display (`displayName`) to protect their identity in sensitive clinical disciplines (oncology, bariatrics, fertility).

---

## 4. Official YouTube Channel Curation

Baxtiyor Healthcare curates content directly from the official channel:
**`https://youtube.com/@baxtiyorindiya`**

### Supported Video Link Formats
The system automatically extracts the canonical 11-character YouTube video ID from:
* Standard Watch URLs: `https://www.youtube.com/watch?v=kXYiU_JCYtU`
* Short URLs: `https://youtu.be/kXYiU_JCYtU`
* Shorts: `https://www.youtube.com/shorts/kXYiU_JCYtU`
* Embed URLs: `https://www.youtube.com/embed/kXYiU_JCYtU`
* Live streams: `https://www.youtube.com/live/kXYiU_JCYtU`

### Privacy-Enhanced Video Rendering (`YouTubeVideoCard.tsx`)
* Embedded via `youtube-nocookie.com` to eliminate third-party tracking cookies prior to playback.
* Lazy-loading facade with high-resolution thumbnail (`img.youtube.com/vi/{id}/hqdefault.jpg`).
* Embedded **VideoObject Schema.org JSON-LD** structured data for rich snippet indexing.

---

## 5. Central Contact & Social Channels

All contact points are consolidated in `src/lib/config/contact.ts` to ensure consistency:

| Channel | Identifier / URL | Purpose |
| :--- | :--- | :--- |
| **Phone** | `+91 99999 99999` (Env-driven) | 24/7 International Desk & Emergencies |
| **WhatsApp** | `https://wa.me/{number}` | Primary coordination & initial inquiry |
| **YouTube** | `https://youtube.com/@baxtiyorindiya` | Facility tours & patient recovery interviews |
| **Telegram** | `https://t.me/baxtiyorhealthcare` | Central Asian & Russian-speaking patients |
| **Instagram**| `https://www.instagram.com/baxtiyorhealthcare` | Hospital tours, patient updates, tips |
| **Facebook** | `https://www.facebook.com/baxtiyorhealthcare` | Community updates & hospital announcements |

### Contextual WhatsApp Routing (`getWhatsAppUrl`)
The helper generates pre-formatted, polite greetings customized to the user's language and source page without leaking any patient PII:
* **English:** `"Hello Baxtiyor Healthcare, I am reaching out from your website regarding international patient coordination in India. Could you please assist me?"`
* **Arabic:** `"مرحباً بكم في بختيار للرعاية الصحية، أتواصل معكم عبر الموقع الإلكتروني بخصوص استفسارات العلاج والرعاية الطبية في الهند. أرجو المساعدة والتوجيه."`

---

## 6. Mobile Bottom Navigation & Conversion Hub

### Fixed Mobile Bottom Navigation (`MobileBottomNav.tsx`)
* 5 Touch-Friendly Actions:
  1. **Home** (`/en` or `/ar`)
  2. **Treatments** (`/en/treatments` or `/ar/treatments`)
  3. **Hospitals** (`/en/hospitals` or `/ar/hospitals`)
  4. **Let's Talk** (Triggers conversion sheet modal)
  5. **WhatsApp** (Direct connection to primary coordinator)
* **Safe-Area Insets:** Uses `env(safe-area-inset-bottom)` to respect home indicator bars on modern smartphones.
* **RTL-Compliant:** Adapts directionality for Arabic browsing.
* **Layout Adjustment:** Main public layout has `pb-20 lg:pb-0` padding to prevent navigation elements from occluding content.

### Healthcare Coordination Chatbot (`ChatWidget.tsx`)
* **Strictly Non-Diagnostic:** Clearly labeled as a non-clinical logistics assistant with prominent disclaimer.
* **Capabilities:** Guides visitors on hospital options, cost estimation, visa documentation, and language support.
* **Escalation Trigger:** One-click human handoff button directly to a human coordinator via WhatsApp or phone.
* **Screen Placement:** Offset at `bottom-20` on mobile devices to prevent collision with the bottom navigation bar.

---

## 7. Zero-Leak Analytics Telemetry

All conversion and content interaction events are filtered through strict privacy allowlists:

```typescript
// Safe conversion events captured in Firebase Analytics & GA4:
trackEvent('whatsapp_click', { cta_name: 'hero_primary', locale: 'en' });
trackEvent('youtube_play', { content_id: 'kXYiU_JCYtU', locale: 'ar' });
trackEvent('chat_open', { page_path: '/en/patient-stories' });
trackEvent('chat_human_request', { reason: 'coordinator_escalation' });
trackEvent('social_click', { social_platform: 'youtube' });
```

No names, telephone numbers, clinical histories, or document filenames are ever dispatched to analytics.

