import SectionHeading from "@/components/ui/SectionHeading";
import CircularGallery from "@/components/ui/CircularGallery";
import { products } from "@/features/landing/shared/data/products";

const items = products.map((p) => ({
  image: p.image,
  text: p.name,
  category: p.category,
  description: p.desc,
  alt: p.name,
}));

export default function Products() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-55 sm:px-6">
      <SectionHeading
        eyebrow="Portofolio Pasar"
        title="Produk yang Kami Tawarkan"
        desc="Perdagangkan komoditi unggulan global dan indeks bursa terkemuka Asia."
      />

      <div className="relative h-[600px] overflow-hidden">
        <CircularGallery
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.06}
          font="700 28px var(--font-jakarta), sans-serif"
          itemSize={1.05}
        />
      </div>
    </section>
  );
}