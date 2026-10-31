import type { ReactNode } from "react";

interface Item {
  label: string;
  icon: ReactNode;
}

const svg = (d: string) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const items: Item[] = [
  {
    label: "Spedizione gratuita",
    icon: svg(
      "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01",
    ),
  },
  {
    label: "Pagamenti sicuri",
    icon: svg("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4"),
  },
  {
    label: "Test validati",
    icon: svg(
      "M12 3l2.5 2 3.2-.3.8 3.1 2.8 1.7-1.2 3 1.2 3-2.8 1.7-.8 3.1-3.2-.3L12 21l-2.5-2-3.2.3-.8-3.1L2.7 14.5l1.2-3-1.2-3 2.8-1.7.8-3.1 3.2.3zM9 12l2 2 4-4",
    ),
  },
  {
    label: "Centro assistenza",
    icon: svg("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
  },
];

export const TrustBar = () => {
  return (
    <section aria-label="I nostri vantaggi" className="bg-ink text-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:px-6 md:grid-cols-4 lg:px-8">
        {items.map((i) => (
          <li
            key={i.label}
            className="flex flex-col items-center gap-3 text-center transition-transform duration-200 hover:-translate-y-1"
          >
            {i.icon}
            <span className="font-semibold">{i.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
