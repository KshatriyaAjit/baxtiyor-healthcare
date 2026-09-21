import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { COUNTRIES } from '@/data/countries';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Globe, Plane, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'International Patient Pathways by Country | Baxtiyor Healthcare',
  description:
    'Dedicated medical travel pathways to India for patients from Oman, Saudi Arabia, UAE, Uzbekistan, Kazakhstan, Turkmenistan, Afghanistan, and Russia.',
};

export default async function CountriesIndexPage({
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
    { name: isArabic ? 'دليل المرضى حسب الدولة' : 'Patient Pathways by Country', url: `/${currentLocale}/countries` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'دليل المرضى الدوليين حسب الدولة' : 'International Patient Pathways by Country'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'توجيهات مخصصة بخصوص التأشيرات الطبية الهندية، ورحلات الطيران المباشرة، والمترجمين المرافقين للمرضى من دول الخليج وآسيا الوسطى.'
              : 'Country-specific guidance covering Indian medical visas, direct flights, native language coordinators, and hospital coordination for your region.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COUNTRIES.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-brand-bg text-brand-text-secondary border border-brand-border/60">
                    {country.region}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-brand-navy">
                  <Link href={getLocalizedPath(`/countries/${country.slug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                    {country.countryName[currentLocale]}
                  </Link>
                </h2>

                <p className="text-xs text-brand-text-secondary leading-relaxed line-clamp-3">
                  {country.overview[currentLocale]}
                </p>

                <div className="text-xs text-brand-teal font-semibold pt-1 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 shrink-0" />
                  <span>{country.visaInfo.processingTime[currentLocale]}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-brand-border flex items-center justify-between">
                <Link
                  href={getLocalizedPath(`/countries/${country.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'دليل الدولة' : 'View Guide'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <WhatsAppCTA
                  locale={currentLocale}
                  countryName={country.countryName[currentLocale]}
                  size="sm"
                  label={isArabic ? 'استشارة' : 'Inquire'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

