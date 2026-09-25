import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLocalizedPath } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { TrustMetrics } from '@/components/trust/TrustMetrics';
import { MedicalReviewBadge } from '@/components/trust/MedicalReviewBadge';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { LeadForm } from '@/components/conversion/LeadForm';
import { SPECIALTIES } from '@/data/specialties';
import { HOSPITALS } from '@/data/hospitals';
import { DOCTORS } from '@/data/doctors';
import { PATIENT_STORIES } from '@/data/patient-stories';
import { COUNTRIES } from '@/data/countries';
import { TREATMENT_COSTS } from '@/data/costs';
import { FAQS } from '@/data/faqs';
import { getAllVideos, getAllMedia } from '@/lib/admin/content';
import { YouTubeVideoCard } from '@/components/trust/YouTubeVideoCard';
import { HomepageMediaGallery } from '@/components/trust/HomepageMediaGallery';
import {
  HeartHandshake,
  ShieldCheck,
  Building2,
  Stethoscope,
  Clock,
  FileCheck2,
  Plane,
  Languages,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Youtube,
  PlayCircle,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';

  return {
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const dict = getDictionary(currentLocale);
  const isArabic = currentLocale === 'ar';
  const [videos, mediaItems] = await Promise.all([
    getAllVideos(true),
    getAllMedia({ published: true, consentStatus: 'approved' }),
  ]);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-soft-blue/40 via-white to-brand-bg pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-brand-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft-teal border border-brand-teal/20 text-xs font-semibold text-brand-teal">
                <HeartHandshake className="w-4 h-4" />
                <span>
                  {isArabic
                    ? 'مرضى من آسيا الوسطى ورابطة الدول المستقلة والدول العربية'
                    : 'Patients from Central Asia, CIS & Arab Countries'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
                {isArabic
                  ? 'علاجك الطبي في الهند، بتوجيه شخصي موثوق'
                  : 'Your Medical Treatment in India, Personally Guided'}
              </h1>

              <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
                {isArabic
                  ? 'منذ عام 2017، تقدم بختيار للرعاية الصحية توجيهاً شخصياً موثوقاً للمرضى الدوليين وعائلاتهم لتنسيق العلاج في الهند عبر نخبة المستشفيات المعتمدة، والأطباء الاستشاريين، والدعم الميداني المتكامل.'
                  : 'Since 2017, Baxtiyor Healthcare has helped international patients and families coordinate medical treatment in India through selected hospitals, experienced specialists, and dedicated patient support.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
                  <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                    {dict.common.getFreeOpinion}
                  </Button>
                </Link>
                <WhatsAppCTA
                  locale={currentLocale}
                  size="lg"
                  fullWidth={false}
                  className="w-full sm:w-auto"
                />
              </div>

              {/* Trust Subtext */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-brand-text-secondary">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{isArabic ? 'تقييم مجاني خلال 24-48 ساعة' : 'Free Opinion within 24-48h'}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{isArabic ? 'مستشفيات معتمدة دولياً' : 'JCI & NABH Selected Facilities'}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{isArabic ? 'دعم كامل باللغة العربية' : 'Arabic & Russian Native Support'}</span>
                </span>
              </div>
            </div>

            {/* Right Col: Quick Intake Card */}
            <div className="lg:col-span-5">
              <LeadForm locale={currentLocale} compact />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Section */}
      <TrustMetrics locale={currentLocale} />

      {/* 3. Why Baxtiyor Healthcare */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'لماذا يختار المرضى بختيار للرعاية الصحية؟' : 'Why International Patients Choose Baxtiyor'}
          </h2>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'نحن لا نقدم وعوداً تجارية فارغة، بل نربط كل مريض بخبرة إكلينيكية حقيقية وشفافية كاملة منذ اليوم الأول.'
              : 'We provide honest, evidence-based medical coordination connecting every family to clinical expertise without exaggerated commercial claims.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'تنسيق ورعاية شخصية لكل مريض' : 'Personal Patient Coordination'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'منسق مخصص يرافقك شخصياً في الهند، من استقبال المطار وحتى جلسات الأطباء والترجمة ومتابعة الخروج.'
                : 'A dedicated coordinator assists your family in person in India, managing hospital logistics, medical appointments, language translation, and accommodation.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-teal text-brand-teal flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'خيارات متعددة من المستشفيات والاستشاريين' : 'Selected Hospital & Specialist Options'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'لا نوجهك لمستشفى واحد فقط؛ بل نقدم آراء مقارنة من كبار الجراحين في فورتيس، وأرتيميس، وسانار، ومارينغو.'
                : 'We are not tied to a single hospital. We present comparative treatment opinions from leading surgeons across Fortis FMRI, Artemis, Shalby Sanar, and Marengo Asia.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'أكثر من 10 سنوات خبرة دولية' : '10+ Years International Experience'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'تاريخ مثبت منذ 2017 في رعاية أكثر من 100 مريض دولي في جراحات زراعة الأعضاء، والقلب، والعظام، والأعصاب.'
                : 'Operational track record since ~2017 assisting 100+ international patients with complex organ transplants, heart surgeries, robotic orthopedics, and oncology.'}
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-teal text-brand-teal flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'معلومات وتكاليف شفافة بدون رسوم خفية' : 'Transparent Information & Direct Billing'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'خدمات التنسيق والرأي الطبي مجانية تماماً للمريض. تدفع تكاليف العلاج مباشرة لقسم حسابات المستشفى المعتمد.'
                : 'Our opinion and coordination assistance is completely free for patients. All hospital fees are settled directly with the official hospital billing desk.'}
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-blue text-brand-blue flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'دعم كامل وودود باللغة العربية' : 'Arabic-Friendly Patient Support'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'مترجمون عرب متخصصون يرافقونك في كل فحص، مع توفير خيارات طعام حلال وشقق قريبة مريحة للعائلات.'
                : 'Native Arabic translators accompany you to clinical tests, with arrangement of Halal dining, verified serviced apartments, and mosque proximities.'}
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-teal text-brand-teal flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">
              {isArabic ? 'دعم متكامل من التأشيرة حتى العودة' : 'End-to-End Travel & Visa Care'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'إصدار خطابات التأشيرة الطبية الرسمية، والاستقبال الخاص من مطار دلهي، وتمديد الإقامة، ومتابعة ما بعد السفر.'
                : 'Official hospital visa letters, private Delhi airport transfers, local SIM cards, currency exchange, FRRO visa extensions, and post-discharge continuity.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Medical Specialties */}
      <section className="bg-white py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
                {isArabic ? 'التخصصات الطبية الرئيسية' : 'Key Medical Specialties'}
              </h2>
              <p className="text-sm text-brand-text-secondary mt-1">
                {isArabic
                  ? 'مراكز تميز متطورة ومجهزة بأحدث التقنيات الجراحية والروبوتية'
                  : 'Specialized quaternary centers equipped with advanced robotic and surgical infrastructure'}
              </p>
            </div>
            <Link
              href={getLocalizedPath('/specialties', currentLocale)}
              className="text-sm font-bold text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
            >
              <span>{dict.common.viewAllTreatments}</span>
              <ChevronRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((specialty) => (
              <div
                key={specialty.id}
                className="bg-brand-bg/50 rounded-xl border border-brand-border p-6 flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-soft-blue text-brand-blue flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {specialty.name[currentLocale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                    {specialty.shortDescription[currentLocale]}
                  </p>
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-brand-text mb-1.5">
                      {isArabic ? 'أبرز الإجراءات:' : 'Key Procedures:'}
                    </div>
                    <ul className="text-xs text-brand-text-secondary space-y-1">
                      {specialty.keyProcedures[currentLocale].slice(0, 3).map((proc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-brand-teal" />
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-brand-border flex items-center justify-between">
                  <Link
                    href={getLocalizedPath(`/specialties/${specialty.slug}`, currentLocale)}
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isArabic ? 'تفاصيل التخصص' : 'View Specialty'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </Link>
                  <WhatsAppCTA
                    locale={currentLocale}
                    treatmentName={specialty.name[currentLocale]}
                    size="sm"
                    label={isArabic ? 'استشارة سريعة' : 'Inquire'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Selected Partner Hospitals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'مستشفيات رائدة معتمدة في دلهي وجورجاون' : 'Selected Hospitals in Delhi NCR'}
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'مستشفيات حاصلة على اعتمادات JCI وNABH الدولية مع أجنحة متكاملة مخصصة للمرضى الدوليين.'
              : 'JCI & NABH accredited quaternary facilities with dedicated international patient wings.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOSPITALS.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy">
                      {hospital.name[currentLocale]}
                    </h3>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">
                      {hospital.location[currentLocale]}
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-brand-soft-blue text-brand-blue font-semibold shrink-0">
                    {hospital.bedsCount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {hospital.overview[currentLocale]}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-brand-text">
                    {isArabic ? 'الخدمات الدولية للمرضى:' : 'International Services:'}
                  </div>
                  <ul className="space-y-1 text-brand-text-secondary">
                    {hospital.internationalPatientServices[currentLocale].slice(0, 3).map((srv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-brand-bg rounded-lg text-xs text-brand-text-secondary border border-brand-border/60">
                  <span className="font-medium text-brand-navy">
                    {isArabic ? 'الاعتماد والتنسيق: ' : 'Accreditation Note: '}
                  </span>
                  {hospital.accreditationNote[currentLocale]}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between">
                <Link
                  href={getLocalizedPath(`/hospitals/${hospital.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'عرض ملف المستشفى' : 'View Facility Profile'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
                  <Button variant="outline" size="sm">
                    {dict.common.getFreeOpinion}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Indicative Treatment Cost Overview */}
      <section className="bg-white py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
              {isArabic ? 'تكاليف تقريبية لأهم الإجراءات الجراحية في الهند' : 'Indicative Treatment Costs in India'}
            </h2>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              {isArabic
                ? 'أسعار استرشادية واضحة تشمل الإقامة الجراحية والفحوصات، وتوفر 60-80% مقارنة بالمستشفيات الغربية.'
                : 'Transparent indicative ranges for major procedures, providing up to 60-80% savings compared to Western hospitals.'}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-brand-border shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-brand-navy text-white text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">{isArabic ? 'الإجراء الجراحي' : 'Procedure'}</th>
                  <th className="py-3.5 px-4">{isArabic ? 'التكلفة الاسترشادية' : 'Indicative Range (USD)'}</th>
                  <th className="py-3.5 px-4">{isArabic ? 'مدة التنويم' : 'Hospital Stay'}</th>
                  <th className="py-3.5 px-4">{isArabic ? 'فترة المتابعة' : 'Recovery Stay'}</th>
                  <th className="py-3.5 px-4 text-center">{isArabic ? 'طلب تسعير' : 'Inquire'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white">
                {TREATMENT_COSTS.map((c) => (
                  <tr key={c.treatmentSlug} className="hover:bg-brand-soft-blue/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-brand-navy">
                      <Link
                        href={getLocalizedPath(`/treatments/${c.treatmentSlug}`, currentLocale)}
                        className="hover:text-brand-blue hover:underline"
                      >
                        {c.procedureName[currentLocale]}
                      </Link>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-brand-blue">
                      {c.indicativeRangeUSD}
                    </td>
                    <td className="py-4 px-4 text-brand-text-secondary">{c.hospitalStayDays}</td>
                    <td className="py-4 px-4 text-brand-text-secondary">{c.recoveryDays}</td>
                    <td className="py-4 px-4 text-center">
                      <WhatsAppCTA
                        locale={currentLocale}
                        treatmentName={c.procedureName[currentLocale]}
                        size="sm"
                        label={isArabic ? 'احسب تكاليفي' : 'Get Quote'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-brand-text-secondary">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-teal shrink-0" />
              <span>{dict.common.lastReviewed}: 2026-09-21</span>
            </div>
            <Link
              href={getLocalizedPath('/treatment-cost', currentLocale)}
              className="text-brand-blue font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>{isArabic ? 'عرض تفاصيل كافة التكاليف والمقارنات' : 'View Full Cost Breakdown Directory'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Real Patient Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
              {isArabic ? 'تجارب واقعية لمرضانا الدوليين' : 'Real International Patient Stories'}
            </h2>
            <p className="text-sm text-brand-text-secondary mt-1">
              {isArabic
                ? 'حالات موثقة بموافقة المرضى توضح الجداول الزمنية والنتائج الإكلينيكية الحقيقية.'
                : 'Documented patient journeys with verified timelines, genuine feedback, and patient consent.'}
            </p>
          </div>
          <Link
            href={getLocalizedPath('/patient-stories', currentLocale)}
            className="text-sm font-bold text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
          >
            <span>{isArabic ? 'عرض جميع القصص' : 'View All Stories'}</span>
            <ChevronRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PATIENT_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-brand-soft-teal text-brand-teal font-bold">
                    {story.patientCountry[currentLocale]}
                  </span>
                  <span className="text-gray-400 font-medium">Verified Case</span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy">
                  {story.patientName}
                </h3>

                <p className="text-xs font-semibold text-brand-blue">
                  {story.condition[currentLocale]}
                </p>

                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-4">
                  {story.storySummary[currentLocale]}
                </p>

                <blockquote className="p-3 bg-brand-bg rounded-lg text-xs italic text-brand-navy border-s-4 border-brand-teal">
                  {story.quote[currentLocale]}
                </blockquote>

                <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                  <span className="font-semibold">{isArabic ? 'النتيجة الطبية: ' : 'Clinical Outcome: '}</span>
                  {story.outcomeNote[currentLocale]}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border">
                <Link
                  href={getLocalizedPath(`/patient-stories/${story.slug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'قراءة تفاصيل القصة والجدول الزمني' : 'Read Journey Timeline'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Real Patient Journeys Media Gallery */}
      <HomepageMediaGallery items={mediaItems} locale={currentLocale} />

      {/* 9. Official YouTube Channel Showcase */}
      <section className="bg-slate-50 py-16 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold mb-2">
                <Youtube className="w-4 h-4 text-red-600 fill-current" />
                <span>@baxtiyorindiya</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
                {isArabic ? 'شاهد بالفيديو: جولات المستشفيات والمقابلات الطبية' : 'Watch on YouTube: Hospital Tours & Doctor Discussions'}
              </h2>
              <p className="text-sm text-brand-text-secondary mt-1">
                {isArabic
                  ? 'جولات ميدانية في معهد فورتيس، أرتيميس، وشالبي سانار، مع شروحات طبية دقيقة وإجراءات الاستقبال.'
                  : 'Authentic hospital walk-throughs, transplant protocols, and international patient assistance in Delhi NCR.'}
              </p>
            </div>

            <a
              href="https://youtube.com/@baxtiyorindiya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>{isArabic ? 'اشترك في القناة الرسمية' : 'Subscribe to @baxtiyorindiya'}</span>
            </a>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {videos.slice(0, 3).map((vid) => (
                <YouTubeVideoCard
                  key={vid.id}
                  videoId={vid.youtubeVideoId}
                  title={isArabic && vid.titleAr ? vid.titleAr : vid.title}
                  description={isArabic && vid.descriptionAr ? vid.descriptionAr : vid.description}
                  category={vid.category}
                  thumbnailUrl={vid.thumbnailUrl}
                  locale={currentLocale}
                  uploadDate={vid.createdAt ? vid.createdAt.split('T')[0] : '2024-03-01'}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Youtube className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">
                {isArabic ? 'قناة بختيار للرعاية الصحية في الهند' : 'Baxtiyor Healthcare Official YouTube Channel'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {isArabic
                  ? 'تابع شروحات تفصيلية عن جراحات الركبة والقلب وزراعة الكلى، وجولات واقعية داخل غرف المرضى وصالات الاستقبال في دلهي وجورجاون.'
                  : 'Watch video guides on organ transplants, robotic surgeries, hospital walkthroughs, and airport reception procedures on our verified channel.'}
              </p>
              <div className="pt-2">
                <a
                  href="https://youtube.com/@baxtiyorindiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{isArabic ? 'فتح القناة على يوتيوب' : 'Explore Videos on YouTube'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. Country Pathways */}
      <section className="bg-brand-bg py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
              {isArabic ? 'مسارات الرعاية المخصصة حسب دولة الإقامة' : 'Tailored Care by Country of Residence'}
            </h2>
            <p className="text-sm text-brand-text-secondary">
              {isArabic
                ? 'توجيهات مخصصة بخصوص التأشيرات، والرحلات الجوية المباشرة، والمترجمين للمرضى من دول الخليج وآسيا الوسطى.'
                : 'Dedicated visa guidance, flight transit advice, and localized coordinators for Arab and Central Asian families.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COUNTRIES.map((c) => (
              <Link
                key={c.id}
                href={getLocalizedPath(`/countries/${c.slug}`, currentLocale)}
                className="bg-white p-5 rounded-xl border border-brand-border hover:border-brand-blue hover:shadow-md transition-all text-center group"
              >
                <div className="text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                  {c.countryName[currentLocale]}
                </div>
                <div className="text-xs text-brand-text-secondary mt-1">
                  {c.region === 'Arab' ? (isArabic ? 'الشرق الأوسط' : 'Middle East') : (isArabic ? 'آسيا الوسطى' : 'Central Asia / CIS')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'الأسئلة الشائعة حول العلاج في الهند' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-sm text-brand-text-secondary">
            {isArabic
              ? 'إجابات واضحة ومباشرة حول إجراءات السفر والتأشيرات الطبية والتنسيق.'
              : 'Direct answers to questions regarding visas, hospital procedures, and coordination fees.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 5).map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-brand-border p-5 sm:p-6 shadow-sm space-y-2"
            >
              <h3 className="text-base font-bold text-brand-navy flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span>{faq.question[currentLocale]}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed ps-7">
                {faq.answer[currentLocale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Final Conversion CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            {isArabic
              ? 'ابدأ رحلة علاجك بثقة وتوجيه شخصي مستمر'
              : 'Begin Your Medical Journey with Personal Specialist Guidance'}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? 'أرسل تقاريرك الطبية اليوم للحصول على تقييم مجاني وخيارات المستشفيات وعروض الأسعار خلال 24 إلى 48 ساعة.'
              : 'Submit your recent medical reports today for a free specialist review and transparent hospital options within 24-48 hours.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href={getLocalizedPath('/medical-opinion', currentLocale)}>
              <Button variant="primary" size="lg">
                {dict.common.getFreeOpinion}
              </Button>
            </Link>
            <WhatsAppCTA
              locale={currentLocale}
              size="lg"
              label={dict.common.chatCoordinator}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

