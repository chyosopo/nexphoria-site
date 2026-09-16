/* ═══ What a peptide is, and the four facts (2026-09-16) ═══
   mod.com: "Rx ENERGY · ENHANCE ALERTNESS + PERFORMANCE" and four icon
   tiles. Ours: what a peptide is, in one paragraph, and the four facts of
   the care as tiles: prescribed, compounded, set from your blood, shipped
   cold. Facts, not benefits. */
import { Stethoscope, FlaskConical, Droplets, Snowflake } from "lucide-react";
import { F } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function FactTiles() {
  const facts = [
    { Icon: Stethoscope, t: "Prescribed", b: "By a licensed U.S. physician, after an online visit, if it is appropriate." },
    { Icon: FlaskConical, t: "Compounded", b: "For you, by a licensed U.S. 503A pharmacy, to the prescription." },
    { Icon: Droplets, t: "Set from your blood", b: `A ${PANEL_TOTAL_MARKERS}-marker panel, included, read again at week ${RETEST_WEEK}.` },
    { Icon: Snowflake, t: "Shipped cold", b: "In a plain carton, to all 50 states." },
  ];
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-signal" data-testid="frontdoor-signal">
      <div className="nx-cine-head nx-cine-head--center">
        <p className="nx-eyebrow">What a peptide is</p>
        <h2 id="fd-signal" className="nx-cine-head__h2">A signal <span className="nx-grad">your body already sends.</span></h2>
        <p className="nx-cine-head__p" style={{ fontFamily: F }}>
          A peptide is a short chain of amino acids, the same building blocks as protein. Your body makes thousands of them and uses them as signals: release growth hormone, feel full, repair tissue. The ones a physician prescribes here are precise versions of those signals, chosen for the goal you name and the panel you draw at home.
        </p>
      </div>
      <ul className="nx-cine-facts" aria-label="The four facts">
        {facts.map(({ Icon, t, b }) => (
          <li key={t}>
            <span className="nx-olicon" aria-hidden="true"><Icon strokeWidth={2} /></span>
            <b>{t}</b>
            <span style={{ fontFamily: F }}>{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
