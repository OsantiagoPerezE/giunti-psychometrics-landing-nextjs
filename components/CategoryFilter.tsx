"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { categories, products } from "@/data/catalog";
import { useCatalog, type CategoryFilter as Filter } from "./CatalogProvider";
import { useHoverMenu } from "./useHoverMenu";

const options: { id: Filter; label: string }[] = [
  { id: "tutti", label: "Tutti" },
  ...categories,
];

const MENU_MIN_CATEGORIES = 6;
const showMenu = categories.length >= MENU_MIN_CATEGORIES;

const counts = new Map<Filter, number>([
  ["tutti", products.length],
  ...categories.map(
    (c) => [c.id, products.filter((p) => p.category === c.id).length] as const,
  ),
]);

const arrowClass =
  "absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white text-primary shadow-md transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex";

export const CategoryFilter = () => {
  const { category, setCategory } = useCatalog();
  const scroller = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menu = useHoverMenu(menuRef);
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setEdges((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const row = scroller.current;
    const active = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!row || !active) return;
    const offset =
      active.getBoundingClientRect().left -
      row.getBoundingClientRect().left +
      row.scrollLeft;
    row.scrollTo({
      left: offset - (row.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [category]);

  const scrollBy = (dir: 1 | -1) =>
    scroller.current?.scrollBy({
      left: dir * scroller.current.clientWidth * 0.7,
      behavior: "smooth",
    });

  const activeLabel = options.find((o) => o.id === category)?.label ?? "";

  return (
    <div className="flex min-w-0 items-center gap-2 lg:flex-1">
      {showMenu && (
        <div
          ref={menuRef}
          className="relative shrink-0"
          {...menu.hoverHandlers}
        >
          <button
            type="button"
            aria-expanded={menu.open}
            aria-controls="menu-categorie"
            aria-label={`Tutte le categorie (${categories.length}). Selezionata: ${activeLabel}`}
            onClick={menu.toggle}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:py-2 ${
              menu.open
                ? "border-primary bg-surface text-primary shadow-sm"
                : "border-ink bg-white text-ink hover:bg-surface"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
              <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
              <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
              <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
            </svg>
            <span className="hidden md:inline">Categorie</span>
            <span className="rounded-full bg-primary px-1.5 text-xs font-bold text-white">
              {categories.length}
            </span>
          </button>

          {menu.open && (
            <div
              id="menu-categorie"
              className="animate-menu-in absolute left-0 top-full z-30 w-[min(calc(100vw-2rem),42rem)] pt-2"
            >
              <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-xl">
                <p className="px-2 pb-3 text-sm font-bold uppercase tracking-wide text-ink/70">
                  Tutte le categorie
                </p>
                <ul className="grid max-h-[60vh] gap-1 overflow-y-auto md:grid-cols-2">
                  {options.map((opt) => {
                    const active = category === opt.id;
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setCategory(opt.id);
                            menu.close();
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                            active
                              ? "bg-primary font-semibold text-white"
                              : "text-ink hover:translate-x-1 hover:bg-surface hover:text-primary"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                              active
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {counts.get(opt.id)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        {edges.left && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-surface to-transparent"
            />
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Categorie precedenti"
              className={`${arrowClass} left-0`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
          </>
        )}

        <div
          ref={scroller}
          onScroll={measure}
          role="group"
          aria-label="Filtra per categoria"
          className="no-scrollbar -my-2 flex snap-x gap-2 overflow-x-auto py-2"
        >
          {options.map((opt) => {
            const active = category === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(opt.id)}
                className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:py-2 ${
                  active
                    ? "border-primary bg-primary text-white shadow-md hover:border-ink hover:bg-ink"
                    : "border-primary/30 bg-white text-ink hover:border-primary hover:bg-surface hover:shadow-sm"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {edges.right && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-surface to-transparent"
            />
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Altre categorie"
              className={`${arrowClass} right-0`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
