import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import StrokeText from "@/components/ui/StrokeText";
import GlassChip from "@/components/ui/GlassChip";
import SpecularLink from "@/components/ui/SpecularLink";
import { heroBadges } from "@/features/landing/produk/data";

const HERO_TEXT_SIZE = "clamp(2.25rem, 5vw, 5.5rem)";

export default function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy text-white sm:rounded-[2.5rem]">
        <Image
          src="/images/hero-produk.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/60 to-navy/20" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy/70 to-transparent" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-4 select-none font-display font-extrabold leading-none text-white/10 sm:right-10"
          style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}
        >
          PRODUK
        </span>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:pb-32 lg:pt-40">
          <GlassChip className="text-[10px]! uppercase tracking-[0.12em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Produk Resmi Multilateral
          </GlassChip>

          <h1
            aria-label="Produk Pasar"
            className="mt-5 flex flex-nowrap items-center gap-x-[0.1em]"
            style={{ fontSize: HERO_TEXT_SIZE }}
          >
            <StrokeText
              text="PRODUK"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#f7f5f2"
              fillColor="#f7f5f2"
              className="w-auto! shrink-0"
            />
            <StrokeText
              text="PASAR"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#ec7013"
              fillColor="#ec7013"
              className="w-auto! shrink-0"
            />
          </h1>

          <p className="type-body mt-4 max-w-xl text-white/80">
            Empat produk pilihan dengan data real-time dan analisa harian,
            terdaftar dan diawasi resmi oleh BAPPEBTI.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <SpecularLink href="#produk" variant="primary">
              Bandingkan Produk <ArrowRight size={16} />
            </SpecularLink>
            <SpecularLink href="/analisa" variant="ghost">
              Baca Analisa Pasar <ArrowRight size={16} />
            </SpecularLink>
          </div>

          <p className="type-micro mt-5 max-w-md text-white/50">
            Perdagangan berjangka mengandung risiko tinggi dan tidak cocok
            untuk semua investor.
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {heroBadges.map((b, i) => (
              <li key={b}>
                <GlassChip tone={i === 0 ? "green" : "neutral"}>
                  {i === 0 && <ShieldCheck size={13} className="text-bull" />}
                  {b}
                </GlassChip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}