/* ═══ The teaching diagrams, drawn (2026-09-05) ═══
   Two inline SVGs for the home explainer: the peptide chain (a short chain
   of amino acids) and the marker chart (one marker read at week 0 and at
   week 12). Tokens only; they repaint with the palette. Each draws itself
   once when it scrolls into view and rests in its finished state under
   prefers-reduced-motion. */
import { useEffect, useRef, useState } from "react";
import { F } from "@/lib/typography";
import { RETEST_WEEK } from "@/data/monitoring";

function useOn() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

/* The backbone: a gentle wave across the frame; beads sit on it. */
const BEADS = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  const x = 70 + t * 460;
  const y = 200 + Math.sin(t * Math.PI * 2 - 0.4) * 62;
  return { x, y, r: i % 2 === 0 ? 24 : 18 };
});
const BACKBONE = BEADS.map((b, i) => (i === 0 ? `M${b.x} ${b.y}` : `L${b.x} ${b.y}`)).join(" ");

export function PeptideChain() {
  const { ref, on } = useOn();
  return (
    <div ref={ref} className={`nx-diagram${on ? " is-on" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 600 400" width="100%" height="100%">
        <defs>
          <radialGradient id="nx-bead" cx=".35" cy=".3" r=".8">
            <stop offset="0" stopColor="var(--nx-ceramic)" />
            <stop offset=".55" stopColor="var(--nx-cobalt-soft)" />
            <stop offset="1" stopColor="var(--nx-ice-edge)" />
          </radialGradient>
        </defs>
        <path className="nx-diagram__line" d={BACKBONE} fill="none" stroke="var(--nx-cobalt)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        {BEADS.map((b, i) => (
          <g key={i} className="nx-diagram__bead" style={{ ["--i" as string]: i, transformOrigin: `${b.x}px ${b.y}px` }}>
            <circle cx={b.x} cy={b.y + 6} r={b.r} fill="var(--nx-fg)" fillOpacity=".10" />
            <circle cx={b.x} cy={b.y} r={b.r} fill="url(#nx-bead)" stroke="var(--nx-fg)" strokeOpacity=".22" strokeWidth="1.5" />
          </g>
        ))}
        <text x="70" y="352" fontFamily={F} fontSize="15" fontWeight="600" letterSpacing="2" fill="var(--nx-fg-muted)">AMINO ACIDS, IN SEQUENCE</text>
      </svg>
    </div>
  );
}

export function MarkerChart() {
  const { ref, on } = useOn();
  const x0 = 110, x1 = 500, y0 = 262, y1 = 150;
  const line = `M${x0} ${y0} C${x0 + 150} ${y0 - 10} ${x1 - 120} ${y1 + 8} ${x1} ${y1}`;
  return (
    <div ref={ref} className={`nx-diagram${on ? " is-on" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 600 400" width="100%" height="100%">
        {/* reference range */}
        <rect x="80" y="120" width="460" height="130" rx="10" fill="var(--nx-cobalt)" fillOpacity=".06" />
        <text x="96" y="140" fontFamily={F} fontSize="13" fontWeight="600" letterSpacing="2" fill="var(--nx-cobalt)">REFERENCE RANGE</text>
        {/* axes */}
        <line x1="80" y1="300" x2="540" y2="300" stroke="var(--nx-border)" strokeWidth="2" />
        <line x1="80" y1="90" x2="80" y2="300" stroke="var(--nx-border)" strokeWidth="2" />
        <text x="26" y="200" fontFamily={F} fontSize="14" fontWeight="600" letterSpacing="2" fill="var(--nx-fg-muted)" transform="rotate(-90 26 200)" textAnchor="middle">IGF-1</text>
        {/* the read */}
        <path className="nx-diagram__line" d={line} fill="none" stroke="var(--nx-cobalt)" strokeWidth="5" strokeLinecap="round" pathLength={1} />
        <g className="nx-diagram__bead" style={{ ["--i" as string]: 0, transformOrigin: `${x0}px ${y0}px` }}>
          <circle cx={x0} cy={y0} r="11" fill="var(--nx-ceramic)" stroke="var(--nx-cobalt)" strokeWidth="4" />
        </g>
        <g className="nx-diagram__bead" style={{ ["--i" as string]: 6, transformOrigin: `${x1}px ${y1}px` }}>
          <circle cx={x1} cy={y1} r="11" fill="var(--nx-cobalt)" stroke="var(--nx-ceramic)" strokeWidth="4" />
        </g>
        <text x={x0} y="336" fontFamily={F} fontSize="16" fontWeight="600" fill="var(--nx-fg)" textAnchor="middle">Week 0</text>
        <text x={x0} y="358" fontFamily={F} fontSize="13" fill="var(--nx-fg-muted)" textAnchor="middle">before the first dose</text>
        <text x={x1} y="336" fontFamily={F} fontSize="16" fontWeight="600" fill="var(--nx-fg)" textAnchor="middle">Week {RETEST_WEEK}</text>
        <text x={x1} y="358" fontFamily={F} fontSize="13" fill="var(--nx-fg-muted)" textAnchor="middle">the same panel again</text>
      </svg>
    </div>
  );
}
