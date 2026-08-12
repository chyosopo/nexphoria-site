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
