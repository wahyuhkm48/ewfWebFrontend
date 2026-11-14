import { missions } from "../data";

export default function VisionMission() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col rounded-3xl bg-navy p-8 text-white shadow-lg">
          <div>
            <h2 className="type-h2">Visi Kami</h2>
          </div>
          <blockquote className="mt-6 border-l-2 border-brand/60 pl-4 text-[15px] italic leading-7 text-white/80">
            “Menjadi perusahaan pialang berjangka yang unggul dan terpercaya,
            dengan standar operasional yang modern, transparan, serta
            memberikan nilai strategis bagi perkembangan industri dan
            perekonomian nasional.”
          </blockquote>
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/60">
            <span>Integritas • Profesionalisme • Tata Kelola</span>
            <span className="h-1 w-8 rounded-full bg-brand" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="type-h2 text-ink">Misi Perusahaan</h2>
          <ol className="mt-6 space-y-4">
            {missions.map((m, i) => (
              <li key={m} className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-7 text-muted">{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}