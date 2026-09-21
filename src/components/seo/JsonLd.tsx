import React from 'react';

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function createOrganizationSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Baxtiyor Healthcare',
    alternateName: 'بختيار للرعاية الصحية',
    url: 'https://baxtiyorhealthcare.com',
    logo: 'https://baxtiyorhealthcare.com/images/branding/logo.png',
    description:
      locale === 'ar'
        ? 'منصة متخصصة في تنسيق الرعاية الطبية في الهند للمرضى الدوليين من الشرق الأوسط وآسيا الوسطى ورابطة الدول المستقلة.'
        : 'Personalized medical treatment coordination in India for international patients from Central Asia, CIS, and Arab countries.',
    foundingDate: '2017',
    telephone: '+919999999999',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919999999999',
      contactType: 'international patient service',
      availableLanguage: ['English', 'Arabic', 'Russian', 'Uzbek', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Delhi NCR',
      addressCountry: 'IN',
    },
  };
}

export function createHospitalSchema(hospital: {
  name: string;
  location: string;
  city: string;
  country: string;
  overview: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: hospital.name,
    description: hospital.overview,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hospital.location,
      addressLocality: hospital.city,
      addressCountry: hospital.country,
    },
  };
}

export function createPhysicianSchema(doctor: {
  name: string;
  designation: string;
  hospitalName: string;
  procedures: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    jobTitle: doctor.designation,
    hospitalAffiliation: {
      '@type': 'Hospital',
      name: doctor.hospitalName,
    },
    medicalSpecialty: doctor.procedures,
  };
}

export function createProcedureSchema(treatment: {
  name: string;
  overview: string;
  costUSD?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.name,
    description: treatment.overview,
    ...(treatment.costUSD && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        description: treatment.costUSD,
      },
    }),
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
  };
}

