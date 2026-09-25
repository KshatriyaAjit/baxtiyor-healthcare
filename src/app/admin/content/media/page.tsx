'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ShieldAlert,
  Trash2,
  Edit,
  Copy,
  Check,
  RefreshCw,
  X,
  FileImage,
  Globe,
} from 'lucide-react';
import { MediaItem, MediaCategory, ConsentStatus } from '@/types/content';

const CATEGORIES: { value: MediaCategory; label: string }[] = [
  { value: 'team', label: 'Team & Staff' },
  { value: 'patient-stories', label: 'Patient Stories' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'hospitals', label: 'Partner Hospitals' },
  { value: 'doctors', label: 'Specialist Doctors' },
  { value: 'office', label: 'Office & Facilities' },
  { value: 'brand', label: 'Brand & Logos' },
  { value: 'other', label: 'Other Media' },
];

const CONSENT_STATUSES: { value: ConsentStatus; label: string; color: string }[] = [
  { value: 'approved', label: 'Approved for Web', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { value: 'approved_social', label: 'Approved Web + Social', color: 'text-teal-300 bg-teal-500/10 border-teal-500/30' },
  { value: 'pending', label: 'Consent Pending', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { value: 'restricted', label: 'Restricted / Private', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [consentFilter, setConsentFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');
  
  // Upload modal state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>('team');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCountry, setUploadCountry] = useState('');
  const [uploadTreatment, setUploadTreatment] = useState('');
  const [uploadFeatured, setUploadFeatured] = useState(false);
  const [uploadConsent, setUploadConsent] = useState<ConsentStatus>('approved');
  const [uploadLanguage, setUploadLanguage] = useState<'all' | 'en' | 'ar'>('all');
  const [uploadPublished, setUploadPublished] = useState(true);
  const [uploadError, setUploadError] = useState('');

  // Edit modal state
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Copied URL state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (consentFilter !== 'all') params.set('consentStatus', consentFilter);
      if (publishedFilter !== 'all') params.set('published', publishedFilter);

      const res = await fetch(`/api/admin/content/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [categoryFilter, consentFilter, publishedFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
      if (!uploadTitle) {
        setUploadTitle(e.target.files[0].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image file.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('files', file));
      formData.set('category', uploadCategory);
      formData.set('title', uploadTitle);
      formData.set('altText', uploadAlt || uploadTitle);
      formData.set('caption', uploadCaption);
      formData.set('country', uploadCountry);
      formData.set('treatment', uploadTreatment);
      formData.set('featured', uploadFeatured ? 'true' : 'false');
      formData.set('consentStatus', uploadConsent);
      formData.set('language', uploadLanguage);
      formData.set('published', uploadPublished ? 'true' : 'false');

      const res = await fetch('/api/admin/content/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Upload failed.');
      }

      setUploadOpen(false);
      setSelectedFiles([]);
      setUploadTitle('');
      setUploadAlt('');
      setUploadCaption('');
      setUploadCountry('');
      setUploadTreatment('');
      setUploadFeatured(false);
      fetchMedia();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading file.';
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/content/media/${editingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingItem.title,
          altText: editingItem.altText,
          caption: editingItem.caption,
          category: editingItem.category,
          country: editingItem.country,
          treatment: editingItem.treatment,
          featured: editingItem.featured,
          consentStatus: editingItem.consentStatus,
          published: editingItem.published,
          language: editingItem.language,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        fetchMedia();
      }
    } catch (err) {
      console.error('Failed to update media:', err);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/content/media/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-teal-400" />
            Media Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage authenticated website photographs, team photos, and patient story media. Stored in Firebase Storage.
          </p>
        </div>

        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search title or alt text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </form>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Consent Status Filter */}
          <select
            value={consentFilter}
            onChange={(e) => setConsentFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Consent Statuses</option>
            {CONSENT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Published Filter */}
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Statuses</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <span>Found {mediaList.length} media file(s)</span>
          <button
            onClick={fetchMedia}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-sm">Loading media items...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <FileImage className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No media found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {search || categoryFilter !== 'all' || consentFilter !== 'all'
              ? 'No media files matched your active filters. Try clearing your search.'
              : 'Upload official team photos, hospital facility images, or consented patient story photographs.'}
          </p>
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-semibold"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload First Image</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((item) => {
            const consentMeta = CONSENT_STATUSES.find((c) => c.value === item.consentStatus);
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-slate-700 transition-all shadow-sm"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
                  <img
                    src={item.downloadUrl}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    {item.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
                        ★ Featured
                      </span>
                    )}
                    {item.published ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/90 text-white shadow-sm">
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700 shadow-sm">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 text-slate-300 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5" title={item.altText}>
                      Alt: {item.altText || 'No alt text'}
                    </p>
                    {(item.country || item.treatment) && (
                      <p className="text-[10px] text-teal-400 font-medium mt-1">
                        {[item.country, item.treatment].filter(Boolean).join(' • ')}
                      </p>
                    )}
                  </div>

                  {/* Consent Badge */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                        consentMeta?.color || 'text-slate-400 bg-slate-800 border-slate-700'
                      }`}
                    >
                      {consentMeta?.label || item.consentStatus}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {(item.fileSize / 1024).toFixed(0)} KB
                    </span>
                  </div>

                  {/* Action Toolbar */}
                  <div className="pt-2 flex items-center justify-between text-slate-400 border-t border-slate-800/60">
                    <button
                      onClick={() => copyUrl(item.id, item.downloadUrl)}
                      className="p-1 hover:text-teal-400 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1 hover:text-white transition-colors"
                        title="Edit Metadata"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:text-rose-400 transition-colors"
                        title="Delete Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-teal-400" />
                Upload Real Media
              </h3>
              <button
                onClick={() => setUploadOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {uploadError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  {uploadError}
                </div>
              )}

              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Image File(s)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-teal-500 bg-slate-950 p-6 rounded-xl text-center cursor-pointer transition-colors"
                >
                  <FileImage className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected: ${selectedFiles.map((f) => f.name).join(', ')}`
                      : 'Click or drag real team / clinic photos here'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supports JPG, PNG, WebP, AVIF up to 10MB per file
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as MediaCategory)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title & Alt Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Baxtiyor Clinical Coordinator Team"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Alt Text (SEO & Accessibility)
                  </label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    placeholder="Descriptive text for screen readers"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="e.g. Meeting with patient family at Fortis Gurgaon"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Country & Treatment */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country (Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadCountry}
                    onChange={(e) => setUploadCountry(e.target.value)}
                    placeholder="e.g. Uzbekistan, Oman"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Treatment (Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadTreatment}
                    onChange={(e) => setUploadTreatment(e.target.value)}
                    placeholder="e.g. Kidney Transplant"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Patient Consent Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Consent Status (Mandatory for Patient-Related Photos)
                </label>
                <select
                  value={uploadConsent}
                  onChange={(e) => setUploadConsent(e.target.value as ConsentStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  {CONSENT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Photos showing patients will ONLY be displayed publicly if marked Approved.
                </p>
              </div>

              {/* Language, Published & Featured Checkbox */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="publishedCheck"
                      checked={uploadPublished}
                      onChange={(e) => setUploadPublished(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-teal-500 focus:ring-teal-500"
                    />
                    <label htmlFor="publishedCheck" className="text-xs text-slate-300">
                      Publish immediately
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredCheck"
                      checked={uploadFeatured}
                      onChange={(e) => setUploadFeatured(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                    />
                    <label htmlFor="featuredCheck" className="text-xs text-amber-400 font-semibold">
                      Feature on Homepage
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400">Language:</label>
                  <select
                    value={uploadLanguage}
                    onChange={(e) => setUploadLanguage(e.target.value as 'all' | 'en' | 'ar')}
                    className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300"
                  >
                    <option value="all">All Languages</option>
                    <option value="en">English Only</option>
                    <option value="ar">Arabic Only</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || selectedFiles.length === 0}
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit className="w-4 h-4 text-teal-400" />
                Edit Media Metadata
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editingItem.altText}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Country & Treatment */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.country || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })}
                    placeholder="e.g. Uzbekistan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Treatment (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.treatment || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, treatment: e.target.value })}
                    placeholder="e.g. Robotic Surgery"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MediaCategory })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Consent Status
                  </label>
                  <select
                    value={editingItem.consentStatus}
                    onChange={(e) => setEditingItem({ ...editingItem, consentStatus: e.target.value as ConsentStatus })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    {CONSENT_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editPublished"
                    checked={editingItem.published}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="editPublished" className="text-xs text-slate-300">
                    Published on website
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editFeatured"
                    checked={Boolean(editingItem.featured)}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="editFeatured" className="text-xs text-amber-400 font-semibold">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

