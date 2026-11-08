import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SpecularButton from "@/components/ui/SpecularButton";
import SpecularLink from "@/components/ui/SpecularLink";
import { heroBadges } from "@/features/landing/produk/data";
import StrokeText from "@/components/ui/StrokeText";

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

        {/* Teks raksasa dekoratif */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-4 select-none font-display font-extrabold leading-none text-white/10 sm:right-10"
          style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}
        >
          PRODUK
        </span>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:pb-32 lg:pt-40">
          {/* Pill status */}
          <SpecularButton
            size="sm"
            radius={999}
            tint="#ec7013"
            tintOpacity={0.15}
            lineColor="#ffb27a"
            baseColor="#ec7013"
            textColor="#ffffff"
            blur={6}
            className="px-3! py-1.5! text-[10px]! uppercase tracking-[0.12em]! cursor-default!"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Produk Resmi Multilateral
          </SpecularButton>
          
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

          {/* CTA */}
          <div className="mt-7 flex flex-wrap gap-3">
            <SpecularLink
              href="#produk"
              size="sm"
              radius={999}
              tint="#ec7013"
              tintOpacity={0.9}
              lineColor="#ffd2ad"
              baseColor="#ec7013"
              textColor="#ffffff"
              blur={4}
              className="px-6! py-3! text-[13px]! font-semibold! shadow-[0_10px_30px_-8px_rgba(236,112,19,0.7)]!"
            >
              Bandingkan Produk <ArrowRight size={16} />
            </SpecularLink>

            <SpecularLink
              href="/analisa"
              size="sm"
              radius={999}
              tint="#ffffff"
              tintOpacity={0.06}
              lineColor="#ffffff"
              baseColor="#525252"
              textColor="#ffffff"
              blur={6}
              className="px-6! py-3! text-[13px]! font-semibold!"
            >
              Baca Analisa Pasar <ArrowRight size={16} />
            </SpecularLink>
          </div>

          <p className="type-micro mt-5 max-w-md text-white/50">
            Perdagangan berjangka mengandung risiko tinggi dan tidak cocok
            untuk semua investor.
          </p>

          {/* Badge legalitas */}
          <ul className="mt-10 flex flex-wrap gap-3">
            {heroBadges.map((b, i) => {
              const isLegal = i === 0;
              return (
                <li key={b}>
                  <SpecularButton
                    size="sm"
                    radius={999}
                    tint={isLegal ? "#16a34a" : "#ffffff"}
                    tintOpacity={isLegal ? 0.2 : 0.06}
                    lineColor={isLegal ? "#4ade80" : "#ffffff"}
                    baseColor={isLegal ? "#16a34a" : "#525252"}
                    textColor="#ffffff"
                    blur={6}
                    className="px-3! py-1.5! text-[11px]! cursor-default!"
                  >
                    {isLegal && <ShieldCheck size={13} className="text-bull" />}
                    {b}
                  </SpecularButton>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}