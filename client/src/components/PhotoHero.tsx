/* ═══ PhotoHero — the home page opening (Chiya, 2026-09-02)

   One crisp lifestyle photograph, the "you" voice, one button. No video, no
   scroll dependence: the lines rise once on load and the page is complete
   without JavaScript (the prerendered HTML carries the settled state; the
   entrance runs only on the client, only when motion is allowed).

   Layout: copy in the calm left third over a light veil, the photograph
   breathing on the right. Phones stack the photo above the copy. */
import { useEffect } from "react";
import { Link } from "wouter";
import { F, S } from "@/lib/typography";
import { HERO } from "@/data/hero";

export function PhotoHero() {
  // The entrance runs only on the client and only when motion is allowed; the
  // prerendered snapshot never carries the flag, so static HTML is settled.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) document.documentElement.classList.add("nx-motion");
    return () => document.documentElement.classList.remove("nx-motion");
  }, []);
  return (
    <section className="nx-phero" aria-label="Nexphoria" data-testid="photo-hero">
      <div className="nx-phero-art" aria-hidden="true">
        <img
          src={HERO.image}
          srcSet={HERO.imageSrcSet}
          sizes="(max-width: 860px) 100vw, 100vw"
          alt=""
          width={2400}
          height={1152}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="nx-container nx-phero-copy">
        <p className="nx-phero-kicker" style={{ fontFamily: F }}>{HERO.kicker}</p>
        <h1 className="nx-phero-h1" style={{ fontFamily: S }}>
          <span className="sr-only">{HERO.lines.join(" ")}</span>
          <span aria-hidden="true">
            {HERO.lines.map((l, i) => (
              <span key={l} className="nx-phero-line" style={{ ["--i" as string]: i }}>
                {i === HERO.lines.length - 1 ? <em>{l}</em> : l}
              </span>
            ))}
          </span>
        </h1>
        <p className="nx-phero-sub" style={{ fontFamily: F }}>{HERO.subline}</p>
        <div className="nx-phero-cta">
          <Link href="/assessment" className="nx-cta-cobalt nx-phero-btn" data-testid="frontdoor-hero-cta">
            {HERO.cta}
          </Link>
          <span className="nx-phero-micro" style={{ fontFamily: F }}>{HERO.micro}</span>
        </div>
        <ul className="nx-phero-chips" aria-label="What you get">
          {HERO.chips.map((c) => (
            <li key={c} style={{ fontFamily: F }}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
