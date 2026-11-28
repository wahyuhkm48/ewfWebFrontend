import type { JobType } from "../lowongan/types";

export type ApplicantStatus = "baru" | "screening" | "interview" | "diterima" | "ditolak";

export const STATUS_OPTIONS: { value: ApplicantStatus; label: string }[] = [
  { value: "baru", label: "Baru Masuk" },
  { value: "screening", label: "Screening" },
  { value: "interview", label: "Interview" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

export type Applicant = {
  id: number;
  job_posting_id: number;
  name: string;
  email: string;
  phone: string | null;
  status: ApplicantStatus;
  applied_at: string; // "2026-11-28"
  notes: string | null;
  job: { id: number; title: string; type: JobType } | null;
};

export type ApplicantStats = {
  total: number;
  baru: number;
  screening: number;
  interview: number;
  diterima: number;
  ditolak: number;
  today: number;
  last7: { date: string; count: number }[];
};

export type ApplicantListResponse = {
  data: Applicant[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number | null;
    to: number | null;
  };
  stats: ApplicantStats;
};

export type JobOption = { id: number; title: string; type: JobType; is_open: boolean };

export type ApplicantInput = {
  job_posting_id: string; // id lowongan sebagai string (nilai dropdown)
  name: string;
  email: string;
  phone: string;
  status: ApplicantStatus;
  applied_at: string;
  notes: string;
};

export type ListParams = {
  page: number;
  q: string;
  job: string;
  type: "" | JobType;
  status: "" | ApplicantStatus;
  from: string;
  to: string;
};