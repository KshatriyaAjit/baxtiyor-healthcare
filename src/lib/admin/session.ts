/**
 * Universal Admin Session Management
 *
 * Implements cryptographic HMAC-SHA256 session token generation and verification
 * using the standard Web Crypto API (crypto.subtle), ensuring seamless operation
 * across both Next.js Edge Middleware and Node.js Route Handlers without external dependencies.
 */

export interface AdminSessionPayload {
  email: string;
  role: 'super_admin' | 'admin' | 'coordinator';
  iat: number;
  exp: number;
}

export const ADMIN_COOKIE_NAME = 'admin_session';

// 8 hours session duration
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

function getSecret(customSecret?: string): string {
  const secret =
    customSecret ||
    process.env.ADMIN_SESSION_SECRET ||
    'baxtiyor-default-internal-fallback-secret-2026-secure';
  return secret;
}

function base64UrlEncode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  // Browser / Edge fallback
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
  // Browser / Edge fallback
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function base64UrlFromBuffer(buffer: ArrayBuffer): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function bufferFromBase64Url(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getCryptoKey(secret: string, usages: KeyUsage[]): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usages
  );
}

/**
 * Signs an admin session payload and returns a compact token.
 */
export async function createSessionToken(
  payload: Omit<AdminSessionPayload, 'iat' | 'exp'>,
  customSecret?: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: AdminSessionPayload = {
    ...payload,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };

  const jsonPayload = JSON.stringify(fullPayload);
  const encodedPayload = base64UrlEncode(jsonPayload);

  const secret = getSecret(customSecret);
  const key = await getCryptoKey(secret, ['sign']);
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(encodedPayload)
  );
  const encodedSignature = base64UrlFromBuffer(signatureBuffer);

  return `${encodedPayload}.${encodedSignature}`;
}

/**
 * Verifies an admin session token and returns the payload if valid.
 */
export async function verifySessionToken(
  token: string | undefined | null,
  customSecret?: string
): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, encodedSignature] = parts;
  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  try {
    const secret = getSecret(customSecret);
    const key = await getCryptoKey(secret, ['verify']);
    const enc = new TextEncoder();
    const sigBytes = bufferFromBase64Url(encodedSignature);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(encodedPayload)
    );

    if (!isValid) {
      return null;
    }

    const jsonPayload = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(jsonPayload) as AdminSessionPayload;

    // Verify expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

