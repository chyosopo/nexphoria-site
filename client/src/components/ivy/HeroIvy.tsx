/* ═══ The home opening (the ivy restyle, 2026-09-08) ═══
   ivyrx.com's hero, in our facts: one line of proof, the headline with a
   drawn chip and one gradient phrase, one sentence, the dark pill with the
   lavender arrow, and the trust chips under it. Centred on the desktop,
   left on the phone. Copy in client/src/data/hero.ts. */
import { Link } from "wouter";
import { ArrowRight, HeartPulse, Stethoscope, FlaskConical, Droplets, Snowflake, Smartphone } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";

const TRUST = [
  { Icon: Stethoscope, t: "Licensed U.S. physicians" },
  { Icon: Snowflake, t: "Discreet cold delivery, included" },
  { Icon: Smartphone, t: "Entirely online" },
  { Icon: Droplets, t: "Blood test included" },
];

export function HeroIvy() {
  return (
    <section className="nx-container nx-ivhero" aria-label="Nexphoria" data-testid="photo-hero">
      <p className="nx-ivhero__fact" style={{ fontFamily: F }} data-testid="hero-facts">
        <FlaskConical size={15} strokeWidth={2.2} aria-hidden="true" /> {HERO.kicker}
      </p>
      <h1 className="nx-ivhero__h1">
        {HERO.lead}
        <span className="nx-ivhero__chip" aria-hidden="true"><HeartPulse strokeWidth={2.4} /></span>
        <span className="nx-grad">{HERO.gradient}</span>
      </h1>
      <p className="nx-ivhero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
      <Link href="/quiz" className="nx-cta-cobalt nx-ivhero__cta" data-testid="frontdoor-hero-cta" style={{ fontFamily: F }}>
        {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
      </Link>
      <ul className="nx-ivhero__trust" aria-label="The facts">
        {TRUST.map(({ Icon, t }) => (
          <li key={t} style={{ fontFamily: F }}><Icon size={15} strokeWidth={2.1} aria-hidden="true" />{t}</li>
        ))}
      </ul>
    </section>
  );
}
