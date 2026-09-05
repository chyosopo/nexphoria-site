/* ═══ Bringing the answer into view (2026-09-05) ═══
   Chiya: "select updates on the bottom of the screen and I have to scroll
   up." A filter chosen from a sticky row while the reader is deep in the
   list replaced the list under them; a goal chosen from a tile on the
   phone left the results a screen below. One helper: after a choice, the
   results block sits under the header (and the chip row on the phone).
   Desktop readers already see the results beside the tiles, so there the
   page moves only when they had scrolled past the block. */
const HEADER_PX = 64;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToResults(id: string, opts: { always?: boolean; extra?: number } = {}) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const offset = HEADER_PX + (opts.extra ?? 0) + 8;
  const top = el.getBoundingClientRect().top;
  const scrolledPast = top < offset - 4;
  if (!opts.always && !scrolledPast) return;
  if (opts.always && Math.abs(top - offset) < 6) return;
  window.scrollTo({ top: Math.max(0, window.scrollY + top - offset), behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
