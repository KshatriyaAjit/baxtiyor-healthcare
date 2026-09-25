'use client';

import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
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
  FileText,
  Globe,
  Youtube,
} from 'lucide-react';
import { AdminPatientStory, ConsentStatus } from '@/types/content';

const CONSENT_STATUSES: { value: ConsentStatus; label: string; color: string }[] = [
  { value: 'approved', label: 'Approved for Web', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { value: 'approved_social', label: 'Approved Web + Social', color: 'text-teal-300 bg-teal-500/10 border-teal-500/30' },
  { value: 'pending', label: 'Consent Pending', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { value: 'restricted', label: 'Restricted / Private', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export default function PatientStoriesAdminPage() {
  const [stories, setStories] = useState<AdminPatientStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [previewStory, setPreviewStory] = useState<AdminPatientStory | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Fields
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('Uzbekistan');
  const [language, setLanguage] = useState<'all' | 'en' | 'ar'>('all');
  const [treatment, setTreatment] = useState('Kidney Transplant');
  const [hospitalName, setHospitalName] = useState('Shalby Sanar International');
  const [summary, setSummary] = useState('');
  const [storyText, setStoryText] = useState('');
  const [quote, setQuote] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('approved');
  const [published, setPublished] = useState(true);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/patient-stories');
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || []);
      }
    } catch (err) {
      console.error('Failed to load patient stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDisplayName('');
    setCountry('Uzbekistan');
    setLanguage('all');
    setTreatment('Kidney Transplant');
    setHospitalName('Shalby Sanar International');
    setSummary('');
    setStoryText('');
    setQuote('');
    setCoverImageUrl('');
    setYoutubeVideoId('');
    setConsentStatus('approved');
    setPublished(true);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (story: AdminPatientStory) => {
    setEditingId(story.id);
    setTitle(story.title || story.displayName || story.patientName || '');
    setSlug(story.slug);
    setDisplayName(story.displayName || story.patientName || '');
    setCountry(story.country);
    setLanguage((story.language as 'all' | 'en' | 'ar') || 'all');
    setTreatment(story.treatment || story.treatmentName || '');
    setHospitalName(story.hospitalName || '');
    setSummary(story.summary || '');
    setStoryText(story.story || story.summary || '');
    setQuote(story.quote || '');
    setCoverImageUrl(story.coverImageUrl || '');
    setYoutubeVideoId(story.youtubeVideoId || '');
    setConsentStatus(story.consentStatus);
    setPublished(story.published);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !displayName || !storyText) {
      setFormError('Title, Display Name, and Story content are required.');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const payload = {
        id: editingId || undefined,
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        displayName,
        country,
        language,
        treatment,
        hospitalName,
        summary,
        story: storyText,
        quote,
        coverImageUrl,
        youtubeVideoId,
        consentStatus,
        published,
      };

      const res = await fetch('/api/admin/content/patient-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save story.');
      }

      setModalOpen(false);
      fetchStories();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving story.';
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this patient story?')) return;
    try {
      const res = await fetch(`/api/admin/content/patient-stories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete story:', err);
    }
  };

  const filteredStories = stories.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (s.title || '').toLowerCase().includes(q) ||
      (s.displayName || s.patientName || '').toLowerCase().includes(q) ||
      (s.country || '').toLowerCase().includes(q) ||
      (s.treatment || s.treatmentName || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-teal-400" />
            Patient Stories
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage authenticated international patient journeys. Enforce strict privacy and consent controls.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient Story</span>
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, patient, country, or treatment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 w-full sm:w-auto justify-between sm:justify-end">
          <span>{filteredStories.length} story/stories</span>
          <button onClick={fetchStories} className="flex items-center gap-1 hover:text-white">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stories Table / Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-sm">Loading patient journeys...</p>
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No patient stories yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Create consented patient stories documenting cross-border coordination from Uzbekistan, Oman, Saudi Arabia, or Kazakhstan.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Story</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStories.map((story) => {
            const consentMeta = CONSENT_STATUSES.find((c) => c.value === story.consentStatus);
            return (
              <div
                key={story.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-white line-clamp-1">{story.title}</span>
                    {story.published ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Live Public
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        Draft
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                        consentMeta?.color || 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      {consentMeta?.label || story.consentStatus}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">{story.displayName}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-teal-400" />
                      {story.country}
                    </span>
                    <span>&bull;</span>
                    <span className="text-teal-300 font-medium">{story.treatment}</span>
                    {story.youtubeVideoId && (
                      <>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-red-400">
                          <Youtube className="w-3.5 h-3.5" />
                          <span>Video Linked</span>
                        </span>
                      </>
                    )}
                  </div>

                  {story.quote && (
                    <p className="text-xs text-slate-400 italic line-clamp-1">&ldquo;{story.quote}&rdquo;</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                  <button
                    onClick={() => setPreviewStory(story)}
                    className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1"
                    title="Preview Story"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                  <button
                    onClick={() => openEditModal(story)}
                    className="p-2 hover:bg-slate-800 text-teal-400 hover:text-teal-300 rounded-lg transition-colors text-xs flex items-center gap-1"
                    title="Edit Story"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="p-2 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 rounded-lg transition-colors text-xs"
                    title="Delete Story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-teal-400" />
                {editingId ? 'Edit Patient Story' : 'New Patient Story'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  {formError}
                </div>
              )}

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Story Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Kidney Transplant Journey: Tashkent to Gurgaon"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. kidney-transplant-tashkent-gurgaon"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Display Name, Country, Treatment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Name (Anonymized) *
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Patient Shokhrukh or Patient S."
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Country *
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Uzbekistan, Oman, Kazakhstan"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Medical Procedure *
                  </label>
                  <input
                    type="text"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="e.g. Living Donor Kidney Transplant"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Hospital & Media / YouTube ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Partner Hospital
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="e.g. Shalby Sanar International, Fortis FMRI"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Video ID or Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={youtubeVideoId}
                    onChange={(e) => setYoutubeVideoId(e.target.value)}
                    placeholder="e.g. dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Patient Quote */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Patient Quote (Authentic Words)
                </label>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="&quot;The Uzbek-speaking coordinator was with us every single day...&quot;"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 italic"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Journey Summary
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief 2-line summary of the patient's arrival, treatment, and recovery..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Full Story */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Journey Narrative *
                </label>
                <textarea
                  rows={5}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Detailed narrative describing the coordination process, hospital admission, surgery, and discharge..."
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Consent & Publishing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Consent Status
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

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="storyPublished"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="storyPublished" className="text-xs text-slate-300 font-medium">
                    Publish publicly on website
                  </label>
                </div>
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
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving ? 'Saving...' : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Story Preview Modal */}
      {previewStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-teal-400 font-mono uppercase tracking-wider">
                Public Story Preview
              </span>
              <button onClick={() => setPreviewStory(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">{previewStory.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-white font-semibold">{previewStory.displayName}</span>
                <span>&bull;</span>
                <span>{previewStory.country}</span>
                <span>&bull;</span>
                <span className="text-teal-400">{previewStory.treatment}</span>
              </div>
              {previewStory.quote && (
                <blockquote className="p-3 bg-slate-950 border-l-2 border-teal-500 text-xs italic text-slate-300">
                  &ldquo;{previewStory.quote}&rdquo;
                </blockquote>
              )}
              <p className="text-xs text-slate-300 leading-relaxed">{previewStory.story}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewStory(null)}
                className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

