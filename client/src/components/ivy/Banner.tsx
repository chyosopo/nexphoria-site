/* ═══ The closer: a photograph with the line and the pill (the ivy restyle, 2026-09-08) ═══ */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";

export function Banner({ id = "fd-closer" }: { id?: string }) {
  return (
    <section className="nx-container nx-sec" aria-labelledby={id} style={{ paddingBottom: "var(--nx-sp-band)" }}>
      <div className="nx-banner">
        <img src={HERO.image} srcSet={HERO.imageSrcSet} sizes="(max-width: 1440px) 100vw, 1440px" alt="" loading="lazy" decoding="async" width={2400} height={1600} />
        <div className="nx-banner__copy">
          <h2 id={id} className="nx-banner__h2">Feel better, for longer</h2>
          <p className="nx-banner__p" style={{ fontFamily: F }}>Start your three-minute assessment. A licensed U.S. physician takes it from there, and prescribes if it is appropriate.</p>
          <Link href="/quiz" className="nx-cta-cobalt nx-banner__cta" data-testid="frontdoor-closer-cta" style={{ fontFamily: F }}>
            {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
