import React from 'react';
import { Locale } from '@/types';
import { COORDINATORS } from '@/data/coordinators';
import { ShieldCheck, Languages, MapPin, Award, MessageCircle } from 'lucide-react';

interface TeamSectionProps {
  locale: Locale;
  showHeader?: boolean;
}

export function TeamSection({ locale, showHeader = true }: TeamSectionProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="space-y-8">
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft-teal border border-brand-teal/20 text-xs font-semibold text-brand-teal">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isArabic ? 'فريق رعاية المرضى الدوليين' : 'Dedicated International Patient Coordinators'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            {isArabic
              ? 'خبراء التنسيق الطبي الميداني في دلهي'
              : 'On-Ground Care Navigators In Delhi NCR'}
          </h2>
          <p className="text-sm sm:text-base text-brand-secondary">
            {isArabic
              ? 'فريق متمرس من المنسقين والمترجمين الطبيين الذين يرافقون المريض من أول استشارة وحتى التعافي والعودة سالماً.'
              : 'Experienced coordinators and language interpreters dedicated to walking with you through every step—from initial medical opinion to arrival, hospital consultations, and safe return home.'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COORDINATORS.map((coordinator) => {
          const name = isArabic ? coordinator.name.ar : coordinator.name.en;
          const role = isArabic ? coordinator.role.ar : coordinator.role.en;
          const location = isArabic ? coordinator.location.ar : coordinator.location.en;
          const specialization = isArabic ? coordinator.specialization.ar : coordinator.specialization.en;

          return (
            <div
              key={coordinator.id}
              className="bg-white rounded-2xl border border-brand-border/80 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-primary to-brand-teal text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                    {coordinator.name.en.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base group-hover:text-brand-primary transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs font-medium text-brand-teal leading-tight">{role}</p>
                  </div>
                </div>

                {/* Experience & Location */}
                <div className="space-y-1.5 text-xs text-brand-secondary pt-2 border-t border-brand-border/50">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                    <span>{coordinator.experienceYears} {isArabic ? 'خبرة عملية' : 'Experience'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-secondary flex-shrink-0" />
                    <span className="line-clamp-1">{location}</span>
                  </div>
                </div>

                {/* Languages Spoken */}
                <div className="pt-2">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-navy mb-1.5">
                    <Languages className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{isArabic ? 'اللغات المتقنة:' : 'Languages Spoken:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {coordinator.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded-md bg-brand-soft-blue text-brand-primary text-[11px] font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scope of Support */}
                <p className="text-xs text-brand-secondary leading-relaxed bg-brand-bg p-2.5 rounded-xl border border-brand-border/60">
                  {specialization}
                </p>
              </div>

              {/* Direct Desk Connection */}
              <div className="pt-3 border-t border-brand-border/60">
                <a
                  href={`https://wa.me/${coordinator.whatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    isArabic
                      ? `مرحباً، أود التواصل مع المنسق ${name} بخصوص خطة علاج في الهند.`
                      : `Hello, I would like to connect with coordinator ${coordinator.name.en} regarding medical treatment in India.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{isArabic ? 'تواصل عبر واتساب' : 'Connect via WhatsApp'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

