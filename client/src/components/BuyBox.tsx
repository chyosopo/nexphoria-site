/* ═══ BUY BOX — D12 · commerce always in view ═══
   One component, three states: cadence tiers (stack or solo), the GLP-1
   physician wall, or consult-priced. Desktop lg+: sticky rail beside the
   content. Mobile: the card sits in flow AND a fixed bottom bar keeps
   price + CTA persistent. Tokens only; both worlds theme it for free. */
import { Link } from "wouter";
import { Lock, Check, FlaskConical } from "lucide-react";
import { F, S } from "@/lib/typography";
import { usd } from "@/data/stacksCatalog";
import { track } from "@/lib/analytics";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { useCart } from "@/contexts/CartProvider";
import { billingNote, CADENCE_DISCOUNTS, type CadenceKey } from "@/data/pricing";
import { ReserveForm } from "@/components/ReserveForm";
import { StatusPill } from "@/components/StatusPill";
import type { SoloStatus } from "@/data/soloCatalog";

export interface BuyTier {
  key: string;
  label: string;
  sub: string;
  badge?: string;
  /** displayed amount (already per-month or per-cycle) */
  amount: number;
  per: "/mo" | "/cycle";
  includesPanel?: string;
  /** the labs included at this term (the playbook) */
  labs?: string;
}

/* Tier keys → cart cadence. Stacks use 1mo/3mo/12mo (+fixed), solos m1/m3/m12.
   "fixed" is physician-defined and can't be carted — it keeps the intake CTA. */
const TIER_TO_CADENCE: Record<string, CadenceKey | undefined> = {
  "1mo": "1mo", m1: "1mo",
  "3mo": "3mo", m3: "3mo",
  "6mo": "6mo", m6: "6mo",
  "12mo": "12mo", m12: "12mo",
};

export interface BuyBoxProps {
  name: string;
  category: string;
  /** cart identity — which product this box sells */
  slug: string;
  addType: "stack" | "peptide";
  tiers?: BuyTier[];
  selected?: string;
  onSelect?: (key: string) => void;
  /** GLP-1 physician wall */
  gated?: boolean;
  gatedStates?: string[];
  /** no pricing at all — physician-priced at consult */
  consultPriced?: boolean;
  /** consult-priced but a real from-price exists (data/pricing) — show it,
      so the PDP never contradicts the shelf card that said "From $X/mo" */
  fromPrice?: number;
  ctaTestId: string;
  /** "live" sells. "coming" / "watch" (a pending solo) and "reserve" (a
      protocol with a pending medicine) show the ladder and take a
      reservation at the shown price instead of a cart add. */
  availability?: SoloStatus | "reserve";
  /** what is pending, for the reservation note (protocols) */
  pending?: string[];
}

const CTA = ({ testId, children }: { testId: string; children: React.ReactNode }) => (
  <Link
    href="/peptides"
    data-testid={testId}
    onClick={() => track("intake_cta", { source: "buybox", testId })}
    className="nx-cta-cobalt"
    style={{ display: "flex", justifyContent: "center", fontSize: "var(--nx-t-base)", padding: "14px 26px" }}
  >
    {children}
  </Link>
);

