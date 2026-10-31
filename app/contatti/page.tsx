import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { contactChannels, faqs, headquarters } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Contatti · Giunti Psychometrics",
  description:
    "Hai una domanda su un test, un corso o un ordine? Contatta l'assistenza clienti: ti risponderemo il prima possibile.",
};

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  className: "h-5 w-5 shrink-0 text-primary",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const linkClass =
  "rounded font-medium text-primary underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const ContattiPage = () => {
  return (
    <main
      id="contenuto"
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
      />

      <header className="mb-10 mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-ink md:text-4xl">Contattaci</h1>
        <p className="mt-3 text-lg text-ink/80">
          Hai una domanda su un test, un corso o un ordine? Scrivici: ti
          risponderemo il prima possibile.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
        <section aria-labelledby="canali-titolo" className="space-y-4">
          <h2 id="canali-titolo" className="sr-only">
            Canali di contatto
          </h2>
          {contactChannels.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{c.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-3">
                  <svg {...iconProps}>
                    <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
                  </svg>
                  <a href={`mailto:${c.email}`} className={linkClass}>
                    {c.email}
                  </a>
                </li>
                {c.phone && (
                  <li className="flex items-center gap-3">
                    <svg {...iconProps}>
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                    </svg>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className={linkClass}
                    >
                      {c.phone}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3 text-ink/80">
                  <svg {...iconProps}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {c.hours}
                </li>
              </ul>
            </article>
          ))}

          <article className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-ink">
              {headquarters.name}
            </h3>
            <address className="mt-3 flex gap-3 text-sm not-italic text-ink/80">
              <svg {...iconProps}>
                <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>
                {headquarters.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <p className="mt-3 text-xs text-ink/60">
              Dati dimostrativi: indirizzi, telefoni ed email non sono reali.
            </p>
          </article>
        </section>

        <section
          aria-labelledby="modulo-titolo"
          className="lg:sticky lg:top-24"
        >
          <h2 id="modulo-titolo" className="mb-4 text-2xl font-bold text-ink">
            Scrivici un messaggio
          </h2>
          <ContactForm />
        </section>
      </div>

      <section
        id="faq"
        aria-labelledby="faq-titolo"
        className="mt-16 scroll-mt-32"
      >
        <h2 id="faq-titolo" className="text-2xl font-bold text-ink">
          Domande frequenti
        </h2>
        <div className="mt-6 divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-white px-5 shadow-sm md:px-8">
          {faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-1 py-4 text-lg font-semibold text-ink transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                {f.question}
                <span
                  aria-hidden="true"
                  className="text-primary transition-transform duration-200 group-open:rotate-180"
                >
                  ⌄
                </span>
              </summary>
              <p className="pb-5 text-ink/80">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cta-titolo"
        className="mt-16 rounded-3xl bg-ink px-6 py-12 text-center text-white md:px-12"
      >
        <h2 id="cta-titolo" className="text-2xl font-bold md:text-3xl">
          Cerchi un test o un corso?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sky-100">
          Sfoglia il catalogo e filtra per categoria, formato e prezzo.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-flex rounded-lg bg-accent px-8 py-3 font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Esplora il catalogo
        </Link>
      </section>
    </main>
  );
};

export default ContattiPage;
