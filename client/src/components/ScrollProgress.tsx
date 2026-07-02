import { useEffect } from "react";

/**
 * ScrollProgress
 * Renders a thin fixed bar at the top of the page whose width tracks scroll depth.
 * Uses a CSS variable so the animation runs off the compositor (transform: scaleX).
 * Respects prefers-reduced-motion (hidden entirely).
 */
export function ScrollProgress() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(Math.max(scrolled / max, 0), 1);
      doc.style.setProperty("--nx-scroll-progress", pct.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div aria-hidden className="nx-scroll-progress" />;
}
