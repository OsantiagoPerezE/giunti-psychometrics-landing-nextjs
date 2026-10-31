"use client";

import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    setError("");
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <p role="status" className="font-semibold">
        Grazie! Ti sei iscritto alla newsletter.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email per la newsletter
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="esempio@email.com"
        aria-invalid={!!error}
        aria-describedby={error ? "newsletter-errore" : undefined}
        className="w-full rounded-lg border border-white/50 bg-transparent px-4 py-3 text-white placeholder:text-sky-100/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      {error && (
        <p id="newsletter-errore" className="text-sm text-red-200">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Iscrivimi
      </button>
    </form>
  );
};
