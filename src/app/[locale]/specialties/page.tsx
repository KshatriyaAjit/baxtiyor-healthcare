import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SPECIALTIES } from '@/data/specialties';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Medical Specialties in India | Advanced Quaternary Care',
  description:
    'Explore premier medical specialties coordinated by Baxtiyor Healthcare in India: Cardiology, Oncology, Neurosurgery, Orthopedics, Kidney Transplant, and Liver Transplant.',
};

export default async function SpecialtiesPage({
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
      name: isArabic ? 'التخصصات الطبية' : 'Medical Specialties',
      url: `/${currentLocale}/specialties`,
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl my-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic
              ? 'التخصصات الطبية ومراكز التميز الجراحي'
              : 'Medical Specialties & Surgical Centers of Excellence'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'مراكز متقدمة حاصلة على اعتمادات دولية، تضم نخبة من كبار الجراحين والاستشاريين مع توفير أحدث تقنيات الروبوت والملاحة الجراحية.'
              : 'Internationally accredited super-specialty departments led by renowned surgical directors equipped with cutting-edge robotic and navigation systems.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-brand-navy">
                  {spec.name[currentLocale]}
                </h2>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {spec.shortDescription[currentLocale]}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-brand-text mb-2">
                    {isArabic ? 'أبرز الإجراءات التخصصية:' : 'Key Clinical Procedures:'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-brand-text-secondary">
                    {spec.keyProcedures[currentLocale].map((proc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between gap-2">
                <Link
                  href={getLocalizedPath(`/specialties/${spec.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'عرض تفاصيل التخصص' : 'View Specialty'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <WhatsAppCTA
                  locale={currentLocale}
                  treatmentName={spec.name[currentLocale]}
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

