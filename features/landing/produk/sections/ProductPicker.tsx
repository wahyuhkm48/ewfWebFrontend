// features/landing/produk/sections/ProductPicker.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Pill from "@/components/ui/Pill";
import Sparkline from "@/components/ui/Sparkline";
import { productDetails } from "@/features/landing/produk/data";

export default function ProductPicker() {
  return (
    <section
      id="produk"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-25 sm:px-6"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="type-label text-brand">Portofolio Produk</p>
          <h2 className="type-h2 mt-2 text-ink">Pilih Produk Anda</h2>
        </div>
        <p className="type-body max-w-xs text-muted md:text-right">
          Klik untuk melihat spesifikasi lengkap, jam perdagangan, dan analisa
          fundamental harian.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {productDetails.map((p) => (
          <Link
            key={p.slug}
            href={`#${p.slug}`}
            className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-navy p-4 text-white"
          >
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-navy/10" />

            <div className="relative flex items-start justify-between">
              <Pill tone="dark" className="text-[9px]">
                {p.category}
              </Pill>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 backdrop-blur transition group-hover:bg-brand">
                <ArrowUpRight size={14} />
              </span>
            </div>

            <div className="relative">
              <h3 className="type-h3">{p.name}</h3>
              <p className="type-micro mt-1 text-white/70">{p.shortDesc}</p>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/60">
                  {p.metricLabel}
                </p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <div>
                    <p className="type-data">{p.price.replace(" / bbl", "")}</p>
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-bull">
                      <TrendingUp size={11} /> {p.change}
                    </p>
                  </div>
                  <Sparkline points={p.spark} className="text-bull" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}