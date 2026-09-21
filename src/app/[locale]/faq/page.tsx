import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { FAQS } from '@/data/faqs';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, createFaqSchema } from '@/components/seo/JsonLd';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { HelpCircle, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | Medical Treatment in India | Baxtiyor Healthcare',
  description:
    'Clear answers to international patient inquiries: medical visa processing, organ transplant legal requirements, hospital costs, Arabic translation, and travel logistics in India.',
};

export default async function FaqHubPage({
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
    { name: isArabic ? 'الأسئلة الشائعة' : 'FAQs', url: `/${currentLocale}/faq` },
  ];

  const faqSchemaData = createFaqSchema(
    FAQS.map((f) => ({
      question: f.question[currentLocale],
      answer: f.answer[currentLocale],
    }))
  );

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <JsonLd data={faqSchemaData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'الأسئلة الشائعة وإرشادات السفر الطبي' : 'Frequently Asked Questions & Patient Guidelines'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'إجابات مباشرة ومفصلة حول إجراءات المستشفيات، والتأشيرات الطبية، وقوانين زراعة الأعضاء في الهند، وتكاليف العلاج.'
              : 'Direct and transparent answers regarding hospital accreditation, statutory organ transplant regulations, visa timelines, and coordination procedures.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-3 hover:border-brand-blue/30 transition-colors"
              >
                <h2 className="text-base sm:text-lg font-bold text-brand-navy flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span>{faq.question[currentLocale]}</span>
                </h2>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed ps-7">
                  {faq.answer[currentLocale]}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

