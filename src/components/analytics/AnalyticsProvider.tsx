'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { Locale } from '@/types';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || '';

export function AnalyticsProvider({ children, locale }: AnalyticsProviderProps) {
  useEffect(() => {
    // Keep client-side state synchronized if locale changes
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'site_locale_changed',
      site_locale: locale,
    });
  }, [locale]);

  return (
    <>
      {/* Google Consent Mode v2 Default Configuration (Executed synchronously before any tags) */}
      <script
        id="google-consent-mode-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'granted',
              'functionality_storage': 'granted',
              'security_storage': 'granted'
            });
            window.dataLayer.push({
              'event': 'initial_consent_ready',
              'site_locale': '${locale}'
            });
          `,
        }}
      />
      {/* Google Analytics 4 Script (only when measurement ID is provided) */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (only when container ID is provided) */}
      {GTM_CONTAINER_ID && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
          `}
        </Script>
      )}

      {children}
    </>
  );
}

