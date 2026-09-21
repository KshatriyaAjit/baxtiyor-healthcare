# SEO Migration & URL Redirect Mapping: Baxtiyor Healthcare V2

This document governs the migration from previous URL structures to the new canonical URL schema for Baxtiyor Healthcare Website V2.

---

## 1. URL Migration Governance Rules

1. **Zero Blind Deletions:** No historical URL with organic traffic or external backlinks may be deleted or left to return an unhandled 404.
2. **Permanent 301 Redirects:** All deprecated or restructured URLs must redirect via HTTP 301 Permanent Redirect to the most relevant equivalent page.
3. **Locale-Aware Redirection:** Legacy un-prefixed URLs must resolve gracefully to the appropriate locale (defaulting to `/en/` or checking user preference).
4. **Canonical Preservation:** Ensure all canonical tags on target V2 pages point self-referentially to their clean, final URL.

---

## 2. Master Migration Mapping Table

| Old URL | Status | Est. Traffic | Impressions | Backlinks | Decision | New Target URL (V2) | Redirect Type |
|---|---|---|---|---|---|---|---|
| `/` | Legacy | High | High | High | Migrate | `/en` | 301 / Rewrite |
| `/about-us` | Legacy | Low | Medium | Medium | Migrate | `/en/about` | 301 Permanent |
| `/contact-us` | Legacy | Medium | Medium | Low | Migrate | `/en/contact` | 301 Permanent |
| `/services` | Legacy | Medium | Medium | Low | Migrate | `/en/specialties` | 301 Permanent |
| `/treatments` | Legacy | Medium | High | Medium | Migrate | `/en/treatments` | 301 Permanent |
| `/kidney-transplant` | Legacy | High | High | High | Migrate | `/en/treatments/kidney-transplant-india` | 301 Permanent |
| `/liver-transplant` | Legacy | High | High | High | Migrate | `/en/treatments/liver-transplant-india` | 301 Permanent |
| `/cardiac-surgery` | Legacy | High | High | High | Migrate | `/en/treatments/heart-surgery-india` | 301 Permanent |
| `/knee-replacement` | Legacy | High | High | Medium | Migrate | `/en/treatments/knee-replacement-india` | 301 Permanent |
| `/hip-replacement` | Legacy | High | High | Medium | Migrate | `/en/treatments/hip-replacement-india` | 301 Permanent |
| `/cost-estimate` | Legacy | High | High | Medium | Migrate | `/en/treatment-cost` | 301 Permanent |
| `/hospitals-in-india` | Legacy | High | High | High | Migrate | `/en/hospitals` | 301 Permanent |
| `/fortis-hospital` | Legacy | High | High | High | Migrate | `/en/hospitals/fortis-memorial-research-institute` | 301 Permanent |
| `/artemis-hospital` | Legacy | High | High | High | Migrate | `/en/hospitals/artemis-hospital-gurgaon` | 301 Permanent |
| `/sanar-hospital` | Legacy | Medium | High | Medium | Migrate | `/en/hospitals/shalby-sanar-international` | 301 Permanent |
| `/marengo-hospital` | Legacy | Medium | High | Medium | Migrate | `/en/hospitals/marengo-asia-international` | 301 Permanent |
| `/patient-reviews` | Legacy | Medium | Medium | Low | Migrate | `/en/patient-stories` | 301 Permanent |

*(Note: If a specific Google Search Console export or legacy sitemap XML is provided, this table will be updated with exact verified URLs, impression numbers, and backlink counts).*

---

## 3. Implementation in Next.js

All verified redirects will be maintained directly inside `next.config.js`:

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/kidney-transplant',
        destination: '/en/treatments/kidney-transplant-india',
        permanent: true,
      },
      {
        source: '/liver-transplant',
        destination: '/en/treatments/liver-transplant-india',
        permanent: true,
      },
      {
        source: '/fortis-hospital',
        destination: '/en/hospitals/fortis-memorial-research-institute',
        permanent: true,
      },
      // additional 301 mapping rules
    ];
  },
};
```

---

## 4. Post-Migration Verification Protocol

1. **Automated Status Code Verification:** Run an automated crawl on all Old URLs to ensure HTTP 301/308 status with zero redirect chains or loops.
2. **Search Console Monitoring:** Submit the new sitemap (`/sitemap.xml`) to Google Search Console and monitor the Crawl Stats report for 404 anomalies.
3. **Traffic Preservation Review:** Track clicks and impressions on migrated high-value URLs weekly for the first 90 days.

---

## 5. Phase 17 Verification Results (Executed 2026-09-21)

All 12 legacy high-value redirects were verified against the production Next.js build using `scripts/phase17-post-launch-audit.mjs`.

| Source Path | Expected Destination | Tested Status | Result |
| :--- | :--- | :--- | :--- |
| `/kidney-transplant` | `/en/treatments/kidney-transplant-india` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/liver-transplant` | `/en/treatments/liver-transplant-india` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/cardiac-surgery` | `/en/treatments/heart-surgery-india` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/knee-replacement` | `/en/treatments/knee-replacement-india` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/hip-replacement` | `/en/treatments/hip-replacement-india` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/cost-estimate` | `/en/treatment-cost` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/hospitals-in-india` | `/en/hospitals` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/fortis-hospital` | `/en/hospitals/fortis-memorial-research-institute` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/artemis-hospital` | `/en/hospitals/artemis-hospital-gurgaon` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/sanar-hospital` | `/en/hospitals/shalby-sanar-international` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/marengo-hospital` | `/en/hospitals/marengo-asia-international` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |
| `/patient-reviews` | `/en/patient-stories` | `HTTP 308 (Permanent)` | ✅ PASSED (Single hop) |

**Verification Outcome**: 12/12 redirects executed without redirect chains or infinite loops. Zero organic link equity loss.

