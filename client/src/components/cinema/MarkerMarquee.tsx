/* ═══ The panel as a marquee (the nuform study, 2026-09-24) ═══
   nuformhealth.com scrolls its 57 biomarkers as chips under "Uncover the
   blueprint to your health"; a number becomes a thing the reader can see.
   Ours scrolls the panel we actually draw, read from biomarkerPanel.ts so
   the chips and the count can never disagree. Two rows, opposite
   directions; the second copy of each row is decorative and hidden from
   assistive tech; reduced motion renders the rows wrapped and still. */
import { BIOMARKER_PANEL, PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { F } from "@/lib/typography";

const ALL = BIOMARKER_PANEL.flatMap((g) => g.markers.map((m) => m.name));
const HALF = Math.ceil(ALL.length / 2);
const ROWS = [ALL.slice(0, HALF), ALL.slice(HALF)];

export function MarkerMarquee({ testId = "marker-marquee" }: { testId?: string }) {
  return (
    <div className="nx-marq" data-testid={testId} aria-label={`The ${PANEL_TOTAL_MARKERS} markers of the panel`} role="group">
      {ROWS.map((row, r) => (
        <div key={r} className={`nx-marq__row${r === 1 ? " nx-marq__row--rev" : ""}`}>
          <ul className="nx-marq__track" style={{ fontFamily: F }}>
            {row.map((n) => <li key={n} className="nx-marq__chip">{n}</li>)}
          </ul>
          <ul className="nx-marq__track" style={{ fontFamily: F }} aria-hidden="true">
            {row.map((n) => <li key={`${n}-2`} className="nx-marq__chip">{n}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
