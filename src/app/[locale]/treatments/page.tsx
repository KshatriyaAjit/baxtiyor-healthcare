import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { TREATMENTS } from '@/data/treatments';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Stethoscope, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Medical Treatments & Surgeries in India | Baxtiyor Healthcare',
  description:
    'Comprehensive guides to advanced medical treatments in India: Kidney Transplant, Liver Transplant, Beating-Heart Bypass Surgery, Robotic Knee Replacement, Hip Replacement, and Brain Tumor Resection.',
};

export default async function TreatmentsIndexPage({
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
      name: isArabic ? 'العلاجات والجراحات' : 'Medical Treatments',
      url: `/${currentLocale}/treatments`,
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl my-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'العلاجات والجراحات التخصصية في الهند' : 'Specialized Medical Treatments in India'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'أدلة طبية مفصلة ومراجعة إكلينيكياً، تشمل المعايير الطبية، وخيارات المستشفيات، وتكاليف العلاج الاسترشادية الشفافة.'
              : 'Clinically grounded treatment guides providing transparent procedures, indicative cost packages, hospital options, and international patient journey steps.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {TREATMENTS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-soft-teal text-brand-teal font-bold">
                    {t.costInfo.indicativeRangeUSD}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-brand-navy">
                  <Link href={getLocalizedPath(`/treatments/${t.slug}`, currentLocale)} className="hover:text-brand-blue transition-colors">
                    {t.name[currentLocale]}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-3">
                  {t.overview[currentLocale]}
                </p>

                <div className="pt-2 text-xs text-brand-text-secondary space-y-1">
                  <div>
                    <span className="font-semibold text-brand-navy">{isArabic ? 'مدة التنويم: ' : 'Hospital Stay: '}</span>
                    <span>{t.costInfo.hospitalStayDays}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-navy">{isArabic ? 'فترة المتابعة: ' : 'Recovery: '}</span>
                    <span>{t.costInfo.recoveryDays}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between gap-2">
                <Link
                  href={getLocalizedPath(`/treatments/${t.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'الدليل الطبي الكامل' : 'Full Clinical Guide'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <WhatsAppCTA
                  locale={currentLocale}
                  treatmentName={t.name[currentLocale]}
                  size="sm"
                  label={isArabic ? 'استفسار' : 'Inquire'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

