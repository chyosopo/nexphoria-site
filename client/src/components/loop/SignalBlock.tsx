/* ═══ What a peptide is, beside the orbit (2026-09-15) ═══
   openloophealth.com: "Healthcare is no longer an industry. It's
   infrastructure." beside a dark panel where the touchpoints orbit the mark.
   Ours: what a peptide is, in plain words, beside the goals orbiting our
   mark, each chip in its goal colour and each a link to the catalog
   filtered to that goal. */
import { Link } from "wouter";
import { F } from "@/lib/typography";
import { LogoMark } from "@/components/Logo";
import { CATEGORY_LABELS, liveCategories } from "@/data/peptides";
import { GOAL_ORDER } from "@/data/goalTeaching";

export function SignalBlock() {
  const goals = liveCategories(GOAL_ORDER);
  const n = goals.length;
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-signal" data-testid="frontdoor-signal">
      <div className="nx-oltwo">
        <div>
          <p className="nx-eyebrow">What a peptide is</p>
          <h2 id="fd-signal" className="nx-oltwo__h2">A signal <span className="nx-grad">your body already sends.</span></h2>
          <p className="nx-oltwo__p" style={{ fontFamily: F }}>
            A peptide is a short chain of amino acids, the same building blocks as protein. Your body makes thousands of them and uses them as signals: release growth hormone, feel full, repair tissue.
          </p>
          <p className="nx-oltwo__p" style={{ fontFamily: F }}>
            The ones a physician prescribes here are precise versions of those signals, chosen for the goal you name and the panel you draw at home.
          </p>
        </div>
        <div className="nx-olpanel">
          <div className="nx-olorbit">
            <span className="nx-olorbit__ring nx-olorbit__ring--2" aria-hidden="true" />
            <span className="nx-olorbit__ring" aria-hidden="true" />
            <div className="nx-olorbit__core" aria-hidden="true">
              <span className="nx-olorbit__mark"><LogoMark size={38} ink="#FFFFFF" /></span>
              <span style={{ fontFamily: F }}>Nexphoria</span>
            </div>
            {goals.map((g, i) => {
              const a = (-90 + (360 / n) * i) * (Math.PI / 180);
              const left = 50 + 44 * Math.cos(a);
              const top = 50 + 44 * Math.sin(a);
              return (
                <Link key={g} href={`/peptides?goal=${g}`} className="nx-olorbit__chip" data-goal={g} style={{ left: `${left}%`, top: `${top}%`, fontFamily: F }} data-testid={`orbit-${g}`}>
                  {CATEGORY_LABELS[g]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
