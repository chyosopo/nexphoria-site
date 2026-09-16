/* ═══ Rx peptides: the vial with callout lines (2026-09-16) ═══
   mod.com: "Rx ENERGY / ENHANCE ALERTNESS + PERFORMANCE", the bottle in the
   centre with a line to each ingredient ("150mg MODAFINIL", "60mg
   CAFFEINE"). Ours: the studio vial on the black surface, a line to each
   of the four facts of the care. The four tiles that follow are the icon
   row under it. */
import { F } from "@/lib/typography";
import vial600 from "@/assets/cinema/vial-600.webp";
import vial1200 from "@/assets/cinema/vial-1200.webp";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

export function Anatomy() {
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-anatomy" data-testid="frontdoor-anatomy">
      <div className="nx-cine-head nx-cine-head--center">
        <p className="nx-eyebrow">What arrives</p>
        <h2 id="fd-anatomy" className="nx-cine-head__h2">Rx <span className="nx-grad">peptides.</span></h2>
        <p className="nx-cine-anat__sub">Prescribed · Compounded · Monitored</p>
      </div>
      <div className="nx-cine-anat">
        <ul className="nx-cine-anat__col nx-cine-anat__col--l" aria-label="Who prescribes and who makes it">
          <li className="nx-cine-anat__item"><b>Rx only</b><span style={{ fontFamily: F }}>A licensed U.S. physician prescribes, if it is appropriate</span></li>
          <li className="nx-cine-anat__item"><b>Compounded for you</b><span style={{ fontFamily: F }}>To the prescription, in a licensed U.S. 503A pharmacy</span></li>
        </ul>
        <div className="nx-cine-anat__vial" aria-hidden="true">
          <img src={vial600} srcSet={`${vial600} 450w, ${vial1200} 900w`} sizes="(max-width: 800px) 60vw, 22rem" alt="" width={900} height={1200} loading="lazy" decoding="async" />
        </div>
        <ul className="nx-cine-anat__col nx-cine-anat__col--r" aria-label="How it is set and sent">
          <li className="nx-cine-anat__item"><b>The dose</b><span style={{ fontFamily: F }}>Set from a {PANEL_TOTAL_MARKERS}-marker blood panel, adjusted from the retest</span></li>
          <li className="nx-cine-anat__item"><b>Shipped cold</b><span style={{ fontFamily: F }}>An ice pack in a plain carton, once a month</span></li>
        </ul>
      </div>
    </section>
  );
}
