import 'server-only';
import fs from 'fs';
import path from 'path';
import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

/**
 * Server-Side Firebase Admin Initialization
 *
 * CRITICAL SECURITY & RESILIENCE RULES:
 * 1. This file is guarded by 'server-only' - it can NEVER be bundled into client JS.
 * 2. Service account credentials must NEVER be committed to Git or exposed via API.
 * 3. Never expose credentials to browser/client code.
 * 4. Never place service account values in NEXT_PUBLIC_* variables.
 * 5. In production, fail explicitly if Firebase is expected but credentials fail,
 *    preventing silent operational data loss.
 */

let firestoreInstance: Firestore | null = null;
let adminInitialized = false;

function resolveServiceAccount(): ServiceAccount | null {
  // 1. Explicit environment variable: FIREBASE_SERVICE_ACCOUNT_KEY (JSON or Base64)
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountKey) {
    try {
      if (serviceAccountKey.trim().startsWith('{')) {
        return JSON.parse(serviceAccountKey) as ServiceAccount;
      }
      const decoded = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
      return JSON.parse(decoded) as ServiceAccount;
    } catch (e) {
      console.error('[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY');
    }
  }

  // 2. GOOGLE_APPLICATION_CREDENTIALS path
  const gCredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (gCredPath && fs.existsSync(gCredPath)) {
    try {
      const fileData = fs.readFileSync(gCredPath, 'utf8');
      return JSON.parse(fileData) as ServiceAccount;
    } catch (e) {
      console.error('[Firebase Admin] Failed to read GOOGLE_APPLICATION_CREDENTIALS from file path');
    }
  }

  // 3. Auto-discover service-account JSON in secrets directory (for local development)
  try {
    const secretsDir = path.join(process.cwd(), 'secrets');
    if (fs.existsSync(secretsDir)) {
      const files = fs.readdirSync(secretsDir);
      const saFile = files.find(
        (f) => f.includes('firebase-adminsdk') && f.endsWith('.json')
      );
      if (saFile) {
        const fullPath = path.join(secretsDir, saFile);
        const fileData = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(fileData) as ServiceAccount;
      }
    }
  } catch {
    // Ignore discovery errors
  }

  return null;
}

function initAdmin(): boolean {
  if (adminInitialized && firestoreInstance) {
    return true;
  }

  if (getApps().length > 0) {
    firestoreInstance = getFirestore();
    adminInitialized = true;
    return true;
  }

  try {
    const projectId =
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'baxtiyor-healthcare';
    const saObj = resolveServiceAccount();

    if (saObj) {
      initializeApp({
        credential: cert(saObj),
        projectId,
        storageBucket:
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          'baxtiyor-healthcare.firebasestorage.app',
      });
      firestoreInstance = getFirestore();
      adminInitialized = true;
      return true;
    }

    // 4. Attempt Application Default Credentials (e.g., GCP Cloud Run / App Hosting)
    const isGcpEnvironment = Boolean(
      process.env.K_SERVICE ||
      process.env.FIREBASE_CONFIG ||
      process.env.GCLOUD_PROJECT
    );

    if (isGcpEnvironment) {
      initializeApp({
        credential: applicationDefault(),
        projectId,
        storageBucket:
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          'baxtiyor-healthcare.firebasestorage.app',
      });
      firestoreInstance = getFirestore();
      adminInitialized = true;
      return true;
    }

    // 5. In production mode, fail clearly if credentials are missing
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[CRITICAL] Firebase Admin credentials missing in production. Firestore and Cloud Storage are unconfigured.'
      );
      return false;
    }

    // Local development fallback notice
    if (process.env.NODE_ENV !== 'test') {
      console.info(
        '[Firebase Admin] Running in offline development mode with resilient local storage.'
      );
    }
  } catch (err) {
    console.warn('[Firebase Admin Initialization Failed]:', err);
  }

  return false;
}

/**
 * Returns Firestore database instance, or null if Admin credentials are not configured.
 */
export function getFirestoreDb(): Firestore | null {
  initAdmin();
  return firestoreInstance;
}

/**
 * Checks if Firebase Admin is fully operational with remote credentials.
 */
export function isFirebaseAdminConfigured(): boolean {
  return initAdmin();
}

/**
 * Returns Firebase Storage Bucket instance, or null if Admin credentials are not configured.
 */
export function getStorageBucket() {
  if (!initAdmin()) return null;
  const bucketName =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'baxtiyor-healthcare.firebasestorage.app';
  try {
    return getStorage().bucket(bucketName);
  } catch {
    return null;
  }
}
