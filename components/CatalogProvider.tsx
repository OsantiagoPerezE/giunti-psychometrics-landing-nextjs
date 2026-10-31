"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CategoryId, ProductFormat } from "@/types/product";

export type CategoryFilter = CategoryId | "tutti";

interface CatalogState {
  query: string;
  setQuery: (value: string) => void;
  category: CategoryFilter;
  setCategory: (value: CategoryFilter) => void;
  formats: ProductFormat[];
  toggleFormat: (format: ProductFormat) => void;
  priceMin: number | null;
  priceMax: number | null;
  setPriceMin: (value: number | null) => void;
  setPriceMax: (value: number | null) => void;
  activeFilterCount: number;
  resetFilters: () => void;
}

const CatalogContext = createContext<CatalogState | null>(null);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("tutti");
  const [formats, setFormats] = useState<ProductFormat[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const toggleFormat = useCallback(
    (format: ProductFormat) =>
      setFormats((prev) =>
        prev.includes(format)
          ? prev.filter((f) => f !== format)
          : [...prev, format],
      ),
    [],
  );
  const resetFilters = useCallback(() => {
    setFormats([]);
    setPriceMin(null);
    setPriceMax(null);
  }, []);

  const activeFilterCount =
    formats.length + (priceMin !== null || priceMax !== null ? 1 : 0);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      category,
      setCategory,
      formats,
      toggleFormat,
      priceMin,
      priceMax,
      setPriceMin,
      setPriceMax,
      activeFilterCount,
      resetFilters,
    }),
    [
      query,
      category,
      formats,
      toggleFormat,
      priceMin,
      priceMax,
      activeFilterCount,
      resetFilters,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogState => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog debe usarse dentro de CatalogProvider");
  return ctx;
};
