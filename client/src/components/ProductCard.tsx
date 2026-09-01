/* ═══ PRODUCT CARD — the one repeated block ═══

   Atlas measured the reference as ~5 reused components doing most of the work
   (IVYRX-STUDY-VISUAL.md §V2.1), with a single product card repeated across
   every shelf: image · name · price · action, plus one safety line. Ours had
   the card grammar written inline in the catalog and NOWHERE else — so the
   home page, after the two-worlds deletion took its formulary row with it,
   showed no products at all.

   One component now, used by every surface that lists products. Derives its own
   price line from the catalog rather than accepting a formatted string, so a
   card can never display a figure that disagrees with the PDP it links to. */
import { Link } from "wouter";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { usd } from "@/data/stacksCatalog";
import { getPrice } from "@/data/pricing";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import type { SoloPeptide } from "@/data/soloCatalog";

/** The price line for a SKU, in one place. Mirrors the PDP's own logic:
 *  gated products state the posture, priced products lead with the lowest real
 *  cadence, and anything else is honest about being set at consultation. */
export function priceLineFor(s: SoloPeptide): string {
  if (s.gated) return "Physician-assessed";
  if (s.pricing) return `From ${usd(s.pricing.m12)}/mo`;
  const p = getPrice(s.slug);
  return p ? `From ${usd(p.monthlyPrice)}/mo` : "Priced at consultation";
}

export function ProductCard({
  sku, testId,
}: {
  sku: SoloPeptide;
  testId?: string;
}) {
  return (
    <Link
      href={`/peptides/${sku.slug}`}
      className="nx-float-card"
      data-testid={testId ?? `peptide-${sku.slug}`}
    >
      {/* The card media is the PRODUCT, drawn — not editorial photography.
          The reference shoots every catalog card the same way: the vial
          upright and front-facing on a seamless gradient, no props
          (IVYRX-STUDY-VISUAL §V2.4). Ours was pulling per-SKU photos, and two
          of the four launch frames were actively wrong for a compounded vial:
          tirzepatide's is a branded autoinjector PEN, semaglutide's is a
          lifestyle scene. Both followed the SKU onto every shelf on the site.
          The photography keeps the surfaces it is right for — category heroes
          and the lower PDP band. */}
      <div className="nx-float-card__media">
        <VialPanel name={sku.name} dose={labelSpec(sku.spec)} size="84%" ratio="4 / 3" fill={0.58} />
        {sku.gated && (
          <span className="nx-float-badge"><Lock size={10} aria-hidden /> Assessed</span>
        )}

        {/* HOW IT WORKS — rises over the product on hover or keyboard focus.
            Three facts a shelf card could not otherwise afford to print:
            what the molecule does, how it is dosed, and which panel gates it.

            It is an ENHANCEMENT, never the only home for any of this: every
            line here is stated in full on the PDP the card links to, and the
            panel is aria-hidden so a screen reader is not read a duplicate of
            the destination page. Rising from the media slot rather than
            covering the card keeps the name and the price visible throughout —
            a reveal that hides the price to show a description is a worse
            card, not a fancier one. */}
        <div className="nx-card-reveal" aria-hidden>
          <p className="nx-card-reveal__eyebrow">How it works</p>
          <p className="nx-card-reveal__body">{sku.mechanism}</p>
          <dl className="nx-card-reveal__facts">
            <div><dt>Dose</dt><dd>{sku.dose}</dd></div>
            <div><dt>Gated on</dt><dd>{sku.panel} panel</dd></div>
          </dl>
        </div>
      </div>
      <div className="nx-float-card__body">
        <p
          style={{
            fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700,
            letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
          }}
        >
          {sku.category}
        </p>
        <h3
          style={{
            fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)",
            color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem",
          }}
        >
          {sku.name}
        </h3>
        <p
          className="nx-line-1"
          style={{
            fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4,
            color: "var(--nx-fg-graphite)", marginTop: "0.35rem",
          }}
        >
          {sku.outcome}
        </p>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 8, marginTop: "auto", paddingTop: "0.85rem",
          }}
        >
          <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
            {priceLineFor(sku)}
          </span>
          <ArrowRight size={16} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
        </div>
        {/* The one-line safety string the reference carries on every card.
            Conditional grammar, so a shelf card never implies a sale. */}
        <p
          style={{
            fontFamily: F, fontSize: "var(--nx-t-2xs)", lineHeight: 1.45,
            color: "var(--nx-fg-muted)", marginTop: "0.55rem",
          }}
        >
          Prescription only · dispensed if prescribed
        </p>
      </div>
    </Link>
  );
}

/** A shelf of product cards. The grid is part of the block, so every surface
 *  that lists products gets the same rhythm without restating it. */
export function ProductShelf({
  skus, testId,
}: {
  skus: SoloPeptide[];
  testId?: string;
}) {
  if (skus.length === 0) return null;
  return (
    <div
      data-testid={testId}
      style={{
        display: "grid",
        gap: "clamp(0.9rem,2vw,1.25rem)",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
      }}
    >
      {skus.map((s) => <ProductCard key={s.slug} sku={s} />)}
    </div>
  );
}
