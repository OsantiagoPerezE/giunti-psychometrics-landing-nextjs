"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/data/catalog";
import { finalPrice } from "@/lib/price";
import type { Product } from "@/types/product";

const STORAGE_KEY = "giunti-carrello";
const PROMO_CODE = "GIUNTI10";
const PROMO_RATE = 0.1;
const MAX_QTY = 9;
const TOAST_MS = 4000;

interface CartLine {
  id: string;
  qty: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

interface Toast {
  id: number;
  message: string;
  action?: { label: string; run: () => void };
}

interface CartState {
  items: CartItem[];
  count: number;
  listTotal: number;
  subtotal: number;
  productSavings: number;
  promo: string | null;
  promoDiscount: number;
  total: number;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  bump: number;
  toast: Toast | null;
  dismissToast: () => void;
  addToCart: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  maxQty: number;
}

const CartContext = createContext<CartState | null>(null);

const round2 = (n: number) => Math.round(n * 100) / 100;

const readStorage = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.id === "string" &&
        Number.isInteger(l?.qty) &&
        l.qty >= 1 &&
        l.qty <= MAX_QTY &&
        products.some((p) => p.id === l.id),
    );
  } catch {
    return [];
  }
};

const EMPTY_LINES: CartLine[] = [];
let linesCache: CartLine[] | null = null;
const listeners = new Set<() => void>();

const getSnapshot = () => (linesCache ??= readStorage());
const getServerSnapshot = () => EMPTY_LINES;
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const setLines = (next: CartLine[] | ((prev: CartLine[]) => CartLine[])) => {
  linesCache = typeof next === "function" ? next(getSnapshot()) : next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(linesCache));
  } catch {}
  listeners.forEach((l) => l());
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);
  const [promo, setPromo] = useState<string | null>(null);
  const removed = useRef<{ line: CartLine; index: number } | null>(null);
  const toastId = useRef(0);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const openCart = useCallback(() => {
    setToast(null);
    setOpen(true);
  }, []);
  const closeCart = useCallback(() => setOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((message: string, action?: Toast["action"]) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message, action });
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === product.id);
        if (!found)
          return [...prev, { id: product.id, qty: Math.min(MAX_QTY, qty) }];
        return prev.map((l) =>
          l.id === product.id
            ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) }
            : l,
        );
      });
      setBump((n) => n + 1);
      showToast(`«${product.name}» aggiunto al carrello`, {
        label: "Vedi carrello",
        run: openCart,
      });
    },
    [showToast, openCart],
  );

  const undoRemove = useCallback(() => {
    const last = removed.current;
    if (!last) return;
    removed.current = null;
    setLines((prev) => {
      if (prev.some((l) => l.id === last.line.id)) return prev;
      const next = [...prev];
      next.splice(Math.min(last.index, next.length), 0, last.line);
      return next;
    });
    setToast(null);
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      const index = lines.findIndex((l) => l.id === id);
      if (index === -1) return;
      removed.current = { line: lines[index], index };
      setLines((prev) => prev.filter((l) => l.id !== id));
      const name = products.find((p) => p.id === id)?.name ?? "Prodotto";
      showToast(`«${name}» rimosso`, { label: "Annulla", run: undoRemove });
    },
    [lines, showToast, undoRemove],
  );

  const setQty = useCallback(
    (id: string, qty: number) => {
      if (qty < 1) return removeItem(id);
      setLines((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l,
        ),
      );
    },
    [removeItem],
  );

  const clear = useCallback(() => {
    setLines([]);
    setPromo(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() !== PROMO_CODE) return false;
    setPromo(PROMO_CODE);
    return true;
  }, []);
  const removePromo = useCallback(() => setPromo(null), []);

  const items = useMemo<CartItem[]>(
    () =>
      lines.flatMap((l) => {
        const product = products.find((p) => p.id === l.id);
        return product ? [{ product, qty: l.qty }] : [];
      }),
    [lines],
  );

  const value = useMemo<CartState>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const listTotal = items.reduce((n, i) => n + i.product.price * i.qty, 0);
    const subtotal = items.reduce(
      (n, i) => n + finalPrice(i.product) * i.qty,
      0,
    );
    const promoDiscount = promo ? round2(subtotal * PROMO_RATE) : 0;
    return {
      items,
      count,
      listTotal,
      subtotal,
      productSavings: listTotal - subtotal,
      promo,
      promoDiscount,
      total: subtotal - promoDiscount,
      open,
      openCart,
      closeCart,
      bump,
      toast,
      dismissToast,
      addToCart,
      setQty,
      removeItem,
      clear,
      applyPromo,
      removePromo,
      maxQty: MAX_QTY,
    };
  }, [
    items,
    promo,
    open,
    openCart,
    closeCart,
    bump,
    toast,
    dismissToast,
    addToCart,
    setQty,
    removeItem,
    clear,
    applyPromo,
    removePromo,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartState => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};
