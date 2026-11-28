import { clearSession, getToken } from "@/features/auth/api";
import { LowonganError } from "../lowongan/api";
import type {
  Applicant,
  ApplicantInput,
  ApplicantListResponse,
  ApplicantStatus,
  JobOption,
  ListParams,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL; // sudah termasuk /api/v1

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!BASE) throw new LowonganError(0, "NEXT_PUBLIC_API_URL belum diatur.");

  let res: Response;
  try {
    res = await fetch(`${BASE}/admin/applicants${path}`, {
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

export function fetchApplicants(p: ListParams): Promise<ApplicantListResponse> {
  const qs = new URLSearchParams({ page: String(p.page), per_page: "10" });
  if (p.q) qs.set("q", p.q);
  if (p.job) qs.set("job", p.job);
  if (p.type) qs.set("type", p.type);
  if (p.status) qs.set("status", p.status);
  if (p.from) qs.set("from", p.from);
  if (p.to) qs.set("to", p.to);
  return request<ApplicantListResponse>(`?${qs}`);
}

export async function fetchOptions(): Promise<JobOption[]> {
  return (await request<{ data: JobOption[] }>("/options")).data;
}

export async function fetchApplicant(id: string): Promise<Applicant> {
  return (await request<{ data: Applicant }>(`/${id}`)).data;
}

function toPayload(input: ApplicantInput) {
  return {
    ...input,
    job_posting_id: Number(input.job_posting_id),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
  };
}

export async function createApplicant(input: ApplicantInput): Promise<Applicant> {
  const res = await request<{ data: Applicant }>("", { method: "POST", body: JSON.stringify(toPayload(input)) });
  return res.data;
}

export async function updateApplicant(id: string, input: ApplicantInput): Promise<Applicant> {
  const res = await request<{ data: Applicant }>(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(toPayload(input)),
  });
  return res.data;
}

export async function setApplicantStatus(id: number, status: ApplicantStatus): Promise<Applicant> {
  const res = await request<{ data: Applicant }>(`/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return res.data;
}

export function deleteApplicant(id: number): Promise<void> {
  return request<void>(`/${id}`, { method: "DELETE" });
}