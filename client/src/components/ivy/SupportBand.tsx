/* ═══ Support (the ivy restyle, 2026-09-08) ═══
   ivyrx.com draws its support as a dashboard: a message from the care team
   at the left, a video visit in the middle, the treatment at the right. The
   same, with our facts: a person answers, a licensed physician reviews, the
   blood panel is read again at week 12, the order ships cold. */
import { Link } from "wouter";
import { ArrowRight, PhoneOff, Package, Check, Stethoscope, Droplets, MessageCircle } from "lucide-react";
import { F } from "@/lib/typography";
import { SKU_PHOTO_600 } from "@/components/SkuPhoto";
import physician from "@/assets/hero-physician.webp";
import { RETEST_WEEK } from "@/data/monitoring";

export function SupportBand() {
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-support" data-testid="frontdoor-support">
      <div className="nx-ivhead nx-ivhead--center">
        <p className="nx-eyebrow">Support</p>
        <h2 id="fd-support" className="nx-ivhead__h2"><span className="nx-grad">Medical support,</span><br />on your terms</h2>
      </div>
      <div className="nx-support">
        <div className="nx-support__side" aria-hidden="true">
          <div className="nx-support__card">
            <p className="nx-support__label" style={{ fontFamily: F }}>Inbox</p>
            <div className="nx-support__who">
              <img className="nx-support__avatar" src={physician} alt="" loading="lazy" decoding="async" width={44} height={44} />
              <div><b style={{ fontFamily: F }}>Care team</b><span style={{ fontFamily: F }}>Nexphoria</span></div>
            </div>
            <p className="nx-support__msg" style={{ fontFamily: F }}>Your week-{RETEST_WEEK} results are in. The physician has read them and left a note on your dose.</p>
          </div>
        </div>
        <div className="nx-support__main" aria-hidden="true">
          <p className="nx-support__hello" style={{ fontFamily: F }}>Your visit</p>
          <p className="nx-support__greet">A licensed U.S. physician, <span className="nx-grad">online</span></p>
          <div className="nx-support__photo">
            <img src={physician} alt="" loading="lazy" decoding="async" width={1600} height={1200} />
            <span className="nx-support__end"><PhoneOff /></span>
          </div>
        </div>
        <div className="nx-support__side nx-support__side--r">
          <div className="nx-support__card" aria-hidden="true">
            <p className="nx-support__label" style={{ fontFamily: F }}>Your treatment</p>
            <div className="nx-support__row"><b>Sermorelin</b><span className="nx-support__tag" style={{ fontFamily: F }}><Package /> Shipped cold</span></div>
            <img className="nx-support__vial" src={SKU_PHOTO_600.sermorelin} alt="" loading="lazy" decoding="async" width={600} height={600} />
          </div>
          <ul className="nx-support__lines" aria-label="What support includes">
            <li style={{ fontFamily: F }}><MessageCircle /> Questions go to a person, and a person answers.</li>
            <li style={{ fontFamily: F }}><Stethoscope /> The physician reviews every dose change.</li>
            <li style={{ fontFamily: F }}><Droplets /> Your blood panel is read again at week {RETEST_WEEK}.</li>
            <li style={{ fontFamily: F }}><Check /> Everything happens online, from your phone.</li>
          </ul>
        </div>
      </div>
      <div className="nx-steps__cta">
        <Link href="/how-it-works" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="frontdoor-support-all">See how it works <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
    </section>
  );
}
