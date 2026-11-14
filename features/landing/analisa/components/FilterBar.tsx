import { Download, Filter, RotateCcw } from "lucide-react";
import type { Filters } from "../types";

type Props = {
  draft: Filters;
  onChange: (next: Filters) => void;
  onApply: () => void;
  onReset: () => void;
  /** false bila rentang di form sama dengan yang sedang tampil, atau data sedang dimuat. */
  canApply: boolean;
  /** false bila sudah menampilkan semua data. */
  canReset: boolean;
  exportHref: string;
};

const fieldLabel = "type-micro mb-1.5 block font-semibold uppercase tracking-[0.1em] text-muted";
const input =
  "w-full rounded-xl border border-softgrey bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition focus:border-brand";
const disabledStyle = "disabled:cursor-not-allowed disabled:opacity-50";

export default function FilterBar({
  draft,
  onChange,
  onApply,
  onReset,
  canApply,
  canReset,
  exportHref,
}: Props) {
  return (
    <form
      className="grid gap-4 rounded-2xl bg-softgrey p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
    >
      <div>
        <span className={fieldLabel}>Rentang Tanggal</span>
        <div className="grid grid-cols-2 gap-2 sm:max-w-md">
          <input
            type="date"
            aria-label="Tanggal mulai"
            className={input}
            value={draft.from}
            max={draft.to || undefined}
            onChange={(e) => onChange({ ...draft, from: e.target.value })}
          />
          <input
            type="date"
            aria-label="Tanggal akhir"
            className={input}
            value={draft.to}
            min={draft.from || undefined}
            onChange={(e) => onChange({ ...draft, to: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={!canApply}
          title={canApply ? undefined : "Ubah rentang tanggal untuk menerapkan filter"}
          className={`inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white transition enabled:hover:bg-brand/90 ${disabledStyle}`}
        >
          <Filter size={14} /> Terapkan
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={!canReset}
          className={`inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition enabled:hover:bg-white/70 ${disabledStyle}`}
        >
          <RotateCcw size={14} /> Reset
        </button>
        <a
          href={exportHref}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-white/70"
        >
          <Download size={14} /> Export CSV
        </a>
      </div>
    </form>
  );
}