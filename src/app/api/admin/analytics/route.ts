import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { getAllLeads, AdminLead } from '@/lib/admin/leads';

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Authentication required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d'; // today | 7d | 30d | 90d | all

  try {
    const leads = await getAllLeads();

    // Determine cutoff timestamp
    const now = new Date();
    let cutoff: Date | null = null;

    if (period === 'today') {
      cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === '7d') {
      cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === '30d') {
      cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (period === '90d') {
      cutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    }

    const filteredLeads = cutoff
      ? leads.filter((l) => new Date(l.created_at) >= cutoff!)
      : leads;

    // Metrics computation
    const totalLeads = filteredLeads.length;

    const scoreCounts = {
      HIGH: filteredLeads.filter((l) => l.score === 'HIGH').length,
      MEDIUM: filteredLeads.filter((l) => l.score === 'MEDIUM').length,
      LOW: filteredLeads.filter((l) => l.score === 'LOW').length,
    };

    const statusCounts: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
    });

    const convertedLeads = statusCounts['CONVERTED'] || 0;
    const conversionRate =
      totalLeads > 0
        ? ((convertedLeads / totalLeads) * 100).toFixed(1) + '%'
        : '0.0%';

    const reportCount = filteredLeads.filter(
      (l) => l.report_uploaded || (l.uploaded_file_count && l.uploaded_file_count > 0)
    ).length;
    const uploadRate =
      totalLeads > 0
        ? ((reportCount / totalLeads) * 100).toFixed(1) + '%'
        : '0.0%';

    // Top Treatments
    const treatmentMap: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      const treatment = l.treatment || 'General Consultation';
      treatmentMap[treatment] = (treatmentMap[treatment] || 0) + 1;
    });
    const topTreatments = Object.entries(treatmentMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Top Countries
    const countryMap: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      const country = l.country || 'Unspecified';
      countryMap[country] = (countryMap[country] || 0) + 1;
    });
    const topCountries = Object.entries(countryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Language Distribution
    const languageCounts = {
      en: filteredLeads.filter((l) => l.language === 'en').length,
      ar: filteredLeads.filter((l) => l.language === 'ar').length,
    };

    // Conversion Funnel Stages
    const funnel = [
      { stage: 'Total Inquiries', count: totalLeads },
      {
        stage: 'Contacted',
        count: filteredLeads.filter((l) => l.status !== 'NEW').length,
      },
      {
        stage: 'Clinical Review',
        count: filteredLeads.filter(
          (l) =>
            l.status === 'MEDICAL_REVIEW' ||
            l.status === 'HOSPITAL_OPTIONS_SENT' ||
            l.status === 'QUOTE_RECEIVED' ||
            l.status === 'PATIENT_DECISION' ||
            l.status === 'TRAVEL_PLANNED' ||
            l.status === 'ARRIVED_INDIA' ||
            l.status === 'TREATMENT' ||
            l.status === 'CONVERTED'
        ).length,
      },
      {
        stage: 'Treatment / Travel',
        count: filteredLeads.filter(
          (l) =>
            l.status === 'TRAVEL_PLANNED' ||
            l.status === 'ARRIVED_INDIA' ||
            l.status === 'TREATMENT' ||
            l.status === 'CONVERTED'
        ).length,
      },
      { stage: 'Converted', count: convertedLeads },
    ];

    return NextResponse.json({
      success: true,
      period,
      summary: {
        totalLeads,
        highIntentLeads: scoreCounts.HIGH,
        convertedLeads,
        conversionRate,
        reportsReceived: reportCount,
        uploadRate,
      },
      scoreBreakdown: scoreCounts,
      statusBreakdown: statusCounts,
      funnel,
      topTreatments,
      topCountries,
      languageBreakdown: languageCounts,
      ga4_integration: {
        status: 'client_tracking_active',
        measurementId:
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-G7LBLQQZ2Y',
        serverApiAvailable: Boolean(process.env.GA4_PROPERTY_ID),
        notice:
          'Client-side Google Consent Mode v2 and Firebase Analytics are collecting zero-leak anonymous events. Server-side GA4 Data API streaming is ready to connect via GA4_PROPERTY_ID.',
      },
    });
  } catch (error) {
    console.error('[Analytics API Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate analytics summary.' },
      { status: 500 }
    );
  }
}

