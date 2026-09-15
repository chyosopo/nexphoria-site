/* ═══ The strip under the hero (2026-09-15) ═══
   openloophealth.com puts a row of press logos here. We carry no press and
   no counts (law 3), so the row is the six facts of the house, small and
   muted, the same six the hero used to carry as chips. */
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";

export function FactStrip() {
  return (
    <section className="nx-container" aria-label="The facts">
      <ul className="nx-olfacts">
        {HERO.facts.map((t) => <li key={t} style={{ fontFamily: F }}>{t}</li>)}
      </ul>
    </section>
  );
}
