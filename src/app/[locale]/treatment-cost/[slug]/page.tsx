import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { TREATMENT_COSTS } from '@/data/costs';
import { TREATMENTS } from '@/data/treatments';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { MedicalReviewBadge } from '@/components/trust/MedicalReviewBadge';
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
  Building2,
  ArrowRight,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    TREATMENT_COSTS.forEach((c) => {
      params.push({ locale, slug: c.treatmentSlug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const costItem = TREATMENT_COSTS.find((c) => c.treatmentSlug === resolvedParams.slug);

  if (!costItem) return {};

  return {
    title: `${costItem.procedureName[currentLocale]} Cost in India (2026 Package) | Baxtiyor Healthcare`,
    description: `Indicative cost breakdown for ${costItem.procedureName[currentLocale]} in India: ${costItem.indicativeRangeUSD}. Inclusions, exclusions, hospital variations, and recovery days.`,
  };
}

export default async function ProcedureCostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const dict = getDictionary(currentLocale);
  const isArabic = currentLocale === 'ar';

  const costItem = TREATMENT_COSTS.find((c) => c.treatmentSlug === resolvedParams.slug);
  if (!costItem) {
    notFound();
  }

  const linkedTreatment = TREATMENTS.find((t) => t.slug === costItem.treatmentSlug);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'تكاليف العلاج' : 'Treatment Costs', url: `/${currentLocale}/treatment-cost` },
    { name: costItem.procedureName[currentLocale], url: `/${currentLocale}/treatment-cost/${costItem.treatmentSlug}` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Cost Summary Header */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <MedicalReviewBadge
              locale={currentLocale}
              lastReviewedDate={costItem.lastReviewedDate}
              sourceCount={2}
            />
            <span className="text-xs px-3 py-1 rounded bg-brand-soft-blue text-brand-blue font-bold">
              {isArabic ? 'تقدير استرشادي رسمي' : 'Official Indicative Rate'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {costItem.procedureName[currentLocale]} {isArabic ? '- تكلفة العملية في الهند' : 'Cost in India'}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
              {costItem.indicativeRangeUSD}
            </span>
            <span className="text-xs text-brand-text-secondary">
              ({isArabic ? 'باقة المستشفى القياسية' : 'Standard Quaternary Package'})
            </span>
          </div>

          <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
            {costItem.hospitalVariationNote[currentLocale]}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
              <Button variant="primary" size="md">
                {isArabic ? 'احصل على عرض سعر مخصص لحالتي' : 'GET MY PERSONALIZED TREATMENT ESTIMATE'}
              </Button>
            </Link>
            <WhatsAppCTA locale={currentLocale} treatmentName={costItem.procedureName[currentLocale]} size="md" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'تفاصيل باقة العلاج المشمولة والمستثناة' : 'Package Inclusions & Exclusions Breakdown'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isArabic ? 'المشمول في الباقة:' : 'What Is Included:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {costItem.inclusions[currentLocale].map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>{isArabic ? 'المستثنى من الباقة:' : 'What Is Excluded:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {costItem.exclusions[currentLocale].map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Stay & Duration Breakdown */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'مدة التنويم وفترة الإقامة المطلوبة' : 'Hospitalization & Accommodation Timeline'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60">
                  <div className="font-bold text-brand-navy mb-1">{isArabic ? 'التنويم داخل المستشفى' : 'Hospital Ward/ICU Stay'}</div>
                  <div className="text-brand-text-secondary">{costItem.hospitalStayDays}</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60">
                  <div className="font-bold text-brand-navy mb-1">{isArabic ? 'فترة النقاهة والمتابعة الخارجية' : 'Outpatient Observation in India'}</div>
                  <div className="text-brand-text-secondary">{costItem.recoveryDays}</div>
                </div>
              </div>
            </div>

            {/* Cross Link to Clinical Guide */}
            {linkedTreatment && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-brand-navy">
                    {isArabic ? 'هل تريد قراءة الدليل الطبي والإكلينيكي الكامل؟' : 'Looking for the complete clinical guide?'}
                  </h3>
                  <p className="text-xs text-brand-text-secondary">
                    {isArabic ? 'تعرف على خطوات الجراحة، والمخاطر، وإرشادات التحضير قبل السفر.' : 'Understand surgical options, clinical indications, and hospital preparation.'}
                  </p>
                </div>
                <Link href={getLocalizedPath(`/treatments/${linkedTreatment.slug}`, currentLocale)}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />}>
                    {isArabic ? 'الدليل الطبي' : 'Clinical Guide'}
                  </Button>
                </Link>
              </div>
            )}

            {/* Legal Disclaimer */}
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{costItem.disclaimer[currentLocale]}</p>
            </div>
          </div>

          {/* Right Column: Sticky Estimate Request Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={costItem.procedureName[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

