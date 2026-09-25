import 'server-only';
import fs from 'fs';
import path from 'path';
import { getFirestoreDb, getStorageBucket } from '@/lib/firebase/admin';
import {
  MediaItem,
  MediaCategory,
  ConsentStatus,
  AdminPatientStory,
  AdminTestimonial,
  AdminVideo,
  VideoCategory,
  AdminSocialLink,
  ContentSummary,
} from '@/types/content';
import { SITE_CONTACT } from '@/lib/config/contact';
import { Locale } from '@/types';

// Local storage paths for resilient offline / development fallback
const STORAGE_ROOT = path.join(process.cwd(), 'storage');
const MEDIA_DIR = path.join(STORAGE_ROOT, 'media');
const MEDIA_META_FILE = path.join(STORAGE_ROOT, 'admin_media.json');
const STORIES_FILE = path.join(STORAGE_ROOT, 'admin_patient_stories.json');
const TESTIMONIALS_FILE = path.join(STORAGE_ROOT, 'admin_testimonials.json');
const VIDEOS_FILE = path.join(STORAGE_ROOT, 'admin_videos.json');
const SOCIAL_FILE = path.join(STORAGE_ROOT, 'admin_social_links.json');

function ensureDirectories() {
  if (!fs.existsSync(STORAGE_ROOT)) {
    fs.mkdirSync(STORAGE_ROOT, { recursive: true });
  }
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    ensureDirectories();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(`[Content Storage] Failed to read ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T) {
  try {
    ensureDirectories();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[Content Storage] Failed to write ${filePath}:`, err);
  }
}

// ==============================================================================
// 1. YOUTUBE HELPERS
// ==============================================================================

export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.trim().match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// ==============================================================================
// 2. MEDIA MANAGEMENT
// ==============================================================================

export async function uploadMediaFile(params: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  category: MediaCategory;
  title: string;
  altText: string;
  caption?: string;
  language?: 'all' | 'en' | 'ar';
  consentStatus?: ConsentStatus;
  published?: boolean;
  featured?: boolean;
  country?: string;
  treatment?: string;
  patientStoryId?: string;
}): Promise<MediaItem> {
  ensureDirectories();
  const id = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cleanExt = path.extname(params.filename).toLowerCase() || '.webp';
  const sanitizedName = `${id}${cleanExt}`;
  const storageRelPath = `media/${params.category}/${sanitizedName}`;

  let downloadUrl = `/api/media/${params.category}/${sanitizedName}`;

  // Try Firebase Storage first
  const bucket = getStorageBucket();
  if (bucket) {
    try {
      const file = bucket.file(storageRelPath);
      await file.save(params.buffer, {
        metadata: {
          contentType: params.mimeType,
          metadata: {
            title: params.title,
            category: params.category,
            uploadedAt: new Date().toISOString(),
          },
        },
      });
      // Set public read or get public URL
      await file.makePublic().catch(() => {});
      downloadUrl = `https://storage.googleapis.com/${bucket.name}/${storageRelPath}`;
    } catch (fbErr) {
      console.warn('[Firebase Storage] Upload failed, falling back to local media storage:', fbErr);
    }
  }

  // Also write to local storage as resilient mirror / local dev fallback
  const categoryDir = path.join(MEDIA_DIR, params.category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
  fs.writeFileSync(path.join(categoryDir, sanitizedName), params.buffer);

  const mediaItem: MediaItem = {
    id,
    type: 'image',
    storagePath: storageRelPath,
    downloadUrl,
    filename: sanitizedName,
    title: params.title,
    altText: params.altText,
    caption: params.caption || '',
    category: params.category,
    language: params.language || 'all',
    published: params.published !== undefined ? params.published : true,
    featured: params.featured || false,
    country: params.country || '',
    treatment: params.treatment || '',
    patientStoryId: params.patientStoryId || '',
    consentStatus: params.consentStatus || 'pending',
    fileSize: params.buffer.length,
    mimeType: params.mimeType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save metadata to Firestore or local JSON
  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('media').doc(id).set(mediaItem);
    } catch (err) {
      console.warn('[Firestore Media] set() failed, writing to fallback:', err);
      const items = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
      items.unshift(mediaItem);
      writeJsonFile(MEDIA_META_FILE, items);
      return mediaItem;
    }
  }

  // Keep local JSON in sync
  const items = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
  items.unshift(mediaItem);
  writeJsonFile(MEDIA_META_FILE, items);

  return mediaItem;
}

