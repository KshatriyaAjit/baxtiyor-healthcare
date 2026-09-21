import React from 'react';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Award, Users, ShieldCheck, Building2 } from 'lucide-react';

export interface TrustMetricsProps {
  locale: Locale;
}

export function TrustMetrics({ locale }: TrustMetricsProps) {
  const dict = getDictionary(locale);

  const metrics = [
    {
      icon: Award,
      value: dict.trust.yearsExperience.value,
      label: dict.trust.yearsExperience.label,
      subtext: dict.trust.yearsExperience.subtext,
    },
    {
      icon: Users,
      value: dict.trust.patientsAssisted.value,
      label: dict.trust.patientsAssisted.label,
      subtext: dict.trust.patientsAssisted.subtext,
    },
    {
      icon: ShieldCheck,
      value: dict.trust.mediaAssets.value,
      label: dict.trust.mediaAssets.label,
      subtext: dict.trust.mediaAssets.subtext,
    },
    {
      icon: Building2,
      value: dict.trust.hospitalRelationships.value,
      label: dict.trust.hospitalRelationships.label,
      subtext: dict.trust.hospitalRelationships.subtext,
    },
  ];

  return (
    <div className="bg-white border-y border-brand-border py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((m, index) => {
            const Icon = m.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-brand-bg/50 border border-brand-border/60"
              >
                <div className="w-12 h-12 rounded-full bg-brand-soft-blue flex items-center justify-center text-brand-blue mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight mb-1">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-brand-text mb-1">
                  {m.label}
                </div>
                <div className="text-xs text-brand-text-secondary leading-relaxed">
                  {m.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

