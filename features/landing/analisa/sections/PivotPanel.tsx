"use client";

import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import { formatDate, formatNumber, formatPercent } from "../../../../lib/format";
import { calculatePivot, getPivot } from "../api";
import { priceText } from "../constants";
import type { Instrument, PivotResponse } from "../types";

export type PivotPreset = { slug: string; date: string; id: number };

type Props = {
  instruments: Instrument[];
  preset: PivotPreset | null;
};

type Mode = "historis" | "manual";

type Request =
  | { id: number; mode: "historis"; slug: string; date: string }
  | { id: number; mode: "manual"; high: number; low: number; close: number };

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

const label = "type-micro mb-1.5 block font-semibold uppercase tracking-[0.1em] text-muted";
const field =
  "w-full rounded-xl border border-softgrey bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition focus:border-brand";

export default function PivotPanel({ instruments, preset }: Props) {
  const [mode, setMode] = useState<Mode>("historis");
  const [slug, setSlug] = useState(preset?.slug ?? "gold");
  const [date, setDate] = useState(preset?.date ?? "");
  const [manual, setManual] = useState({ high: "", low: "", close: "" });
  const [formError, setFormError] = useState("");
  const [request, setRequest] = useState<Request>({
    id: 1,
    mode: "historis",
    slug: preset?.slug ?? "gold",
    date: preset?.date ?? "",
  });
  const [result, setResult] = useState<{ id: number; data?: PivotResponse; error?: string } | null>(
    null,
  );

  const loading = result?.id !== request.id;

  useEffect(() => {
    const controller = new AbortController();
    const run =
      request.mode === "historis"
        ? getPivot(request.slug, request.date || undefined, controller.signal)
        : calculatePivot(
            { high: request.high, low: request.low, close: request.close },
            controller.signal,
          );

    run
      .then((data: PivotResponse) =>
        setResult({ id: request.id, data })
      )
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          id: request.id,
          error: e instanceof Error ? e.message : "Perhitungan gagal. Coba lagi.",
        });
      });

    return () => controller.abort();
  }, [request]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (mode === "historis") {
      setRequest((r) => ({ id: r.id + 1, mode: "historis", slug, date }));
      return;
    }

    if (!manual.high || !manual.low || !manual.close) {
      setFormError("Isi nilai High, Low, dan Close terlebih dahulu.");
      return;
    }

    setRequest((r) => ({
      id: r.id + 1,
      mode: "manual",
      high: Number(manual.high),
      low: Number(manual.low),
      close: Number(manual.close),
    }));
  };

  const data = result?.data;
  const current = data?.live?.price;
  const levelRows = ROWS.filter(([, , kind]) => kind !== "m");
  const nearest =
    current == null || !data
      ? null
      : levelRows.reduce((best, [key]) => {
          const value = data.levels[key as keyof typeof data.levels];
          const bestValue = data.levels[best as keyof typeof data.levels];
          return Math.abs(value - current) < Math.abs(bestValue - current) ? key : best;
        }, levelRows[0][0] as string);

  const prefix = request.mode === "historis" ? request.slug : "";

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
          <div className="inline-flex rounded-xl bg-white p-1" role="group" aria-label="Sumber data">
            {(
              [
                ["historis", "Dari Data Historis"],
                ["manual", "Input Manual"],
              ] as const
            ).map(([value, text]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  mode === value ? "bg-brand text-white" : "text-ink hover:bg-softgrey"
                }`}
              >
                {text}
              </button>
            ))}
          </div>

          {mode === "historis" ? (
            <>
              <div>
                <label htmlFor="pivot-instrumen" className={label}>
                  Instrumen
                </label>
                <select
                  id="pivot-instrumen"
                  className={field}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
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
                  Tanggal Dasar (opsional)
                </label>
                <input
                  id="pivot-tanggal"
                  type="date"
                  className={field}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <p className="type-micro mt-1.5 text-muted">
                  Kosongkan untuk memakai hari bursa terakhir sebelum hari ini.
                </p>
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
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90"
          >
            <Calculator size={14} /> Hitung Pivot Point
          </button>
        </form>

        <div>
          {result?.error ? (
            <div role="alert" className="rounded-2xl border border-bear/30 bg-bear/5 p-6 text-center">
              <p className="font-semibold text-ink">{result.error}</p>
            </div>
          ) : !data ? (
            <div className="h-80 animate-pulse rounded-2xl bg-surface" />
          ) : (
            <div className={loading ? "opacity-60" : ""}>
              <div className="flex flex-wrap gap-2 text-xs">
                {data.basis && (
                  <span className="rounded-full bg-softgrey px-3 py-1 font-medium text-ink">
                    Dasar: {formatDate(data.basis.date)} · H {formatNumber(data.basis.high)} · L{" "}
                    {formatNumber(data.basis.low)} · C {formatNumber(data.basis.close)}
                  </span>
                )}
                {data.input && (
                  <span className="rounded-full bg-softgrey px-3 py-1 font-medium text-ink">
                    Input: H {formatNumber(data.input.high)} · L {formatNumber(data.input.low)} · C{" "}
                    {formatNumber(data.input.close)}
                  </span>
                )}
                {data.today_open != null && (
                  <span className="rounded-full bg-sapphire/10 px-3 py-1 font-medium text-sapphire">
                    Open hari ini (real-time): {priceText(prefix, formatNumber(data.today_open))}
                  </span>
                )}
                {data.live && (
                  <span className="rounded-full bg-bull/10 px-3 py-1 font-medium text-bull">
                    Harga live: {priceText(prefix, formatNumber(data.live.price))} (
                    {formatPercent(data.live.change_percent)})
                  </span>
                )}
              </div>

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
                          className={`border-t border-softgrey ${
                            nearest === key ? "bg-sapphire/5" : ""
                          } ${kind === "p" ? "bg-brand/5" : ""}`}
                        >
                          <td
                            className={`px-4 ${kind === "m" ? "py-1.5 pl-8 text-xs italic" : "py-3 font-semibold"} ${tone}`}
                          >
                            {text}
                            {nearest === key && (
                              <span className="ml-2 rounded-full bg-sapphire px-2 py-0.5 text-[10px] font-semibold not-italic text-white">
                                Terdekat dengan harga live
                              </span>
                            )}
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

              <p className="type-micro mt-3 text-muted">
                Level pivot adalah alat bantu analisa teknikal, bukan ajakan atau saran investasi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}