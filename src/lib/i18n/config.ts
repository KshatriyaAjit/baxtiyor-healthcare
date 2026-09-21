import { Locale } from '@/types';

export const LOCALES: Locale[] = ['en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove existing locale prefix if present
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
    segments.shift();
  }
  const subPath = segments.length > 0 ? `/${segments.join('/')}` : '';
  return `/${locale}${subPath}`;
}

