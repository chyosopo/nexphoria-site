/* ═══ HoldToRun — the one interactive moment (DESIGN-PACKAGE.md §6.4)

   "Hold to run your 12 weeks." While the visitor holds, the marker line draws
   from the baseline dot to the retest dot and a readout counts the days from
   0 to 90. Releasing early eases the progress back; it never snaps.
   Completing it lights three lines in sequence: Panel drawn. Physician
   reviewed. Dose adjusted. The visitor performs the premise.

   Mechanics: progress lives in a ref and drives the DOM directly; the rAF
   loop rests when converged. Text writes are throttled to ~10Hz and only on
   change. Reduced motion shows the finished state, no hold required. */
import { useEffect, useRef, useState } from "react";
import { F, S } from "@/lib/typography";

const LINES = ["You start your medication.", "Week 12: your blood panel.", "Your dose, adjusted."];
const HOLD_MS = 2200;

export function HoldToRun() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => { setReduced(mq.matches); if (mq.matches) setDone(true); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    const line = lineRef.current;
    const readout = readoutRef.current;
    if (!btn || !line || !readout || reduced) return;

    let holding = false;
    let p = 0;
    let raf: number | null = null;
    let last = 0;
    let lastText = "";
    let lastTextAt = 0;
    let completed = false;

    const write = (now: number) => {
      line.style.setProperty("--draw", p.toFixed(3));
      const days = Math.round(p * 12);
      const text = String(days);
      if (now - lastTextAt > 100 || p === 1 || p === 0) {
        if (text !== lastText) { lastText = text; lastTextAt = now; readout.textContent = text; }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      if (holding) p = Math.min(1, p + dt / HOLD_MS);
      else p = Math.max(0, p - dt / (HOLD_MS * 0.7));
      write(now);
      if (p >= 1 && !completed) {
        completed = true;
        holding = false;
        setDone(true);
      }
      const resting = (holding && p >= 1) || (!holding && p <= 0) || completed;
      if (resting) { raf = null; last = 0; return; }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (completed) return;
      holding = true;
      btn.classList.add("nx-hold-active");
      if (raf === null) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      holding = false;
      btn.classList.remove("nx-hold-active");
      if (raf === null && !completed) raf = requestAnimationFrame(tick);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); stop(); }
    };
    btn.addEventListener("pointerdown", start);
    btn.addEventListener("pointerup", stop);
    btn.addEventListener("pointercancel", stop);
    btn.addEventListener("pointerleave", stop);
    btn.addEventListener("keydown", onKeyDown);
    btn.addEventListener("keyup", onKeyUp);
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
    return () => {
      btn.removeEventListener("pointerdown", start);
      btn.removeEventListener("pointerup", stop);
      btn.removeEventListener("pointercancel", stop);
      btn.removeEventListener("pointerleave", stop);
      btn.removeEventListener("keydown", onKeyDown);
      btn.removeEventListener("keyup", onKeyUp);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className={`nx-hold ${done ? "nx-hold-done" : ""}`} data-testid="hold-to-run">
      <div className="nx-hold-stage">
        <div className="nx-hold-readout" style={{ fontFamily: F }}>
          <span className="nx-hold-label">Week</span>
          <span ref={readoutRef} className="nx-hold-days" aria-live="off">{done ? "12" : "0"}</span>
          <span className="nx-hold-label">of 12</span>
        </div>
        <svg
          ref={lineRef}
          className={`nx-marker-line nx-hold-line ${done ? "nx-marker-drawn" : ""}`}
          viewBox="0 0 640 60"
          aria-hidden="true"
          style={{ ["--draw" as string]: done ? 1 : 0 }}
        >
          <circle className="nx-ml-a" cx="12" cy="30" r="6" />
          <path d="M20 30 C 120 30, 180 14, 260 30 S 420 48, 500 30 S 600 22, 620 30" pathLength={1} />
          <circle className="nx-ml-b" cx="628" cy="30" r="6" />
          <text x="4" y="54" className="nx-hold-axis">start</text>
          <text x="636" y="54" textAnchor="end" className="nx-hold-axis">week 12</text>
        </svg>
        <ul className="nx-hold-lines" aria-live="polite">
          {LINES.map((l, i) => (
            <li key={l} style={{ fontFamily: S, transitionDelay: `${i * 220}ms` }}>{l}</li>
          ))}
        </ul>
      </div>
      <button
        ref={btnRef}
        type="button"
        className="nx-hold-btn"
        aria-pressed={done}
        aria-describedby="hold-help"
        style={{ fontFamily: F }}
        data-testid="hold-to-run-button"
      >
        {done ? "Twelve weeks, done." : "Hold to see twelve weeks"}
      </button>
      <p id="hold-help" className="nx-hold-help" style={{ fontFamily: F }}>
        {done
          ? "That is the whole model: you start, your blood is read at week 12, and your dose follows it."
          : "Press and hold. Let go early and the days ease back."}
      </p>
    </div>
  );
}
