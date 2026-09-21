import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getLocalizedPath, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { TREATMENT_COSTS } from '@/data/costs';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Button } from '@/components/ui/Button';
import { DollarSign, Clock, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Medical Treatment Costs in India (2026 Indicative Rates) | Baxtiyor Healthcare',
  description:
    'Compare indicative treatment costs in India for heart surgery, kidney transplant, liver transplant, hip replacement, and knee replacement. Transparent package inclusions.',
};

export default async function TreatmentCostIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const dict = getDictionary(currentLocale);
  const isArabic = currentLocale === 'ar';

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    {
      name: isArabic ? 'تكاليف العلاج' : 'Treatment Costs',
      url: `/${currentLocale}/treatment-cost`,
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {isArabic ? 'دليل تكاليف العلاج في الهند (أسعار استرشادية)' : 'Treatment Cost Directory in India (Indicative Rates)'}
          </h1>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {isArabic
              ? 'مقارنة شاملة لأسعار العمليات الجراحية الكبرى في أفضل مستشفيات دلهي وجورجاون، مع توضيح ما تشمله وتستبعده كل باقة علاجية بكل شفافية.'
              : 'Transparent, procedure-by-procedure cost ranges at top accredited quaternary hospitals in Delhi NCR, detailing what is included and excluded.'}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-brand-navy text-white text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">{isArabic ? 'الإجراء الجراحي' : 'Procedure'}</th>
                  <th className="py-4 px-4">{isArabic ? 'التكلفة الاسترشادية' : 'Indicative Range (USD)'}</th>
                  <th className="py-4 px-4">{isArabic ? 'مدة التنويم' : 'Hospital Stay'}</th>
                  <th className="py-4 px-4">{isArabic ? 'فترة المتابعة' : 'Recovery Stay'}</th>
                  <th className="py-4 px-6 text-center">{isArabic ? 'حساب التكلفة' : 'Get Estimate'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white">
                {TREATMENT_COSTS.map((c) => (
                  <tr key={c.treatmentSlug} className="hover:bg-brand-soft-blue/20 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-navy">
                      <Link
                        href={getLocalizedPath(`/treatment-cost/${c.treatmentSlug}`, currentLocale)}
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
                    <td className="py-4 px-6 text-center">
                      <Link href={getLocalizedPath(`/treatment-cost/${c.treatmentSlug}`, currentLocale)}>
                        <Button variant="outline" size="sm">
                          {isArabic ? 'التفاصيل' : 'Breakdown'}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TREATMENT_COSTS.map((c) => (
            <div key={c.treatmentSlug} className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-brand-navy">
                  <Link href={getLocalizedPath(`/treatment-cost/${c.treatmentSlug}`, currentLocale)} className="hover:text-brand-blue hover:underline">
                    {c.procedureName[currentLocale]}
                  </Link>
                </h2>
                <span className="text-sm font-black text-brand-teal shrink-0">
                  {c.indicativeRangeUSD}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-emerald-800">{isArabic ? 'ما تشمله الباقة عادة:' : 'Typical Inclusions:'}</div>
                <ul className="space-y-1 text-emerald-950">
                  {c.inclusions[currentLocale].slice(0, 3).map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <Link
                  href={getLocalizedPath(`/treatment-cost/${c.treatmentSlug}`, currentLocale)}
                  className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? 'عرض تفصيل السعر الكامل' : 'View In-Depth Cost Guide'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <WhatsAppCTA locale={currentLocale} treatmentName={c.procedureName[currentLocale]} size="sm" label={isArabic ? 'تسعير' : 'Inquire'} />
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isArabic
              ? 'تنويه التكاليف: التكاليف المعروضة هي أسعار استرشادية مأخوذة من باقات المستشفيات الرسمية. التكلفة النهائية الدقيقة تتحدد حصرياً بعد فحص تقارير المريض التشخيصية وموافقة اللجنة الطبية المعالجة.'
              : 'Cost Disclaimer: All rates shown are indicative averages from hospital standard packages. The final customized quotation is issued exclusively following direct review of your diagnostics by the hospital clinical team.'}
          </p>
        </div>
      </div>
    </div>
  );
}

