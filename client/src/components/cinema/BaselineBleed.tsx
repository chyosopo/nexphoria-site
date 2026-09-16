/* ═══ The full-bleed photograph with one line (2026-09-16) ═══
   mod.com: "FEEL THE FLOW." over a photograph. Ours: the blood kit on the
   black surface, and the fact nobody else on the shelf can state. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import kit1200 from "@/assets/cinema/kit-1200.webp";
import kit2400 from "@/assets/cinema/kit-2400.webp";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function BaselineBleed() {
  return (
    <section className="nx-cine-bleed nx-dk nx-cine-sec" aria-labelledby="fd-baseline" data-testid="frontdoor-support" style={{ marginTop: "var(--nx-sp-sec)" }}>
      <img src={kit1200} srcSet={`${kit1200} 1200w, ${kit2400} 2400w`} sizes="100vw" alt="" width={2400} height={1029} loading="lazy" decoding="async" />
      <div className="nx-container">
        <div className="nx-cine-bleed__copy nx-cine-head">
          <p className="nx-eyebrow">The blood panel</p>
          <h2 id="fd-baseline" className="nx-cine-head__h2">Built around <span className="nx-grad">your baseline.</span></h2>
          <p className="nx-cine-head__p" style={{ fontFamily: F }}>
            An at-home kit of {PANEL_TOTAL_MARKERS} markers ships with the first order, included. The physician reads it before the first dose and again at week {RETEST_WEEK}, so the dose follows your own numbers.
          </p>
          <Link href="/how-it-works" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="frontdoor-feature-blood">How it works <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
        </div>
      </div>
    </section>
  );
}
