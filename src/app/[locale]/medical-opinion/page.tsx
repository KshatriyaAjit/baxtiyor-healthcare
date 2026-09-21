import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { LeadForm } from '@/components/conversion/LeadForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { ShieldCheck, CheckCircle2, Clock, Building2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Medical Opinion & Treatment Estimate in India',
  description:
    'Upload your medical reports for a comprehensive free review by senior Indian hospital specialists. Receive hospital options and cost estimates within 24-48 hours.',
};

export default async function MedicalOpinionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const dict = getDictionary(currentLocale);
  const isArabic = currentLocale === 'ar';

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    {
      name: isArabic ? 'طلب رأي طبي مجاني' : 'Free Medical Opinion',
      url: `/${currentLocale}/medical-opinion`,
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <LeadForm locale={currentLocale} />
          </div>

          {/* Right Column: Trust & Assistance Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                {isArabic
                  ? 'ماذا يحدث بعد إرسال تقاريرك؟'
                  : 'What Happens After You Submit?'}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-brand-text-secondary">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center font-bold shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy">
                      {isArabic ? 'دراسة سريرية متخصصة: ' : 'Specialist Board Review: '}
                    </span>
                    {isArabic
                      ? 'تُعرض تقاريرك على كبار الاستشاريين في فورتيس، أرتيميس، وسانار.'
                      : 'Your reports are reviewed by senior department heads across our partner quaternary hospitals.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center font-bold shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy">
                      {isArabic ? 'تقرير وخطة علاج مقارنة: ' : 'Comparative Treatment Plan: '}
                    </span>
                    {isArabic
                      ? 'تستلم الرأي الطبي الشامل مع توضيح الإجراء الجراحي المقترح وفترة التعافي.'
                      : 'You receive clinical recommendations, required hospital days, and recovery timelines.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center font-bold shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy">
                      {isArabic ? 'عرض سعر رسمي شفاف: ' : 'Transparent Official Cost Estimate: '}
                    </span>
                    {isArabic
                      ? 'تحديد التكلفة التقديرية الدقيقة مع بيان ما تشمله الباقة بدون أي رسوم خفية.'
                      : 'Clear indicative package pricing detailing inclusions, ICU stays, and implant specifications.'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border text-xs text-brand-teal font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>
                  {isArabic
                    ? 'متوسط وقت الرد: من 24 إلى 48 ساعة كحد أقصى'
                    : 'Typical response turnaround: 24 to 48 hours'}
                </span>
              </div>
            </div>

            {/* Direct Coordinator Contact */}
            <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-white">
                {isArabic
                  ? 'هل تفضل التحدث مع منسق طبي الآن؟'
                  : 'Prefer to speak with a coordinator immediately?'}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {isArabic
                  ? 'منسقونا متاحون عبر الواتساب لتقديم إرشادات سريعة ومساعدتك في تجهيز التقارير.'
                  : 'Our international patient desk is available on WhatsApp to assist with preliminary guidance and report upload.'}
              </p>
              <WhatsAppCTA
                locale={currentLocale}
                fullWidth
                size="md"
                label={dict.common.chatCoordinator}
              />
            </div>

            {/* Privacy Assurance Box */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isArabic ? 'حماية تامة وسرية لملفاتك الطبية' : 'Strict Medical Data Privacy'}
                </span>
              </div>
              <p className="leading-relaxed text-emerald-800">
                {dict.common.privacyAssurance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

