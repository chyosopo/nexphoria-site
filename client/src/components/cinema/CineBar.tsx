/* ═══ The sticky bar (2026-09-16) ═══
   mod.com keeps a strip at the foot of every scroll position: the brand,
   one line, one button. Ours rises once the reader is past the hero and
   stays; it is the same way in as the hero pill, nothing more. */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";

export function CineBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`nx-cine-bar${on ? " is-on" : ""}`} data-testid="cine-bar" aria-hidden={!on} {...(!on ? { inert: true } : {})}>
      <span className="nx-cine-bar__k">Nexphoria<i>.</i></span>
      <span className="nx-cine-bar__line" style={{ fontFamily: F }}>{HERO.cinema.bar}</span>
      <Link href="/quiz" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="cine-bar-cta" tabIndex={on ? 0 : -1}>
        {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
      </Link>
    </div>
  );
}
