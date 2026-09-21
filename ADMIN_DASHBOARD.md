# Baxtiyor Healthcare V2 — Admin Dashboard & Operations Hub Documentation

> **Status:** Production-Ready (Development Authentication Deployed)  
> **Phase:** 18 — Admin Dashboard with Temporary Development Login  
> **Target Audience:** Internal Clinical Coordinators, Operations Team, Lead Administrators  
> **Verification Score:** 26/26 Automated Checks Passed (Zero Regressions on Public Site)

---

## 1. Executive Summary

The **Baxtiyor Healthcare Operations Hub** is an internal, HIPAA/GDPR-aligned administrative console built into the existing Next.js App Router architecture. It empowers medical coordinators and management to triage international patient inquiries, assign coordinators, transition patients across a 13-stage cross-border clinical workflow, inspect conversion funnels, review operational diagnostics, and privately inspect diagnostic medical reports without ever leaking patient PII or clinical records into public bundles or third-party analytics.

---

## 2. Architecture & Security Model

```
┌────────────────────────────────────────────────────────────────────────┐
│                          INCOMING HTTP REQUEST                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS MIDDLEWARE.TS                           │
│  - /admin/* (non-login) ➔ Verify admin_session cookie                 │
│      └─ Missing/Invalid ➔ 307 Redirect to /admin/login?redirect=...   │
│  - /api/admin/* (non-login) ➔ Verify admin_session or Bearer token     │
│      └─ Missing/Invalid ➔ HTTP 401 Unauthorized                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                        ┌───────────┴───────────┐
                        ▼                       ▼
            ┌──────────────────────┐ ┌──────────────────────┐
            │   ADMIN UI ROUTES    │ │   ADMIN API ROUTES   │
            │   /admin             │ │   /api/admin/auth/*  │
            │   /admin/leads       │ │   /api/admin/leads/* │
            │   /admin/analytics   │ │   /api/admin/reports │
            │   /admin/operations  │ │   /api/admin/audit   │
            │   /admin/settings    │ │   /api/admin/ops     │
            └───────────┬──────────┘ └──────────┬───────────┘
                        │                       │
                        └───────────┬───────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       ADMIN AUTH & DATA LAYER                          │
│  ┌───────────────────────────┐     ┌────────────────────────────────┐  │
│  │   AdminAuthService (IoC)  │     │       Dual-Persistence         │  │
│  │  - EnvAuthService (Active)│     │  - Cloud Firestore (Primary)   │  │
│  │  - FirebaseAuthService    │     │  - Safe JSON Fallback (Local)  │  │
│  │    (Drop-in Migration)    │     │  - Storage Directory (Reports) │  │
│  └───────────────────────────┘     └────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Security Guarantees
1. **Zero Hardcoded Credentials:** Authentication relies strictly on environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`). No passwords exist anywhere in source code or git history.
2. **Cryptographic Session Signing:** Session cookies use HMAC-SHA256 implemented on the standard Web Crypto API (`crypto.subtle`), signing payload `email:role:issuedAt:expiresAt`.
3. **Cookie Hardening:** Cookies are tagged `HttpOnly; SameSite=Lax; Path=/` with `Secure` enforced in production environments.
4. **Timing-Safe Evaluation:** Password comparison utilizes `crypto.timingSafeEqual` over fixed-length buffers to neutralize side-channel timing attacks.
5. **Private Diagnostic Report Vault:** Medical records stored in `storage/` are inaccessible from public web roots. They can only be accessed via authenticated endpoint `/api/admin/reports/[fileId]` with strict path traversal prevention (`path.normalize` + boundary check).
6. **No Client-Side Secrets:** All admin utilities use `'server-only'` or isolated type definitions (`src/types/admin.ts`), eliminating accidental bundle leaks.

---

## 3. Temporary Development Credentials

