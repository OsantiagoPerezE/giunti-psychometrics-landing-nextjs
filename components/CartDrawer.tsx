"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { products } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { productUrl } from "@/lib/catalog-query";
import { finalPrice } from "@/lib/price";
import { useCart } from "./CartProvider";

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-all duration-200 hover:bg-surface hover:text-primary active:scale-90 focus-visible:outline-2 focus-visible:outline-accent";

const stepBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border md:h-8 md:w-8 border-primary/30 text-primary transition-all duration-150 hover:bg-primary hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent";

const Suggestions = ({
  title,
  className = "mt-5",
}: {
  title: string;
  className?: string;
}) => {
  const { items, addToCart, closeCart } = useCart();
  const inCart = new Set(items.map((i) => i.product.id));
  const list = products
    .filter((p) => !inCart.has(p.id))
    .slice(0, items.length ? 2 : 3);
  if (list.length === 0) return null;

  return (
    <section aria-label={title} className={className}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-ink/70">
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {list.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-2.5 rounded-lg border border-primary/10 p-1.5 transition-colors hover:bg-surface"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-surface">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0 flex-1">
              <Link
                href={productUrl(p)}
                onClick={closeCart}
                className="line-clamp-1 block text-[13px] font-medium leading-tight transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
              >
                {p.name}
              </Link>
              <span className="text-xs font-bold text-primary">
                {formatPrice(finalPrice(p))}
              </span>
            </span>
            <button
              type="button"
              onClick={() => addToCart(p)}
              aria-label={`Aggiungi ${p.name} al carrello`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-base text-white transition-all duration-200 hover:scale-110 hover:bg-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const EmptyCart = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-6 text-center">
        <svg aria-hidden="true" viewBox="0 0 120 120" className="h-28 w-28">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#1B4F8A"
            strokeOpacity=".25"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <circle cx="60" cy="60" r="38" fill="#EFF6FF" />
          <path
            d="M38 44h8l5 24h26l6-18H49"
            fill="none"
            stroke="#1B4F8A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="56" cy="78" r="3.5" fill="#0EA5E9" />
          <circle cx="74" cy="78" r="3.5" fill="#0EA5E9" />
        </svg>
        <p className="mt-4 text-xl font-bold">Il carrello è vuoto</p>
        <p className="mt-1 max-w-xs text-ink/70">
          Aggiungi test e corsi dal catalogo: li ritroverai qui, anche se chiudi
          la pagina.
        </p>
        <button
          type="button"
          onClick={onExplore}
          className="mt-5 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Esplora il catalogo
        </button>
      </div>
      <div className="border-t border-primary/10 bg-surface/60 px-6 py-4">
        <Suggestions title="Da cui iniziare" className="" />
      </div>
    </div>
  );
};

const OrderDone = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <svg aria-hidden="true" viewBox="0 0 80 80" className="h-24 w-24">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="#EFF6FF"
          stroke="#0EA5E9"
          strokeWidth="3"
        />
        <path
          className="check-draw"
          d="M26 41l10 10 19-21"
          fill="none"
          stroke="#1B4F8A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-5 text-2xl font-bold">Grazie per l&apos;ordine!</p>
      <p className="mt-2 max-w-xs text-ink/70">
        Questo è un progetto dimostrativo: nessun pagamento è stato effettuato e
        nessun ordine è stato inviato.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Continua a esplorare
      </button>
    </div>
  );
};

