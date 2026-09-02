/* ═══ SectionLine — the signature, used as the divider between sections.
   The marker line, baseline dot to retest dot, draws itself once as it
   enters view. Reduced motion shows it drawn. */
import { useEffect, useRef, useState } from "react";

export function SectionLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDrawn(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [drawn]);
  return (
    <div ref={ref} className="nx-container nx-section-line" aria-hidden="true">
      <svg className={`nx-marker-line ${drawn ? "nx-marker-drawn" : ""}`} viewBox="0 0 1200 24" preserveAspectRatio="none" style={{ ["--draw" as string]: drawn ? 1 : 0 }}>
        <circle className="nx-ml-a" cx="6" cy="12" r="4" />
        <path d="M12 12 C 200 12, 320 4, 520 12 S 880 20, 1060 12 S 1180 10, 1188 12" pathLength={1} />
        <circle className="nx-ml-b" cx="1194" cy="12" r="4" />
      </svg>
    </div>
  );
}
