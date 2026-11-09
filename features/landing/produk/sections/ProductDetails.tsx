"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import ProductDetail from "./ProductDetail";
import { productDetails } from "@/features/landing/produk/data";
import { useIsDesktop } from "@/lib/useIsDesktop";

export default function ProductDetails() {
  const isDesktop = useIsDesktop();

  // Mobile / tablet: daftar biasa
  if (!isDesktop) {
    return (
      <section
        id="produk"
        className="mx-auto max-w-7xl scroll-mt-20 space-y-8 px-4 py-16 sm:px-6"
      >
        {productDetails.map((p, i) => (
          <ProductDetail key={p.slug} product={p} reverse={i % 2 === 1} />
        ))}
      </section>
    );
  }

  // Desktop: scroll stack
  return (
    <section className="mx-auto max-w-[88rem] px-4 pb-16 pt-24 sm:px-6 lg:pb-24 lg:pt-28">
      <div
        id="produk"
        className="h-[calc(100dvh-1rem)] min-h-[46rem] scroll-mt-24"
      >
        <ScrollStack
          className="product-stack"
          itemDistance={24}
          itemStackDistance={14}
          stackPosition="3%"
          baseScale={0.94}
          itemScale={0.02}
        >
          {productDetails.map((p, i) => (
            <ScrollStackItem
              key={p.slug}
              itemClassName="h-auto! p-0! my-0! rounded-3xl! shadow-none! bg-transparent!"
            >
              <ProductDetail product={p} reverse={i % 2 === 1} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}