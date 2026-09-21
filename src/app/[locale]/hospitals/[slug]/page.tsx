import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { TREATMENTS } from '@/data/treatments';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, createHospitalSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Plane,
  Hotel,
  User,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    HOSPITALS.forEach((h) => {
      params.push({ locale, slug: h.slug });
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
  const hospital = HOSPITALS.find((h) => h.slug === resolvedParams.slug);

  if (!hospital) return {};

  return {
    title: `${hospital.name[currentLocale]} | International Patient Center Gurgaon, India`,
    description: hospital.overview[currentLocale],
  };
}

export default async function HospitalDetailPage({
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

  const hospital = HOSPITALS.find((h) => h.slug === resolvedParams.slug);
  if (!hospital) {
    notFound();
  }

  // Linked doctors, treatments, stories
  const linkedDoctors = DOCTORS.filter((d) => hospital.doctorIds.includes(d.id));
  const linkedTreatments = TREATMENTS.filter((t) =>
    hospital.treatmentSlugs.includes(t.slug)
  );
  const linkedStories = PATIENT_STORIES.filter((s) => s.hospitalId === hospital.id);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'المستشفيات' : 'Hospitals', url: `/${currentLocale}/hospitals` },
    { name: hospital.name[currentLocale], url: `/${currentLocale}/hospitals/${hospital.slug}` },
  ];

  const hospitalSchema = createHospitalSchema({
    name: hospital.name[currentLocale],
    location: hospital.location[currentLocale],
    city: hospital.city,
    country: hospital.country,
    overview: hospital.overview[currentLocale],
  });

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <JsonLd data={hospitalSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Hospital Hero Banner */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs px-3 py-1 rounded-full bg-brand-soft-blue text-brand-blue font-bold">
              {hospital.bedsCount}
            </span>
            <span className="text-xs text-brand-text-secondary">
              {isArabic ? 'تأسس عام: ' : 'Established: '} {hospital.establishedYear}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {hospital.name[currentLocale]}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-teal font-semibold">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{hospital.location[currentLocale]}</span>
          </div>

          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed max-w-4xl">
            {hospital.overview[currentLocale]}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
              <Button variant="primary" size="md">
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
            <WhatsAppCTA locale={currentLocale} treatmentName={hospital.name[currentLocale]} size="md" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* International Patient Services */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'خدمات وتسهيلات المرضى الدوليين' : 'Dedicated International Patient Amenities'}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hospital.internationalPatientServices[currentLocale].map((service, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60 text-xs sm:text-sm text-brand-navy">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel & Accommodation Information */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'الموقع، المطار، وخيارات السكن القريبة' : 'Location, Airport Distance & Nearby Accommodation'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-1.5">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <Plane className="w-4 h-4 text-brand-blue" />
                    <span>{isArabic ? 'المسافة من مطار دلهي الدولي' : 'Delhi Airport Transit (DEL)'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{hospital.distanceFromAirport[currentLocale]}</p>
                </div>

                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 space-y-1.5">
                  <div className="font-bold text-brand-navy flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-brand-teal" />
                    <span>{isArabic ? 'الشقق الفندقية والفنادق المجاورة' : 'Nearby Guest Accommodations'}</span>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{hospital.nearbyHotelsNote[currentLocale]}</p>
                </div>
              </div>
            </div>

            {/* Relevant Doctors */}
            {linkedDoctors.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'الأطباء والاستشاريون في هذا المستشفى' : 'Senior Clinical Specialists at this Hospital'}
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
                        <WhatsAppCTA locale={currentLocale} treatmentName={hospital.name[currentLocale]} size="sm" label={isArabic ? 'حجز موعد' : 'Inquire'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Treatments */}
            {linkedTreatments.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-brand-navy">
                  {isArabic ? 'الإجراءات التخصصية المتوفرة في هذا المستشفى' : 'Specialized Procedures at this Facility'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            {/* Accreditation Note */}
            <div className="p-4 rounded-xl bg-brand-soft-blue/40 border border-brand-blue/20 text-xs text-brand-navy space-y-1">
              <span className="font-bold">{isArabic ? 'الاعتماد والتنسيق: ' : 'Accreditation Statement: '}</span>
              <p className="text-brand-text-secondary leading-relaxed">{hospital.accreditationNote[currentLocale]}</p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} prefilledTreatment={hospital.name[currentLocale]} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

