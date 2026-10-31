"use client";

import { useState } from "react";
import { CatalogSearch } from "./CatalogSearch";
import { useCatalog } from "./CatalogProvider";
import { FiltersModal } from "./FiltersModal";

export const CatalogTools = () => {
  const [open, setOpen] = useState(false);
  const { activeFilterCount } = useCatalog();

  return (
    <div className="flex w-full shrink-0 items-center gap-2 md:w-auto">
      <CatalogSearch />
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls="filtri-modal"
        onClick={() => setOpen(true)}
        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm md:py-2 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-sm active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          activeFilterCount > 0
            ? "border-primary bg-surface text-primary hover:bg-primary hover:text-white"
            : "border-primary/30 bg-white text-ink hover:bg-surface"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="17" r="2" />
        </svg>
        Filtri
        {activeFilterCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
            {activeFilterCount}
            <span className="sr-only"> filtri attivi</span>
          </span>
        )}
      </button>
      <FiltersModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
