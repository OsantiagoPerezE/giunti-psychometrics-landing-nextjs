"use client";

import { useRef } from "react";
import { platformItems, utilityLinks as links } from "@/data/catalog";
import { useHoverMenu } from "./useHoverMenu";

const linkClass =
  "inline-flex items-center gap-1 rounded transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const TopBar = () => {
  const platformRef = useRef<HTMLLIElement>(null);
  const platform = useHoverMenu(platformRef);

  return (
    <div className="grid grid-rows-[1fr] bg-white transition-[grid-template-rows] duration-300 group-data-[scrolled=true]:grid-rows-[0fr] motion-reduce:transition-none">
      <div className="min-h-0 border-b border-ink/10 text-sm text-ink transition-[visibility] delay-0 group-data-[scrolled=true]:invisible group-data-[scrolled=true]:overflow-hidden group-data-[scrolled=true]:delay-300 lg:text-base">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 md:px-6 lg:px-20 lg:py-4">
          <p>Spedizioni gratuite per gli ordini online</p>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l}>
                <a href="#inizio" className={linkClass}>
                  {l}
                </a>
              </li>
            ))}
            <li
              ref={platformRef}
              className="relative"
              {...platform.hoverHandlers}
            >
              <button
                type="button"
                aria-expanded={platform.open}
                aria-controls="menu-piattaforma"
                onClick={platform.toggle}
                className={`${linkClass} ${platform.open ? "text-primary underline underline-offset-4" : ""}`}
              >
                Accesso alla piattaforma
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform duration-200 ${platform.open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {platform.open && (
                <div
                  id="menu-piattaforma"
                  className="animate-menu-in absolute right-0 top-full z-50 w-72 pt-2"
                >
                  <ul className="rounded-xl border border-primary/10 bg-white p-2 shadow-xl">
                    {platformItems.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={platform.close}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-ink transition-all duration-150 hover:translate-x-1 hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
