'use client';

import React from 'react';
import { Locale } from '@/types';
import { SITE_CONTACT, SocialLinkItem } from '@/lib/config/contact';
import { trackEvent } from '@/lib/analytics/tracker';
import { Youtube, Send, Instagram, Facebook, Linkedin } from 'lucide-react';

interface SocialLinksRowProps {
  locale: Locale;
  className?: string;
  links?: SocialLinkItem[];
}

export function SocialLinksRow({ locale, className = '', links }: SocialLinksRowProps) {
  const activeLinks = (links || SITE_CONTACT.defaultSocialLinks).filter((l) => l.enabled);
  const isArabic = locale === 'ar';

  const handleClick = (platform: string) => {
    trackEvent('social_click', {
      locale,
      language: locale,
      social_platform: platform,
    });
  };

  const renderIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500 fill-current" />;
      case 'telegram':
        return <Send className="w-4 h-4 text-sky-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-300" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
        {isArabic ? 'قنواتنا الرسمية الموثقة' : 'Official Channels'}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {activeLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.platform)}
            aria-label={`${link.name}: ${link.handle}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium border border-gray-700/80 transition-all hover:border-gray-500 hover:scale-105"
          >
            {renderIcon(link.platform)}
            <span>{link.platform === 'youtube' ? '@baxtiyorindiya' : link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

