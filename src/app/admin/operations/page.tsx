'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Database,
  Shield,
  FileText,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Cpu,
  Lock,
} from 'lucide-react';

interface OperationsData {
  timestamp: string;
  environment: {
    nodeVersion: string;
    nextVersion: string;
    runtimeEnvironment: string;
    uptimeSeconds: number;
    memoryUsageMb: {
      rss: number;
      heapUsed: number;
      heapTotal: number;
    };
  };
  services: {
    healthEndpoint: { status: string; path: string };
    leadIntakeApi: {
      status: string;
      rateLimit: string;
      persistedRecords: number;
    };
    medicalUploadApi: {
      status: string;
      rateLimit: string;
      storedReportsCount: number;
      maxFileSize: string;
      allowedFormats: string[];
    };
    database: {
      primary: string;
      status: string;
      fallback: string;
      rulesMode: string;
    };
    analytics: {
      provider: string;
      measurementId: string;
      consentMode: string;
      privacyMode: string;
    };
    authentication: {
      mode: string;
      futureTarget: string;
      cookiePolicy: string;
      sessionValidity: string;
    };
  };
  recentAuditLogs: {
    id: string;
    timestamp: string;
    action: string;
    actor: string;
    ip: string;
    details: Record<string, unknown>;
  }[];
}

export default function AdminOperationsPage() {
  const [data, setData] = useState<OperationsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOperations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/operations');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load operations data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-teal-400" />
            System Operations & Infrastructure Health
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of APIs, database persistence, rate limiting, and security telemetry.
          </p>
        </div>
        <button
          onClick={fetchOperations}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Services Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Service 1: Core Health API */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Healthcheck Endpoint
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {data?.services.healthEndpoint.status || 'OPERATIONAL'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automated monitoring endpoint at <code className="text-teal-300 font-mono text-[11px]">/api/health</code>.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Uptime:</span>
            <span className="text-slate-300 font-mono">
              {data ? formatUptime(data.environment.uptimeSeconds) : '...'}
            </span>
          </div>
        </div>

        {/* Service 2: Cloud Firestore & Storage */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              Lead Storage Subsystem
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 font-mono">
              {data?.services.database.status || 'ACTIVE'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Primary: {data?.services.database.primary}. Fail-safe local backup active.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Total Inquiries:</span>
            <span className="text-teal-300 font-bold font-mono">
              {data?.services.leadIntakeApi.persistedRecords ?? 0} records
            </span>
          </div>
        </div>

        {/* Service 3: Medical Upload API */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Medical Document Intake
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              {data?.services.medicalUploadApi.status || 'OPERATIONAL'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Strict MIME whitelisting, 15MB file cap, server-isolated storage.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Stored Scans:</span>
            <span className="text-purple-300 font-bold font-mono">
              {data?.services.medicalUploadApi.storedReportsCount ?? 0} files
            </span>
          </div>
        </div>

        {/* Service 4: Rate Limiting & Protection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              API Rate Limiter
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Sliding-window IP throttler on lead intake, uploads, and admin login.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Login Protection:</span>
            <span className="text-slate-300">5 attempts / 15m</span>
          </div>
        </div>

        {/* Service 5: Firebase Analytics & Consent */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Analytics & Consent
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              CONSENT V2
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Synchronous consent initialization in head. Zero patient PII leakage.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Tracking ID:</span>
            <span className="text-amber-300 font-mono text-[10px]">
              {data?.services.analytics.measurementId}
            </span>
          </div>
        </div>

        {/* Service 6: Runtime & Memory */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Runtime Environment
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 uppercase">
              {data?.environment.runtimeEnvironment || 'NODE'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Node {data?.environment.nodeVersion} on Next.js {data?.environment.nextVersion}
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Heap Used:</span>
            <span className="text-indigo-300 font-mono">
              {data?.environment.memoryUsageMb.heapUsed ?? 0} MB
            </span>
          </div>
        </div>
      </div>

      {/* Security Audit Log Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>Administrative Audit Trail</span>
            </h2>
            <p className="text-xs text-slate-400">
              Security-sensitive operations, logins, workflow transitions, and report accesses.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            Immutable Audit Trail
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {!data?.recentAuditLogs || data.recentAuditLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No recent administrative audit events recorded yet.
                  </td>
                </tr>
              ) : (
                data.recentAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {log.id}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-teal-300 font-mono text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {log.actor}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {log.ip}
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                      {JSON.stringify(log.details)}
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

