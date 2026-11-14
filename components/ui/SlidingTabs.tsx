"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

type Option<T extends string> = { value: T; label: ReactNode };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  /** pill = tab utama (bulat besar, role tablist); segment = toggle kecil (role group) */
  variant?: "pill" | "segment";
};

const STYLES = {
  pill: {
    root: "rounded-full bg-white p-1.5 shadow-lg",
    item: "gap-2 rounded-full px-5 py-2.5 text-[13px]",
    indicator: "rounded-full",
  },
  segment: {
    root: "rounded-xl bg-white p-1",
    item: "rounded-lg px-3 py-1.5 text-xs",
    indicator: "rounded-lg",
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
  const placedOnce = useRef(false);

  // Pindahkan pill ke tombol aktif. instant = tanpa animasi (render pertama / resize).
  const place = useCallback(
    (instant: boolean) => {
      const root = rootRef.current;
      const indicator = indicatorRef.current;
      const item = itemRefs.current[index];
      if (!root || !indicator || !item) return;

      if (instant) indicator.style.transition = "none";
      indicator.style.top = `${item.offsetTop}px`;
      indicator.style.height = `${item.offsetHeight}px`;
      indicator.style.width = `${item.offsetWidth}px`;
      indicator.style.transform = `translateX(${item.offsetLeft}px)`;
      if (instant) {
        void indicator.offsetWidth; // paksa reflow agar posisi langsung diterapkan
        indicator.style.transition = "";
      }
      root.dataset.ready = "true";
    },
    [index],
  );

  useLayoutEffect(() => {
    place(!placedOnce.current);
    placedOnce.current = true;
  }, [place]);

  // Ukuran berubah (resize layar, font selesai dimuat): pasang ulang tanpa animasi.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => place(true));
    observer.observe(root);
    return () => observer.disconnect();
  }, [place]);

  return (
    <div
      ref={rootRef}
      role={isTabs ? "tablist" : "group"}
      aria-label={ariaLabel}
      className={`group/tabs relative inline-flex ${styles.root}`}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 bg-brand shadow-sm transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${styles.indicator}`}
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
                ? "bg-brand text-white group-data-[ready=true]/tabs:bg-transparent"
                : "text-ink hover:text-brand"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}