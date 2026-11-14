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

/** Samakan dengan per_page di api.ts agar tinggi skeleton = tinggi data. */
const PER_PAGE = 10;

const thBase = "py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em]";
const thFirst = `${thBase} px-4 text-left`;
const th = `${thBase} px-2 text-center`;
const tdFirst = "px-4 py-3.5 text-left";
const td = "px-2 py-3.5 text-center tabular-nums";

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: PER_PAGE }, (_, i) => (
        <tr key={i} className="border-t border-softgrey">
          <td className={tdFirst}>
            <div className="h-4 w-24 animate-pulse rounded bg-surface" />
          </td>
          {[0, 1, 2, 3, 4].map((c) => (
            <td key={c} className={td}>
              <div className="mx-auto h-4 w-16 animate-pulse rounded bg-surface" />
            </td>
          ))}
          <td className={td}>
            <div className="mx-auto h-7 w-24 animate-pulse rounded-lg bg-surface" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function HistoryTable({ rows, meta, loading, toolbar, onPivot, onPage }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="type-h3 text-ink">Data Historis OHLC (Open, High, Low, Close)</h3>
        {meta && meta.total > 0 ? (
          <p className="type-micro text-muted">
            Menampilkan {meta.from}-{meta.to} dari {meta.total} entri
          </p>
        ) : (
          loading && !meta && <div className="h-4 w-40 animate-pulse rounded bg-surface" />
        )}
      </div>

      {toolbar && <div className="mt-4">{toolbar}</div>}

      <div className="mt-4 overflow-x-auto rounded-2xl border border-softgrey">
        <table className="w-full min-w-[800px] table-fixed text-[13px]">
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[14%]" />
            <col className="w-[16%]" />
          </colgroup>
          <thead className="bg-navy text-white">
            <tr>
              <th className={thFirst}>Tanggal</th>
              <th className={th}>Open</th>
              <th className={th}>High</th>
              <th className={th}>Low</th>
              <th className={th}>Close</th>
              <th className={th}>Perubahan %</th>
              <th className={th}>Aksi Cepat</th>
            </tr>
          </thead>
          <tbody aria-busy={loading}>
            {loading ? (
              <SkeletonRows />
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  Belum ada data untuk rentang tanggal ini.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const up = (r.change_percent ?? 0) > 0;
                const down = (r.change_percent ?? 0) < 0;
                return (
                  <tr key={r.date} className="border-t border-softgrey">
                    <td className={`${tdFirst} font-semibold text-ink`}>{formatDate(r.date)}</td>
                    <td className={`${td} text-muted`}>{formatNumber(r.open)}</td>
                    <td className={`${td} font-semibold text-ink`}>{formatNumber(r.high)}</td>
                    <td className={`${td} font-semibold text-ink`}>{formatNumber(r.low)}</td>
                    <td className={`${td} font-semibold text-ink`}>{formatNumber(r.close)}</td>
                    <td
                      className={`${td} font-semibold ${
                        up ? "text-bull" : down ? "text-bear" : "text-muted"
                      }`}
                    >
                      {formatPercent(r.change_percent)}
                    </td>
                    <td className={td}>
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
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="type-micro text-muted lg:whitespace-nowrap">
          Data bersumber dari sistem bursa resmi JFX & KBI. Data bersifat historis dan bukan
          jaminan pergerakan di masa depan.
        </p>

        {meta ? (
          meta.last_page > 1 && (
            <HistoryPagination
              current={meta.current_page}
              last={meta.last_page}
              onChange={onPage}
            />
          )
        ) : (
          loading && <div className="h-10 w-56 animate-pulse rounded-full bg-surface" />
        )}
      </div>
    </div>
  );
}