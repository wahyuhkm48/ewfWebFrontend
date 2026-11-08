// features/landing/produk/sections/ProductDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Pill from "@/components/ui/Pill";
import type { ProductDetail as Product } from "@/features/landing/produk/data";

type Props = { product: Product; reverse?: boolean };

export default function ProductDetail({ product: p, reverse }: Props) {
  const up = p.change.startsWith("+");

  return (
    <article
      id={p.slug}
      className={`scroll-mt-24 rounded-3xl p-6 sm:p-10 ${
        reverse ? "bg-softgrey" : "bg-white shadow-sm"
      }`}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Gambar + kartu harga */}
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-xl">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {p.priceLabel}
                </p>
                <p className="type-h3 text-ink">{p.price}</p>
              </div>
              <span
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
                  up ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"
                }`}
              >
                {p.change} ({p.changeAbs})
              </span>
            </div>
          </div>
        </div>

        {/* Konten */}
        <div>
          <Pill tone={reverse ? "white" : "light"}>{p.category}</Pill>
          <h2 className="type-h2 mt-4 text-ink">{p.title}</h2>
          <p className="mt-3 text-[15px] leading-7 text-muted">{p.desc}</p>

          <p className="type-label mt-6 text-ink">Mengapa Diperdagangkan:</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {p.why.map((w) => (
              <li
                key={w}
                className={`rounded-lg px-3 py-2.5 text-[12px] font-medium text-ink ${
                  reverse ? "bg-white shadow-sm" : "bg-softgrey"
                }`}
              >
                {w}
              </li>
            ))}
          </ul>

          <div
            className={`mt-5 rounded-xl p-4 ${
              reverse ? "bg-white shadow-sm" : "bg-softgrey"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="type-label text-ink">Spesifikasi Kontrak Resmi</p>
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
                Standar Kliring KBI & BBJ
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {p.specs.map((s) => (
                <div key={s.label}>
                  <dt className="type-micro text-muted">{s.label}</dt>
                  <dd className="text-[12px] font-semibold leading-snug text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <Stat label="Perubahan Harian" value={p.change} tone={up ? "up" : "down"} />
            <Stat label="Tertinggi Hari Ini" value={p.high} />
            <Stat label="Terendah Hari Ini" value={p.low} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/analisa"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-brand/90"
            >
              {p.analysisLabel} <ChevronRight size={14} />
            </Link>
            <Link
              href="/analisa"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-ink"
            >
              Lihat Data Historis <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  const color =
    tone === "up" ? "text-bull" : tone === "down" ? "text-bear" : "text-ink";
  return (
    <div>
      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className={`type-data mt-1 ${color}`}>{value}</p>
    </div>
  );
}