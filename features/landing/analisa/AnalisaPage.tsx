import { Suspense } from "react";
import Hero from "./sections/Hero";
import AnalisaTabs from "./sections/AnalisaTabs";
import CtaAnalisa from "./sections/CtaAnalisa";

export default function AnalisaPage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Suspense fallback={<div className="h-[32rem] animate-pulse rounded-3xl bg-white" />}>
          <AnalisaTabs />
        </Suspense>
      </section>
      <CtaAnalisa />
    </>
  );
}