import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLocalizedPath } from '@/lib/i18n/config';
import { Phone, MessageCircle, Mail, MapPin, ShieldAlert } from 'lucide-react';
import { SITE_CONTACT, getWhatsAppUrl } from '@/lib/config/contact';
import { SocialLinksRow } from '@/components/common/SocialLinksRow';

export interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-24 lg:pb-16 border-t border-brand-navy/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-gray-700/60">
          {/* Col 1: Brand & Coordinator Desk */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center text-white font-bold text-xl shadow-sm">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  BAXTIYOR
                </span>
                <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase">
                  HEALTHCARE
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {dict.common.tagline}. {dict.common.arabTagline}
            </p>

            <div className="pt-2 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                <span>Gurugram (Delhi NCR), Haryana, India</span>
                <span>{SITE_CONTACT.location.city}, {SITE_CONTACT.location.state}, {SITE_CONTACT.location.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                <span dir="ltr">+91 99999 99999</span>
                <a
                  href={`tel:${SITE_CONTACT.phoneNumber}`}
                  className="hover:text-brand-teal transition-colors"
                  dir="ltr"
                >
                  {SITE_CONTACT.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="hover:text-brand-teal transition-colors"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Coordination Desk available 24/7</span>
                <a
                  href={getWhatsAppUrl({ locale, sourceContext: 'homepage' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  {isArabic ? 'مكتب التنسيق عبر الواتساب متاح 24/7' : 'WhatsApp Coordination Desk available 24/7'}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700/60">
              <SocialLinksRow locale={locale} />
            </div>
          </div>

          {/* Col 2: Core Specialties */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {dict.nav.specialties}
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href={getLocalizedPath('/specialties/cardiology', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'أمراض وجراحة القلب' : 'Cardiology & Heart'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/specialties/kidney', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'زراعة الكلى وأمراض الكلى' : 'Kidney Transplant'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/specialties/liver', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'زراعة الكبد وجراحة الكبد' : 'Liver Transplant'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/specialties/orthopedics', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'استبدال المفاصل بالروبوت' : 'Robotic Orthopedics'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/specialties/oncology', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'علاج الأورام المتقدم' : 'Advanced Oncology'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/specialties/neurosurgery', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'جراحة أورام المخ والأعصاب' : 'Neurosurgery & Spine'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Hospitals */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {dict.nav.hospitals}
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href={getLocalizedPath(
                    '/hospitals/fortis-memorial-research-institute',
                    locale
                  )}
                  className="hover:text-brand-teal transition-colors"
                >
                  Fortis FMRI, Gurgaon
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/hospitals/artemis-hospital-gurgaon', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  Artemis Hospital, Gurgaon
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath(
                    '/hospitals/shalby-sanar-international',
                    locale
                  )}
                  className="hover:text-brand-teal transition-colors"
                >
                  Shalby Sanar International
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath(
                    '/hospitals/marengo-asia-international',
                    locale
                  )}
                  className="hover:text-brand-teal transition-colors"
                >
                  Marengo Asia International
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/treatment-cost', locale)}
                  className="text-brand-teal hover:underline pt-1 inline-block font-semibold"
                >
                  {dict.nav.treatmentCosts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: International Patients */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {isArabic ? 'دليل المرضى الدوليين' : 'International Care'}
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href={getLocalizedPath('/countries/oman', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'المرضى من عُمان' : 'Patients from Oman'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/countries/saudi-arabia', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'المرضى من السعودية' : 'Patients from Saudi Arabia'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/countries/uae', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'المرضى من الإمارات' : 'Patients from UAE'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/countries/uzbekistan', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'المرضى من أوزبكستان' : 'Patients from Uzbekistan'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/countries/kazakhstan', locale)}
                  className="hover:text-brand-teal transition-colors"
                >
                  {isArabic ? 'المرضى من كازاخستان' : 'Patients from Kazakhstan'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/patient-stories', locale)}
                  className="text-brand-teal hover:underline pt-1 inline-block font-semibold"
                >
                  {dict.nav.patientStories}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="py-6 border-b border-gray-700/60 text-xs text-gray-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>{dict.common.medicalDisclaimer}</p>
          </div>
        </div>

        {/* Bottom Copyright & Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Baxtiyor Healthcare. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={getLocalizedPath('/privacy-policy', locale)}
              className="hover:text-white transition-colors"
            >
              {isArabic ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link
              href={getLocalizedPath('/how-it-works', locale)}
              className="hover:text-white transition-colors"
            >
              {dict.nav.howItWorks}
            </Link>
            <span>•</span>
            <Link
              href={getLocalizedPath('/why-baxtiyor', locale)}
              className="hover:text-white transition-colors"
            >
              {dict.nav.whyBaxtiyor}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

