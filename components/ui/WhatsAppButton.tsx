import type { ReactNode } from "react";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/contact";

type Props = {
  children?: ReactNode;
};

/** Tombol chat WhatsApp berbasis CSS biasa, tampil sama di semua perangkat. */
export default function WhatsAppButton({ children = "Chat WhatsApp" }: Props) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-ink shadow-lg shadow-black/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0 active:scale-[0.97]"
    >
      <Image
        src="/images/logowa.webp"
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className="shrink-0 object-contain"
      />
      {children}
    </a>
  );
}