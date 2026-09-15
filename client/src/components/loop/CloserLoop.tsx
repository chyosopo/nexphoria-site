/* ═══ The closer: the night panel, centred (2026-09-15) ═══ */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import { HERO } from "@/data/hero";

export function CloserLoop({ id = "fd-closer" }: { id?: string }) {
  return (
    <section className="nx-container nx-sec" aria-labelledby={id} style={{ paddingBottom: "var(--nx-sp-band)" }}>
      <div className="nx-olclose nx-dk">
        <p className="nx-eyebrow">Start here</p>
        <h2 id={id} className="nx-olclose__h2">Three minutes to start. <span className="nx-grad">A physician takes it from there.</span></h2>
        <p className="nx-olclose__p" style={{ fontFamily: F }}>{HERO.micro}</p>
        <Link href="/quiz" className="nx-cta-cobalt" data-testid="frontdoor-closer-cta" style={{ fontFamily: F }}>
          {HERO.cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
        </Link>
      </div>
    </section>
  );
}
