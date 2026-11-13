import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestPivots } from "../api";
import PivotTabs from "./PivotTabs";

export default async function PivotCalculator() {
  const pivots = await getLatestPivots();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-30 sm:px-6">
      <div className="grid gap-10 rounded-3xl bg-navy p-6 text-white sm:p-10 lg:grid-cols-2">
        <div className="self-center">
          <span className="type-label rounded-full border border-brand/40 px-3 py-1 text-[11px] text-brand">
            Kalkulator Analisa Harian
          </span>
          <h2 className="type-h2 mt-4">Level Pivot Point Terbaru Setiap Produk</h2>
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

        <PivotTabs pivots={pivots} />
      </div>
    </section>
  );
}