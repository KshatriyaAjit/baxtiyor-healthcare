'use client';

import React, { useState } from 'react';
import { Locale, PatientStory } from '@/types';
import { Play, X, ShieldCheck, CheckCircle2, FileText, Globe, Clock } from 'lucide-react';
import { createVideoObjectSchema, JsonLd } from '@/components/seo/JsonLd';

interface VideoTestimonialCardProps {
  story: PatientStory;
  locale: Locale;
}

export function VideoTestimonialCard({ story, locale }: VideoTestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isArabic = locale === 'ar';

  const title = isArabic
    ? `تجربة مريض: ${story.patientName} (${story.condition.ar})`
    : `Patient Experience: ${story.patientName} (${story.condition.en})`;

  const description = isArabic ? story.storySummary.ar : story.storySummary.en;
  const quote = isArabic ? story.quote.ar : story.quote.en;
  const country = isArabic ? story.patientCountry.ar : story.patientCountry.en;
  const condition = isArabic ? story.condition.ar : story.condition.en;

  const videoSchema = createVideoObjectSchema({
    name: title,
    description: description,
    thumbnailUrl: story.videoThumbnailUrl || 'https://baxtiyorhealthcare.com/images/branding/video-placeholder.jpg',
    uploadDate: story.uploadDate || '2024-01-15',
    duration: story.videoDuration || 'PT2M45S',
    contentUrl: story.mediaUrl || 'https://baxtiyorhealthcare.com/videos/patient-case.mp4',
    embedUrl: story.mediaUrl || 'https://baxtiyorhealthcare.com/videos/patient-case.mp4',
  });

  return (
    <>
      <JsonLd data={videoSchema} />

      <div className="bg-white rounded-2xl border border-brand-border/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group">
        {/* Thumbnail Container */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative aspect-video bg-gradient-to-tr from-brand-navy via-brand-blue to-brand-teal/80 cursor-pointer overflow-hidden flex items-center justify-center"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          aria-label={isArabic ? `تشغيل فيديو ${story.patientName}` : `Play video interview with ${story.patientName}`}
        >
          {/* Visual Video Poster Backdrop */}
          <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-brand-navy to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Big Play Button */}
          <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-brand-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>

          {/* Top Country & Duration Badges */}
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
              <Globe className="w-3.5 h-3.5 text-brand-teal" />
              {country}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-mono">
              <Clock className="w-3 h-3 text-slate-300" />
              {story.videoDuration ? story.videoDuration.replace('PT', '').replace('M', ':').replace('S', '') : '2:45'}
            </span>
          </div>

          {/* Bottom Overlay Title */}
          <div className="absolute bottom-3 inset-x-3 z-10">
            <span className="inline-block px-2.5 py-0.5 rounded bg-brand-primary text-white text-[11px] font-semibold uppercase tracking-wider mb-1">
              {condition}
            </span>
            <h4 className="text-white font-bold text-sm sm:text-base line-clamp-1">{story.patientName}</h4>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-brand-secondary italic line-clamp-2">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bottom Consent and Action */}
          <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isArabic ? 'موافقة وتوثيق معتمد' : 'Consented Case Story'}</span>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-semibold text-brand-primary hover:text-brand-navy flex items-center gap-1 transition-colors"
            >
              <span>{isArabic ? 'مشاهدة المقابلة' : 'Watch Case'}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Video Playback Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-brand-navy text-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label={isArabic ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {story.mediaUrl ? (
                <video
                  src={story.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={story.videoThumbnailUrl}
                >
                  {isArabic ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
                </video>
              ) : (
                /* Fallback preview player for media simulation */
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/30 border border-brand-teal/40 text-brand-teal flex items-center justify-center mx-auto">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                  <h4 className="text-white font-semibold text-base">{story.patientName} &mdash; {condition}</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    {quote}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isArabic
                      ? 'تم تسجيل هذه المقابلة بموافقة رسمية من المريض ومستشفى دلهي الشريك.'
                      : 'Recorded with patient consent during post-treatment follow-up in Gurgaon, Delhi NCR.'}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer / Transcript Notes */}
            <div className="p-4 bg-slate-900 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-brand-teal font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>{isArabic ? 'ملخص رحلة المريض' : 'Case History Summary'}</span>
              </div>
              <p className="leading-relaxed">
                {description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isArabic
                    ? 'تم التحقق من الوثائق وسجلات العلاج بواسطة فريق بختيار للرعاية الصحية.'
                    : 'Treatment history and documentation verified by Baxtiyor Healthcare Coordination Desk.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

