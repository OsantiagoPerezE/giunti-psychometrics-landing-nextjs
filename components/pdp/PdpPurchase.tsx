"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import { finalPrice } from "@/lib/price";
import type { Product } from "@/types/product";
import { useCart } from "../CartProvider";

const stepBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-xl text-primary transition-all duration-150 hover:bg-primary hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent";

export const PdpPurchase = ({ product }: { product: Product }) => {
  const { addToCart, openCart, maxQty } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const unit = finalPrice(product);
  const isCourse = product.kind === "corso";

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStickyVisible(
        !entry.isIntersecting && entry.boundingClientRect.top < 0,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const add = () => {
    addToCart(product, qty);
    setAdded(true);
  };
  const buyNow = () => {
    addToCart(product, qty);
    openCart();
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span id="pdp-quantita" className="text-sm font-semibold text-ink/80">
            {isCourse ? "Posti" : "Quantità"}
          </span>
          <div
            className="flex items-center gap-3"
            role="group"
            aria-labelledby="pdp-quantita"
          >
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Diminuisci la quantità"
              className={stepBtn}
            >
              −
            </button>
            <span
              className="w-6 text-center text-lg font-bold"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
              disabled={qty >= maxQty}
              aria-label="Aumenta la quantità"
              className={stepBtn}
            >
              +
            </button>
          </div>
          <span className="ml-auto text-sm text-ink/70">
            Totale{" "}
            <strong className="text-base text-primary">
              {formatPrice(unit * qty)}
            </strong>
          </span>
        </div>

        <div ref={ctaRef} className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={add}
            className={`group/cta flex-1 rounded-lg px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              added ? "bg-emerald-700" : "bg-primary hover:bg-ink"
            }`}
          >
            {added ? "Aggiunto al carrello ✓" : "Aggiungi al carrello"}
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="flex-1 rounded-lg border-2 border-primary px-6 py-3.5 font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Acquista ora
          </button>
        </div>
      </div>

      {stickyVisible && (
        <div className="animate-toast-in fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-primary/10 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {product.name}
            </p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(unit)}
            </p>
          </div>
          <button
            type="button"
            onClick={add}
            className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {added ? "Aggiunto ✓" : "Aggiungi al carrello"}
          </button>
        </div>
      )}
    </>
  );
};
