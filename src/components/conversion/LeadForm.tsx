'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/Button';
import { SPECIALTIES } from '@/data/specialties';
import { COUNTRIES } from '@/data/countries';
import { Upload, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import {
  trackLeadSubmission,
  trackLeadFormStart,
  trackLeadFormError,
  trackReportUploadStart,
  trackReportUploadComplete,
  trackReportUploadError,
} from '@/lib/analytics/tracker';

export interface LeadFormProps {
  locale: Locale;
  prefilledTreatment?: string;
  prefilledCountry?: string;
  compact?: boolean;
}

export function LeadForm({
  locale,
  prefilledTreatment = '',
  prefilledCountry = '',
  compact = false,
}: LeadFormProps) {
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    country: prefilledCountry,
    treatment: prefilledTreatment,
    relationship: 'self',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  const handleFieldInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackLeadFormStart(
        locale,
        typeof window !== 'undefined' ? window.location.pathname : ''
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldInteraction();
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // Validate file size (max 15MB per file)
      const invalidFile = selectedFiles.find((f) => f.size > 15 * 1024 * 1024);
      if (invalidFile) {
        setErrorMessage(
          isArabic
            ? 'حجم أحد الملفات يتجاوز 15 ميجابايت. يرجى اختيار ملف أصغر حجماً.'
            : 'File size exceeds 15MB. Please upload a smaller document.'
        );
        trackReportUploadError(locale, 'file_size_exceeded');
        return;
      }
      setErrorMessage('');
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5));
      trackReportUploadStart(locale, selectedFiles.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setErrorMessage(
        isArabic
          ? 'يرجى إدخال اسم المريض ورقم الواتساب للتواصل.'
          : 'Please provide patient name and WhatsApp number.'
      );
      trackLeadFormError(locale, 'validation_missing_contact');
      return;
    }

    setSubmitting(true);

    try {
      // First upload files if any
      let uploadedFileCount = 0;
      if (files.length > 0) {
        const uploadFormData = new FormData();
        files.forEach((file) => {
          uploadFormData.append('files', file);
        });
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedFileCount = uploadData.count || files.length;
          trackReportUploadComplete(locale, uploadedFileCount);
        } else {
          trackReportUploadError(locale, 'upload_failed');
        }
      }

      // Then submit lead
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language: locale,
          landing_page: typeof window !== 'undefined' ? window.location.href : '',
          report_uploaded: files.length > 0,
          uploaded_file_count: uploadedFileCount,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      const resData = await res.json();
      trackLeadSubmission({
        locale,
        treatment: formData.treatment,
        country: formData.country,
        hasReports: files.length > 0,
        fileCount: uploadedFileCount,
        score: resData.score || (files.length > 0 ? 'HIGH' : 'MEDIUM'),
      });

      setSuccess(true);
    } catch (err) {
      trackLeadFormError(locale, 'server_error');
      setErrorMessage(
        isArabic
          ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة ثانية أو التواصل مباشرة عبر واتساب.'
          : 'An error occurred. Please try again or chat with our coordinator on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900">
          {dict.form.successTitle}
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
          {dict.form.successMessage}
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-colors"
          >
            <span>{dict.common.chatCoordinator}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl border border-brand-border shadow-md ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      <div className="mb-6 space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
          {dict.form.title}
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-secondary">
          {dict.form.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Patient Name */}
        <div>
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.patientName} *
          </label>
          <input
            type="text"
            required
            placeholder={isArabic ? 'مثال: أحمد محمد' : 'e.g., Alex Carter'}
            value={formData.name}
            onFocus={handleFieldInteraction}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.whatsappNumber} *
          </label>
          <input
            type="tel"
            required
            placeholder={isArabic ? '+968 9123 4567' : '+968 9123 4567'}
            value={formData.whatsapp}
            onFocus={handleFieldInteraction}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm"
            dir="ltr"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.country}
          </label>
          <select
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm bg-white"
          >
            <option value="">
              {isArabic ? '-- اختر بلد الإقامة --' : '-- Select Country --'}
            </option>
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.countryName[locale]}>
                {c.countryName[locale]}
              </option>
            ))}
          </select>
        </div>

        {/* Medical Treatment Interest */}
        <div>
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.treatmentInterest}
          </label>
          <select
            value={formData.treatment}
            onChange={(e) =>
              setFormData({ ...formData, treatment: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm bg-white"
          >
            <option value="">
              {isArabic ? '-- حدد التخصص أو الإجراء --' : '-- Select Procedure --'}
            </option>
            {SPECIALTIES.map((s) => (
              <option key={s.id} value={s.name[locale]}>
                {s.name[locale]}
              </option>
            ))}
          </select>
        </div>

        {/* Relationship */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.relationship}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {Object.entries(dict.form.relationshipOptions).map(([key, label]) => (
              <label
                key={key}
                className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-colors text-center ${
                  formData.relationship === key
                    ? 'border-brand-blue bg-brand-soft-blue text-brand-blue font-semibold'
                    : 'border-brand-border text-brand-text hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="relationship"
                  value={key}
                  checked={formData.relationship === key}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Report Upload Dropzone */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-brand-text mb-1">
            {dict.form.uploadLabel}
          </label>
          <div className="border-2 border-dashed border-brand-border hover:border-brand-blue/50 rounded-xl p-4 sm:p-5 text-center transition-colors bg-brand-bg/40">
            <input
              type="file"
              id="report-file-input"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="report-file-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
            >
              <Upload className="w-6 h-6 text-brand-blue mb-1" />
              <span className="text-xs sm:text-sm font-semibold text-brand-blue">
                {isArabic ? 'اضغط لرفع التقارير أو اسحب الملفات هنا' : 'Click to upload reports or drag & drop'}
              </span>
              <span className="text-[11px] text-brand-text-secondary">
                {dict.form.uploadHelp}
              </span>
            </label>

            {files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {files.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-brand-border text-xs text-brand-navy"
                  >
                    <span>{file.name}</span>
                    <span className="text-gray-400">
                      ({Math.round(file.size / 1024)} KB)
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 flex items-center gap-2 text-[11px] text-brand-text-secondary">
        <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
        <span>{dict.common.privacyAssurance}</span>
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={submitting}
        >
          {submitting ? dict.form.submitting : dict.form.submitButton}
        </Button>
      </div>
    </form>
  );
}

