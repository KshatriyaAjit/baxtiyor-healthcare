'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { MediaItem } from '@/types/content';
import { getLocalizedPath } from '@/lib/i18n/config';
import {
  Camera,
  ShieldCheck,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Maximize2,
  MapPin,
  Stethoscope,
} from 'lucide-react';

interface HomepageMediaGalleryProps {
  items: MediaItem[];
  locale: Locale;
}

export function HomepageMediaGallery({ items, locale }: HomepageMediaGalleryProps) {
  const isArabic = locale === 'ar';
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);

  // Filter only published items that have approved consent for public display
  const displayItems = items.filter(
    (item) =>
      item.published &&
      (item.consentStatus === 'approved' || item.consentStatus === 'approved_social')
  );

  return (
    <section className="bg-white py-16 lg:py-20 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isArabic
                  ? 'صور ميدانية حقيقية بموافقة موثقة للمرضى'
                  : 'Authentic On-Ground Journey Photos • 100% Consented'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
              {isArabic ? 'معرض رحلات ورعاية مرضانا الدوليين' : 'Real Patient Journeys Media Gallery'}
            </h2>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'لقطات واقعية من استقبال المطار، وجلسات الفحص والاستشارات الجراحية في مستشفيات فورتيس وأرتيميس وسانار في دلهي وجورجاون.'
                : 'Direct photographic records of airport receptions, hospital consultations, and postoperative follow-ups across FMRI, Artemis, and Sanar.'}
            </p>
          </div>

          <Link
            href={getLocalizedPath('/patient-stories', locale)}
            className="text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy inline-flex items-center gap-1 shrink-0"
          >
            <span>{isArabic ? 'عرض جميع القصص والنتائج' : 'View Full Patient Stories'}</span>
            <ChevronRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Gallery Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative bg-brand-bg rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-blue/50 transition-all cursor-pointer flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={photo.downloadUrl}
                    alt={photo.altText || photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    {photo.country ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md shadow-sm">
                        <MapPin className="w-3 h-3 text-brand-teal shrink-0" />
                        <span>{photo.country}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isArabic ? 'موثقة' : 'Verified'}</span>
                    </span>
                  </div>

                  {/* Hover Expand Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="p-2.5 rounded-full bg-white/90 text-brand-navy shadow-lg backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <div>
                    {photo.treatment && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-teal mb-1">
                        <Stethoscope className="w-3 h-3" />
                        <span>{photo.treatment}</span>
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-brand-navy line-clamp-1 group-hover:text-brand-blue transition-colors">
                      {photo.title}
                    </h3>
                    {photo.caption && (
                      <p className="text-xs text-brand-text-secondary line-clamp-2 mt-1 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-text-secondary">
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isArabic ? 'مرافقة ميدانية شخصية' : 'Personal Hospital Assistance'}</span>
                    </span>
                    <span className="text-[11px] text-brand-blue font-bold group-hover:underline">
                      {isArabic ? 'تكبير' : 'View'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-bg rounded-2xl border border-brand-border p-8 text-center space-y-4 max-w-xl mx-auto">
            <Camera className="w-12 h-12 text-brand-blue/50 mx-auto" />
            <h3 className="text-base font-bold text-brand-navy">
              {isArabic ? 'توثيق ميداني برضا المريض' : 'Verified On-Ground Documentation'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'يلتزم فريق بختيار للرعاية الصحية بأعلى معايير الخصوصية الطبية. يتم نشر صور الرحلات فقط بعد موافقة خطية صريحة من المريض وعائلته.'
                : 'Baxtiyor Healthcare adheres strictly to international healthcare privacy standards. On-ground journey photos are displayed solely with explicit written patient consent.'}
            </p>
            <Link
              href={getLocalizedPath('/patient-stories', locale)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-all shadow-sm"
            >
              <span>{isArabic ? 'تصفح سجلات وتجارب المرضى' : 'Browse Patient Timelines'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.downloadUrl}
                alt={selectedPhoto.altText || selectedPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {selectedPhoto.country && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-soft-blue text-brand-blue">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedPhoto.country}</span>
                    </span>
                  )}
                  {selectedPhoto.treatment && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-soft-teal text-brand-teal">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>{selectedPhoto.treatment}</span>
                    </span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isArabic ? 'موافقة قانونية موثقة' : 'Verified Consent'}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-brand-navy">{selectedPhoto.title}</h3>
              {selectedPhoto.caption && (
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              )}

              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-text-secondary">
                  Baxtiyor Healthcare International Coordination
                </span>
                <Link
                  href={getLocalizedPath('/medical-opinion', locale)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline"
                >
                  <span>{isArabic ? 'طلب استشارة طبية' : 'Consult Coordinator'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

