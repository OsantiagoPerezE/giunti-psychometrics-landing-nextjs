import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import {
  PlpActiveFilters,
  activeFilterCount,
} from "@/components/plp/PlpActiveFilters";
import { PlpFilters } from "@/components/plp/PlpFilters";
import { PlpMobileFilters } from "@/components/plp/PlpMobileFilters";
import { PlpPagination } from "@/components/plp/PlpPagination";
import { PlpSort } from "@/components/plp/PlpSort";
import { categories, costrutti, temi } from "@/data/catalog";
import {
  PLP_PATH,
  computeFacets,
  parsePlpParams,
  queryProducts,
} from "@/lib/catalog-query";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const singleSelection = (params: ReturnType<typeof parsePlpParams>) => {
  const picked = [
    ...params.categories.map((id) => ({
      title: categories.find((c) => c.id === id)?.label,
      crumb: categories.find((c) => c.id === id)?.label,
    })),
    ...params.topics.map((slug) => {
      const label = temi.find((t) => t.slug === slug)?.label;
      return { title: label, crumb: label && `Tema: ${label}` };
    }),
    ...params.constructs.map((slug) => {
      const label = costrutti.find((c) => c.slug === slug)?.label;
      return { title: label, crumb: label && `Costrutto: ${label}` };
    }),
  ];
  return picked.length === 1 ? picked[0] : null;
};

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const params = parsePlpParams(await searchParams);
  const heading = singleSelection(params)?.title;
  return {
    title: heading
      ? `${heading} · Catalogo · Giunti Psychometrics`
      : "Catalogo test e corsi · Giunti Psychometrics",
    description:
      "Sfoglia il catalogo di test psicologici e corsi di formazione: filtra per categoria, formato e prezzo.",
  };
};

const CatalogoPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = parsePlpParams(await searchParams);
  const { items, total, pages, page } = queryProducts(params);
  const current = { ...params, page };
  const active = activeFilterCount(current);
  const facets = computeFacets(current);
  const single = singleSelection(params);
  const heading = single?.title;
  const trail = single?.crumb ? [single.crumb] : [];

  return (
    <main
      id="contenuto"
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Catalogo", href: trail.length ? PLP_PATH : undefined },
          ...trail.map((label) => ({ label })),
        ]}
      />

      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-ink md:text-4xl">
          {heading ?? "Catalogo test e corsi"}
        </h1>
        <p className="mt-2 max-w-2xl text-ink/70">
          Test psicologici e corsi di formazione per professionisti. Filtra per
          categoria, formato e prezzo.
        </p>
      </header>

      <div className="plp lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside
          aria-label="Filtri"
          className="hidden lg:block lg:[@media(min-height:860px)]:sticky lg:[@media(min-height:860px)]:top-24"
        >
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <PlpFilters params={current} facets={facets} idPrefix="d" />
          </div>
        </aside>

        <section
          id="elenco"
          aria-labelledby="elenco-risultati"
          className="plp-results scroll-mt-28"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="elenco-risultati"
              role="status"
              className="text-sm font-medium text-ink/80"
            >
              {total === 1 ? "1 prodotto trovato" : `${total} prodotti trovati`}
              {pages > 1 && ` · pagina ${page} di ${pages}`}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <PlpMobileFilters
                params={current}
                facets={facets}
                total={total}
                activeCount={active}
              />
              <PlpSort params={current} />
            </div>
          </div>

          <PlpActiveFilters params={current} />

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/30 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-ink">
                Nessun prodotto corrisponde ai filtri.
              </p>
              <p className="mt-1 text-ink/70">
                Prova a cambiare i filtri o a cercare un altro nome.
              </p>
              <Link
                href={PLP_PATH}
                className="mt-5 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Azzera i filtri
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((product, i) => (
                <li key={product.id}>
                  <ProductCard product={product} priority={i < 3} />
                </li>
              ))}
            </ul>
          )}

          <PlpPagination params={current} page={page} pages={pages} />
        </section>
      </div>
    </main>
  );
};

export default CatalogoPage;
