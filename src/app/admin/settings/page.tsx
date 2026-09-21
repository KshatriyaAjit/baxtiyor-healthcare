'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  Key,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react';

interface CurrentUser {
  email: string;
  role: string;
  name: string;
}

export default function AdminSettingsPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-teal-400" />
          Administrative Settings & Authentication Architecture
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Profile information, security posture, and production Firebase Authentication migration blueprint.
        </p>
      </div>

      {/* Migration Warning Banner */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
        <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            Notice: Temporary Development Login Active (EnvAuthService)
          </span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          The current authentication layer relies on server-side environment variables
          (<code className="font-mono text-amber-300">ADMIN_EMAIL</code>,{' '}
          <code className="font-mono text-amber-300">ADMIN_PASSWORD</code>). This is
          strictly intended for initial internal operations. Before granting broader
          administrative access to international coordinators or clinical liaisons,
          migrate to <strong>Firebase Authentication</strong> using the built-in
          adapter described below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-teal-400" />
            <span>Active Administrator Session</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Email Identity
              </span>
              <div className="font-bold text-white font-mono text-sm">
                {user?.email || 'admin@baxtiyorhealthcare.com'}
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Assigned Role
              </span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30 uppercase font-mono">
                  {user?.role || 'super_admin'}
                </span>
                <span className="text-slate-400">
                  (Full access to leads, analytics, and diagnostics)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Session Policy
              </span>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>• Cookie: <code className="text-teal-300 font-mono">admin_session</code></div>
                <div>• Attributes: HttpOnly, Secure, SameSite=Lax, Path=/</div>
                <div>• Token: Cryptographically signed HMAC-SHA256 (Web Crypto)</div>
                <div>• Max Duration: 8 hours rolling expiration</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Posture Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Healthcare Data Protection Posture</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Rate Limiting Policy
              </span>
              <p className="text-slate-300 text-[11px]">
                Brute-force protection limits failed login attempts to <strong>5 per 15 minutes</strong> per IP address.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Diagnostic Reports Isolation
              </span>
              <p className="text-slate-300 text-[11px]">
                Stored in private server storage (<code className="font-mono text-purple-300">storage/reports/</code>). Accessible strictly through authenticated admin route with path-traversal prevention.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Zero-Leak Analytics Policy
              </span>
              <p className="text-slate-300 text-[11px]">
                No patient names, phone numbers, WhatsApp contacts, or diagnostic filenames are ever passed to Firebase Analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Migration to Firebase Authentication Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-teal-400" />
              <span>Future Firebase Authentication Migration Guide</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              The dashboard architecture was designed with a drop-in abstraction layer (<code className="text-teal-300 font-mono text-[11px]">AdminAuthService</code>).
            </p>
          </div>
          <span className="text-[11px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2.5 py-1 rounded-md font-semibold">
            Ready for Migration
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <p>
            When scaling up your clinical team or hiring international coordinators in Uzbekistan, Oman, or Kazakhstan, follow these 4 steps to activate Firebase Auth:
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                1
              </span>
              <div>
                <strong className="text-white block">Enable Firebase Auth in Console:</strong>
                <span className="text-slate-400 text-[11px]">
                  Go to Firebase Console ➔ Authentication ➔ Sign-in method, and enable <strong>Email/Password</strong> or <strong>Google Workspace OAuth</strong>.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                2
              </span>
              <div>
                <strong className="text-white block">Assign Role Custom Claims:</strong>
                <span className="text-slate-400 text-[11px]">
                  Use Firebase Admin SDK to set custom user claims: <code className="text-teal-300 font-mono text-[10px]">admin.auth().setCustomUserClaims(uid, &#123; role: &apos;coordinator&apos; &#125;)</code>.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                3
              </span>
              <div>
                <strong className="text-white block">Switch Adapter in `src/lib/admin/auth.ts`:</strong>
                <span className="text-slate-400 text-[11px]">
                  Change <code className="text-teal-300 font-mono text-[10px]">export const authService = new FirebaseAuthService()</code>. The interface remains 100% identical.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                4
              </span>
              <div>
                <strong className="text-white block">Zero Dashboard UI Rewrites:</strong>
                <span className="text-slate-400 text-[11px]">
                  All `/admin/*` pages, `/admin/leads`, `/admin/analytics`, and route handlers consume <code className="text-teal-300 font-mono text-[10px]">getAuthenticatedAdmin()</code>, requiring zero frontend refactoring.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

