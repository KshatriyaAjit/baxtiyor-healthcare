import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import {
  Upload,
  FileCheck2,
  Plane,
  Building2,
  HeartPulse,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'How It Works | 5-Step International Patient Journey to India | Baxtiyor Healthcare',
  description:
    'Learn how Baxtiyor Healthcare guides you from initial report review and official medical visa issuance to hospital treatment in India and safe recovery.',
};

export default async function HowItWorksPage({
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
    { name: isArabic ? 'كيف نعمل' : 'How It Works', url: `/${currentLocale}/how-it-works` },
  ];

  const steps = [
    {
      step: '01',
      icon: Upload,
      title: {
        en: 'Upload Medical Reports for Free Evaluation',
        ar: 'رفع التقارير الطبية للتقييم المجاني',
      },
      desc: {
        en: 'Submit your recent MRI, CT scans, blood tests, and doctor notes via our secure online intake or WhatsApp. We protect your medical confidentiality strictly.',
        ar: 'أرسل أحدث تقارير الرنين المغناطيسي، والأشعة، والتحاليل عبر نموذج الموقع الآمن أو عبر الواتساب، مع حماية كاملة لسرية ملفاتك.',
      },
      time: { en: 'Day 1', ar: 'اليوم الأول' },
    },
    {
      step: '02',
      icon: FileCheck2,
      title: {
        en: 'Receive Specialist Opinions & Cost Estimate',
        ar: 'استلام التقييم الطبي وعرض السعر التقديري',
      },
      desc: {
        en: 'Within 24 to 48 hours, our partner hospital boards review your case. We provide comparative doctor recommendations, expected surgical approaches, and package prices.',
        ar: 'خلال 24-48 ساعة، تدرس اللجان الطبية بالمستشفيات تقاريرك. نرسل لك آراء الاستشاريين، والخطط الجراحية المقترحة، وعروض الأسعار الواضحة.',
      },
      time: { en: '24-48 Hours', ar: 'خلال 24-48 ساعة' },
    },
    {
      step: '03',
      icon: Plane,
      title: {
        en: 'Medical Visa Letters & Travel Preparation',
        ar: 'إصدار خطابات التأشيرة الطبية وترتيب السفر',
      },
      desc: {
        en: 'We issue authorized hospital medical visa invitation letters for the patient and attendants, assist with e-Medical visa applications, and book airport pickup.',
        ar: 'نصدر خطابات الدعوة الطبية الرسمية للمريض والمرافقين، ونساعد في استخراج التأشيرة الإلكترونية، ونرتب الاستقبال الخاص من مطار دلهي.',
      },
      time: { en: '2-3 Days', ar: '2 إلى 3 أيام' },
    },
    {
      step: '04',
      icon: Building2,
      title: {
        en: 'Hospital Admission, Tests & Treatment in India',
        ar: 'دخول المستشفى، الفحوصات، وبدء العلاج',
      },
      desc: {
        en: 'Your dedicated coordinator meets you in person. We accompany you to all consultations, diagnostic cross-matching, surgical procedures, and inpatient care.',
        ar: 'يستقبلك منسقك الشخصي ويرافقك في كافة الفحوصات التمهيدية، ومقابلة الجراحين، والتنويم داخل أجنحة المستشفى وحتى إجراء العملية.',
      },
      time: { en: 'Treatment Stay', ar: 'فترة العلاج بالمستشفى' },
    },
    {
      step: '05',
      icon: HeartPulse,
      title: {
        en: 'Recovery, Fit-to-Fly & Post-Discharge Care',
        ar: 'النقاهة، تصريح الطيران، والمتابعة بعد العودة',
      },
      desc: {
        en: 'After discharge, we assist with nearby serviced accommodations, weekly outpatient tests, fit-to-fly certification, and ongoing tele-consultations with your doctors once home.',
        ar: 'بعد الخروج، نساعدك في السكن القريب، وفحوصات النقاهة، وإصدار شهادة اللياقة للسفر، مع استمرار المتابعة الطبية عن بعد بعد العودة لبلدك.',
      },
      time: { en: 'Post-Op & Home Follow-up', ar: 'النقاهة والمتابعة' },
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm max-w-4xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'كيف نعمل: خطوات رحلة المريض الدولي في الهند' : 'How It Works: The 5-Step International Patient Journey'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'دليل تفصيلي يوضح كل مرحلة من مراحل رحلتك العلاجية في الهند، لضمان أعلى درجات الراحة والأمان الطبي لعائلتك.'
              : 'A step-by-step roadmap explaining how we guide international families from the first medical inquiry to safe arrival, quaternary treatment, and healthy return home.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start gap-5 hover:border-brand-blue/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-soft-blue text-brand-blue flex items-center justify-center font-black text-xl shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-brand-teal uppercase tracking-widest">
                        {isArabic ? `المرحلة ${item.step}` : `STEP ${item.step}`}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-brand-bg text-brand-text-secondary border border-brand-border/60">
                        {item.time[currentLocale]}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-brand-navy">
                      {item.title[currentLocale]}
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                      {item.desc[currentLocale]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

