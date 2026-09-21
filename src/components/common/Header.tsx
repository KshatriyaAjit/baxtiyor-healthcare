'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLocalizedPath } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import {
  Phone,
  MessageCircle,
  Globe,
  Menu,
  X,
  HeartHandshake,
  ChevronDown,
} from 'lucide-react';

export interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArabic = locale === 'ar';
  const oppositeLocale: Locale = isArabic ? 'en' : 'ar';
  const oppositeLabel = isArabic ? 'English' : 'العربية';

  // Compute localized target for language switcher
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  const switchLangUrl = `/${oppositeLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

  const navLinks = [
    { href: getLocalizedPath('/specialties', locale), label: dict.nav.specialties },
    { href: getLocalizedPath('/treatments', locale), label: dict.nav.treatments },
    { href: getLocalizedPath('/hospitals', locale), label: dict.nav.hospitals },
    { href: getLocalizedPath('/doctors', locale), label: dict.nav.doctors },
    { href: getLocalizedPath('/treatment-cost', locale), label: dict.nav.treatmentCosts },
    { href: getLocalizedPath('/patient-stories', locale), label: dict.nav.patientStories },
    { href: getLocalizedPath('/countries', locale), label: dict.nav.countries },
    { href: getLocalizedPath('/how-it-works', locale), label: dict.nav.howItWorks },
    { href: getLocalizedPath('/why-baxtiyor', locale), label: dict.nav.whyBaxtiyor },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-brand-border">
      {/* Top International Patient Desk Bar */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-300">
              <HeartHandshake className="w-3.5 h-3.5 text-brand-teal" />
              <span>
                {isArabic
                  ? 'تنسيق طبي شخصي في الهند للمرضى الدوليين | خبرة 10+ سنوات'
                  : 'Personalized Medical Care in India | 10+ Years International Experience'}
              </span>
            </span>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center gap-1.5 text-white hover:text-brand-soft-blue transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-teal" />
              <span dir="ltr">+91 99999 99999</span>
            </a>
          </div>

          <div className="flex items-center gap-3 ms-auto">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isArabic ? 'واتساب المنسق' : 'Coordinator WhatsApp'}</span>
            </a>
            <span className="text-gray-500">|</span>
            {/* Language Switcher */}
            <Link
              href={switchLangUrl}
              className="inline-flex items-center gap-1 text-white hover:text-brand-teal transition-colors font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-brand-teal" />
              <span>{oppositeLabel}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href={getLocalizedPath('/', locale)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-brand-navy transition-colors">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-navy leading-none">
                BAXTIYOR
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-brand-teal uppercase">
                HEALTHCARE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-brand-text">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-blue transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href={getLocalizedPath('/medical-opinion', locale)}>
              <Button variant="primary" size="md">
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-brand-text hover:bg-brand-bg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-brand-border px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="grid gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-soft-blue hover:text-brand-blue"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-border space-y-2">
            <Link
              href={getLocalizedPath('/medical-opinion', locale)}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="primary" size="md" fullWidth>
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
            <Link
              href={switchLangUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold border border-brand-border text-brand-navy"
            >
              <Globe className="w-4 h-4 text-brand-teal" />
              <span>{oppositeLabel}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

