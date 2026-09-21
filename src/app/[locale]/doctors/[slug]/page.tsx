import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { DOCTORS } from '@/data/doctors';
import { HOSPITALS } from '@/data/hospitals';
import { TREATMENTS } from '@/data/treatments';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, createPhysicianSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import {
  User,
  Building2,
  GraduationCap,
  Award,
  Languages,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    DOCTORS.forEach((d) => {
      params.push({ locale, slug: d.slug });
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
  const doctor = DOCTORS.find((d) => d.slug === resolvedParams.slug);

  if (!doctor) return {};

  return {
    title: `${doctor.name[currentLocale]} | ${doctor.designation[currentLocale]}`,
    description: doctor.bio[currentLocale],
  };
}

export default async function DoctorDetailPage({
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

  const doctor = DOCTORS.find((d) => d.slug === resolvedParams.slug);
  if (!doctor) {
    notFound();
  }

  const hospital = HOSPITALS.find((h) => h.id === doctor.hospitalId);
  const relatedStories = PATIENT_STORIES.filter((s) => s.doctorId === doctor.id);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'الأطباء' : 'Doctors', url: `/${currentLocale}/doctors` },
    { name: doctor.name[currentLocale], url: `/${currentLocale}/doctors/${doctor.slug}` },
  ];

  const physicianSchema = createPhysicianSchema({
    name: doctor.name[currentLocale],
    designation: doctor.designation[currentLocale],
    hospitalName: hospital ? hospital.name[currentLocale] : 'Indian Partner Hospital',
    procedures: doctor.procedures,
  });

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <JsonLd data={physicianSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Doctor Hero Card */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-brand-soft-blue text-brand-blue flex items-center justify-center shrink-0">
              <User className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>

            <div className="space-y-3 max-w-3xl">
              <div className="inline-block text-xs px-2.5 py-1 rounded bg-brand-soft-teal text-brand-teal font-bold">
                {doctor.experienceYears}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
                {doctor.name[currentLocale]}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-brand-blue">
                {doctor.designation[currentLocale]}
              </p>

              {hospital && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-text-secondary">
                  <Building2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <Link href={getLocalizedPath(`/hospitals/${hospital.slug}`, currentLocale)} className="hover:underline font-medium">
                    {hospital.name[currentLocale]} ({hospital.city}, India)
                  </Link>
                </div>
              )}

              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed pt-1">
                {doctor.bio[currentLocale]}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
                  <Button variant="primary" size="md">
                    {isArabic ? 'طلب استشارة هذا الطبيب' : 'Request Consultation with this Specialist'}
                  </Button>
                </Link>
                <WhatsAppCTA locale={currentLocale} treatmentName={doctor.name[currentLocale]} size="md" label={isArabic ? 'تواصل مع المنسق' : 'Chat with Coordinator'} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Clinical Focus */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'التركيز الجراحي والتخصص الدقيق' : 'Key Clinical & Surgical Focus'}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.clinicalFocus[currentLocale].map((focus, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60 text-xs sm:text-sm text-brand-navy">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education & Fellowships */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'المؤهلات العلمية والزمالات الدولية' : 'Education, Board Certifications & Fellowships'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-brand-blue" />
                    <span>{isArabic ? 'الدرجات الطبية:' : 'Medical Degrees:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-brand-text-secondary">
                    {doctor.education[currentLocale].map((edu, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-teal" />
                    <span>{isArabic ? 'الزمالات والجمعيات الدولية:' : 'Fellowships & Memberships:'}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-brand-text-secondary">
                    {doctor.fellowships[currentLocale].map((fel, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0 mt-1.5" />
                        <span>{fel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Languages */}
              <div className="pt-4 border-t border-brand-border flex items-center gap-2 text-xs text-brand-text-secondary">
                <Languages className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="font-semibold text-brand-navy">{isArabic ? 'اللغات المعتمدة:' : 'Languages:'}</span>
                <span>{doctor.languages.join(' • ')}</span>
              </div>
            </div>

            {/* Related Patient Cases */}
            {relatedStories.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'تجارب مرضى أجروا عملياتهم مع هذا الفريق الجراحي' : 'Documented Cases Handled by this Surgical Team'}
                </h2>
                <div className="space-y-3">
                  {relatedStories.map((story) => (
                    <div key={story.id} className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-navy">{story.patientName}</span>
                        <span className="text-brand-teal font-semibold">{story.patientCountry[currentLocale]}</span>
                      </div>
                      <p className="text-xs text-brand-text-secondary italic">"{story.quote[currentLocale]}"</p>
                      <Link href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
                        <span>{isArabic ? 'قراءة قصة المريض' : 'Read Case History'}</span>
                        <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification E-E-A-T Badge */}
            <div className="p-4 rounded-xl bg-brand-soft-teal/40 border border-brand-teal/20 text-xs text-brand-navy flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
              <div>
                <span className="font-bold">{isArabic ? 'توثيق البيانات الطبية: ' : 'Credential Verification: '}</span>
                <span className="text-brand-text-secondary">{doctor.verificationSource}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={doctor.name[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

