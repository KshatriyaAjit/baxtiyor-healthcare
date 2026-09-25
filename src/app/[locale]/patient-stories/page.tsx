import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { getAllVideos, getAllPatientStories, getAllTestimonials, getAllMedia } from '@/lib/admin/content';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { VideoTestimonialCard } from '@/components/trust/VideoTestimonialCard';
import { YouTubeVideoCard } from '@/components/trust/YouTubeVideoCard';
import { HomepageMediaGallery } from '@/components/trust/HomepageMediaGallery';
import { HeartHandshake, CheckCircle2, ArrowRight, Youtube, Quote, ShieldCheck, PlayCircle } from 'lucide-react';

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

  const [videos, adminStories, testimonials, mediaItems] = await Promise.all([
    getAllVideos(true),
    getAllPatientStories(true),
    getAllTestimonials(true),
    getAllMedia({ published: true, consentStatus: 'approved' }),
  ]);

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'تجارب وقصص المرضى' : 'Patient Stories', url: `/${currentLocale}/patient-stories` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isArabic ? 'تجارب موثقة بموافقة قانونية للمرضى' : '100% Consented & Verified Case Records'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'قصص وتجارب واقعية لمرضانا الدوليين' : 'Real International Patient Journeys'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'تجارب حقيقية موثقة بموافقة المرضى وعائلاتهم، توضح الجدول الزمني من لحظة الاستفسار الأولي عبر الواتساب وحتى استعادة العافية والعودة سالمين للوطن.'
              : 'Documented case histories with verified timelines, genuine patient feedback, and clinical outcomes, illustrating the end-to-end coordination process.'}
          </p>
        </div>

        {/* Section 1: Official YouTube Channel Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Youtube className="w-6 h-6 text-red-600 fill-current" />
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
                  {isArabic ? 'مقابلات فيديو وجولات المستشفيات' : 'Official YouTube Video Showcase'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
                {isArabic
                  ? 'جولات ميدانية ومقابلات حصرية من قناتنا الرسمية @baxtiyorindiya'
                  : 'Curated facility tours, doctor discussions, and arrival journeys from @baxtiyorindiya'}
              </p>
            </div>

            <a
              href="https://youtube.com/@baxtiyorindiya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>{isArabic ? 'زيارة القناة الرسمية' : 'Visit @baxtiyorindiya'}</span>
            </a>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((vid) => (
                <YouTubeVideoCard
                  key={vid.id}
                  videoId={vid.youtubeVideoId}
                  title={isArabic && vid.titleAr ? vid.titleAr : vid.title}
                  description={isArabic && vid.descriptionAr ? vid.descriptionAr : vid.description}
                  category={vid.category}
                  thumbnailUrl={vid.thumbnailUrl}
                  locale={currentLocale}
                  uploadDate={vid.createdAt ? vid.createdAt.split('T')[0] : '2024-03-01'}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-brand-border p-8 text-center space-y-4 max-w-xl mx-auto shadow-sm">
              <Youtube className="w-12 h-12 text-red-600 fill-current mx-auto" />
              <h3 className="text-lg font-bold text-brand-navy">
                {isArabic ? 'قناة بختيار للرعاية الصحية' : 'Official YouTube Channel'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {isArabic
                  ? 'شاهد جولات المستشفيات في دلهي ومقابلات الأطباء الاستشاريين عبر قناتنا على يوتيوب.'
                  : 'Explore verified hospital tours, transplant guides, and specialist discussions on YouTube.'}
              </p>
              <a
                href="https://youtube.com/@baxtiyorindiya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>@baxtiyorindiya</span>
              </a>
            </div>
          )}
        </section>

        {/* Section 2: Consented Video Case Interviews */}
        {PATIENT_STORIES.filter((s) => s.mediaType === 'video').length > 0 && (
          <section className="space-y-6 pt-6 border-t border-brand-border/70">
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
        )}

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

        {/* Section 4: Real Patient Journeys Media Gallery */}
        <HomepageMediaGallery items={mediaItems} locale={currentLocale} />

        {/* Section 5: Verified Patient Testimonials (Zero Fake Stars) */}
        {testimonials.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-brand-border/70">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
                {isArabic ? 'آراء وملاحظات المرضى الدوليين' : 'International Patient Feedback'}
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
                {isArabic
                  ? 'شهادات حقيقية من مرضى وعائلات رافقناهم طوال رحلة العلاج في دلهي وجورجاون.'
                  : 'Direct quotes and coordination feedback from international families assisted in Delhi NCR.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl border border-brand-border/80 p-6 shadow-sm space-y-4 hover:border-brand-teal/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-soft-teal flex items-center justify-center shrink-0">
                      <Quote className="w-4 h-4 text-brand-teal" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-navy">{t.patientName}</div>
                      <div className="text-xs text-brand-text-secondary">
                        {t.country} {t.treatmentName ? `• ${t.treatmentName}` : ''} {t.hospitalName ? `(${t.hospitalName})` : ''}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    &ldquo;{isArabic && t.quoteAr ? t.quoteAr : t.quote}&rdquo;
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-700">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {isArabic ? 'موافقة وتوثيق معتمد' : 'Verified Coordinator Feedback'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

