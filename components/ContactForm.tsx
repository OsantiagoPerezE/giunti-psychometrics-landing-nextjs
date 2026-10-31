"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

interface FormValues {
  nome: string;
  email: string;
  messaggio: string;
}

type Field = keyof FormValues;
type FormErrors = Partial<Record<Field, string>>;

const FIELDS: Field[] = ["nome", "email", "messaggio"];
const EMPTY: FormValues = { nome: "", email: "", messaggio: "" };
const MIN_NAME = 2;
const MIN_MESSAGE = 10;
const SEND_DELAY_MS = 800;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  const nome = values.nome.trim();
  const email = values.email.trim();
  const messaggio = values.messaggio.trim();

  if (!nome) errors.nome = "Il nome è obbligatorio.";
  else if (nome.length < MIN_NAME)
    errors.nome = `Il nome deve contenere almeno ${MIN_NAME} caratteri.`;

  if (!email) errors.email = "L'email è obbligatoria.";
  else if (!EMAIL_RE.test(email))
    errors.email = "Inserisci un indirizzo email valido (es. nome@dominio.it).";

  if (!messaggio) errors.messaggio = "Il messaggio è obbligatorio.";
  else if (messaggio.length < MIN_MESSAGE)
    errors.messaggio = `Il messaggio deve contenere almeno ${MIN_MESSAGE} caratteri.`;

  return errors;
};

const fieldClass = (invalid: boolean) =>
  `w-full rounded-lg border bg-white px-4 py-2.5 text-ink transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    invalid ? "border-red-700" : "border-primary/30"
  }`;

const RequiredMark = () => {
  return (
    <span aria-hidden="true" className="ml-0.5 text-red-700">
      *
    </span>
  );
};

const ErrorText = ({ id, message }: { id: string; message: string }) => {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1 flex items-start gap-1.5 text-sm text-red-700"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5M12 16.5h.01" />
      </svg>
      {message}
    </p>
  );
};

export const ContactForm = () => {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messaggioRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const refs = { nome: nomeRef, email: emailRef, messaggio: messaggioRef };

  const errors = validate(values);
  const shown = (f: Field) => (touched[f] || attempted ? errors[f] : undefined);
  const hasVisibleErrors = FIELDS.some((f) => shown(f));

  useEffect(() => {
    if (!sending) return;
    const timer = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, SEND_DELAY_MS);
    return () => clearTimeout(timer);
  }, [sending]);

  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setAttempted(true);
    const firstInvalid = FIELDS.find((f) => errors[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }
    setSentName(values.nome.trim());
    setSending(true);
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setAttempted(false);
    setSent(false);
  };

  if (sent) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-emerald-700/30 bg-emerald-50 p-8 text-emerald-900 outline-none"
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-lg text-white"
          >
            ✓
          </span>
          <h3 className="text-xl font-semibold">Messaggio inviato!</h3>
        </div>
        <p className="mt-3">
          Grazie{sentName ? `, ${sentName}` : ""}! Abbiamo ricevuto la tua
          richiesta e ti risponderemo il prima possibile.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full border border-emerald-900 px-5 py-2 text-sm font-semibold transition-colors hover:bg-emerald-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  const describe = (f: Field, extra?: string) =>
    [shown(f) ? `${f}-errore` : null, extra].filter(Boolean).join(" ") ||
    undefined;
  const bind = (f: Field) => ({
    id: f,
    name: f,
    value: values[f],
    onChange: (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [f]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-required": true as const,
    "aria-invalid": !!shown(f),
    disabled: sending,
  });
  const messageLength = values.messaggio.trim().length;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={sending}
      className="space-y-5 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-8"
    >
      <p className="text-sm text-ink/70">
        I campi contrassegnati con{" "}
        <span aria-hidden="true" className="text-red-700">
          *
        </span>
        <span className="sr-only">un asterisco</span> sono obbligatori.
      </p>

      <div>
        <label
          htmlFor="nome"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Nome
          <RequiredMark />
        </label>
        <input
          {...bind("nome")}
          ref={nomeRef}
          type="text"
          autoComplete="name"
          maxLength={80}
          aria-describedby={describe("nome")}
          className={fieldClass(!!shown("nome"))}
        />
        {shown("nome") && (
          <ErrorText id="nome-errore" message={shown("nome")!} />
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Email
          <RequiredMark />
        </label>
        <input
          {...bind("email")}
          ref={emailRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={120}
          aria-describedby={describe("email")}
          className={fieldClass(!!shown("email"))}
        />
        {shown("email") && (
          <ErrorText id="email-errore" message={shown("email")!} />
        )}
      </div>

      <div>
        <label
          htmlFor="messaggio"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Messaggio
          <RequiredMark />
        </label>
        <textarea
          {...bind("messaggio")}
          ref={messaggioRef}
          rows={5}
          maxLength={1000}
          aria-describedby={describe("messaggio", "messaggio-aiuto")}
          className={fieldClass(!!shown("messaggio"))}
        />
        <div className="mt-1 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {shown("messaggio") && (
              <ErrorText id="messaggio-errore" message={shown("messaggio")!} />
            )}
          </div>
          <p
            id="messaggio-aiuto"
            className={`shrink-0 text-xs ${messageLength >= MIN_MESSAGE ? "text-emerald-800" : "text-ink/60"}`}
          >
            {messageLength >= MIN_MESSAGE ? "✓ " : ""}
            {messageLength}/{MIN_MESSAGE} caratteri minimi
          </p>
        </div>
      </div>

      {attempted && hasVisibleErrors && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          Controlla i campi evidenziati in rosso prima di inviare il messaggio.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {sending && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {sending ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
};
