import Image from "next/image";
import Link from "next/link";

interface Promo {
  eyebrow: string;
  title: string;
  points: string[];
  cta: string;
  href: string;
  image: string;
  alt: string;
  icon: string;
}

const promos: Promo[] = [
  {
    eyebrow: "Formazione",
    title:
      "Corsi online e in presenza per imparare a somministrare e interpretare i test, con docenti esperti.",
    points: ["Crediti ECM", "Online e in presenza", "Docenti esperti"],
    cta: "Iscriviti ora",
    href: "/catalogo?categoria=formazione",
    image: "/images/prodotti/prodotto_09.jpg",
    alt: "Persone in videoconferenza durante una lezione",
    icon: "M22 10 12 5 2 10l10 5 10-5ZM6 12v5c0 1 3 3 6 3s6-2 6-3v-5",
  },
  {
    eyebrow: "Risorse",
    title:
      "Guide pratiche, linee guida e approfondimenti per chi lavora con la valutazione psicologica.",
    points: ["Guide pratiche", "Approfondimenti"],
    cta: "Vedi le risorse",
    href: "#risorse",
    image: "/images/banner/banner_risorse.jpg",
    alt: "Pila di libri e manuali",
    icon: "M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2.5ZM8 7h7M8 11h7",
  },
  {
    eyebrow: "Consulenza",
    title:
      "Un aiuto per scegliere gli strumenti più adatti al tuo contesto: clinico, scolastico o aziendale.",
    points: ["Risposta rapida", "Senza impegno"],
    cta: "Contattaci",
    href: "/contatti",
    image: "/images/prodotti/prodotto_07.jpg",
    alt: "Professionista durante un colloquio di lavoro",
    icon: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z",
  },
];

export const PromoBanners = () => {
  return (
    <section
      aria-label="In evidenza"
      className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {promos.map((p, i) => {
          const large = i === 0;
          return (
            <article
              key={p.eyebrow}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/10 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                large
                  ? "min-h-64 md:col-span-2 md:min-h-80 md:p-10"
                  : "min-h-64"
              }`}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                fetchPriority="low"
                sizes={
                  large
                    ? "(min-width: 1280px) 1216px, 100vw"
                    : "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white/85 md:bg-gradient-to-r md:from-white md:from-35% md:via-white/90 md:to-white/60"
              />

              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={p.icon} />
                  </svg>
                  {p.eyebrow}
                </p>
                <h3
                  className={`mt-4 font-semibold leading-snug text-ink ${
                    large ? "max-w-xl text-xl md:text-3xl" : "max-w-md text-xl"
                  }`}
                >
                  {p.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-ink/80">
                  {p.points.map((point) => (
                    <li key={point} className="flex items-center gap-1.5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={p.href}
                className="group/cta relative mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {p.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};
