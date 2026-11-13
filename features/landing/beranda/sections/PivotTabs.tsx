"use client";

import { useState } from "react";
import { formatDate, formatNumber } from "@/lib/format";
import type { PivotLevels } from "@/features/landing/analisa/types";
import { PIVOT_SLUGS, type LatestPivots } from "../api";

const TABS: Record<(typeof PIVOT_SLUGS)[number], string> = {
  gold: "XAU/USD",
  oil: "OIL/BRENT",
  hangseng: "HK50/HSI",
  nikkei: "JPK/NIKKEI",
};

const ROWS: [keyof PivotLevels, string, "r" | "pp" | "s"][] = [
  ["resistance4", "Resistance 4 (R4)", "r"],
  ["resistance3", "Resistance 3 (R3)", "r"],
  ["resistance2", "Resistance 2 (R2)", "r"],
  ["resistance1", "Resistance 1 (R1)", "r"],
  ["pivot_point", "PIVOT POINT (PP)", "pp"],
  ["support1", "Support 1 (S1)", "s"],
  ["support2", "Support 2 (S2)", "s"],
  ["support3", "Support 3 (S3)", "s"],
  ["support4", "Support 4 (S4)", "s"],
];

export default function PivotTabs({ pivots }: { pivots: LatestPivots }) {
  const [slug, setSlug] = useState<(typeof PIVOT_SLUGS)[number]>("gold");
  const data = pivots[slug];

  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih produk">
        {PIVOT_SLUGS.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={slug === s}
            onClick={() => setSlug(s)}
            className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${
              slug === s ? "bg-brand text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {TABS[s]}
          </button>
        ))}
      </div>

      {data?.basis ? (
        <>
          <p className="mt-4 text-[13px] font-semibold">
            {TABS[slug]} – Pivot Point Terbaru
          </p>
          <p className="type-micro mt-1 text-white/60">
            Berdasarkan data {formatDate(data.basis.date, { long: true })} · H{" "}
            {formatNumber(data.basis.high)} · L {formatNumber(data.basis.low)} · C{" "}
            {formatNumber(data.basis.close)}
          </p>

          <div className="mt-4 space-y-2">
            {ROWS.map(([key, name, type]) => (
              <div
                key={key}
                className={`type-data flex items-center justify-between rounded-lg px-4 py-2.5 text-[14px] ${
                  type === "pp"
                    ? "bg-brand text-white"
                    : type === "r"
                    ? "bg-bear/15 text-bear"
                    : "bg-bull/15 text-bull"
                }`}
              >
                <span>{name}</span>
                <span>{formatNumber(data.levels[key])}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-lg bg-white/5 p-4 text-sm text-white/60">
          Data pivot {TABS[slug]} belum tersedia saat ini.
        </p>
      )}
    </div>
  );
}