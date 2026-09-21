# Technical Architecture: Baxtiyor Healthcare Website V2

**Document Version:** 1.0.0  
**Target Platform:** Production-Ready Healthcare Discovery + Trust + Lead Generation Platform  
**Workspace:** `d:\Medical Project`  

---

## 1. High-Level System Architecture

```
                                  [ International Patients ]
                                      (Central Asia, CIS, Arab)
                                                 │
                                                 ▼
                                        [ Cloudflare / CDN ]
                                                 │
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │         Next.js App Router (Node.js)         │
                          │   SSR / SSG / Static Generation + ISR        │
                          └───────┬──────────────────────────────┬───────┘
                                  │                              │
         ┌────────────────────────┴────────┐            ┌────────┴────────────────────────┐
         │       Presentation Layer        │            │        Server & API Layer       │
         ├─────────────────────────────────┤            ├─────────────────────────────────┤
         │ • Subpath i18n (`/en`, `/ar`)   │            │ • Route Handlers (`/api/...`)   │
         │ • LTR & RTL Bidirectional Layout│            │ • Lead Processing & Validation  │
         │ • Tailwind Design System        │            │ • Secure Report Upload Handler  │
         │ • Entity-Linked Page Templates  │            │ • Dynamic Sitemap & Robots Gen  │
         │ • Accessible UI Components      │            │ • Security Sanitization Engine  │
         └────────────────┬────────────────┘            └────────┬────────────────────────┘
                          │                                      │
         ┌────────────────┴────────────────┐            ┌────────┴────────────────────────┐
         │     Content & Structured Data   │            │       Storage & Integration     │
         ├─────────────────────────────────┤            ├─────────────────────────────────┤
         │ • Type-Safe Medical Schemas     │            │ • CRM-Ready Lead Storage        │
         │ • JSON-LD Schema Engine         │            │ • Encrypted Report Storage      │
         │ • Entity Relational Mappings    │            │ • Contextual WhatsApp Routing   │
         │ • Medical Disclaimer Badges     │            │ • GA4 / GTM (Zero-Leak Mode)    │
         └─────────────────────────────────┘            └─────────────────────────────────┘
```

---

## 2. Directory & File Structure

