import type { CategoryId, Product, ProductFormat } from "@/types/product";
import { normalize } from "./format";
import { finalPrice } from "./price";

export interface CatalogFilters {
  query: string;
  category: CategoryId | "tutti";
  formats: ProductFormat[];
  priceMin: number | null;
  priceMax: number | null;
}

export const filterProducts = (
  list: Product[],
  f: CatalogFilters,
): Product[] => {
  const q = normalize(f.query.trim());
  return list.filter(
    (p) =>
      (f.category === "tutti" || p.category === f.category) &&
      normalize(p.name).includes(q) &&
      (f.formats.length === 0 || f.formats.includes(p.format)) &&
      (f.priceMin === null || finalPrice(p) >= f.priceMin) &&
      (f.priceMax === null || finalPrice(p) <= f.priceMax),
  );
};
