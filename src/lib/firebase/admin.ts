import 'server-only';
import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
  ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

/**
 * Server-Side Firebase Admin Initialization
 *
 * CRITICAL SECURITY & RESILIENCE RULES:
 * 1. This file is guarded by 'server-only' - it can NEVER be bundled into client JS.
 * 2. Service account credentials must NEVER be committed to Git or exposed via API.
 * 3. If credentials are not configured (e.g. local development or CI), operations
 *    fail gracefully and return null, allowing API routes to fall back to safe
 *    server-side storage without crashing or returning HTTP 500.
 */

let firestoreInstance: Firestore | null = null;
let adminInitialized = false;

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
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId =
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'baxtiyor-healthcare';

    if (serviceAccountKey) {
      let certObj: ServiceAccount;
      if (serviceAccountKey.trim().startsWith('{')) {
        certObj = JSON.parse(serviceAccountKey);
      } else {
        // Assume Base64 encoded JSON
        const decoded = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
        certObj = JSON.parse(decoded);
      }

      initializeApp({
        credential: cert(certObj),
        projectId,
      });
      firestoreInstance = getFirestore();
      adminInitialized = true;
      return true;
    }

    // Attempt Application Default Credentials (for Google Cloud / App Hosting / Cloud Run runtimes)
    const isGcpEnvironment = Boolean(
      process.env.K_SERVICE ||
      process.env.FIREBASE_CONFIG ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.GCLOUD_PROJECT
    );

    if (isGcpEnvironment) {
      initializeApp({
        credential: applicationDefault(),
        projectId,
      });
      firestoreInstance = getFirestore();
      adminInitialized = true;
      return true;
    }

    // Local / uncredentialed environment - use resilient local fallback
    if (process.env.NODE_ENV !== 'test') {
      console.info(
        '[Firebase Admin] No FIREBASE_SERVICE_ACCOUNT_KEY or Google Cloud runtime detected. Utilizing resilient local fallback storage.'
      );
    }
  } catch (err) {
    console.warn('[Firebase Admin Initialization Failed - Using Fallback]:', err);
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

