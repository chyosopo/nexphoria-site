/* ═══ Getting started, in three numbered steps (2026-09-15) ═══
   openloophealth.com: "Getting started is simple", 01 / 02 / 03 across a
   hairline. Ours: the three steps of the journey, the same facts the drawn
   ivy cards carried. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";

const STEPS = [
  { t: "Answer a few questions", b: <>About your health, your medicines and your goal. <b>Three minutes</b>, from your phone.</> },
  { t: "A physician reviews", b: <>A <b>licensed U.S. physician</b> reads your answers and prescribes, if it is appropriate.</> },
  { t: "Delivered to your door", b: <>Compounded in a <b>U.S. pharmacy</b> and shipped cold, with your blood kit in the first box.</> },
];

export function StepsLoop() {
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-road" data-testid="frontdoor-road">
      <div className="nx-ivhead nx-ivhead--center">
        <p className="nx-eyebrow">Getting started</p>
        <h2 id="fd-road" className="nx-ivhead__h2">Three steps, <span className="nx-grad">entirely online.</span></h2>
      </div>
      <ol className="nx-olsteps" aria-label="The three steps">
        {STEPS.map((s, i) => (
          <li key={s.t} className="nx-olstep">
            <span className="nx-olstep__n" aria-hidden="true">0{i + 1}</span>
            <h3 className="nx-olstep__t">{s.t}</h3>
            <p className="nx-olstep__b" style={{ fontFamily: F }}>{s.b}</p>
          </li>
        ))}
      </ol>
      <div className="nx-steps__cta">
        <Link href="/quiz" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="frontdoor-road-all">Find my treatment <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
    </section>
  );
}
