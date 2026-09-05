/* ═══ The opening, in tiles (effecty study, 2026-09-05) ═══
   Chiya: "this is exactly how I want our site to feel and look like, those
   big tiles." A fact pill, the claim with the rotating goal word, and three
   large tiles: a goal each, the product rendered large on a two-token
   gradient, the goal's name top-left and one pill button bottom-left. On a
   phone the tiles stack and the button becomes the arrow. One action per
   tile; the reader decides. The sentence sits under the chips in a column
   no wider than 52% of the tile (client/src/styles/home.css). */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { m, AnimatePresence, useScroll, useTransform, useSheen, useTilt, TAP_TILE, PRESS_SPRING, EASE } from "@/motion";
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

/* The goal word turns over every 2.2s: the old word lifts out, the new one
   rises in (AnimatePresence, mode wait). initial={false} keeps the first
   word static in the prerender. Reduced motion holds the first word. */
function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [words.length]);
  return (
    <span className="nx-rotate" aria-live="off" data-testid="hero-rotating">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[i]}
          className="nx-rotate__word"
          initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.32, ease: EASE } }}
          exit={{ y: -12, opacity: 0, filter: "blur(4px)", transition: { duration: 0.18, ease: "easeIn" } }}
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/* One hero tile: leans toward the pointer, lights under it, settles when
   pressed. wouter's Link (asChild) supplies href and the SPA click. */
function HeroTile({ t, i }: { t: (typeof TILES)[number]; i: number }) {
  const sheen = useSheen();
  const tilt = useTilt(4);
  return (
    <Link href={t.href} asChild>
      <m.a
        className={`nx-tile nx-sheen nx-tilt${t.dark ? " nx-tile--dark" : ""}`}
        style={{ ["--i" as string]: i, ...tilt.style }}
        data-testid={`hero-tile-${t.goal}`}
        aria-label={`${CATEGORY_LABELS[t.goal]}: ${t.cta}`}
        whileTap={TAP_TILE}
        transition={PRESS_SPRING}
        onPointerMove={(e) => { sheen.onPointerMove(e); tilt.onPointerMove(e); }}
        onPointerDown={sheen.onPointerDown}
        onPointerUp={sheen.onPointerUp}
        onPointerCancel={sheen.onPointerCancel}
        onPointerLeave={(e) => { sheen.onPointerLeave(e); tilt.onPointerLeave(); }}
      >
        <img src={t.img} srcSet={`${t.img800} 800w, ${t.img} 1200w`} sizes="(max-width: 900px) 100vw, 33vw" alt="" width={1200} height={900} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
        <span className="nx-chips nx-chips--tile" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{CATEGORY_LABELS[t.goal]}</span><span className="nx-chip" style={{ fontFamily: F }}>Rx</span></span>
        <span className="nx-tile__title nx-tile__title--low" style={{ fontFamily: S }}>{GOAL_SHOUT[t.goal]}</span>
        <span className="nx-tile__btn" style={{ fontFamily: F }}>{t.cta}</span>
        <span className="nx-tile__arrow" aria-hidden="true"><ArrowRight size={18} /></span>
      </m.a>
    </Link>
  );
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
  /* Parallax: as the hero scrolls away the head drifts up faster than the
     page and softens; the tiles drift a touch slower, so the two layers
     separate and the opening reads with depth. At scroll 0 every value is
     at rest, so the prerender bakes no transform. */
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);
  const tilesY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  return (
    <section ref={ref} className="nx-tilehero" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-container">
        <m.div className="nx-tilehero__head nx-hero-seq" style={{ y: headY, opacity: headOpacity }}>
          <ul className="nx-tilehero__pills" aria-label="The facts" data-testid="hero-facts">
            <li style={{ fontFamily: F }}><Stethoscope size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[0]}</li>
            <li style={{ fontFamily: F }}><FlaskConical size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[1]}</li>
            <li style={{ fontFamily: F }}><Droplets size={13} strokeWidth={2.2} aria-hidden="true" />{HERO.facts[2]}</li>
          </ul>
          {/* The headline is two sentences, and the register IS the break
              between them ("Stronger, sharper, better rested." / "Prescribed
              to your blood."). Rendered as one string it wrapped mid-sentence
              on a phone and the two beats read as one run-on. Each beat gets
              its own line. */}
          <h1 className="nx-tilehero__h1" style={{ fontFamily: S }}>
            {HERO.shout.split(/(?<=\.)\s+/).map((beat) => (
              <span key={beat} className="nx-tilehero__beat">{beat}</span>
            ))}
          </h1>
          <p className="nx-tilehero__line" style={{ fontFamily: S }}>{HERO.lead} <RotatingWord words={HERO.rotating} /><span className="sr-only">, {HERO.rotating.slice(1).join(", ")}</span>.</p>
          <p className="nx-tilehero__sub" style={{ fontFamily: F }}>{HERO.subline}</p>
        </m.div>
        <m.div className="nx-tiles nx-tiles--3 nx-tiles--hero" data-testid="hero-tiles" style={{ y: tilesY }}>
          {TILES.map((t, i) => <HeroTile key={t.goal} t={t} i={i} />)}
        </m.div>
        <div className="nx-tilehero__foot">
          <a href="#treatments" className="nx-cta-cobalt" data-testid="frontdoor-hero-cta">{HERO.cta}</a>
          <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)" }}>How it works</Link>
        </div>
      </div>
    </section>
  );
}
