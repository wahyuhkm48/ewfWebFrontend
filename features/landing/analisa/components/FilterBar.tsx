import { Download, Filter } from "lucide-react";
import { INTERVALS } from "../constants";
import type { Filters, Instrument } from "../types";
import SlidingTabs from "@/components/ui/SlidingTabs";

type Props = {
  instruments: Instrument[];
  draft: Filters;
  onChange: (next: Filters) => void;
  onApply: () => void;
  exportHref: string;
};

const fieldLabel = "type-micro mb-1.5 block font-semibold uppercase tracking-[0.1em] text-muted";
const input =
  "w-full rounded-xl border border-softgrey bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition focus:border-brand";

export default function FilterBar({ instruments, draft, onChange, onApply, exportHref }: Props) {
  return (
    <form
      className="grid gap-4 rounded-2xl bg-softgrey p-4 sm:p-5 lg:grid-cols-[1.3fr_1.6fr_auto_auto] lg:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
    >
      <div>
        <label htmlFor="instrumen" className={fieldLabel}>
          Instrumen
        </label>
        <select
          id="instrumen"
          className={input}
          value={draft.slug}
          onChange={(e) => onChange({ ...draft, slug: e.target.value })}
        >
          {instruments.length === 0 && <option value={draft.slug}>Memuat…</option>}
          {instruments.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className={fieldLabel}>Rentang Tanggal</span>
        <div className="grid grid-cols-2 gap-2">
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

      <div>
        <span className={fieldLabel}>Interval</span>
        <SlidingTabs
          ariaLabel="Interval"
          value={draft.interval}
          onChange={(interval) => onChange({ ...draft, interval })}
          options={INTERVALS.map((i) => ({ value: i.value, label: i.label }))}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90"
        >
          <Filter size={14} /> Terapkan
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