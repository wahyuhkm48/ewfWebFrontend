/** Awalan mata uang untuk harga; indeks saham ditampilkan sebagai poin. */
const PRICE_PREFIX: Record<string, string> = {
  gold: "$",
  oil: "$",
};

export function priceText(slug: string, formatted: string) {
  return `${PRICE_PREFIX[slug] ?? ""}${formatted}`;
}