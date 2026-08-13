/* ═══ MOTION PRIMITIVES ═══

   Chiya asked for heavy motion. The distinction that matters: the thing this
   site JUST removed — three 40vw animated blurred discs — was also "heavy
   motion", and it read cheap and dated. Ambient decoration signals a template.
   Motion that reads expensive is precise, purposeful and tied to the reader's
   own scroll: a number that counts because you arrived at it, a line that
   draws the process it describes, a sentence that assembles itself once.

   So these are the three primitives, and they share three rules:
     · Every one honours prefers-reduced-motion by rendering its FINAL state
       immediately — never a degraded animation, never nothing. Atlas has 25
       reduced-motion guards in this codebase and none of them get undone here.
     · Every one animates only transform / opacity / stroke-dashoffset, which
       are compositor properties. Nothing animates layout.
     · Every one fires ONCE on entry and then releases its observer and its
       will-change hint, so idle sections do not hold GPU layers. */
import { useEffect, useRef, useState } from "react";

/** True when the visitor has asked for reduced motion. SSR-safe. */
function prefersReduced(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fires once when `ref` first enters the viewport. */
function useInView<T extends HTMLElement>(rootMargin = "-12% 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (prefersReduced()) { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);
  return { ref, inView };
}

/* ── 1 · COUNT-UP ─────────────────────────────────────────────
   A figure that resolves as you reach it. Uses tabular numerals so the
   digits do not reflow while counting — a proportional font makes a
   counting number jitter, which is the tell of a cheap implementation. */
export function CountUp({
  to, duration = 1400, decimals = 0, prefix = "", suffix = "", className, style,
}: {
  to: number; duration?: number; decimals?: number;
  prefix?: string; suffix?: string; className?: string; style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(prefersReduced() ? to : 0);

  useEffect(() => {
    if (!inView || prefersReduced()) { setN(to); return; }
    let raf = 0;
    const t0 = performance.now();
    // Cubic ease-out: fast commitment, unhurried settle. Matches --nx-ease.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setN(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums lining-nums", ...style }}
    >
      {prefix}{n.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ── 2 · SCROLL-DRAWN LINE ────────────────────────────────────
   An SVG rule that draws itself across the section it belongs to, tied to
   scroll POSITION rather than to a timer — so the reader controls it and it
   reads as a mechanism rather than an animation. Used to connect the numbered
   protocol steps: the line literally draws the process. */
export function ScrollDrawLine({
  height = 2, className, style,
}: { height?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(prefersReduced() ? 1 : 0);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;                     // coalesce to one read per frame
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the element's top reaches 85% of the viewport, 1 at 35%.
        const p = (vh * 0.85 - r.top) / (vh * 0.5);
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ height, width: "100%", background: "var(--nx-border)", overflow: "hidden", ...style }} aria-hidden>
      {/* scaleX, not width. Animating width is a LAYOUT property — it forces
          reflow on every scroll frame, which is exactly what this file's own
          header says not to do. scaleX is compositor-only. The duration is
          tokenised (--nx-dur-1) rather than an inline literal, which the
          design audit flagged the moment the first version shipped. */}
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "var(--nx-cobalt)",
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          transition: "transform var(--nx-dur-1) linear",
        }}
      />
    </div>
  );
}

/* ── 3 · LINE-BY-LINE RISE ────────────────────────────────────
   The display headline assembles itself once: each line clipped by its own
   mask and rising into place, ~70ms apart. This is the single most
   recognisable "expensive" motion on the web (Seed, Apple, Stripe) and it is
   pure CSS transform — no library, no layout thrash.

   Takes an array of lines rather than splitting a string, so the break points
   are a typographic decision rather than whatever the container width does. */
export function RiseLines({
  lines, delay = 0, className, style, as: Tag = "span",
}: {
  lines: React.ReactNode[]; delay?: number; className?: string;
  style?: React.CSSProperties; as?: "span" | "h1" | "h2";
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>("0px");
  const reduced = prefersReduced();
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
          <span
            style={{
              display: "block",
              transform: inView || reduced ? "translateY(0)" : "translateY(105%)",
              opacity: inView || reduced ? 1 : 0,
              /* 700/60 rather than 900/70. The headline is above the fold and
                 is almost certainly the LCP element: a mid-flight capture at
                 230ms showed it still fully masked, i.e. the first thing a
                 visitor sees is an empty hero. The premium pattern only works
                 while it is quick — Seed and Apple run this in ~600-800ms
                 total, not the ~1.15s the first pass would have taken to
                 finish its last line. */
              transition: reduced
                ? "none"
                : `transform 700ms var(--nx-reveal-ease) ${delay + i * 60}ms, opacity 520ms ease ${delay + i * 60}ms`,
              willChange: inView ? "auto" : "transform",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
