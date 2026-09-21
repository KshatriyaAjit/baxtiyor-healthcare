import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Patient Medical Data Privacy Policy | Baxtiyor Healthcare',
  description:
    'Comprehensive privacy policy governing sensitive international patient health information, secure diagnostic report handling, and zero data leakage standards.',
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : 'en';
  const isArabic = currentLocale === 'ar';

  const breadcrumbs = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: `/${currentLocale}` },
    { name: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy', url: `/${currentLocale}/privacy-policy` },
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={currentLocale} />

        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isArabic ? 'حماية البيانات الطبية الحساسة' : 'Medical Data Protection Standard'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              {isArabic ? 'سياسة الخصوصية وحماية بيانات المرضى' : 'Patient Health Data & Privacy Policy'}
            </h1>
            <p className="text-xs text-brand-text-secondary">
              {isArabic ? 'آخر تحديث: 21 سبتمبر 2026' : 'Last Updated: September 21, 2026'}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-brand-text-secondary leading-relaxed border-t border-brand-border pt-6">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-brand-navy flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-teal" />
                <span>{isArabic ? '1. الالتزام بحماية السجلات الصحية' : '1. Commitment to Health Data Confidentiality'}</span>
              </h2>
              <p>
                {isArabic
                  ? 'تدرك بختيار للرعاية الصحية حساسية التقارير الطبية والتشخيصية التي يشاركها المرضى وعائلاتهم. نحن نلتزم بأعلى معايير الأمان لحماية بياناتك الشخصية والصحية، ولا نشاركها إلا مع اللجان الطبية المعالجة في المستشفيات المعتمدة الشريكة لغرض دراسة الحالة وتنسيق العلاج فقط.'
                  : 'Baxtiyor Healthcare recognizes that medical summaries, imaging scans, and diagnostic lab reports represent sensitive personal health information. We are committed to rigorous administrative, technical, and physical safeguards. Your records are accessed strictly by licensed clinician boards at accredited partner hospitals for clinical evaluation and coordination.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-brand-navy flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-brand-teal" />
                <span>{isArabic ? '2. مبدأ عدم تسريب البيانات للإعلانات والتحليلات' : '2. Zero-Leak Analytics Principle'}</span>
              </h2>
              <p>
                {isArabic
                  ? 'نحن نطبق سياسة حظر كاملة لتمرير أي تفاصيل مرضية أو أسماء ملفات أو تشخيصات إلى أدوات التسويق أو الإعلانات أو تحليلات الويب (مثل Google Analytics). تتلقى أدوات التحليلات مؤشرات تشغيلية مجهولة الهوية فقط.'
                  : 'We enforce a strict Zero-Leak policy. No patient names, phone numbers, uploaded diagnostic documents, or clinical details are ever transmitted to third-party marketing tags, advertising pixels, or public web analytics engines.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-brand-navy flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-teal" />
                <span>{isArabic ? '3. مدة الاحتفاظ بالملفات وحق الحذف' : '3. Data Retention & Patient Deletion Requests'}</span>
              </h2>
              <p>
                {isArabic
                  ? 'يتم تخزين الملفات الطبية المرفوعة على خوادم آمنة ومعزولة عن الشبكة العامة. يحق لأي مريض أو ولي أمره في أي وقت طلب الحذف الفوري والنهائي لجميع مستنداته وسجلاته من أنظمتنا عبر مراسلتنا على care@baxtiyorhealthcare.com.'
                  : 'Diagnostic files uploaded via our platform are stored on isolated servers outside the public web root. Patients and families retain the full right to request immediate and permanent deletion of all submitted medical records at any time by contacting privacy@baxtiyorhealthcare.com.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

