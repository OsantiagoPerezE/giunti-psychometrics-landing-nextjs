import Image from "next/image";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  alt: string;
}

const articles: Article[] = [
  {
    title: "Benessere nei luoghi di lavoro: da dove iniziare",
    excerpt:
      "Come la valutazione psicologica aiuta a costruire ambienti di lavoro più sostenibili.",
    image: "/images/prodotti/prodotto_10.jpg",
    alt: "Persone che collaborano in un workshop",
  },
  {
    title: "Lavorare insieme tra generazioni diverse",
    excerpt: "Spunti pratici per valorizzare le differenze di età nei team.",
    image: "/images/prodotti/prodotto_05.jpg",
    alt: "Team di lavoro di età diverse attorno a un tavolo",
  },
];

export const News = () => {
  return (
    <section
      id="risorse"
      aria-labelledby="notizie-titolo"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-0 pt-12 md:px-6 lg:px-8"
    >
      <h2 id="notizie-titolo" className="text-3xl font-bold text-ink">
        Notizie e approfondimenti
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {articles.map((a) => (
          <li key={a.title}>
            <article className="group h-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
              <div className="relative aspect-[16/7] overflow-hidden bg-surface">
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  fetchPriority="low"
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-ink/80">{a.excerpt}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
