'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Plus,
  ExternalLink,
  Save,
  Trash2,
  RefreshCw,
  Check,
  Globe,
  Youtube,
  Send,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { AdminSocialLink } from '@/types/content';

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  youtube: Youtube,
  telegram: Send,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  other: Globe,
};

export default function SocialLinksAdminPage() {
  const [links, setLinks] = useState<AdminSocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/social');
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links || []);
      }
    } catch (err) {
      console.error('Failed to load social links:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleToggle = (id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  const handleUpdateField = (id: string, field: keyof AdminSocialLink, value: any) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleAddLink = () => {
    const newId = `social-${Date.now()}`;
    const newLink: AdminSocialLink = {
      id: newId,
      platform: 'other',
      name: 'New Channel',
      url: 'https://',
      handle: '',
      enabled: true,
      order: links.length + 1,
      updatedAt: new Date().toISOString(),
    };
    setLinks([...links, newLink]);
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/content/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links }),
      });

      if (!res.ok) {
        throw new Error('Failed to update social channels.');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving social links.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-teal-400" />
            Social Media Channels
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure official verified social profiles displayed in the website footer and patient contact cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Channel</span>
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : savedSuccess ? (
              <Check className="w-3.5 h-3.5 text-slate-950" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{savedSuccess ? 'Saved!' : 'Save Channels'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-sm">Loading channels...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => {
            const Icon = PLATFORM_ICONS[link.platform] || Globe;
            return (
              <div
                key={link.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      link.enabled ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                    <select
                      value={link.platform}
                      onChange={(e) =>
                        handleUpdateField(link.id, 'platform', e.target.value as AdminSocialLink['platform'])
                      }
                      className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="telegram">Telegram</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="other">Other Link</option>
                    </select>

                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => handleUpdateField(link.id, 'name', e.target.value)}
                      placeholder="Display Name"
                      className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    />

                    <input
                      type="text"
                      value={link.handle}
                      onChange={(e) => handleUpdateField(link.id, 'handle', e.target.value)}
                      placeholder="Handle e.g. @baxtiyorindiya"
                      className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateField(link.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full md:w-64 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />

                  {link.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title="Test URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={() => handleToggle(link.id)}
                      className="rounded bg-slate-950 border-slate-800 text-teal-500 focus:ring-teal-500"
                    />
                    <span className={link.enabled ? 'text-teal-400 font-semibold' : 'text-slate-500'}>
                      {link.enabled ? 'Active' : 'Off'}
                    </span>
                  </label>

                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 hover:bg-rose-500/10 text-rose-400 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

