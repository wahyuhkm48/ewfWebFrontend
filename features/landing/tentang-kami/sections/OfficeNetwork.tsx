import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Printer,
} from "lucide-react";
import { offices } from "../data";

const tel = (v: string) => `tel:${v.replace(/[^\d+]/g, "")}`;

export default function OfficeNetwork() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
      <h2 className="type-h2 text-ink">Jaringan Kantor Operasional</h2>
      <p className="type-body mt-2 text-muted">
        Satu kantor pusat dan lima kantor cabang di Jakarta, Surabaya,
        Semarang, dan Cirebon.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offices.map((o) => {
          const hq = o.type === "Kantor Pusat";
          return (
            <article
              key={o.id}
              className={`flex flex-col rounded-2xl p-6 ${
                hq ? "bg-navy text-white" : "bg-white text-ink shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    hq ? "bg-brand text-white" : "bg-brand/10 text-brand"
                  }`}
                >
                  <Building2 size={20} />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    hq ? "bg-brand/20 text-brand" : "bg-softgrey text-muted"
                  }`}
                >
                  {o.type}
                </span>
              </div>

              <h3 className="type-h3 mt-4">{o.name}</h3>

              <address
                className={`mt-2 text-[13px] not-italic leading-5 ${
                  hq ? "text-white/75" : "text-muted"
                }`}
              >
                <span
                  className={`block font-semibold ${
                    hq ? "text-white" : "text-ink"
                  }`}
                >
                  {o.building}
                </span>
                {o.street}
              </address>

              <ul
                className={`mt-4 space-y-2 text-[13px] ${
                  hq ? "text-white/80" : "text-muted"
                }`}
              >
                <li className="flex items-start gap-2">
                  <Phone size={14} className="mt-0.5 shrink-0 text-brand" />
                  <a href={tel(o.phone)} className="hover:underline">
                    {o.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Printer size={14} className="mt-0.5 shrink-0 text-brand" />
                  <span>Fax {o.fax}</span>
                </li>
                {o.email && (
                  <li className="flex items-start gap-2">
                    <Mail size={14} className="mt-0.5 shrink-0 text-brand" />
                    <a
                      href={`mailto:${o.email}`}
                      className="break-all hover:underline"
                    >
                      {o.email}
                    </a>
                  </li>
                )}
              </ul>

              <a
                href={o.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold hover:underline ${
                  hq ? "text-brand" : "text-sapphire"
                }`}
              >
                <MapPin size={13} /> Lihat di Peta <ArrowUpRight size={12} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}