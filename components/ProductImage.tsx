"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
  spinner?: boolean;
}

export const ProductImage = ({
  src,
  alt,
  sizes,
  className = "",
  eager = false,
  spinner = false,
}: ProductImageProps) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <>
      {status === "loading" && (
        <div
          aria-hidden={!spinner}
          role={spinner ? "status" : undefined}
          className="absolute inset-0 flex animate-pulse items-center justify-center bg-gradient-to-br from-primary/10 via-surface to-primary/5 motion-reduce:animate-none"
        >
          {spinner && (
            <>
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary motion-reduce:animate-none" />
              <span className="sr-only">Caricamento dell&apos;immagine…</span>
            </>
          )}
        </div>
      )}

      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface px-4 text-center text-sm text-ink/70">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-primary/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="1.8" />
            <path d="m4 18 5-5 4 4 3-3 4 4" />
          </svg>
          Immagine non disponibile
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "low"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={className}
        />
      )}
    </>
  );
};
