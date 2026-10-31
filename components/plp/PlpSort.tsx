"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { scrollToResults } from "@/lib/scroll";
import {
  SORT_OPTIONS,
  buildPlpUrl,
  type PlpParams,
  type SortKey,
} from "@/lib/catalog-query";

export const PlpSort = ({ params }: { params: PlpParams }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2 text-sm" aria-busy={pending}>
      <label htmlFor="elenco-ordina" className="whitespace-nowrap text-ink/70">
        Ordina per
      </label>
      <select
        id="elenco-ordina"
        value={params.sort}
        onChange={(e) =>
          startTransition(() => {
            router.push(
              buildPlpUrl({
                ...params,
                sort: e.target.value as SortKey,
                page: 1,
              }),
              {
                scroll: false,
              },
            );
            scrollToResults({ onlyIfAbove: true });
          })
        }
        className="rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};
