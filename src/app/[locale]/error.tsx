'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, MessageCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors securely without leaking any patient session data
    // eslint-disable-next-line no-console
    console.error('[Application Error]:', error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-card">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-brand-navy">
            Temporary System Interruption
          </h1>
          <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
            We experienced an unexpected error loading this resource. Your medical inquiries and uploaded reports are completely safe.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-xs hover:bg-brand-navy transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again / إعادة المحاولة</span>
          </button>

          <a
            href="https://wa.me/919999999999?text=Hello%20Baxtiyor%20Healthcare%2C%20I%20encountered%20an%20issue%20on%20the%20website%20and%20would%20like%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Contact Support via WhatsApp</span>
          </a>

          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand-bg text-brand-secondary hover:text-brand-navy font-semibold text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

