import Masonry from "@/components/ui/Masonry";
import RevealGroup from "@/components/ui/RevealGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "../data";

export default function Gallery() {
  return (
    <section id="galeri" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-25">
      <RevealGroup>
        <div className="reveal-item">
          <SectionHeading
            center
            eyebrow="Galeri Kegiatan"
            title="Momen Selama Magang"
            desc="Sekilas kegiatan peserta magang di Equityworld Futures."
          />
        </div>
      </RevealGroup>

      <div className="mt-10">
        <Masonry
          items={galleryItems}
          animateFrom="bottom"
          stagger={0.05}
          blurToFocus
        />
      </div>
    </section>
  );
}