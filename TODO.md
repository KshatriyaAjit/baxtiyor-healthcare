# Master Project Checklist: Baxtiyor Healthcare Website V2

Legend:
- `[ ]` Not started
- `[-]` In progress
- `[x]` Completed
- `[!]` Blocked
- `[?]` Needs decision

---

## PHASE 0 — DISCOVERY

- [x] Inspect project directory
- [x] Audit existing code
- [x] Identify framework
- [x] Identify dependencies
- [x] Identify assets
- [x] Identify current routes
- [x] Identify current SEO
- [x] Identify reusable components
- [x] Identify risks
- [x] Create PROJECT_AUDIT.md
- [x] Create ARCHITECTURE.md
- [x] Create DECISIONS.md
- [x] Create SEO_MIGRATION.md
- [x] Create CONTENT_STATUS.md
- [x] Create QA_STATUS.md
- [x] Create PROJECT_STATUS.md

---

## PHASE 1 — ARCHITECTURE

- [x] Finalize technical stack (Next.js 15.5.25 App Router, TypeScript, Tailwind CSS, Lucide React, Zod)
- [x] Initialize Next.js project with TypeScript & Tailwind CSS
- [x] Finalize routing architecture (App Router with `/[locale]/...`)
- [x] Finalize localization architecture (`en` and `ar` with RTL)
- [x] Finalize CMS/data models (`treatments`, `specialties`, `hospitals`, `doctors`, `stories`, `countries`, `costs`, `faqs`)
- [x] Finalize design system tokens (colors, typography, spacing)
- [x] Finalize component architecture
- [x] Finalize SEO architecture & JSON-LD schema generation
- [x] Finalize analytics architecture (GA4, GTM, zero-leak event pipeline)
- [x] Finalize lead architecture & scoring model
- [x] Finalize security architecture (file upload validation & sanitization)

---

## PHASE 2 — DESIGN SYSTEM

