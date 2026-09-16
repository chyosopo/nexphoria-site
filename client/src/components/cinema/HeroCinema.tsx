/* ═══ The home opening, the cinema way (2026-09-16) ═══
   mod.com's hero: a black surface beaded with condensation, three giant
   caps lines, one line of what it is, a check line, one pill, the bottle at
   the right. Ours: the surface and the carton with the vial were rendered
   in the house studio to the same brief. The three lines are goals a
   reader names (the quiz's own words), never guarantees; the check line
   is the two facts. Copy in client/src/data/hero.ts. */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";
import bg1200 from "@/assets/cinema/hero-bg-1200.webp";
import bg2400 from "@/assets/cinema/hero-bg-2400.webp";
import box800 from "@/assets/cinema/box-800.webp";
import box1600 from "@/assets/cinema/box-1600.webp";

export function HeroCinema() {
  return (
    <section className="nx-cine-hero nx-dk" aria-label="Nexphoria" data-testid="photo-hero">
      <img className="nx-cine-hero__bg" src={bg1200} srcSet={`${bg1200} 1200w, ${bg2400} 2400w`} sizes="100vw" alt="" width={2400} height={1029} fetchPriority="high" decoding="async" />
      <div className="nx-container nx-cine-hero__grid">
        <div>
          <h1 className="nx-cine-hero__h1">
            {HERO.cinema.lines.map((l, i) => <span key={l} className={i === HERO.cinema.lines.length - 1 ? "nx-grad" : undefined}>{l}</span>)}
          </h1>
          <p className="nx-cine-hero__sub" style={{ fontFamily: F }}>{HERO.cinema.sub}</p>
          <p className="nx-cine-hero__fact" style={{ fontFamily: F }} data-testid="hero-facts"><CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" /> {HERO.kicker}</p>
          <div className="nx-cine-hero__act">
            <Link href="/quiz" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" style={{ fontFamily: F }}>
              {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
            </Link>
            <Link href="/peptides" className="nx-cine-hero__more" style={{ fontFamily: F }} data-testid="frontdoor-hero-browse">{HERO.ctaSecondary}</Link>
          </div>
        </div>
        <div className="nx-cine-hero__art" aria-hidden="true">
          <img src={box800} srcSet={`${box800} 600w, ${box1600} 1200w`} sizes="(max-width: 960px) 80vw, 40vw" alt="" width={1200} height={1607} fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}
