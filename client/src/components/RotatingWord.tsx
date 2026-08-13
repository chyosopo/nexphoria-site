/* ═══ ROTATING WORD — the headline's one moving part ═══

   Chiya: "The home page should work like a little slide, maybe just one word,
   like the IvyRx I showed you."

   The reference holds one fixed sentence and colours a single phrase. Ours
   cycles that phrase through the goals we actually treat, which does a job a
   static headline cannot: a visitor who came for weight loss and a visitor who
   came for desire both see their own reason in the first line, without a
   segmentation gate asking them to choose.

   MOTION RULES THIS OBEYS
   · The words come from the LIVE catalog, so the headline can never advertise
     a goal we no longer sell — the failure that had the nav pointing at four
     dead categories.
   · The slot used to be sized to the LONGEST word so the sentence would not
     jump on every tick. That fixed the jump and bought a worse problem: with
     "lean composition" holding the slot open, the short words left a visible
     hole after "Peptides for" — a gap that reads as a broken layout, and one
     that is on screen most of the cycle. The slot now MEASURES the current
     word and animates its width to it, so the headline closes up around each
     word instead of sitting in the widest one's footprint. The width change is
     the motion; the word itself still only fades and lifts.
   · Under prefers-reduced-motion it does not cycle at all. It renders the
     first word and stops — not a faster animation, no animation. Someone who
     asked the OS to stop moving things did not ask for a subtler version.
   · aria-live is off and the full list ships in a visually-hidden span, so a
     screen reader is read one coherent sentence rather than being interrupted
     every three seconds by a word changing under it. */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function prefersReduced(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RotatingWord({
  words,
  intervalMs = 2600,
  className,
  style,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = prefersReduced();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [reduced, words.length, intervalMs]);

  /* Measure the CURRENT word and animate the slot to it. Width is read off a
     hidden span rendering that exact word in the inherited face, so the number
     is the real rendered advance rather than a character-count estimate.
     Re-measured when the webfont finishes loading and on resize, because the
     display face lands after first paint and a fallback-metric width would
     leave the slot slightly wrong for the life of the page. */
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = sizerRef.current;
      if (el) setW(el.getBoundingClientRect().width);
    };
    measure();
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    fonts?.ready?.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [i, words]);

  return (
    <span
      className={className}
      style={{
        ...style,
        position: "relative", display: "inline-grid", verticalAlign: "baseline",
        width: w === null ? undefined : `${w}px`,
        /* Not transitioned under reduced motion: the word never changes there,
           so the only width change would be the one-off measurement snap. */
        transition: reduced ? undefined : "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Invisible sizer — the current word, holding the row open at its own
          width while the slot animates toward it. */}
      {/* justifySelf/width are load-bearing, not cosmetic. Every span here
          shares grid-area 1/1, so a stretched sizer measures the COLUMN —
          which the longest word sets — and the slot would keep reporting the
          widest word's width no matter which word is showing. max-content
          makes it measure its own text. */}
      <span
        ref={sizerRef}
        aria-hidden
        style={{ visibility: "hidden", gridArea: "1 / 1", whiteSpace: "nowrap", justifySelf: "start", width: "max-content" }}
      >
        {words[i]}
      </span>
      {words.map((w, n) => (
        /* Each word is its OWN width, pinned to the slot's left edge.
           Without this they stretch to the grid column — whose min-content is
           set by the longest word and cannot shrink below it — and then centre
           their text inside that wider box, pushing the visible word right by
           half the difference. That offset was the gap after "Peptides for",
           and it survived fixing the measurement because the container was
           already the right width; it was the CHILD that was not. Longer words
           overflow to the right for the half second the slot is animating,
           which is invisible: they are fading out as it happens. */
        <span
          key={w}
          aria-hidden
          className={n === i ? "nx-rotword is-in" : "nx-rotword"}
          style={{ gridArea: "1 / 1", whiteSpace: "nowrap", justifySelf: "start", width: "max-content" }}
        >
          {w}
        </span>
      ))}
      {/* One coherent sentence for assistive tech. */}
      <span className="nx-sr-only" style={{ gridArea: "1 / 1" }}>{words.join(", ")}</span>
    </span>
  );
}
