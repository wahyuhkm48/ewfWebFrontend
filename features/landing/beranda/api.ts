import { api } from "@/lib/api";
import type { PivotResponse } from "@/features/landing/analisa/types";

export const PIVOT_SLUGS = ["gold", "oil", "hangseng", "nikkei"] as const;

export type LatestPivots = Record<string, PivotResponse | null>;

export async function getLatestPivots(): Promise<LatestPivots> {
  const results = await Promise.allSettled(
    PIVOT_SLUGS.map((slug) =>
      api<PivotResponse>(`/market/${slug}/pivot`, { next: { revalidate: 300 } }),
    ),
  );

  return Object.fromEntries(
    PIVOT_SLUGS.map((slug, i) => {
      const r = results[i];
      return [slug, r.status === "fulfilled" ? r.value : null];
    }),
  );
}