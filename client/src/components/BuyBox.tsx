/* ═══ BUY BOX — D12 · commerce always in view ═══
   One component, four states: the four terms as tiles (stack or solo), a
   pending medicine (the price once, one email), the GLP-1 physician wall,
   or consult-priced. Desktop lg+: sticky rail beside the content (the
   .nx-buyrail wrapper in the page). Mobile: the card sits in flow AND a
   fixed bottom bar keeps name, price and the button persistent. Styles in
   client/src/styles/buy.css; tokens only, both worlds theme it for free. */
import { useEffect } from "react";
import { Link } from "wouter";
import { Lock, Check, FlaskConical, Stethoscope, Snowflake, Droplets } from "lucide-react";
import { usd } from "@/data/stacksCatalog";
import { track } from "@/lib/analytics";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { useCart } from "@/contexts/CartProvider";
import { CADENCE_DISCOUNTS, type CadenceKey } from "@/data/pricing";
import { ReserveForm } from "@/components/ReserveForm";
import { StatusPill } from "@/components/StatusPill";
import type { SoloStatus } from "@/data/soloCatalog";
import "@/styles/buy.css";

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
      protocol with a pending medicine) show the price once and take an
      email for when it is available instead of a cart add. */
  availability?: SoloStatus | "reserve";
  /** what is pending, for the reservation note (protocols) */
  pending?: string[];
}

const CTA = ({ testId, children, href = "/peptides" }: { testId: string; children: React.ReactNode; href?: string }) => (
  <Link
    href={href}
    data-testid={testId}
    onClick={() => track("intake_cta", { source: "buybox", testId })}
    className="nx-cta-cobalt nx-buybox__cta"
  >
    {children}
  </Link>
);

/* The months and the per-month saving behind a tier, from the one cadence
   table, so a tile can state its term total and "10% less a month" as facts
   without a second source. */
function termOf(t: BuyTier): { months: number; less: number } {
  const cad = TIER_TO_CADENCE[t.key];
  const c = cad ? CADENCE_DISCOUNTS[cad] : undefined;
  return { months: c?.months ?? 1, less: c?.savePct ?? 0 };
}

