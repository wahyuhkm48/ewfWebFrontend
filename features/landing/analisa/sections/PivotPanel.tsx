"use client";

import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import SlidingTabs from "@/components/ui/SlidingTabs";
import { formatDate, formatNumber, formatSigned } from "../../../../lib/format";
import { calculatePivot, getPivot } from "../api";
import { priceText } from "../constants";
import type { Instrument, PivotResponse } from "../types";

export type PivotPreset = { slug: string; date: string; id: number };

type Props = {
  instruments: Instrument[];
  preset: PivotPreset | null;
};

type Mode = "historis" | "manual";

type RequestInput =
  | { mode: "historis"; slug: string; date: string }
  | { mode: "manual"; high: number; low: number; close: number };

type Request = RequestInput & { id: number };

function isSameInput(a: RequestInput, b: RequestInput) {
  if (a.mode === "historis") {
    return b.mode === "historis" && a.slug === b.slug && a.date === b.date;
  }
  return b.mode === "manual" && a.high === b.high && a.low === b.low && a.close === b.close;
}

const ROWS = [
  ["resistance4", "R4", "r"],
  ["r4_r3", "Midpoint R4 – R3", "m"],
  ["resistance3", "R3", "r"],
  ["r3_r2", "Midpoint R3 – R2", "m"],
  ["resistance2", "R2", "r"],
  ["r2_r1", "Midpoint R2 – R1", "m"],
  ["resistance1", "R1", "r"],
  ["r1_pp", "Midpoint R1 – PP", "m"],
  ["pivot_point", "Pivot Point (PP)", "p"],
  ["pp_s1", "Midpoint PP – S1", "m"],
  ["support1", "S1", "s"],
  ["s1_s2", "Midpoint S1 – S2", "m"],
  ["support2", "S2", "s"],
  ["s2_s3", "Midpoint S2 – S3", "m"],
  ["support3", "S3", "s"],
  ["s3_s4", "Midpoint S3 – S4", "m"],
  ["support4", "S4", "s"],
] as const;

// Nilai "bias" berasal dari backend; yang ditampilkan ke pengunjung hanya BUY / SELL / NETRAL.
const ACTIONS = [
  {
    bias: "bullish",
    rule: "Open > PP",
    label: "BUY",
    badge: "bg-bull text-white",
    box: "border-bull bg-bull/10 text-bull",
    relation: "di atas",
  },
  {
    bias: "bearish",
    rule: "Open < PP",
    label: "SELL",
    badge: "bg-bear text-white",
    box: "border-bear bg-bear/10 text-bear",
    relation: "di bawah",
  },
  {
    bias: "netral",
    rule: "Open = PP",
    label: "NETRAL",
    badge: "bg-muted text-white",
    box: "border-muted bg-softgrey text-ink",
    relation: "sama dengan",
  },
] as const;

const label = "type-micro mb-1.5 block font-semibold uppercase tracking-[0.1em] text-muted";
const field =
  "w-full rounded-xl border border-softgrey bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition focus:border-brand";

export default function PivotPanel({ instruments, preset }: Props) {
  const [mode, setMode] = useState<Mode>("historis");
  const [slug, setSlug] = useState(preset?.slug ?? "gold");
  const [date, setDate] = useState(preset?.date ?? "");
  const [manual, setManual] = useState({ high: "", low: "", close: "" });
  const [formError, setFormError] = useState("");

  // Tanpa preset, hasil baru muncul setelah tombol "Hitung Pivot Point" diklik.
  // Preset datang dari tombol Pivot di tabel historis, jadi langsung dihitung.
  const [request, setRequest] = useState<Request | null>(
    preset ? { id: 1, mode: "historis", slug: preset.slug, date: preset.date } : null,
  );
  const [result, setResult] = useState<{ id: number; data?: PivotResponse; error?: string } | null>(
    null,
  );

  const loading = request !== null && result?.id !== request.id;

  useEffect(() => {
    if (!request) return;

    const { id } = request;
    const controller = new AbortController();
    const run =
      request.mode === "historis"
        ? getPivot(request.slug, request.date || undefined, controller.signal)
        : calculatePivot(
            { high: request.high, low: request.low, close: request.close },
            controller.signal,
          );

    run
      .then((data: PivotResponse) => setResult({ id, data }))
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          id,
          error: e instanceof Error ? e.message : "Perhitungan gagal. Coba lagi.",
        });
      });

    return () => controller.abort();
  }, [request]);

  // Isi form saat ini, dalam bentuk yang sama dengan request.
  const draft: RequestInput | null =
    mode === "historis"
      ? { mode: "historis", slug, date }
      : manual.high && manual.low && manual.close
        ? {
            mode: "manual",
            high: Number(manual.high),
            low: Number(manual.low),
            close: Number(manual.close),
          }
        : null;

  // Hasil untuk input yang sama sudah tampil: tidak perlu menghitung ulang.
  const upToDate =
    request !== null &&
    result !== null &&
    result.id === request.id &&
    !result.error &&
    draft !== null &&
    isSameInput(request, draft);

