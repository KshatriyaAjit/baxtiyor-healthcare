# Firebase Deployment Runbook: Baxtiyor Healthcare V2
**Project ID:** `baxtiyor-healthcare` | **Measurement ID:** `G-G7LBLQQZ2Y`  
**Date:** 2026-09-21 | **Framework:** Next.js 14/15 App Router

---

## 1. Verified Credentials & Project Integration

Your Firebase Web App credentials have been verified and integrated into the project:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCvNiEquadmLfkhyEJndMYVFzROaljHMCc",
  authDomain: "baxtiyor-healthcare.firebaseapp.com",
  projectId: "baxtiyor-healthcare",
  storageBucket: "baxtiyor-healthcare.firebasestorage.app",
  messagingSenderId: "29655441859",
  appId: "1:29655441859:web:8c30f5073364dcda7f1d76",
  measurementId: "G-G7LBLQQZ2Y"
};
```

### What Has Been Configured in the Project:
1. **`.env.local`:** Configured with all `NEXT_PUBLIC_FIREBASE_*` variables and `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-G7LBLQQZ2Y`.
2. **`src/lib/firebase/config.ts`:** Centralized SSR-safe singleton initializing `FirebaseApp` and `FirebaseAnalytics`.
3. **`src/lib/firebase/admin.ts`:** Server-only Firebase Admin SDK module with resilient local fallback.
4. **`src/lib/analytics/firebase-adapter.ts`:** Privacy-first analytics adapter enforcing strict zero-leak PII filtering.
5. **`firestore.rules`:** Production rules strictly denying direct client-side read/write to `leads`.
6. **`.firebaserc`:** Pre-configured with active project `baxtiyor-healthcare`.
7. **`firebase.json`:** Configured with Firestore rules, HTTP security headers, and static caching rules.
8. **`apphosting.yaml`:** Configured with production environment variables for Firebase App Hosting.
9. **`scripts/migrate-leads-to-firestore.mjs`:** Safe historical lead migration utility.

---

## 2. Authentication Step (Required Once)

The Firebase CLI is installed locally. Before running deployment commands, authenticate your CLI with the Google account that owns `baxtiyor-healthcare`:

```powershell
npx firebase-tools login
```
*This command will open a browser window to complete Google OAuth authentication.*

To verify authentication:
```powershell
npx firebase-tools projects:list
```

---

## 3. Deploying Firestore Security Rules

Before ingesting live production leads into Firestore, deploy the security rules to protect patient records:

```powershell
npx firebase-tools deploy --only firestore:rules
```

This guarantees that:
- Anonymous website visitors cannot read or query lead documents.
- Lead submissions must flow strictly through the server-side `/api/leads` route.

---

## 4. Historical Lead Migration

If you have historical test or production leads stored in `storage/leads.json`:

1. **Perform a dry-run (simulation with zero remote writes):**
   ```powershell
   node scripts/migrate-leads-to-firestore.mjs --dry-run
   ```
2. **Perform live migration (requires Admin credentials in env):**
   ```powershell
   $env:FIREBASE_SERVICE_ACCOUNT_KEY = Get-Content -Raw ./service-account.json
   node scripts/migrate-leads-to-firestore.mjs
   ```

*The migration tool creates a safe backup (`storage/leads.json.bak-<timestamp>`), uses `{ merge: true }` to prevent overwrites, and preserves the original file.*

---

## 5. Choose Your Firebase Deployment Method

### OPTION A: Firebase App Hosting (Recommended for Next.js Full-Stack)

Firebase App Hosting is Google's next-generation platform purpose-built for Next.js (App Router, Server-Side Rendering, and dynamic API routes like `/api/leads` and `/api/upload`).

> [!NOTE]
> App Hosting requires the Firebase project to be on the **Blaze (Pay-as-you-go)** plan. Firebase offers a generous free tier for Cloud Run and Cloud Build. You can upgrade at:  
> https://console.firebase.google.com/project/baxtiyor-healthcare/usage/details

#### Setup via Firebase Console (Simplest):
1. Open [Firebase Console App Hosting](https://console.firebase.google.com/project/baxtiyor-healthcare/apphosting).
2. Click **Get Started**.
3. Connect your GitHub repository (`d:\Medical Project`).
4. Select the `main` or `production` branch.
5. Root directory: `/` (repository root).
6. Firebase will automatically detect Next.js, read [`apphosting.yaml`](file:///d:/Medical%20Project/apphosting.yaml), compile the build, and deploy to a global Cloud Run + Cloud CDN URL (`https://baxtiyor-healthcare.web.app`).

---

### OPTION B: Firebase Hosting via CLI (Web Frameworks Integration)

You can deploy directly from your local terminal using Firebase's built-in web frameworks adapter:

1. **Enable experimental web frameworks:**
   ```powershell
   npx firebase-tools experiments:enable webframeworks
   ```

2. **Deploy to Firebase:**
   ```powershell
   npx firebase-tools deploy --only hosting
   ```
   *Firebase CLI will detect Next.js, run `npm run build`, upload static files to the Firebase Global CDN, and package dynamic routes (`/api/leads`, `/api/upload`) into Cloud Functions (Gen 2).*

---

### OPTION C: Static Export to Firebase CDN (100% Free on Spark Plan)

If your Firebase project is on the **Free Spark Plan** and you want zero-cost hosting without adding a credit card:

1. In `next.config.js`, set `output: 'export'`:
   ```javascript
   module.exports = {
     output: 'export',
     // ...
   };
   ```
2. Build static HTML:
   ```powershell
   npm run build
   ```
   *This outputs static HTML/CSS/JS files to the `out/` directory.*

3. Update `firebase.json` to point to `out`:
   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
     }
   }
   ```

4. Deploy:
   ```powershell
   npx firebase-tools deploy --only hosting
   ```

*(Note: Under static export, `/api/leads` and `/api/upload` Node routes are bypassed; patient contact flows route seamlessly via direct WhatsApp CTA buttons and phone links, which are already wired across all 108 pages).*

---

## 6. Connecting Your Custom Domain (`baxtiyorhealthcare.com`)

Once deployed to Firebase:
1. Go to [Firebase Console > Hosting](https://console.firebase.google.com/project/baxtiyor-healthcare/hosting).
2. Click **Add custom domain**.
3. Enter `baxtiyorhealthcare.com` and `www.baxtiyorhealthcare.com`.
4. Firebase will display 2 `A` records (IP addresses) or a `TXT` record for domain ownership verification.
5. In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), add the DNS records provided by Firebase.
6. Firebase will automatically provision and renew a free SSL certificate within 1 to 24 hours.

---

## 7. Zero-Leak Analytics Verification

To verify that Firebase Analytics is receiving events without leaking sensitive patient data:
1. Open [Firebase Console > Analytics > DebugView](https://console.firebase.google.com/project/baxtiyor-healthcare/analytics/debugview).
2. Browse the website in development with Google Analytics Debugger Chrome extension enabled.
3. Observe events: `page_view`, `lead_form_start`, `cta_click`, `whatsapp_click`.
4. Inspect event parameters: confirm only `locale`, `page_path`, `treatment_category`, `file_count` are transmitted.
5. Confirm that **zero** patient names, phone numbers, or uploaded document filenames ever appear in event payloads.
