'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Calendar,
  Globe,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Send,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { LEAD_STATUSES, LeadStatus } from '@/types/admin';

interface StatusHistoryItem {
  from: string;
  to: LeadStatus;
  timestamp: string;
  updated_by: string;
}

interface LeadDetail {
  lead_id: string;
  created_at: string;
  updated_at?: string;
  name: string;
  whatsapp: string;
  email?: string;
  country?: string;
  treatment?: string;
  relationship?: string;
  language?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  report_uploaded?: boolean;
  uploaded_file_count?: number;
  report_file_ids?: string[];
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status: LeadStatus;
  assigned_coordinator?: string;
  status_history?: StatusHistoryItem[];
  notes?: string;
  storage_target?: string;
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>('NEW');
  const [coordinator, setCoordinator] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchLead = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Lead not found');
        }
        throw new Error('Failed to retrieve lead detail');
      }
      const data = await res.json();
      setLead(data.lead);
      setSelectedStatus(data.lead.status);
      setCoordinator(data.lead.assigned_coordinator || '');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(false);

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: selectedStatus,
          assigned_coordinator: coordinator,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update lead');
      }

      const data = await res.json();
      setLead(data.lead);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error updating lead');
    } finally {
      setUpdating(false);
    }
  };

  const getCleanWhatsAppNumber = (num: string) => {
    return num.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/leads"
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {loading ? 'Loading Lead...' : lead?.name}
              </h1>
              {lead && (
                <span className="font-mono text-xs text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {lead.lead_id}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Inquiry submitted on{' '}
              {lead ? new Date(lead.created_at).toLocaleString() : ''}
            </p>
          </div>
        </div>

        {/* Intent Score Pill */}
        {lead && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Clinical Intent:</span>
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                lead.score === 'HIGH'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : lead.score === 'MEDIUM'
                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                  : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
              }`}
            >
              {lead.score} INTENT
            </span>
          </div>
        )}
      </div>

      {error ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
          <h2 className="text-base font-bold text-white">{error}</h2>
          <Link
            href="/admin/leads"
            className="inline-block px-4 py-2 text-xs font-semibold bg-slate-800 text-slate-200 rounded-lg"
          >
            Back to Leads
          </Link>
        </div>
      ) : loading || !lead ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          Loading clinical inquiry records...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 cols): Patient Info & Diagnostics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient & Inquiry Info Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Patient Information</span>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wider">
                  Relation: {lead.relationship || 'Self'}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    Direct Contact
                  </span>
                  <div className="font-semibold text-white text-sm">
                    {lead.name}
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-slate-300 font-mono">
                      {lead.whatsapp}
                    </span>
                    <a
                      href={`https://wa.me/${getCleanWhatsAppNumber(
                        lead.whatsapp
                      )}?text=${encodeURIComponent(
                        `Hello ${lead.name}, this is Baxtiyor Healthcare regarding your medical inquiry.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  {lead.email && (
                    <div className="text-slate-400 pt-0.5">{lead.email}</div>
                  )}
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    Clinical Request
                  </span>
                  <div className="font-semibold text-teal-300 text-sm">
                    {lead.treatment}
                  </div>
                  <div className="text-slate-400 flex items-center gap-2 pt-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lead.country || 'Unspecified'}</span>
                    <span>•</span>
                    <span className="uppercase font-mono font-medium text-slate-300">
                      {lead.language || 'en'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attribution & Marketing Origin */}
              <div className="pt-2 border-t border-slate-800/80">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Acquisition Attribution
                </h3>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-slate-500">Landing URL:</span>{' '}
                    <span className="font-mono text-slate-300 break-all">
                      {lead.landing_page || 'Direct / Organic Navigation'}
                    </span>
                  </div>
                  {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {lead.utm_source && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          source: {lead.utm_source}
                        </span>
                      )}
                      {lead.utm_medium && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          medium: {lead.utm_medium}
                        </span>
                      )}
                      {lead.utm_campaign && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          campaign: {lead.utm_campaign}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnostic Medical Reports Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Diagnostic Medical Documents</span>
                </h2>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Private Storage
                </span>
              </div>

              {lead.report_uploaded ||
              (lead.uploaded_file_count && lead.uploaded_file_count > 0) ? (
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-purple-300">
                        Patient attached diagnostic scan/report
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        File is isolated in private server storage. Content is never
                        streamed to analytics or exposed without admin authorization.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded">
                      {lead.uploaded_file_count || 1} Document(s)
                    </span>
                  </div>

                  {lead.report_file_ids && lead.report_file_ids.length > 0 ? (
                    <div className="space-y-2 pt-2">
                      {lead.report_file_ids.map((fileId, idx) => (
                        <div
                          key={fileId}
                          className="flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs"
                        >
                          <span className="font-mono text-slate-300 truncate pr-2">
                            Document #{idx + 1}: {fileId}
                          </span>
                          <a
                            href={`/api/admin/reports/${fileId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-md font-medium transition-colors shrink-0"
                          >
                            <Download className="w-3 h-3" />
                            <span>View / Download</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 pt-1">
                      Uploaded during intake. Available in local/cloud storage repository.
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>No medical diagnostic reports uploaded with initial inquiry.</span>
                  <span className="text-[11px] text-slate-500">
                    Coordinator will request scans via WhatsApp.
                  </span>
                </div>
              )}
            </div>

            {/* Status Transition History Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Workflow Audit Trail</span>
              </h2>

              {lead.status_history && lead.status_history.length > 0 ? (
                <div className="space-y-3">
                  {lead.status_history.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 font-mono">
                            {h.from}
                          </span>
                          <span className="text-teal-400">➔</span>
                          <span className="font-bold text-teal-300">
                            {h.to}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Updated by: {h.updated_by}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(h.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Initial intake status. No subsequent status transitions recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Right Column (1 col): Workflow Actions & Assignment */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-6">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Lead Operations
              </h2>

              {updateSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Lead workflow successfully updated!</span>
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Status Selector */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Workflow Stage
                  </label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as LeadStatus)}
                    className="block w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                  >
                    {LEAD_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Updates recorded in historical audit log.
                  </p>
                </div>

                {/* Assigned Coordinator */}
                <div>
                  <label
                    htmlFor="coordinator"
                    className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Assigned Coordinator
                  </label>
                  <input
                    id="coordinator"
                    type="text"
                    value={coordinator}
                    onChange={(e) => setCoordinator(e.target.value)}
                    placeholder="e.g. Jasur (Uzbek) / Dr. Tariq (Arabic)"
                    className="block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Language-matched coordinator for personal patient support.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 transition-all"
                >
                  {updating ? 'Saving Changes...' : 'Save Workflow Update'}
                </button>
              </form>

              {/* Quick WhatsApp Action Box */}
              <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-slate-300 block">
                  Quick Communication
                </span>
                <a
                  href={`https://wa.me/${getCleanWhatsAppNumber(
                    lead.whatsapp
                  )}?text=${encodeURIComponent(
                    `Hello ${lead.name}, this is Baxtiyor Healthcare regarding your inquiry for ${lead.treatment} in India.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

