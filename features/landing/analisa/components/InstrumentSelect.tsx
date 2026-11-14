import type { Instrument } from "../types";

type Props = {
  instruments: Instrument[];
  value: string;
  onChange: (slug: string) => void;
};

export default function InstrumentSelect({ instruments, value, onChange }: Props) {
  return (
    <div className="rounded-2xl bg-softgrey p-4 sm:p-5">
      <label
        htmlFor="instrumen"
        className="type-micro mb-1.5 block font-semibold uppercase tracking-[0.1em] text-muted"
      >
        Produk
      </label>
      <select
        id="instrumen"
        className="w-full rounded-xl border border-softgrey bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition focus:border-brand sm:max-w-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {instruments.length === 0 && <option value={value}>Memuat…</option>}
        {instruments.map((i) => (
          <option key={i.slug} value={i.slug}>
            {i.label}
          </option>
        ))}
      </select>
      <p className="type-micro mt-2 text-muted">
        Berlaku untuk grafik dan data historis di bawah.
      </p>
    </div>
  );
}