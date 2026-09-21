export type Locale = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface LocalizedArray {
  en: string[];
  ar: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface Specialty {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  iconName: string;
  treatmentSlugs: string[];
  hospitalIds: string[];
  keyProcedures: LocalizedArray;
}

export interface HospitalFacility {
  id: string;
  slug: string;
  name: LocalizedString;
  location: LocalizedString;
  city: string;
  state: string;
  country: string;
  bedsCount: string;
  establishedYear: string;
  overview: LocalizedString;
  keySpecialties: string[];
  internationalPatientServices: LocalizedArray;
  accreditationNote: LocalizedString; // Explicit phrasing to prevent unsupported claims
  distanceFromAirport: LocalizedString;
  nearbyHotelsNote: LocalizedString;
  doctorIds: string[];
  treatmentSlugs: string[];
  photos: string[];
}

export interface Doctor {
  id: string;
  slug: string;
  name: LocalizedString;
  designation: LocalizedString;
  hospitalId: string;
  specialtyId: string;
  experienceYears: string;
  education: LocalizedArray;
  fellowships: LocalizedArray;
  languages: string[];
  clinicalFocus: LocalizedArray;
  procedures: string[];
  photoUrl: string;
  bio: LocalizedString;
  verificationSource: string; // E-E-A-T grounding
}

export interface TreatmentCostItem {
  treatmentSlug: string;
  procedureName: LocalizedString;
  indicativeRangeUSD: string;
  hospitalVariationNote: LocalizedString;
  inclusions: LocalizedArray;
  exclusions: LocalizedArray;
  hospitalStayDays: string;
  recoveryDays: string;
  lastReviewedDate: string;
  disclaimer: LocalizedString;
}

export interface Treatment {
  id: string;
  slug: string;
  name: LocalizedString;
  specialtyId: string;
  overview: LocalizedString;
  whoRequiresTreatment: LocalizedArray;
  treatmentOptions: LocalizedArray;
  hospitalIds: string[];
  doctorIds: string[];
  costInfo: TreatmentCostItem;
  hospitalStay: LocalizedString;
  recoveryTimeline: LocalizedString;
  internationalPatientProcess: LocalizedArray;
  travelAndVisaRequirements: LocalizedString;
  patientStoryIds: string[];
  faqs: { question: LocalizedString; answer: LocalizedString }[];
  medicalDisclaimer: LocalizedString;
  sources: { title: string; url?: string; organization: string }[];
}

export interface PatientStory {
  id: string;
  slug: string;
  patientName: string; // Anonymized if needed, e.g. "Patient Farooq" or "Patient Shokhrukh"
  patientCountry: LocalizedString;
  countryCode: string;
  condition: LocalizedString;
  treatmentSlug: string;
  hospitalId: string;
  doctorId?: string;
  journeyTimeline: { stage: LocalizedString; duration: LocalizedString }[];
  storySummary: LocalizedString;
  quote: LocalizedString;
  outcomeNote: LocalizedString; // Objective, non-exaggerated
  hasConsent: boolean;
  mediaType: 'photo' | 'video' | 'text';
  mediaUrl?: string;
  videoThumbnailUrl?: string;
  videoDuration?: string;
  uploadDate?: string;
}

export interface Coordinator {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  desk: 'central-asia' | 'middle-east' | 'liaison' | 'admissions';
  languages: string[];
  experienceYears: string;
  location: LocalizedString;
  photoUrl: string;
  specialization: LocalizedString;
  whatsApp: string;
}

export interface CountryPathway {
  id: string;
  slug: string;
  countryName: LocalizedString;
  region: 'Arab' | 'Central Asia' | 'CIS';
  overview: LocalizedString;
  whyPatientsChooseIndia: LocalizedArray;
  commonTreatments: string[]; // treatment slugs
  visaInfo: {
    type: LocalizedString;
    processingTime: LocalizedString;
    requirements: LocalizedArray;
    assistanceProvided: LocalizedString;
  };
  flightInfo: LocalizedString;
  languageSupport: LocalizedString;
  localWhatsAppNumber: string;
  patientStoryIds: string[];
}

export interface FAQItem {
  id: string;
  category: 'general' | 'visa' | 'treatment' | 'cost' | 'hospitals' | 'language';
  question: LocalizedString;
  answer: LocalizedString;
}

export interface Lead {
  lead_id: string;
  created_at: string;
  country: string;
  language: Locale;
  treatment: string;
  patient_relationship: 'self' | 'parent' | 'child' | 'spouse' | 'relative' | 'other';
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  device: 'mobile' | 'desktop' | 'tablet';
  name: string;
  whatsapp: string;
  phone?: string;
  email?: string;
  report_uploaded: boolean;
  uploaded_file_count: number;
  report_file_ids?: string[];
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status:
    | 'NEW'
    | 'CONTACTED'
    | 'REPORTS_RECEIVED'
    | 'MEDICAL_REVIEW'
    | 'HOSPITAL_OPTIONS_SENT'
    | 'QUOTE_RECEIVED'
    | 'PATIENT_DECISION'
    | 'TRAVEL_PLANNED'
    | 'ARRIVED_INDIA'
    | 'TREATMENT'
    | 'FOLLOW_UP'
    | 'CONVERTED'
    | 'LOST';
  notes?: string;
}

