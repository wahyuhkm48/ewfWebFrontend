import { api, apiUrl } from "@/lib/api";
import type {
  Filters,
  HistoryResponse,
  Instrument,
  LiveResponse,
  PivotResponse,
} from "./types";

function historyParams(filters: Filters, page?: number) {
  const params = new URLSearchParams();
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (page) {
    params.set("page", String(page));
    params.set("per_page", "10");
  }
  return params.toString();
}

export async function getInstruments(signal?: AbortSignal) {
  const res = await api<{ data: Instrument[] }>("/market/instruments", { signal });
  return res.data;
}

export function getLive(signal?: AbortSignal) {
  return api<LiveResponse>("/market/live", { signal, cache: "no-store" });
}

export function getHistory(filters: Filters, page: number, signal?: AbortSignal) {
  return api<HistoryResponse>(
    `/market/${filters.slug}/history?${historyParams(filters, page)}`,
    { signal },
  );
}

export function exportUrl(filters: Filters) {
  return apiUrl(`/market/${filters.slug}/history/export?${historyParams(filters)}`);
}

export function getPivot(slug: string, date?: string, signal?: AbortSignal) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return api<PivotResponse>(`/market/${slug}/pivot${query}`, { signal, cache: "no-store" });
}

export function calculatePivot(
  body: { high: number; low: number; close: number },
  signal?: AbortSignal,
) {
  return api<PivotResponse>("/pivot/calculate", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}