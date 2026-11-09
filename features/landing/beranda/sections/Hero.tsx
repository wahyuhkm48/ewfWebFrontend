import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StrokeText from "@/components/ui/StrokeText";
import { heroTags } from "@/features/landing/beranda/data";
import GlassChip from "@/components/ui/GlassChip";
import SpecularLink from "@/components/ui/SpecularLink";

const HERO_TEXT_SIZE = "clamp(2.25rem, 4.1vw, 5rem)";

export default function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy text-white sm:rounded-[2.5rem]">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy/70 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-28 pt-32 sm:px-6 lg:grid-cols-2 lg:pb-36 lg:pt-40">
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

            <p className="type-body mt-5 max-w-lg text-white/80">
              Akses perdagangan emas, minyak mentah, serta indeks Hang Seng dan
              Nikkei 225 dengan data pasar real-time, analisa harian, dan
              platform yang diawasi regulator.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {heroTags.map((t, i) => (
                <li key={t}>
                  <GlassChip tone={i === heroTags.length - 1 ? "green" : "neutral"}>
                    {t}
                  </GlassChip>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <SpecularLink href="/tentang-kami" variant="primary">
                Kenali Kami <ArrowRight size={16} />
              </SpecularLink>
              <SpecularLink href="/produk" variant="ghost">
                Lihat Produk <ArrowRight size={16} />
              </SpecularLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}