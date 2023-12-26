import Footer from "@/layouts/footer/footer";
import Navbar from "@/layouts/header/navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
