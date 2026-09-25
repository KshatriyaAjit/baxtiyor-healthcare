'use client';

import React, { useState, useEffect } from 'react';
import {
  Youtube,
  Plus,
  Search,
  ExternalLink,
  Play,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  X,
  Check,
  Video,
  Star,
} from 'lucide-react';
import { AdminVideo, VideoCategory } from '@/types/content';

const CATEGORIES: { value: VideoCategory; label: string }[] = [
  { value: 'patient-story', label: 'Patient Story' },
  { value: 'hospital-tour', label: 'Hospital Facility Tour' },
  { value: 'doctor-interview', label: 'Doctor Interview' },
  { value: 'process-guide', label: 'Patient Process Guide' },
  { value: 'general', label: 'General Healthcare' },
];

export default function YouTubeVideosAdminPage() {
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<AdminVideo | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Fields
  const [editingId, setEditingId] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VideoCategory>('patient-story');
  const [language, setLanguage] = useState<'all' | 'en' | 'ar'>('all');
  const [relatedTreatment, setRelatedTreatment] = useState('');
  const [relatedHospital, setRelatedHospital] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  // Extracted preview ID
  const [extractedId, setExtractedId] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/videos');
      if (res.ok) {
        const data = await res.json();
        setVideos(data.videos || []);
      }
    } catch (err) {
      console.error('Failed to load videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUrlChange = (val: string) => {
    setYoutubeUrl(val);
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    let matchedId = null;
    for (const p of patterns) {
      const m = val.trim().match(p);
      if (m && m[1]) {
        matchedId = m[1];
        break;
      }
    }
    setExtractedId(matchedId);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setYoutubeUrl('');
    setTitle('');
    setDescription('');
    setCategory('patient-story');
    setLanguage('all');
    setRelatedTreatment('');
    setRelatedHospital('');
    setFeatured(false);
    setPublished(true);
    setExtractedId(null);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (v: AdminVideo) => {
    setEditingId(v.id);
    setYoutubeUrl(v.youtubeUrl);
    setTitle(v.title);
    setDescription(v.description);
    setCategory(v.category as VideoCategory);
    setLanguage((v.language as 'all' | 'en' | 'ar') || 'all');
    setRelatedTreatment(v.relatedTreatment || '');
    setRelatedHospital(v.relatedHospital || '');
    setFeatured(Boolean(v.featured));
    setPublished(v.published);
    setExtractedId(v.youtubeVideoId);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl) {
      setFormError('Video Title and YouTube URL are required.');
      return;
    }
    if (!extractedId) {
      setFormError('Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const res = await fetch('/api/admin/content/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId || undefined,
          youtubeUrl,
          title,
          description,
          category,
          language,
          relatedTreatment,
          relatedHospital,
          featured,
          published,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save video.');
      }

      setModalOpen(false);
      fetchVideos();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving video.';
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this video?')) return;
    try {
      const res = await fetch(`/api/admin/content/videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete video:', err);
    }
  };

  const filtered = videos.filter((v) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      (v.relatedTreatment && v.relatedTreatment.toLowerCase().includes(q)) ||
      (v.relatedHospital && v.relatedHospital.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Youtube className="w-6 h-6 text-red-500" />
            YouTube Video Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Curate videos from the official{' '}
            <a
              href="https://youtube.com/@baxtiyorindiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline inline-flex items-center gap-1"
            >
              Baxtiyor Indiya Channel <ExternalLink className="w-3 h-3" />
            </a>
            . Lazy-loaded to protect site performance.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add YouTube Video</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search videos by title, treatment, or hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <button onClick={fetchVideos} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-2" />
          <p className="text-sm">Loading curated videos...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Video className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No YouTube videos added yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Add official patient interview videos or hospital walkthroughs from https://youtube.com/@baxtiyorindiya.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 rounded-xl text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Video</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-slate-700 transition-all shadow-sm"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setPreviewVideo(video)}
                className="relative aspect-video bg-black cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {video.featured && (
                    <span className="p-1 rounded bg-amber-500/90 text-slate-950 font-bold" title="Featured Video">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                  {video.published ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/90 text-white">
                      Live
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Draft
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black/70 text-slate-200 backdrop-blur-sm">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-2" title={video.title}>
                    {video.title}
                  </h4>
                  {video.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">{video.description}</p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>ID: {video.youtubeVideoId}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewVideo(video)}
                      className="p-1.5 hover:bg-slate-800 text-slate-300 rounded"
                      title="Play Preview"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(video)}
                      className="p-1.5 hover:bg-slate-800 text-teal-400 rounded"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-1.5 hover:bg-rose-500/10 text-rose-400 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                {editingId ? 'Edit YouTube Video' : 'Add Official YouTube Video'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  {formError}
                </div>
              )}

              {/* YouTube URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Video Link *
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500 font-mono text-xs"
                />
                {extractedId && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-950 border border-slate-800 rounded-lg">
                    <img
                      src={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                      alt="Thumbnail preview"
                      className="w-16 h-10 object-cover rounded"
                    />
                    <div className="text-xs text-emerald-400 font-medium">
                      Valid YouTube ID: <span className="font-mono">{extractedId}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kidney Transplant Patient Interview & Experience in Delhi"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of the video content..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as VideoCategory)}
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
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'all' | 'en' | 'ar')}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="all">All Languages</option>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Related Treatment (Optional)
                  </label>
                  <input
                    type="text"
                    value={relatedTreatment}
                    onChange={(e) => setRelatedTreatment(e.target.value)}
                    placeholder="e.g. Kidney Transplant"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Related Hospital (Optional)
                  </label>
                  <input
                    type="text"
                    value={relatedHospital}
                    onChange={(e) => setRelatedHospital(e.target.value)}
                    placeholder="e.g. Fortis FMRI, Shalby Sanar"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featCheck"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="featCheck" className="text-xs text-slate-300">
                    Feature on Homepage
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pubCheck"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="pubCheck" className="text-xs text-slate-300">
                    Published
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
                  disabled={saving || !extractedId}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Playback Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate max-w-md">{previewVideo.title}</span>
              <button onClick={() => setPreviewVideo(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${previewVideo.youtubeVideoId}?autoplay=1&rel=0`}
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

