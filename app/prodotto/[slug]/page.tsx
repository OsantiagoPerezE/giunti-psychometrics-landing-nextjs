import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PdpPurchase } from "@/components/pdp/PdpPurchase";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";
import { PLP_PATH, buildPlpUrl, findBySlug } from "@/lib/catalog-query";
import { formatDate, formatPrice } from "@/lib/format";
import { finalPrice, hasPromo } from "@/lib/price";
import type { ProductFormat } from "@/types/product";

const badgeStyles: Record<ProductFormat, string> = {
  Cartaceo: "bg-amber-100 text-amber-900",
  Digitale: "bg-sky-100 text-sky-900",
  "Corso online": "bg-indigo-100 text-indigo-900",
  "In presenza": "bg-emerald-100 text-emerald-900",
};

const summaryClass =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-1 py-4 text-lg font-semibold text-ink transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden";

type Params = Promise<{ slug: string }>;

export const generateStaticParams = () => {
  return products.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const product = findBySlug((await params).slug);
  if (!product) return { title: "Prodotto non trovato · Giunti Psychometrics" };
  return {
    title: `${product.name} · Giunti Psychometrics`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
};

const ProdottoPage = async ({ params }: { params: Params }) => {
  const product = findBySlug((await params).slug);
  if (!product) notFound();

  const isCourse = product.kind === "corso";
  const category = categories.find((c) => c.id === product.category);
  const promo = hasPromo(product);
  const discount = Math.round((1 - finalPrice(product) / product.price) * 100);

  const related = [
    ...products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    ),
    ...products.filter(
      (p) => p.id !== product.id && p.category !== product.category,
    ),
  ].slice(0, 3);

  const specs: [string, string][] = [
    ["Tipo", isCourse ? "Corso di formazione" : "Test psicologico"],
    ["Formato", product.format],
    ["Categoria", category?.label ?? ""],
    [isCourse ? "Docente" : "Autore", product.author],
    ...(isCourse && product.startDate
      ? ([["Data di inizio", formatDate(product.startDate)]] as [
          string,
          string,
        ][])
      : ([["Età di applicazione", product.ageRange ?? "—"]] as [
          string,
          string,
        ][])),
    ...(isCourse
      ? ([
          ["Durata", `${product.hours} ore`],
          ["Crediti ECM", String(product.ecm)],
        ] as [string, string][])
      : []),
    ...(promo
      ? ([["Prezzo di listino", formatPrice(product.price)]] as [
          string,
          string,
        ][])
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    category: category?.label,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: finalPrice(product).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main
      id="contenuto"
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Catalogo", href: PLP_PATH },
          ...(category
            ? [
                {
                  label: category.label,
                  href: buildPlpUrl({ categories: [category.id] }),
                },
              ]
            : []),
          { label: product.name },
        ]}
      />

      <article className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-sm lg:sticky lg:top-32 lg:self-start">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="object-cover"
            eager
            spinner
          />
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold ${badgeStyles[product.format]}`}
          >
            {product.format}
          </span>
          {promo && (
            <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-bold text-ink">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          {category && (
            <Link
              href={buildPlpUrl({ categories: [category.id] })}
              className="text-sm font-bold uppercase tracking-wide text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {category.label}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-ink/70">
            {isCourse ? "Docente" : "Autore"}:{" "}
            <span className="font-medium text-ink">{product.author}</span>
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-4xl font-bold text-primary">
              {formatPrice(finalPrice(product))}
            </span>
            {promo && (
              <>
                <span className="rounded bg-accent px-2 py-0.5 text-sm font-bold text-ink">
                  -{discount}%
                </span>
                <span className="text-lg text-ink/60">
                  <span className="sr-only">Prezzo originale: </span>
                  <s>{formatPrice(product.price)}</s>
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-sm text-ink/60">
            IVA inclusa · Spedizione gratuita
          </p>

          <p className="mt-6 leading-relaxed text-ink/80">
            {product.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            {(isCourse && product.startDate
              ? [
                  `Inizio: ${formatDate(product.startDate)}`,
                  `${product.hours} ore`,
                  `${product.ecm} ECM`,
                ]
              : [`Età: ${product.ageRange}`]
            ).map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <PdpPurchase product={product} />
          </div>

          <ul className="mt-6 grid gap-3 text-sm text-ink/80 sm:grid-cols-3">
            {[
              "Spedizione gratuita",
              "Pagamenti sicuri",
              "Assistenza dedicata",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-primary"
                >
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <section
        aria-label="Dettagli del prodotto"
        className="mt-12 divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-white px-5 shadow-sm md:px-8"
      >
        <details open className="group py-1">
          <summary className={summaryClass}>
            Cosa include
            <span
              aria-hidden="true"
              className="text-primary transition-transform duration-200 group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <ul className="grid gap-2 pb-5 sm:grid-cols-2">
            {product.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-ink/80">
                <span aria-hidden="true" className="text-primary">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </details>
        <details open className="group py-1">
          <summary className={summaryClass}>
            Caratteristiche
            <span
              aria-hidden="true"
              className="text-primary transition-transform duration-200 group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <dl className="grid gap-x-8 pb-5 sm:grid-cols-2">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-primary/10 py-2 text-sm"
              >
                <dt className="text-ink/70">{label}</dt>
                <dd className="text-right font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </details>
        <details className="group py-1">
          <summary className={summaryClass}>
            Spedizione e resi
            <span
              aria-hidden="true"
              className="text-primary transition-transform duration-200 group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <p className="pb-5 text-ink/80">
            La spedizione è gratuita per gli ordini online. I prodotti fisici
            possono essere resi entro 14 giorni se integri; i prodotti digitali
            e i corsi seguono le condizioni indicate al momento
            dell&apos;acquisto. Questo è un progetto dimostrativo con dati
            fittizi.
          </p>
        </details>
      </section>

      <section aria-labelledby="correlati" className="mt-16">
        <h2 id="correlati" className="text-2xl font-bold text-ink">
          Potrebbe interessarti
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ProdottoPage;
