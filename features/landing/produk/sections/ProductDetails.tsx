// features/landing/produk/sections/ProductDetails.tsx
import ProductDetail from "./ProductDetail";
import { productDetails } from "@/features/landing/produk/data";

export default function ProductDetails() {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 pb-30 sm:px-6">
      {productDetails.map((p, i) => (
        <ProductDetail key={p.slug} product={p} reverse={i % 2 === 1} />
      ))}
    </section>
  );
}