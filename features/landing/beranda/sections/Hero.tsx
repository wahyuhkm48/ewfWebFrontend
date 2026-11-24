import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StrokeText from "@/components/ui/StrokeText";
import { heroTags } from "@/features/landing/beranda/data";
import GlassChip from "@/components/ui/GlassChip";
import SpecularLink from "@/components/ui/SpecularLink";
import { HERO_FRAME, HERO_INNER } from "@/features/landing/shared/hero";
import { delay } from "@/lib/reveal";

const HERO_TEXT_SIZE = "clamp(2.25rem, 4.1vw, 5rem)";

export default function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className={HERO_FRAME}>
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover object-[70%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-navy/60 to-navy/90 lg:bg-linear-to-r lg:from-navy/95 lg:via-navy/55 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy/70 to-transparent" />

        <div className={`${HERO_INNER} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <h1 aria-label="Trading with Trust">
              <StrokeText
                text="TRADING WITH"
                align="left"
                size={HERO_TEXT_SIZE}
                strokeColor="#f7f5f2"
                fillColor="#f7f5f2"
              />
              <StrokeText
                text="TRUST"
                align="left"
                size={HERO_TEXT_SIZE}
                strokeColor="#ec7013"
                fillColor="#ec7013"
                className="-mt-[0.43em]"
              />
            </h1>

            <p className="hero-rise type-body mt-5 max-w-lg text-white/80" style={delay(450)}>
              Akses perdagangan emas, minyak mentah, serta indeks Hang Seng dan
              Nikkei 225 dengan data pasar real-time, analisa harian, dan
              platform yang diawasi regulator.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {heroTags.map((t, i) => (
                <li key={t} className="hero-rise" style={delay(650 + i * 80)}>
                  <GlassChip tone={i === heroTags.length - 1 ? "green" : "neutral"}>{t}</GlassChip>
                </li>
              ))}
            </ul>

            <div className="hero-rise mt-7 flex flex-wrap gap-3" style={delay(950)}>
              <SpecularLink href="/tentang-kami" variant="primary" className="grow sm:grow-0">
                Kenali Kami <ArrowRight size={16} />
              </SpecularLink>
              <SpecularLink href="/magang-karier" variant="ghost" className="grow sm:grow-0">
                Magang & Karier <ArrowRight size={16} />
              </SpecularLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}