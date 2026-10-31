"use client";

import { useRef } from "react";
import { platformItems, platformLabel, utilityLinks } from "@/data/catalog";
import { useHoverMenu } from "./useHoverMenu";

const itemClass =
  "w-full rounded-lg px-3 py-2.5 text-left text-ink transition-all duration-150 hover:translate-x-1 hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent";

export const UtilityMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const menu = useHoverMenu(ref);

  return (
    <div
      ref={ref}
      className="animate-menu-in relative hidden lg:group-data-[scrolled=true]:block"
      {...menu.hoverHandlers}
    >
      <button
        type="button"
        aria-label="Collegamenti rapidi"
        title="Collegamenti rapidi"
        aria-expanded={menu.open}
        aria-controls="menu-collegamenti"
        onClick={menu.toggle}
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:bg-surface hover:text-primary active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          menu.open ? "bg-surface text-primary" : "text-ink"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[22px] w-[22px]"
          fill="currentColor"
        >
          {[6, 12, 18].flatMap((x) =>
            [6, 12, 18].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />
            )),
          )}
        </svg>
      </button>

      {menu.open && (
        <div
          id="menu-collegamenti"
          className="animate-menu-in absolute right-0 top-full z-50 w-72 pt-2"
        >
          <div className="rounded-xl border border-primary/10 bg-white p-2 shadow-xl">
            <ul>
              {utilityLinks.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={menu.close}
                    className={itemClass}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-ink/10 px-3 pb-1 pt-3 text-sm font-bold text-ink">
              {platformLabel}
            </p>
            <ul>
              {platformItems.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={menu.close}
                    className={itemClass}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
