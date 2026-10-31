"use client";

import { products } from "@/data/catalog";
import { filterProducts } from "@/lib/filter";
import { useCatalog } from "./CatalogProvider";
import { ProductSlider } from "./ProductSlider";

const chipClass =
  "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const ProductGrid = () => {
  const {
    query,
    setQuery,
    category,
    formats,
    priceMin,
    priceMax,
    activeFilterCount,
    resetFilters,
  } = useCatalog();

  const visible = filterProducts(products, {
    query,
    category,
    formats,
    priceMin,
    priceMax,
  });
  const sliderKey = [
    category,
    query.trim(),
    formats.join(","),
    priceMin,
    priceMax,
  ].join("|");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p role="status" className="text-sm text-ink/80">
          {visible.length === 1
            ? "1 prodotto trovato"
            : `${visible.length} prodotti trovati`}
        </p>
        {query.trim() && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className={chipClass}
          >
            Ricerca: «{query.trim()}»<span aria-hidden="true">✕</span>
            <span className="sr-only">Rimuovi la ricerca</span>
          </button>
        )}
        {activeFilterCount > 0 && (
          <button type="button" onClick={resetFilters} className={chipClass}>
            Filtri attivi: {activeFilterCount}
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Azzera i filtri</span>
          </button>
        )}
      </div>
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-primary/30 bg-white p-10 text-center text-ink">
          Nessun prodotto corrisponde alla ricerca. Prova con un altro nome,
          categoria o filtro.
        </p>
      ) : (
        <ProductSlider key={sliderKey} products={visible} />
      )}
    </div>
  );
};
