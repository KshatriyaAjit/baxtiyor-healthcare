export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'REPORTS_RECEIVED',
  'MEDICAL_REVIEW',
  'HOSPITAL_OPTIONS_SENT',
  'QUOTE_RECEIVED',
  'PATIENT_DECISION',
  'TRAVEL_PLANNED',
  'ARRIVED_INDIA',
  'TREATMENT',
  'FOLLOW_UP',
  'CONVERTED',
  'LOST',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface StatusHistoryItem {
  from: string;
  to: LeadStatus;
  timestamp: string;
  updated_by: string;
}

export interface AdminLead {
  lead_id: string;
  created_at: string;
  updated_at?: string;
  name: string;
  whatsapp: string;
  email?: string;
  country?: string;
  treatment?: string;
  relationship?: string;
  language?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  report_uploaded?: boolean;
  uploaded_file_count?: number;
  report_file_ids?: string[];
  score: 'HIGH' | 'MEDIUM' | 'LOW';
  status: LeadStatus;
  assigned_coordinator?: string;
  status_history?: StatusHistoryItem[];
  notes?: string;
  storage_target?: string;
}

