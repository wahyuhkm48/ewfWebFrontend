import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Lock, Network } from "lucide-react";
import StrokeText from "@/components/ui/StrokeText";
import SpecularButton from "@/components/ui/SpecularButton";

const HERO_TEXT_SIZE = "clamp(1.5rem, 4.2vw, 3.25rem)";

function Chip({
  children,
  green = false,
}: {
  children: React.ReactNode;
  green?: boolean;
}) {
  return (
    <SpecularButton
      tabIndex={-1}
      size="sm"
      radius={999}
      blur={8}
      textColor="#ffffff"
      tint={green ? "#16a34a" : "#ffffff"}
      tintOpacity={green ? 0.25 : 0.08}
      lineColor={green ? "#4ade80" : "#ffffff"}
      baseColor={green ? "#16a34a" : "#64748b"}
      className="cursor-default! gap-1.5! px-3! py-1.5! text-[11px]! font-medium!"
    >
      {children}
    </SpecularButton>
  );
}

export default function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy text-white sm:rounded-[2.5rem]">
        <Image
          src="/images/tentang-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/60 to-navy/20" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-navy/40" />

        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-[0.2em] select-none text-center font-display text-[clamp(4rem,17vw,15rem)] font-extrabold leading-none text-white/[0.07]"
        >
          EQUITYWORLD
        </p>

        <div className="relative mx-auto max-w-7xl px-4 pb-44 pt-32 sm:px-6 lg:pb-56 lg:pt-40">
          <div className="flex flex-wrap gap-2">
            <Chip>
              <span className="h-1.5 w-1.5 rounded-full bg-bull" />
              Pialang Berjangka Terdaftar BAPPEBTI
            </Chip>
            <Chip>
              <BadgeCheck size={13} className="text-sapphire" />
              Izin No. 549/BAPPEBTI/SI/IX/2004
            </Chip>
          </div>

          <h1 className="mt-6" aria-label="Mengenal Lebih Dekat Trust by Equityworld">
            <StrokeText
              text="MENGENAL LEBIH DEKAT"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#ffffff"
              fillColor="#ffffff"
            />
            <StrokeText
              text="TRUST BY EQUITYWORLD"
              align="left"
              size={HERO_TEXT_SIZE}
              strokeColor="#ec7013"
              fillColor="#ec7013"
              className="-mt-[0.43em]"
            />
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/80">
            Dedikasi lebih dari dua dekade menghadirkan ekosistem perdagangan
            berjangka yang transparan, teregulasi resmi BAPPEBTI, dan
            berorientasi pada keamanan investasi nasabah di seluruh Indonesia.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            <li>
              <Chip>20+ Tahun Pengalaman Pialang</Chip>
            </li>
            <li>
              <Chip>7 Kantor Operasional di 5 Kota</Chip>
            </li>
            <li>
              <Chip green>
                <Lock size={12} />
                100% Rekening Terpisah (Segregated)
              </Chip>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#profil"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold shadow-[0_10px_30px_-8px_rgba(236,112,19,0.7)] transition hover:bg-brand/90"
            >
              Profil Perusahaan <ArrowRight size={16} />
            </Link>
            <Link
              href="#legalitas"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[13px] font-semibold transition hover:bg-white/10"
            >
              <Network size={16} /> Struktur Legalitas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}