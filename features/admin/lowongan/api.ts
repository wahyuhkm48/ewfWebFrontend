import { clearSession, getToken } from "@/features/auth/api";
import type { JobInput, JobListResponse, JobPosting, ListParams } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL; // sudah termasuk /api/v1

export class LowonganError extends Error {
  status: number;
  fields: Record<string, string>;

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!BASE) throw new LowonganError(0, "NEXT_PUBLIC_API_URL belum diatur.");

  let res: Response;
  try {
    res = await fetch(`${BASE}/admin/job-postings${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${getToken() ?? ""}`,
      },
    });
  } catch {
    throw new LowonganError(0, "Tidak dapat terhubung ke server.");
  }

  if (res.status === 401) {
    clearSession();
    window.location.replace("/masuk");
    throw new LowonganError(401, "Sesi berakhir. Silakan masuk kembali.");
  }

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const fields: Record<string, string> = {};
    for (const [key, msgs] of Object.entries(body.errors ?? {})) {
      fields[key] = (msgs as string[])[0];
    }
    throw new LowonganError(res.status, body.message ?? "Terjadi kesalahan.", fields);
  }

  return body as T;
}

export function fetchJobs(p: ListParams): Promise<JobListResponse> {
  const qs = new URLSearchParams({ page: String(p.page), per_page: "10" });
  if (p.q) qs.set("q", p.q);
  if (p.type) qs.set("type", p.type);
  if (p.status) qs.set("status", p.status);
  return request<JobListResponse>(`?${qs}`);
}

export async function fetchJob(id: string): Promise<JobPosting> {
  return (await request<{ data: JobPosting }>(`/${id}`)).data;
}

export async function createJob(input: JobInput): Promise<JobPosting> {
  const res = await request<{ data: JobPosting }>("", { method: "POST", body: JSON.stringify(input) });
  return res.data;
}

export async function updateJob(id: string, input: JobInput): Promise<JobPosting> {
  const res = await request<{ data: JobPosting }>(`/${id}`, { method: "PUT", body: JSON.stringify(input) });
  return res.data;
}

export async function setJobStatus(id: number, isActive: boolean): Promise<JobPosting> {
  const res = await request<{ data: JobPosting }>(`/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ is_active: isActive }),
  });
  return res.data;
}

export function deleteJob(id: number): Promise<void> {
  return request<void>(`/${id}`, { method: "DELETE" });
}