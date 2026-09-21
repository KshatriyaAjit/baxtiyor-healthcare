import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { getAllLeads } from '@/lib/admin/leads';

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '25', 10)));
  const search = (searchParams.get('search') || '').trim().toLowerCase();
  const statusFilter = searchParams.get('status');
  const scoreFilter = searchParams.get('score');
  const langFilter = searchParams.get('language');

  try {
    const allLeads = await getAllLeads();

    // Filter leads
    let filtered = allLeads;

    if (search) {
      filtered = filtered.filter((lead) => {
        const leadId = (lead.lead_id || '').toLowerCase();
        const name = (lead.name || '').toLowerCase();
        const whatsapp = (lead.whatsapp || '').toLowerCase();
        const country = (lead.country || '').toLowerCase();
        const treatment = (lead.treatment || '').toLowerCase();
        return (
          leadId.includes(search) ||
          name.includes(search) ||
          whatsapp.includes(search) ||
          country.includes(search) ||
          treatment.includes(search)
        );
      });
    }

    if (statusFilter && statusFilter !== 'ALL') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (scoreFilter && scoreFilter !== 'ALL') {
      filtered = filtered.filter((lead) => lead.score === scoreFilter);
    }

    if (langFilter && langFilter !== 'ALL') {
      filtered = filtered.filter((lead) => lead.language === langFilter);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedLeads = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages,
      leads: paginatedLeads,
    });
  } catch (error) {
    console.error('[Admin Leads API Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve leads.' },
      { status: 500 }
    );
  }
}

