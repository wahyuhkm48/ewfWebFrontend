import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StrokeText from "@/components/ui/StrokeText";
import GlassChip from "@/components/ui/GlassChip";
import SpecularLink from "@/components/ui/SpecularLink";
import { heroChips } from "../data";
import { HERO_FRAME } from "@/features/landing/shared/hero";
import { delay } from "@/lib/reveal";

const HERO_TEXT_SIZE = "clamp(2.25rem, 5vw, 5rem)";

export default function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className={`${HERO_FRAME} flex-col lg:flex-row`}>
        <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src="/images/hero-magang.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-navy/50 via-transparent to-navy lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/60 lg:to-navy/20" />

          <span
            aria-hidden="true"
            className="hero-rise pointer-events-none absolute inset-x-0 bottom-2 select-none text-center font-display text-[clamp(3.5rem,18vw,6rem)] font-extrabold leading-none text-white/25 lg:inset-x-auto lg:-bottom-6 lg:right-10 lg:text-[clamp(5rem,16vw,14rem)] lg:text-white/10"
            style={delay(300)}
          >
            KARIER
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-navy/70 to-transparent lg:h-32" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 sm:pb-12 lg:pb-32 lg:pt-40">
          <h1
            aria-label="Magang & Karier"
            className="flex flex-wrap items-center gap-x-[0.2em]"
            style={{ fontSize: HERO_TEXT_SIZE }}
          >
            <StrokeText
              text="MAGANG &"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#f7f5f2"
              fillColor="#f7f5f2"
              className="w-auto! shrink-0"
            />
            <StrokeText
              text="KARIER"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#ec7013"
              fillColor="#ec7013"
              className="w-auto! shrink-0"
            />
          </h1>

          <p className="hero-rise type-body mt-4 max-w-xl text-white/80" style={delay(450)}>
            Belajar langsung di industri perdagangan berjangka dan kembangkan
            karier Anda bersama Equityworld Futures, perusahaan yang diawasi
            BAPPEBTI.
          </p>

          <div className="hero-rise mt-7 flex flex-wrap gap-3" style={delay(600)}>
            <SpecularLink href="#program" variant="primary" className="grow sm:grow-0">
              Lihat Program <ArrowRight size={16} />
            </SpecularLink>
            <SpecularLink href="#perjalanan" variant="ghost" className="grow sm:grow-0">
              Perjalanan Magang <ArrowRight size={16} />
            </SpecularLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3 lg:mt-10">
            {heroChips.map((c, i) => (
              <li key={c} className="hero-rise" style={delay(750 + i * 100)}>
                <GlassChip tone={i === 0 ? "green" : "neutral"}>{c}</GlassChip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}