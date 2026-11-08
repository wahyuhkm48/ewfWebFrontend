import Navbar from "@/features/landing/shared/layout/Navbar";
import Footer from "@/features/landing/shared/layout/Footer";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}