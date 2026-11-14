import Image from "next/image";
import {
  ArrowDown,
  BadgeCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const logos = {
  kemendag: { src: "/images/kemendag.webp", alt: "Logo Kementerian Perdagangan" },
  ojk: { src: "/images/ojk.webp", alt: "Logo Otoritas Jasa Keuangan" },
  bappebti: { src: "/images/bappebti.webp", alt: "Logo BAPPEBTI" },
  bi: { src: "/images/bi.webp", alt: "Logo Bank Indonesia" },
  bbj: { src: "/images/bbj.webp", alt: "Logo Bursa Berjangka Jakarta" },
  kbi: { src: "/images/kbi.webp", alt: "Logo Kliring Berjangka Indonesia" },
  ewf: { src: "/images/ewf.webp", alt: "Logo PT Equityworld Futures" },
};

type Logo = { src: string; alt: string };

/** Semua logo memakai kotak berukuran sama agar rapi di semua kartu. */
function LogoBox({ src, alt }: Logo) {
  return (
    <div className="relative h-16 w-40">
      <Image src={src} alt={alt} fill sizes="160px" className="object-contain" />
    </div>
  );
}

type NodeProps = {
  logo: Logo;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  eyebrow?: string;
  subtitle?: string;
  featured?: boolean;
  children?: React.ReactNode;
};

function LegalNode({
  logo,
  eyebrow,
  title,
  subtitle,
  desc,
  tag,
  accent,
  featured,
  children,
}: NodeProps) {
  return (
    <div
      className={`flex h-full flex-col items-center rounded-2xl border-t-4 bg-white p-5 text-center shadow-sm ${accent} ${
        featured ? "shadow-xl ring-2 ring-ink" : ""
      }`}
    >
      <LogoBox {...logo} />
      {eyebrow && (
        <span
          className={
            featured
              ? "mt-3 rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
              : "type-micro mt-3 font-semibold text-sapphire"
          }
        >
          {eyebrow}
        </span>
      )}
      <h3 className="mt-2 font-display text-[15px] font-extrabold uppercase leading-snug text-ink">
        {title}
      </h3>
      {subtitle && <p className="type-micro mt-0.5 text-muted">{subtitle}</p>}
      <p className="mt-2 text-xs leading-5 text-muted">{desc}</p>
      {children}
      <div className="mt-auto pt-4">
        <span className="rounded-full bg-softgrey px-3 py-1 text-[11px] font-medium text-muted">
          {tag}
        </span>
      </div>
    </div>
  );
}

const tones = {
  navy: { line: "bg-ink/30", text: "text-ink" },
  blue: { line: "bg-sapphire", text: "text-sapphire" },
  brand: { line: "bg-brand", text: "text-brand" },
  green: { line: "bg-bull", text: "text-bull" },
};

function Connector({
  label,
  tone = "navy",
  icon: Icon,
}: {
  label: string;
  tone?: keyof typeof tones;
  icon?: LucideIcon;
}) {
  const t = tones[tone];
  return (
    <div className="flex flex-col items-center">
      <span className={`h-5 w-0.5 ${t.line}`} />
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-softgrey bg-white px-3 py-1 text-[11px] font-medium shadow-sm ${t.text}`}
      >
        {label}
        {Icon && <Icon size={12} />}
      </span>
      <span className={`h-5 w-0.5 ${t.line}`} />
    </div>
  );
}

export default function LegalStructure() {
  return (
    <section id="legalitas" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16 sm:px-6">
      <div className="rounded-[2rem] border border-softgrey bg-softgrey/50 p-6 sm:p-10">
        <div className="text-center">
          <h2 className="type-h2 text-ink">Struktur Legalitas & Pengawasan</h2>
          <p className="type-body mt-2 text-muted">
            Posisi EWF dalam ekosistem perdagangan berjangka Indonesia
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          {/* Level 1: Kemendag */}
          <div className="mx-auto max-w-md">
            <LegalNode
              logo={logos.kemendag}
              title="Kementerian Perdagangan (Kemendag)"
              desc="Menetapkan kebijakan nasional, termasuk perdagangan berjangka komoditi."
              tag="Kebijakan Nasional"
              accent="border-t-navy"
            />
          </div>

          <Connector label="Membawahi" icon={ArrowDown} />

          {/* Level 2: OJK - BAPPEBTI - BI */}
          <div className="relative md:pt-6">
            <div className="pointer-events-none absolute inset-x-[16.6%] top-2 hidden h-4 rounded-t-2xl border-x-2 border-t-2 border-dashed border-muted/60 md:block" />
            <span className="absolute left-1/2 top-0 hidden -translate-x-1/2 rounded-full border border-softgrey bg-white px-3 py-0.5 text-[11px] font-medium text-muted shadow-sm md:inline-flex">
              Garis Koordinasi OJK & BI
            </span>

            <div className="grid gap-4 md:grid-cols-3">
              <LegalNode
                logo={logos.ojk}
                title="Otoritas Jasa Keuangan (OJK)"
                desc="Mengawasi sektor jasa keuangan agar tertib, transparan, dan melindungi konsumen."
                tag="Koordinasi Sektoral"
                accent="border-t-navy"
              />
              <LegalNode
                featured
                logo={logos.bappebti}
                eyebrow="Regulator Utama"
                title="BAPPEBTI"
                subtitle="(Badan Pengawas Perdagangan Berjangka Komoditi)"
                desc="Membina, mengatur, dan mengawasi seluruh kegiatan perdagangan berjangka komoditi di Indonesia."
                tag="Perizinan & Pengawasan"
                accent="border-t-navy"
              />
              <LegalNode
                logo={logos.bi}
                title="Bank Indonesia (BI)"
                desc="Menjaga stabilitas moneter dan sistem pembayaran serta lalu lintas dana nasabah di perbankan."
                tag="Koordinasi Moneter"
                accent="border-t-navy"
              />
            </div>
          </div>

          <Connector label="Bappebti Membawahi & Mengawasi" tone="blue" />
          <div className="mx-auto hidden h-5 w-1/2 rounded-t-2xl border-x-2 border-t-2 border-sapphire md:block" />

          {/* Level 3: BBJ - KBI */}
          <div className="grid gap-4 md:grid-cols-2">
            <LegalNode
              logo={logos.bbj}
              eyebrow="Penyelenggara Bursa"
              title="PT Bursa Berjangka Jakarta (BBJ)"
              desc="Penyelenggara bursa resmi tempat perdagangan kontrak berjangka dan derivatif dilaksanakan secara teratur, wajar, dan transparan."
              tag="Sarana Perdagangan Berjangka"
              accent="border-t-sapphire"
            />
            <LegalNode
              logo={logos.kbi}
              eyebrow="Lembaga Penjaminan & Kliring"
              title="PT Kliring Berjangka Indonesia (KBI)"
              desc="Lembaga kliring yang menjamin dan menyelesaikan transaksi berjangka (settlement) serta manajemen risiko transaksi."
              tag="Penjamin Transaksi & Kliring"
              accent="border-t-sapphire"
            >
              <div className="mt-3 w-full rounded-xl border border-softgrey bg-surface p-3 text-left">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-sapphire" />
                  Sistem SiTNa
                </p>
                <p className="type-micro mt-1 text-muted">
                  Sistem pendukung pencatatan dan pemantauan transaksi nasabah
                  secara real-time dan transparan.
                </p>
              </div>
            </LegalNode>
          </div>

          <div className="mx-auto hidden h-5 w-1/2 rounded-b-2xl border-x-2 border-b-2 border-brand md:block" />
          <Connector label="Anggota Bursa & Anggota Kliring Resmi" tone="brand" icon={BadgeCheck} />

          {/* Level 4: EWF */}
          <div className="mx-auto max-w-2xl rounded-2xl border-t-4 border-t-brand bg-white p-6 text-center shadow-xl ring-1 ring-brand/30">
            <div className="flex flex-col items-center">
              <LogoBox {...logos.ewf} />
              <h3 className="mt-1 font-display text-lg font-extrabold uppercase text-ink">
                PT Equityworld Futures
              </h3>
            </div>
            <p className="type-micro mt-1 text-muted">
              Izin Pialang BAPPEBTI No. 549/BAPPEBTI/SI/IX/2004
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/80">
              Pialang berjangka resmi yang menjadi perantara transaksi nasabah
              dengan edukasi komprehensif, standar kepatuhan ketat, dan
              transparansi laporan.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Rekening Terpisah (Segregated Account)",
                "Pelaporan Real-Time SiTNa",
                "Wakil Pialang Berlisensi",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-softgrey px-3 py-1 text-[11px] font-medium text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <Connector label="Layanan Transaksi & Edukasi / Terlindungi" tone="green" icon={ArrowDown} />

          {/* Level 5: Nasabah */}
          <div className="mx-auto max-w-xl rounded-2xl border-t-4 border-t-bull bg-white p-6 text-center shadow-sm">
            <span className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-bull/10 text-bull">
              <Users size={18} />
            </span>
            <h3 className="mt-3 font-display text-[15px] font-extrabold uppercase text-ink">
              Masyarakat / Nasabah
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pelaku transaksi yang dilindungi melalui regulasi, pengawasan
              berjenjang Bappebti, penjaminan penyelesaian transaksi KBI, serta
              edukasi berkelanjutan dari EWF.
            </p>
          </div>


          {/* Legenda */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-softgrey bg-white p-4 text-[11px] text-muted md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-semibold text-ink">Keterangan:</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-ink" />
                Hierarki Pengawasan (Kemendag - Bappebti)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-6 border-t-2 border-dashed border-muted" />
                Koordinasi Regulasi (OJK - BAPPEBTI - BI)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-sapphire" />
                Bursa & Kliring (BBJ - KBI)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                Pialang Resmi EWF
              </span>
            </div>
            <p className="italic md:text-right">
              *Mencerminkan struktur tata kelola resmi BAPPEBTI & Kementerian
              Perdagangan Republik Indonesia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}