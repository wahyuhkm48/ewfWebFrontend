type Props = {
  children: React.ReactNode;
  tone?: "light" | "white" | "dark";
  className?: string;
};

const tones = {
  light: "bg-softgrey text-muted",
  white: "border border-softgrey bg-white text-muted shadow-sm",
  dark: "bg-brand/15 text-brand",
};

export default function Pill({ children, tone = "light", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}