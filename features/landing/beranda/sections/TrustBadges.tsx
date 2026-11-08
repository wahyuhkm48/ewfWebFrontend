import { trustBadges } from "@/features/landing/beranda/data";

export default function TrustBadges() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-softgrey p-4 md:grid-cols-3 lg:grid-cols-5">
        {trustBadges.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="rounded-xl bg-white p-4 text-center">
            <Icon className="mx-auto text-brand" size={22} />
            <p className="mt-2 text-[13px] font-semibold text-ink">{title}</p>
            <p className="type-micro mt-1 text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}