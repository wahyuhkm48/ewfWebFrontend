const TONES: Record<string, string> = {
  gold: "bg-brand",
  "hang-seng": "bg-brand",
  oil: "bg-sapphire",
  nikkei: "bg-sapphire",
  "global-economy": "bg-navy",
};

type Props = {
  category: string;
  slug: string;
  className?: string;
};

export default function CategoryTag({ category, slug, className = "" }: Props) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
        TONES[slug] ?? "bg-navy"
      } ${className}`}
    >
      {category}
    </span>
  );
}