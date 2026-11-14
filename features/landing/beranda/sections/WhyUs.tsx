import { ShieldCheck, TrendingUp, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/features/landing/beranda/data";

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-25 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Keunggulan Institusional"
            title={
              <>
                Mengapa Nasabah Memilih{" "}
                <span className="text-brand">Equityworld Futures</span>
              </>
            }
          />
          <p className="type-body mt-4 text-muted">
            Lebih dari dua dekade kami mendampingi pelaku pasar dan investor
            Indonesia dalam menavigasi volatilitas komoditas global. Berlandaskan
            integritas, transparansi regulasi BAPPEBTI, dan standar keamanan aset
            berkelas dunia.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="type-h2 text-ink">{s.value}</p>
                <p className="type-micro mt-1 text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <ShieldCheck className="shrink-0 text-navy" />
            <div>
              <h3 className="type-h3 text-ink">Terdaftar & Diawasi Ketat</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Seluruh transaksi tercatat secara transparan pada bursa resmi dan
                dana nasabah disimpan dalam rekening terpisah di bank kustodian
                yang diawasi BAPPEBTI.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand p-5 text-white shadow-lg">
            <div className="flex gap-4">
              <TrendingUp className="shrink-0" />
              <div>
                <span className="type-label rounded-full bg-white/20 px-2.5 py-0.5 text-[11px]">
                  Riset Terpercaya
                </span>
                <h3 className="type-h3 mt-2">Analisa Pasar Harian Komprehensif</h3>
                <p className="mt-1 text-sm leading-6 text-white/90">
                  Dapatkan pembaruan teknikal pivot point, kalender ekonomi
                  berdampak tinggi, serta riset fundamental komoditas dari tim
                  analis bersertifikasi WPB setiap pagi.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <GraduationCap className="shrink-0 text-navy" />
            <div>
              <h3 className="type-h3 text-ink">Edukasi Terarah untuk Pemula</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Bimbingan intensif pengenalan kontrak derivatif, simulasi
                manajemen risiko akun demo, hingga konsultasi personal bersama
                wakil pialang berjangka profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}