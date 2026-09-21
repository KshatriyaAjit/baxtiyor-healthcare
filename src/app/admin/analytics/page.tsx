'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Globe,
  TrendingUp,
  Activity,
  FileText,
  ShieldAlert,
  Info,
  RefreshCw,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface SummaryData {
  totalLeads: number;
  highIntentLeads: number;
  convertedLeads: number;
  conversionRate: string;
  reportsReceived: number;
  uploadRate: string;
}

interface AnalyticsResponse {
  period: string;
  summary: SummaryData;
  scoreBreakdown: { HIGH: number; MEDIUM: number; LOW: number };
  statusBreakdown: Record<string, number>;
  funnel: { stage: string; count: number }[];
  topTreatments: { name: string; count: number }[];
  topCountries: { name: string; count: number }[];
  languageBreakdown: { en: number; ar: number };
  ga4_integration: {
    status: string;
    measurementId: string;
    serverApiAvailable: boolean;
    notice: string;
  };
}

const PERIOD_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: 'All Time', value: 'all' },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState('30d');
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async (selectedPeriod: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?period=${selectedPeriod}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Analytics load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const totalLanguageCount =
    (data?.languageBreakdown.en ?? 0) + (data?.languageBreakdown.ar ?? 0) || 1;
  const enPercent = Math.round(
    ((data?.languageBreakdown.en ?? 0) / totalLanguageCount) * 100
  );
  const arPercent = 100 - enPercent;

  return (
    <div className="space-y-6">
      {/* Header and Period Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            Conversion & Traffic Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Anonymous behavioral telemetry, funnel progression, and regional demand.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === opt.value
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* GA4 / Firebase Analytics Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400 border border-teal-500/20 shrink-0 mt-0.5">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Firebase Analytics Stream Active
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Measurement ID: {data?.ga4_integration.measurementId}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Google Consent Mode v2 is actively dispatching zero-leak anonymous page
              views and CTA interactions to your Firebase project.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400">Privacy Status:</span>{' '}
          <span className="text-xs font-semibold text-emerald-400">
            Zero PII Dispatched
          </span>
        </div>
      </div>

      {/* Key Conversion Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Inquiries Received</span>
          <div className="mt-2 text-2xl font-bold text-white">
            {loading ? '...' : data?.summary.totalLeads ?? 0}
          </div>
          <span className="text-[11px] text-slate-500">Period: {period.toUpperCase()}</span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-medium text-slate-400">High-Intent Leads</span>
          <div className="mt-2 text-2xl font-bold text-teal-400">
            {loading ? '...' : data?.summary.highIntentLeads ?? 0}
          </div>
          <span className="text-[11px] text-teal-500/80 font-medium">
            Medical reports or specific procedure
          </span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Overall Conversion Rate</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400">
            {loading ? '...' : data?.summary.conversionRate ?? '0%'}
          </div>
          <span className="text-[11px] text-emerald-500/80 font-medium">
            Inquiry ➔ Treatment confirmation
          </span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Report Attachment Rate</span>
          <div className="mt-2 text-2xl font-bold text-purple-400">
            {loading ? '...' : data?.summary.uploadRate ?? '0%'}
          </div>
          <span className="text-[11px] text-purple-500/80 font-medium">
            Patients submitting diagnostic PDFs/scans
          </span>
        </div>
      </div>

      {/* Funnel & Language Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                International Patient Acquisition Funnel
              </h2>
              <p className="text-xs text-slate-400">
                Patient lifecycle progression for selected period
              </p>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
              {period}
            </span>
          </div>

          <div className="space-y-4 mt-6">
            {data?.funnel.map((item, index) => {
              const max = data.summary.totalLeads || 1;
              const percentage = Math.round((item.count / max) * 100);
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      Stage {index + 1}: {item.stage}
                    </span>
                    <span className="text-slate-400">
                      <strong className="text-white text-sm">{item.count}</strong> (
                      {percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(percentage, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Language & Regional Split (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-1">
              Bilingual Engagement Split
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Patient engagement by localized language
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-teal-400">English (/en)</span>
                  <span className="text-white">
                    {data?.languageBreakdown.en ?? 0} leads ({enPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-400 h-full rounded-full"
                    style={{ width: `${enPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Targeting CIS, Central Asia, and English-speaking international patients.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-blue-400">Arabic (/ar)</span>
                  <span className="text-white">
                    {data?.languageBreakdown.ar ?? 0} leads ({arPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full"
                    style={{ width: `${arPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Targeting Gulf Cooperation Council (GCC) & Arab-speaking families.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            * Automatic detection via browser Accept-Language and localized subpaths.
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Demand and Countries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Demanded Specialties & Procedures */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-1">
            Top Requested Medical Specialties
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Procedures with highest volume of inquiries in selected period
          </p>

          <div className="space-y-2.5">
            {data?.topTreatments.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
              >
                <div className="flex items-center space-x-2.5 truncate pr-2">
                  <span className="font-mono text-slate-500 text-[11px] w-4">
                    #{idx + 1}
                  </span>
                  <span className="font-medium text-slate-200 truncate">
                    {item.name}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 font-semibold rounded-md border border-teal-500/20 shrink-0">
                  {item.count} inquiries
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Patient Origin Countries */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-1">
            Top Patient Geographic Origins
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Aggregate origin of patients seeking medical care in India
          </p>

          <div className="space-y-2.5">
            {data?.topCountries.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
              >
                <div className="flex items-center space-x-2.5 truncate pr-2">
                  <span className="font-mono text-slate-500 text-[11px] w-4">
                    #{idx + 1}
                  </span>
                  <span className="font-medium text-slate-200 truncate">
                    {item.name}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 font-semibold rounded-md border border-blue-500/20 shrink-0">
                  {item.count} patients
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

