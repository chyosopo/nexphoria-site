/* ═══ The route crossfade ═══
   The pages crossfade on a route change: the leaving page fades in 160ms,
   the arriving one in 300ms. Opacity only: a transform on this wrapper
   would re-parent every position:fixed bar (the buy bar, the cart bar) for
   the length of the entrance. initial={false} keeps the first paint static
   for the prerender; mode="wait" lets useSeo's scroll-to-top land while the
   new page is still transparent. */
import { useLocation } from "wouter";
import { AnimatePresence, m, EASE } from "@/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [loc] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={loc}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, ease: EASE } }}
        exit={{ opacity: 0, transition: { duration: 0.16, ease: "easeOut" } }}
        className="nx-page"
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
