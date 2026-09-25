'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Activity,
  CheckCircle2,
  FileText,
  TrendingUp,
  Globe,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Image as ImageIcon,
  HeartHandshake,
  MessageSquareQuote,
  Youtube,
  Share2,
} from 'lucide-react';
import { ContentSummary } from '@/types/content';

interface SummaryData {
  totalLeads: number;
  highIntentLeads: number;
  convertedLeads: number;
  conversionRate: string;
  reportsReceived: number;
  uploadRate: string;
}

interface AnalyticsPayload {
  summary: SummaryData;
  funnel: { stage: string; count: number }[];
  topTreatments: { name: string; count: number }[];
  topCountries: { name: string; count: number }[];
  languageBreakdown: { en: number; ar: number };
  ga4_integration: {
    status: string;
    measurementId: string;
    notice: string;
  };
}

interface RecentLead {
  lead_id: string;
  created_at: string;
  name: string;
  whatsapp: string;
  country: string;
  treatment: string;
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
  report_uploaded?: boolean;
}

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [contentSummary, setContentSummary] = useState<ContentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, leadsRes, contentRes] = await Promise.all([
        fetch('/api/admin/analytics?period=30d'),
        fetch('/api/admin/leads?limit=6'),
        fetch('/api/admin/content/summary'),
      ]);

      if (!analyticsRes.ok || !leadsRes.ok) {
        throw new Error('Failed to load dashboard metrics');
      }

      const analyticsJson = await analyticsRes.json();
      const leadsJson = await leadsRes.json();
      const contentJson = contentRes.ok ? await contentRes.json() : null;

      setAnalytics(analyticsJson);
      setRecentLeads(leadsJson.leads || []);
      if (contentJson?.summary) {
        setContentSummary(contentJson.summary);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-500/15 text-slate-400 border border-slate-500/30">
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const formatted = status.replace(/_/g, ' ');
    switch (status) {
      case 'NEW':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
            NEW
          </span>
        );
      case 'CONVERTED':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            CONVERTED
          </span>
        );
      case 'LOST':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-500/15 text-rose-400 border border-rose-500/30">
            LOST
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-teal-500/15 text-teal-300 border border-teal-500/30">
            {formatted}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Operations & Conversion Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time patient intake, clinical workflow progress, and acquisition funnel.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            href="/admin/leads"
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 rounded-lg shadow-sm transition-all"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white tracking-tight">
              {loading ? '...' : analytics?.summary.totalLeads ?? 0}
            </span>
            <span className="text-xs text-slate-500 font-medium">Last 30 Days</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>High Intent: </span>
            <span className="text-teal-400 font-semibold">
              {analytics?.summary.highIntentLeads ?? 0}
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Converted Cases
            </span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white tracking-tight">
              {loading ? '...' : analytics?.summary.convertedLeads ?? 0}
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              {analytics?.summary.conversionRate ?? '0%'} rate
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>Target conversion: </span>
            <span className="text-slate-300">12% - 15%</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Diagnostic Reports
            </span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white tracking-tight">
              {loading ? '...' : analytics?.summary.reportsReceived ?? 0}
            </span>
            <span className="text-xs text-purple-400 font-medium">
              {analytics?.summary.uploadRate ?? '0%'} attach rate
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>Isolated private storage</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Language Split
            </span>
            <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400 border border-teal-500/20">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-sm font-semibold text-white space-x-2">
              <span className="text-teal-400">
                EN: {analytics?.languageBreakdown.en ?? 0}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-blue-400">
                AR: {analytics?.languageBreakdown.ar ?? 0}
              </span>
            </div>
            <span className="text-xs text-slate-500">Bilingual</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>CIS / Central Asia + Arab focus</span>
          </div>
        </div>
      </div>

      {/* Content & Media Status (Phase 19) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-teal-400" />
              Content &amp; Media Status
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live published assets from Firebase Storage &amp; Firestore
            </p>
          </div>
          <Link
            href="/admin/content/media"
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Media Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Link
            href="/admin/content/media"
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              <span>Published Photos</span>
            </div>
            <div className="text-xl font-bold text-white">
              {loading ? '...' : contentSummary?.publishedPhotos ?? 0}
            </div>
          </Link>

          <Link
            href="/admin/content/patient-stories"
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Patient Stories</span>
            </div>
            <div className="text-xl font-bold text-white">
              {loading ? '...' : contentSummary?.patientStories ?? 0}
            </div>
          </Link>

          <Link
            href="/admin/content/testimonials"
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
              <span>Testimonials</span>
            </div>
            <div className="text-xl font-bold text-white">
              {loading ? '...' : contentSummary?.testimonials ?? 0}
            </div>
          </Link>

          <Link
            href="/admin/content/videos"
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>YouTube Videos</span>
            </div>
            <div className="text-xl font-bold text-white">
              {loading ? '...' : contentSummary?.youtubeVideos ?? 0}
            </div>
          </Link>

          <Link
            href="/admin/content/social"
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors col-span-2 sm:col-span-1"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Social Channels</span>
            </div>
            <div className="text-xl font-bold text-white">
              {loading ? '...' : contentSummary?.socialChannels ?? 0}
            </div>
          </Link>
        </div>
      </div>

      {/* Middle Grid: Conversion Funnel & Top Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Progress (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Medical Inquiry Pipeline
              </h2>
              <p className="text-xs text-slate-400">
                Progression of inquiries through clinical coordination stages
              </p>
            </div>
            <Link
              href="/admin/analytics"
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center space-x-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5 mt-4">
            {analytics?.funnel.map((item, index) => {
              const max = analytics.summary.totalLeads || 1;
              const percentage = Math.round((item.count / max) * 100);
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-300">
                      {index + 1}. {item.stage}
                    </span>
                    <span className="text-slate-400">
                      <strong className="text-white">{item.count}</strong> (
                      {percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Demanded Treatments (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-1">
              Top Clinical Requests
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Most requested treatments across international inquiries
            </p>

            <div className="space-y-2.5">
              {analytics?.topTreatments.slice(0, 5).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
                >
                  <span className="font-medium text-slate-200 truncate pr-2">
                    {item.name}
                  </span>
                  <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 font-semibold rounded border border-teal-500/20 shrink-0">
                    {item.count} leads
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Patient PII Isolated
            </span>
            <span className="text-slate-500">Zero-leak telemetry</span>
          </div>
        </div>
      </div>

      {/* Recent Leads Operational Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Inquiries</h2>
            <p className="text-xs text-slate-400">
              Latest patient requests received via website and modal funnels
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
          >
            <span>All Leads ({analytics?.summary.totalLeads ?? 0})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Treatment</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    {loading ? 'Loading recent leads...' : 'No inquiries recorded yet.'}
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr
                    key={lead.lead_id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-300">
                      {lead.lead_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {lead.whatsapp}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {lead.country || 'Unspecified'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="truncate max-w-[180px]">
                        {lead.treatment}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">{getScoreBadge(lead.score)}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.lead_id}`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 border border-teal-500/30 font-medium transition-colors"
                      >
                        <span>Manage</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