| Variable Name | Description | Dev Default | Production Requirement |
| :--- | :--- | :--- | :--- |
| `ADMIN_EMAIL` | Administrative login username | `admin@baxtiyorhealthcare.com` | Unique operations email |
| `ADMIN_PASSWORD` | Administrative login password | Quoted in `.env.local` | 16+ char high-entropy password |
| `ADMIN_SESSION_SECRET` | 32+ byte cryptographic HMAC secret | Quoted in `.env.local` | Random 64-char hex string |

> [!IMPORTANT]
> When configuring `.env` files with special characters such as `#` or `$`, values **must be wrapped in double quotes** (`"..."`) to prevent dotenv parsers from truncating the password at the comment delimiter.

---

## 4. Administrative Dashboard Modules

### 4.1 `/admin` — Operations Overview
* **KPI Metrics:** Total leads received, active medical inquiries, high-priority conversions, and converted cases.
* **Lead Conversion Funnel:** Visual drop-off progression from `NEW` ➔ `CONTACTED` ➔ `MEDICAL_REVIEW` ➔ `ESTIMATE_SENT` ➔ `CONVERTED`.
* **Geographic Distribution:** International breakdown across GCC and CIS source markets (Uzbekistan, Oman, Saudi Arabia, UAE, Kazakhstan, Iraq, etc.).
* **Recent Inquiries Table:** Live 5-lead intake queue with direct links to full patient dossiers.

### 4.2 `/admin/leads` — Operational Triage & Lead Management
* **Real-time Filter & Search:** Full-text instant search by patient name, email, phone number, treatment inquiry, or country.
* **Status Filter Tabs:** Filter inquiries across all 13 workflow statuses.
* **Intent Priority Indicators:** Visual badges for `HIGH`, `MEDIUM`, and `LOW` intent leads.
* **Responsive Layout:** Tabular desktop layout with card-based mobile triage view.

### 4.3 `/admin/leads/[id]` — 13-Stage Clinical Workflow Console
* **Full Patient Dossier:** Contact details, source language (`en` / `ar`), country of residence, destination hospital interest, submitted symptoms.
* **13-Stage Clinical Progression:**
  1. `NEW` — Initial patient inquiry received
  2. `CONTACTED` — Initial outreach via WhatsApp/Phone
  3. `MEDICAL_REVIEW` — Doctor reviewing submitted medical reports
  4. `ESTIMATE_SENT` — Treatment cost package delivered
  5. `PATIENT_ACCEPTED` — Patient accepted treatment plan
  6. `VISA_ASSISTANCE` — Medical visa paperwork processing
  7. `TRAVEL_BOOKED` — Flight itineraries and airport pickup confirmed
  8. `ADMITTED` — Patient admitted to Indian hospital
  9. `TREATMENT_IN_PROGRESS` — Clinical procedure underway
  10. `DISCHARGED` — Post-operative discharge and recovery
  11. `FOLLOW_UP` — Tele-consultation and cross-border follow-up
  12. `CONVERTED` — Successful medical journey completed
  13. `LOST` — Inactive, disqualified, or cancelled
* **Coordinator Assignment:** Dynamic assignment to medical coordinators (`Dr. Alisher`, `Farida K.`, `Nilufar M.`, `Jasur T.`).
* **Coordinator Internal Notes:** Private notes field for internal coordination.
* **Audited Status History:** Timeline recording timestamp, previous status, new status, and the acting coordinator.
* **Medical Report Streaming:** Authenticated download link for submitted medical scans and reports.

### 4.4 `/admin/analytics` — Patient Acquisition & Conversion Intelligence
* **Time Range Selector:** `Today`, `7 Days`, `30 Days`, `90 Days`, `All Time`.
* **Drop-off Funnel Analysis:** Inquiries ➔ Contacted ➔ Review ➔ Estimate ➔ Treatment Booked.
* **Treatment Demand Distribution:** Breakdown by specialty (Cardiology, Oncology, Orthopedics, Nephrology, etc.).
* **Top Source Countries:** Percentage share of inquiries by patient country of origin.

