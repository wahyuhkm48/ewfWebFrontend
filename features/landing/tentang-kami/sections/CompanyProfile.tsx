import Image from "next/image";
import { Award, Building2 } from "lucide-react";
import Pill from "@/components/ui/Pill";

export default function CompanyProfile() {
  return (
    <section id="profil" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16 sm:px-6">
      <div className="grid items-center gap-10 rounded-3xl bg-white p-6 shadow-lg sm:p-10 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Pill>Profil Perusahaan</Pill>
          <h2 className="type-h2 mt-4 text-ink">PT Equityworld Futures (EWF)</h2>

          <p className="mt-5 text-[15px] leading-7 text-muted">
            PT Equityworld Futures (“EWF”) hadir sebagai mitra investasi yang
            mengutamakan kepercayaan dan profesionalisme di industri
            perdagangan berjangka. Dengan fokus pada kualitas layanan dan
            edukasi berkelanjutan, EWF membantu nasabah menavigasi peluang
            pasar secara lebih terarah dan aman.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            Sejak mulai beroperasi pada tahun 2005, EWF terus tumbuh dan
            memperluas jangkauan layanan hingga memiliki enam kantor
            operasional di Jakarta, Surabaya, Semarang, dan Cirebon.
            Sebagai perusahaan pialang berjangka resmi, EWF terdaftar dan
            diawasi oleh Badan Pengawas Perdagangan Berjangka Komoditi
            (BAPPEBTI), Otoritas Jasa Keuangan (OJK), dan Bank Indonesia (BI),
            serta menjadi anggota PT Bursa Berjangka Jakarta (BBJ) dan PT
            Kliring Berjangka Indonesia (Persero). Dengan landasan regulasi
            yang kuat, EWF berkomitmen memberikan pengalaman transaksi yang
            transparan, akuntabel, dan berstandar profesional.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-softgrey px-3 py-1.5 text-xs font-medium text-ink">
              Izin BAPPEBTI: 549/BAPPEBTI/SI/IX/2004
            </span>
            <span className="rounded-full bg-softgrey px-3 py-1.5 text-xs font-medium text-ink">
              Anggota BBJ & KBI
            </span>
          </div>
        </div>

        <div className="relative aspect-[395/420] overflow-hidden rounded-2xl bg-softgrey">
          <Image
            src="/images/gedung.png"
            alt="Gedung kantor PT Equityworld Futures"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-top"
          />

          <div className="absolute right-4 top-4 flex items-start gap-2.5 rounded-xl bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand">
              <Award size={16} />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Sejak 2005</p>
              <p className="type-micro text-muted">
                20+ Tahun Pengalaman
                <br />
                Pialang Berjangka
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sapphire/10 text-sapphire">
              <Building2 size={16} />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">6 Kantor Operasional</p>
              <p className="type-micro text-muted">Di 4 Kota Strategis Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}