'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getLocalizedPath } from '@/lib/i18n/config';
import { MessageCircle, Phone, FileText } from 'lucide-react';

export interface StickyMobileBarProps {
  locale: Locale;
  treatmentName?: string;
  countryName?: string;
}

export function StickyMobileBar({
  locale,
  treatmentName,
  countryName,
}: StickyMobileBarProps) {
  const isArabic = locale === 'ar';

  // Build WhatsApp contextual link
  let message = isArabic
    ? 'مرحباً بختيار للرعاية الصحية. أرغب في التحدث مع منسق طبي بخصوص العلاج في الهند.'
    : 'Hello Baxtiyor Healthcare. I would like to consult a medical coordinator regarding treatment in India.';

  if (treatmentName && countryName) {
    message = isArabic
      ? `مرحباً بختيار للرعاية الصحية. أنا من ${countryName} وأرغب في استشارة عن ${treatmentName}.`
      : `Hello Baxtiyor Healthcare. I am from ${countryName} looking for treatment guidance for ${treatmentName}.`;
  }

  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label={isArabic ? 'شريط التواصل السريع' : 'Quick contact actions'}
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border shadow-lg lg:hidden px-2 py-2"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">
            {isArabic ? 'واتساب' : 'WhatsApp'}
          </span>
        </a>

        {/* Direct Phone Call */}
        <a
          href="tel:+919999999999"
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-brand-navy text-white hover:bg-opacity-90 active:scale-95 transition-all text-center"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">
            {isArabic ? 'اتصال مباشر' : 'Call Desk'}
          </span>
        </a>

        {/* Free Medical Opinion Form */}
        <Link
          href={getLocalizedPath('/medical-opinion', locale)}
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-brand-blue text-white hover:bg-opacity-90 active:scale-95 transition-all text-center"
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">
            {isArabic ? 'رأي طبي' : 'Free Opinion'}
          </span>
        </Link>
      </div>
    </aside>
  );
}

