import Link from "next/link";

export const MissionBanner = () => {
  return (
    <section
      aria-labelledby="missione-titolo"
      className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-ink px-6 py-16 text-center text-white md:px-12">
        <h2 id="missione-titolo" className="text-3xl font-bold md:text-4xl">
          Valutare bene per decidere meglio
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-sky-100">
          Mettiamo a disposizione di psicologi, scuole e aziende strumenti di
          valutazione sempre aggiornati, pensati per sostenere decisioni più
          consapevoli nella pratica professionale.
        </p>
        <Link
          href="/contatti"
          className="mt-8 inline-flex rounded-lg border-2 border-white px-8 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Scopri il nostro approccio
        </Link>
      </div>
    </section>
  );
};
