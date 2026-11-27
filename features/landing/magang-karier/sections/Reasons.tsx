import RevealGroup from "@/components/ui/RevealGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import { reasons } from "../data";
import { stagger } from "@/lib/reveal";

export default function Reasons() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-25">
      <RevealGroup>
        <div className="reveal-item">
          <SectionHeading
            center
            eyebrow="Mengapa Bergabung"
            title={
              <>
                Mengapa Magang & Berkarier di{" "}
                <span className="text-brand">Equityworld Futures</span>?
              </>
            }
            desc="Tempat belajar dan bertumbuh di industri perdagangan berjangka yang teregulasi."
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              style={stagger(i, 90, 200)}
              className="reveal-item rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon size={22} />
              </span>
              <h3 className="type-h3 mt-4 text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}