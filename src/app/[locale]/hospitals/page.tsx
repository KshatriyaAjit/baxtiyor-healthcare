import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { HOSPITALS } from '@/data/hospitals';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Building2, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Top Accredited Hospitals in Delhi NCR, India | Baxtiyor Healthcare',
  description:
    'Explore verified quaternary partner hospitals in Gurgaon / Delhi NCR: Fortis Memorial Research Institute, Artemis Hospital, Shalby Sanar International, and Marengo Asia International.',
};

export default async function HospitalsDirectoryPage({
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
    { name: isArabic ? 'المستشفيات الشريكة' : 'Partner Hospitals', url: `/${currentLocale}/hospitals` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'المستشفيات الشريكة المعتمدة في الهند' : 'Accredited Partner Hospitals in India'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'مستشفيات حاصلة على اعتمادات JCI وNABH الدولية في دلهي وجورجاون، مجهزة بأحدث التقنيات الجراحية وأجنحة المرضى الدوليين.'
              : 'JCI and NABH accredited quaternary facilities in Gurgaon and Delhi NCR offering dedicated international patient lounges, translation desks, and advanced clinical care.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HOSPITALS.map((h) => (
            <div key={h.id} className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-brand-navy">
                      <Link href={getLocalizedPath(`/hospitals/${h.slug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                        {h.name[currentLocale]}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-brand-teal font-semibold mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{h.location[currentLocale]}</span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-brand-soft-blue text-brand-blue font-bold shrink-0">
                    {h.bedsCount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {h.overview[currentLocale]}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-brand-text">
                    {isArabic ? 'الخدمات الدولية المتاحة:' : 'International Services:'}
                  </div>
                  <ul className="space-y-1 text-brand-text-secondary">
                    {h.internationalPatientServices[currentLocale].slice(0, 3).map((srv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-brand-bg rounded-lg text-xs text-brand-text-secondary border border-brand-border/60">
                  <span className="font-semibold text-brand-navy">{isArabic ? 'الاعتماد: ' : 'Accreditation: '}</span>
                  {h.accreditationNote[currentLocale]}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between">
                <Link
                  href={getLocalizedPath(`/hospitals/${h.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'عرض ملف المستشفى الكامل' : 'View Facility Profile'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
                  <Button variant="outline" size="sm">
                    {dict.common.getFreeOpinion}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