```
d:\Medical Project\
├── .github/                     # CI/CD workflows and automated checks
├── public/                      # Static assets
│   ├── images/
│   │   ├── branding/            # Baxtiyor Healthcare logos and marks
│   │   ├── hospitals/           # Verified hospital photos
│   │   ├── doctors/             # Verified doctor photos
│   │   ├── patient-stories/     # Consented patient photos and media
│   │   └── specialties/         # Specialty icons and hero graphics
│   ├── fonts/                   # Self-hosted web fonts (if offline / pinned)
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── [locale]/            # Dynamic locale parameter (`en` or `ar`)
│   │   │   ├── layout.tsx       # Root layout (sets lang, dir="ltr"|"rtl", fonts)
│   │   │   ├── page.tsx         # High-converting Homepage
│   │   │   ├── about/           # About Baxtiyor Healthcare & Team
│   │   │   ├── contact/         # Contact & Patient Coordination Desk
│   │   │   ├── how-it-works/    # Patient Journey & Step-by-Step Process
│   │   │   ├── why-baxtiyor/    # Evidence-based value proposition & credentials
│   │   │   ├── specialties/     # Medical specialties index & landing pages
│   │   │   │   └── [slug]/
│   │   │   ├── treatments/      # 18-point comprehensive treatment pages
│   │   │   │   └── [slug]/
│   │   │   ├── treatment-cost/  # Indicative cost breakdown guides
│   │   │   │   └── [slug]/
│   │   │   ├── hospitals/       # Verified partner hospital profiles
│   │   │   │   └── [slug]/
│   │   │   ├── doctors/         # Verified medical specialist profiles
│   │   │   │   └── [slug]/
│   │   │   ├── patient-stories/ # Consented patient cases & journeys
│   │   │   │   └── [slug]/
│   │   │   ├── countries/       # Country-specific patient pathways
│   │   │   │   └── [slug]/
│   │   │   ├── medical-opinion/ # Dedicated Free Medical Opinion intake
│   │   │   ├── faq/             # Comprehensive medical & travel FAQs
│   │   │   ├── privacy-policy/  # Medical data privacy policy
│   │   │   └── terms/           # Terms of service and medical disclaimers
│   │   ├── api/
│   │   │   ├── leads/           # Lead capture & scoring endpoint
│   │   │   ├── upload/          # Secure medical report upload endpoint
│   │   │   └── health/          # Health check endpoint
│   │   ├── sitemap.ts           # Dynamic localized XML sitemap generator
│   │   └── robots.ts            # Dynamic robots.txt
│   ├── components/
│   │   ├── common/              # Header, MobileHeader, Footer, Navigation
│   │   ├── ui/                  # Button, Input, Modal, Badge, Dropdown, Card
│   │   ├── conversion/          # LeadForm, ReportUpload, WhatsAppCTA, PhoneCTA
│   │   ├── cards/               # SpecialtyCard, HospitalCard, DoctorCard, StoryCard
│   │   ├── trust/               # TrustMetrics, MedicalReviewBadge, SourceList
│   │   └── seo/                 # JsonLdRenderer, Breadcrumbs, Canonical
│   ├── data/                    # Type-Safe Content Collections (CMS-ready)
│   │   ├── specialties.ts
│   │   ├── treatments.ts
│   │   ├── hospitals.ts
│   │   ├── doctors.ts
│   │   ├── patient-stories.ts
│   │   ├── countries.ts
│   │   ├── costs.ts
│   │   ├── faqs.ts
│   │   └── team.ts
│   ├── lib/
│   │   ├── i18n/                # Localization dictionaries & RTL detection
│   │   ├── seo/                 # Metadata builder & structured data generators
│   │   ├── analytics/           # GA4 / GTM safe event dispatcher
│   │   ├── leads/               # Lead scoring logic & CRM formatting
│   │   └── security/            # File upload validation & input sanitization
│   └── types/                   # Core TypeScript interfaces & schemas
├── TODO.md                      # Master roadmap & checklist
├── PROJECT_STATUS.md            # Live status dashboard
├── DECISIONS.md                 # Technical decision log
├── ARCHITECTURE.md              # Technical architecture documentation
├── SEO_MIGRATION.md             # URL mapping & 301 redirects
├── CONTENT_STATUS.md            # Content inventory & verification tracking
├── QA_STATUS.md                 # QA & verification test matrices
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 3. Technology Stack Specification

- **Framework:** Next.js 14+ / 15 (App Router, Node.js runtime)
- **Language:** TypeScript 5.x (Strict mode enabled)
- **Styling:** Tailwind CSS 3.4+ with `@tailwindcss/forms` and RTL utilities
- **Icons:** `lucide-react` (Lightweight, accessible SVG icons)
- **Validation:** `zod` (Runtime schema validation for lead submissions and uploads)
- **Internationalization:** Lightweight subpath routing (`/en`, `/ar`), zero heavy dependencies, native React Server Component dictionary loading
- **Structured Data:** Schema-dts compatible JSON-LD injection for Google Rich Results

---

## 4. Subpath Multilingual Architecture (`/en` and `/ar`)

- **Root Middleware / Dynamic Route:** The top-level segment `[locale]` resolves `en` (default) or `ar`.
- **Bidirectional Support (LTR / RTL):**
  - `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`
  - Tailwind styling utilizes logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) ensuring components automatically mirror accurately in Arabic.
- **Typography:**
  - English: `Inter` or `Manrope` (Clean, high legibility).
  - Arabic: `Cairo` or `IBM Plex Sans Arabic` (Optimized for Arabic UI and medical readability).
- **Hreflang Configuration:** Every page outputs alternate link tags pointing to its counterpart:
  ```html
  <link rel="alternate" hreflang="en" href="https://baxtiyorhealthcare.com/en/treatments/kidney-transplant-india" />
  <link rel="alternate" hreflang="ar" href="https://baxtiyorhealthcare.com/ar/treatments/kidney-transplant-india" />
  <link rel="alternate" hreflang="x-default" href="https://baxtiyorhealthcare.com/en/treatments/kidney-transplant-india" />
  ```

---

## 5. Entity Relational Architecture (The Medical Graph)

To provide unmatched patient discovery and search engine topical authority, entities are deeply interlinked:

```
[ Specialty ] ─── has many ───► [ Treatment ]
                                      │
                ┌─────────────────────┼─────────────────────┐
                ▼                     ▼                     ▼
         [ Hospital ]           [ Doctor ]            [ Cost Range ]
                │                     │                     │
                └──────────┬──────────┴──────────┬──────────┘
                           ▼                     ▼
                  [ Patient Story ]      [ Country Pathway ]
                           │                     │
                           └──────────┬──────────┘
                                      ▼
                      [ Lead Capture / Free Opinion ]
