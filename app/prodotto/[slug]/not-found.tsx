import Link from "next/link";

const ProdottoNonTrovato = () => {
  return (
    <main
      id="contenuto"
      className="mx-auto w-full max-w-3xl px-4 py-20 text-center md:px-6"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-primary">
        Errore 404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
        Prodotto non trovato
      </h1>
      <p className="mt-3 text-ink/70">
        Il prodotto che cerchi non esiste o non è più disponibile.
      </p>
      <Link
        href="/catalogo"
        className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Vai al catalogo
      </Link>
    </main>
  );
};

export default ProdottoNonTrovato;
