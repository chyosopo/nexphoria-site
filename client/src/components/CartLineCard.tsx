/* ═══ The cart line, as a card (2026-09-05) ═══
   One card for every place a line is shown: the drawer and the cart page.
   The SKU render on the tinted panel, the type chip, the name, the spec,
   the term as pills, the monthly price and the term total, a quantity
   stepper and Remove. Two shelves can never disagree about a line. */
import { Plus, Minus, Trash2, FlaskConical } from "lucide-react";
import { useCart, formatUSD, type CartLine, type CartItemType } from "@/contexts/CartProvider";
import { CADENCE_DISCOUNTS, pricing, type CadenceKey } from "@/data/pricing";
import { getStack } from "@/data/stacksCatalog";
import { F, S } from "@/lib/typography";
import { SkuPhoto } from "@/components/SkuPhoto";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { PROTO_TILE } from "@/lib/studioTiles";

const TYPE_LABEL: Record<CartItemType, string> = { peptide: "Medicine", stack: "Protocol", lab: "Blood test" };

export function lineTypeLabel(type: CartItemType): string {
  return TYPE_LABEL[type];
}

/** The render for a line: the SKU photo, the protocol's studio tile, or the
    kit's glyph. Used at card size here and at thumb size in the summaries. */
export function LineArt({ line }: { line: CartLine }) {
  if (line.type === "peptide") {
    const spec = pricing[line.slug]?.vialSpec;
    return <SkuPhoto slug={line.slug} name={line.name} className="nx-sku-img nx-sku-img--card" fallback={<VialPanel name={line.name} dose={labelSpec(spec)} size="78%" ratio="1 / 1" fill={0.58} />} />;
  }
  if (line.type === "stack") {
    const art = PROTO_TILE[line.slug];
    if (art) return <img src={art.src600} srcSet={`${art.src600} 600w, ${art.src} 1600w`} sizes="(max-width: 700px) 30vw, 132px" alt="" loading="lazy" decoding="async" width={600} height={600} />;
    return <VialPanel name={line.name} size="78%" ratio="1 / 1" fill={0.58} />;
  }
  return <FlaskConical size={28} strokeWidth={1.6} aria-hidden="true" />;
}

/** "3 months of Sermorelin" or "The Panel, complimentary": the plan in words. */
export function lineTermLine(line: CartLine): string {
  if (line.oneTime) return line.complimentary ? "With the medication order, complimentary" : "One time";
  return line.months > 1
    ? `${formatUSD(line.termTotal)} for ${line.months} months, paid up front`
    : "One month, paid up front";
}

export function CartLineCard({ line, variant }: { line: CartLine; variant: "page" | "drawer" }) {
  const { updateQty, updateCadence, removeItem } = useCart();
  const mid = variant === "page" ? "-page" : "";
  const key = `${line.type}-${line.slug}`;
  const spec = line.type === "peptide" ? pricing[line.slug] : undefined;
  const stack = line.type === "stack" ? getStack(line.slug) : undefined;
  return (
    <li className={`nx-cartline${variant === "drawer" ? " nx-cartline--drawer" : ""}`} data-testid={variant === "page" ? `cart-page-line-${key}` : `cart-line-${key}`}>
      <div className="nx-cartline__media" aria-hidden={line.type === "lab" ? "true" : undefined}>
        <LineArt line={line} />
      </div>

      <div className="nx-cartline__body">
        <span className="nx-cartline__tag" style={{ fontFamily: F }}>{TYPE_LABEL[line.type]}</span>
        <h3 className="nx-cartline__name" style={{ fontFamily: S }}>{line.name}</h3>
        {spec ? (
          <p className="nx-cartline__spec" style={{ fontFamily: F }}>{spec.vialSpec} · {spec.vialDuration}</p>
        ) : stack ? (
          <p className="nx-cartline__spec" style={{ fontFamily: F }}>{stack.peptides.map((p) => p.name).join(" + ")}</p>
        ) : null}

        <div className="nx-cartline__price">
          <p className="nx-cartline__monthly" style={{ fontFamily: F }} data-testid={variant === "page" ? `text-line-total-${key}` : undefined}>
            {line.complimentary ? "Complimentary" : formatUSD(line.lineTotal)}
            {!line.oneTime ? <small>a month</small> : null}
          </p>
          <p className="nx-cartline__termtotal" style={{ fontFamily: F }}>{lineTermLine(line)}</p>
        </div>
      </div>

        {!line.oneTime && (
          <div className="nx-cartline__term">
            <span className="nx-cartline__label" id={`term-${variant}-${key}`} style={{ fontFamily: F }}>The term</span>
            <div className="nx-term" role="radiogroup" aria-labelledby={`term-${variant}-${key}`}>
              {(Object.keys(CADENCE_DISCOUNTS) as CadenceKey[]).map((c) => {
                const meta = CADENCE_DISCOUNTS[c];
                const active = line.cadence === c;
                return (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className="nx-term__opt"
                    onClick={() => updateCadence(line.slug, line.type, c)}
                    data-testid={`button-cadence${mid}-${c}-${key}`}
                  >
                    <span>{meta.label}</span>
                    {meta.savePct > 0 ? <small>{meta.savePct}% less a month</small> : null}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      <div className="nx-cartline__controls">
        <div className="nx-qty" role="group" aria-label={`Quantity of ${line.name}`}>
          <button
            type="button"
            onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
            disabled={line.qty <= 1}
            aria-label="Decrease quantity"
            title={line.qty <= 1 ? "Use Remove to take this out" : undefined}
            data-testid={`button-qty-decrease${mid}-${key}`}
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span data-testid={`text-qty${mid}-${key}`}>{line.qty}</span>
          <button
            type="button"
            onClick={() => updateQty(line.slug, line.type, line.qty + 1)}
            disabled={line.oneTime}
            aria-label="Increase quantity"
            data-testid={`button-qty-increase${mid}-${key}`}
          >
            <Plus size={14} aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          className="nx-cartline__remove"
          onClick={() => removeItem(line.slug, line.type)}
          aria-label={`Remove ${line.name}`}
          data-testid={`button-remove${mid}-${key}`}
        >
          <Trash2 size={13} aria-hidden="true" /> Remove
        </button>
      </div>
    </li>
  );
}