```

Every treatment page renders:
1. Associated hospitals equipped for this procedure.
2. Verified specialist doctors performing the surgery.
3. Indicative cost breakdown with inclusions/exclusions.
4. Patient story from an international patient who received this care.
5. Direct WhatsApp CTA with procedure context pre-filled.
6. Medical Disclaimer and Source citations.

---

## 6. Lead Capture, Scoring & Security Architecture

### Lead Schema:
```typescript
interface Lead {
  lead_id: string;              // UUID
  created_at: string;           // ISO timestamp
  country: string;              // e.g., 'Oman', 'Uzbekistan'
  language: 'en' | 'ar';
  treatment: string;            // Procedure slug or name
  patient_relationship: 'self' | 'parent' | 'child' | 'spouse' | 'other';
  landing_page: string;         // Canonical URL of entry
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  device: 'mobile' | 'desktop' | 'tablet';
  name: string;
  whatsapp: string;
  phone?: string;
  email?: string;
  reports_uploaded: boolean;
  uploaded_file_count: number;
  report_file_ids?: string[];   // Internal UUIDs, never public
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'NEW' | 'CONTACTED' | 'REPORTS_RECEIVED' | 'MEDICAL_REVIEW' | 
          'HOSPITAL_OPTIONS_SENT' | 'QUOTE_RECEIVED' | 'PATIENT_DECISION' | 
          'TRAVEL_PLANNED' | 'ARRIVED_INDIA' | 'TREATMENT' | 'FOLLOW_UP' | 
          'CONVERTED' | 'LOST';
}
```

### Lead Intent Scoring Engine:
- **HIGH Intent (Immediate Priority Dispatch):**
  - Medical reports uploaded + Specific treatment identified + Target travel timeline.
- **MEDIUM Intent:**
  - Specific treatment / hospital requested + Cost estimate inquiry without files yet.
- **LOW Intent:**
  - General discovery question or country-level inquiry.

### Medical File Upload Security:
- **Allowed MIME Types:** `application/pdf`, `image/jpeg`, `image/png`, `image/webp`.
- **Max File Size:** 15 MB per file.
- **Sanitization:** Files renamed with cryptographically secure UUIDs; original file names sanitized of path traversal characters.
- **Storage:** Isolated server storage outside public web root (`storage/reports/`).
- **Privacy Zero-Leak Rule:** Zero diagnostic file data is passed to analytics pixels or third-party loggers.

---

## 7. SEO & AI Search (AEO) Engine

- **Structured Data Engine:** Injects Google-compliant JSON-LD:
  - `MedicalOrganization`: Baxtiyor Healthcare credentials, contact points, languages supported (`en`, `ar`, `uz`, `ru`).
  - `Hospital`: Verified partner hospitals, locations, accreditations.
  - `Physician`: Doctor names, specialties, hospital affiliations.
  - `MedicalProcedure`: Name, procedure type, preparation, follow-up, expected stay.
  - `BreadcrumbList`: Complete hierarchical breadcrumbs.
  - `FAQPage`: Rich snippet eligible questions and direct answers.
- **Direct Answer Optimization:** Each medical question (e.g. "What is the recovery time for kidney transplant in India?") begins with a concise 40-50 word direct answer followed by an exhaustive breakdown.

---

## 8. Performance & Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms
- **Strategy:**
  - High-priority preloading for above-the-fold hero banners.
  - Modern responsive images (Next.js Image component with WebP/AVIF and proper `sizes`).
  - Next/Font with `display: swap` for zero font-induced CLS.
  - Server components by default, reserving client components strictly for interactive modals and forms.

---

## 9. Admin Dashboard & Clinical Operations Architecture

### 9.1 Authentication & Session Subsystem
- **Abstraction:** `AdminAuthService` interface with `EnvAuthService` (current development engine) and `FirebaseAuthService` (drop-in production interface).
- **Session Tokens:** HMAC-SHA256 signed using the universal Web Crypto API (`crypto.subtle`) over a binary session payload `email:role:issuedAt:expiresAt`.
- **Cookies:** Stored in HttpOnly, SameSite=Lax, Path=/ cookies named `admin_session`.
- **Route Guard:** Next.js `middleware.ts` guards all `/admin/*` pages (307 redirect) and `/api/admin/*` API routes (401 response).
- **Rate Limiting:** Brute-force defense limits login attempts to 5 per 15-minute sliding window per IP.

### 9.2 13-Stage Cross-Border Clinical Workflow
```
[ NEW ] ➔ [ CONTACTED ] ➔ [ MEDICAL_REVIEW ] ➔ [ ESTIMATE_SENT ] ➔ [ PATIENT_ACCEPTED ]
                                                                           │
┌──────────────────────────────────────────────────────────────────────────┘
▼
[ VISA_ASSISTANCE ] ➔ [ TRAVEL_BOOKED ] ➔ [ ADMITTED ] ➔ [ TREATMENT_IN_PROGRESS ]
                                                                   │
┌──────────────────────────────────────────────────────────────────┘
▼
[ DISCHARGED ] ➔ [ FOLLOW_UP ] ➔ [ CONVERTED ]  (or [ LOST ] at any juncture)
```

### 9.3 Medical Report Vault Security
- Diagnostic medical scans (`storage/reports/`) are strictly isolated from the public web root.
- Accessible only via `/api/admin/reports/[fileId]` requiring active admin authentication.
- Strict path traversal protection blocks `../` directory escapes.

### 9.4 Audit Trail Subsystem
- Immutable audit stream logs all critical administrative actions:
  - Administrative logins & logouts
  - Lead workflow status transitions
  - Coordinator assignments
  - Medical report access and downloads
- Persisted to Cloud Firestore (`admin_audit_logs` collection) with safe local fallback (`storage/admin_audit_logs.json`).


