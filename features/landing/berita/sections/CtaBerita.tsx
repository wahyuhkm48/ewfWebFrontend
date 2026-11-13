import Pill from "@/components/ui/Pill";
import SpecularLink from "@/components/ui/SpecularLink";

export default function CtaBerita() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6">
      <div className="rounded-3xl bg-linear-to-r from-brand via-brand to-navy p-8 text-white sm:p-12">
        <Pill tone="dark" className="bg-white/15 text-white">
          Konsultasi &amp; Edukasi Pasar
        </Pill>
        <h2 className="type-h2 mt-4 max-w-xl">
          Ingin Memahami Dampak Berita pada Pergerakan Pasar?
        </h2>
        <p className="type-body mt-3 max-w-xl text-white/85">
          Konsultasikan analisa teknikal dan fundamental Anda bersama tim profesional terdaftar PT
          Equityworld Futures untuk navigasi perdagangan berjangka yang objektif.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <SpecularLink href="/analisa" variant="light">
            Lihat Analisa Pasar
          </SpecularLink>
          <SpecularLink href="/kontak" variant="ghost">
            Hubungi Kami
          </SpecularLink>
        </div>
      </div>
    </section>
  );
}