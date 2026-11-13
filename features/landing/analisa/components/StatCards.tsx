import { ArrowDownToLine, ArrowUpToLine, Banknote, TrendingDown, TrendingUp } from "lucide-react";
import { formatDate, formatNumber, formatPercent, formatSigned } from "@/lib/format";
import { priceText } from "../constants";
import type { Summary } from "../types";

type Props = {
  summary: Summary | null;
  slug: string;
  loading: boolean;
};

function Card({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl bg-surface p-4 sm:p-5">
      <span className="absolute right-4 top-4 text-sapphire/30">{icon}</span>
      <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
      {children}
    </div>
  );
}

export default function StatCards({ summary, slug, loading }: Props) {
  if (!summary) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-28 rounded-2xl bg-surface ${loading ? "animate-pulse" : ""}`}
          />
        ))}
      </div>
    );
  }

  const { change } = summary;
  const bullish = change.sentiment === "bullish";
  const bearish = change.sentiment === "bearish";
  const tone = bullish ? "text-bull" : bearish ? "text-bear" : "text-muted";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card label="Harga Terakhir" icon={<Banknote size={34} />}>
        <p className="mt-2 text-2xl font-extrabold text-ink">
          {priceText(slug, formatNumber(summary.last_close.value))}
        </p>
        <p className="type-micro mt-1 text-muted">
          Penutupan {formatDate(summary.last_close.date)}
        </p>
      </Card>

      <Card label="Perubahan Harian" icon={bearish ? <TrendingDown size={34} /> : <TrendingUp size={34} />}>
        <p className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`text-2xl font-extrabold ${tone}`}>{formatSigned(change.value)}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              bullish ? "bg-bull/10 text-bull" : bearish ? "bg-bear/10 text-bear" : "bg-softgrey text-muted"
            }`}
          >
            {formatPercent(change.percent)}
          </span>
        </p>
        <p className={`type-micro mt-1 font-medium capitalize ${tone}`}>Sentimen {change.sentiment}</p>
      </Card>

      <Card label="Tertinggi Periode (High)" icon={<ArrowUpToLine size={34} />}>
        <p className="mt-2 text-2xl font-extrabold text-ink">
          {priceText(slug, formatNumber(summary.period_high.value))}
        </p>
        <p className="type-micro mt-1 text-muted">
          Dicapai pada: {formatDate(summary.period_high.date)}
        </p>
      </Card>

      <Card label="Terendah Periode (Low)" icon={<ArrowDownToLine size={34} />}>
        <p className="mt-2 text-2xl font-extrabold text-ink">
          {priceText(slug, formatNumber(summary.period_low.value))}
        </p>
        <p className="type-micro mt-1 text-muted">
          Dicapai pada: {formatDate(summary.period_low.date)}
        </p>
      </Card>
    </div>
  );
}