export async function getAllMedia(filters?: {
  category?: string;
  language?: string;
  consentStatus?: string;
  published?: boolean;
  featured?: boolean;
  search?: string;
}): Promise<MediaItem[]> {
  let list: MediaItem[] = [];
  const db = getFirestoreDb();

  if (db) {
    try {
      const snap = await db.collection('media').orderBy('createdAt', 'desc').get();
      list = snap.docs.map((doc) => doc.data() as MediaItem);
    } catch (err) {
      console.warn('[Firestore Media] get() failed, using fallback:', err);
      list = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
    }
  }

  // If Firestore returned no media, fallback to local JSON storage
  if (list.length === 0) {
    list = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
  } else {
    // Merge any local items that aren't already present
    const localItems = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
    for (const item of localItems) {
      if (!list.some((m) => m.id === item.id)) {
        list.push(item);
      }
    }
  }

  if (filters?.category && filters.category !== 'all') {
    list = list.filter((m) => m.category === filters.category);
  }
  if (filters?.language && filters.language !== 'all') {
    list = list.filter((m) => m.language === 'all' || m.language === filters.language);
  }
  if (filters?.consentStatus && filters.consentStatus !== 'all') {
    list = list.filter((m) => m.consentStatus === filters.consentStatus);
  }
  if (filters?.published !== undefined) {
    list = list.filter((m) => m.published === filters.published);
  }
  if (filters?.featured !== undefined) {
    list = list.filter((m) => Boolean(m.featured) === filters.featured);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.altText.toLowerCase().includes(q) ||
        (m.caption && m.caption.toLowerCase().includes(q)) ||
        (m.country && m.country.toLowerCase().includes(q)) ||
        (m.treatment && m.treatment.toLowerCase().includes(q))
    );
  }

  // Sort featured first, then newest first
  list.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return list;
}

export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | null> {
  const db = getFirestoreDb();
  const now = new Date().toISOString();
  const cleanedUpdates = { ...updates, updatedAt: now };

  if (db) {
    try {
      const docRef = db.collection('media').doc(id);
      await docRef.update(cleanedUpdates);
      const updated = await docRef.get();
      return updated.data() as MediaItem;
    } catch (err) {
      console.warn('[Firestore Media] update() failed, falling back:', err);
    }
  }

  const items = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
  const idx = items.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...cleanedUpdates };
  writeJsonFile(MEDIA_META_FILE, items);
  return items[idx];
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  let mediaToDelete: MediaItem | null = null;

  const items = readJsonFile<MediaItem[]>(MEDIA_META_FILE, []);
  const idx = items.findIndex((m) => m.id === id);
  if (idx !== -1) {
    mediaToDelete = items[idx];
    items.splice(idx, 1);
    writeJsonFile(MEDIA_META_FILE, items);
  }

  if (db) {
    try {
      const docRef = db.collection('media').doc(id);
      const snap = await docRef.get();
      if (snap.exists && !mediaToDelete) {
        mediaToDelete = snap.data() as MediaItem;
      }
      await docRef.delete();
    } catch (err) {
      console.warn('[Firestore Media] delete() failed:', err);
    }
  }

  if (mediaToDelete) {
    // Delete local file
    try {
      const localFile = path.join(MEDIA_DIR, mediaToDelete.category, mediaToDelete.filename);
      if (fs.existsSync(localFile)) {
        fs.unlinkSync(localFile);
      }
    } catch {}

    // Delete remote Firebase Storage file
    const bucket = getStorageBucket();
    if (bucket && mediaToDelete.storagePath) {
      try {
        await bucket.file(mediaToDelete.storagePath).delete({ ignoreNotFound: true });
      } catch {}
    }
  }

  return true;
}

// ==============================================================================
// 3. PATIENT STORIES MANAGEMENT
// ==============================================================================

export async function getAllPatientStories(onlyPublished = false): Promise<AdminPatientStory[]> {
  let list: AdminPatientStory[] = [];
  const db = getFirestoreDb();

  if (db) {
    try {
      const snap = await db.collection('patientStories').orderBy('createdAt', 'desc').get();
      list = snap.docs.map((d) => d.data() as AdminPatientStory);
    } catch {
      list = readJsonFile<AdminPatientStory[]>(STORIES_FILE, []);
    }
  }

  if (list.length === 0) {
    list = readJsonFile<AdminPatientStory[]>(STORIES_FILE, []);
  } else {
    const localStories = readJsonFile<AdminPatientStory[]>(STORIES_FILE, []);
    for (const s of localStories) {
      if (!list.some((existing) => existing.id === s.id || existing.slug === s.slug)) {
        list.push(s);
      }
    }
  }

  if (onlyPublished) {
    list = list.filter(
      (s) =>
        s.published &&
        (s.consentStatus === 'approved' || s.consentStatus === 'approved_social')
    );
  }
  return list;
}

