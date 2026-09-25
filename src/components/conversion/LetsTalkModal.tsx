'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getLocalizedPath } from '@/lib/i18n/config';
import { getWhatsAppUrl, SITE_CONTACT } from '@/lib/config/contact';
import { trackEvent } from '@/lib/analytics/tracker';
import {
  MessageCircle,
  Phone,
  FileText,
  Calculator,
  X,
  ShieldCheck,
  Globe,
  Clock,
} from 'lucide-react';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  treatmentName?: string;
  hospitalName?: string;
  sourceContext?: 'homepage' | 'treatment' | 'hospital' | 'story' | 'opinion' | 'cost' | 'chat';
}

export function LetsTalkModal({
  isOpen,
  onClose,
  locale,
  treatmentName,
  hospitalName,
  sourceContext = 'homepage',
}: LetsTalkModalProps) {
  const isArabic = locale === 'ar';

  useEffect(() => {
    if (isOpen) {
      trackEvent('lets_talk_click', {
        locale,
        language: locale,
        cta_location: sourceContext,
      });

      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, locale, sourceContext, onClose]);

  if (!isOpen) return null;

  const whatsappUrl = getWhatsAppUrl({
    locale,
    treatmentName,
    hospitalName,
    sourceContext,
  });

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      locale,
      language: locale,
      cta_location: 'lets_talk_modal',
    });
    onClose();
  };

  const handleCallClick = () => {
    trackEvent('call_click', {
      locale,
      language: locale,
      cta_location: 'lets_talk_modal',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={isArabic ? 'تواصل مع منسق طبي' : 'Talk with a Medical Coordinator'}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-5 pb-4 bg-gradient-to-r from-brand-navy via-slate-900 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={isArabic ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isArabic ? 'استشارة مجانية مع منسق بشري' : 'Free Human Coordination Desk'}</span>
          </div>

          <h3 className="text-xl font-black text-white">
            {isArabic ? 'تحدث مع منسق طبي معتمد' : "Let's Talk to a Medical Coordinator"}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
            {isArabic
              ? 'تواصل مباشرة مع منسقينا الطبيين لمناقشة التقارير، تقدير التكاليف، وحجز المستشفيات في دلهي جورجاون.'
              : 'Direct liaison with our patient desk in Gurgaon. Multi-language support in Uzbek, Russian, Arabic, and English.'}
          </p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>Uzbek &bull; Russian &bull; Arabic &bull; English</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{isArabic ? 'استجابة سريعة' : 'Quick Response'}</span>
            </span>
          </div>
        </div>

        {/* Options List */}
        <div className="p-5 space-y-3">
          {/* Option 1: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-500 transition-all group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{isArabic ? 'محادثة عبر الواتساب' : 'Chat on WhatsApp'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#25D366]/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                    {isArabic ? 'الأسرع' : 'Fastest'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isArabic
                    ? 'تحدث فوراً مع منسقك بلغتك الأم وأرسل تقاريرك'
                    : 'Instant coordinator chat in your preferred language'}
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-500 font-bold text-sm rtl:rotate-180">
              &rarr;
            </span>
          </a>

          {/* Option 2: Direct Phone Call */}
          <a
            href={`tel:${SITE_CONTACT.phoneNumber}`}
            onClick={handleCallClick}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-brand-primary transition-all group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'الاتصال المباشر بالمكتب الطبي' : 'Call Patient Helpline'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-mono" dir="ltr">
                  {SITE_CONTACT.phoneNumber}
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-brand-primary font-bold text-sm rtl:rotate-180">
              &rarr;
            </span>
          </a>

          {/* Option 3: Free Medical Opinion */}
          <Link
            href={getLocalizedPath('/medical-opinion', locale)}
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'طلب رأي طبي مجاني وتقييم تقارير' : 'Get Free Medical Opinion'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isArabic
                    ? 'تقييم شامل من كبار الجراحين خلال 24 - 48 ساعة'
                    : 'Doctor review & formal treatment plan within 24-48 hrs'}
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-teal-500 font-bold text-sm rtl:rotate-180">
              &rarr;
            </span>
          </Link>

          {/* Option 4: Treatment Cost Estimate */}
          <Link
            href={getLocalizedPath('/treatment-cost', locale)}
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'تقدير تكاليف العلاج والباقات' : 'Ask About Treatment Cost'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isArabic
                    ? 'مقارنة تقديرية لتكاليف الجراحة والإقامة بالمستشفى'
                    : 'Transparent pricing & hospital package breakdowns'}
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-blue-500 font-bold text-sm rtl:rotate-180">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Footer Disclaimer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          {isArabic
            ? 'خدمات المرافقة والترجمة والاستشارة والتنسيق لدى بختيار للرعاية الصحية مجانية للمرضى الدوليين.'
            : 'All coordination, airport transfer, medical review, and interpreter services are free of charge to patients.'}
        </div>
      </div>
    </div>
  );
}

