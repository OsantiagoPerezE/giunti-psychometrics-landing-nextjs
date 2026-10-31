import type { Product } from "@/types/product";

export const hasPromo = (p: Product): boolean =>
  p.discountPrice !== undefined && p.discountPrice < p.price;

export const finalPrice = (p: Product): number =>
  hasPromo(p) ? (p.discountPrice as number) : p.price;

export const discountPercent = (p: Product): number =>
  hasPromo(p) ? Math.round((1 - finalPrice(p) / p.price) * 100) : 0;
