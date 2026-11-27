type Props = {
  title: string;
  description?: string;
};

export default function SectionPlaceholder({ title, description }: Props) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white px-5 py-6 shadow-sm sm:px-7 sm:py-7">
      <p className="text-sm font-semibold text-brand">Member Area</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description ?? "Halaman ini sedang disiapkan."}
      </p>
    </section>
  );
}
