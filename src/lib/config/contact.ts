import { Locale } from '@/types';

export interface SocialLinkItem {
  id: string;
  platform: 'youtube' | 'instagram' | 'facebook' | 'telegram' | 'linkedin' | 'whatsapp';
  name: string;
  url: string;
  handle: string;
  enabled: boolean;
  order: number;
}

export const SITE_CONTACT = {
  // Official Central WhatsApp Number
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999',
  
  // Official Call Assistance Desk
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+919999999999',
  
  // Official Patient Coordination Email
  email: 'care@baxtiyorhealthcare.com',
  
  // Official Physical Office
  location: {
    city: 'Gurugram (Delhi NCR)',
    state: 'Haryana',
    country: 'India',
    address: 'Near Fortis Memorial Research Institute, Sector 44, Gurugram, India',
  },

  // Official Verified Social Channels (No fake accounts)
  defaultSocialLinks: [
    {
      id: 'social-youtube',
      platform: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/@baxtiyorindiya',
      handle: '@baxtiyorindiya',
      enabled: true,
      order: 1,
    },
    {
      id: 'social-telegram',
      platform: 'telegram',
      name: 'Telegram',
      url: 'https://t.me/baxtiyorhealthcare',
      handle: '@baxtiyorhealthcare',
      enabled: true,
      order: 2,
    },
    {
      id: 'social-instagram',
      platform: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/baxtiyorhealthcare',
      handle: '@baxtiyorhealthcare',
      enabled: true,
      order: 3,
    },
    {
      id: 'social-facebook',
      platform: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/baxtiyorhealthcare',
      handle: 'baxtiyorhealthcare',
      enabled: true,
      order: 4,
    },
    {
      id: 'social-linkedin',
      platform: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/baxtiyorhealthcare',
      handle: 'baxtiyorhealthcare',
      enabled: true,
      order: 5,
    },
  ] as SocialLinkItem[],
};

export interface WhatsAppUrlOptions {
  locale?: Locale;
  treatmentName?: string;
  hospitalName?: string;
  countryName?: string;
  customMessage?: string;
  sourceContext?: 'homepage' | 'treatment' | 'hospital' | 'story' | 'opinion' | 'cost' | 'chat';
}

/**
 * Generates a clean, privacy-safe WhatsApp redirection URL with contextual greeting.
 * NEVER puts patient medical diagnosis, clinical history, or reports into the URL.
 */
export function getWhatsAppUrl(options: WhatsAppUrlOptions = {}): string {
  const { locale = 'en', treatmentName, hospitalName, countryName, customMessage, sourceContext } = options;
  const isArabic = locale === 'ar';
  const cleanNumber = SITE_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');

  if (customMessage) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMessage)}`;
  }

  let text = isArabic
    ? 'مرحباً بختيار للرعاية الصحية. أرغب في التحدث مع منسق طبي بخصوص العلاج في الهند.'
    : 'Hello Baxtiyor Healthcare. I would like to consult a medical coordinator regarding treatment in India.';

  if (sourceContext === 'treatment' && treatmentName) {
    text = isArabic
      ? `مرحباً بختيار للرعاية الصحية. أود الاستفسار عن تفاصيل (${treatmentName}) في المستشفيات الهندية المعتمدة.`
      : `Hello Baxtiyor Healthcare. I would like to inquire about (${treatmentName}) at accredited hospitals in India.`;
  } else if (sourceContext === 'hospital' && hospitalName) {
    text = isArabic
      ? `مرحباً بختيار للرعاية الصحية. أود الاستفسار عن حجز موعد واستشارة في مستشفى (${hospitalName}).`
      : `Hello Baxtiyor Healthcare. I would like to consult regarding doctors and admission at (${hospitalName}).`;
  } else if (sourceContext === 'story') {
    text = isArabic
      ? 'مرحباً بختيار للرعاية الصحية. اطلعت على تجارب المرضى وأرغب في استشارة منسق طبي للحصول على تقييم لحالتي.'
      : 'Hello Baxtiyor Healthcare. I reviewed your patient journeys and would like to speak with a coordinator regarding a medical evaluation.';
  } else if (treatmentName && countryName) {
    text = isArabic
      ? `مرحباً بختيار للرعاية الصحية. أنا قادم من ${countryName} وأود استشارة طبية عن ${treatmentName}.`
      : `Hello Baxtiyor Healthcare. I am reaching out from ${countryName} regarding ${treatmentName} in India.`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

