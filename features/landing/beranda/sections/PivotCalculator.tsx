"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function PivotCalculator() {
  const [high, setHigh] = useState("2390.50");
  const [low, setLow] = useState("2372.10");
  const [close, setClose] = useState("2384.20");

  const H = parseFloat(high);
  const L = parseFloat(low);
  const C = parseFloat(close);
  const valid = [H, L, C].every((n) => !Number.isNaN(n));

  const pp = valid ? (H + L + C) / 3 : NaN;
  const range = H - L;
  const levels = valid
    ? [
        { name: "Resistance 4 (R4)", v: H + 2 * (pp - L) + range, type: "r" },
        { name: "Resistance 3 (R3)", v: H + 2 * (pp - L), type: "r" },
        { name: "Resistance 2 (R2)", v: pp + range, type: "r" },
        { name: "Resistance 1 (R1)", v: 2 * pp - L, type: "r" },
        { name: "PIVOT POINT (PP)", v: pp, type: "pp" },
        { name: "Support 1 (S1)", v: 2 * pp - H, type: "s" },
        { name: "Support 2 (S2)", v: pp - range, type: "s" },
        { name: "Support 3 (S3)", v: L - 2 * (H - pp), type: "s" },
        { name: "Support 4 (S4)", v: L - 2 * (H - pp) - range, type: "s" },
      ]
    : [];

  const input =
    "type-data mt-1 w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-white outline-none focus:border-brand";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-30 sm:px-6">
      <div className="grid gap-10 rounded-3xl bg-navy p-6 text-white sm:p-10 lg:grid-cols-2">
        <div className="self-center">
          <span className="type-label rounded-full border border-brand/40 px-3 py-1 text-[11px] text-brand">
            Kalkulator Analisa Harian
          </span>
          <h2 className="type-h2 mt-4">
            Hitung Level Pivot Point Anda Secara Presisi
          </h2>
          <p className="type-body mt-4 text-white/70">
            Pivot Point, Support, dan Resistance merupakan acuan teknikal utama
            bagi trader komoditas harian untuk menentukan batas psikologis
            pembalikan arah harga (reversal), target take profit, serta batas
            toleransi risiko stop loss.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/analisa"
              className="rounded-full bg-brand px-5 py-3 text-[13px] font-semibold hover:bg-brand/90"
            >
              Buka Kalkulator Lengkap
            </Link>
            <Link
              href="/analisa"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-white/80 hover:text-white"
            >
              Pelajari Cara Baca Pivot <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-5">
          <p className="text-[13px] font-semibold">
            XAU/USD – Classic Pivot Calculator
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-[13px] font-medium text-white/60">
            <label>
              High (Tertinggi)
              <input className={input} value={high} onChange={(e) => setHigh(e.target.value)} inputMode="decimal" />
            </label>
            <label>
              Low (Terendah)
              <input className={input} value={low} onChange={(e) => setLow(e.target.value)} inputMode="decimal" />
            </label>
            <label>
              Close (Penutupan)
              <input className={input} value={close} onChange={(e) => setClose(e.target.value)} inputMode="decimal" />
            </label>
          </div>

          <div className="mt-5 space-y-2">
            {valid ? (
              levels.map((l) => (
                <div
                  key={l.name}
                  className={`type-data flex items-center justify-between rounded-lg px-4 py-2.5 text-[14px] ${
                    l.type === "pp"
                      ? "bg-brand text-white"
                      : l.type === "r"
                      ? "bg-bear/15 text-bear"
                      : "bg-bull/15 text-bull"
                  }`}
                >
                  <span>{l.name}</span>
                  <span>{fmt(l.v)}</span>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-white/5 p-4 text-sm text-white/60">
                Isi angka High, Low, dan Close dengan benar.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}