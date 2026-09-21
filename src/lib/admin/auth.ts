import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  verifySessionToken,
  createSessionToken,
  AdminSessionPayload,
} from './session';

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'coordinator';
  name?: string;
}

export interface AdminAuthService {
  authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<AdminUser | null>;
  verifySession(token: string): Promise<AdminUser | null>;
}

/**
 * Constant-time string equality check to prevent timing attacks.
 */
function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Temporary Development Authentication Service
 * Validates against environment variables ADMIN_EMAIL and ADMIN_PASSWORD.
 */
export class EnvAuthService implements AdminAuthService {
  async authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<AdminUser | null> {
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      console.warn(
        '[Admin Auth] ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables.'
      );
      return null;
    }

    const emailMatch = safeCompare(
      credentials.email.trim().toLowerCase(),
      expectedEmail.trim().toLowerCase()
    );
    const passwordMatch = safeCompare(credentials.password, expectedPassword);

    if (emailMatch && passwordMatch) {
      return {
        id: 'env-admin-1',
        email: expectedEmail,
        role: 'super_admin',
        name: 'Baxtiyor Operations Admin',
      };
    }

    return null;
  }

  async verifySession(token: string): Promise<AdminUser | null> {
    const payload = await verifySessionToken(token);
    if (!payload) {
      return null;
    }

    return {
      id: `admin-${payload.email}`,
      email: payload.email,
      role: payload.role,
      name: 'Operations Admin',
    };
  }
}

/**
 * Future Firebase Authentication Service Interface
 *
 * When migrating from temporary credentials to Firebase Auth:
 * 1. Initialize Firebase Admin Auth (getAuth from 'firebase-admin/auth').
 * 2. In authenticate(), exchange Firebase ID Token from client.
 * 3. In verifySession(), call verifyIdToken() and check custom claims (admin: true).
 */
export class FirebaseAuthService implements AdminAuthService {
  async authenticate(): Promise<AdminUser | null> {
    throw new Error(
      'FirebaseAuthService is prepared for production migration. Currently using EnvAuthService.'
    );
  }

  async verifySession(): Promise<AdminUser | null> {
    throw new Error(
      'FirebaseAuthService is prepared for production migration. Currently using EnvAuthService.'
    );
  }
}

// Active singleton authentication service
export const authService: AdminAuthService = new EnvAuthService();

/**
 * Retrieves the currently authenticated admin user from the request or cookies.
 * Safe for use in Server Components and API Route Handlers.
 */
export async function getAuthenticatedAdmin(
  request?: Request
): Promise<AdminUser | null> {
  let token: string | undefined;

  if (request) {
    // Check Authorization header (Bearer token) or Cookie header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(
        new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]*)`)
      );
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    } catch {
      // Outside request context
    }
  }

  if (!token) {
    return null;
  }

  return authService.verifySession(token);
}

export { createSessionToken, ADMIN_COOKIE_NAME };

