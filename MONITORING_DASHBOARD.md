# Post-Launch Monitoring Dashboard & Operating Manual
**Baxtiyor Healthcare Platform V2**  
*Document Version: 1.0.0 | Production Release: v2.0.0 | Primary Domain: baxtiyorhealthcare.com*

---

## 1. Executive Monitoring Overview

This document defines the production telemetry, health monitoring, error tracking, lead flow auditing, SEO index tracking, and incident response protocols for Baxtiyor Healthcare V2.

All production monitoring adheres to the **Zero-Leak Healthcare Privacy Protocol**: no patient medical histories, clinical notes, doctor prescriptions, or diagnostic report filenames may be logged in external monitoring tools, Sentry breadcrumbs, Google Analytics events, or APM metrics.

```
+---------------------------------------------------------------------------------------+
|                                PRODUCTION TELEMETRY OVERVIEW                          |
+------------------------------------+--------------------------------------------------+
| Component                          | Tool / Mechanism                                 |
+------------------------------------+--------------------------------------------------+
| Synthetic Uptime & Liveness        | UptimeRobot / Better Uptime -> /api/health       |
| HTTP Status & 404 Crawl Anomalies  | Next.js Structured Logs + CloudWatch / Datadog    |
| Zero-Leak Lead Intake Pipeline     | Local SQLite / Postgres DB + WhatsApp Webhooks   |
| Search Engine Indexing Status      | Google Search Console + Bing Webmaster + Yandex  |
| Real-User Core Web Vitals          | Vercel Analytics / Chrome UX Report (CrUX)       |
| Security & Abuse Prevention        | In-Memory Sliding-Window Limiter + WAF / Cloudflare|
+------------------------------------+--------------------------------------------------+
```

---

## 2. Real-Time Uptime & Synthetic Health Probing

