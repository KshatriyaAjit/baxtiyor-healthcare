import React from 'react';
import { Locale } from '@/types';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface MedicalReviewBadgeProps {
  locale: Locale;
  lastReviewedDate: string;
  sourceCount?: number;
}

export function MedicalReviewBadge({
  locale,
  lastReviewedDate,
  sourceCount = 2,
}: MedicalReviewBadgeProps) {
  const isArabic = locale === 'ar';

  return (
    <div className="flex flex-wrap items-center gap-3 py-2 px-3 bg-brand-soft-teal/50 rounded-lg border border-brand-teal/20 text-xs text-brand-navy">
      <div className="flex items-center gap-1.5 font-semibold text-brand-teal">
        <CheckCircle2 className="w-4 h-4" />
        <span>
          {isArabic ? 'محتوى مراجع طبياً ومنسق إكلينيكياً' : 'Clinically Reviewed Coordination Content'}
        </span>
      </div>
      <span className="text-gray-300">|</span>
      <div className="text-brand-text-secondary">
        <span>{isArabic ? 'آخر مراجعة:' : 'Last Reviewed:'} </span>
        <span className="font-medium text-brand-text">{lastReviewedDate}</span>
      </div>
      {sourceCount > 0 && (
        <>
          <span className="text-gray-300">|</span>
          <div className="text-brand-text-secondary">
            <span>{isArabic ? `${sourceCount} مراجع طبية موثقة` : `${sourceCount} Clinical Guidelines Cited`}</span>
          </div>
        </>
      )}
    </div>
  );
}

