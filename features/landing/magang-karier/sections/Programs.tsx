import Link from "next/link";
import { Check } from "lucide-react";
import RevealGroup from "@/components/ui/RevealGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import SpecularLink from "@/components/ui/SpecularLink";
import { programs } from "../data";
import { stagger } from "@/lib/reveal";

export default function Programs() {
  return (
    <section id="program" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-25">
      <RevealGroup>
        <div className="reveal-item">
          <SectionHeading
            center
            eyebrow="Bergabung Bersama Kami"
            title="Pilih Jalur Anda"
            desc="Masuk ke akun Anda untuk mendaftar program magang atau melamar lowongan pekerjaan."
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {programs.map(
            ({ id, icon: Icon, eyebrow, title, desc, points, cta, href, featured }, i) => (
              <article
                key={id}
                style={stagger(i, 140, 200)}
                className={`reveal-item flex flex-col rounded-3xl p-7 sm:p-9 ${
                  featured ? "bg-navy text-white shadow-xl" : "bg-white text-ink shadow-sm"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    featured ? "bg-brand text-white" : "bg-brand/10 text-brand"
                  }`}
                >
                  <Icon size={24} />
                </span>
                <p className="type-label mt-5 text-brand">{eyebrow}</p>
                <h3 className="type-h2 mt-1">{title}</h3>
                <p className={`type-body mt-3 ${featured ? "text-white/75" : "text-muted"}`}>
                  {desc}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-bull" />
                      <span className={featured ? "text-white/85" : "text-ink"}>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                  <SpecularLink href={href} variant="primary">
                    {cta}
                  </SpecularLink>
                  <p className={`text-[13px] ${featured ? "text-white/70" : "text-muted"}`}>
                    Belum punya akun?{" "}
                    <Link href="/daftar" className="font-semibold text-brand hover:underline">
                      Daftar
                    </Link>
                  </p>
                </div>
              </article>
            ),
          )}
        </div>
      </RevealGroup>
    </section>
  );
}