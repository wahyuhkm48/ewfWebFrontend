"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import ChartCard from "../components/ChartCard";
import FilterBar from "../components/FilterBar";
import HistoryTable from "../components/HistoryTable";
import InstrumentSelect from "../components/InstrumentSelect";
import { exportUrl, getHistory, getLive } from "../api";
import type { Filters, HistoryResponse, Instrument } from "../types";

type Props = {
  instruments: Instrument[];
  /** true saat tab Data Historis sedang terlihat */
  active: boolean;
  onPivot: (slug: string, date: string) => void;
};

// Tanpa from/to = tampilkan semua data
const INITIAL: Filters = { slug: "gold", from: "", to: "" };

export default function HistoryPanel({ instruments, active, onPivot }: Props) {
  const [draft, setDraft] = useState<Filters>(INITIAL);
  const [applied, setApplied] = useState<Filters>(INITIAL);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loadedKey, setLoadedKey] = useState("");
  const [error, setError] = useState<{ key: string; message: string } | null>(null);
  const [feed, setFeed] = useState<boolean | null>(null);

  const key = JSON.stringify([applied, page]);
  const failed = error?.key === key;
  const loading = loadedKey !== key && !failed;

  useEffect(() => {
    const controller = new AbortController();

    getHistory(applied, page, controller.signal)
      .then((res) => {
        setData(res);
        setError(null);
        setLoadedKey(key);
        // Isi kolom tanggal dengan rentang penuh dari server saat pertama kali tampil
        setDraft((d) => (d.from ? d : { ...d, from: res.filters.from, to: res.filters.to }));
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setError({ key, message: e instanceof Error ? e.message : "Data gagal dimuat." });
      });

    return () => controller.abort();
  }, [applied, page, key]);

  useEffect(() => {
    const controller = new AbortController();

    getLive(controller.signal)
      .then((res) => setFeed(Object.keys(res.data).length > 0))
      .catch(() => {
        if (!controller.signal.aborted) setFeed(false);
      });

    return () => controller.abort();
  }, []);

  // Ganti instrumen / reset: kembali ke semua data untuk instrumen tersebut
  const changeInstrument = (slug: string) => {
    const next: Filters = { slug, from: "", to: "" };
    setDraft(next);
    setApplied(next);
    setPage(1);
  };

  const apply = () => {
    setApplied(draft);
    setPage(1);
  };

  const selected = instruments.find((i) => i.slug === applied.slug);
  const instrument = data?.instrument;

  return (
    <div className="rounded-3xl border border-softgrey bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-softgrey pb-6">
        <div>
          <p className="type-label flex items-center gap-2 text-brand">
            <History size={14} /> Market History
          </p>
          <h2 className="type-h2 mt-2 text-ink">Data Historis Pasar</h2>
          <p className="type-body mt-1 text-muted">
            Pantau pergerakan harga dari waktu ke waktu dengan keterbukaan data riil bursa
            berjangka.
          </p>
        </div>

        <p className="flex items-center gap-2 text-xs text-muted">
          Status Data:
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold ${
              feed === false ? "bg-softgrey text-muted" : "bg-bull/10 text-bull"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${feed === false ? "bg-muted" : "bg-bull"}`}
            />
            {feed === null ? "Memeriksa…" : feed ? "Realtime Feeds Aktif" : "Realtime Tidak Tersedia"}
          </span>
        </p>
      </div>

      {/* 1. Instrumen (dipakai kartu, grafik, dan tabel) */}
      <div className="mt-6">
        <InstrumentSelect
          instruments={instruments}
          value={applied.slug}
          onChange={changeInstrument}
        />
      </div>

      {/* 2. Grafik: hanya interval dan tipe grafik */}
      <div className="mt-6">
        <ChartCard
          short={selected?.short ?? "…"}
          symbol={selected?.tradingview_symbol ?? null}
          active={active}
        />
      </div>

      {/* 3. Data historis: rentang tanggal, tabel, pagination */}
      <div className="mt-8">
        {failed ? (
          <div role="alert" className="rounded-2xl border border-bear/30 bg-bear/5 p-6 text-center">
            <p className="font-semibold text-ink">{error?.message}</p>
            <button
              type="button"
              onClick={() => setApplied((a) => ({ ...a }))}
              className="mt-3 rounded-xl bg-brand px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-brand/90"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <HistoryTable
            rows={data?.data ?? []}
            meta={data?.meta ?? null}
            loading={loading}
            toolbar={
              <FilterBar
                draft={draft}
                onChange={setDraft}
                onApply={apply}
                onReset={() => changeInstrument(applied.slug)}
                exportHref={exportUrl(applied)}
              />
            }
            onPivot={(date) => onPivot(instrument?.slug ?? applied.slug, date)}
            onPage={setPage}
          />
        )}
      </div>
    </div>
  );
}