export function BuyBox(props: BuyBoxProps) {
  const { name, category, slug, addType, tiers, selected, onSelect, gated, gatedStates, consultPriced, fromPrice, ctaTestId, availability = "live", pending } = props;
  const reserving = availability !== "live";
  /* A pending medicine states one price: the one-month figure, the first tier. */
  const active = reserving ? tiers?.[0] : (tiers?.find((t) => t.key === selected) ?? tiers?.[0]);
  const { addStack, addPeptide } = useCart();
  const cadence = active ? TIER_TO_CADENCE[active.key] : undefined;
  const months = active ? termOf(active).months : 1;
  const selling = Boolean(cadence) && !gated && !consultPriced;

  /* The mobile bar is fixed; the body carries its height as bottom padding
     while a buy box is mounted, so the footer's last line stays readable. */
  useEffect(() => {
    document.body.classList.add("nx-has-buybar");
    return () => document.body.classList.remove("nx-has-buybar");
  }, []);

  // The bug this fixes: the cadence selector chose a price the visitor could
  // never act on — the only button routed to the assessment. Sellable tiers
  // now really add to the protocol (cart) at the selected cadence.
  function handleAdd() {
    if (!cadence) return;
    track("add_to_cart", { source: "buybox", slug, type: addType, cadence });
    if (addType === "stack") addStack(slug, { cadence });
    else addPeptide(slug, { cadence });
  }

  const pendingNote = pending && pending.length > 0
    ? `${pending.join(" and ")} ${pending.length > 1 ? "are" : "is"} pending final FDA rulemaking for compounding. The price above is what it will cost. Leave an email and we tell you when it is available.`
    : `${name} is pending final FDA rulemaking for compounding. The price above is what it will cost. Leave an email and we tell you when it is available.`;

  return (
    <>
      {/* ── THE CARD — in the sticky rail on lg+, in-flow card below ── */}
      <div className="nx-buybox" data-testid="buybox">
        <p className="nx-buybox__cat">{category}</p>
        <p className="nx-buybox__name">{name}</p>
        <StatusPill status={availability} testId="buybox-status" className="nx-buybox__status" />

        {/* State exclusions are a LEGAL constraint, not a property of gating.
            They previously rendered only inside the gated branch, so ungating a
            product silently dropped the notice. Hoisted here so it shows on
            every path a restricted product can take. */}
        {!gated && gatedStates && gatedStates.length > 0 && (
          <p className="nx-buybox__legal" data-testid="buybox-state-exclusions">
            Not available in {gatedStates.join(", ")}.
          </p>
        )}

        {gated ? (
          <>
            <div className="nx-buybox__gate">
              <Lock size={14} aria-hidden="true" /> Physician-assessed only
            </div>
            <p className="nx-buybox__body">
              Prescribed after a physician's review. Dosed and priced at consultation against the baseline panel, then adjusted from the week-12 panel.
            </p>
            {gatedStates && (
              <p className="nx-buybox__legal">
                Unavailable in {gatedStates.join(", ")}.
              </p>
            )}
            <CTA testId={ctaTestId} href="/contact">Request a consultation</CTA>
          </>
        ) : consultPriced || !tiers?.length || !active ? (
          <>
            <p className="nx-buybox__from">
              {fromPrice ? (
                <>From ${fromPrice}<small>/mo · if prescribed</small></>
              ) : (
                "Priced at consultation"
              )}
            </p>
            <p className="nx-buybox__body">
              {fromPrice
                ? "Cadence and final price are set by a physician at intake, against the protocol."
                : "Dosed and priced by a physician at intake, against the protocol."}
            </p>
            <CTA testId={ctaTestId}>Get started</CTA>
          </>
        ) : reserving ? (
          /* A pending medicine: the price once, then one email. */
          <div className="nx-pending" id="reserve">
            <p className="nx-pending__price" data-testid={`cadence-${active.key}`}>
              {usd(active.amount)}<small>{active.per === "/mo" ? "a month" : "a cycle"}</small>
            </p>
            <p className="nx-pending__note" data-testid="buybox-reserve-note">{pendingNote}</p>
            <ReserveForm slug={slug} kind={addType} testId={`${ctaTestId}-reserve`} />
          </div>
        ) : (
          <>
            {/* The four terms as tiles. Every tile carries its monthly price
                AND its term total (a term is only comparable against another
                term on complete figures, IVYRX-STUDY-VISUAL.md §V3.4); the
                saving is stated as a fact, never as a badge. */}
            <div role="radiogroup" aria-label="Term" className="nx-bb-terms">
              {tiers.map((t) => {
                const isActive = t.key === active.key;
                const { months: m, less } = termOf(t);
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => { onSelect?.(t.key); track("cadence_selected", { cadence: t.key, product: name }); }}
                    data-testid={`cadence-${t.key}`}
                    className="nx-bb-term"
                  >
                    <span className="nx-bb-term__term">{t.label}</span>
                    <span className="nx-bb-term__price">
                      {usd(t.amount)}<small>{t.per}</small>
                    </span>
                    <span className="nx-bb-term__total">
                      {t.per === "/mo" && m > 1 ? `${usd(t.amount * m)} for ${m} months` : t.sub}
                    </span>
                    {less > 0 && <span className="nx-bb-term__less">{less}% less a month</span>}
                    <span className="nx-bb-term__check" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
                  </button>
                );
              })}
            </div>

            {/* The total, once. */}
            {active.per === "/mo" && (
              <div className="nx-buybox__sum" data-testid="buybox-total">
                <p className="nx-buybox__sum-label">Paid up front, {months > 1 ? `${months} months` : "one month"}</p>
                <p className="nx-buybox__sum-value">{usd(active.amount * months)}</p>
              </div>
            )}

            {/* What the term includes, as four icon rows. */}
            <ul className="nx-incl" aria-label="Included">
              <li><FlaskConical size={14} strokeWidth={2.2} aria-hidden="true" /><span>Compounded to order in a licensed U.S. pharmacy</span></li>
              <li><Stethoscope size={14} strokeWidth={2.2} aria-hidden="true" /><span>A licensed U.S. physician's review</span></li>
              <li><Snowflake size={14} strokeWidth={2.2} aria-hidden="true" /><span>Cold shipping to your door</span></li>
              <li data-testid="buybox-labs"><Droplets size={14} strokeWidth={2.2} aria-hidden="true" /><span>{active.labs ?? (active.includesPanel ? "Blood test at week 12 included" : "Blood kit before the first dose, included")}</span></li>
            </ul>

            {cadence ? (
              <button
                type="button"
                onClick={handleAdd}
                data-testid={ctaTestId}
                className="nx-cta-cobalt nx-buybox__cta"
              >
                Add to cart
              </button>
            ) : (
              <CTA testId={ctaTestId}>Get started</CTA>
            )}
            <p className="nx-buybox__rx">
              Prescribed if a licensed U.S. physician finds it appropriate.{" "}
              {cadence && (
                <Link href="/how-it-works" className="nx-text-link" data-testid={`${ctaTestId}-assess`} onClick={() => track("intake_cta", { source: "buybox-secondary" })}>
                  A quick online visit comes after the order.
                </Link>
              )}
            </p>
          </>
        )}
        <PrescribedPromise variant="card" testid="buybox-promise" className="nx-buybox__promise" />
      </div>

      {/* ── MOBILE PERSISTENT BAR — name, the monthly price, the button ── */}
      <div className="nx-buybar" data-testid="buybar">
        <div className="nx-buybar__row">
          <div className="nx-buybar__text">
            <p className="nx-buybar__name">{name}</p>
            <p className="nx-buybar__price">
              {gated ? "Eligibility first" : consultPriced || !active ? "At consult" : (
                <>
                  {usd(active.amount)}
                  <small>{active.per}{reserving ? "" : ` · ${active.label.toLowerCase()}`} · if prescribed</small>
                </>
              )}
            </p>
          </div>
          {reserving && selling ? (
            <a href="#reserve" data-testid={`${ctaTestId}-bar`} className="nx-cta-cobalt">
              Pending
            </a>
          ) : selling ? (
            <button type="button" onClick={handleAdd} data-testid={`${ctaTestId}-bar`} className="nx-cta-cobalt">
              Add to cart
            </button>
          ) : (
            <Link href={gated ? "/contact" : "/peptides"} data-testid={`${ctaTestId}-bar`} className="nx-cta-cobalt">
              {gated ? "Request a consultation" : "Get started"}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