export async function getPatientStoryById(idOrSlug: string): Promise<AdminPatientStory | null> {
  const stories = await getAllPatientStories(false);
  return stories.find((s) => s.id === idOrSlug || s.slug === idOrSlug) || null;
}

export async function savePatientStory(story: Omit<AdminPatientStory, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<AdminPatientStory> {
  const now = new Date().toISOString();
  const id = story.id || `story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  
  const record: AdminPatientStory = {
    ...story,
    id,
    createdAt: now,
    updatedAt: now,
  };

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('patientStories').doc(id).set(record);
    } catch (err) {
      console.warn('[Firestore Stories] set failed:', err);
    }
  }

  const list = readJsonFile<AdminPatientStory[]>(STORIES_FILE, []);
  const idx = list.findIndex((s) => s.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...record, createdAt: list[idx].createdAt };
  } else {
    list.unshift(record);
  }
  writeJsonFile(STORIES_FILE, list);

  return record;
}

export async function deletePatientStory(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('patientStories').doc(id).delete();
    } catch {}
  }
  const list = readJsonFile<AdminPatientStory[]>(STORIES_FILE, []);
  const updated = list.filter((s) => s.id !== id);
  writeJsonFile(STORIES_FILE, updated);
  return true;
}

// ==============================================================================
// 4. TESTIMONIALS MANAGEMENT
// ==============================================================================

export async function getAllTestimonials(onlyPublished = false): Promise<AdminTestimonial[]> {
  let list: AdminTestimonial[] = [];
  const db = getFirestoreDb();

  if (db) {
    try {
      const snap = await db.collection('testimonials').orderBy('createdAt', 'desc').get();
      list = snap.docs.map((d) => d.data() as AdminTestimonial);
    } catch {
      list = readJsonFile<AdminTestimonial[]>(TESTIMONIALS_FILE, []);
    }
  }

  if (list.length === 0) {
    list = readJsonFile<AdminTestimonial[]>(TESTIMONIALS_FILE, []);
  } else {
    const localTests = readJsonFile<AdminTestimonial[]>(TESTIMONIALS_FILE, []);
    for (const t of localTests) {
      if (!list.some((existing) => existing.id === t.id)) {
        list.push(t);
      }
    }
  }

  if (onlyPublished) {
    list = list.filter(
      (t) =>
        t.published &&
        (t.consentStatus === 'approved' || t.consentStatus === 'approved_social')
    );
  }
  return list;
}

export async function saveTestimonial(testimonial: Omit<AdminTestimonial, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<AdminTestimonial> {
  const now = new Date().toISOString();
  const id = testimonial.id || `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  
  const record: AdminTestimonial = {
    ...testimonial,
    id,
    createdAt: now,
    updatedAt: now,
  };

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('testimonials').doc(id).set(record);
    } catch {}
  }

  const list = readJsonFile<AdminTestimonial[]>(TESTIMONIALS_FILE, []);
  const idx = list.findIndex((t) => t.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...record, createdAt: list[idx].createdAt };
  } else {
    list.unshift(record);
  }
  writeJsonFile(TESTIMONIALS_FILE, list);

  return record;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('testimonials').doc(id).delete();
    } catch {}
  }
  const list = readJsonFile<AdminTestimonial[]>(TESTIMONIALS_FILE, []);
  const updated = list.filter((t) => t.id !== id);
  writeJsonFile(TESTIMONIALS_FILE, updated);
  return true;
}

// ==============================================================================
// 5. YOUTUBE VIDEO MANAGEMENT
// ==============================================================================

