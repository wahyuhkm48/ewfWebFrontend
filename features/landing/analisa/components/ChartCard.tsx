"use client";

import { useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import TradingViewChart from "@/components/ui/TradingViewChart";
import SlidingTabs from "@/components/ui/SlidingTabs";
import { INTERVALS } from "../constants";
import type { Interval } from "../types";

type Props = {
  short: string;
  symbol: string | null;
  /** Widget hanya dibuat saat tab terlihat agar ukurannya benar. */
  active: boolean;
};

export default function ChartCard({ short, symbol, active }: Props) {
  const [interval, setIntervalValue] = useState<Interval>("daily");
  const [style, setStyle] = useState<"1" | "3">("1");
  const frameRef = useRef<HTMLDivElement>(null);
  const meta = INTERVALS.find((i) => i.value === interval) ?? INTERVALS[0];

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  };

  return (
    <div className="rounded-2xl border border-softgrey p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="type-h3 text-ink">Grafik Pergerakan {short}</h3>
          <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-semibold text-white">
            {style === "1" ? "Candlestick" : "Area"} {meta.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SlidingTabs
            variant="soft"
            ariaLabel="Interval grafik"
            value={interval}
            onChange={setIntervalValue}
            options={INTERVALS.map((i) => ({ value: i.value, label: i.label }))}
          />
          <SlidingTabs
            variant="soft"
            ariaLabel="Tipe grafik"
            value={style}
            onChange={setStyle}
            options={[
              { value: "3", label: "Area Chart" },
              { value: "1", label: "Candlestick" },
            ]}
          />
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Layar penuh"
            className="grid h-9 w-9 place-items-center rounded-xl bg-softgrey text-ink transition hover:bg-softgrey/70"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      <div ref={frameRef} className="mt-4 h-[420px] overflow-hidden rounded-xl bg-white">
        {active && symbol ? (
          <TradingViewChart
            symbol={symbol}
            interval={meta.tradingview}
            style={style}
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-surface" />
        )}
      </div>
    </div>
  );
}