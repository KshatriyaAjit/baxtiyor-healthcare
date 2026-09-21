# Project Audit: Baxtiyor Healthcare Website V2

**Date:** 2026-09-21  
**Auditor:** Senior Product & Technical Architecture Team  
**Workspace:** `d:\Medical Project`  

---

## 1. Current Project State
- **Workspace Directory:** `d:\Medical Project`
- **Current State:** Clean Greenfield (0 files, 0 folders initially present).
- **Runtime Environment:**
  - Node.js: `v24.14.0`
  - npm: `10.8.2`
  - Git: `2.45.2.windows.1` (initialized repository: Not yet initialized)
- **Legacy Codebase:** No legacy code exists in `d:\Medical Project`.

---

## 2. Detected Framework & Dependencies
- **Framework:** None detected (greenfield).
- **Dependencies:** None installed.
- **Package Manager:** npm (available globally), pnpm cache detected on drive `D:\.pnpm-store`.

---

## 3. Current Architecture & Code Review
- Greenfield setup. There is no existing technical debt, outdated packages, or legacy spaghetti code in this directory.
- Architectural slate is completely clean, allowing a clean, modern, and production-grade implementation of the target architecture.

---

## 4. Existing Assets & Media
- **Local Assets in Workspace:** None currently present in `d:\Medical Project`.
- **Identified Business Assets (from specifications):**
  - 100+ international patients assisted.
  - 200+ patient photos, videos, and media assets documented.
  - Real patient testimonials and verified case timelines.
- **Asset Ingestion Requirement:** Media assets (doctor headshots, hospital imagery, patient journey videos/stills) need to be ingested into `public/images/` with appropriate licensing, privacy consent, and responsive image optimization (WebP/AVIF).

---

## 5. Reusable Assets
- No code or component assets exist in the workspace to reuse.
- All design system components, templates, schemas, and layouts will be built modularly from scratch according to the Brand & Positioning specification.

---

## 6. Problems & Obstacles
1. **Empty Workspace:** Zero scaffold or foundation exists. Scaffolding must be done cleanly inside `d:\Medical Project` without scattering files.
2. **Missing V1 Crawl / Export Data:** Historical URLs, search console traffic data, and backlinks from V1 are not yet located in the workspace. An SEO migration framework must be created so that old URLs can be mapped as soon as provided.
3. **Strict Healthcare E-E-A-T Requirements:** Content must be strictly fact-grounded. Zero hallucinated doctors, hospital authorizations, or success rates are permitted.

---

## 7. Risks & Mitigation

| Risk Area | Risk Description | Mitigation Strategy |
|---|---|---|
| **E-E-A-T & Medical Credibility** | Risk of generating unsupported medical advice or exaggerated claims that harm patient trust or trigger Google medical updates (YMYL). | Strict content governance: every medical claim must cite authoritative sources, show medical disclaimer, and flag any unverified data with `[VERIFY WITH BUSINESS]`. |
| **Multilingual & RTL Complexity** | Arabic UI broken by naive LTR-to-RTL conversions; poor typography; broken navigation; mismatched hreflang tags. | Build bilingual support (`/en/` and `/ar/`) directly into the foundational App Router architecture with Tailwind RTL plugins, native Arabic typography (e.g. Cairo or IBM Plex Sans Arabic), and bidirectional layout wrappers. |
| **Patient Data Privacy & Security** | International patients submitting sensitive medical reports and diagnostic images. | Implement secure multipart upload handlers with strict MIME validation, file size limits, sanitization, server-side isolation, zero logging of medical reports, and zero transmission of medical details to marketing/analytics platforms. |
| **Performance / Core Web Vitals** | High-resolution medical imagery and multi-language bundles degrading LCP/INP in target international regions (Central Asia, CIS, Middle East). | Target LCP < 2.5s, CLS < 0.1, INP < 200ms using Next.js Image optimization, static generation (SSG) for content-heavy pages, route prefetching, and minimal client-side JS. |
| **Branding Inconsistency** | Accidental use of deprecated names (e.g., "GlobalCare") or generic medical tourism clichés. | Enforce strict brand token standards: "Baxtiyor Healthcare", official color palette (`#0B5FA5`, `#073B5C`, `#0B9B83`), and honest positioning ("Personalized Medical Care in India for International Patients"). |

---

## 8. Recommended Architecture
- **Core Framework:** Next.js 14+ / 15 (App Router) with TypeScript.
- **Styling & Design System:** Tailwind CSS with custom healthcare tokens, Lucide React icons, accessible headless UI primitives, and full RTL layout support.
- **Internationalization (i18n):** Subpath routing (`/[locale]/...`) supporting `en` and `ar`, extensible to `uz`, `ru` in Phase 8 without refactoring.
- **Content / CMS-Ready Model:** Type-safe TypeScript content collections / schemas (`src/data/`) representing Specialties, Treatments, Hospitals, Doctors, Patient Stories, Countries, Costs, FAQs, Authors, and Medical Reviewers.
- **Structured Data Engine:** Automated JSON-LD generator for `MedicalOrganization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Physician`, `Article`, and eligible `FAQPage`.
- **Lead Capture & Upload:** Next.js Route Handlers / Server Actions with Zod validation, lead scoring engine (High/Medium/Low), CRM-compatible schema, and privacy-first handling.

---

## 9. Migration Considerations
- Establish `SEO_MIGRATION.md` immediately.
- If a V1 website exists online or in an export file, extract its URL structure, identify high-traffic landing pages, and configure 301 redirects in Next.js `next.config.js`.
- Prevent orphan or duplicate pages by enforcing canonical URLs and segmented XML sitemaps.

