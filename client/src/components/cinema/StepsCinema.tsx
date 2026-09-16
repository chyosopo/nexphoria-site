/* ═══ Getting started: four numbered photographs (2026-09-16) ═══
   mod.com: "GET YOUR MOD · PRESCRIBED ONLINE · SHIPPED TO YOUR DOOR", four
   photographs across a hairline, 01 to 04. Ours, in the house studio's
   photographs: the phone, the physician, the vial, the cold carton. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import phone600 from "@/assets/cinema/phone-600.webp";
import phone1200 from "@/assets/cinema/phone-1200.webp";
import doc600 from "@/assets/cinema/physician-600.webp";
import doc1200 from "@/assets/cinema/physician-1200.webp";
import vial600 from "@/assets/cinema/vial-600.webp";
import vial1200 from "@/assets/cinema/vial-1200.webp";
import box800 from "@/assets/cinema/box-800.webp";
import box1600 from "@/assets/cinema/box-1600.webp";

const STEPS = [
  { t: "Answer a few questions", b: "About your health, your medicines and your goal. Three minutes, from your phone.", s: phone600, l: phone1200, w: 900, h: 1206 },
  { t: "A physician reviews", b: "A licensed U.S. physician reads your answers and prescribes, if it is appropriate.", s: doc600, l: doc1200, w: 900, h: 1206 },
  { t: "Compounded for you", b: "A licensed U.S. 503A pharmacy prepares your medicine to the prescription.", s: vial600, l: vial1200, w: 900, h: 1200 },
  { t: "Shipped cold", b: "To your door, in a plain carton, with your blood kit in the first box.", s: box800, l: box1600, w: 1200, h: 1607 },
];

export function StepsCinema() {
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-road" data-testid="frontdoor-road">
      <div className="nx-cine-head">
        <p className="nx-eyebrow">Getting started</p>
        <h2 id="fd-road" className="nx-cine-head__h2">Prescribed online. <span className="nx-grad">Shipped to your door.</span></h2>
      </div>
      <ol className="nx-cine-steps" aria-label="The four steps">
        {STEPS.map((st, i) => (
          <li key={st.t} className="nx-cine-step">
            <div className="nx-cine-step__img"><img src={st.s} srcSet={`${st.s} 450w, ${st.l} 900w`} sizes="(max-width: 900px) 45vw, 22vw" alt="" width={st.w} height={st.h} loading="lazy" decoding="async" /></div>
            <span className="nx-cine-step__n" style={{ fontFamily: F }}>0{i + 1}</span>
            <h3 className="nx-cine-step__t">{st.t}</h3>
            <p className="nx-cine-step__b" style={{ fontFamily: F }}>{st.b}</p>
          </li>
        ))}
      </ol>
      <div className="nx-steps__cta">
        <Link href="/quiz" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="frontdoor-road-all">Find my treatment <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
    </section>
  );
}
