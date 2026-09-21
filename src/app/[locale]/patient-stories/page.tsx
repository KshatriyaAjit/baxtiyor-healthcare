import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { VideoTestimonialCard } from '@/components/trust/VideoTestimonialCard';
import { HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Real International Patient Stories & Recovery Journeys in India | Baxtiyor Healthcare',
  description:
    'Read genuine, consented medical travel journeys of international patients from Uzbekistan, Oman, Kazakhstan, and across Central Asia and the Arab world receiving care in India.',
};

export default async function PatientStoriesIndexPage({
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
    { name: isArabic ? 'تجارب وقصص المرضى' : 'Patient Stories', url: `/${currentLocale}/patient-stories` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'قصص وتجارب واقعية لمرضانا الدوليين' : 'Real International Patient Journeys'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'تجارب حقيقية موثقة بموافقة المرضى وعائلاتهم، توضح الجدول الزمني من لحظة الاستفسار وحتى استعادة الصحة والعودة سالمين للوطن.'
              : 'Documented case histories with verified timelines, genuine patient feedback, and clinical outcomes, illustrating the end-to-end coordination process.'}
          </p>
        </div>

        {/* Section 1: Video Case Reviews */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
              {isArabic ? 'مقابلات فيديو موثقة مع المرضى' : 'Consented Video Case Interviews'}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {isArabic ? 'بموافقة رسمية موثقة' : 'Verified & Consented'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PATIENT_STORIES.filter((s) => s.mediaType === 'video').map((story) => (
              <VideoTestimonialCard key={`video-${story.id}`} story={story} locale={currentLocale} />
            ))}
          </div>
        </section>

        {/* Section 2: Complete Written Case Histories & Timelines */}
        <section className="space-y-6 pt-6 border-t border-brand-border/70">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
            {isArabic ? 'سجلات وتقارير الحالات العلاجية الكاملة' : 'Detailed Case Histories & Timelines'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PATIENT_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded bg-brand-soft-teal text-brand-teal font-bold">
                      {story.patientCountry[currentLocale]}
                    </span>
                    <span className="text-gray-400 font-medium">Verified Timeline</span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy">
                    <Link href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                      {story.patientName}
                    </Link>
                  </h3>

                  <p className="text-xs font-semibold text-brand-blue">
                    {story.condition[currentLocale]}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-4">
                    {story.storySummary[currentLocale]}
                  </p>

                  <blockquote className="p-3 bg-brand-bg rounded-lg text-xs italic text-brand-navy border-s-4 border-brand-teal">
                    &ldquo;{story.quote[currentLocale]}&rdquo;
                  </blockquote>

                  <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    <span className="font-semibold">{isArabic ? 'النتيجة الإكلينيكية: ' : 'Outcome: '}</span>
                    {story.outcomeNote[currentLocale]}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between">
                  <Link
                    href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)}
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isArabic ? 'قراءة تفاصيل الرحلة' : 'View Journey Timeline'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </Link>
                  <WhatsAppCTA locale={currentLocale} treatmentName={story.patientName} size="sm" label={isArabic ? 'استفسار' : 'Inquire'} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

