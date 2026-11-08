import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Profile() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="grid items-center gap-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-2xl bg-softgrey lg:h-[26rem]">
          <Image
            src="/images/gedung.png"
            alt="Gedung kantor PT Equityworld Futures"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-3 shadow-lg">
            <p className="type-h3 text-brand">20+</p>
            <p className="text-[13px] font-semibold text-ink">Tahun Dedikasi Resmi</p>
            <p className="type-micro text-muted">Sejak 2004 di Indonesia</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Profil Perusahaan"
            title="Pialang Berjangka Resmi, Berintegritas & Terpercaya"
          />
          <p className="type-body mt-4 text-muted">
            PT Equityworld Futures merupakan perusahaan pialang berjangka resmi
            anggota Bursa Komoditi dan Derivatif Indonesia (ICDX) serta Lembaga
            Kliring ICH. Berdiri sejak tahun 2004 dan beroperasi di bawah
            pengawasan Badan Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI).
          </p>
          <p className="type-body mt-3 text-muted">
            Kami berkomitmen memberikan fasilitas perdagangan komoditas dan
            finansial berjangka yang aman, transparan, dan terarah dengan
            perlindungan penuh pada Rekening Terpisah (Segregated Account) di
            bank-bank terkemuka Indonesia.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tentang-kami"
              className="rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white hover:bg-navy/90"
            >
              Kenali Kami Lebih Dekat →
            </Link>
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 rounded-full border border-softgrey px-5 py-3 text-[13px] font-semibold text-ink hover:bg-surface"
            >
              <ShieldCheck size={14} className="text-bull" /> Verifikasi Legalitas BAPPEBTI
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}