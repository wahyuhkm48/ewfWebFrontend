"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Option<T extends string> = { value: T; label: ReactNode };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
    /**
   * pill    = tab utama (bulat besar, pill oranye, role tablist)
   * segment = toggle kecil dengan pill oranye
   * soft    = toggle kecil berlatar abu-abu dengan pill putih
   * track   = pilihan sekunder: landasan abu-abu lembut, pill oranye, tanpa bayangan tebal
   */
  variant?: "pill" | "segment" | "soft" | "track";
};

const STYLES = {
  pill: {
    root: "rounded-full bg-white p-1.5 shadow-lg",
    item: "gap-2 rounded-full px-5 py-2.5 text-[13px]",
    indicator: "rounded-full bg-brand shadow-sm",
    active: "text-white",
    activeFallback: "bg-brand",
    inactive: "text-ink hover:text-brand",
  },
  segment: {
    root: "rounded-xl bg-white p-1",
    item: "rounded-lg px-3 py-1.5 text-xs",
    indicator: "rounded-lg bg-brand shadow-sm",
    active: "text-white",
    activeFallback: "bg-brand",
    inactive: "text-ink hover:text-brand",
  },
  soft: {
    root: "rounded-xl bg-softgrey p-1",
    item: "rounded-lg px-3 py-1.5 text-xs",
    indicator: "rounded-lg bg-white shadow-sm",
    active: "text-ink",
    activeFallback: "bg-white shadow-sm",
    inactive: "text-muted hover:text-ink",
  },
  track: {
    root: "rounded-full bg-softgrey p-1.5",
    item: "rounded-full px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-[13px]",
    indicator: "rounded-full bg-brand shadow-sm",
    active: "text-white",
    activeFallback: "bg-brand",
    inactive: "text-ink hover:text-brand",
  },
} as const;

export default function SlidingTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  variant = "segment",
}: Props<T>) {
  const styles = STYLES[variant];
  const isTabs = variant === "pill";
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indexRef = useRef(index);
  const placedOnce = useRef(false);
  const [ready, setReady] = useState(false);

  // Fungsi ini sengaja stabil (tidak berubah antar render). Kalau berubah, ResizeObserver
  // dibuat ulang tiap tab berganti dan callback awalnya membatalkan animasi.
  const place = useCallback((instant: boolean) => {
    const indicator = indicatorRef.current;
    const item = itemRefs.current[indexRef.current];
    if (!indicator || !item) return;

    if (instant) indicator.style.transition = "none";
    indicator.style.top = `${item.offsetTop}px`;
    indicator.style.height = `${item.offsetHeight}px`;
    indicator.style.width = `${item.offsetWidth}px`;
    indicator.style.transform = `translateX(${item.offsetLeft}px)`;
    if (instant) {
      void indicator.offsetWidth; // paksa reflow agar posisi langsung diterapkan
      indicator.style.transition = "";
    }
  }, []);

  // Tab berganti: geser pill (render pertama langsung tanpa animasi).
  useLayoutEffect(() => {
    indexRef.current = index;
    place(!placedOnce.current);
    placedOnce.current = true;
  }, [index, place]);

  // Ukuran berubah (resize layar, font selesai dimuat, panel yang tadinya
  // tersembunyi jadi terlihat): pasang ulang tanpa animasi.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => place(true));
    observer.observe(root);
    return () => observer.disconnect();
  }, [place]);

  // Sebelum pill terpasang, tombol aktif memakai latarnya sendiri agar tetap terbaca.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={rootRef}
      role={isTabs ? "tablist" : "group"}
      aria-label={ariaLabel}
      className={`relative inline-flex ${styles.root}`}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${styles.indicator}`}
      />

      {options.map((option, i) => {
        const active = i === index;
        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            role={isTabs ? "tab" : undefined}
            aria-selected={isTabs ? active : undefined}
            aria-pressed={isTabs ? undefined : active}
            onClick={() => onChange(option.value)}
            className={`relative z-10 inline-flex items-center justify-center font-semibold transition-colors duration-300 ${styles.item} ${
              active
                ? ready
                  ? styles.active
                  : `${styles.active} ${styles.activeFallback}`
                : styles.inactive
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}