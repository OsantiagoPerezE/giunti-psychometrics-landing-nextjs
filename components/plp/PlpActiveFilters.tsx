import Link from "next/link";
import { categories, costrutti, temi } from "@/data/catalog";
import { buildPlpUrl, type PlpParams } from "@/lib/catalog-query";
import { formatPrice } from "@/lib/format";

const chip =
  "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const activeFilterCount = (p: PlpParams) => {
  return (
    p.categories.length +
    p.formats.length +
    p.topics.length +
    p.constructs.length +
    (p.priceMin !== null || p.priceMax !== null ? 1 : 0)
  );
};

export const PlpActiveFilters = ({ params }: { params: PlpParams }) => {
  const chips: { label: string; href: string }[] = [];
  const without = (o: Partial<PlpParams>) =>
    buildPlpUrl({ ...params, ...o, page: 1 });

  if (params.q.trim())
    chips.push({
      label: `Ricerca: «${params.q.trim()}»`,
      href: without({ q: "" }),
    });
  params.categories.forEach((id) =>
    chips.push({
      label: categories.find((c) => c.id === id)?.label ?? id,
      href: without({ categories: params.categories.filter((x) => x !== id) }),
    }),
  );
  params.topics.forEach((slug) =>
    chips.push({
      label: `Tema: ${temi.find((t) => t.slug === slug)?.label ?? slug}`,
      href: without({ topics: params.topics.filter((x) => x !== slug) }),
    }),
  );
  params.constructs.forEach((slug) =>
    chips.push({
      label: `Costrutto: ${costrutti.find((c) => c.slug === slug)?.label ?? slug}`,
      href: without({
        constructs: params.constructs.filter((x) => x !== slug),
      }),
    }),
  );
  params.formats.forEach((f) =>
    chips.push({
      label: f,
      href: without({ formats: params.formats.filter((x) => x !== f) }),
    }),
  );
  if (params.priceMin !== null || params.priceMax !== null) {
    const from =
      params.priceMin !== null ? formatPrice(params.priceMin) : "0 €";
    const to =
      params.priceMax !== null ? formatPrice(params.priceMax) : "senza limite";
    chips.push({
      label: `Prezzo: ${from} – ${to}`,
      href: without({ priceMin: null, priceMax: null }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <ul
      className="mb-5 flex flex-wrap items-center gap-2"
      aria-label="Filtri attivi"
    >
      {chips.map((c) => (
        <li key={c.label}>
          <Link href={c.href} scroll={false} className={chip}>
            {c.label}
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Rimuovi il filtro</span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={buildPlpUrl({ sort: params.sort })}
          scroll={false}
          className="rounded px-2 py-1 text-sm font-semibold text-ink/70 underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
        >
          Azzera tutto
        </Link>
      </li>
    </ul>
  );
};
