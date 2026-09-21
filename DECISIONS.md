# Architecture & Product Decisions: Baxtiyor Healthcare Website V2

This document logs all foundational technical, product, UX, and SEO decisions made for the project.

---

### DEC-001: Selection of Next.js App Router, TypeScript, and Tailwind CSS

- **Decision:** Use Next.js (App Router) with TypeScript and Tailwind CSS as the core stack for Website V2.
- **Reason:** 
  1. **SEO & SSR/SSG:** Deep indexing, fast First Contentful Paint (FCP), and dynamic Server-Side Rendering / Static Site Generation critical for international medical discovery.
  2. **Subpath Multilingual Routing:** Native support for dynamic segments (`/[locale]/...`) enabling seamless `/en/` and `/ar/` routing with clean canonical tags and hreflang annotations.
  3. **Performance:** Automatic image optimization, script offloading, and code-splitting ensure compliance with Core Web Vitals (LCP < 2.5s).
  4. **Type-Safety & Maintainability:** TypeScript enforces rigorous schemas for medical entities (treatments, hospitals, doctors, patient stories, leads) preventing runtime exceptions.
- **Date:** 2026-09-21
- **Status:** Approved / Proposed for Foundation

---

### DEC-002: Bilingual First-Class Architecture (`/en` and `/ar` with native RTL)

- **Decision:** Build bilingual support from day one using subpath routing (`/en/` and `/ar/`), with an RTL-aware CSS and component architecture.
- **Reason:**
  1. Arabic-speaking patients (Oman, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Iraq) represent a high-priority international patient segment.
  2. Auto-translation widgets (Google Translate) produce inaccurate medical terminology, look untrustworthy, and do not index organically in regional Google search.
  3. Designing RTL from the beginning avoids costly CSS refactors later.
- **Date:** 2026-09-21
- **Status:** Approved / Proposed for Foundation

---

### DEC-003: Strict E-E-A-T and Anti-Fabrication Content Governance

- **Decision:** Enforce absolute factual accuracy across all clinical, hospital, and doctor content. Never invent statistics, success rates, doctor degrees, or formal hospital empanelments. Flag unverified data with `[VERIFY WITH BUSINESS]` or `[CONTENT NEEDED]`.
- **Reason:**
  1. Healthcare is a sensitive "Your Money or Your Life" (YMYL) domain under Google search quality guidelines. Hallucinated or exaggerated claims trigger algorithmic penalties.
  2. International patients making cross-border medical decisions require absolute honesty and trust. Misleading information causes serious ethical and legal harm.
  3. Verified business proof (10+ years experience, 100+ patients assisted, 200+ documented stories, verified hospital relationships: Fortis FMRI, Artemis, Shalby Sanar, Marengo Asia) is strong and authentic on its own.
- **Date:** 2026-09-21
- **Status:** Approved / Core Principle

---

### DEC-004: Patient Privacy & Zero-Leak Medical Report Pipeline

- **Decision:** Separate marketing analytics completely from patient medical submissions. Medical report uploads will undergo strict file-type and size validation and be routed directly to secure server storage. No patient diagnostics, clinical summaries, or uploaded files will ever be sent to Google Analytics, GTM, Clarity, or client-side telemetry.
- **Reason:**
  1. Patient privacy is paramount. Medical records constitute sensitive health information.
  2. Analytics tools must only receive anonymous operational events (e.g., `report_upload_completed` with file count and procedure category).
- **Date:** 2026-09-21
- **Status:** Approved / Core Principle

---

### DEC-005: Relational Entity Graph for SEO and Conversion Architecture

- **Decision:** Implement a structured entity graph where every page links bidirectionally to related entities:
  - `Treatment` ↔ `Hospital` ↔ `Doctor` ↔ `Cost` ↔ `Patient Story` ↔ `Country Pathway` ↔ `Medical Opinion CTA`
- **Reason:**
  1. Search engines understand entity relationships via internal linking and JSON-LD schemas (`MedicalProcedure`, `Hospital`, `Physician`, `Article`).
  2. Patients exploring a treatment naturally want to see which hospital offers it, which doctor performs it, what it costs, and read a story of a patient from their home country who underwent it.
- **Date:** 2026-09-21
- **Status:** Approved / Architecture Foundation

