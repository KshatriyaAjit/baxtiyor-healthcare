import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin(request);

  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated.' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    },
  });
}

