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
   · It animates opacity and transform only, so it never triggers layout. The
     slot is sized to the LONGEST word up front, which is why the sentence
     after it does not jump on every cycle.
   · Under prefers-reduced-motion it does not cycle at all. It renders the
     first word and stops — not a faster animation, no animation. Someone who
     asked the OS to stop moving things did not ask for a subtler version.
   · aria-live is off and the full list ships in a visually-hidden span, so a
     screen reader is read one coherent sentence rather than being interrupted
     every three seconds by a word changing under it. */
import { useEffect, useState } from "react";

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

  /* The widest word reserves the slot. Without this the rest of the sentence
     reflows on every tick, which reads as a bug rather than a flourish. */
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? "");

  return (
    <span className={className} style={{ ...style, position: "relative", display: "inline-grid", verticalAlign: "baseline" }}>
      {/* Invisible sizer — occupies the row, holds the width open. */}
      <span aria-hidden style={{ visibility: "hidden", gridArea: "1 / 1", whiteSpace: "nowrap" }}>{widest}</span>
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden
          className={n === i ? "nx-rotword is-in" : "nx-rotword"}
          style={{ gridArea: "1 / 1", whiteSpace: "nowrap" }}
        >
          {w}
        </span>
      ))}
      {/* One coherent sentence for assistive tech. */}
      <span className="nx-sr-only" style={{ gridArea: "1 / 1" }}>{words.join(", ")}</span>
    </span>
  );
}
