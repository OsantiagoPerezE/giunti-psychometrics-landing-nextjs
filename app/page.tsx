import Link from "next/link";
import { CatalogTools } from "@/components/CatalogTools";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Hero } from "@/components/Hero";
import { MissionBanner } from "@/components/MissionBanner";
import { News } from "@/components/News";
import { PhotoBanner } from "@/components/PhotoBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanners } from "@/components/PromoBanners";
import { TrustBar } from "@/components/TrustBar";

const Home = () => {
  return (
    <>
      <main id="contenuto">
        <Hero />

        <section
          id="catalogo"
          aria-labelledby="catalogo-titolo"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 md:px-6 lg:px-8"
        >
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="catalogo-titolo" className="text-3xl font-bold text-ink">
              Test per l&apos;assessment psicologico e corsi professionali
            </h2>
            <Link
              href="/catalogo"
              className="group/all inline-flex shrink-0 items-center gap-2 self-start rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:self-auto"
            >
              Vedi tutto il catalogo
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/all:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
          <div className="reveal relative z-20 mb-8 mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <CategoryFilter />
            <CatalogTools />
          </div>
          <ProductGrid />
        </section>

        <PromoBanners />
        <PhotoBanner />
        <MissionBanner />

        <News />

        <section
          aria-labelledby="aiuto-titolo"
          className="mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-6 lg:px-8"
        >
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-primary/10 bg-white px-6 py-7 shadow-sm md:flex-row md:items-center md:px-10">
            <div className="max-w-xl">
              <h2
                id="aiuto-titolo"
                className="text-2xl font-bold text-ink md:text-3xl"
              >
                Hai bisogno di aiuto?
              </h2>
              <p className="mt-2 text-ink/80">
                Scrivici per qualsiasi dubbio su test, corsi e ordini: ti
                risponderemo il prima possibile.
              </p>
            </div>
            <Link
              href="/contatti"
              className="group/cta inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Contattaci
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <TrustBar />
    </>
  );
};

export default Home;
