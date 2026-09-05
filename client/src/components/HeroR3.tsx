/* ═══ The R3 opening (2026-09-05, decluttered) ═══
   One photograph under a navy tint, one glass card: the claim with the
   rotating goal word, one subline, ONE action (see the treatments), and the
   fact strip. The competing goal chips were removed (Chiya 2026-09-05: one
   path, not five). Copy is the house copy (data/hero). */
import { useEffect, useState } from "react";
import { Stethoscope, FlaskConical, Droplets, MonitorSmartphone, Snowflake, Wallet } from "lucide-react";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { track } from "@/lib/analytics";

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
            <a href="#treatments" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta" onClick={() => track("intake_cta", { source: "hero-treatments" })}>{HERO.cta}</a>
          </div>
          <ul className="nx-r3-hero__facts" aria-label="The facts" data-testid="hero-facts">
            {HERO.facts.map((f, i) => {
              const Icon = [Stethoscope, FlaskConical, Droplets, MonitorSmartphone, Snowflake, Wallet][i] ?? Stethoscope;
              return <li key={f} style={{ fontFamily: F }}><Icon size={13} strokeWidth={2.2} aria-hidden="true" />{f}</li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
