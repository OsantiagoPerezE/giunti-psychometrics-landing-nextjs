"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const COLLAPSE_AT = 48;
const EXPAND_AT = 24;

export const StickyChrome = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty(
        "--scroll",
        String(max > 0 ? Math.min(y / max, 1) : 0),
      );
      setScrolled((prev) => (prev ? y > EXPAND_AT : y > COLLAPSE_AT));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="h-[117px] shrink-0 lg:h-[151px]" />
      <div
        ref={ref}
        data-scrolled={scrolled}
        className="group fixed inset-x-0 top-0 z-40"
      >
        {children}
      </div>
    </>
  );
};