export const CartDrawer = () => {
  const {
    items,
    count,
    listTotal,
    productSavings,
    promo,
    promoDiscount,
    total,
    open,
    closeCart,
    setQty,
    removeItem,
    clear,
    applyPromo,
    removePromo,
    maxQty,
  } = useCart();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [ordered, setOrdered] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

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

  const handleClose = () => {
    closeCart();
    setOrdered(false);
    setCodeError(false);
  };

  const goToCatalog = () => {
    handleClose();
    router.push("/catalogo");
  };

  const explore = () => {
    handleClose();
    const section = document.getElementById("catalogo");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    else router.push("/catalogo");
  };

  const submitCode = (e: FormEvent) => {
    e.preventDefault();
    const ok = applyPromo(code);
    setCodeError(!ok);
    if (ok) setCode("");
  };

  const checkout = () => {
    clear();
    setOrdered(true);
  };

  return (
    <dialog
      ref={dialogRef}
      id="carrello-drawer"
      aria-labelledby="carrello-titolo"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="cart-drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-md overflow-hidden bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-primary/10 px-6 py-5">
          <h2
            id="carrello-titolo"
            className="flex items-center gap-3 text-xl font-bold"
          >
            Il tuo carrello
            {count > 0 && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-sm font-semibold text-white">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Chiudi il carrello"
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

        {ordered ? (
          <OrderDone onClose={explore} />
        ) : items.length === 0 ? (
          <EmptyCart onExplore={goToCatalog} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {productSavings > 0 && (
                <p className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/20 to-primary/10 px-3 py-2 text-sm font-medium text-ink">
                  <span aria-hidden="true">✨</span>
                  Stai risparmiando{" "}
                  <strong className="text-primary">
                    {formatPrice(productSavings)}
                  </strong>{" "}
                  sul prezzo di listino
                </p>
              )}

              <ul className="divide-y divide-primary/10">
                {items.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="animate-menu-in flex gap-3 py-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={productUrl(product)}
                          onClick={handleClose}
                          className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Rimuovi ${product.name}`}
                          className={`${iconBtn} -mr-2 -mt-1 shrink-0`}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-[18px] w-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-ink/70">{product.format}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div
                          className="flex items-center gap-2"
                          role="group"
                          aria-label={`Quantità di ${product.name}`}
                        >
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            aria-label="Diminuisci la quantità"
                            className={stepBtn}
                          >
                            −
                          </button>
                          <span
                            className="w-5 text-center text-sm font-semibold"
                            aria-live="polite"
                          >
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            disabled={qty >= maxQty}
                            aria-label="Aumenta la quantità"
                            className={stepBtn}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {formatPrice(finalPrice(product) * qty)}
                          </p>
                          {qty > 1 && (
                            <p className="text-xs text-ink/60">
                              {formatPrice(finalPrice(product))} cad.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Suggestions title="Ti potrebbe interessare" />
            </div>

            <div className="border-t border-primary/10 bg-surface/60 px-6 py-5">
              {promo ? (
                <p className="mb-4 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  <span>
                    Codice <strong>{promo}</strong> applicato (−10%)
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Rimuovi
                  </button>
                </p>
              ) : (
                <form onSubmit={submitCode} className="mb-4">
                  <label htmlFor="codice-sconto" className="sr-only">
                    Codice sconto
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="codice-sconto"
                      type="text"
                      autoComplete="off"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setCodeError(false);
                      }}
                      placeholder="Codice sconto (prova GIUNTI10)"
                      aria-invalid={codeError}
                      aria-describedby={codeError ? "codice-errore" : undefined}
                      className="min-w-0 flex-1 rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm transition-colors placeholder:text-ink/50 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                    />
                    <button
                      type="submit"
                      className="rounded-lg border-2 border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Applica
                    </button>
                  </div>
                  {codeError && (
                    <p id="codice-errore" className="mt-1 text-sm text-red-700">
                      Codice non valido.
                    </p>
                  )}
                </form>
              )}

              <dl className="space-y-1 text-sm" aria-live="polite">
                <div className="flex justify-between text-ink/70">
                  <dt>Totale di listino</dt>
                  <dd className={productSavings > 0 ? "line-through" : ""}>
                    {formatPrice(listTotal)}
                  </dd>
                </div>
                {productSavings > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <dt>Sconto prodotti</dt>
                    <dd>−{formatPrice(productSavings)}</dd>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <dt>Codice {promo}</dt>
                    <dd>−{formatPrice(promoDiscount)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between pt-2 text-lg font-bold">
                  <dt>Totale</dt>
                  <dd className="text-2xl text-primary">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-xs text-ink/60">
                IVA inclusa · Spedizione gratuita
              </p>

              <button
                type="button"
                onClick={checkout}
                className="mt-4 w-full rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Procedi al pagamento
              </button>
              <button
                type="button"
                onClick={explore}
                className="mt-2 w-full rounded-lg px-6 py-2 text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                Continua gli acquisti
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};
