import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limit';
import {
  authService,
  createSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/admin/auth';
import { SESSION_MAX_AGE_SECONDS } from '@/lib/admin/session';
import { recordAuditLog } from '@/lib/admin/audit';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export async function POST(request: Request) {
  const clientIp = getClientIdentifier(request);

  // Strict Brute-Force Rate Limiting: 5 attempts per 15 minutes
  const rateLimit = checkRateLimit(`admin_login:${clientIp}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.success) {
    await recordAuditLog('admin.login.failed', 'unknown', clientIp, {
      reason: 'rate_limit_exceeded',
    });

    return NextResponse.json(
      {
        success: false,
        message:
          'Too many failed login attempts. Please wait 15 minutes before trying again.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: validated.error.errors[0]?.message || 'Invalid input.',
        },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;
    const user = await authService.authenticate({ email, password });

    if (!user) {
      await recordAuditLog('admin.login.failed', email, clientIp, {
        reason: 'invalid_credentials',
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Invalid administrative email or password.',
        },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = await createSessionToken({
      email: user.email,
      role: user.role,
    });

    // Record successful login in audit log
    await recordAuditLog('admin.login.success', user.email, clientIp, {
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

    // Set HttpOnly, Secure session cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    return NextResponse.json(
      { success: false, message: 'An internal error occurred during authentication.' },
      { status: 500 }
    );
  }
}

