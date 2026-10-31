"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

const DESKTOP_QUERY = "(min-width: 1280px)";
const TABLET_QUERY = "(min-width: 768px)";

const subscribeToBreakpoints = (onChange: () => void) => {
  const queries = [
    window.matchMedia(DESKTOP_QUERY),
    window.matchMedia(TABLET_QUERY),
  ];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () =>
    queries.forEach((q) => q.removeEventListener("change", onChange));
};
const getPerSlide = () =>
  window.matchMedia(DESKTOP_QUERY).matches
    ? 3
    : window.matchMedia(TABLET_QUERY).matches
      ? 2
      : 1;
const getServerPerSlide = () => 3;
const SWIPE_MIN_PX = 50;

const arrowClass =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white text-primary shadow-md transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const Chevron = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
};

export const ProductSlider = ({ products }: { products: Product[] }) => {
  const perSlide = useSyncExternalStore(
    subscribeToBreakpoints,
    getPerSlide,
    getServerPerSlide,
  );
  const [requestedPage, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = Array.from(
    { length: Math.ceil(products.length / perSlide) },
    (_, i) => products.slice(i * perSlide, (i + 1) * perSlide),
  );
  const total = slides.length;
  const page = Math.min(requestedPage, Math.max(0, total - 1));
  const go = (n: number) => setPage(Math.max(0, Math.min(total - 1, n)));

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(page - 1);
    if (e.key === "ArrowRight") go(page + 1);
  };
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) >= SWIPE_MIN_PX) go(page + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Elenco prodotti"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        {total > 1 && (
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 0}
            aria-label="Pagina precedente"
            className={`${arrowClass} left-1 lg:-left-5`}
          >
            <Chevron direction="left" />
          </button>
        )}
        <div className="-m-3 overflow-hidden p-3">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateX(calc(${-page} * (100% + 1.5rem)))`,
            }}
          >
            {slides.map((items, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} di ${total}`}
                inert={i !== page}
                className="w-full shrink-0 basis-full self-start"
              >
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === total - 1}
            aria-label="Pagina successiva"
            className={`${arrowClass} right-1 lg:-right-5`}
          >
            <Chevron direction="right" />
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Vai alla pagina ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === page ? "w-8 bg-primary" : "w-2.5 bg-primary/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
