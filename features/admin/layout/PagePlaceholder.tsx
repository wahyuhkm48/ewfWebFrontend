type Props = {
  title: string;
  description: string;
};

/** Kerangka sementara untuk halaman admin yang belum dibuat. */
export default function PagePlaceholder({ title, description }: Props) {
  return (
    <section className="admin-page">
      <p className="admin-eyebrow">Admin</p>
      <h1>{title}</h1>
      <p className="admin-lead">{description}</p>
      <div className="admin-empty">Konten halaman ini akan dibuat pada langkah berikutnya.</div>
    </section>
  );
}