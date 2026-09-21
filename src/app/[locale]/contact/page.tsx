import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Contact International Patient Coordination Desk | Baxtiyor Healthcare',
  description:
    'Reach Baxtiyor Healthcare international patient coordinators in Gurgaon (Delhi NCR), India. 24/7 WhatsApp assistance and direct medical opinion intake.',
};

export default async function ContactPage({
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
    { name: isArabic ? 'تواصل معنا' : 'Contact Desk', url: `/${currentLocale}/contact` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'مكتب تنسيق رعاية المرضى الدوليين' : 'International Patient Coordination Desk'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'فريقنا الطبي والتنسيقي متاح للإجابة على استفساراتكم ومراجعة التقارير الطبية على مدار الساعة.'
              : 'Our clinical and logistical coordination teams are available 24/7 to assist international families with hospital options, doctor reviews, and visa support.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'بيانات التواصل المباشرة' : 'Direct Contact Channels'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-brand-text-secondary">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-navy">{isArabic ? 'الهاتف الدولي المباشر:' : 'International Calling Line:'}</div>
                    <a href="tel:+919999999999" className="hover:text-brand-blue font-medium" dir="ltr">
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-navy">{isArabic ? 'مكتب الواتساب السريع:' : '24/7 WhatsApp Coordination:'}</div>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue font-medium" dir="ltr">
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-navy">{isArabic ? 'البريد الإلكتروني للتقارير:' : 'Medical Records Email:'}</div>
                    <a href="mailto:care@baxtiyorhealthcare.com" className="hover:text-brand-blue font-medium">
                      care@baxtiyorhealthcare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-navy">{isArabic ? 'الموقع والمقر الميداني:' : 'Coordination Desk Location:'}</div>
                    <p className="leading-relaxed">Gurugram (Delhi NCR), Haryana 122001, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-navy">{isArabic ? 'أوقات العمل وسرعة الرد:' : 'Working Hours & Turnaround:'}</div>
                    <p className="leading-relaxed">
                      {isArabic
                        ? 'مكتب التنسيق متاح طوال أيام الأسبوع؛ مراجعة التقارير الطبية خلال 24 إلى 48 ساعة.'
                        : 'Desk operates 7 days a week. Clinical review completed within 24 to 48 hours.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <WhatsAppCTA locale={currentLocale} fullWidth size="md" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm locale={currentLocale} />
          </div>
        </div>
      </div>
    </div>
  );
}

