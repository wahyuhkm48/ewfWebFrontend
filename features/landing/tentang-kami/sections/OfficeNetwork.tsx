import { ArrowRight, Building2 } from "lucide-react";
import { offices } from "../data";

export default function OfficeNetwork() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
      <h2 className="type-h2 text-ink">Jaringan Kantor Operasional</h2>
      <p className="type-body mt-2 text-muted">
        Hadir melayani di kota-kota strategis di seluruh Indonesia
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {offices.map((o) => (
          <article key={o.city} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
              <Building2 size={20} />
            </span>
            <h3 className="type-h3 mt-4 text-ink">{o.city}</h3>
            <p className="mt-1 text-xs leading-5 text-muted">
              {o.type} - {o.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${o.city} ${o.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-sapphire hover:underline"
            >
              Lihat alamat <ArrowRight size={12} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}