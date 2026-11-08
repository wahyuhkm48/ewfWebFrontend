import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

export default function Profile() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-30 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[9fr_11fr] lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[395/420] overflow-hidden rounded-3xl bg-softgrey drop-shadow-[0_24px_32px_rgba(11,27,43,0.30)]">
            <Image
              src="/images/gedung.png"
              alt="Gedung kantor PT Equityworld Futures"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-4 right-5 flex items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-xl ring-1 ring-white/10  drop-shadow-[0_24px_32px_rgba(11,27,43,0.60)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-[15px] font-bold">
              20+
            </span>
            <div>
              <p className="text-[13px] font-semibold">Tahun Dedikasi Resmi</p>
              <p className="type-micro text-white/60">Sejak 2004 di Indonesia</p>
            </div>
          </div>
        </div>

        <div>
          <span className="type-label inline-block rounded-full bg-brand/10 px-3 py-1.5 text-[11px] text-brand">
            Profil Perusahaan
          </span>
          <h2 className="type-h2 mt-4 text-ink">
            Pialang Berjangka Resmi,
            <br className="hidden sm:block" />{" "}
            Berintegritas &amp; Terpercaya
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-muted">
            PT Equityworld Futures merupakan perusahaan pialang berjangka resmi
            anggota Bursa Komoditi dan Derivatif Indonesia (ICDX) serta Lembaga
            Kliring ICH. Berdiri sejak tahun 2004 dengan izin operasional Badan
            Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI).
          </p>
          <p className="mt-5 text-[15px] leading-7 text-muted">
            Kami berkomitmen memberikan fasilitas perdagangan komoditas dan
            finansial berjangka yang aman, transparan, dan terarah dengan
            perlindungan penuh pada Rekening Terpisah (
            <em>Segregated Account</em>) di bank-bank terkemuka Indonesia.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-navy/90"
            >
              Kenali Kami Lebih Dekat <ArrowRight size={14} />
            </Link>
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 rounded-full border border-softgrey bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-softgrey/60"
            >
              <BadgeCheck size={14} className="text-bull" />
              Verifikasi Legalitas BAPPEBTI
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}