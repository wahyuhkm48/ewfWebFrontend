import { marketStatus, marketPrices } from "@/features/landing/beranda/data";

export default function MarketBar() {
  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6">
      <div className="grid gap-6 rounded-3xl bg-white p-5 shadow-xl lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {marketStatus.map((m) => (
            <div key={m.city} className="flex items-start gap-2">
              <span
                className={`mt-1.5 h-2 w-2 rounded-full ${m.open ? "bg-bull" : "bg-muted"}`}
              />
              <div>
                <p className="text-[13px] font-semibold text-ink">{m.city}</p>
                <p className={`type-micro ${m.open ? "text-bull" : "text-muted"}`}>
                  {m.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-softgrey pt-4 lg:justify-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {marketPrices.map((p) => (
            <p key={p.label} className="text-[13px] font-medium text-muted">
              {p.label}{" "}
              <span className="type-data text-ink">{p.price}</span>{" "}
              <span className="text-[13px] font-semibold text-bull">{p.change}</span>
            </p>
          ))}
          <span className="type-micro text-muted">Data tertunda 15 mnt</span>
        </div>
      </div>
    </section>
  );
}