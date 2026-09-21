import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SPECIALTIES } from '@/data/specialties';
import { TREATMENTS } from '@/data/treatments';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { CheckCircle2, Building2, User, ArrowRight, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    SPECIALTIES.forEach((s) => {
      params.push({ locale, slug: s.slug });
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
  const specialty = SPECIALTIES.find((s) => s.slug === resolvedParams.slug);

  if (!specialty) return {};

  return {
    title: `${specialty.name[currentLocale]} in India | Baxtiyor Healthcare`,
    description: specialty.shortDescription[currentLocale],
  };
}

export default async function SpecialtyDetailPage({
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

  const specialty = SPECIALTIES.find((s) => s.slug === resolvedParams.slug);
  if (!specialty) {
    notFound();
  }

  // Find linked treatments
  const linkedTreatments = TREATMENTS.filter((t) =>
    specialty.treatmentSlugs.includes(t.slug)
  );

  // Find linked hospitals
  const linkedHospitals = HOSPITALS.filter((h) =>
    specialty.hospitalIds.includes(h.id)
  );

  // Find linked doctors
  const linkedDoctors = DOCTORS.filter((d) => d.specialtyId === specialty.id);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'التخصصات الطبية' : 'Specialties', url: `/${currentLocale}/specialties` },
    { name: specialty.name[currentLocale], url: `/${currentLocale}/specialties/${specialty.slug}` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              {specialty.name[currentLocale]}
            </h1>
            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
              {specialty.fullDescription[currentLocale]}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
                <Button variant="primary" size="md">
                  {dict.common.getFreeOpinion}
                </Button>
              </Link>
              <WhatsAppCTA
                locale={currentLocale}
                treatmentName={specialty.name[currentLocale]}
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Grid: Content & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Procedures */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'العمليات والإجراءات المتقدمة' : 'Advanced Surgical Procedures & Treatments'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.keyProcedures[currentLocale].map((proc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related In-Depth Treatment Guides */}
            {linkedTreatments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'أدلة العلاج الشاملة' : 'Comprehensive Clinical Treatment Guides'}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {linkedTreatments.map((t) => (
                    <div key={t.id} className="bg-white rounded-xl border border-brand-border p-5 shadow-sm hover:border-brand-blue/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-brand-navy">
                          <Link href={getLocalizedPath(`/treatments/${t.slug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                            {t.name[currentLocale]}
                          </Link>
                        </h3>
                        <p className="text-xs text-brand-text-secondary line-clamp-2 max-w-xl">
                          {t.overview[currentLocale]}
                        </p>
                        <div className="text-xs font-bold text-brand-teal pt-1">
                          {isArabic ? 'التكلفة الاسترشادية: ' : 'Indicative Range: '}
                          <span>{t.costInfo.indicativeRangeUSD}</span>
                        </div>
                      </div>
                      <Link href={getLocalizedPath(`/treatments/${t.slug}`, currentLocale)} className="shrink-0">
                        <Button variant="outline" size="sm" rightIcon={<ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />}>
                          {isArabic ? 'الدليل الطبي' : 'Read Guide'}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Accredited Hospitals */}
            {linkedHospitals.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'المستشفيات الشريكة المجهزة لهذا التخصص' : 'Equipped Quaternary Hospitals'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedHospitals.map((h) => (
                    <div key={h.id} className="bg-white rounded-xl border border-brand-border p-5 shadow-sm space-y-2">
                      <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{h.name[currentLocale]}</span>
                      </div>
                      <p className="text-xs text-brand-text-secondary">{h.location[currentLocale]}</p>
                      <div className="pt-2">
                        <Link href={getLocalizedPath(`/hospitals/${h.slug}`, currentLocale)} className="text-xs font-semibold text-brand-blue hover:underline inline-flex items-center gap-1">
                          <span>{isArabic ? 'عرض ملف المستشفى' : 'View Facility'}</span>
                          <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Consultants */}
            {linkedDoctors.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'كبار الأطباء والاستشاريين' : 'Featured Specialist Surgeons'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedDoctors.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl border border-brand-border p-5 shadow-sm space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center font-bold shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-navy">{doc.name[currentLocale]}</h4>
                          <p className="text-xs text-brand-text-secondary">{doc.designation[currentLocale]}</p>
                          <span className="text-[11px] font-semibold text-brand-teal">{doc.experienceYears}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-brand-border flex items-center justify-between">
                        <Link href={getLocalizedPath(`/doctors/${doc.slug}`, currentLocale)} className="text-xs font-semibold text-brand-blue hover:underline">
                          {isArabic ? 'السيرة الذاتية' : 'Full Profile'}
                        </Link>
                        <WhatsAppCTA locale={currentLocale} treatmentName={specialty.name[currentLocale]} size="sm" label={isArabic ? 'استشارة الطبيب' : 'Consult'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Lead Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={specialty.name[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

