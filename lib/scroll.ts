export const scrollToResults = ({ onlyIfAbove = false } = {}) => {
  const el = document.getElementById("elenco");
  if (!el) return;
  if (onlyIfAbove && el.getBoundingClientRect().top >= 0) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};
