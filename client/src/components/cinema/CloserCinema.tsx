/* ═══ The closer (2026-09-16): the beaded surface again, one line, one pill ═══ */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";
import bg1200 from "@/assets/cinema/hero-bg-1200.webp";
import bg2400 from "@/assets/cinema/hero-bg-2400.webp";

export function CloserCinema({ id = "fd-closer" }: { id?: string }) {
  return (
    <section className="nx-cine-close nx-dk" aria-labelledby={id} style={{ marginTop: "var(--nx-sp-sec)" }}>
      <img src={bg1200} srcSet={`${bg1200} 1200w, ${bg2400} 2400w`} sizes="100vw" alt="" width={2400} height={1029} loading="lazy" decoding="async" />
      <div className="nx-container nx-cine-close__copy">
        <div className="nx-cine-head nx-cine-head--center">
          <p className="nx-eyebrow">Start here</p>
          <h2 id={id} className="nx-cine-head__h2">Three minutes to start. <span className="nx-grad">A physician takes it from there.</span></h2>
          <p className="nx-cine-head__p" style={{ fontFamily: F }}>{HERO.micro}</p>
          <Link href="/quiz" className="nx-cta-cobalt" data-testid="frontdoor-closer-cta" style={{ fontFamily: F }}>
            {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
