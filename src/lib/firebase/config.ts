import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

/**
 * Firebase Web App Configuration for Baxtiyor Healthcare V2
 * Values default to provided credentials, overridable via NEXT_PUBLIC_ env vars.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCvNiEquadmLfkhyEJndMYVFzROaljHMCc',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'baxtiyor-healthcare.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'baxtiyor-healthcare',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'baxtiyor-healthcare.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '29655441859',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:29655441859:web:8c30f5073364dcda7f1d76',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-G7LBLQQZ2Y',
};

// Initialize Firebase singleton safely across SSR and Client-side environments
export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Analytics is only supported in client/browser environments with window & IndexedDB
let analyticsInstance: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;

  try {
    const supported = await isSupported();
    if (supported) {
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    }
  } catch (err) {
    console.warn('Firebase Analytics not supported in this environment:', err);
  }
  return null;
}

