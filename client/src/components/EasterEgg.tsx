import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * EasterEgg — a quiet reward for the curious.
 *
 * Konami code (↑ ↑ ↓ ↓ ← → ← → B A) reveals a hidden brand line for a few
 * seconds, then fades out. In-memory state only (no storage — the sandbox
 * iframe blocks it). Respects prefers-reduced-motion. Tasteful, on-brand,
 * never silly: it surfaces the founding ethos, not a meme.
 */

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const onKey = (e: KeyboardEvent) => {
      // Ignore while typing in a field.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      const expected = SEQUENCE[idx];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        idx += 1;
        if (idx === SEQUENCE.length) {
          idx = 0;
          setRevealed(true);
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => setRevealed(false), 5200);
        }
      } else {
        idx = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {revealed && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw]"
        >
          <div className="flex items-center gap-3 rounded-full border border-primary/40 bg-background/95 px-5 py-3 shadow-2xl backdrop-blur">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              Protocol unlocked
            </span>
            <span className="hidden sm:inline text-fluid-sm text-foreground/80">
              The molecules that matter — done right.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
