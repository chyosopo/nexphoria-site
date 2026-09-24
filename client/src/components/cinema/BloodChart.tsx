/* ═══ Set from your blood: the figure (2026-09-16) ═══
   mod.com centres a caps line over a chart ("WHY MOD IS BETTER?", the
   product against energy drinks). Law 3 forbids comparison, so ours draws
   the one thing that is true of the care and nothing beside it: the panel
   before the first dose, the dose, and the same panel again at week 12.
   One line, three points, no rival. */
import { F } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";
import { MarkerMarquee } from "@/components/cinema/MarkerMarquee";

export function BloodChart() {
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-blood" data-testid="frontdoor-blood">
      <div className="nx-cine-head nx-cine-head--center">
        <p className="nx-eyebrow">The dose</p>
        <h2 id="fd-blood" className="nx-cine-head__h2">Set from <span className="nx-grad">your blood.</span></h2>
      </div>
      <figure className="nx-cine-chart" style={{ fontFamily: F }}>
        <svg viewBox="0 0 900 420" role="img" aria-label={`A line from the baseline blood panel, drawn before the first dose, to the same panel read again at week ${RETEST_WEEK}; the dose follows the numbers.`}>
          <defs>
            <linearGradient id="nx-cine-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0B5FD6" stopOpacity=".5" /><stop offset="1" stopColor="#0B5FD6" stopOpacity="0" /></linearGradient>
          </defs>
          <line className="axis" x1="90" y1="340" x2="850" y2="340" />
          <line className="axis" x1="90" y1="340" x2="90" y2="40" />
          <path className="fill" d="M120 300 C 260 300, 300 230, 420 210 C 560 190, 640 150, 800 140 L 800 340 L 120 340 Z" />
          <path className="line" d="M120 300 C 260 300, 300 230, 420 210 C 560 190, 640 150, 800 140" />
          <path className="dose" d="M120 320 H 400 V 250 H 800" />
          <circle className="dot" cx="120" cy="300" r="9" />
          <circle className="dot" cx="420" cy="210" r="9" />
          <circle className="dot" cx="800" cy="140" r="9" />
          <text className="lbl" x="120" y="380" textAnchor="start">Panel 1</text>
          <text className="lbl lbl--sm" x="120" y="400" textAnchor="start">before the first dose</text>
          <text className="lbl" x="420" y="380" textAnchor="middle">First dose</text>
          <text className="lbl lbl--sm" x="420" y="400" textAnchor="middle">set by the physician</text>
          <text className="lbl" x="800" y="380" textAnchor="end">Week {RETEST_WEEK}</text>
          <text className="lbl lbl--sm" x="800" y="400" textAnchor="end">the same panel again</text>
          <text className="lbl lbl--sm" x="60" y="60" textAnchor="end" transform="rotate(-90 60 60)">Your panel</text>
          <rect className="tag" x="620" y="72" width="164" height="34" rx="8" />
          <text className="tag-t" x="702" y="94" textAnchor="middle">{PANEL_TOTAL_MARKERS} MARKERS</text>
          <text className="lbl lbl--sm" x="410" y="272" textAnchor="start">the dose</text>
        </svg>
        <figcaption className="nx-cine-chart__cap">The at-home kit of {PANEL_TOTAL_MARKERS} markers ships with the first order, included. The physician reads it before the first dose and again at week {RETEST_WEEK}, and the dose follows your own numbers.</figcaption>
      </figure>
      <MarkerMarquee />
    </section>
  );
}
