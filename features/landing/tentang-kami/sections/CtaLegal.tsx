import { MessageCircle } from "lucide-react";
import SpecularLink from "@/components/ui/SpecularLink";
import { WHATSAPP_URL } from "@/features/landing/shared/data/contact";

export default function CtaLegal() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6">
      <div className="rounded-3xl bg-navy p-8 text-center text-white sm:p-12">
        <h2 className="type-h2">Ingin Mengenal Kami Lebih Dekat?</h2>
        <p className="type-body mx-auto mt-3 max-w-xl text-white/80">
          Konsultasikan kebutuhan investasi berjangka Anda bersama wakil
          pialang berlisensi resmi EWF.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <SpecularLink href={WHATSAPP_URL} variant="light">
            <MessageCircle size={16} className="text-bull" /> Chat WhatsApp
          </SpecularLink>
        </div>
      </div>
    </section>
  );
}