import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { TREATMENTS } from '@/data/treatments';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, createProcedureSchema, createFaqSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { MedicalReviewBadge } from '@/components/trust/MedicalReviewBadge';
import {
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Clock,
  Plane,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  FileText,
  DollarSign,
  HeartHandshake,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    TREATMENTS.forEach((t) => {
      params.push({ locale, slug: t.slug });
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
  const treatment = TREATMENTS.find((t) => t.slug === resolvedParams.slug);

  if (!treatment) return {};

  return {
    title: `${treatment.name[currentLocale]} | Cost, Top Hospitals & Doctors`,
    description: treatment.overview[currentLocale],
  };
}

export default async function TreatmentDetailPage({
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

  const treatment = TREATMENTS.find((t) => t.slug === resolvedParams.slug);
  if (!treatment) {
    notFound();
  }

  // Linked hospitals, doctors, stories
  const linkedHospitals = HOSPITALS.filter((h) =>
    treatment.hospitalIds.includes(h.id)
  );
  const linkedDoctors = DOCTORS.filter((d) =>
    treatment.doctorIds.includes(d.id)
  );
  const linkedStories = PATIENT_STORIES.filter((s) =>
    treatment.patientStoryIds.includes(s.id)
  );

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'العلاجات' : 'Treatments', url: `/${currentLocale}/treatments` },
    { name: treatment.name[currentLocale], url: `/${currentLocale}/treatments/${treatment.slug}` },
  ];

  const procedureSchema = createProcedureSchema({
    name: treatment.name[currentLocale],
    overview: treatment.overview[currentLocale],
    costUSD: treatment.costInfo.indicativeRangeUSD,
  });

  const faqSchemaData = createFaqSchema(
    treatment.faqs.map((f) => ({
      question: f.question[currentLocale],
      answer: f.answer[currentLocale],
    }))
  );

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <JsonLd data={[procedureSchema, faqSchemaData]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* 1. Overview Hero Banner */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <MedicalReviewBadge
              locale={currentLocale}
              lastReviewedDate={treatment.costInfo.lastReviewedDate}
              sourceCount={treatment.sources.length}
            />
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-soft-teal text-brand-teal">
              {treatment.costInfo.indicativeRangeUSD}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {treatment.name[currentLocale]}
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-4xl">
            {treatment.overview[currentLocale]}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
              <Button variant="primary" size="md">
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
            <WhatsAppCTA
              locale={currentLocale}
              treatmentName={treatment.name[currentLocale]}
              size="md"
            />
          </div>
        </div>

        {/* 18-Point Clinical Structure Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* 2. Who May Require Treatment */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                <span>{isArabic ? 'من هم المرشحون للعلاج؟' : 'Who May Require This Treatment?'}</span>
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                {treatment.whoRequiresTreatment[currentLocale].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Treatment Options */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'خيارات وتقنيات العلاج المتاحة' : 'Available Surgical Options & Techniques'}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {treatment.treatmentOptions[currentLocale].map((opt, i) => (
                  <div key={i} className="p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60 text-xs sm:text-sm font-medium text-brand-navy flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Selected Partner Hospitals */}
            {linkedHospitals.length > 0 && (
              <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'المستشفيات الشريكة المجهزة لهذا الإجراء' : 'Equipped Quaternary Partner Hospitals'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedHospitals.map((h) => (
                    <div key={h.id} className="p-4 rounded-xl border border-brand-border hover:border-brand-blue/30 transition-colors space-y-2">
                      <div className="flex items-center gap-2 font-bold text-brand-navy text-sm">
                        <Building2 className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{h.name[currentLocale]}</span>
                      </div>
                      <p className="text-xs text-brand-text-secondary">{h.location[currentLocale]}</p>
                      <Link href={getLocalizedPath(`/hospitals/${h.slug}`, currentLocale)} className="text-xs font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                        <span>{isArabic ? 'تفاصيل المستشفى' : 'View Facility Profile'}</span>
                        <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Specialist Doctors */}
            {linkedDoctors.length > 0 && (
              <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'كبار الجراحين والاستشاريين' : 'Specialist Surgeon Leadership'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedDoctors.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border border-brand-border space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-soft-blue text-brand-blue flex items-center justify-center font-bold shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-brand-navy">{doc.name[currentLocale]}</h3>
                          <p className="text-xs text-brand-text-secondary">{doc.designation[currentLocale]}</p>
                          <span className="text-[11px] font-semibold text-brand-teal">{doc.experienceYears}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-brand-border flex items-center justify-between">
                        <Link href={getLocalizedPath(`/doctors/${doc.slug}`, currentLocale)} className="text-xs font-semibold text-brand-blue hover:underline">
                          {isArabic ? 'السيرة الذاتية' : 'Full Profile'}
                        </Link>
                        <WhatsAppCTA locale={currentLocale} treatmentName={treatment.name[currentLocale]} size="sm" label={isArabic ? 'استشارة' : 'Consult'} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6, 7, 8. Cost Breakdown & Inclusions / Exclusions */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">
                    {isArabic ? 'تفاصيل التكلفة الاسترشادية' : 'Indicative Cost Package Details'}
                  </h2>
                  <p className="text-xs text-brand-text-secondary mt-0.5">
                    {treatment.costInfo.hospitalVariationNote[currentLocale]}
                  </p>
                </div>
                <span className="text-lg font-black text-brand-blue">
                  {treatment.costInfo.indicativeRangeUSD}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="space-y-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isArabic ? 'ما تشمله الباقة:' : 'Package Inclusions:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {treatment.costInfo.inclusions[currentLocale].map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>{isArabic ? 'ما لا تشمله الباقة:' : 'Package Exclusions:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {treatment.costInfo.exclusions[currentLocale].map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-xs text-brand-text-secondary italic border-t border-brand-border pt-4">
                {treatment.costInfo.disclaimer[currentLocale]}
              </p>
            </section>

            {/* 9, 10. Hospital Stay & Recovery Timeline */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'مدة الإقامة والتعافي في الهند' : 'Hospital Stay & Recovery Timeline'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-1">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-teal" />
                    <span>{isArabic ? 'مدة التنويم بالمستشفى' : 'Inpatient Hospital Stay'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{treatment.hospitalStay[currentLocale]}</p>
                </div>

                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-1">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <Plane className="w-4 h-4 text-brand-teal" />
                    <span>{isArabic ? 'فترة النقاهة وتصريح السفر' : 'Recovery & Fit-to-Fly'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{treatment.recoveryTimeline[currentLocale]}</p>
                </div>
              </div>
            </section>

            {/* 11. International Patient Process */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'خطوات رحلة المريض الدولي من البداية' : 'The International Patient Journey'}
              </h2>
              <div className="space-y-3">
                {treatment.internationalPatientProcess[currentLocale].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-brand-text-secondary">
                    <div className="w-6 h-6 rounded-full bg-brand-soft-teal text-brand-teal flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Travel & Visa Requirements */}
            <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <Plane className="w-5 h-5 text-brand-blue" />
                <span>{isArabic ? 'متطلبات السفر والتأشيرة الطبية' : 'Travel & Medical Visa Guidelines'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {treatment.travelAndVisaRequirements[currentLocale]}
              </p>
            </section>

            {/* 13. Patient Stories */}
            {linkedStories.length > 0 && (
              <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'تجارب واقعية لمرضى خضعوا لهذا العلاج' : 'Documented Patient Stories for this Treatment'}
                </h2>
                <div className="space-y-4">
                  {linkedStories.map((story) => (
                    <div key={story.id} className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-navy">{story.patientName}</span>
                        <span className="text-brand-teal font-semibold">{story.patientCountry[currentLocale]}</span>
                      </div>
                      <p className="text-xs text-brand-text-secondary italic">"{story.quote[currentLocale]}"</p>
                      <Link href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                        <span>{isArabic ? 'قراءة القصة والجدول الزمني' : 'View Full Journey'}</span>
                        <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 14. FAQs */}
            {treatment.faqs.length > 0 && (
              <section className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'الأسئلة الشائعة حول هذا الإجراء' : 'Frequently Asked Clinical & Travel Questions'}
                </h2>
                <div className="space-y-4">
                  {treatment.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60 space-y-2">
                      <h3 className="text-sm font-bold text-brand-navy flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span>{faq.question[currentLocale]}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed ps-6">
                        {faq.answer[currentLocale]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 15. Medical Disclaimer */}
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{isArabic ? 'إخلاء مسؤولية طبية وتنسيقية' : 'Clinical Coordination Disclaimer'}</span>
              </div>
              <p className="leading-relaxed">{treatment.medicalDisclaimer[currentLocale]}</p>
            </div>

            {/* 17. Sources & Citations */}
            {treatment.sources.length > 0 && (
              <div className="text-xs text-gray-500 space-y-1.5 border-t border-brand-border pt-4">
                <div className="font-semibold text-brand-text">
                  {isArabic ? 'المراجع والمصادر الإكلينيكية المعتمدة:' : 'Clinical Guidelines & Statutory Sources:'}
                </div>
                <ul className="space-y-1">
                  {treatment.sources.map((src, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      <span>{src.title} ({src.organization})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Lead Capture Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={treatment.name[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

