"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productUrl } from "@/lib/catalog-query";
import { formatDate, formatPrice } from "@/lib/format";
import { finalPrice, hasPromo } from "@/lib/price";
import type { Product, ProductFormat } from "@/types/product";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";

const badgeStyles: Record<ProductFormat, string> = {
  Cartaceo: "bg-amber-100 text-amber-900",
  Digitale: "bg-sky-100 text-sky-900",
  "Corso online": "bg-indigo-100 text-indigo-900",
  "In presenza": "bg-emerald-100 text-emerald-900",
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = ({
  product,
  priority = false,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
  };
  const isCourse = product.kind === "corso";
  const url = productUrl(product);
  const promo = hasPromo(product);
  const discount = Math.round((1 - finalPrice(product) / product.price) * 100);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl focus-within:shadow-lg focus-within:ring-2 focus-within:ring-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={url}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] overflow-hidden bg-surface"
      >
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
          eager={priority}
        />
        {isCourse && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent p-3 pt-10 text-white">
            <p className="text-sm text-sky-100">
              {product.format === "In presenza"
                ? "Corso in presenza"
                : "Corso online"}
            </p>
            <p className="text-base font-bold">
              {product.hours} ore | {product.ecm} ECM
            </p>
          </div>
        )}
        <span
          className={`absolute left-2.5 top-2.5 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[product.format]}`}
        >
          {product.format}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-snug text-ink">
          <Link
            href={url}
            className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-ink/80">
          {isCourse ? "Docente" : "Autore"}: {product.author}
        </p>
        <p className="text-sm text-ink/80">
          {isCourse && product.startDate
            ? `Inizio: ${formatDate(product.startDate)}`
            : `Età di applicazione: ${product.ageRange}`}
        </p>

        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(finalPrice(product))}
            </span>
            {promo && (
              <span className="rounded bg-accent px-1.5 py-0.5 text-xs font-bold text-ink">
                -{discount}%
              </span>
            )}
          </div>
          {promo && (
            <p className="text-sm text-ink/70">
              <span className="sr-only">Prezzo originale: </span>
              <s>{formatPrice(product.price)}</s>
            </p>
          )}
        </div>

        {isCourse ? (
          <Link
            href={url}
            className="group/btn mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-ink hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Scopri di più
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/btn:translate-x-1"
            >
              →
            </span>
            <span className="sr-only">: {product.name}</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className={`group/btn mt-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-95 ${
              added ? "bg-emerald-700" : "bg-primary hover:bg-ink"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
          >
            {added ? "Aggiunto" : "Aggiungi al carrello"}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/btn:translate-x-1"
            >
              {added ? "✓" : "→"}
            </span>
            <span className="sr-only">: {product.name}</span>
          </button>
        )}
      </div>
    </article>
  );
};
