import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { COUNTRIES } from '@/data/countries';
import { TREATMENTS } from '@/data/treatments';
import { HOSPITALS } from '@/data/hospitals';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import {
  Plane,
  FileCheck,
  Languages,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    COUNTRIES.forEach((c) => {
      params.push({ locale, slug: c.slug });
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
  const country = COUNTRIES.find((c) => c.slug === resolvedParams.slug);

  if (!country) return {};

  return {
    title: `Medical Treatment in India for Patients from ${country.countryName[currentLocale]} | Baxtiyor Healthcare`,
    description: country.overview[currentLocale],
  };
}

export default async function CountryDetailPage({
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

  const country = COUNTRIES.find((c) => c.slug === resolvedParams.slug);
  if (!country) {
    notFound();
  }

  // Linked treatments and stories
  const linkedTreatments = TREATMENTS.filter((t) =>
    country.commonTreatments.includes(t.slug)
  );
  const countryStories = PATIENT_STORIES.filter((s) =>
    country.patientStoryIds.includes(s.id)
  );

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'دليل الدول' : 'Countries', url: `/${currentLocale}/countries` },
    { name: country.countryName[currentLocale], url: `/${currentLocale}/countries/${country.slug}` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs px-3 py-1 rounded-full bg-brand-soft-blue text-brand-blue font-bold">
              {isArabic ? `دليل المرضى الدوليين - ${country.countryName[currentLocale]}` : `International Patient Pathway: ${country.countryName[currentLocale]}`}
            </span>
            <span className="text-xs text-brand-teal font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{isArabic ? 'وقت معالجة التأشيرة: ' : 'Visa Time: '}{country.visaInfo.processingTime[currentLocale]}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic
              ? `العلاج الطبي في الهند للمرضى من ${country.countryName[currentLocale]}`
              : `Medical Treatment in India for Patients from ${country.countryName[currentLocale]}`}
          </h1>

          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed max-w-4xl">
            {country.overview[currentLocale]}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
              <Button variant="primary" size="md">
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
            <WhatsAppCTA
              locale={currentLocale}
              countryName={country.countryName[currentLocale]}
              size="md"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Why Patients from this country choose India */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic
                  ? `لماذا يختار المرضى من ${country.countryName[currentLocale]} العلاج في الهند؟`
                  : `Why Patients from ${country.countryName[currentLocale]} Choose India`}
              </h2>
              <ul className="space-y-3">
                {country.whyPatientsChooseIndia[currentLocale].map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-brand-navy p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visa & Flight Connectivity */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'معلومات التأشيرة الطبية الهندية وخطوط الطيران' : 'Indian Medical Visa & Flight Connectivity'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-2">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-brand-blue" />
                    <span>{isArabic ? 'نوع التأشيرة الطبية المطلوبة' : 'Medical Visa Protocol'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{country.visaInfo.type[currentLocale]}</p>
                  <p className="text-brand-teal font-semibold text-xs">{country.visaInfo.assistanceProvided[currentLocale]}</p>
                </div>

                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-2">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <Plane className="w-4 h-4 text-brand-teal" />
                    <span>{isArabic ? 'رحلات الطيران المباشرة لمطار دلهي' : 'Flight Transit to Delhi (DEL)'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{country.flightInfo[currentLocale]}</p>
                  <div className="text-brand-navy font-semibold text-xs pt-1 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{country.languageSupport[currentLocale]}</span>
                  </div>
                </div>
              </div>

              {/* Visa Requirements Checklist */}
              <div className="p-4 rounded-xl bg-brand-soft-blue/30 border border-brand-blue/20 space-y-2">
                <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  {isArabic ? 'الوثائق الأساسية لإصدار التأشيرة:' : 'Key Visa Documentation Required:'}
                </div>
                <ul className="space-y-1.5 text-xs text-brand-text-secondary">
                  {country.visaInfo.requirements[currentLocale].map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Treatments for this Country */}
            {linkedTreatments.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic
                    ? `أكثر الإجراءات الطبية طلباً من ${country.countryName[currentLocale]}`
                    : `Most Requested Procedures from ${country.countryName[currentLocale]}`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedTreatments.map((t) => (
                    <Link
                      key={t.id}
                      href={getLocalizedPath(`/treatments/${t.slug}`, currentLocale)}
                      className="p-4 rounded-xl border border-brand-border hover:border-brand-blue/30 hover:bg-brand-soft-blue/10 transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-bold text-brand-navy">{t.name[currentLocale]}</div>
                        <div className="text-xs text-brand-teal font-semibold">{t.costInfo.indicativeRangeUSD}</div>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-brand-blue ${isArabic ? 'rotate-180' : ''}`} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Country Patient Stories */}
            {countryStories.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? `تجارب مرضى من ${country.countryName[currentLocale]}` : `Patient Stories from ${country.countryName[currentLocale]}`}
                </h2>
                <div className="space-y-3">
                  {countryStories.map((story) => (
                    <div key={story.id} className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-navy">{story.patientName}</span>
                        <span className="text-brand-teal font-semibold">{story.patientCountry[currentLocale]}</span>
                      </div>
                      <p className="text-xs text-brand-text-secondary italic">"{story.quote[currentLocale]}"</p>
                      <Link href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                        <span>{isArabic ? 'قراءة تفاصيل القصة' : 'Read Full Story'}</span>
                        <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Lead Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledCountry={country.countryName[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

