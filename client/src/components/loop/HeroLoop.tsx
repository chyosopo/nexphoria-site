/* ═══ The home opening, the loop way (2026-09-15) ═══
   openloophealth.com's hero: the night panel with rounded bottom corners,
   the bold headline at the left with one italic phrase, one line, the pill,
   a hairline, three counters; a device card at the right over concentric
   rings. Ours carries three FACTS where theirs carries counters (law 3: no
   counts), and the device is the care view a patient sees: the physician's
   review, the dose set from the panel, the medicine shipped cold. Copy in
   client/src/data/hero.ts. */
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { SKU_PHOTO_600 } from "@/components/SkuPhoto";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function HeroLoop() {
  return (
    <section className="nx-bleed nx-olhero nx-dk" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-container nx-olhero__grid">
        <div>
          <h1 className="nx-olhero__h1">
            {HERO.lead}<span className="nx-grad">{HERO.gradient}.</span>
          </h1>
          <p className="nx-olhero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
          <div className="nx-olhero__act">
            <Link href="/quiz" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" style={{ fontFamily: F }}>
              {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
            </Link>
            <Link href="/peptides" className="nx-olhero__more" style={{ fontFamily: F }} data-testid="frontdoor-hero-browse">{HERO.ctaSecondary}</Link>
          </div>
          <ul className="nx-olhero__facts" aria-label="The facts" data-testid="hero-facts">
            <li><b>Licensed<i>.</i></b><span style={{ fontFamily: F }}>U.S. physicians review every order</span></li>
            <li><b>Compounded<i>.</i></b><span style={{ fontFamily: F }}>In a licensed U.S. pharmacy, shipped cold</span></li>
            <li><b>Included<i>.</i></b><span style={{ fontFamily: F }}>A {PANEL_TOTAL_MARKERS}-marker blood panel, read again at week {RETEST_WEEK}</span></li>
          </ul>
        </div>
        <div className="nx-oldev" aria-hidden="true">
          <span className="nx-oldev__glow" />
          <span className="nx-oldev__ring" />
          <span className="nx-oldev__ring nx-oldev__ring--2" />
          <span className="nx-oldev__ring nx-oldev__ring--3" />
          <div className="nx-oldev__card" style={{ fontFamily: F }}>
            <div className="nx-oldev__bar"><i /><i /><i /><span>Nexphoria · Your care</span></div>
            <div className="nx-oldev__body">
              <p className="nx-oldev__hi">Good morning<i>.</i></p>
              <div className="nx-oldev__row">
                <div><b>Physician review</b><small>Your answers and your panel</small></div>
                <span className="nx-oldev__ok"><Check strokeWidth={3} /> Reviewed</span>
              </div>
              <div className="nx-oldev__row">
                <div>
                  <b>Your dose</b><small>Week 6 of {RETEST_WEEK} · set from your panel</small>
                  <div className="nx-oldev__bars">{Array.from({ length: RETEST_WEEK }, (_, i) => <i key={i} className={i < 6 ? "on" : undefined} />)}</div>
                </div>
              </div>
              <div className="nx-oldev__row">
                <img className="nx-oldev__vial" src={SKU_PHOTO_600.sermorelin} alt="" width={600} height={600} loading="eager" decoding="async" />
                <div><b>Sermorelin</b><small>Shipped cold · one month</small></div>
                <span className="nx-oldev__pill">Track</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
