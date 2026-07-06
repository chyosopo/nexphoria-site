import { Link } from "wouter";
import { outcomeSrcSet } from "@/data/outcomeImagery";

/* HeroTileRail — the hims-grammar hero: two columns of tall rounded photo
   tiles drifting vertically in opposite directions (desktop lg+), a
   swipeable snap strip on mobile. Tiles carry a goal/product chip (label +
   feeling/price line) and link one step into the funnel — they are links,
   never solid CTAs, so the hero keeps ONE action (CTA law, ROADMAP 1.1).
   Each column renders its tiles twice for a seamless -50% loop; the
   duplicate set is aria-hidden and out of the tab order. */

export interface RailTile {
  img: string;
  /** small caps line — the goal or product name */
  label: string;
  /** italic serif line — the feeling or the real from-price */
  sub?: string;
  href: string;
  testid?: string;
}

function Tile({ t, decorative = false, eager = false }: { t: RailTile; decorative?: boolean; eager?: boolean }) {
  return (
    <Link
      href={t.href}
      className="nx-vtile"
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      data-testid={decorative ? undefined : t.testid}
    >
      <img
        src={t.img}
        srcSet={outcomeSrcSet(t.img)}
        sizes="(max-width: 1023px) 58vw, 18vw"
        alt=""
        aria-hidden
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={1632}
        height={2048}
      />
      <span className="nx-vtile-chip">
        <span className="t">{t.label}</span>
        {t.sub && <span className="s">{t.sub}</span>}
      </span>
    </Link>
  );
}

export function HeroTileRail({ tiles, testid = "hero-tile-rail" }: { tiles: RailTile[]; testid?: string }) {
  const colA = tiles.filter((_, i) => i % 2 === 0);
  const colB = tiles.filter((_, i) => i % 2 === 1);
  return (
    <>
      {/* Desktop: the weightless vertical rail */}
      <div className="nx-vrail hidden lg:flex" data-testid={testid} aria-label="Explore goals and protocols">
        <div className="nx-vrail-col">
          {colA.map((t, i) => <Tile key={t.href + i} t={t} eager={i < 2} />)}
          {colA.map((t, i) => <Tile key={`dup-${t.href}${i}`} t={t} decorative />)}
        </div>
        <div className="nx-vrail-col down">
          {colB.map((t, i) => <Tile key={t.href + i} t={t} eager={i < 2} />)}
          {colB.map((t, i) => <Tile key={`dup-${t.href}${i}`} t={t} decorative />)}
        </div>
      </div>
      {/* Mobile: swipeable snap strip — same tiles, no duplication */}
      <div className="nx-vstrip lg:hidden" data-testid={`${testid}-strip`} aria-label="Explore goals and protocols">
        {tiles.map((t, i) => <Tile key={`m-${t.href}${i}`} t={t} eager={i < 2} />)}
      </div>
    </>
  );
}
