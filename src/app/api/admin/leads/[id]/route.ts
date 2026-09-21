import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import {
  getLeadById,
  updateLeadStatus,
  assignLeadCoordinator,
  LEAD_STATUSES,
  LeadStatus,
} from '@/lib/admin/leads';
import { recordAuditLog } from '@/lib/admin/audit';
import { getClientIdentifier } from '@/lib/security/rate-limit';

const PatchLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  assigned_coordinator: z.string().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  const { id } = params;
  const lead = await getLeadById(id);

  if (!lead) {
    return NextResponse.json(
      { success: false, message: 'Lead not found.' },
      { status: 404 }
    );
  }

  const clientIp = getClientIdentifier(request);
  await recordAuditLog('lead.detail_viewed', admin.email, clientIp, {
    lead_id: id,
  });

  return NextResponse.json({
    success: true,
    lead,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  const { id } = params;
  const clientIp = getClientIdentifier(request);

  try {
    const body = await request.json();
    const validated = PatchLeadSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: validated.error.errors[0]?.message || 'Invalid update data.',
        },
        { status: 400 }
      );
    }

    let updatedLead = await getLeadById(id);
    if (!updatedLead) {
      return NextResponse.json(
        { success: false, message: 'Lead not found.' },
        { status: 404 }
      );
    }

    const { status, assigned_coordinator } = validated.data;

    if (status && status !== updatedLead.status) {
      const prevStatus = updatedLead.status;
      updatedLead = await updateLeadStatus(id, status as LeadStatus, admin.email);

      await recordAuditLog('lead.status_updated', admin.email, clientIp, {
        lead_id: id,
        previous_status: prevStatus,
        new_status: status,
      });
    }

    if (
      assigned_coordinator !== undefined &&
      assigned_coordinator !== updatedLead?.assigned_coordinator
    ) {
      updatedLead = await assignLeadCoordinator(
        id,
        assigned_coordinator,
        admin.email
      );

      await recordAuditLog('lead.coordinator_assigned', admin.email, clientIp, {
        lead_id: id,
        assigned_coordinator,
      });
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      message: 'Lead updated successfully.',
    });
  } catch (error) {
    console.error(`[Lead Update Error for ${id}]:`, error);
    return NextResponse.json(
      { success: false, message: 'Failed to update lead.' },
      { status: 500 }
    );
  }
}

