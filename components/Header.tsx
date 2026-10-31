"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  categories,
  costrutti,
  platformItems,
  platformLabel,
  temi,
  utilityLinks,
} from "@/data/catalog";
import { buildPlpUrl, type PlpParams } from "@/lib/catalog-query";
import { useCart } from "./CartProvider";
import { SearchModal } from "./SearchModal";
import { UtilityMenu } from "./UtilityMenu";
import { useHoverMenu } from "./useHoverMenu";

interface NavItem {
  label: string;
  href: string;
  category?: PlpParams["categories"][number];
}

const navItems: NavItem[] = [
  { label: "Formazione", href: "/catalogo", category: "formazione" },
  { label: "Risorse", href: "/#risorse" },
  { label: "Contatti", href: "/contatti" },
];

const linkClass =
  "relative rounded px-1 py-2 text-lg font-medium after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=true]:text-primary aria-[current=true]:after:scale-x-100 motion-reduce:after:transition-none lg:text-xl text-ink hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const iconButton =
  "relative flex h-11 w-11 items-center justify-center rounded-full md:h-12 md:w-12 text-ink transition-all duration-200 hover:bg-surface hover:text-primary active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const Icon = ({ children }: { children: ReactNode }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};

const MenuColumn = ({
  title,
  twoCols,
  children,
}: {
  title: string;
  twoCols?: boolean;
  children: ReactNode;
}) => {
  return (
    <div>
      <p className="border-b border-ink/20 pb-3 text-xl font-bold text-ink">
        {title}
      </p>
      <ul
        className={`mt-6 grid gap-x-8 gap-y-4 ${twoCols ? "md:grid-cols-2" : ""}`}
      >
        {Array.isArray(children)
          ? children.map((c, i) => <li key={i}>{c}</li>)
          : children}
      </ul>
    </div>
  );
};

const MenuButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-lg text-ink transition-all duration-200 hover:translate-x-1.5 hover:text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </button>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Giunti Psychometrics, vai alla home"
      className="flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-10 w-10 transition-all md:h-12 md:w-12 duration-300 group-data-[scrolled=true]:h-10 group-data-[scrolled=true]:w-10 motion-reduce:transition-none"
      >
        <path d="M6 20 22 4h12L18 20z" fill="#1B4F8A" />
        <path d="M6 36 22 20h12L18 36z" fill="#0EA5E9" />
      </svg>
      <span className="text-lg font-bold leading-[1.05] text-primary transition-all duration-300 md:text-xl lg:text-2xl group-data-[scrolled=true]:lg:text-xl">
        Giunti
        <br />
        Psychometrics
      </span>
    </Link>
  );
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { count: cartCount, openCart, bump } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("");
  const testRef = useRef<HTMLElement>(null);
  const test = useHoverMenu(testRef);
  const testOpen = test.open;

  useEffect(() => {
    const sections = ["hero", "catalogo", "risorse", "contatti"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToPlp = (filters: Partial<PlpParams>) => {
    test.close();
    setMenuOpen(false);
    router.push(buildPlpUrl(filters));
  };

  return (
    <header
      ref={testRef}
      className="relative bg-white shadow-sm transition-[background-color,box-shadow] duration-300 group-data-[scrolled=true]:bg-white/85 group-data-[scrolled=true]:shadow-lg group-data-[scrolled=true]:backdrop-blur-md motion-reduce:transition-none"
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-3 px-4 transition-[height] duration-300 group-data-[scrolled=true]:h-16 group-data-[scrolled=true]:lg:h-[72px] motion-reduce:transition-none md:gap-8 md:px-6 lg:h-[94px] lg:gap-20 lg:px-20">
        <Logo />

        <nav
          id="menu-principale"
          aria-label="Navigazione principale"
          className={`${
            menuOpen && !testOpen
              ? "absolute inset-x-0 top-full block border-t border-primary/10 bg-white px-4 py-4 shadow-md"
              : "hidden"
          } lg:static lg:block lg:border-0 lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-9">
            <li>
              <button
                type="button"
                aria-expanded={testOpen}
                aria-controls="menu-test"
                aria-current={active === "catalogo" ? "true" : undefined}
                onClick={test.toggle}
                {...test.hoverHandlers}
                className={`${linkClass} flex items-center gap-1 ${testOpen ? "text-primary after:scale-x-100" : ""}`}
              >
                Test
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${testOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </li>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.category ? (
                  <button
                    type="button"
                    onClick={() => goToPlp({ categories: [item.category!] })}
                    className={`${linkClass} block`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={
                      (
                        item.href.includes("#")
                          ? active === item.href.split("#")[1]
                          : pathname === item.href
                      )
                        ? "true"
                        : undefined
                    }
                    onClick={() => setMenuOpen(false)}
                    className={`${linkClass} block`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-2 md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-lg bg-surface px-6 py-3 text-lg font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Accedi
              </button>
            </li>
            <li className="mt-2 border-t border-ink/10 pt-2 lg:hidden">
              <ul className="flex flex-col gap-1 text-base text-ink/80">
                {[...utilityLinks, platformLabel].map((l) => (
                  <li key={l}>
                    <a
                      href="#inizio"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded px-1 py-1.5 hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
                {platformItems.map((l) => (
                  <li key={l} className="pl-4">
                    <a
                      href="#inizio"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded px-1 py-1.5 hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 md:gap-1.5">
          <UtilityMenu />

          <button
            type="button"
            className="hidden rounded-lg bg-surface px-6 py-3 text-lg font-bold lg:text-xl md:mr-4 text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:block"
          >
            Accedi
          </button>

          <button
            type="button"
            aria-expanded={searchOpen}
            aria-haspopup="dialog"
            aria-controls="ricerca-modal"
            aria-label="Cerca un prodotto"
            onClick={() => setSearchOpen((v) => !v)}
            className={iconButton}
          >
            <Icon>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </Icon>
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-haspopup="dialog"
            aria-controls="carrello-drawer"
            aria-label={`Carrello, ${cartCount} articoli`}
            className={iconButton}
          >
            <span
              key={`bump-${bump}`}
              className={`inline-flex ${bump > 0 ? "animate-bump" : ""}`}
            >
              <Icon>
                <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
                <circle cx="9" cy="19" r="1.4" />
                <circle cx="17" cy="19" r="1.4" />
              </Icon>
            </span>
            {cartCount > 0 && (
              <span
                key={`count-${cartCount}`}
                aria-hidden="true"
                className="animate-pop absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-principale"
            aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
            onClick={() => {
              test.close();
              setMenuOpen((v) => !v);
            }}
            className={`${iconButton} lg:hidden`}
          >
            <Icon>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </Icon>
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{ transform: "scaleX(var(--scroll, 0))" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-data-[scrolled=true]:opacity-100"
      />

      {testOpen && (
        <div
          id="menu-test"
          {...test.hoverHandlers}
          className="animate-menu-in absolute inset-x-0 top-full max-h-[calc(100vh-9rem)] overflow-y-auto border-t border-primary/10 bg-slate-100 shadow-lg"
        >
          <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-6 lg:px-20">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/catalogo"
                onClick={() => {
                  test.close();
                  setMenuOpen(false);
                }}
                className="rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Scopri tutti i test
              </Link>
              <Link
                href="/#catalogo"
                onClick={() => {
                  test.close();
                  setMenuOpen(false);
                }}
                className="rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Test e corsi in evidenza
              </Link>
              <button
                type="button"
                onClick={() => test.close()}
                className="ml-auto rounded-lg px-3 py-2 text-sm font-medium text-ink underline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Chiudi
              </button>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr_2fr]">
              <MenuColumn title="Ambito">
                {categories.map((c) => (
                  <MenuButton
                    key={c.id}
                    onClick={() => goToPlp({ categories: [c.id] })}
                  >
                    {c.label}
                  </MenuButton>
                ))}
              </MenuColumn>
              <MenuColumn title="Temi" twoCols>
                {temi.map((l) => (
                  <MenuButton
                    key={l.label}
                    onClick={() => goToPlp({ topics: [l.slug] })}
                  >
                    {l.label}
                  </MenuButton>
                ))}
              </MenuColumn>
              <MenuColumn title="Costrutti" twoCols>
                {costrutti.map((l) => (
                  <MenuButton
                    key={l.label}
                    onClick={() => goToPlp({ constructs: [l.slug] })}
                  >
                    {l.label}
                  </MenuButton>
                ))}
              </MenuColumn>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};
