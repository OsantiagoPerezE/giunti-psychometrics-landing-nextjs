import Link from "next/link";
import {
  contactChannels,
  footerColumns,
  footerLegalLinks,
  headquarters,
  socialLinks,
  type SocialId,
} from "@/data/catalog";
import { NewsletterForm } from "./NewsletterForm";

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const SocialIcon = ({ id }: { id: SocialId }) => {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <path d="m9.75 15.02 5.75-3.27-5.75-3.27z" />
        </svg>
      );
  }
};

export const Footer = () => {
  const contact = contactChannels[0];

  return (
    <footer className="bg-ink text-white">
      <div className="border-b border-white/15">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 md:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Resta aggiornato</h2>
            <p className="mt-2 max-w-md text-sky-100">
              Ricevi novità su nuovi test, formazione ed eventi direttamente
              nella tua casella email.
            </p>
          </div>
          <div className="lg:max-w-md lg:justify-self-end lg:w-full">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <Link
            href="/"
            aria-label="Giunti Psychometrics, vai alla home"
            className={`inline-flex items-center gap-2 rounded ${focusClass}`}
          >
            <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10">
              <path d="M6 20 22 4h12L18 20z" fill="#ffffff" />
              <path d="M6 36 22 20h12L18 36z" fill="#0EA5E9" />
            </svg>
            <span className="text-xl font-bold leading-[1.05]">
              Giunti
              <br />
              Psychometrics
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-sky-100">
            Test, formazione e risorse per la valutazione psicologica in ambito
            clinico, scolastico e lavorativo.
          </p>
          <address className="mt-5 space-y-2 text-sm not-italic text-sky-100">
            <p>
              <a
                href={`mailto:${contact.email}`}
                className={`rounded hover:text-white hover:underline ${focusClass}`}
              >
                {contact.email}
              </a>
            </p>
            <p>
              {contact.phone && (
                <>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className={`rounded hover:text-white hover:underline ${focusClass}`}
                  >
                    {contact.phone}
                  </a>{" "}
                  ·{" "}
                </>
              )}
              {contact.hours}
            </p>
            <p>{headquarters.lines.join(", ")}</p>
          </address>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-lg font-bold">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-sky-100">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={`inline-block rounded transition-transform duration-200 hover:translate-x-1 hover:text-white hover:underline ${focusClass}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2 text-xs text-sky-100">
            <p>
              © {new Date().getFullYear()} Giunti Psychometrics. Progetto
              dimostrativo con dati fittizi: nomi, prezzi e contenuti non sono
              reali.
            </p>
            <ul
              className="flex flex-wrap gap-x-5 gap-y-1"
              aria-label="Informazioni legali"
            >
              {footerLegalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={`rounded hover:text-white hover:underline ${focusClass}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <ul className="flex gap-3" aria-label="Social network">
              {socialLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-ink ${focusClass}`}
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#inizio"
              className={`inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-ink ${focusClass}`}
            >
              Torna su
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
