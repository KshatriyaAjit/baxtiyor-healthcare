import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { DOCTORS } from '@/data/doctors';
import { HOSPITALS } from '@/data/hospitals';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Button } from '@/components/ui/Button';
import { User, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Top Surgeons & Medical Specialists in India | Baxtiyor Healthcare',
  description:
    'Consult verified surgical leaders in India: adult cardiac surgeons, renal transplant specialists, robotic joint replacement directors, and chief liver transplant surgeons.',
};

export default async function DoctorsDirectoryPage({
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
    { name: isArabic ? 'الأطباء الاستشاريون' : 'Specialist Doctors', url: `/${currentLocale}/doctors` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'كبار الجراحين والاستشاريين في الهند' : 'Senior Specialist Surgeons & Clinicians in India'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'أطباء معتمدون يمتلكون عقوداً من الخبرة الجراحية، ومؤهلات دولية من المملكة المتحدة والولايات المتحدة وألمانيا، مع سجلات مثبتة في علاج المرضى الدوليين.'
              : 'Verified surgical leaders with decades of clinical experience, international fellowships, and extensive expertise operating on international patients.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => {
            const hospital = HOSPITALS.find((h) => h.id === doc.hospitalId);

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-soft-blue text-brand-blue flex items-center justify-center font-black text-xl shrink-0">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-brand-navy">
                        <Link href={getLocalizedPath(`/doctors/${doc.slug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                          {doc.name[currentLocale]}
                        </Link>
                      </h2>
                      <p className="text-xs text-brand-text-secondary mt-0.5">
                        {doc.designation[currentLocale]}
                      </p>
                      {hospital && (
                        <div className="flex items-center gap-1.5 text-xs text-brand-teal font-semibold mt-1">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{hospital.name[currentLocale]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs px-2.5 py-1 rounded bg-brand-bg text-brand-navy font-semibold inline-block border border-brand-border/60">
                    {doc.experienceYears}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-3">
                    {doc.bio[currentLocale]}
                  </p>

                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-brand-text">
                      {isArabic ? 'التركيز الإكلينيكي والجراحي:' : 'Clinical Focus:'}
                    </div>
                    <ul className="space-y-1 text-brand-text-secondary">
                      {doc.clinicalFocus[currentLocale].slice(0, 3).map((focus, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between">
                  <Link
                    href={getLocalizedPath(`/doctors/${doc.slug}`, currentLocale)}
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isArabic ? 'السيرة الذاتية الكاملة' : 'Full Clinical Profile'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </Link>
                  <WhatsAppCTA
                    locale={currentLocale}
                    treatmentName={doc.name[currentLocale]}
                    size="sm"
                    label={isArabic ? 'استشارة الطبيب' : 'Consult Doctor'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

