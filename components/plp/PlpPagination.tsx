"use client";

import Link from "next/link";
import { buildPlpUrl, type PlpParams } from "@/lib/catalog-query";
import { scrollToResults } from "@/lib/scroll";

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const PlpPagination = ({
  params,
  page,
  pages,
}: {
  params: PlpParams;
  page: number;
  pages: number;
}) => {
  if (pages <= 1) return null;
  const href = (n: number) => buildPlpUrl({ ...params, page: n });
  const go = () => scrollToResults();

  return (
    <nav
      aria-label="Paginazione"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          rel="prev"
          scroll={false}
          onClick={go}
          className={`${base} border-primary/30 bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only">Pagina precedente</span>
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className={`${base} border-primary/10 text-ink/30`}
        >
          ←
        </span>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          scroll={false}
          onClick={go}
          aria-label={`Pagina ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={`${base} ${
            n === page
              ? "border-primary bg-primary text-white"
              : "border-primary/30 bg-white text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {n}
        </Link>
      ))}
      {page < pages ? (
        <Link
          href={href(page + 1)}
          rel="next"
          scroll={false}
          onClick={go}
          className={`${base} border-primary/30 bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <span aria-hidden="true">→</span>
          <span className="sr-only">Pagina successiva</span>
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className={`${base} border-primary/10 text-ink/30`}
        >
          →
        </span>
      )}
    </nav>
  );
};
