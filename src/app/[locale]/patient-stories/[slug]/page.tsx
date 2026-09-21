import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { TREATMENTS } from '@/data/treatments';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import {
  Clock,
  CheckCircle2,
  Building2,
  User,
  ShieldCheck,
  ArrowRight,
  HeartPulse,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    PATIENT_STORIES.forEach((s) => {
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
  const story = PATIENT_STORIES.find((s) => s.slug === resolvedParams.slug);

  if (!story) return {};

  return {
    title: `${story.patientName} (${story.patientCountry[currentLocale]}) | Patient Journey in India`,
    description: story.storySummary[currentLocale],
  };
}

export default async function PatientStoryDetailPage({
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

  const story = PATIENT_STORIES.find((s) => s.slug === resolvedParams.slug);
  if (!story) {
    notFound();
  }

  const hospital = HOSPITALS.find((h) => h.id === story.hospitalId);
  const doctor = DOCTORS.find((d) => d.id === story.doctorId);
  const treatment = TREATMENTS.find((t) => t.slug === story.treatmentSlug);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'قصص المرضى' : 'Patient Stories', url: `/${currentLocale}/patient-stories` },
    { name: story.patientName, url: `/${currentLocale}/patient-stories/${story.slug}` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs px-3 py-1 rounded-full bg-brand-soft-teal text-brand-teal font-bold">
              {story.patientCountry[currentLocale]}
            </span>
            <span className="text-xs text-brand-text-secondary flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isArabic ? 'حالة موثقة بموافقة المريض' : 'Verified Case Documented with Patient Consent'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {story.patientName}: {story.condition[currentLocale]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-text-secondary pt-1">
            {treatment && (
              <div className="flex items-center gap-1.5 font-semibold text-brand-blue">
                <HeartPulse className="w-4 h-4" />
                <span>{treatment.name[currentLocale]}</span>
              </div>
            )}
            {hospital && (
              <div className="flex items-center gap-1.5 text-brand-text">
                <Building2 className="w-4 h-4 text-brand-teal" />
                <span>{hospital.name[currentLocale]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Story Narrative */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'تفاصيل الرحلة العلاجية' : 'The Treatment Journey'}
              </h2>
              <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                {story.storySummary[currentLocale]}
              </p>

              <blockquote className="p-4 sm:p-5 bg-brand-soft-blue/40 rounded-xl text-sm italic font-medium text-brand-navy border-s-4 border-brand-blue my-4">
                "{story.quote[currentLocale]}"
              </blockquote>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{isArabic ? 'النتيجة الطبية المؤكدة: ' : 'Documented Clinical Outcome: '}</span>
                  <span>{story.outcomeNote[currentLocale]}</span>
                </div>
              </div>
            </div>

            {/* Verified Step-by-Step Timeline */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-teal" />
                <span>{isArabic ? 'الجدول الزمني الموثق للرحلة' : 'Documented Case Timeline'}</span>
              </h2>

              <div className="space-y-3">
                {story.journeyTimeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-brand-navy text-white shrink-0">
                      {item.duration[currentLocale]}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy mt-0.5">
                      {item.stage[currentLocale]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Hospital & Specialist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hospital && (
                <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-sm space-y-2">
                  <div className="text-xs text-brand-text-secondary">{isArabic ? 'المستشفى المعالج:' : 'Treating Hospital:'}</div>
                  <h3 className="text-base font-bold text-brand-navy">{hospital.name[currentLocale]}</h3>
                  <Link href={getLocalizedPath(`/hospitals/${hospital.slug}`, currentLocale)} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                    <span>{isArabic ? 'تفاصيل المستشفى' : 'View Hospital'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              )}

              {doctor && (
                <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-sm space-y-2">
                  <div className="text-xs text-brand-text-secondary">{isArabic ? 'الجراح المشرف:' : 'Lead Consultant Surgeon:'}</div>
                  <h3 className="text-base font-bold text-brand-navy">{doctor.name[currentLocale]}</h3>
                  <Link href={getLocalizedPath(`/doctors/${doctor.slug}`, currentLocale)} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                    <span>{isArabic ? 'السيرة الذاتية' : 'Doctor Profile'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              )}
            </div>

            {/* Privacy Protection Notice */}
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 text-xs text-brand-text-secondary leading-relaxed">
              <span className="font-semibold text-brand-navy">{isArabic ? 'حماية خصوصية المريض: ' : 'Patient Privacy Protection: '}</span>
              {isArabic
                ? 'تم توثيق ونشر هذه التجربة بموجب نموذج موافقة خطية صريحة من المريض وعائلته. تحرص بختيار للرعاية الصحية على حماية خصوصية السجلات الإكلينيكية الحساسة.'
                : 'This case summary is published under express written patient consent. Baxtiyor Healthcare strictly protects sensitive medical records and limits clinical disclosures to authorized educational and coordination contexts.'}
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={story.patientName} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

