import { useEffect, useState } from "react";
import { Link } from "wouter";
import { F } from "@/lib/typography";

/* StickyAssessBar (ROADMAP 6.2) — the BuyBox mobile-bar pattern extended to
   long content pages. Mobile-only (lg:hidden), and it mounts only after the
   visitor scrolls past the hero (~900px), so it never doubles the hero's
   solid CTA inside one viewport (CTA law, ROADMAP 1.1). Solid background on
   purpose: backdrop-blur on a fixed bar causes scroll jank on mid phones. */
export function StickyAssessBar({
  label = "Physician-reviewed protocols",
  testid = "sticky-assess-bar",
}: {
  label?: string;
  testid?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div
      className="lg:hidden"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: "var(--nx-z-bar)" as unknown as number,
        background: "var(--nx-ceramic)",
        borderTop: "1px solid var(--nx-border)",
        padding: "10px clamp(16px,4vw,24px) calc(10px + env(safe-area-inset-bottom))",
      }}
      data-testid={testid}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-xs)",
            fontWeight: 600,
            color: "var(--nx-fg-graphite)",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          {label}
        </p>
        <Link
          href="/assessment"
          className="nx-cta-cobalt"
          style={{ flexShrink: 0, fontSize: "var(--nx-t-sm)", padding: "11px 18px" }}
          data-testid={`${testid}-cta`}
        >
          Start your assessment
        </Link>
      </div>
    </div>
  );
}
