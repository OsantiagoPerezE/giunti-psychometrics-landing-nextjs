"use client";

import { useEffect, useRef } from "react";
import { products } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { filterProducts } from "@/lib/filter";
import { finalPrice } from "@/lib/price";
import type { ProductFormat } from "@/types/product";
import { useCatalog } from "./CatalogProvider";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const FORMATS: ProductFormat[] = [
  "Cartaceo",
  "Digitale",
  "Corso online",
  "In presenza",
];

const prices = products.map(finalPrice);
const MIN_PRICE = Math.floor(Math.min(...prices));
const MAX_PRICE = Math.ceil(Math.max(...prices));

const parse = (value: string) => (value === "" ? null : Number(value));

const inputClass =
  "w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-ink transition-colors placeholder:text-ink/50 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20";

export const FiltersModal = ({ open, onClose }: FiltersModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    query,
    category,
    formats,
    toggleFormat,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    activeFilterCount,
    resetFilters,
  } = useCatalog();

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

  const count = filterProducts(products, {
    query,
    category,
    formats,
    priceMin,
    priceMax,
  }).length;

  return (
    <dialog
      ref={dialogRef}
      id="filtri-modal"
      aria-labelledby="filtri-titolo"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="filters-modal m-auto w-[min(92vw,28rem)] max-w-none overflow-hidden rounded-xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="filtri-titolo" className="text-2xl font-bold">
            Filtri
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi i filtri"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary transition-all duration-200 hover:rotate-90 hover:bg-primary hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:rotate-0"
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

        <fieldset className="mt-6">
          <legend className="text-sm font-bold uppercase tracking-wide text-ink/70">
            Formato
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <label key={f} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={formats.includes(f)}
                  onChange={() => toggleFormat(f)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-surface peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white hover:peer-checked:border-ink hover:peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                  {f}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold uppercase tracking-wide text-ink/70">
            Prezzo
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="prezzo-min" className="mb-1 block text-sm">
                Da (€)
              </label>
              <input
                id="prezzo-min"
                type="number"
                inputMode="numeric"
                min={0}
                value={priceMin ?? ""}
                onChange={(e) => setPriceMin(parse(e.target.value))}
                placeholder={String(MIN_PRICE)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="prezzo-max" className="mb-1 block text-sm">
                A (€)
              </label>
              <input
                id="prezzo-max"
                type="number"
                inputMode="numeric"
                min={0}
                value={priceMax ?? ""}
                onChange={(e) => setPriceMax(parse(e.target.value))}
                placeholder={String(MAX_PRICE)}
                className={inputClass}
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-ink/70">
            Prezzi da {formatPrice(MIN_PRICE)} a {formatPrice(MAX_PRICE)}
          </p>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={resetFilters}
            disabled={activeFilterCount === 0}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent"
          >
            Azzera filtri
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {count === 1 ? "Mostra 1 prodotto" : `Mostra ${count} prodotti`}
          </button>
        </div>
      </div>
    </dialog>
  );
};
