/* ═══ How it works, in three drawn cards (the ivy restyle, 2026-09-08) ═══
   ivyrx.com draws its three steps as small pieces of interface: a form with
   a tick, a physician beside the medicine with "Reviewed", three delivery
   icons with the middle one raised. The same here, drawn in CSS from the
   house pieces: our own vial render, our own physician photograph. */
import { Link } from "wouter";
import { ArrowRight, Check, Zap, Truck, Thermometer, CheckCircle2 } from "lucide-react";
import { F } from "@/lib/typography";
import { SKU_PHOTO_600 } from "@/components/SkuPhoto";
import physician from "@/assets/hero-physician.webp";

export function StepsIvy() {
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-road" data-testid="frontdoor-road">
      <div className="nx-ivhead nx-ivhead--center">
        <h2 id="fd-road" className="nx-ivhead__h2">How <span className="nx-grad">Nexphoria</span> works</h2>
      </div>
      <ol className="nx-steps" aria-label="The three steps">
        <li className="nx-step">
          <div className="nx-step__scene" aria-hidden="true">
            <div className="nx-scene">
              <div className="nx-scene__card nx-scene__card--ghost" style={{ left: "-14%", top: "18%", width: "22%", height: "64%" }} />
              <div className="nx-scene__card nx-scene__card--ghost" style={{ right: "-14%", top: "18%", width: "22%", height: "64%" }} />
              <div className="nx-scene__card" style={{ left: "12%", top: "16%", width: "76%", height: "68%" }}>
                <span className="nx-scene__ring" style={{ left: 18, top: 20 }} />
                <span className="nx-scene__row" style={{ left: 56, top: 24, width: "42%" }} />
                <span className="nx-scene__row" style={{ left: 56, top: 40, width: "62%" }} />
                <span className="nx-scene__check" style={{ left: 18, top: 62 }}><Check strokeWidth={3} /></span>
                <span className="nx-scene__row" style={{ left: 56, top: 66, width: "48%" }} />
                <span className="nx-scene__row" style={{ left: 56, top: 82, width: "58%" }} />
              </div>
            </div>
          </div>
          <span className="nx-step__pill" style={{ fontFamily: F }}>Step 1</span>
          <h3 className="nx-step__t">Complete an <span className="nx-grad">online questionnaire</span></h3>
          <p className="nx-step__b" style={{ fontFamily: F }}>Answer <b>a few questions</b> about your health, your medicines and your goal.</p>
        </li>
        <li className="nx-step">
          <div className="nx-step__scene" aria-hidden="true">
            <div className="nx-scene">
              <div className="nx-scene__card nx-scene__card--ghost" style={{ left: "-10%", top: "24%", width: "20%", height: "52%" }} />
              <div className="nx-scene__card nx-scene__card--ghost" style={{ right: "-10%", top: "24%", width: "20%", height: "52%" }} />
              <div className="nx-scene__card" style={{ left: "6%", top: "22%", width: "88%", height: "56%" }}>
                <img className="nx-scene__doc" src={physician} alt="" style={{ left: 14, top: 14 }} loading="lazy" decoding="async" width={56} height={56} />
                <span className="nx-scene__check" style={{ left: 54, top: 6, width: 20, height: 20 }}><Check strokeWidth={3} /></span>
                <img className="nx-scene__vial" src={SKU_PHOTO_600.sermorelin} alt="" style={{ left: 74, top: 8, width: 68, height: 68 }} loading="lazy" decoding="async" width={600} height={600} />
                <span className="nx-scene__text" style={{ left: 150, top: 14 }}>Medicine</span>
                <span className="nx-scene__sub" style={{ left: 150, top: 44 }}><CheckCircle2 size={15} /> Reviewed</span>
              </div>
            </div>
          </div>
          <span className="nx-step__pill" style={{ fontFamily: F }}>Step 2</span>
          <h3 className="nx-step__t">A physician reviews <span className="nx-grad">your answers</span></h3>
          <p className="nx-step__b" style={{ fontFamily: F }}>A <b>licensed U.S. physician</b> reads them and prescribes, if it is appropriate.</p>
        </li>
        <li className="nx-step">
          <div className="nx-step__scene" aria-hidden="true">
            <div className="nx-scene">
              <span className="nx-scene__icon" style={{ left: "8%", top: "32%" }}><Zap /></span>
              <span className="nx-scene__icon nx-scene__icon--big" style={{ left: "50%", top: "22%", transform: "translateX(-50%)" }}><Truck /><span className="nx-scene__check" style={{ right: -8, top: -8, width: 22, height: 22 }}><Check strokeWidth={3} /></span></span>
              <span className="nx-scene__icon" style={{ right: "8%", top: "32%" }}><Thermometer /></span>
            </div>
          </div>
          <span className="nx-step__pill" style={{ fontFamily: F }}>Step 3</span>
          <h3 className="nx-step__t">Delivered <span className="nx-grad">to your door</span></h3>
          <p className="nx-step__b" style={{ fontFamily: F }}>Compounded in a <b>U.S. pharmacy</b> and shipped cold, with your blood kit in the box.</p>
        </li>
      </ol>
      <div className="nx-steps__cta">
        <Link href="/quiz" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="frontdoor-road-all">Find my treatment <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
    </section>
  );
}