const submit = (e: React.FormEvent) => {
  e.preventDefault();
  setFormError("");

  if (mode === "historis") {
    const missing = [!slug && "produk", !date && "tanggal"].filter(Boolean);
    if (missing.length > 0) {
      setFormError(`Pilih ${missing.join(" dan ")} terlebih dahulu.`);
      return;
    }
  }

  if (!draft) {
    setFormError("Isi nilai High, Low, dan Close terlebih dahulu.");
    return;
  }
  if (loading || upToDate) return;

  setRequest((r) => ({ ...draft, id: (r?.id ?? 0) + 1 }));
};

  const data = result?.data;

  const prefix = request?.mode === "historis" ? request.slug : "";

  // Kartu OHLC: dari hari bursa acuan (mode historis) atau nilai input (mode manual, tanpa Open).
  const ohlc = data?.basis
    ? {
        open: data.basis.open as number | null,
        high: data.basis.high,
        low: data.basis.low,
        close: data.basis.close,
      }
    : data?.input
      ? { open: null as number | null, ...data.input }
      : null;
  const cards = ohlc
    ? ([
        ["Open", ohlc.open],
        ["High", ohlc.high],
        ["Low", ohlc.low],
        ["Close", ohlc.close],
      ] as const)
    : [];

  const signal = data?.signal ?? null;
  const action = signal ? (ACTIONS.find((a) => a.bias === signal.bias) ?? ACTIONS[2]) : null;

  return (
    <div className="rounded-3xl border border-softgrey bg-white p-5 shadow-sm sm:p-8">
      <div className="border-b border-softgrey pb-6">
        <p className="type-label flex items-center gap-2 text-brand">
          <Calculator size={14} /> Pivot Point
        </p>
        <h2 className="type-h2 mt-2 text-ink">Kalkulator Pivot Point</h2>
        <p className="type-body mt-1 text-muted">
          Hitung level support, resistance, dan midpoint dari data historis resmi atau dari nilai
          High, Low, dan Close yang Anda masukkan.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-softgrey p-5">
          <SlidingTabs
            ariaLabel="Sumber data"
            value={mode}
            onChange={setMode}
            options={[
              { value: "historis", label: "Dari Data Historis" },
              { value: "manual", label: "Input Manual" },
            ]}
          />

          {mode === "historis" ? (
            <>
              <div>
                <label htmlFor="pivot-instrumen" className={label}>
                  Produk
                </label>
                <select
                  id="pivot-instrumen"
                  className={field}
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setFormError("");
                  }}
                >
                  {instruments.length === 0 && <option value={slug}>Memuat…</option>}
                  {instruments.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pivot-tanggal" className={label}>
                  Tanggal
                </label>
                <input
                  id="pivot-tanggal"
                  type="date"
                  className={field}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setFormError("");
                  }}
                />
              </div>
            </>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {(["high", "low", "close"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={`pivot-${k}`} className={label}>
                    {k}
                  </label>
                  <input
                    id={`pivot-${k}`}
                    type="number"
                    step="any"
                    inputMode="decimal"
                    className={field}
                    value={manual[k]}
                    onChange={(e) => setManual((m) => ({ ...m, [k]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          )}

          {formError && (
            <p role="alert" className="text-xs font-medium text-bear">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || upToDate}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Calculator size={14} /> {loading ? "Menghitung…" : "Hitung Pivot Point"}
          </button>
        </form>

        <div>
          {!request ? (
            <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-softgrey bg-surface p-8 text-center">
              <div>
                <Calculator size={28} className="mx-auto text-muted" />
                <p className="mt-3 font-semibold text-ink">Belum ada perhitungan</p>
                <p className="type-body mt-1 text-muted">
                  Pilih produk dan tanggal, lalu klik “Hitung Pivot Point” untuk menampilkan level pivot.
                </p>
              </div>
            </div>
          ) : !loading && result?.error ? (
            <div role="alert" className="rounded-2xl border border-bear/30 bg-bear/5 p-6 text-center">
              <p className="font-semibold text-ink">{result.error}</p>
            </div>
          ) : !data ? (
            <div className="h-80 animate-pulse rounded-2xl bg-surface" />
          ) : (
            <div className={loading ? "opacity-60" : ""}>
                {/* Tanggal */}
                {data.basis ? (
                  <div className="flex flex-wrap gap-x-10 gap-y-3">
                    <div>
                      <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">
                        Tanggal Pivot Point
                      </p>
                      <p className="font-display text-lg font-extrabold text-ink">
                        {formatDate(data.target_date ?? data.basis.date)}
                      </p>
                    </div>
                    <div>
                      <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">
                        Tanggal Data
                      </p>
                      <p className="font-display text-lg font-extrabold text-ink">
                        {formatDate(data.basis.date)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">
                      Sumber Data
                    </p>
                    <p className="font-display text-lg font-extrabold text-ink">Input Manual</p>
                  </div>
                )}

              {/* Kartu OHLC */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {cards.map(([name, value]) => (
                  <div key={name} className="rounded-2xl bg-softgrey p-3">
                    <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">
                      {name}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-ink xl:text-lg">
                      {value == null ? "–" : priceText(prefix, formatNumber(value))}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tabel pivot point */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-softgrey">
                <table className="w-full text-[13px]">
                  <thead className="bg-navy text-left text-white">
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
                        Level
                      </th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.1em]">
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map(([key, text, kind]) => {
                      const value =
                        kind === "m"
                          ? data.midpoints[key as keyof typeof data.midpoints]
                          : data.levels[key as keyof typeof data.levels];
                      const tone =
                        kind === "r"
                          ? "text-bear"
                          : kind === "s"
                            ? "text-bull"
                            : kind === "p"
                              ? "text-brand"
                              : "text-muted";

                      return (
                        <tr
                          key={key}
                          className={`border-t border-softgrey ${kind === "p" ? "bg-brand/5" : ""}`}
                        >
                          <td
                            className={`px-4 ${kind === "m" ? "py-1.5 pl-8 text-xs italic" : "py-3 font-semibold"} ${tone}`}
                          >
                            {text}
                          </td>
                          <td
                            className={`px-4 text-right ${kind === "m" ? "py-1.5 text-xs text-muted" : "py-3 font-semibold text-ink"}`}
                          >
                            {formatNumber(value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Indikator aksi */}
              <div className="mt-4 rounded-2xl border border-softgrey p-4">
                <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">
                  Indikator Aksi
                </p>

                {signal && action ? (
                  <>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className={`rounded-xl px-5 py-2 text-lg font-extrabold ${action.badge}`}>
                        {action.label}
                      </span>
                      <p className="text-[13px] font-medium text-ink">
                        Open {priceText(prefix, formatNumber(signal.open))} {action.relation} PP{" "}
                        {formatNumber(signal.pivot_point)} (selisih {formatSigned(signal.diff)})
                      </p>
                    </div>

                    <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                      {ACTIONS.map((a) => (
                        <li
                          key={a.bias}
                          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold ${
                            a.bias === signal.bias ? a.box : "border-softgrey text-muted"
                          }`}
                        >
                          <span>{a.rule}</span>
                          <span>{a.label}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-2 text-[13px] text-muted">
                    {data.basis
                      ? "Harga Open untuk tanggal analisa belum tersedia."
                      : "Indikator aksi memerlukan harga Open, jadi hanya tersedia pada mode “Dari Data Historis”."}
                  </p>
                )}
              </div>

              <p className="type-micro mt-3 text-muted">
                Level pivot dan indikator aksi adalah alat bantu analisa teknikal, bukan ajakan atau
                saran investasi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}