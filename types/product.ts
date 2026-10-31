export type CategoryId = "clinica" | "scuola" | "lavoro" | "formazione";

export type ProductKind = "test" | "corso";

export type ProductFormat =
  | "Cartaceo"
  | "Digitale"
  | "Corso online"
  | "In presenza";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  author: string;
  kind: ProductKind;
  category: CategoryId;
  format: ProductFormat;
  ageRange?: string;
  startDate?: string;
  price: number;
  discountPrice?: number;
  description: string;
  topics: string[];
  constructs: string[];
  includes: string[];
  image: string;
  imageAlt: string;
  hours?: number;
  ecm?: number;
}
