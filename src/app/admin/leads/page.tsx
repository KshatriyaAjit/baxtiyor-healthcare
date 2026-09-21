'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  FileText,
  Calendar,
  Phone,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { LEAD_STATUSES } from '@/types/admin';

interface LeadItem {
  lead_id: string;
  created_at: string;
  name: string;
  whatsapp: string;
  country?: string;
  treatment?: string;
  language?: string;
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
  assigned_coordinator?: string;
  report_uploaded?: boolean;
  uploaded_file_count?: number;
  utm_source?: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState('ALL');
  const [langFilter, setLangFilter] = useState('ALL');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (scoreFilter !== 'ALL') params.set('score', scoreFilter);
      if (langFilter !== 'ALL') params.set('language', langFilter);
      params.set('limit', '50');

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, scoreFilter, langFilter]);

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30">
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
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            NEW
          </span>
        );
      case 'CONVERTED':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            CONVERTED
          </span>
        );
      case 'LOST':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            LOST
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-teal-500/15 text-teal-300 border border-teal-500/30">
            {formatted}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-teal-400" />
            Patient Leads Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Operational triage, clinical coordination workflow, and inquiry pipeline.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-teal-400">
            Total Leads: {total}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, ID..."
              className="block w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">All Statuses ({LEAD_STATUSES.length})</option>
              {LEAD_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Intent Score Filter */}
          <div className="relative">
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="block w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">All Intent Scores</option>
              <option value="HIGH">HIGH Intent</option>
              <option value="MEDIUM">MEDIUM Intent</option>
              <option value="LOW">LOW Intent</option>
            </select>
          </div>

          {/* Language Filter */}
          <div className="relative">
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="block w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">All Languages</option>
              <option value="en">English (/en)</option>
              <option value="ar">Arabic (/ar)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table (Desktop) / Cards (Mobile) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Patient / Contact</th>
                <th className="py-3 px-4">Country & Lang</th>
                <th className="py-3 px-4">Requested Procedure</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4">Coordinator</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    {loading ? 'Fetching inquiries...' : 'No leads match the selected criteria.'}
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.lead_id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-slate-300">
                      <div>{lead.lead_id}</div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {lead.whatsapp}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div>{lead.country || 'Unspecified'}</div>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {lead.language || 'en'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="font-medium truncate max-w-[180px]">
                        {lead.treatment}
                      </div>
                      {lead.report_uploaded && (
                        <div className="flex items-center space-x-1 text-[10px] text-purple-400 mt-0.5">
                          <FileText className="w-3 h-3" />
                          <span>Report Attached</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{getScoreBadge(lead.score)}</td>
                    <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {lead.assigned_coordinator ? (
                        <span className="text-teal-300 font-medium">
                          {lead.assigned_coordinator}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.lead_id}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 border border-teal-500/30 font-semibold transition-colors"
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

        {/* Mobile View: Stacked Responsive Cards */}
        <div className="lg:hidden divide-y divide-slate-800">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              {loading ? 'Fetching inquiries...' : 'No leads match the selected criteria.'}
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.lead_id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400">
                    {lead.lead_id}
                  </span>
                  <div className="flex items-center space-x-2">
                    {getScoreBadge(lead.score)}
                    {getStatusBadge(lead.status)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{lead.name}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    {lead.whatsapp}
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-500">Treatment:</span>{' '}
                    <span className="font-medium text-slate-200">
                      {lead.treatment}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <span>{lead.country || 'Unspecified'}</span>
                    <span>•</span>
                    <span className="uppercase font-mono">{lead.language}</span>
                    {lead.report_uploaded && (
                      <>
                        <span>•</span>
                        <span className="text-purple-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Report
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-500">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/admin/leads/${lead.lead_id}`}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 border border-teal-500/30 text-xs font-semibold"
                  >
                    <span>View & Manage</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

