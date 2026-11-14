import Hero from "./sections/Hero";
import MarketBar from "./sections/MarketBar";
import TrustBadges from "./sections/TrustBadges";
import WhyUs from "./sections/WhyUs";
import Products from "./sections/Products";
import PivotCalculator from "./sections/PivotCalculator";
import News from "./sections/News";
import Profile from "./sections/Profile";
import CtaConsult from "./sections/CtaConsult";

export default function BerandaPage() {
  return (
    <>
      <Hero />
      <MarketBar />
      <TrustBadges />
      <WhyUs />
      <Products />
      <PivotCalculator />
      <News />
      <Profile />
      <CtaConsult />
    </>
  );
}