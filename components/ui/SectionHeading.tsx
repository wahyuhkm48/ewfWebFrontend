type Props = {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
};

export default function SectionHeading({ eyebrow, title, desc, center }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="type-label text-brand">{eyebrow}</p>
      <h2 className="type-h2 mt-2 text-ink">{title}</h2>
      {desc && <p className="type-body mt-2 text-muted">{desc}</p>}
    </div>
  );
}