import { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/config';
import { SPECIALTIES } from '@/data/specialties';
import { TREATMENTS } from '@/data/treatments';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { COUNTRIES } from '@/data/countries';

const BASE_URL = 'https://baxtiyorhealthcare.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Core static pages
  const staticPaths = [
    '',
    '/medical-opinion',
    '/specialties',
    '/treatments',
    '/hospitals',
    '/doctors',
    '/treatment-cost',
    '/patient-stories',
    '/countries',
    '/why-baxtiyor',
    '/how-it-works',
    '/contact',
    '/privacy-policy',
  ];

  LOCALES.forEach((locale) => {
    staticPaths.forEach((path) => {
      routes.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });

    // Specialty pages
    SPECIALTIES.forEach((s) => {
      routes.push({
        url: `${BASE_URL}/${locale}/specialties/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Treatment pages
    TREATMENTS.forEach((t) => {
      routes.push({
        url: `${BASE_URL}/${locale}/treatments/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });

    // Hospital pages
    HOSPITALS.forEach((h) => {
      routes.push({
        url: `${BASE_URL}/${locale}/hospitals/${h.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Doctor pages
    DOCTORS.forEach((d) => {
      routes.push({
        url: `${BASE_URL}/${locale}/doctors/${d.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Patient story pages
    PATIENT_STORIES.forEach((story) => {
      routes.push({
        url: `${BASE_URL}/${locale}/patient-stories/${story.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Country pathway pages
    COUNTRIES.forEach((c) => {
      routes.push({
        url: `${BASE_URL}/${locale}/countries/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  return routes;
}

