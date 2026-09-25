'use client';

import React, { useState } from 'react';
import { Play, Youtube, Globe, Clock } from 'lucide-react';
import { Locale } from '@/types';
import { trackEvent } from '@/lib/analytics/tracker';
import { createVideoObjectSchema, JsonLd } from '@/components/seo/JsonLd';

export interface YouTubeVideoCardProps {
  videoId: string;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  locale?: Locale;
  uploadDate?: string;
}

export function YouTubeVideoCard({
  videoId,
  title,
  description = 'Medical treatment journey and patient coordination in Delhi NCR, India.',
  category,
  thumbnailUrl,
  locale = 'en',
  uploadDate = '2024-03-01',
}: YouTubeVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isArabic = locale === 'ar';

  const poster = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent('youtube_play', {
      locale,
      language: locale,
      content_id: videoId,
      content_type: 'youtube_video',
    });
  };

  const videoSchema = createVideoObjectSchema({
    name: title,
    description: description || title,
    thumbnailUrl: poster,
    uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl,
  });

  return (
    <>
      <JsonLd data={videoSchema} />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border/80 dark:border-slate-800 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col group transition-all">
        {/* Video / Thumbnail Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              onClick={handlePlay}
              className="w-full h-full cursor-pointer relative flex items-center justify-center group/thumb"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlay();
                }
              }}
              aria-label={isArabic ? `تشغيل فيديو: ${title}` : `Play video: ${title}`}
            >
              <img
                src={poster}
                alt={title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors" />

              {/* Big Play Button */}
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/90 group-hover/thumb:bg-red-600 text-white flex items-center justify-center shadow-xl group-hover/thumb:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </div>

              {/* Official YouTube Channel Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                <Youtube className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span>@baxtiyorindiya</span>
              </div>

              {category && (
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider">
                    {category}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {title}
            </h4>
            {description && (
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold">
              <span>{isArabic ? 'قناة بختيار الرسمية' : 'Official YouTube Channel'}</span>
            </span>
            <button
              onClick={handlePlay}
              className="text-xs font-bold text-brand-primary hover:text-brand-navy dark:text-teal-400 flex items-center gap-1 transition-colors"
            >
              <span>{isArabic ? 'مشاهدة' : 'Watch Now'}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

