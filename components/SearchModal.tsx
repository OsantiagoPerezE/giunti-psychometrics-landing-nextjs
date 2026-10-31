"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { products } from "@/data/catalog";
import { buildPlpUrl, productUrl } from "@/lib/catalog-query";
import { normalize } from "@/lib/format";
import { useCatalog } from "./CatalogProvider";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const MAX_RESULTS = 6;
const MAX_IDEAS = 4;

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, setCategory, resetFilters } = useCatalog();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const q = normalize(query.trim());
  const matches = q
    ? products.filter((p) => normalize(p.name).includes(q))
    : products;
  const shown = matches.slice(0, q ? MAX_RESULTS : MAX_IDEAS);

  const showInCatalog = (value: string) => {
    onClose();
    if (pathname === "/") {
      setQuery(value);
      setCategory("tutti");
      resetFilters();
      document
        .getElementById("catalogo")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(buildPlpUrl({ q: value }));
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="ricerca-modal"
      aria-labelledby="ricerca-titolo"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="search-modal m-auto w-[min(92vw,52rem)] max-w-none overflow-hidden rounded-xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-[min(85vh,42rem)] flex-col p-6 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <h2 id="ricerca-titolo" className="text-2xl font-bold md:text-4xl">
            Cerca in questo sito web
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi la ricerca"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface text-primary transition-all duration-200 hover:rotate-90 hover:bg-primary hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:rotate-0"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            showInCatalog(query);
          }}
          className="relative mt-8"
        >
          <label htmlFor="ricerca-input" className="sr-only">
            Cerca un prodotto per nome
          </label>
          <input
            ref={inputRef}
            id="ricerca-input"
            type="search"
            autoFocus
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca…"
            className="w-full rounded-lg border-2 border-primary/40 bg-white py-4 pl-5 pr-14 text-lg text-ink transition-all placeholder:text-ink/60 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          />
          <button
            type="submit"
            aria-label="Cerca"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-ink/70 transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </form>

        <p
          role="status"
          className="mt-8 truncate text-xl font-bold md:text-2xl"
        >
          {!q
            ? "Ti serve qualche idea?"
            : matches.length === 0
              ? "Nessun risultato per la tua ricerca"
              : matches.length === 1
                ? "1 risultato"
                : `${matches.length} risultati`}
        </p>

        {shown.length === 0 ? (
          <div className="mt-4 flex min-h-0 flex-1 items-center justify-center rounded-lg border border-dashed border-primary/30 px-6 text-center text-lg text-ink/70">
            Prova con un altro nome di prodotto.
          </div>
        ) : (
          <ul className="mt-4 -mr-2 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
            {shown.map((p) => (
              <li key={p.id}>
                {pathname === "/" ? (
                  <button
                    type="button"
                    onClick={() => showInCatalog(p.name)}
                    className="group flex w-full items-center gap-5 rounded-lg p-3 text-left transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="text-lg font-medium transition-colors group-hover:text-primary">
                      {p.name}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={productUrl(p)}
                    onClick={onClose}
                    className="group flex w-full items-center gap-5 rounded-lg p-3 text-left transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="text-lg font-medium transition-colors group-hover:text-primary">
                      {p.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 h-[3.25rem] shrink-0">
          {q && matches.length > 0 && (
            <button
              type="button"
              onClick={() => showInCatalog(query)}
              className="rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Vedi tutti i risultati nel catalogo
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};