export function BuyBox(props: BuyBoxProps) {
  const { name, category, slug, addType, tiers, selected, onSelect, gated, gatedStates, consultPriced, fromPrice, ctaTestId, availability = "live", pending } = props;
  const active = tiers?.find((t) => t.key === selected) ?? tiers?.[0];
  const { addStack, addPeptide } = useCart();
  const cadence = active ? TIER_TO_CADENCE[active.key] : undefined;
  const reserving = availability !== "live";

  // The bug this fixes: the cadence selector chose a price the visitor could
  // never act on — the only button routed to the assessment. Sellable tiers
  // now really add to the protocol (cart) at the selected cadence.
  function handleAdd() {
    if (!cadence) return;
    track("add_to_cart", { source: "buybox", slug, type: addType, cadence });
    if (addType === "stack") addStack(slug, { cadence });
    else addPeptide(slug, { cadence });
  }

  return (
    <>
      {/* ── THE CARD — sticky rail on lg+, in-flow card below ── */}
      <div
        className="nx-buybox"
        style={{
          background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)",
          borderRadius: "var(--nx-r-lg)", boxShadow: "var(--nx-e-3)",
          padding: "1.3rem 1.3rem 1.4rem",
        }}
        data-testid="buybox"
      >
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          {category}
        </p>
        <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", marginTop: 4, lineHeight: 1.1 }}>
          {name}
        </p>
        <StatusPill status={availability} testId="buybox-status" style={{ marginTop: "0.6rem" }} />

        {/* State exclusions are a LEGAL constraint, not a property of gating.
            They previously rendered only inside the gated branch, so ungating a
            product silently dropped the notice. Hoisted here so it shows on
            every path a restricted product can take. */}
        {!gated && gatedStates && gatedStates.length > 0 && (
          <p
            data-testid="buybox-state-exclusions"
            style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.7rem" }}
          >
            Not available in {gatedStates.join(", ")}.
          </p>
        )}

        {gated ? (
          <>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginTop: "0.9rem" }}>
              <Lock size={14} /> Physician-assessed only
            </div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.55rem" }}>
              Prescribed after your physician reviews you. Dosed and priced at your consultation against your baseline blood work, then adjusted from your week-12 blood test.
            </p>
            {gatedStates && (
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.6rem" }}>
                Unavailable in {gatedStates.join(", ")}.
              </p>
            )}
            <div style={{ marginTop: "1.1rem" }}>
              <CTA testId={ctaTestId}>Check eligibility</CTA>
            </div>
          </>
        ) : consultPriced || !tiers?.length ? (
          <>
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.9rem", lineHeight: 1 }}>
              {fromPrice ? (
                <>From ${fromPrice}<span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>/mo · if prescribed</span></>
              ) : (
                "Priced at consultation"
              )}
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>
              {fromPrice
                ? "Cadence and final price are set by a physician at intake, against your protocol."
                : "Dosed and priced by a physician at intake, against your protocol."}
            </p>
            <div style={{ marginTop: "1.1rem" }}>
              <CTA testId={ctaTestId}>Get started</CTA>
            </div>
          </>
        ) : (
          <>
            <div role="radiogroup" aria-label="Cadence" style={{ marginTop: "1rem", display: "grid", gap: 8 }}>
              {tiers.map((t) => {
                const isActive = t.key === active?.key;
                return (
                  <button
                    key={t.key}
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => { onSelect?.(t.key); track("cadence_selected", { cadence: t.key, product: name }); }}
                    data-testid={`cadence-${t.key}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                      textAlign: "left", cursor: "pointer", width: "100%",
                      borderRadius: "var(--nx-r-md)", padding: "0.72rem 0.85rem",
                      background: isActive ? "var(--nx-cobalt-soft)" : "transparent",
                      border: `1.5px solid ${isActive ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
                      transition: "border-color var(--nx-dur-2) var(--nx-ease), background var(--nx-dur-2) var(--nx-ease)",
                    }}
                  >
                    <span>
                      <span style={{ display: "block", fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg)" }}>
                        {t.label}
                        {t.badge && (
                          <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginLeft: 8 }}>
                            {t.badge}
                          </span>
                        )}
                      </span>
                      <span style={{ display: "block", fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: 2 }}>{t.sub}</span>
                    </span>
                    <span style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>
                        {usd(t.amount)}
                        <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>{t.per}</span>
                      </span>
                      {/* The COMMITMENT TOTAL, on every tier — not only the
                          selected one, and not only below the CTA.

                          The reference site shows a per-month figure on each
                          term, pre-selects the longest, and never surfaces what
                          the term actually costs (IVYRX-STUDY-VISUAL.md §V3.4):
                          $97/mo reads cheapest while committing the patient to
                          $1,164. We compete by being legible instead — a term
                          is only comparable against another term on complete
                          figures, and the house line is "The figure is
                          complete." Suppressed where months <= 1, where a total
                          would just restate the monthly price. */}
                      {(() => {
                        const cad = TIER_TO_CADENCE[t.key];
                        const months = cad ? CADENCE_DISCOUNTS[cad].months : 1;
                        if (t.per !== "/mo" || months <= 1) return null;
                        return (
                          <span style={{ display: "block", fontFamily: F, fontSize: "var(--nx-t-2xs)", color: "var(--nx-fg-muted)", marginTop: 2 }}>
                            {usd(t.amount * months)} total
                          </span>
                        );
                      })()}
                    </span>
                  </button>
                );
              })}
            </div>
            {active?.labs ? (
              <p style={{ display: "flex", alignItems: "flex-start", gap: 6, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: "0.7rem", lineHeight: 1.45 }} data-testid="buybox-labs">
                <FlaskConical size={13} strokeWidth={2.4} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" /> <span>{active.labs}</span>
              </p>
            ) : active?.includesPanel ? (
              <p style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: "0.7rem" }}>
                <Check size={13} strokeWidth={2.6} /> Blood test at week 12 included
              </p>
            ) : null}
            {reserving && (
              <div style={{ marginTop: "1rem" }} id="reserve">
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" }} data-testid="buybox-reserve-note">
                  {pending && pending.length > 0
                    ? `${pending.join(" and ")} ${pending.length > 1 ? "are" : "is"} pending final FDA rulemaking for compounding. The price above is what it will cost. Leave an email and we tell you when it is available.`
                    : `${name} is pending final FDA rulemaking for compounding. The price above is what it will cost. Leave an email and we tell you when it is available.`}
                </p>
                <ReserveForm slug={slug} kind={addType} testId={`${ctaTestId}-reserve`} />
              </div>
            )}
            <div style={{ marginTop: "1rem" }} hidden={reserving}>
              {cadence ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  data-testid={ctaTestId}
                  className="nx-cta-cobalt"
                  style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: "var(--nx-t-base)", padding: "14px 26px", border: "none", cursor: "pointer" }}
                >
                  Add to cart · {active ? usd(active.amount) : ""}{active?.per}
                </button>
              ) : (
                <CTA testId={ctaTestId}>Get started</CTA>
              )}
            </div>
            {cadence && active?.per === "/mo" && (
              <div style={{ textAlign: "center", marginTop: "0.5rem", fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                {billingNote(cadence, active.amount)}
              </div>
            )}
            {cadence && !reserving && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "0.6rem" }}>
                <Link href="/peptides" className="nx-text-link" data-testid={`${ctaTestId}-assess`} onClick={() => track("intake_cta", { source: "buybox-secondary" })} style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                  Not sure? Answer a few health questions
                </Link>
              </div>
            )}
            {/* the gift link (stacks only) */}
            {addType === "stack" && (
              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: "0.5rem", fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600 }}>
                <Link href={`/gift?item=stack:${slug}`} data-testid={`${ctaTestId}-gift`} onClick={() => track("gift_entry", { source: "buybox", slug })} style={{ color: "var(--nx-fg-muted)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Give this protocol as a gift
                </Link>
              </div>
            )}
          </>
        )}
        <PrescribedPromise centered testid="buybox-promise" style={{ marginTop: "0.75rem", justifyContent: "center" }} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--nx-border)" }}>
        </div>
      </div>

      {/* ── MOBILE PERSISTENT BAR — price + CTA, always reachable ──
          The flex layout lives on an INNER div: an inline `display: flex` on
          this outer element would override the lg:hidden media rule (inline
          beats non-!important media styles) and render the bar on desktop. */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: "var(--nx-z-bar)" as unknown as number,
          // Solid background instead of backdrop-blur: this bar is mobile-only
          // (lg:hidden) and fixed while scrolling — backdrop-filter here was a
          // top cause of scroll jank on mid-range phones. Opaque = no recomposite.
          background: "var(--nx-ceramic)",
          borderTop: "1px solid var(--nx-border)",
          padding: "10px clamp(16px,4vw,24px) calc(10px + env(safe-area-inset-bottom))",
        }}
        data-testid="buybar"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {name}
          </p>
          <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.05 }}>
            {gated ? "Eligibility first" : consultPriced || !active ? "At consult" : (
              <>
                {usd(active.amount)}
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>{active.per} · {active.label.toLowerCase()} · if prescribed</span>
              </>
            )}
          </p>
        </div>
        {reserving && cadence && !gated && !consultPriced ? (
          <a href="#reserve" data-testid={`${ctaTestId}-bar`} className="nx-cta-cobalt" style={{ flexShrink: 0, fontSize: "var(--nx-t-sm)", padding: "11px 20px", whiteSpace: "nowrap" }}>
            Pending
          </a>
        ) : cadence && !gated && !consultPriced ? (
          <button
            type="button"
            onClick={handleAdd}
            data-testid={`${ctaTestId}-bar`}
            className="nx-cta-cobalt"
            style={{ flexShrink: 0, fontSize: "var(--nx-t-sm)", padding: "11px 20px", whiteSpace: "nowrap", border: "none", cursor: "pointer" }}
          >
            Add to cart
          </button>
        ) : (
          <Link
            href="/peptides"
            data-testid={`${ctaTestId}-bar`}
            className="nx-cta-cobalt"
            style={{ flexShrink: 0, fontSize: "var(--nx-t-sm)", padding: "11px 20px", whiteSpace: "nowrap" }}
          >
            {gated ? "Check eligibility" : "Get started"}
          </Link>
        )}
        </div>
      </div>
      {/* spacer so the fixed bar never covers the footer’s last line on mobile */}
      <div className="lg:hidden" style={{ height: 64 }} aria-hidden />
    </>
  );
}
