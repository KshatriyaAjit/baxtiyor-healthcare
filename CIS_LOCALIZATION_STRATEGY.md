# CIS & Central Asia Localization Strategy: Baxtiyor Healthcare

**Document Version:** 1.0.0  
**Target Locales for Expansion:** `ru` (Russian) and `uz` (Uzbek Latin/Cyrillic)  
**Primary Target Geographies:** Uzbekistan, Kazakhstan, Turkmenistan, Kyrgyzstan, Tajikistan, Russian Federation  
**Operational Hub:** Gurgaon (Delhi NCR), India with liaison representative in Tashkent  

---

## 1. Executive Rationale & Demand Analysis

Central Asian patients form one of the highest-volume international patient corridors to Delhi NCR, with Uzbekistan and Kazakhstan representing major segments.
- **Uzbekistan:** High demand for living donor kidney and liver transplants, joint replacements, and pediatric cardiac surgery. Tashkent-Delhi flights operate multiple times weekly (under 3 hours).
- **Kazakhstan:** Patients from Almaty and Astana frequently seek robotic orthopedic surgery, neuro-oncology, and advanced cardiology.
- **Language Preferences:**
  - **Russian (`ru`):** The primary lingua franca across Central Asia and the CIS for medical and scientific terminology. 85%+ of medical reports from Tashkent, Almaty, and Bishkek are drafted in Russian.
  - **Uzbek (`uz`):** Essential for native trust, community outreach, and direct patient-attendant communications across the regions of Uzbekistan (Tashkent, Samarkand, Bukhara, Fergana).

---

## 2. Technical Architecture for `/ru` and `/uz` Subpaths

### A. Routing and Middleware Integration
The routing engine in `src/middleware.ts` and `src/lib/i18n/config.ts` is designed for seamless locale expansion:

```typescript
// Future config update:
export const LOCALES: Locale[] = ['en', 'ar', 'ru', 'uz'];
export const DEFAULT_LOCALE: Locale = 'en';

export function isRTL(locale: Locale): boolean {
  return locale === 'ar'; // ru and uz are Left-to-Right (LTR)
}
```

### B. Typography & Font Strategy
- **Russian (`ru`):** Uses **Inter** (already loaded), which contains full Cyrillic and Cyrillic Extended glyph subsets with excellent x-height readability.
- **Uzbek (`uz`):**
  - Modern official Uzbek uses the **Latin alphabet** with specific modifier characters (`o'`, `g'`). Inter provides complete support for all Uzbek Latin diacritics.
  - For older demographic materials, Cyrillic Uzbek is supported natively by Inter's Cyrillic character range.

### C. Dictionary Schema Extension
The dictionary model in `src/lib/i18n/dictionaries.ts` requires adding `ru` and `uz` JSON/TypeScript records:
- `ru.json` / `uz.json`: UI labels, navigation menus, form placeholders, trust badges, emergency contacts.
- Data entities in `src/data/`:
  Extend `LocalizedString` to:
  ```typescript
  export interface LocalizedString {
    en: string;
    ar: string;
    ru?: string;
    uz?: string;
  }
  ```
  With graceful fallback: `stringObj[locale] || stringObj.en`.

---

## 3. Medical Travel Regulatory & Consular Procedures

### A. Uzbekistan Patient Pathway
1. **Embassy / Visa Center:**
   - Embassy of India, 16, Kara-Bulak (Vakhsh) Street, Mirzo-Ulugbek District, Tashkent.
   - Authorized Indian Visa Application Centre (IVAC) in Tashkent.
2. **Medical Visa Invitation Letter Requirements:**
   - Formal hospital letter from partner institution (Fortis, Artemis, Shalby Sanar, Marengo Asia) signed by Authorized Medical Superintendent.
   - Patient passport copy + accompanying donor/attendant passport copy.
   - Certified translation of domestic medical summary into English or Russian.
3. **Living Donor Organ Transplant Regulations (THOA - Transplantation of Human Organs Act):**
   - Mandatory State Authorization Committee approval in Delhi.
   - Proof of near-relationship: legalized Birth Certificates, Marriage Certificates, and Family Tree notarized by Uzbek Ministry of Justice and Indian Embassy in Tashkent.
   - Pre-departure HLA tissue typing and donor cross-match coordination.

### B. Kazakhstan Patient Pathway
1. **e-Medical Visa:**
   - Kazakh citizens are eligible for Indian electronic Medical Visas (e-Med Visa) processed online within 48 to 72 hours.
   - Requirements: Digital passport scan, photograph, hospital invitation letter.
2. **Flight Connectivity:**
   - Direct flights: Almaty (ALA) to Delhi (DEL) via Air Astana and IndiGo (approx. 3.5 hours).

---

## 4. Phase-Ready Rollout Checklist

- [x] Dedicated Country Pathway pages active for Uzbekistan, Kazakhstan, Turkmenistan, Afghanistan, Russia in `en` and `ar`.
- [x] Native Russian & Uzbek speaking coordinators highlighted in `src/data/coordinators.ts`.
- [ ] Ingest full Russian translation memory for 6 core specialties and 6 flagship treatments.
- [ ] Activate `/ru` route in Next.js middleware upon translation sign-off.
- [ ] Activate `/uz` route in Next.js middleware for targeted domestic campaigns.
- [ ] Connect Russian-language dedicated WhatsApp number routing for CIS incoming traffic.