### 4.5 `/admin/operations` — Diagnostics & Audit Trail
* **Subsystem Telemetry:** Live health probe (`/api/health`), response latency, environment, memory usage.
* **Data Storage Health:** Cloud Firestore connection status, local storage directory write status, report vault status.
* **Live Audit Log Stream:** Immutable log of administrative activities (logins, status changes, report downloads, coordinator reassignments).

### 4.6 `/admin/settings` — Admin Security & Profile
* **Current Admin Identity:** Authenticated email, administrative role (`super_admin`), session type.
* **Security Controls Overview:** CSRF protection, HttpOnly cookies, timing-safe evaluation, rate limiting.
* **Firebase Authentication Migration Blueprint:** In-app architectural guide for connecting Google Identity / Firebase Auth.

---

## 5. API Reference

| Endpoint | Method | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `/api/admin/auth/login` | `POST` | Public (Rate-limited) | Validates credentials, sets `admin_session` cookie |
| `/api/admin/auth/logout` | `POST` | Session Cookie | Clears `admin_session` cookie, logs event |
| `/api/admin/auth/me` | `GET` | Admin Session | Returns active admin profile & permissions |
| `/api/admin/leads` | `GET` | Admin Session | Returns filtered/paginated list of leads |
| `/api/admin/leads/[id]` | `GET` | Admin Session | Returns complete lead dossier and status history |
| `/api/admin/leads/[id]` | `PATCH` | Admin Session | Updates lead status, notes, or assigned coordinator |
| `/api/admin/analytics` | `GET` | Admin Session | Returns period-filtered funnel & demand metrics |
| `/api/admin/operations` | `GET` | Admin Session | Returns system diagnostics and storage telemetry |
| `/api/admin/audit-logs` | `GET` | Admin Session | Returns chronological administrative audit events |
| `/api/admin/reports/[fileId]` | `GET` | Admin Session | Streams private patient report with path verification |

---

## 6. Migration Guide: Temporary Auth ➔ Firebase Authentication

The dashboard is built with the **Dependency Inversion Principle** via `AdminAuthService` (`src/lib/admin/auth.ts`). When upgrading to Firebase Authentication:

### Step 1: Set Custom Claims in Firebase Admin
Create an administrative user script to grant the `admin: true` custom claim:
```javascript
import { getAuth } from 'firebase-admin/auth';

const user = await getAuth().getUserByEmail('admin@baxtiyorhealthcare.com');
await getAuth().setCustomUserClaims(user.uid, {
  admin: true,
  role: 'super_admin'
});
```

### Step 2: Implement `FirebaseAuthService`
Replace the stub in `src/lib/admin/auth.ts`:
```typescript
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from '@/lib/firebase/admin';

export class FirebaseAuthService implements AdminAuthService {
  async verifySession(token: string): Promise<AdminUser | null> {
    try {
      const decoded = await getAuth(getAdminApp()).verifyIdToken(token);
      if (!decoded.admin) return null;
      return {
        id: decoded.uid,
        email: decoded.email || '',
        role: decoded.role || 'admin',
        name: decoded.name || 'Firebase Admin'
      };
    } catch {
      return null;
    }
  }
}
```

### Step 3: Switch Active Singleton
In `src/lib/admin/auth.ts`:
```typescript
// Change:
// export const authService: AdminAuthService = new EnvAuthService();
// To:
export const authService: AdminAuthService = new FirebaseAuthService();
```
Zero modifications are required in `/admin/*` UI components, middleware, or lead managers.

---

## 7. Automated Test Suite

Run the full administrative test suite:
```bash
node scripts/test-admin-phase18.mjs
```

### Verification Results
```
======================================================================
TOTAL CHECKS: 26
PASSED:       26
FAILED:       0
======================================================================
```
All routes, session signing, rate limiting, report protection, status progression, and static scans pass with 100% compliance.

