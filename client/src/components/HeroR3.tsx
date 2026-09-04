/* ═══ The R3 opening (the agency's direction, built on our content, 2026-09-04)
   A full-bleed photograph under a navy tint, one glass card in the middle
   with the claim and the two doors, and a row of four goal chips beneath
   it. Copy is the house copy (data/hero); the grammar is theirs. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { OUTCOME_CATEGORY } from "@/data/outcomeImagery";
import { track } from "@/lib/analytics";

const QUICK: PeptideCategory[] = liveCategories(["metabolic", "growth", "sexual-health", "hormone", "recovery", "cognition"]).slice(0, 4);

export function HeroR3() {
  return (
    <section className="nx-r3-hero" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-r3-hero__art" aria-hidden="true">
        <img src={HERO.image} srcSet={HERO.imageSrcSet} sizes="100vw" alt="" width={2400} height={1152} fetchPriority="high" decoding="async" />
      </div>
      <div className="nx-container nx-r3-hero__body">
        <div className="nx-glass nx-r3-hero__card">
          <p className="nx-r3-hero__kicker" style={{ fontFamily: F }}>{HERO.kicker}</p>
          <h1 className="nx-r3-hero__h1" style={{ fontFamily: S }}>{HERO.lines.join(" ")}</h1>
          <p className="nx-r3-hero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
          <div className="nx-r3-hero__cta">
            <Link href="/peptides" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" onClick={() => track("intake_cta", { source: "hero-shop" })}>Shop the menu</Link>
            <Link href="/assessment" className="nx-cta-acid" data-testid="frontdoor-hero-cta-assess" onClick={() => track("intake_cta", { source: "hero-assess" })}>Get a recommendation</Link>
          </div>
          <p className="nx-r3-hero__micro" style={{ fontFamily: F }}>{HERO.micro}</p>
        </div>
        <ul className="nx-r3-quick" aria-label="Start with a goal">
          {QUICK.map((c) => {
            const img = OUTCOME_CATEGORY.men[c] ?? OUTCOME_CATEGORY.women[c];
            return (
              <li key={c}>
                <Link href={`/goals/${c}`} className="nx-glass nx-r3-quick__chip" data-testid={`hero-quick-${c}`}>
                  {img && <img src={img} alt="" aria-hidden="true" loading="lazy" decoding="async" width={80} height={80} />}
                  <span style={{ fontFamily: F }}>{CATEGORY_LABELS[c]}</span>
                  <i aria-hidden="true"><ArrowRight size={14} strokeWidth={2.2} /></i>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
