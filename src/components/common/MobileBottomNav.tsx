'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types';
import { getLocalizedPath } from '@/lib/i18n/config';
import { getWhatsAppUrl } from '@/lib/config/contact';
import { trackEvent } from '@/lib/analytics/tracker';
import { LetsTalkModal } from '@/components/conversion/LetsTalkModal';
import {
  Home,
  Stethoscope,
  Building2,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

interface MobileBottomNavProps {
  locale: Locale;
  treatmentName?: string;
  hospitalName?: string;
}

export function MobileBottomNav({
  locale,
  treatmentName,
  hospitalName,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const isArabic = locale === 'ar';

  const homePath = `/${locale}`;
  const treatmentsPath = getLocalizedPath('/treatments', locale);
  const hospitalsPath = getLocalizedPath('/hospitals', locale);

  const isHomeActive = pathname === homePath || pathname === `${homePath}/`;
  const isTreatmentsActive = pathname.startsWith(treatmentsPath);
  const isHospitalsActive = pathname.startsWith(hospitalsPath);

  const whatsappUrl = getWhatsAppUrl({
    locale,
    treatmentName,
    hospitalName,
    sourceContext: 'homepage',
  });

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      locale,
      language: locale,
      cta_location: 'mobile_bottom_nav',
    });
  };

  const handleTalkClick = () => {
    setTalkModalOpen(true);
  };

  return (
    <>
      <nav
        aria-label={isArabic ? 'التنقل الرئيسي للهاتف' : 'Mobile Navigation'}
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
          {/* 1. Home */}
          <Link
            href={homePath}
            className={`flex flex-col items-center justify-center h-full min-h-[48px] rounded-lg transition-colors ${
              isHomeActive
                ? 'text-teal-600 dark:text-teal-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">
              {isArabic ? 'الرئيسية' : 'Home'}
            </span>
          </Link>

          {/* 2. Treatments */}
          <Link
            href={treatmentsPath}
            className={`flex flex-col items-center justify-center h-full min-h-[48px] rounded-lg transition-colors ${
              isTreatmentsActive
                ? 'text-teal-600 dark:text-teal-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">
              {isArabic ? 'العلاجات' : 'Treatments'}
            </span>
          </Link>

          {/* 3. Hospitals */}
          <Link
            href={hospitalsPath}
            className={`flex flex-col items-center justify-center h-full min-h-[48px] rounded-lg transition-colors ${
              isHospitalsActive
                ? 'text-teal-600 dark:text-teal-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">
              {isArabic ? 'المستشفيات' : 'Hospitals'}
            </span>
          </Link>

          {/* 4. Let's Talk CTA */}
          <button
            type="button"
            onClick={handleTalkClick}
            className="flex flex-col items-center justify-center h-full min-h-[48px] rounded-lg transition-colors text-teal-600 dark:text-teal-400 hover:text-teal-700 active:scale-95"
            aria-label={isArabic ? 'تحدث مع منسق' : "Let's Talk"}
          >
            <div className="relative">
              <PhoneCall className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            </div>
            <span className="text-[10px] font-bold leading-tight">
              {isArabic ? 'استشارة' : "Let's Talk"}
            </span>
          </button>

          {/* 5. WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center justify-center h-full min-h-[48px] rounded-lg transition-colors text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 active:scale-95"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 mb-0.5 fill-current text-[#25D366]" />
            <span className="text-[10px] font-bold leading-tight">
              {isArabic ? 'واتساب' : 'WhatsApp'}
            </span>
          </a>
        </div>
      </nav>

      {/* Let's Talk Action Sheet Modal */}
      <LetsTalkModal
        isOpen={talkModalOpen}
        onClose={() => setTalkModalOpen(false)}
        locale={locale}
        treatmentName={treatmentName}
        hospitalName={hospitalName}
        sourceContext="homepage"
      />
    </>
  );
}

