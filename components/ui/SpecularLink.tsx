"use client";

import { useRouter } from "next/navigation";
import SpecularButton, {
  type SpecularButtonProps,
} from "@/components/ui/SpecularButton";

type Variant = "primary" | "ghost" | "light";

const VARIANTS: Record<Variant, Partial<SpecularButtonProps>> = {
  // Orange brand, CTA utama
  primary: {
    tint: "#ec7013",
    tintOpacity: 0.9,
    lineColor: "#ffd2ad",
    baseColor: "#ec7013",
    textColor: "#ffffff",
    blur: 4,
    className: "shadow-[0_10px_30px_-8px_rgba(236,112,19,0.7)]!",
  },
  // Outline transparan, CTA sekunder di atas background gelap
  ghost: {
    tint: "#ffffff",
    tintOpacity: 0.06,
    lineColor: "#ffffff",
    baseColor: "#525252",
    textColor: "#ffffff",
    blur: 6,
  },
  // Putih solid, untuk banner gelap / gradient
  light: {
    tint: "#ffffff",
    tintOpacity: 0.92,
    lineColor: "#ffffff",
    baseColor: "#94a3b8",
    textColor: "#0f172a",
    blur: 4,
  },
};

const BASE = "px-6! py-3! text-[13px]! font-semibold!";

type Props = Omit<SpecularButtonProps, "onClick" | "type"> & {
  href: string;
  variant?: Variant;
};

export default function SpecularLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const router = useRouter();
  const preset = VARIANTS[variant];

  const go = () => {
    if (/^https?:/.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (/^(mailto|tel):/.test(href)) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  return (
    <SpecularButton
      size="sm"
      radius={999}
      {...preset}
      {...props}
      className={`${BASE} ${preset.className ?? ""} ${className}`.trim()}
      onClick={go}
    >
      {children}
    </SpecularButton>
  );
}