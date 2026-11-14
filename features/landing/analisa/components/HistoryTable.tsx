import type { ReactNode } from "react";
import { formatDate, formatNumber, formatPercent } from "@/lib/format";
import type { HistoryRow, PageMeta } from "../types";
import HistoryPagination from "./HistoryPagination";

type Props = {
  rows: HistoryRow[];
  meta: PageMeta | null;
  loading: boolean;
  /** Filter rentang tanggal, ditampilkan di antara judul dan tabel. */
  toolbar?: ReactNode;
  onPivot: (date: string) => void;
  onPage: (page: number) => void;
};

const th = "px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em]";
const thRight = `${th} text-right`;

export default function HistoryTable({ rows, meta, loading, toolbar, onPivot, onPage }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="type-h3 text-ink">Data Historis OHLC (Open, High, Low, Close)</h3>
        {meta && meta.total > 0 && (
          <p className="type-micro text-muted">
            Menampilkan {meta.from}-{meta.to} dari {meta.total} entri
          </p>
        )}
      </div>

      {toolbar && <div className="mt-4">{toolbar}</div>}

      <div className="mt-4 overflow-x-auto rounded-2xl border border-softgrey">
        <table className={`w-full min-w-[720px] text-[13px] ${loading ? "opacity-60" : ""}`}>
          <thead className="bg-navy text-white">
            <tr>
              <th className={`${th} text-left`}>Tanggal</th>
              <th className={thRight}>Open</th>
              <th className={thRight}>High</th>
              <th className={thRight}>Low</th>
              <th className={thRight}>Close</th>
              <th className={thRight}>Perubahan %</th>
              <th className={thRight}>Aksi Cepat</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  {loading ? "Memuat data…" : "Belum ada data untuk rentang tanggal ini."}
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const up = (r.change_percent ?? 0) > 0;
              const down = (r.change_percent ?? 0) < 0;
              return (
                <tr key={r.date} className="border-t border-softgrey">
                  <td className="px-4 py-3.5 font-semibold text-ink">{formatDate(r.date)}</td>
                  <td className="px-4 py-3.5 text-right text-muted">{formatNumber(r.open)}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-ink">{formatNumber(r.high)}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-ink">{formatNumber(r.low)}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-ink">{formatNumber(r.close)}</td>
                  <td
                    className={`px-4 py-3.5 text-right font-semibold ${
                      up ? "text-bull" : down ? "text-bear" : "text-muted"
                    }`}
                  >
                    {formatPercent(r.change_percent)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onPivot(r.date)}
                      className="rounded-lg bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand transition hover:bg-brand hover:text-white"
                    >
                      Hitung Pivot
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="type-micro max-w-xl text-muted">
            Data bersumber dari sistem bursa resmi JFX & KBI. Data bersifat historis dan bukan
            jaminan pergerakan di masa depan.
          </p>

          {meta.last_page > 1 && (
            <HistoryPagination
              current={meta.current_page}
              last={meta.last_page}
              onChange={onPage}
            />
          )}
        </div>
      )}
    </div>
  );
}