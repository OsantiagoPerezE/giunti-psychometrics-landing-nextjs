"use client";

import { useCart } from "./CartProvider";

export const CartToast = () => {
  const { toast, dismissToast, open } = useCart();
  if (!toast || open) return null;

  return (
    <div
      key={toast.id}
      role="status"
      className="animate-toast-in fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-2xl md:left-auto md:right-6 md:mx-0"
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-ink"
      >
        ✓
      </span>
      <p className="min-w-0 flex-1 truncate">{toast.message}</p>
      {toast.action && (
        <button
          type="button"
          onClick={() => {
            toast.action?.run();
            dismissToast();
          }}
          className="shrink-0 rounded-md px-2 py-1 font-semibold text-accent underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          {toast.action.label}
        </button>
      )}
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Chiudi la notifica"
        className="shrink-0 rounded-md px-1.5 py-1 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
      >
        ✕
      </button>
    </div>
  );
};
