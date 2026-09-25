import fs from 'fs';
import path from 'path';

console.log('--- REPAIRING CORRUPTED FILES ---');

// 1. Repair src/app/admin/page.tsx
const adminPagePath = 'src/app/admin/page.tsx';
let adminPageContent = fs.readFileSync(adminPagePath, 'utf8');
const dupPromise = /const \[analyticsRes, leadsRes\] = await Promise\.all\(\[\r?\n\s*const \[analyticsRes, leadsRes, contentRes\] = await Promise\.all\(\[/;
if (dupPromise.test(adminPageContent)) {
  adminPageContent = adminPageContent.replace(
    dupPromise,
    'const [analyticsRes, leadsRes, contentRes] = await Promise.all(['
  );
  fs.writeFileSync(adminPagePath, adminPageContent, 'utf8');
  console.log('✅ Repaired src/app/admin/page.tsx');
} else {
  console.log('ℹ️ src/app/admin/page.tsx already clean or pattern not found');
}

// 2. Repair src/lib/admin/audit.ts
const auditPath = 'src/lib/admin/audit.ts';
let auditContent = fs.readFileSync(auditPath, 'utf8');
const dupAudit = /\|\s*'settings\.updated';\r?\n\s*\|\s*'settings\.updated'\r?\n\s*\|\s*string;/;
if (dupAudit.test(auditContent)) {
  auditContent = auditContent.replace(
    dupAudit,
    "| 'settings.updated'\n  | string;"
  );
  fs.writeFileSync(auditPath, auditContent, 'utf8');
  console.log('✅ Repaired src/lib/admin/audit.ts');
} else {
  console.log('ℹ️ src/lib/admin/audit.ts already clean or pattern not found');
}

// 3. Repair src/app/api/health/route.ts
const healthPath = 'src/app/api/health/route.ts';
let healthContent = fs.readFileSync(healthPath, 'utf8');
const dupCatch = /\} catch \(err\) \{\r?\n\s*\} catch \{/;
if (dupCatch.test(healthContent)) {
  healthContent = healthContent.replace(
    dupCatch,
    '} catch {'
  );
  fs.writeFileSync(healthPath, healthContent, 'utf8');
  console.log('✅ Repaired src/app/api/health/route.ts');
} else {
  console.log('ℹ️ src/app/api/health/route.ts already clean or pattern not found');
}

// 4. Repair src/app/api/admin/reports/[fileId]/route.ts
const reportsPath = 'src/app/api/admin/reports/[fileId]/route.ts';
const cleanReportsCode = `import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthenticatedAdmin } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';
import { getClientIdentifier } from '@/lib/security/rate-limit';

const MIME_MAP: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    // 1. Authenticated admin authorization only
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Authentication required to access medical reports.' },
        { status: 401 }
      );
    }

    const { fileId } = params;

    // 2. Strict sanitization to prevent Path Traversal attacks
    const safeFilename = path.basename(fileId);
    if (!safeFilename || !/^[a-zA-Z0-9-_\\.]+$/.test(safeFilename) || fileId.includes('..') || fileId.includes('/') || fileId.includes('\\\\')) {
      return NextResponse.json(
        { success: false, message: 'Invalid report identifier.' },
        { status: 400 }
      );
    }

    const storageDir = path.join(process.cwd(), 'storage', 'reports');
    const filePath = path.join(storageDir, safeFilename);

    // 3. Verify file existence in private storage
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'Report document not found.' },
        { status: 404 }
      );
    }

    // 4. Record access in audit log
    const clientIp = getClientIdentifier(request);
    await recordAuditLog('report.accessed', admin.email, clientIp, {
      file_id: safeFilename,
    });

    // 5. Stream the file securely
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': \`inline; filename="\${safeFilename}"\`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    console.error('[Admin Report Stream Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Server error accessing report.' },
      { status: 500 }
    );
  }
}
`;
fs.writeFileSync(reportsPath, cleanReportsCode, 'utf8');
console.log('✅ Rewrote src/app/api/admin/reports/[fileId]/route.ts cleanly');

// 5. Repair src/components/admin/AdminShell.tsx
const adminShellPath = 'src/components/admin/AdminShell.tsx';
const cleanAdminShellCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Activity,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Stethoscope,
  Image as ImageIcon,
  HeartHandshake,
  MessageSquareQuote,
  Youtube,
  Share2,
} from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
}

const CORE_NAV_ITEMS = [
  {
    name: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Leads Manager',
    href: '/admin/leads',
    icon: Users,
    exact: false,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    exact: false,
  },
  {
    name: 'Operations',
    href: '/admin/operations',
    icon: Activity,
    exact: false,
  },
];

const CONTENT_NAV_ITEMS = [
  {
    name: 'Media Library',
    href: '/admin/content/media',
    icon: ImageIcon,
    exact: false,
  },
  {
    name: 'Patient Stories',
    href: '/admin/content/patient-stories',
    icon: HeartHandshake,
    exact: false,
  },
  {
    name: 'Testimonials',
    href: '/admin/content/testimonials',
    icon: MessageSquareQuote,
    exact: false,
  },
  {
    name: 'YouTube Videos',
    href: '/admin/content/videos',
    icon: Youtube,
    exact: false,
  },
  {
    name: 'Social Links',
    href: '/admin/content/social',
    icon: Share2,
    exact: false,
  },
];

const SYSTEM_NAV_ITEMS = [
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    exact: false,
  },
];

const ALL_NAV_ITEMS = [...CORE_NAV_ITEMS, ...CONTENT_NAV_ITEMS, ...SYSTEM_NAV_ITEMS];

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // If on login page, render bare without the admin shell navigation
  if (pathname === '/admin/login') {
    return <main className="min-h-screen bg-slate-900">{children}</main>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const isActive = (item: (typeof ALL_NAV_ITEMS)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Baxtiyor</span>
            <span className="text-xs text-teal-400 font-medium ml-1">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm pt-14">
          <div className="bg-slate-900 border-b border-slate-800 p-4 space-y-2 max-h-[85vh] overflow-y-auto">
            {ALL_NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={\`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors \${
                    active
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }\`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <Link
                href="/en"
                target="_blank"
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-md"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 min-h-screen p-4 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-2 py-4 mb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight leading-tight">
              Baxtiyor
            </div>
            <div className="text-xs text-teal-400 font-semibold tracking-wider uppercase">
              Operations Hub
            </div>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-4 flex-1">
          {/* Core Operations */}
          <div className="space-y-1">
            {CORE_NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={\`flex items-center space-x-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all \${
                    active
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }\`}
                >
                  <Icon className={\`w-4 h-4 \${active ? 'text-teal-400' : 'text-slate-400'}\`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Content & Media Management */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            <div className="px-3.5 pb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Content &amp; Media
            </div>
            {CONTENT_NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={\`flex items-center space-x-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all \${
                    active
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }\`}
                >
                  <Icon className={\`w-4 h-4 \${active ? 'text-teal-400' : 'text-slate-400'}\`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* System Settings */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            {SYSTEM_NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={\`flex items-center space-x-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all \${
                    active
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }\`}
                >
                  <Icon className={\`w-4 h-4 \${active ? 'text-teal-400' : 'text-slate-400'}\`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Security & System Status Pill */}
        <div className="my-4 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Auth Status
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-medium">
              DEV-SECURE
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Encrypted session active. Firestore fallback online.
          </p>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <Link
            href="/en"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              v2.0
            </span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
`;
fs.writeFileSync(adminShellPath, cleanAdminShellCode, 'utf8');
console.log('✅ Rewrote src/components/admin/AdminShell.tsx cleanly');

console.log('--- ALL REPAIRS COMPLETED ---');

