"use client";

import { useCatalog } from "./CatalogProvider";

export const CatalogSearch = () => {
  const { query, setQuery } = useCatalog();

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative min-w-0 flex-1 md:w-72 md:flex-none"
    >
      <label htmlFor="cerca-catalogo" className="sr-only">
        Cerca nei prodotti
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="cerca-catalogo"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca per nome…"
        className="w-full rounded-full border border-primary/30 bg-white py-2.5 pl-10 pr-10 text-sm md:py-2 text-ink transition-colors placeholder:text-ink/60 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Cancella la ricerca"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </form>
  );
};
