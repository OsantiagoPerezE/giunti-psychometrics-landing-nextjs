"use client";

import { useEffect } from "react";

export const ScrollTopOnArrival = () => {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "back_forward" || window.location.hash) return;

    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });

    const restore = () =>
      setTimeout(() => (history.scrollRestoration = "auto"), 300);
    if (document.readyState === "complete") restore();
    else window.addEventListener("load", restore, { once: true });
  }, []);

  return null;
};
