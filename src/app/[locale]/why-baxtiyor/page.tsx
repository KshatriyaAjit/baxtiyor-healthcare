import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { TrustMetrics } from '@/components/trust/TrustMetrics';
import { Button } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { TeamSection } from '@/components/trust/TeamSection';
import {
  HeartHandshake,
  Building2,
  ShieldCheck,
  Languages,
  FileCheck2,
  Plane,
  Award,
  Users,
} from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Why Baxtiyor Healthcare | 10+ Years International Patient Experience in India',
  description:
    'Discover why international patients from Central Asia and Arab countries trust Baxtiyor Healthcare for personalized medical care, selected hospitals, and transparent coordination.',
};

export default async function WhyBaxtiyorPage({
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
    { name: isArabic ? 'لماذا بختيار' : 'Why Baxtiyor', url: `/${currentLocale}/why-baxtiyor` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft-teal text-brand-teal text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{isArabic ? 'قيمنا: الثقة • الشفافية • الرعاية الإنسانية' : 'Our Core: Trust • Transparency • Personal Care'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'لماذا بختيار للرعاية الصحية؟' : 'Why International Families Trust Baxtiyor Healthcare'}
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'تأسست بختيار للرعاية الصحية لمساعدة المرضى الدوليين وعائلاتهم على اجتياز رحلة العلاج في الهند بسهولة وطمأنينة. نحن لسنا مجرد وكالة سفر أو دليل مستشفيات عادي، بل نحن فريق تنسيق طبي متخصص يقف بجانبك من الاستشارة الأولى وحتى الشفاء والعودة.'
              : 'Baxtiyor Healthcare was founded to provide international patients and families with a reliable, personally guided bridge to India’s leading quaternary hospitals. We are not a travel agency or a generic directory; we are an experienced healthcare coordination team dedicated to clinical integrity, transparency, and personal care.'}
          </p>
        </div>

        <TrustMetrics locale={currentLocale} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'المبادئ الإكلينيكية والخدمية التي نلتزم بها' : 'Our Foundational Principles & Guarantees'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-brand-text-secondary">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                  <HeartHandshake className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-1">{isArabic ? '1. رعاية شخصية غير تجارية' : '1. Personal, Human-Centered Coordination'}</h3>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'يرافقك منسق طبي خاص في جميع المواعيد والفحوصات، للتأكد من فهمك لكل خطوة إكلينيكية دون شعور بالغربة.'
                        : 'Every patient is assigned a personal coordinator who accompanies them to appointments, tests, and surgical consultations.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                  <Building2 className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-1">{isArabic ? '2. ربط مباشر مع كبرى المستشفيات' : '2. Independent Quaternary Hospital Selection'}</h3>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'علاقات عمل وثيقة مع معهد فورتيس، ومستشفى أرتيميس، ومستشفيات سانار، ومارينغو آسيا لتقديم خيارات علاجية مقارنة ومحايدة.'
                        : 'Close coordination relationships with Fortis FMRI, Artemis, Shalby Sanar, and Marengo Asia to provide comparative clinical recommendations.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                  <FileCheck2 className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-1">{isArabic ? '3. شفافية التكاليف ودفع مباشر للمستشفى' : '3. Absolute Cost Transparency'}</h3>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'خدماتنا الاستشارية والتنسيقية مجانية للمريض. يتم تسديد كافة الفواتير مباشرة لحسابات المستشفى الرسمية دون أي زيادات خفية.'
                        : 'Our coordination and medical review services are free for patients. All hospital expenses are paid directly to the official hospital billing desk.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-bg/60 border border-brand-border/60">
                  <Languages className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-1">{isArabic ? '4. دعم مخصص للمرضى العرب ودول آسيا الوسطى' : '4. Dedicated Arabic & CIS Patient Support'}</h3>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'مترجمون أصليون بالعربية والروسية والأوزبكية، وتوفير الوجبات الحلال، ومساعدات الإقامة والسكن المريح للعائلات.'
                        : 'Native Arabic, Russian, and Uzbek translators, Halal meal options, and proximity to comfortable serviced family apartments.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <LeadForm locale={currentLocale} compact />
          </div>
        </div>

        {/* International Patient Coordination Team */}
        <div className="pt-8 border-t border-brand-border/70">
          <TeamSection locale={currentLocale} />
        </div>
      </div>
    </div>
  );
}

