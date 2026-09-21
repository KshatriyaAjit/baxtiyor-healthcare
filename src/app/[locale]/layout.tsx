import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { Locale } from '@/types';
import { isValidLocale, LOCALES } from '@/lib/i18n/config';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { StickyMobileBar } from '@/components/conversion/StickyMobileBar';
import { JsonLd, createOrganizationSchema } from '@/components/seo/JsonLd';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const isArabic = currentLocale === 'ar';

  return {
    metadataBase: new URL('https://baxtiyorhealthcare.com'),
    title: {
      template: '%s | Baxtiyor Healthcare',
      default: isArabic
        ? 'بختيار للرعاية الصحية | رعاية طبية مخصصة في الهند للمرضى الدوليين'
        : 'Baxtiyor Healthcare | Personalized Medical Care in India for International Patients',
    },
    description: isArabic
      ? 'لأكثر من عقد من الزمان، تقدم بختيار للرعاية الصحية المساعدة للمرضى الدوليين وعائلاتهم لتنسيق العلاج الطبي في الهند من خلال مستشفيات مختارة وأطباء ذوي خبرة عالية.'
      : 'For more than a decade, Baxtiyor Healthcare has helped international patients and families coordinate medical treatment in India through selected hospitals, experienced specialists, and personalized patient support.',
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
    keywords: [
      'medical treatment in india',
      'medical tourism india',
      'healthcare in india for international patients',
      'kidney transplant india',
      'liver transplant india',
      'heart surgery india',
      'robotic knee replacement india',
    ],
    authors: [{ name: 'Baxtiyor Healthcare Clinical Coordination Team' }],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const isArabic = currentLocale === 'ar';

  return (
    <html lang={currentLocale} dir={isArabic ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`min-h-screen flex flex-col bg-brand-bg text-brand-text ${
          isArabic ? 'font-arabic' : 'font-sans'
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
        >
          {isArabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>
        <AnalyticsProvider locale={currentLocale}>
          <JsonLd data={createOrganizationSchema(currentLocale)} />
          <Header locale={currentLocale} />
          <main id="main-content" className="flex-grow">{children}</main>
          <StickyMobileBar locale={currentLocale} />
          <Footer locale={currentLocale} />
        </AnalyticsProvider>
      </body>
    </html>
  );
}

