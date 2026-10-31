import { categories, costrutti, products, temi } from "@/data/catalog";
import type { CategoryId, Product, ProductFormat } from "@/types/product";
import { normalize } from "./format";
import { finalPrice } from "./price";

export const PLP_PATH = "/catalogo";
export const PAGE_SIZE = 9;

export const FORMAT_SLUGS: Record<ProductFormat, string> = {
  Cartaceo: "cartaceo",
  Digitale: "digitale",
  "Corso online": "corso-online",
  "In presenza": "in-presenza",
};
export const FORMATS = Object.keys(FORMAT_SLUGS) as ProductFormat[];

export const SORT_OPTIONS = [
  { id: "rilevanza", label: "Rilevanza" },
  { id: "prezzo-asc", label: "Prezzo: dal più basso" },
  { id: "prezzo-desc", label: "Prezzo: dal più alto" },
  { id: "nome", label: "Nome: da A a Z" },
] as const;
export type SortKey = (typeof SORT_OPTIONS)[number]["id"];

export interface PlpParams {
  q: string;
  categories: CategoryId[];
  formats: ProductFormat[];
  priceMin: number | null;
  priceMax: number | null;
  topics: string[];
  constructs: string[];
  sort: SortKey;
  page: number;
}

export const DEFAULT_PARAMS: PlpParams = {
  q: "",
  categories: [],
  formats: [],
  priceMin: null,
  priceMax: null,
  topics: [],
  constructs: [],
  sort: "rilevanza",
  page: 1,
};

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;
const toNumber = (v: string | undefined) => {
  if (v === undefined || v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export const parsePlpParams = (raw: RawParams): PlpParams => {
  const categoryIds = (first(raw.categoria) ?? "").split(",");
  const formatSlugs = (first(raw.formato) ?? "").split(",");
  const topicSlugs = (first(raw.tema) ?? "").split(",");
  const constructSlugs = (first(raw.costrutto) ?? "").split(",");
  const sort = first(raw.ordina);
  const page = Number(first(raw.pagina));
  return {
    q: (first(raw.q) ?? "").slice(0, 80),
    categories: categories
      .filter((c) => categoryIds.includes(c.id))
      .map((c) => c.id),
    formats: FORMATS.filter((f) => formatSlugs.includes(FORMAT_SLUGS[f])),
    priceMin: toNumber(first(raw.prezzo_min)),
    priceMax: toNumber(first(raw.prezzo_max)),
    topics: temi.filter((t) => topicSlugs.includes(t.slug)).map((t) => t.slug),
    constructs: costrutti
      .filter((c) => constructSlugs.includes(c.slug))
      .map((c) => c.slug),
    sort: SORT_OPTIONS.some((s) => s.id === sort)
      ? (sort as SortKey)
      : "rilevanza",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
};

export const buildPlpUrl = (overrides: Partial<PlpParams> = {}): string => {
  const p = { ...DEFAULT_PARAMS, ...overrides };
  const sp = new URLSearchParams();
  if (p.q.trim()) sp.set("q", p.q.trim());
  const inOrder = <T extends string>(list: T[], master: readonly T[]) =>
    master.filter((m) => list.includes(m)).join(",");
  if (p.categories.length)
    sp.set(
      "categoria",
      inOrder(
        p.categories,
        categories.map((c) => c.id),
      ),
    );
  if (p.topics.length)
    sp.set(
      "tema",
      inOrder(
        p.topics,
        temi.map((t) => t.slug),
      ),
    );
  if (p.constructs.length)
    sp.set(
      "costrutto",
      inOrder(
        p.constructs,
        costrutti.map((c) => c.slug),
      ),
    );
  if (p.formats.length)
    sp.set("formato", p.formats.map((f) => FORMAT_SLUGS[f]).join(","));
  if (p.priceMin !== null) sp.set("prezzo_min", String(p.priceMin));
  if (p.priceMax !== null) sp.set("prezzo_max", String(p.priceMax));
  if (p.sort !== "rilevanza") sp.set("ordina", p.sort);
  if (p.page > 1) sp.set("pagina", String(p.page));
  const qs = sp.toString().replace(/%2C/gi, ",");
  return qs ? `${PLP_PATH}?${qs}` : PLP_PATH;
};

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  rilevanza: () => 0,
  "prezzo-asc": (a, b) => finalPrice(a) - finalPrice(b),
  "prezzo-desc": (a, b) => finalPrice(b) - finalPrice(a),
  nome: (a, b) => a.name.localeCompare(b.name, "it"),
};

export interface PlpResult {
  items: Product[];
  total: number;
  pages: number;
  page: number;
}

export type FacetGroup = "categories" | "formats" | "topics" | "constructs";

export const matchesParams = (
  p: Product,
  f: PlpParams,
  skip?: FacetGroup,
): boolean => {
  const q = normalize(f.q.trim());
  if (q && !normalize(p.name).includes(q)) return false;
  const price = finalPrice(p);
  if (f.priceMin !== null && price < f.priceMin) return false;
  if (f.priceMax !== null && price > f.priceMax) return false;
  if (
    skip !== "categories" &&
    f.categories.length &&
    !f.categories.includes(p.category)
  )
    return false;
  if (skip !== "formats" && f.formats.length && !f.formats.includes(p.format))
    return false;
  if (
    skip !== "topics" &&
    f.topics.length &&
    !f.topics.some((t) => p.topics.includes(t))
  )
    return false;
  if (
    skip !== "constructs" &&
    f.constructs.length &&
    !f.constructs.some((c) => p.constructs.includes(c))
  )
    return false;
  return true;
};

export const queryProducts = (p: PlpParams): PlpResult => {
  const filtered = products
    .filter((item) => matchesParams(item, p))
    .sort(sorters[p.sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(p.page, pages);
  return {
    items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: filtered.length,
    pages,
    page,
  };
};

export interface Facets {
  categories: Record<string, number>;
  formats: Record<string, number>;
  topics: Record<string, number>;
  constructs: Record<string, number>;
}

export const computeFacets = (f: PlpParams): Facets => {
  const base = (skip: FacetGroup) =>
    products.filter((p) => matchesParams(p, f, skip));
  const cat = base("categories");
  const fmt = base("formats");
  const top = base("topics");
  const con = base("constructs");
  return {
    categories: Object.fromEntries(
      categories.map((c) => [
        c.id,
        cat.filter((p) => p.category === c.id).length,
      ]),
    ),
    formats: Object.fromEntries(
      FORMATS.map((x) => [x, fmt.filter((p) => p.format === x).length]),
    ),
    topics: Object.fromEntries(
      temi.map((t) => [
        t.slug,
        top.filter((p) => p.topics.includes(t.slug)).length,
      ]),
    ),
    constructs: Object.fromEntries(
      costrutti.map((c) => [
        c.slug,
        con.filter((p) => p.constructs.includes(c.slug)).length,
      ]),
    ),
  };
};

export const productUrl = (p: Product) => `/prodotto/${p.slug}`;
export const findBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
