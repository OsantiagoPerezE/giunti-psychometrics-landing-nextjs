import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}
export const Breadcrumb = ({ items }: { items: Crumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="rounded underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "font-medium text-ink" : ""}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink/40">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
