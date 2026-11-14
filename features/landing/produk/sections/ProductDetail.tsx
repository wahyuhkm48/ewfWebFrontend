import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProductDetail as Product } from "@/features/landing/produk/data";

type Props = { product: Product; reverse?: boolean };

export default function ProductDetail({ product: p, reverse }: Props) {
  const chip = reverse ? "bg-white shadow-sm" : "bg-softgrey";

  return (
    <article
      id={p.slug}
      className={`scroll-mt-24 rounded-3xl border border-black/5 p-5 shadow-xl lg:flex lg:min-h-[42rem] lg:items-center lg:p-6 ${
        reverse ? "bg-softgrey" : "bg-white"
      }`}
    >
      <div className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/50 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur">
              {p.category}
            </span>
          </div>
        </div>

        <div>
          <h2 className="type-h2 text-ink">{p.name}</h2>
          <p className="mt-1 text-[13px] font-semibold text-brand">{p.ticker}</p>
          <p className="mt-3 text-[14px] leading-6 text-muted">{p.desc}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {p.highlights.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium text-ink ${chip}`}
              >
                <Icon size={14} className="text-brand" />
                {text}
              </li>
            ))}
          </ul>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {p.facts.map((f) => (
              <div key={f.label} className={`rounded-xl p-3.5 ${chip}`}>
                <dt className="type-micro text-muted">{f.label}</dt>
                <dd className="mt-0.5 text-[14px] font-semibold leading-snug text-ink">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] leading-4 text-muted">
            Ukuran lot, margin, dan jam perdagangan lengkap mengikuti dokumen
            kontrak resmi. Tanyakan ke Wakil Pialang Berjangka kami.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/analisa"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90"
            >
              Lihat Analisa <ChevronRight size={14} />
            </Link>
            <Link
              href="/analisa"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-ink"
            >
              Data Historis <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}