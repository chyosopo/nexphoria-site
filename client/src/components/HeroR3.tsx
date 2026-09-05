/* ═══ The opening (2026-09-05, the still life) ═══
   Porcelain, not a photograph under a tint: the claim with the rotating
   goal word on the left, and on the right the house still life, rendered
   in the studio (the kit, a vial, a nasal spray, one window light). One
   action, the fact strip. Copy is the house copy (data/hero). */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Stethoscope, FlaskConical, Droplets, MonitorSmartphone, Snowflake, Wallet } from "lucide-react";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { track } from "@/lib/analytics";
import heroStill from "@/assets/studio/hero-still.webp";
import heroStill1200 from "@/assets/studio/hero-still-1200.webp";

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

const ICONS = [Stethoscope, FlaskConical, Droplets, MonitorSmartphone, Snowflake, Wallet];

export function HeroR3() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) document.documentElement.classList.add("nx-motion");
    return () => document.documentElement.classList.remove("nx-motion");
  }, []);
  return (
    <section className="nx-hero-still" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-container nx-hero-still__grid">
        <div className="nx-hero-still__copy nx-hero-seq">
          <p className="nx-eyebrow" style={{ fontFamily: F }}>{HERO.kicker}</p>
          <h1 className="nx-hero-still__h1" style={{ fontFamily: S }}>{HERO.lead} <RotatingWord words={HERO.rotating} /><span className="sr-only">, {HERO.rotating.slice(1).join(", ")}</span>.</h1>
          <p className="nx-hero-still__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
          <div className="nx-hero-still__cta">
            <a href="#treatments" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" onClick={() => track("intake_cta", { source: "hero-treatments" })}>{HERO.cta}</a>
            <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)" }}>{HERO.ctaSecondary}</Link>
          </div>
          <ul className="nx-hero-still__facts" aria-label="The facts" data-testid="hero-facts">
            {HERO.facts.map((f, i) => {
              const Icon = ICONS[i] ?? Stethoscope;
              return <li key={f} style={{ fontFamily: F }}><Icon size={14} strokeWidth={2.2} aria-hidden="true" />{f}</li>;
            })}
          </ul>
        </div>
        <div className="nx-hero-still__media nx-hero-frame">
          <img src={heroStill} srcSet={`${heroStill1200} 1200w, ${heroStill} 1800w`} sizes="(max-width: 900px) 100vw, 50vw" alt="The Nexphoria blood kit, a vial and a nasal spray on a pale surface" width={1800} height={1400} fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}
