"use client";

import Image from "next/image";
import { useCatalog } from "./CatalogProvider";

export const PhotoBanner = () => {
  const { setCategory, setQuery } = useCatalog();

  const explore = () => {
    setQuery("");
    setCategory("clinica");
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="clinica-titolo"
      className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl text-center">
        <Image
          src="/images/banner/banner_consulenza.jpg"
          alt="Due professioniste durante un colloquio di consulenza"
          fill
          fetchPriority="low"
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />
        <div className="relative px-6 py-12 text-white">
          <h2
            id="clinica-titolo"
            className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl"
          >
            Strumenti di valutazione scelti per la pratica clinica, pensati per
            accompagnare ogni fase del percorso.
          </h2>
          <button
            type="button"
            onClick={explore}
            className="mt-8 rounded-lg bg-accent px-8 py-3.5 font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Esplora i test per la clinica
          </button>
        </div>
      </div>
    </section>
  );
};
