export type ChartInterval = "1" | "30" | "60" | "D" | "W" | "M";

/** value = kode interval TradingView; name dipakai untuk label badge. */
export const CHART_INTERVALS: { value: ChartInterval; label: string; name: string }[] = [
  { value: "1", label: "1m", name: "1 Menit" },
  { value: "30", label: "30m", name: "30 Menit" },
  { value: "60", label: "1j", name: "1 Jam" },
  { value: "D", label: "Harian", name: "Harian" },
  { value: "W", label: "Mingguan", name: "Mingguan" },
  { value: "M", label: "Bulanan", name: "Bulanan" },
];

/** Awalan mata uang untuk harga; indeks saham ditampilkan sebagai poin. */
export const PRICE_PREFIX: Record<string, string> = {
  gold: "$",
  oil: "$",
};

export function priceText(slug: string, formatted: string) {
  return `${PRICE_PREFIX[slug] ?? ""}${formatted}`;
}