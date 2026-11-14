"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Contoh: "OANDA:XAUUSD" */
  symbol: string;
  interval?: "1" | "30" | "60" | "D" | "W" | "M";
  /** "1" = candlestick, "3" = area */
  style?: "1" | "3";
  className?: string;
};

const SCRIPT_SRC =
  "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

export default function TradingViewChart({
  symbol,
  interval = "D",
  style = "1",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.width = "100%";
    widget.style.height = "100%";

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval,
      locale: "en",
      save_image: false,
      style,
      symbol,
      theme: "light",
      timezone: "Asia/Jakarta",
      backgroundColor: "#ffffff",
      gridColor: "rgba(46, 46, 46, 0.2)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      support_host: "https://www.tradingview.com",
      width: "100%",
      height: "100%",
    });

    container.append(widget, script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, interval, style]);

  return (
    <div
      ref={containerRef}
      className={`tradingview-widget-container ${className}`}
    />
  );
}