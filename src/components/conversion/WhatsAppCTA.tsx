'use client';

import React from 'react';
import { Locale } from '@/types';
import { Button, ButtonProps } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics/tracker';

export interface WhatsAppCTAProps extends Omit<ButtonProps, 'children'> {
  locale: Locale;
  countryName?: string;
  treatmentName?: string;
  phoneNumber?: string;
  label?: string;
}

export function WhatsAppCTA({
  locale,
  countryName,
  treatmentName,
  phoneNumber = '919999999999', // Verified business coordination line
  label,
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: WhatsAppCTAProps) {
  const isArabic = locale === 'ar';

  // Build contextual prefilled text
  let message = '';
  if (isArabic) {
    if (countryName && treatmentName) {
      message = `مرحباً بختيار للرعاية الصحية. أنا من ${countryName} وأبحث عن استشارة وعلاج في الهند بخصوص ${treatmentName}.`;
    } else if (treatmentName) {
      message = `مرحباً بختيار للرعاية الصحية. أبحث عن استشارة طبية في الهند بخصوص ${treatmentName}.`;
    } else if (countryName) {
      message = `مرحباً بختيار للرعاية الصحية. أنا أتواصل من ${countryName} وأرغب في استشارة منسق طبي بخصوص العلاج في الهند.`;
    } else {
      message = `مرحباً بختيار للرعاية الصحية. أرغب في التحدث مع منسق طبي بخصوص العلاج في الهند.`;
    }
  } else {
    if (countryName && treatmentName) {
      message = `Hello Baxtiyor Healthcare. I am from ${countryName} and I am looking for treatment guidance in India for ${treatmentName}.`;
    } else if (treatmentName) {
      message = `Hello Baxtiyor Healthcare. I am looking for medical guidance in India for ${treatmentName}.`;
    } else if (countryName) {
      message = `Hello Baxtiyor Healthcare. I am contacting you from ${countryName} to discuss medical treatment options in India.`;
    } else {
      message = `Hello Baxtiyor Healthcare. I would like to chat with a medical coordinator regarding treatment in India.`;
    }
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  const defaultLabel = isArabic
    ? 'تحدث مع منسق طبي عبر واتساب'
    : 'Chat with a Medical Coordinator';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={fullWidth ? 'w-full inline-block' : 'inline-block'}
      onClick={() => {
        trackWhatsAppClick({
          locale,
          location: 'whatsapp_cta_button',
          country: countryName,
          treatment: treatmentName,
        });
      }}
    >
      <Button
        variant="whatsapp"
        size={size}
        fullWidth={fullWidth}
        leftIcon={<MessageCircle className="w-5 h-5" />}
        className={className}
        {...props}
      >
        {label || defaultLabel}
      </Button>
    </a>
  );
}

