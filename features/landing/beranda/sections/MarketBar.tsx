"use client";

import { useEffect, useState } from "react";
import { getLive } from "@/features/landing/analisa/api";
import { priceText } from "@/features/landing/analisa/constants";
import type { LiveResponse } from "@/features/landing/analisa/types";
import { marketClocks, marketTickers } from "@/features/landing/beranda/data";
import { formatNumber, formatPercent } from "@/lib/format";

const POLL_MS = 15_000; // backend menyimpan cache harga live selama 15 detik

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function zoneAbbr(date: Date, timeZone: string) {
  return (
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? ""
  );
}

/** Jam dari waktu data feed (date_time), diambil dari kuotasi yang paling baru. */
function feedClock(live: LiveResponse | null) {
  const times = Object.values(live?.data ?? {})
    .map((q) => q.time)
    .filter((t): t is string => !!t)
    .sort();
  const latest = times[times.length - 1];

  return latest?.match(/\d{2}:\d{2}:\d{2}/)?.[0] ?? null;
}

export default function MarketBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [live, setLive] = useState<LiveResponse | null>(null);
  const [failed, setFailed] = useState(false);

  // Jam berjalan tiap detik. Baru diisi setelah mount agar tidak beda dengan HTML server.
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  // Harga live dari backend, diperbarui berkala selama tab terlihat.
  useEffect(() => {
    let controller: AbortController | undefined;

    const load = () => {
      if (document.visibilityState === "hidden") return;

      controller?.abort();
      const current = new AbortController();
      controller = current;

      getLive(current.signal)
        .then((res) => {
          setLive(res);
          setFailed(false);
        })
        .catch(() => {
          if (!current.signal.aborted) setFailed(true);
        });
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      clearInterval(id);
      controller?.abort();
    };
  }, []);

  const clock = feedClock(live);

  const statusText = failed
    ? "Harga real-time sedang tidak tersedia"
    : clock
      ? `Diperbarui ${clock}`
      : "Memuat harga…";

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6">
      <div className="grid gap-6 rounded-3xl bg-white p-5 shadow-xl lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {marketClocks.map((c) => {
            const abbr = c.abbr ?? (now ? zoneAbbr(now, c.timeZone) : "");
            return (
              <div key={c.city}>
                <p className="text-[13px] font-semibold text-ink">
                  {abbr ? `${c.city} (${abbr})` : c.city}
                </p>
                <p className="type-data text-muted">
                  {now ? formatClock(now, c.timeZone) : "--:--:--"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-softgrey pt-4 lg:justify-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {marketTickers.map(({ slug, label }) => {
            const quote = live?.data[slug];
            const pct = quote?.change_percent;
            const tone =
              pct == null || pct === 0 ? "text-muted" : pct > 0 ? "text-bull" : "text-bear";

            return (
              <p key={slug} className="text-[13px] font-medium text-muted">
                {label}{" "}
                <span className="type-data text-ink">
                  {quote ? priceText(slug, formatNumber(quote.price)) : "–"}
                </span>{" "}
                <span className={`text-[13px] font-semibold ${tone}`}>
                  {formatPercent(pct)}
                </span>
              </p>
            );
          })}
          <span className="type-micro text-muted">{statusText}</span>
        </div>
      </div>
    </section>
  );
}