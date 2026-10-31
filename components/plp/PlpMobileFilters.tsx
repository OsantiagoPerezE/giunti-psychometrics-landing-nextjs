"use client";

import { useEffect, useRef, useState } from "react";
import type { Facets, PlpParams } from "@/lib/catalog-query";
import { PlpFilters } from "./PlpFilters";

interface PlpMobileFiltersProps {
  params: PlpParams;
  facets: Facets;
  total: number;
  activeCount: number;
}

export const PlpMobileFilters = ({
  params,
  facets,
  total,
  activeCount,
}: PlpMobileFiltersProps) => {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls="elenco-filtri-modal"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden ${
          activeCount > 0
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
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
            {activeCount}
            <span className="sr-only"> filtri attivi</span>
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        id="elenco-filtri-modal"
        aria-labelledby="elenco-filtri-titolo"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="filters-modal m-auto max-h-[90vh] w-[min(92vw,28rem)] max-w-none overflow-hidden rounded-xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-primary/10 px-6 py-4">
            <h2 id="elenco-filtri-titolo" className="text-xl font-bold">
              Filtri
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi i filtri"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-primary transition-all duration-200 hover:rotate-90 hover:bg-primary hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:rotate-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="scroll-simple flex-1 overflow-y-auto overscroll-contain px-6 py-5">
            <PlpFilters params={params} facets={facets} idPrefix="m" />
          </div>
          <div className="border-t border-primary/10 px-6 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-ink hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {total === 1 ? "Mostra 1 prodotto" : `Mostra ${total} prodotti`}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
