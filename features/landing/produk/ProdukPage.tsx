import Hero from "./sections/Hero";
import ProductPicker from "./sections/ProductPicker";
import ProductDetails from "./sections/ProductDetails";
import Faq from "./sections/Faq";
import CtaProduk from "./sections/CtaProduk";

export default function ProdukPage() {
  return (
    <>
      <Hero />
      <ProductPicker />
      <ProductDetails />
      <Faq />
      <CtaProduk />
    </>
  );
}