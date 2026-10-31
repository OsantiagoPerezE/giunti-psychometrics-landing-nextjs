"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type FormEvent, type ReactNode } from "react";
import { categories, costrutti, temi } from "@/data/catalog";
import {
  FORMATS,
  buildPlpUrl,
  type Facets,
  type PlpParams,
} from "@/lib/catalog-query";
import { scrollToResults } from "@/lib/scroll";

interface PlpFiltersProps {
  params: PlpParams;
  facets: Facets;
  idPrefix: string;
}

const legend = "text-sm font-bold uppercase tracking-wide text-ink/70";
const inputClass =
  "w-full rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm text-ink transition-colors placeholder:text-ink/50 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20";

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

interface OptionProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}

const Option = ({ label, count, checked, onChange }: OptionProps) => {
  const disabled = count === 0 && !checked;
  return (
    <label
      className={`flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-45"
          : "cursor-pointer hover:bg-surface"
      }`}
    >
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="h-4 w-4 accent-primary"
        />
        {label}
      </span>
      <span className="rounded-full bg-primary/10 px-2 text-xs font-bold text-primary">
        {count}
      </span>
    </label>
  );
};

const Group = ({
  title,
  selected,
  children,
}: {
  title: string;
  selected: number;
  children: ReactNode;
}) => {
  return (
    <details
      open={selected > 0}
      className="group border-t border-primary/10 pt-4"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded text-sm font-bold uppercase tracking-wide text-ink/70 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          {title}
          {selected > 0 && (
            <span className="rounded-full bg-primary px-2 text-xs font-bold normal-case text-white">
              {selected}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="text-primary transition-transform duration-200 group-open:rotate-180"
        >
          ⌄
        </span>
      </summary>
      <div className="mt-2 space-y-0.5">{children}</div>
    </details>
  );
};

export const PlpFilters = ({ params, facets, idPrefix }: PlpFiltersProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const apply = (overrides: Partial<PlpParams>) =>
    startTransition(() => {
      router.push(buildPlpUrl({ ...params, ...overrides, page: 1 }), {
        scroll: false,
      });
      scrollToResults({ onlyIfAbove: true });
    });

  const toNumber = (value: FormDataEntryValue | null) => {
    const text = String(value ?? "").trim();
    return text === "" || Number.isNaN(Number(text)) || Number(text) < 0
      ? null
      : Number(text);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apply({ q: String(new FormData(e.currentTarget).get("q") ?? "") });
  };

  const submitPrice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    apply({
      priceMin: toNumber(data.get("min")),
      priceMax: toNumber(data.get("max")),
    });
  };

  return (
    <div
      className={`space-y-5 transition-opacity ${pending ? "opacity-60" : ""}`}
      aria-busy={pending}
    >
      <form role="search" onSubmit={submitSearch} className="relative">
        <label htmlFor={`${idPrefix}-q`} className="sr-only">
          Cerca nel catalogo per nome
        </label>
        <input
          key={params.q}
          id={`${idPrefix}-q`}
          name="q"
          type="search"
          autoComplete="off"
          defaultValue={params.q}
          placeholder="Cerca per nome…"
          className={`${inputClass} pr-11`}
        />
        <button
          type="submit"
          aria-label="Cerca"
          className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink/70 transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </form>

      <p className="text-xs text-ink/60">
        Puoi selezionare più opzioni in ogni filtro.
      </p>

      <fieldset>
        <legend className={legend}>Categoria</legend>
        <div className="mt-2 space-y-0.5">
          {categories.map((c) => (
            <Option
              key={c.id}
              label={c.label}
              count={facets.categories[c.id] ?? 0}
              checked={params.categories.includes(c.id)}
              onChange={() =>
                apply({ categories: toggle(params.categories, c.id) })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>Formato</legend>
        <div className="mt-2 space-y-0.5">
          {FORMATS.map((f) => (
            <Option
              key={f}
              label={f}
              count={facets.formats[f] ?? 0}
              checked={params.formats.includes(f)}
              onChange={() => apply({ formats: toggle(params.formats, f) })}
            />
          ))}
        </div>
      </fieldset>

      <Group title="Tema" selected={params.topics.length}>
        {temi.map((t) => (
          <Option
            key={t.slug}
            label={t.label}
            count={facets.topics[t.slug] ?? 0}
            checked={params.topics.includes(t.slug)}
            onChange={() => apply({ topics: toggle(params.topics, t.slug) })}
          />
        ))}
      </Group>

      <Group title="Costrutto" selected={params.constructs.length}>
        {costrutti.map((c) => (
          <Option
            key={c.slug}
            label={c.label}
            count={facets.constructs[c.slug] ?? 0}
            checked={params.constructs.includes(c.slug)}
            onChange={() =>
              apply({ constructs: toggle(params.constructs, c.slug) })
            }
          />
        ))}
      </Group>

      <fieldset className="border-t border-primary/10 pt-4">
        <legend className={legend}>Prezzo (€)</legend>
        <form onSubmit={submitPrice} className="mt-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor={`${idPrefix}-min`} className="sr-only">
                Prezzo minimo
              </label>
              <input
                key={`min-${params.priceMin}`}
                id={`${idPrefix}-min`}
                name="min"
                type="number"
                inputMode="numeric"
                min={0}
                defaultValue={params.priceMin ?? ""}
                placeholder="Da"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-max`} className="sr-only">
                Prezzo massimo
              </label>
              <input
                key={`max-${params.priceMax}`}
                id={`${idPrefix}-max`}
                name="max"
                type="number"
                inputMode="numeric"
                min={0}
                defaultValue={params.priceMax ?? ""}
                placeholder="A"
                className={inputClass}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Applica prezzo
          </button>
        </form>
      </fieldset>

      <Link
        href={buildPlpUrl({ sort: params.sort })}
        scroll={false}
        className="inline-block rounded text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Azzera tutti i filtri
      </Link>
    </div>
  );
};
