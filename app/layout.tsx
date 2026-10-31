import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { CartToast } from "@/components/CartToast";
import { CatalogProvider } from "@/components/CatalogProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollTopOnArrival } from "@/components/ScrollTopOnArrival";
import { StickyChrome } from "@/components/StickyChrome";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giunti Psychometrics · Catalogo test e corsi",
  description:
    "Catalogo di test psicologici e corsi di formazione per professionisti di Giunti Psychometrics Italia.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CatalogProvider>
          <CartProvider>
            <a
              href="#contenuto"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
            >
              Vai al contenuto
            </a>
            <ScrollTopOnArrival />
            <div id="inizio" />
            <StickyChrome>
              <TopBar />
              <Header />
            </StickyChrome>
            {children}
            <Footer />
            <CartDrawer />
            <CartToast />
          </CartProvider>
        </CatalogProvider>
      </body>
    </html>
  );
};

export default RootLayout;
