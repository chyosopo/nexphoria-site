/* ═══ PRODUCT TILE — the conversion block ═══

   Chiya: "The vials should show the benefits and the results, the expected
   outcomes, what it does. Customer should come in and want to convert. So
   quick."

   The old shelf card showed a bottle, a name, and a price. That asks a
   stranger to already know what tirzepatide is. This tile answers the four
   questions someone actually has, in the order they have them, without
   leaving the page:

     1. WHAT IS IT        the product shot and the molecule
     2. WHAT DOES IT DO   the outcome line, as the headline — not the chemistry
     3. WHAT HAPPENS      the real Wk 1 / Wk 4 / Wk 12 timeline from the catalog
     4. WHAT DOES IT COST the price floor and the one action

   WHY THE TIMELINE IS THE CENTREPIECE: it is the honest version of a
   before/after. We have no patient photos and will never fabricate any, but
   the catalog does carry a physician-set schedule of what is REVIEWED and WHEN
   — "Wk 4: physician reviews response", "Wk 12: reassessed against bloodwork".
   That converts on rigour rather than on a promise, and it is the one claim
   here that is entirely ours to make.

   COLOUR: the tile body carries its goal's tint, so metabolic is always the
   same green across the site. The photograph keeps its own light ground rather
   than being cut out and floated on the tint — glass mattes badly, and a
   ragged edge on a product shot costs more trust than a coloured square buys. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { usd } from "@/data/stacksCatalog";
import { getPrice } from "@/data/pricing";
import { accentFor } from "@/data/goalAccent";
import { VialHero } from "@/components/VialHero";
import { Reveal } from "@/components/Reveal";
import type { SoloPeptide } from "@/data/soloCatalog";

/** The price floor, derived the same way every other surface derives it. */
function priceFor(s: SoloPeptide): { figure: string; note: string } {
  if (s.gated) return { figure: "Assessed first", note: "priced with your physician" };
  if (s.pricing) return { figure: `${usd(s.pricing.m12)}/mo`, note: "12-month cadence · panel included" };
  const p = getPrice(s.slug);
  return p
    ? { figure: `${usd(p.monthlyPrice)}/mo`, note: "panel included" }
    : { figure: "At consultation", note: "set with your physician" };
}

export function ProductTile({ sku }: { sku: SoloPeptide }) {
  const accent = accentFor(sku.category);
  const price = priceFor(sku);

  return (
    <Link
      href={`/peptides/${sku.slug}`}
      className="nx-ptile"
      data-testid={`ptile-${sku.slug}`}
      style={{ background: accent.tint, borderColor: accent.edge }}
    >
      <div className="nx-ptile__media">
        <VialHero sku={sku} width="100%" />
        <span className="nx-ptile__cat" style={{ background: accent.ink }}>
          {sku.category}
        </span>
      </div>

      <div className="nx-ptile__body">
        {/* The OUTCOME is the headline. The molecule identifies; it does not
            lead. Someone who does not know what tesamorelin is still learns
            what it is for in one line. */}
        <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.15, color: accent.ink }}>
          {sku.outcome}
        </h3>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: accent.ink, opacity: 0.75, marginTop: "0.45rem" }}>
          {sku.name}
        </p>

        <p className="nx-ptile__mech" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>
          {sku.mechanism}
        </p>

        {/* WHAT HAPPENS, AND WHEN — the catalog's own schedule. Not a promise
            of results: every entry is a review point a physician set. */}
        <ol className="nx-ptile__timeline" aria-label={`What happens on ${sku.name}`}>
          {sku.timeline.map((t) => (
            <li key={t.wk}>
              <span className="nx-ptile__wk" style={{ color: accent.ink, borderColor: accent.edge }}>{t.wk}</span>
              <span className="nx-ptile__eff">{t.effect}</span>
            </li>
          ))}
        </ol>

        <div className="nx-ptile__foot" style={{ borderTopColor: accent.edge }}>
          <div>
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: accent.ink, lineHeight: 1 }}>
              {price.figure}
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", color: "var(--nx-fg-muted)", marginTop: "0.25rem" }}>
              {price.note}
            </p>
          </div>
          <span className="nx-ptile__go" style={{ background: accent.ink }}>
            <ArrowRight size={16} aria-hidden />
          </span>
        </div>

        {/* The safety line every product surface carries. Conditional grammar,
            so a tile can never imply a sale. */}
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", lineHeight: 1.4, color: "var(--nx-fg-muted)", marginTop: "0.6rem" }}>
          Prescribed by a U.S. physician
        </p>
      </div>
    </Link>
  );
}

export function ProductTiles({ skus, testId }: { skus: SoloPeptide[]; testId?: string }) {
  if (skus.length === 0) return null;
  return (
    /* .nx-stagger deals the tiles in one after another as the shelf enters
       view rather than dropping all four on the same frame. Each tile is
       wrapped in its own Reveal because the cascade is driven by nth-child on
       the wrappers — the grid itself cannot stagger its children. */
    <div className="nx-ptile-grid nx-stagger" data-testid={testId}>
      {skus.map((s) => (
        <Reveal key={s.slug} className="nx-reveal-lift">
          <ProductTile sku={s} />
        </Reveal>
      ))}
    </div>
  );
}