### 2.1 Health Check Endpoint
- **URL**: `https://baxtiyorhealthcare.com/api/health`
- **Method**: `GET`
- **Expected Status**: `HTTP 200 OK`
- **Payload Contract**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-21T11:25:00.000Z",
    "uptime": 12345.67,
    "version": "2.0.0",
    "storage": "writable"
  }
  ```

### 2.2 Probing Rules & Alerting Thresholds
| Parameter | Configuration | Action on Breach |
| :--- | :--- | :--- |
| **Check Frequency** | Every 60 seconds (1 minute) | Record failure if non-200 or timeout |
| **Timeout Limit** | 5,000 ms (5 seconds) | Trigger retry after 10s |
| **Failure Threshold** | 2 consecutive failed probes | PagerDuty / WhatsApp incident alert |
| **Degraded Threshold** | Latency > 1,500 ms for 3 consecutive checks | High latency warning to dev team |
| **Storage Check** | Checks `storage === "writable"` in temp dir | Alert if filesystem read-only |

### 2.3 Synthetic Multi-Region Probing Locations
1. **Primary Route**: South Asia / India (Mumbai / Delhi) - targeting domestic hospital partner infrastructure.
2. **Secondary Route**: Middle East / GCC (Dubai / Riyadh) - representing Arabic patient traffic.
3. **Tertiary Route**: Central Asia / CIS (Tashkent / Almaty) - representing Russian/Central Asian patient traffic.

---

## 3. Real-Time Error & 404 Anomaly Monitoring

### 3.1 404 Not Found Anomaly Tracking
- **Baseline**: < 10 404 events per 1,000 pageviews.
- **Critical Threshold**: > 50 404 events per hour on non-bot user agents.
- **High-Risk Triggers**:
  - 404 on any treatment route (e.g. `/en/treatments/*`, `/ar/treatments/*`).
  - 404 on any hospital profile (e.g. `/en/hospitals/*`, `/ar/hospitals/*`).
  - 404 on any legacy redirected URL (e.g. `/kidney-transplant`, `/fortis-hospital`).
- **Resolution**:
  1. Inspect referring URL and User-Agent in server access log.
  2. If referring from legacy external backlinks or old printed brochures, add a 301 redirect into `next.config.js`.
  3. If user typo from WhatsApp link, check link generation in `WhatsAppCTA.tsx`.

### 3.2 5xx Server Error Tracking
- **Threshold**: Zero tolerance for unhandled server errors on SSG/ISR routes.
- **API Error Logging**:
  - All errors caught in `/api/leads` and `/api/upload` are sanitized with generic error responses to clients.
  - Server logs capture internal stack trace with **zero patient PII**.

---

## 4. Lead Intake Funnel & Conversion Monitoring

### 4.1 Funnel Health KPIs
| Funnel Step | Expected Conversion Rate | Metric Name |
| :--- | :--- | :--- |
| **Hero / Sticky CTA Click** | 12% - 18% of unique visits | `cta_click_hero` / `cta_click_sticky` |
| **WhatsApp Initiation** | 8% - 12% of visits | `whatsapp_click` |
| **Lead Form Submission** | 3% - 6% of visits | `lead_form_submitted` |
| **Cost Calculator Completion** | 2% - 4% of visits | `cost_estimate_requested` |
| **Medical Report Upload** | 40% - 60% of form submissions | `medical_report_uploaded` |

### 4.2 Lead Intake Pipeline Integrity Checks
- **Hourly Synthetic Lead Smoke Test**: An automated probe submits a test lead payload with header `X-Synthetic-Test: true` to `/api/leads` once every 6 hours to verify pipeline continuity.
- **Spam & Rate Limiter Telemetry**:
  - Monitor count of HTTP 429 responses. If 429s spike (> 50 in 1 hour), verify whether a legitimate hospital coordinator office IP was mistakenly throttled.
  - Check honeypot field trip count: leads with hidden field populated are dropped silently.

### 4.3 Zero-Leak Privacy Telemetry Audit
- Weekly automated scan of analytics payloads and error logs to ensure no regex match for:
  - Patient names in URL parameters (`?name=...` - FORBIDDEN).
  - Diagnostic file names (`*mri*.pdf`, `*biopsy*.jpg` - FORBIDDEN in analytics).
  - Phone numbers in page titles or query strings.

---

## 5. Search Console & Organic Index Monitoring Routine

### 5.1 Weekly Search Console (GSC) Cadence
Every Monday at 09:00 IST, execute the following audit in Google Search Console:

1. **Pages (Index Coverage)**:
   - Verify all 108 valid pages are in **Indexed** state.
   - Investigate any pages under:
     - *Crawled - currently not indexed*
     - *Discovered - currently not indexed*
     - *Duplicate without user-selected canonical*
     - *Page with redirect* (ensure only legacy URLs appear here)
2. **Sitemaps**:
   - Confirm `https://baxtiyorhealthcare.com/sitemap.xml` has status **Success**.
   - Verify URL count matches 108 (54 `/en` + 54 `/ar`).
3. **Core Web Vitals Report**:
   - Confirm 100% of URLs are in the **Good** bucket (Green).
4. **Structured Data Enhancements**:
   - Review MedicalBusiness / MedicalOrganization items.
   - Review MedicalProcedure items.
   - Review Hospital and Physician items.
   - Ensure 0 warnings and 0 errors across all Rich Results.
5. **International Targeting**:
   - Check hreflang reports for any missing reciprocal tags.

### 5.2 Bing & Yandex Monitoring Routine
- **Bing Webmaster Tools**: Review crawl stats, verify indexation of English and Arabic pages, check URL inspection for top treatment landing pages.
- **Yandex Webmaster Tools**: Critical for CIS/Central Asian patient traffic (Uzbekistan, Kazakhstan). Verify site access, regional targeting, and XML sitemap status.

---

## 6. Core Web Vitals (CWV) Field Telemetry

### 6.1 Performance Targets (Google 75th Percentile)
```
+-------------------+--------------------+--------------------+--------------------+
| Metric            | Good (Target)      | Needs Improvement  | Poor               |
+-------------------+--------------------+--------------------+--------------------+
| LCP (Largest Paint)| <= 2.0 seconds     | 2.0s - 4.0s        | > 4.0 seconds      |
| INP (Interaction) | <= 150 ms          | 150ms - 300ms      | > 300 ms           |
| CLS (Layout Shift)| <= 0.05            | 0.05 - 0.10        | > 0.10             |
| TTFB (Server Time)| <= 200 ms          | 200ms - 800ms      | > 800 ms           |
+-------------------+--------------------+--------------------+--------------------+
```

### 6.2 Monitoring Methodology
- Monitor Vercel Speed Insights / Google Chrome UX Report (CrUX) monthly dataset.
- Run monthly Lighthouse automated audit via CI/CD on:
  - Homepage (`/en`, `/ar`)
  - Treatment Hub & Detail (`/en/treatments`, `/en/treatments/kidney-transplant-india`)
  - Hospital Hub & Detail (`/en/hospitals`, `/en/hospitals/fortis-memorial-research-institute`)
  - Cost Calculator (`/en/treatment-cost`)

---

## 7. Incident Response Runbook & On-Call Playbook

```
+----------------------------------------------------------------------------------------+
|                                    INCIDENT SEVERITY MATRIX                            |
+----------+---------------------------------------------+-------------------------------+
| Severity | Definition                                  | Target MTTR                   |
+----------+---------------------------------------------+-------------------------------+
| SEV-1    | Total site downtime / 5xx on homepage       | < 15 minutes                  |
| SEV-2    | Lead submission API failure / upload failure| < 30 minutes                  |
| SEV-3    | 301 redirect failure / broken assets        | < 2 hours                     |
| SEV-4    | Minor layout defect / translation typo      | < 24 hours (next scheduled)   |
+----------+---------------------------------------------+-------------------------------+
```

### 7.1 SEV-1: Total Site Outage Recovery Procedure
1. **Verify Outage**:
   - Check status from external network: `curl -I https://baxtiyorhealthcare.com/api/health`
2. **Inspect Hosting Status**:
   - Check Vercel / Cloudflare / VPS hosting dashboard for platform incidents.
3. **Emergency Rollback**:
   - If caused by bad deployment, trigger instant rollback to previous deployment commit in Vercel/hosting dashboard.
4. **DNS Failover**:
   - If hosting provider has regional outage, swap DNS A/CNAME record to backup static failover page.

### 7.2 SEV-2: Lead API / Form Failure Recovery Procedure
1. **Immediate Patient Failover**:
   - If `/api/leads` is down or database is unresponsive, verify that floating WhatsApp buttons and direct phone numbers remain clickable.
   - WhatsApp links bypass the server and open directly into patient's WhatsApp app with coordinator pre-filled message.
2. **Review Server Logs**:
   - Run `npx vercel logs` or check server `journalctl` for error traceback.
3. **Verify Storage Permissions**:
   - Check write permissions in upload directory or S3 bucket credentials.

---

## 8. Post-Launch Operational Milestones

| Milestone | Schedule | Responsible | Action Items |
| :--- | :--- | :--- | :--- |
| **Day 1** | Launch + 24h | Tech Lead | Verify DNS propagation, SSL cert validity, run `phase17-post-launch-audit.mjs`, submit sitemaps to GSC & Bing. |
| **Day 3** | Launch + 72h | SEO Lead | Inspect GSC coverage for initial crawl, test live WhatsApp chat inquiries, audit analytics events. |
| **Day 7** | Launch + 1 wk | Product Mgr | Review lead intake numbers, check 404 logs for unexpected broken links, verify zero PII leaks. |
| **Day 14** | Launch + 2 wks| SEO Lead | First organic ranking check for core keywords ("kidney transplant cost in india", "baxtiyor healthcare"). |
| **Day 30** | Launch + 1 mo | Full Team | Comprehensive monthly retrospective: CWV real-user data, conversion rate optimization, plan CIS localization expansion (`/ru`, `/uz`). |

