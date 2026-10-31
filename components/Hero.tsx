import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/catalog";
import { findBySlug, productUrl } from "@/lib/catalog-query";
import { discountPercent, hasPromo } from "@/lib/price";

export const Hero = () => {
  const product = findBySlug(hero.productSlug);
  if (!product) return null;

  const promo = hasPromo(product);
  const url = productUrl(product);

  return (
    <section
      id="hero"
      aria-labelledby="hero-titolo"
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-ink text-white lg:min-h-[38rem]"
    >
      <Image
        src={product.image}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={60}
        sizes="100vw"
        className="-z-20 object-cover object-[70%_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/80 to-ink/75 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/80 lg:to-ink/15"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 md:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:px-8 lg:py-24">
        <div className="animate-hero-in max-w-2xl">
          <p className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-ink shadow-sm">
            {hero.badge}
          </p>
          <h1
            id="hero-titolo"
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            {product.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/95">
            {product.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCta.href}
              className="group/cta inline-flex items-center gap-2 rounded-lg bg-accent px-9 py-4 text-lg font-semibold text-ink shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {hero.primaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={url}
              className="rounded-lg border-2 border-white px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-ink active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {hero.productCtaLabel}
            </Link>
          </div>
        </div>

        {promo && (
          <div
            className="animate-hero-in lg:justify-self-end lg:self-end"
            style={{ animationDelay: "120ms" }}
          >
            <Link
              href={url}
              className="inline-block rounded-2xl border-2 border-white/80 bg-white px-6 py-4 text-ink shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="block text-3xl font-bold text-primary">
                -{discountPercent(product)}%
              </span>
              <span className="mt-0.5 block max-w-[15rem] text-sm font-medium leading-snug">
                {product.name}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
