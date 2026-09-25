'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Search,
  CheckCircle,
  Clock,
  ShieldAlert,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  X,
  Globe,
  Youtube,
  User,
} from 'lucide-react';
import { AdminTestimonial, ConsentStatus } from '@/types/content';

const CONSENT_STATUSES: { value: ConsentStatus; label: string; color: string }[] = [
  { value: 'approved', label: 'Approved for Web', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { value: 'approved_social', label: 'Approved Web + Social', color: 'text-teal-300 bg-teal-500/10 border-teal-500/30' },
  { value: 'pending', label: 'Consent Pending', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { value: 'restricted', label: 'Restricted / Private', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('Uzbekistan');
  const [language, setLanguage] = useState<'all' | 'en' | 'ar'>('all');
  const [treatment, setTreatment] = useState('Kidney Transplant');
  const [quote, setQuote] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('approved');
  const [published, setPublished] = useState(true);
  const [formError, setFormError] = useState('');

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setDisplayName('');
    setCountry('Uzbekistan');
    setLanguage('all');
    setTreatment('Kidney Transplant');
    setQuote('');
    setPhotoUrl('');
    setYoutubeVideoId('');
    setConsentStatus('approved');
    setPublished(true);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (t: AdminTestimonial) => {
    setEditingId(t.id);
    setDisplayName(t.displayName || t.patientName || '');
    setCountry(t.country);
    setLanguage((t.language as 'all' | 'en' | 'ar') || 'all');
    setTreatment(t.treatment || t.treatmentName || '');
    setQuote(t.quote);
    setPhotoUrl(t.photoUrl || '');
    setYoutubeVideoId(t.youtubeVideoId || '');
    setConsentStatus(t.consentStatus);
    setPublished(t.published);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !quote) {
      setFormError('Display Name and Quote are required.');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const res = await fetch('/api/admin/content/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId || undefined,
          displayName,
          country,
          language,
          treatment,
          quote,
          photoUrl,
          youtubeVideoId,
          consentStatus,
          published,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save testimonial.');
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving testimonial.';
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/content/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  const filtered = testimonials.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (t.displayName || t.patientName || '').toLowerCase().includes(q) ||
      (t.country || '').toLowerCase().includes(q) ||
      (t.treatment || t.treatmentName || '').toLowerCase().includes(q) ||
      (t.quote || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-teal-400" />
            Testimonials & Quotes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Genuine consented patient words. Strict compliance: zero fabricated ratings or invented reviews.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search testimonials by patient, country, or treatment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        <button onClick={fetchTestimonials} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-sm">Loading testimonials...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <MessageSquareQuote className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No testimonials recorded</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Only approved testimonials with patient consent appear on the live website. Add real patient quotes here.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Testimonial</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => {
            const consentMeta = CONSENT_STATUSES.find((c) => c.value === item.consentStatus);
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold">
                        {(item.displayName || item.patientName || 'P')[0] || 'P'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.displayName || item.patientName || 'Anonymous Patient'}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span>{item.country}</span>
                          <span>&bull;</span>
                          <span className="text-teal-300">{item.treatment || item.treatmentName || 'Care Journey'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.published ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Live
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  <blockquote className="p-3 bg-slate-950 border-l-2 border-teal-500/60 rounded-r-lg text-xs italic text-slate-300 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                      consentMeta?.color || 'text-slate-400 bg-slate-800'
                    }`}
                  >
                    {consentMeta?.label || item.consentStatus}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 hover:bg-slate-800 text-teal-400 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-rose-500/10 text-rose-400 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-teal-400" />
                {editingId ? 'Edit Testimonial' : 'New Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Patient Display Name *
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Salim M. (Muscat) or Patient Anonymized"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Oman, Uzbekistan, UAE"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Treatment
                  </label>
                  <input
                    type="text"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="e.g. Heart Bypass Surgery"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Authentic Patient Quote *
                </label>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="&quot;The doctors explained every detail of the procedure in simple terms. Personal attention made all the difference...&quot;"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 italic"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Consent Status
                </label>
                <select
                  value={consentStatus}
                  onChange={(e) => setConsentStatus(e.target.value as ConsentStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                >
                  {CONSENT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="testPub"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-teal-500 focus:ring-teal-500"
                />
                <label htmlFor="testPub" className="text-xs text-slate-300">
                  Publish publicly on website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

