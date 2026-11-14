"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageRange } from "@/lib/pagination";

type Props = {
  current: number;
  last: number;
  onChange: (page: number) => void;
};

const BAR_WIDTH = 20; // sama dengan kelas w-5 pada garis penanda

export default function HistoryPagination({ current, last, onChange }: Props) {
  // Halaman tujuan sementara: garis langsung bergeser saat diklik,
  // tanpa menunggu data halaman baru selesai dimuat.
  const [prevCurrent, setPrevCurrent] = useState(current);
  const [target, setTarget] = useState<number | null>(null);
  if (prevCurrent !== current) {
    setPrevCurrent(current);
    setTarget(null);
  }
  const shown = target ?? current;

  const wrapRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const shownRef = useRef(shown);
  const placedOnce = useRef(false);

  const place = useCallback((instant: boolean) => {
    const indicator = indicatorRef.current;
    const item = itemRefs.current[shownRef.current];
    if (!indicator || !item) return;

    if (instant) indicator.style.transition = "none";
    indicator.style.top = `${item.offsetTop + item.offsetHeight - 5}px`;
    indicator.style.transform = `translateX(${
      item.offsetLeft + (item.offsetWidth - BAR_WIDTH) / 2
    }px)`;
    indicator.style.opacity = "1";
    if (instant) {
      void indicator.offsetWidth; // paksa reflow agar posisi langsung diterapkan
      indicator.style.transition = "";
    }
  }, []);

  useLayoutEffect(() => {
    shownRef.current = shown;
    place(!placedOnce.current);
    placedOnce.current = true;
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(() => place(true));
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [place]);

  const choose = (page: number) => {
    if (page < 1 || page > last || page === shown) return;
    setTarget(page);
    onChange(page);
  };

  const arrow = "grid h-8 w-8 place-items-center rounded-full transition-colors";

  return (
    <nav
      aria-label="Halaman data historis"
      className="inline-flex items-center gap-2 rounded-full bg-white px-1.5 py-1 shadow-lg ring-1 ring-softgrey"
    >
      <button
        type="button"
        onClick={() => choose(shown - 1)}
        disabled={shown <= 1}
        aria-label="Halaman sebelumnya"
        className={`${arrow} text-brand enabled:hover:bg-softgrey disabled:text-muted/40`}
      >
        <ChevronLeft size={18} />
      </button>

      <div ref={wrapRef} className="relative">
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-0.5 w-5 rounded-full bg-brand opacity-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        />

        <ul className="flex items-center gap-1">
          {pageRange(shown, last).map((p, i) =>
            p === "gap" ? (
              <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-sm text-muted">
                …
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  ref={(el) => {
                    itemRefs.current[p] = el;
                  }}
                  onClick={() => choose(p)}
                  aria-current={p === shown ? "page" : undefined}
                  className={`grid h-8 min-w-8 place-items-center px-1 text-sm font-semibold transition-colors duration-300 ${
                    p === shown ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {p}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => choose(shown + 1)}
        disabled={shown >= last}
        aria-label="Halaman berikutnya"
        className={`${arrow} text-brand enabled:hover:bg-softgrey disabled:text-muted/40`}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}