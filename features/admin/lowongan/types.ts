export type JobType = "kerja" | "magang";

export type JobPosting = {
  id: number;
  title: string;
  type: JobType;
  location: string | null;
  description: string | null;
  quota: number;
  deadline: string; // "2026-12-31"
  days_left: number; // negatif = sudah lewat
  is_active: boolean;
  is_open: boolean;
  created_at: string | null;
};

export type JobStats = {
  total: number;
  kerja: number;
  magang: number;
  open: number;
  closed: number;
  closing_soon: number;
  quota_kerja: number;
  quota_magang: number;
};

export type JobListResponse = {
  data: JobPosting[];
  meta: { current_page: number; last_page: number; total: number; per_page: number };
  stats: JobStats;
};

export type JobInput = {
  title: string;
  type: JobType;
  location: string;
  description: string;
  quota: number;
  deadline: string;
  is_active: boolean;
};

export type ListParams = {
  page: number;
  q: string;
  type: "" | JobType;
  status: "" | "aktif" | "nonaktif";
};