/* ═══ The opening, in tiles (effecty study, 2026-09-05) ═══
   Chiya: "this is exactly how I want our site to feel and look like, those
   big tiles." A fact pill, the claim with the rotating goal word, and three
   large tiles: a goal each, the product rendered large on a two-token
   gradient, the goal's name top-left and one pill button bottom-left. On a
   phone the tiles stack and the button becomes the arrow. One action per
   tile; the reader decides. */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Stethoscope, FlaskConical, Droplets } from "lucide-react";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";
import { CATEGORY_LABELS } from "@/data/peptides";
import { GOAL_SHOUT } from "@/data/goalTeaching";
import tileMetabolic from "@/assets/studio/tile-metabolic.webp";
import tileMetabolic800 from "@/assets/studio/tile-metabolic-800.webp";
import tileGrowth from "@/assets/studio/tile-growth.webp";
import tileGrowth800 from "@/assets/studio/tile-growth-800.webp";
import tileSexual from "@/assets/studio/tile-sexual.webp";
import tileSexual800 from "@/assets/studio/tile-sexual-800.webp";

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

const TILES = [
  { goal: "metabolic" as const, img: tileMetabolic, img800: tileMetabolic800, href: "/peptides?goal=metabolic", cta: "Shop weight loss", dark: false },
  { goal: "growth" as const, img: tileGrowth, img800: tileGrowth800, href: "/peptides?goal=growth", cta: "Shop body composition", dark: true },
  { goal: "sexual-health" as const, img: tileSexual, img800: tileSexual800, href: "/peptides?goal=sexual-health", cta: "Shop sexual health", dark: true },
];

export function HeroTiles() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) document.documentElement.classList.add("nx-motion");
    return () => document.documentElement.classList.remove("nx-motion");
  }, []);
  return (
    <section className="nx-tilehero" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-container">
        <div className="nx-tilehero__head nx-hero-seq">
          <ul className="nx-tilehero__pills" aria-label="The facts" data-testid="hero-facts">
            <li style={{ fontFamily: F }}><Stethoscope size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[0]}</li>
            <li style={{ fontFamily: F }}><FlaskConical size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[1]}</li>
            <li style={{ fontFamily: F }}><Droplets size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[2]}</li>
          </ul>
          <h1 className="nx-tilehero__h1 nx-shout" style={{ fontFamily: S }}>{HERO.shout}</h1>
          <p className="nx-tilehero__line" style={{ fontFamily: S }}>{HERO.lead} <RotatingWord words={HERO.rotating} /><span className="sr-only">, {HERO.rotating.slice(1).join(", ")}</span>.</p>
          <p className="nx-tilehero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
        </div>
        <div className="nx-tiles nx-tiles--3" data-testid="hero-tiles">
          {TILES.map((t, i) => (
            <Link key={t.goal} href={t.href} className={`nx-tile${t.dark ? " nx-tile--dark" : ""}`} style={{ ["--i" as string]: i }} data-testid={`hero-tile-${t.goal}`} aria-label={`${CATEGORY_LABELS[t.goal]}: ${t.cta}`}>
              <img src={t.img} srcSet={`${t.img800} 800w, ${t.img} 1200w`} sizes="(max-width: 900px) 100vw, 33vw" alt="" width={1200} height={900} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
              <span className="nx-chips nx-chips--tile" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{CATEGORY_LABELS[t.goal]}</span><span className="nx-chip" style={{ fontFamily: F }}>Rx</span></span>
              <span className="nx-tile__title nx-tile__title--low nx-shout" style={{ fontFamily: S }}>{GOAL_SHOUT[t.goal]}</span>
              <span className="nx-tile__btn" style={{ fontFamily: F }}>{t.cta}</span>
              <span className="nx-tile__arrow" aria-hidden="true"><ArrowRight size={18} /></span>
            </Link>
          ))}
        </div>
        <div className="nx-tilehero__foot">
          <a href="#treatments" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta">{HERO.cta}</a>
          <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)" }}>How it works</Link>
        </div>
      </div>
    </section>
  );
}
