import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin, ADMIN_COOKIE_NAME } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';
import { getClientIdentifier } from '@/lib/security/rate-limit';

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin(request);
  const clientIp = getClientIdentifier(request);

  if (admin) {
    await recordAuditLog('admin.logout', admin.email, clientIp, {
      role: admin.role,
    });
  }

  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.',
  });

  // Clear session cookie
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

