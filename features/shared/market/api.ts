import { api } from "@/lib/api";
import type { Instrument, LiveResponse } from "./types";

export async function getInstruments(signal?: AbortSignal) {
  const res = await api<{ data: Instrument[] }>("/market/instruments", { signal });
  return res.data;
}

export function getLive(signal?: AbortSignal) {
  return api<LiveResponse>("/market/live", { signal, cache: "no-store" });
}