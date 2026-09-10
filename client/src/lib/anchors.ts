/** In-page anchor hrefs that survive the runtime <base> tag.
    client/index.html writes <base href="<app-root>/"> at boot so relative
    asset and image URLs resolve at any route depth on any host. Side
    effect: a bare href="#x" ALSO resolves against the base — clicking it
    navigates to the app root (the gate) instead of scrolling. Anchor to
    the current pathname explicitly to keep fragment navigation in-page. */
export function anchor(hash: string): string {
  if (typeof window === "undefined") return hash;
  return window.location.pathname + window.location.search + hash;
}

/** Click handler for the "Shop now" buttons on a medicine or protocol page:
    scroll to the buy box in place. Every one of those buttons used to be a
    bare href="#buy", which the runtime <base> resolved to the app root —
    "Shop now" sent the reader to the home page (Chiya, 2026-09-10: "when I
    click the buttons it doesn't take me to checkout, just goes over and over
    again the same page"). */
export function scrollToBuy(e?: { preventDefault: () => void }): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById("buy");
  if (!el) return;
  e?.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const first = el.querySelector<HTMLElement>('[role="radio"], button, a');
  first?.focus({ preventScroll: true });
}
