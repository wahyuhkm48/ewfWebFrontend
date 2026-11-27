import { ArrowRight } from "lucide-react";
import RevealGroup from "@/components/ui/RevealGroup";
import SpecularLink from "@/components/ui/SpecularLink";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { delay } from "@/lib/reveal";

export default function CtaMagang() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <RevealGroup>
        <div className="reveal-zoom rounded-3xl bg-linear-to-r from-brand via-brand to-navy p-6 text-white sm:p-12">
          <h2 className="reveal-item type-h2 max-w-md" style={delay(200)}>
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="reveal-item type-body mt-3 max-w-lg text-white/85" style={delay(320)}>
            Daftar sekarang atau tanyakan langsung kepada tim kami lewat
            WhatsApp.
          </p>

          <div className="reveal-pop mt-7 flex flex-wrap gap-3" style={delay(500)}>
            <SpecularLink href="/daftar" variant="ghost">
              Daftar Sekarang <ArrowRight size={16} />
            </SpecularLink>
            <WhatsAppButton>Tanya via WhatsApp</WhatsAppButton>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}