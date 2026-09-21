import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Baxtiyor Healthcare Operations Hub',
  description:
    'Internal clinical coordination, lead management, and patient inquiry dashboard.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

