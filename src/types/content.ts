export type MediaCategory =
  | 'team'
  | 'patient-stories'
  | 'testimonials'
  | 'hospitals'
  | 'doctors'
  | 'office'
  | 'brand'
  | 'other';

export type ConsentStatus = 'pending' | 'approved' | 'approved_social' | 'restricted';

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  storagePath: string; // e.g. "media/team/img-12345.webp"
  downloadUrl: string; // Public rendering URL
  filename: string;
  title: string;
  altText: string;
  caption?: string;
  category: MediaCategory;
  language: 'all' | 'en' | 'ar';
  relatedStoryId?: string;
  relatedTestimonialId?: string;
  relatedHospitalId?: string;
  published: boolean;
  featured?: boolean;
  country?: string;
  treatment?: string;
  patientStoryId?: string;
  consentStatus: ConsentStatus;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPatientStory {
  id: string;
  title?: string;
  slug: string;
  displayName?: string; // E.g. "Patient S." or "Patient Shokhrukh"
  patientName?: string;
  country: string;
  countryCode?: string;
  language?: 'all' | 'en' | 'ar';
  treatment?: string;
  treatmentName?: string;
  treatmentSlug?: string;
  hospitalName?: string;
  doctorName?: string;
  condition?: string;
  conditionAr?: string;
  summary: string;
  summaryAr?: string;
  story?: string;
  storyAr?: string;
  quote: string;
  quoteAr?: string;
  outcomeNote?: string;
  outcomeNoteAr?: string;
  mediaType?: 'video' | 'image' | 'article' | string;
  videoUrl?: string;
  coverMediaId?: string;
  coverImageUrl?: string;
  galleryMediaIds?: string[];
  galleryImageUrls?: string[];
  youtubeVideoId?: string;
  testimonialId?: string;
  consentStatus: ConsentStatus;
  consentNotes?: string;
  featured?: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTestimonial {
  id: string;
  displayName?: string;
  patientName?: string;
  country: string;
  countryCode?: string;
  language?: 'all' | 'en' | 'ar';
  treatment?: string;
  treatmentName?: string;
  hospitalName?: string;
  quote: string;
  quoteAr?: string;
  photoMediaId?: string;
  photoUrl?: string;
  youtubeVideoId?: string;
  consentStatus: ConsentStatus;
  consentNotes?: string;
  order?: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VideoCategory =
  | 'patient-story'
  | 'hospital-tour'
  | 'doctor-interview'
  | 'process-guide'
  | 'treatment-explanation'
  | 'patient_story'
  | 'hospital_tour'
  | 'doctor_interview'
  | 'treatment_explanation'
  | 'patient_journey'
  | 'general';

export interface AdminVideo {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnailUrl: string;
  channelUrl?: string;
  duration?: string;
  languages?: string[];
  language?: 'all' | 'en' | 'ar' | string;
  category: VideoCategory;
  hospitalName?: string;
  doctorName?: string;
  treatmentName?: string;
  relatedTreatment?: string;
  relatedHospital?: string;
  relatedPatientStory?: string;
  consentConfirmed?: boolean;
  featured?: boolean;
  published: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSocialLink {
  id: string;
  platform: 'youtube' | 'telegram' | 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'other';
  name: string;
  url: string;
  handle: string;
  enabled: boolean;
  order: number;
  updatedAt: string;
}

export interface ContentSummary {
  publishedPhotos: number;
  patientStories: number;
  testimonials: number;
  youtubeVideos: number;
  socialChannels: number;
}

