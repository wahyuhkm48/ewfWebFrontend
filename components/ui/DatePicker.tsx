"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id?: string;
  /** Format YYYY-MM-DD, atau "" bila kosong */
  value: string;
  onChange: (value: string) => void;
  /** Batas tanggal (YYYY-MM-DD) */
  min?: string;
  max?: string;
  placeholder?: string;
  ariaLabel?: string;
  /** Sisi tempat popover rata terhadap tombol */
  align?: "left" | "right";
};

type View = "days" | "months" | "years";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

function todayISO() {
  const t = new Date();
  return toISO(t.getFullYear(), t.getMonth(), t.getDate());
}

function parse(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? { year: Number(m[1]), month: Number(m[2]) - 1, day: Number(m[3]) } : null;
}

function formatLabel(value: string) {
  const p = parse(value);
  return p ? `${p.day} ${MONTHS_SHORT[p.month]} ${p.year}` : "";
}

const navBtn =
  "grid h-8 w-8 place-items-center rounded-full text-ink transition hover:bg-softgrey";

export default function DatePicker({
  id,
  value,
  onChange,
  min,
  max,
  placeholder = "Pilih tanggal",
  ariaLabel,
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const [cursor, setCursor] = useState({ year: 2026, month: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const today = todayISO();

  const clamp = (iso: string) => (min && iso < min ? min : max && iso > max ? max : iso);

  const openPicker = () => {
    const now = new Date();
    const start = parse(value) ??
      parse(clamp(today)) ?? { year: now.getFullYear(), month: now.getMonth(), day: 1 };
    setCursor({ year: start.year, month: start.month });
    setView("days");
    setOpen(true);
  };

  // Tutup saat klik di luar atau menekan Esc
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pick = (iso: string) => {
    onChange(iso);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const shiftMonth = (delta: number) =>
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  const shiftYear = (delta: number) => setCursor((c) => ({ ...c, year: c.year + delta }));

  const yearStart = cursor.year - (cursor.year % 12);

  const title =
    view === "days"
      ? `${MONTHS[cursor.month]} ${cursor.year}`
      : view === "months"
        ? String(cursor.year)
        : `${yearStart} – ${yearStart + 11}`;

  const prev = () =>
    view === "days" ? shiftMonth(-1) : view === "months" ? shiftYear(-1) : shiftYear(-12);
  const next = () =>
    view === "days" ? shiftMonth(1) : view === "months" ? shiftYear(1) : shiftYear(12);
  const toggleView = () =>
    setView((v) => (v === "days" ? "months" : v === "months" ? "years" : "days"));

  // Kisi hari: Senin sebagai hari pertama
  const offset = (new Date(cursor.year, cursor.month, 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth(cursor.year, cursor.month) }, (_, i) => i + 1),
  ];

  const selected = parse(value);
  const todayDisabled = (!!min && today < min) || (!!max && today > max);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className={`flex w-full items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 text-left text-[13px] font-medium outline-none transition ${
          value ? "text-ink" : "text-muted"
        } ${
          open
            ? "border-brand ring-4 ring-brand/10"
            : "border-softgrey hover:border-muted/40 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10"
        }`}
      >
        <CalendarDays size={16} className={`shrink-0 ${open ? "text-brand" : "text-muted"}`} />
        <span className="truncate">{value ? formatLabel(value) : placeholder}</span>
      </button>

      <div
        role="dialog"
        aria-label="Pilih tanggal"
        className={`absolute z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top rounded-2xl border border-softgrey bg-white p-4 shadow-xl transition duration-150 ${
          align === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={toggleView}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-ink transition hover:bg-softgrey"
          >
            {title}
          </button>
          <div className="flex items-center gap-1">
            <button type="button" onClick={prev} aria-label="Sebelumnya" className={navBtn}>
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={next} aria-label="Berikutnya" className={navBtn}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Isi */}
        <div className="mt-3">
          {view === "days" && (
            <>
              <div className="grid grid-cols-7 text-center">
                {WEEKDAYS.map((d) => (
                  <span
                    key={d}
                    className="py-1 text-[11px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-y-1">
                {cells.map((d, i) => {
                  if (d === null) return <span key={`blank-${i}`} />;

                  const iso = toISO(cursor.year, cursor.month, d);
                  const disabled = (!!min && iso < min) || (!!max && iso > max);
                  const isSelected = iso === value;
                  const isToday = iso === today;

                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={disabled}
                      aria-pressed={isSelected}
                      aria-label={`${d} ${MONTHS[cursor.month]} ${cursor.year}`}
                      onClick={() => pick(iso)}
                      className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-[13px] font-medium transition ${
                        isSelected
                          ? "bg-brand font-semibold text-white shadow-sm"
                          : disabled
                            ? "cursor-not-allowed text-muted/40"
                            : isToday
                              ? "text-brand ring-1 ring-brand/40 hover:bg-brand/10"
                              : "text-ink hover:bg-softgrey"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {view === "months" && (
            <div className="grid grid-cols-3 gap-2">
              {MONTHS_SHORT.map((name, m) => {
                const start = toISO(cursor.year, m, 1);
                const end = toISO(cursor.year, m, daysInMonth(cursor.year, m));
                const disabled = (!!max && start > max) || (!!min && end < min);
                const isSelected = selected?.year === cursor.year && selected.month === m;

                return (
                  <button
                    key={name}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setCursor({ year: cursor.year, month: m });
                      setView("days");
                    }}
                    className={`rounded-xl py-2.5 text-[13px] font-semibold transition ${
                      isSelected
                        ? "bg-brand text-white"
                        : disabled
                          ? "cursor-not-allowed text-muted/40"
                          : "text-ink hover:bg-softgrey"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          )}

          {view === "years" && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => yearStart + i).map((y) => {
                const disabled =
                  (!!min && y < Number(min.slice(0, 4))) || (!!max && y > Number(max.slice(0, 4)));
                const isSelected = selected?.year === y;

                return (
                  <button
                    key={y}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setCursor((c) => ({ ...c, year: y }));
                      setView("months");
                    }}
                    className={`rounded-xl py-2.5 text-[13px] font-semibold transition ${
                      isSelected
                        ? "bg-brand text-white"
                        : disabled
                          ? "cursor-not-allowed text-muted/40"
                          : "text-ink hover:bg-softgrey"
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-softgrey pt-3">
          <button
            type="button"
            disabled={!value}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="rounded-lg px-2 py-1 text-xs font-semibold text-muted transition enabled:hover:bg-softgrey enabled:hover:text-ink disabled:opacity-40"
          >
            Hapus
          </button>
          <button
            type="button"
            disabled={todayDisabled}
            onClick={() => pick(today)}
            className="rounded-lg px-2 py-1 text-xs font-semibold text-brand transition enabled:hover:bg-brand/10 disabled:text-muted/40"
          >
            Hari ini
          </button>
        </div>
      </div>
    </div>
  );
}