export async function getAllVideos(onlyPublished = false): Promise<AdminVideo[]> {
  let list: AdminVideo[] = [];
  const db = getFirestoreDb();

  if (db) {
    try {
      const snap = await db.collection('videos').orderBy('createdAt', 'desc').get();
      list = snap.docs.map((d) => d.data() as AdminVideo);
    } catch {
      list = readJsonFile<AdminVideo[]>(VIDEOS_FILE, []);
    }
  }

  if (list.length === 0) {
    list = readJsonFile<AdminVideo[]>(VIDEOS_FILE, []);
  } else {
    const localVideos = readJsonFile<AdminVideo[]>(VIDEOS_FILE, []);
    for (const v of localVideos) {
      if (!list.some((existing) => existing.id === v.id || existing.youtubeVideoId === v.youtubeVideoId)) {
        list.push(v);
      }
    }
  }

  if (onlyPublished) {
    list = list.filter((v) => v.published);
  }

  // Sort featured first, then by order, then createdAt desc
  list.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return list;
}

export async function saveVideo(video: Omit<AdminVideo, 'id' | 'createdAt' | 'updatedAt' | 'youtubeVideoId' | 'thumbnailUrl'> & {
  id?: string;
  youtubeUrl: string;
}): Promise<AdminVideo> {
  const videoId = extractYouTubeId(video.youtubeUrl);
  if (!videoId) {
    throw new Error('Invalid YouTube URL. Please provide a valid watch, short, or share link.');
  }

  const now = new Date().toISOString();
  const id = video.id || `vid-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const thumbnailUrl = getYouTubeThumbnailUrl(videoId);

  const record: AdminVideo = {
    ...video,
    id,
    youtubeVideoId: videoId,
    thumbnailUrl,
    createdAt: now,
    updatedAt: now,
  };

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('videos').doc(id).set(record);
    } catch {}
  }

  const list = readJsonFile<AdminVideo[]>(VIDEOS_FILE, []);
  const idx = list.findIndex((v) => v.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...record, createdAt: list[idx].createdAt };
  } else {
    list.unshift(record);
  }
  writeJsonFile(VIDEOS_FILE, list);

  return record;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('videos').doc(id).delete();
    } catch {}
  }
  const list = readJsonFile<AdminVideo[]>(VIDEOS_FILE, []);
  const updated = list.filter((v) => v.id !== id);
  writeJsonFile(VIDEOS_FILE, updated);
  return true;
}

// ==============================================================================
// 6. SOCIAL LINKS MANAGEMENT
// ==============================================================================

export async function getSocialLinks(): Promise<AdminSocialLink[]> {
  const db = getFirestoreDb();
  let links: AdminSocialLink[] = [];

  if (db) {
    try {
      const snap = await db.collection('siteSettings').doc('socialLinks').get();
      if (snap.exists && snap.data()?.links) {
        links = snap.data()?.links as AdminSocialLink[];
      }
    } catch {}
  }

  if (links.length === 0) {
    links = readJsonFile<AdminSocialLink[]>(
      SOCIAL_FILE,
      SITE_CONTACT.defaultSocialLinks.map((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
      }))
    );
  }

  return links;
}

export async function saveSocialLinks(links: AdminSocialLink[]): Promise<AdminSocialLink[]> {
  const now = new Date().toISOString();
  const prepared = links.map((l, index) => ({
    ...l,
    order: l.order || index + 1,
    updatedAt: now,
  }));

  const db = getFirestoreDb();
  if (db) {
    try {
      await db.collection('siteSettings').doc('socialLinks').set({
        links: prepared,
        updatedAt: now,
      });
    } catch {}
  }

  writeJsonFile(SOCIAL_FILE, prepared);
  return prepared;
}

// ==============================================================================
// 7. CONTENT SUMMARY (FOR OVERVIEW DASHBOARD)
// ==============================================================================

export async function getContentSummary(): Promise<ContentSummary> {
  try {
    const [mediaList, storiesList, testimonialsList, videosList, socialList] = await Promise.all([
      getAllMedia(),
      getAllPatientStories(false),
      getAllTestimonials(false),
      getAllVideos(false),
      getSocialLinks(),
    ]);

    return {
      publishedPhotos: mediaList.filter((m) => m.published).length,
      patientStories: storiesList.filter((s) => s.published).length,
      testimonials: testimonialsList.filter((t) => t.published).length,
      youtubeVideos: videosList.filter((v) => v.published).length,
      socialChannels: socialList.filter((s) => s.enabled).length,
    };
  } catch (err) {
    console.warn('[Content Storage] Error getting content summary:', err);
    return {
      publishedPhotos: 0,
      patientStories: 0,
      testimonials: 0,
      youtubeVideos: 0,
      socialChannels: 0,
    };
  }
}

