/* ═══ The R3 opening (the agency's direction, built on our content, 2026-09-04)
   A full-bleed photograph under a navy tint, one glass card in the middle
   with the claim and the two doors, and a row of four goal chips beneath
   it. Copy is the house copy (data/hero); the grammar is theirs. */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { OUTCOME_CATEGORY } from "@/data/outcomeImagery";
import { track } from "@/lib/analytics";

const QUICK: PeptideCategory[] = liveCategories(["metabolic", "growth", "sexual-health", "hormone", "recovery", "cognition"]).slice(0, 4);

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [changing, setChanging] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setChanging(true);
      window.setTimeout(() => { setI((n) => (n + 1) % words.length); setChanging(false); }, 220);
    }, 2200);
    return () => window.clearInterval(id);
  }, [words.length]);
  return <span className={`nx-rotate${changing ? " is-changing" : ""}`} aria-live="off" data-testid="hero-rotating">{words[i]}</span>;
}

export function HeroR3() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) document.documentElement.classList.add("nx-motion");
    return () => document.documentElement.classList.remove("nx-motion");
  }, []);
  return (
    <section className="nx-r3-hero" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-r3-hero__art" aria-hidden="true">
        <img src={HERO.image} srcSet={HERO.imageSrcSet} sizes="100vw" alt="" width={2400} height={1152} fetchPriority="high" decoding="async" />
      </div>
      <div className="nx-container nx-r3-hero__body">
        <div className="nx-glass nx-r3-hero__card">
          <p className="nx-r3-hero__kicker" style={{ fontFamily: F }}>{HERO.kicker}</p>
          <h1 className="nx-r3-hero__h1" style={{ fontFamily: S }}>{HERO.lead} <RotatingWord words={HERO.rotating} /><span className="sr-only">, {HERO.rotating.slice(1).join(", ")}</span>.</h1>
          <p className="nx-r3-hero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
          <div className="nx-r3-hero__cta">
            <Link href={HERO.ctaHref} className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" onClick={() => track("intake_cta", { source: "hero-quiz" })}>{HERO.cta}</Link>
            <Link href="/how-it-works" className="nx-cta-ghost nx-cta-ghost--light" data-testid="frontdoor-hero-cta-assess">How it works</Link>
          </div>
          <p className="nx-r3-hero__micro" style={{ fontFamily: F }}>{HERO.micro}</p>
        </div>
        <ul className="nx-r3-quick" aria-label="Start with a goal">
          {QUICK.map((c, i) => {
            const img = OUTCOME_CATEGORY.men[c] ?? OUTCOME_CATEGORY.women[c];
            return (
              <li key={c} style={{ ["--i" as string]: i }}>
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