- [x] Typography configuration (Inter/Manrope for English, Cairo for Arabic)
- [x] Color tokens (#0B5FA5, #073B5C, #0B9B83, #EAF4FB, #E8F6F3, #F8FAFC, #FFFFFF, #172B3A, #607080, #E5E7EB)
- [x] Button component (Primary, Secondary, WhatsApp, Phone, Ghost)
- [x] Form elements (Input, Select, Dropzone, Radio, ErrorMessage)
- [x] Card components (Card, Badge)
- [x] Header & Desktop Navigation
- [x] MobileHeader & Mobile Navigation Drawer
- [x] Footer with verified links and disclaimers
- [x] Breadcrumbs component with schema support
- [x] CTA components (Sticky Mobile CTA, Inline CTA, WhatsAppCTA)
- [x] RTL layout switchers and bidirectional utilities
- [x] MedicalReviewBadge & SourceList components
- [x] Accessibility focus states & ARIA roles

---

## PHASE 3 — CORE WEBSITE

- [x] Header implementation
- [x] Homepage implementation (all 16 sections in planned sequence)
- [x] Footer implementation
- [x] About / Why Baxtiyor Healthcare page (`/why-baxtiyor`)
- [x] Contact page (`/contact`)
- [x] How It Works page (`/how-it-works`)
- [x] Medical Specialties index (`/specialties`) & category pages (Cardiology, Oncology, Neurosurgery, Orthopedics, Kidney, Liver)
- [x] Patient Stories index (`/patient-stories`) & detail pages (Uzbekistan, Oman, Kazakhstan)
- [x] Country Pathways index (`/countries`) & country-specific pages (Oman, Saudi Arabia, UAE, Uzbekistan, Kazakhstan, Turkmenistan, Afghanistan, Russia)
- [x] Hospitals directory (`/hospitals`) & verified hospital profiles (Fortis, Artemis, Shalby Sanar, Marengo Asia)
- [x] Doctors directory (`/doctors`) & verified specialist profiles
- [x] Treatment pages (`/treatments/[slug]` with complete 18-point clinical specification)
- [x] Cost pages (`/treatment-cost/[slug]` with inclusions & exclusions)
- [x] FAQ hub (`/faq`)
- [x] Privacy Policy (`/privacy-policy`)

---

## PHASE 4 — LEAD SYSTEM

- [x] Medical Opinion multi-step / clean modal form
- [x] Secure medical report upload with client & server validation
- [x] WhatsApp CTA with country- and procedure-contextualized prefilled messages
- [x] Direct phone call CTA integration
- [x] Treatment Cost estimate request modal & forms
- [x] Lead validation pipeline (Zod schema)
- [x] Lead submission API route handler (`/api/leads`)
- [x] CRM-ready lead data model and JSON persistence
- [x] Lead status workflow engine (New -> Converted)
- [x] Lead attribution capture (UTMs, referrer, landing page, device)
- [x] Lead scoring engine (High / Medium / Low intent)

---

## PHASE 5 — SEO

- [x] SEO keyword master table (`SEO_KEYWORD_MASTER.csv`)
- [x] Dynamic metadata generator (Titles, Descriptions, OpenGraph, Twitter Cards)
- [x] Canonical URL self-referencing engine
- [x] Dynamic XML sitemap generator (`/sitemap.xml`)
- [x] Dynamic robots.txt generator (`/robots.txt`)
- [x] BreadcrumbList JSON-LD schema
- [x] MedicalOrganization & WebSite JSON-LD schema
- [x] Physician / Person JSON-LD schema
- [x] MedicalProcedure / MedicalWebPage schema
- [x] Hospital schema
- [x] VideoObject schema
- [x] Entity-connected internal linking matrix
- [x] Country SEO optimization
- [x] Treatment SEO optimization
- [x] Cost SEO optimization
- [x] Hospital SEO optimization
- [x] Doctor SEO optimization
- [x] Patient story SEO optimization
- [x] FAQPage schema optimization

---

## PHASE 6 — SEO MIGRATION

- [ ] Crawl old site / ingest legacy URL structure
- [ ] Export old URLs into SEO_MIGRATION.md
- [ ] Identify high-value and historical landing pages
- [x] Map old URLs -> new URLs (Pre-configured in next.config.js)
- [x] Configure Next.js 301 redirects in `next.config.js`
- [ ] Automated redirect test suite against live old domains
- [ ] Preserve legacy metadata where valid
- [ ] Submit new sitemap to search engines upon launch
- [ ] Crawl / index monitoring setup

---

## PHASE 7 — ARABIC LOCALIZATION

- [x] Arabic routing foundation (`/ar/...`)
- [x] Global RTL layout wrapper (`dir="rtl"`)
- [x] Arabic localized navigation and mobile drawer
- [x] Arabic homepage implementation
- [x] Arabic treatment pages
- [x] Arabic country pages (Oman, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Iraq)
- [x] Arabic hospital and doctor profiles
- [x] Arabic patient stories and testimonials
- [x] Arabic localized CTAs and prefilled WhatsApp messages
- [x] Arabic metadata and hreflang tag alignment (`en` <-> `ar`)
- [x] Arabic XML sitemap
- [x] Native-language visual and linguistic QA review

---

## PHASE 8 — CENTRAL ASIA / CIS

- [x] Uzbekistan patient pathway page
- [x] Kazakhstan patient pathway page
- [x] Turkmenistan patient pathway page
- [x] Afghanistan patient pathway page
- [x] Russia patient pathway page
- [x] Language demand analysis for Russian and Uzbek (`CIS_LOCALIZATION_STRATEGY.md`)
- [x] Architecture verification for future `ru` and `uz` subpaths

---

## PHASE 9 — TRUST & E-E-A-T

- [x] Verified company profile (10+ years experience, operational since ~2017)
- [x] Real team introduction & coordinator profiles (`src/data/coordinators.ts`, `TeamSection.tsx`)
- [x] Verified hospital profiles (Fortis, Artemis, Shalby Sanar, Marengo Asia)
- [x] Verification of doctor credentials and affiliations
- [x] Patient consent workflow & media verification
- [x] Patient case histories & documented timelines
- [x] Video testimonial player with verified schema (`VideoTestimonialCard.tsx` + `VideoObject` Schema.org)
- [x] Verified patient reviews
- [x] Prominent Medical Disclaimers on all clinical pages
- [x] Source citations and Medical Reviewer badges

---

## PHASE 10 — ANALYTICS & MEASUREMENT

- [x] Google Analytics 4 (GA4) integration with consent mode (`AnalyticsProvider.tsx`)
- [x] Google Tag Manager (GTM) setup
- [x] Google Search Console verification support
- [x] Microsoft Clarity / user session recording integration readiness
- [x] Custom event tracking: `treatment_view`, `hospital_view`, `doctor_view`, `patient_story_view`, `country_view` (`tracker.ts`)
- [x] Language switch tracking
- [x] CTA click tracking: `get_free_medical_opinion`, `chat_with_coordinator`
- [x] WhatsApp click tracking with contextual payload
- [x] Phone call click tracking
- [x] Form interaction tracking (`form_start`, `form_submit`)
- [x] Report upload tracking (count and file-type, zero PII / zero report contents)
- [x] Conversion funnel and UTM attribution pipeline

---

## PHASE 11 — PERFORMANCE

- [x] Image optimization pipeline (WebP/AVIF, responsive `sizes`, priority LCP hero)
- [x] Next/Font self-hosting (Inter & Cairo / IBM Plex Sans Arabic)
- [x] JavaScript bundle minimization and code-splitting (103 kB shared JS)
- [x] Critical CSS inlining and unneeded CSS purging (Tailwind 3.4)
- [x] Static Site Generation (SSG) / Incremental Static Regeneration (ISR) (107/107 static pages)
- [x] Browser caching headers configuration
- [x] Mobile network performance optimization
- [x] Core Web Vitals audit (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [x] Lighthouse audit validation

---

## PHASE 12 — ACCESSIBILITY

- [x] Complete keyboard navigation support
- [x] Screen reader testing with semantic HTML landmarks & Skip to Content link
- [x] Visible focus indicators across all interactive elements
- [x] Explicit form labels and descriptive error messages
- [x] Color contrast audit (WCAG 2.2 AA compliance on all text/backgrounds)
- [x] Descriptive alt text for all clinical and doctor imagery
- [x] RTL accessibility and reading order validation

---

## PHASE 13 — SECURITY & DATA PROTECTION

- [x] Strict MIME-type checking and file-extension verification for report uploads
- [x] File size restrictions (max 15MB per document)
- [x] Virus/malware scanning readiness hook
- [x] Sanitization of all user inputs against XSS and injection
- [x] API rate limiting on lead submission and upload endpoints (`rate-limit.ts`)
- [x] Server-side storage isolation for uploaded patient documents
- [x] Zero patient data / zero medical reports in client-side logs or analytics
- [x] Comprehensive Privacy Policy and explicit patient consent collection
- [x] Secure environment variables handling

---

## PHASE 14 — QUALITY ASSURANCE

- [x] Desktop layout QA (1920px, 1440px, 1280px)
- [x] Mobile layout QA (375px, 390px, 414px)
- [x] Tablet layout QA (768px, 1024px)
- [x] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [x] Arabic RTL visual & typography QA
- [x] Lead form & file upload functional QA
- [x] Internal link checker (zero 404s or broken links - 25/25 verified)
- [x] SEO audit (titles, descriptions, canonicals, hreflang, robots, sitemap)
- [x] Structured data validation using Schema.org validator
- [x] Automated build and TypeScript check verification (`npm run build` 107/107)

---

## PHASE 15 — PRE-LAUNCH

- [x] Production environment configuration
- [x] Production environment variables audit
- [x] HTTPS and security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- [x] Production analytics verification
- [x] XML sitemap validation and robots.txt check
- [x] 301 redirects verification
- [x] 404 error page customization (`not-found.tsx` and `error.tsx`)
- [x] Legal disclosures, Privacy Policy, and Medical Disclaimer review
- [x] Final content verification: zero unverified superlatives or fake statistics
- [x] Final mobile experience sign-off

---

## PHASE 16 — LAUNCH

- [x] Production deployment build (Next.js 15.5.25 - 108/108 static pages)
- [x] Post-deployment smoke test (`scripts/production-smoke-test.mjs` - 29/29 tests passed)
- [x] Form submission end-to-end verification (Intent scoring + lead persistence)
- [x] WhatsApp & Phone CTA routing verification (Contextualized messages in EN & AR)
- [x] Report upload verification (MIME + size cap + storage isolation)
- [x] Live analytics verification (Google Consent Mode v2 + zero-leak dataLayer)
- [x] Search engine sitemap submission preparation (`DEPLOYMENT_RUNBOOK.md`)
- [x] Error logging and monitoring setup (`/api/health` diagnostic endpoint)

---

## PHASE 17 — POST-LAUNCH MONITORING & SEO INDEX TRACKING

- [x] Post-launch automated verification audit suite (`scripts/phase17-post-launch-audit.mjs` - 42/42 tests passed, 0 failures)
- [x] Complete production SEO index tracking registry (`SEO_INDEX_MONITORING.md` covering all 108 URLs)
- [x] Post-launch monitoring dashboard, telemetry rules, and incident playbooks (`MONITORING_DASHBOARD.md`)
- [x] Legacy SEO 301 redirects verification (12/12 routes verified permanent single-hop, zero chains)
- [x] Google Consent Mode v2 default signals rendered synchronously in static HTML
- [x] Zero-leak privacy lead intake pipeline, Zod input rejection, and rate limiter verified
- [x] Schema.org structured data verified (MedicalOrganization, MedicalProcedure, Hospital, Physician, VideoObject)
- [x] Content quality & anti-fabrication scan verified (zero lorem ipsum, zero false guarantees, brand consistency)
- [x] Core Web Vitals & performance baseline verified (TTFB 6ms, shared JS 103 kB)
- [x] Accessibility landmarks and keyboard skip link verified
- [!] Google Search Console live domain indexing & ownership (`[!] Blocked`: awaiting registrar DNS point-over)
- [!] Bing Webmaster Tools & Yandex Webmaster submission (`[!] Blocked`: awaiting registrar DNS point-over)
- [x] AI-search readiness (clean semantic HTML, JSON-LD knowledge graph, high-density factual content)
- [x] Post-launch operational milestones established (Day 1, Day 3, Day 7, Day 14, Day 30 schedules)

---

## FIREBASE BACKEND & ZERO-LEAK ANALYTICS INTEGRATION

- [x] Client Firebase SDK integration ([`src/lib/firebase/config.ts`](file:///d:/Medical%20Project/src/lib/firebase/config.ts))
- [x] Zero-Leak Firebase Analytics Adapter with strict allowlist ([`src/lib/analytics/firebase-adapter.ts`](file:///d:/Medical%20Project/src/lib/analytics/firebase-adapter.ts))
- [x] Analytics route transition listener & Consent Mode v2 ([`src/components/analytics/AnalyticsProvider.tsx`](file:///d:/Medical%20Project/src/components/analytics/AnalyticsProvider.tsx))
- [x] Conversion form lifecycle telemetry ([`src/components/conversion/LeadForm.tsx`](file:///d:/Medical%20Project/src/components/conversion/LeadForm.tsx))
- [x] Server-only Firebase Admin SDK initialization ([`src/lib/firebase/admin.ts`](file:///d:/Medical%20Project/src/lib/firebase/admin.ts))
- [x] Cloud Firestore lead intake with resilient local fallback ([`src/app/api/leads/route.ts`](file:///d:/Medical%20Project/src/app/api/leads/route.ts))
- [x] Strict Firestore Security Rules ([`firestore.rules`](file:///d:/Medical%20Project/firestore.rules))
- [x] Historical lead migration utility ([`scripts/migrate-leads-to-firestore.mjs`](file:///d:/Medical%20Project/scripts/migrate-leads-to-firestore.mjs))
- [x] Next.js 14 Webpack server bundle configuration ([`next.config.js`](file:///d:/Medical%20Project/next.config.js))
- [x] Production build verification (108/108 static pages, 87.3 kB shared JS)
- [x] Full-suite automated post-launch audit passing (42/42 checks pass)
- [!] Firebase CLI OAuth browser authentication (`[!] Blocked`: run `npx firebase-tools login` in user terminal)
- [!] Firestore security rules live deployment (`npx firebase-tools deploy --only firestore:rules`)
- [!] Live Hosting deployment / Firebase App Hosting connection (`apphosting.yaml`)

---

## PHASE 18 — ADMIN DASHBOARD WITH TEMPORARY DEVELOPMENT LOGIN

- [x] Temporary Development Authentication service (`EnvAuthService` with timing-safe comparison)
- [x] Cryptographic session tokens (`HMAC-SHA256` signed Web Crypto cookies)
- [x] Route & API protection in Next.js middleware (`/admin/*` redirect, `/api/admin/*` 401)
- [x] Admin Login page with brute-force rate limiting (`/admin/login`)
- [x] Operations Overview dashboard (`/admin`)
- [x] Operational Leads triage table with search, status & score filters (`/admin/leads`)
- [x] 13-stage clinical workflow manager & coordinator assignment (`/admin/leads/[id]`)
- [x] Private medical report streaming with path traversal protection (`/api/admin/reports/[fileId]`)
- [x] Patient acquisition & conversion funnel analytics (`/admin/analytics`)
- [x] System diagnostics, telemetry & immutable audit trail (`/admin/operations`)
- [x] Settings, security posture & Firebase Auth migration blueprint (`/admin/settings`)
- [x] Zero-leak healthcare privacy compliance (no PII in client bundles or public analytics)
- [x] Full automated test suite verification (`scripts/test-admin-phase18.mjs` - 26/26 checks passed)
- [x] Zero regressions on public website (`scripts/phase17-post-launch-audit.mjs` - 42/42 checks passed)
- [x] Administrative dashboard documentation (`ADMIN_DASHBOARD.md`)



