import type { Interval } from "./types";

export const INTERVALS: { value: Interval; label: string; tradingview: "D" | "W" | "M" }[] = [
  { value: "daily", label: "Harian", tradingview: "D" },
  { value: "weekly", label: "Mingguan", tradingview: "W" },
  { value: "monthly", label: "Bulanan", tradingview: "M" },
];

/** Awalan mata uang untuk harga; indeks saham ditampilkan sebagai poin. */
export const PRICE_PREFIX: Record<string, string> = {
  gold: "$",
  oil: "$",
};

export function priceText(slug: string, formatted: string) {
  return `${PRICE_PREFIX[slug] ?? ""}${formatted}`;
}