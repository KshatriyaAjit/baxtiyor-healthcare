import React from 'react';
import Link from 'next/link';
import { HelpCircle, Home, MessageCircle } from 'lucide-react';
import './globals.css';

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page Not Found | Baxtiyor Healthcare</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center p-4 font-sans">
        <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-brand-border shadow-card">
          <div className="w-20 h-20 rounded-full bg-brand-soft-blue text-brand-primary flex items-center justify-center mx-auto shadow-inner">
            <HelpCircle className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
              Error 404 &bull; الصفحة غير موجودة
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Page Not Found / الصفحة المطلوبة غير متاحة
            </h1>
            <p className="text-sm text-brand-secondary leading-relaxed max-w-md mx-auto">
              The clinical page or hospital resource you are looking for may have moved or been updated. Our coordinators are ready to assist you directly.
            </p>
            <p className="text-xs text-brand-secondary leading-relaxed max-w-md mx-auto font-arabic">
              الصفحة الطبية التي تبحث عنها قد تكون انتقلت إلى مسار جديد. فريق التنسيق الطبي لدينا متواجد لمساعدتك في الوصول إلى المعلومة المطلوبة.
            </p>
          </div>

          {/* Quick Recovery Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/en"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-xs hover:bg-brand-navy transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home / الصفحة الرئيسية</span>
            </Link>

            <a
              href="https://wa.me/919999999999?text=Hello%20Baxtiyor%20Healthcare%2C%20I%20need%20help%20finding%20treatment%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Coordinator / واتساب المنسق</span>
            </a>
          </div>

          {/* Quick Topic Links */}
          <div className="pt-6 border-t border-brand-border/60 flex flex-wrap justify-center gap-4 text-xs font-semibold text-brand-primary">
            <Link href="/en/treatments" className="hover:text-brand-navy hover:underline">
              Medical Treatments
            </Link>
            <span>&bull;</span>
            <Link href="/en/hospitals" className="hover:text-brand-navy hover:underline">
              Partner Hospitals
            </Link>
            <span>&bull;</span>
            <Link href="/en/treatment-cost" className="hover:text-brand-navy hover:underline">
              Treatment Costs
            </Link>
            <span>&bull;</span>
            <Link href="/en/faq" className="hover:text-brand-navy hover:underline">
              Patient FAQs
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

