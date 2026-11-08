type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "green";
  className?: string;
};

const tones = {
  neutral: "border-white/25 bg-white/10 text-white",
  green: "border-bull/60 bg-bull/20 text-white",
};

export default function GlassChip({
  children,
  tone = "neutral",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-[0_10px_24px_-14px_rgba(0,0,0,0.45)] backdrop-blur-md ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}