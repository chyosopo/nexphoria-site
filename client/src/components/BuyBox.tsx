/* ═══ BUY BOX — D12 · commerce always in view ═══
   One component, three states: cadence tiers (stack or solo), the GLP-1
   physician wall, or consult-priced. Desktop lg+: sticky rail beside the
   content. Mobile: the card sits in flow AND a fixed bottom bar keeps
   price + CTA persistent. Tokens only; both worlds theme it for free. */
import { Link } from "wouter";
import { Lock, Check } from "lucide-react";
import { F, S } from "@/lib/typography";
import { usd } from "@/data/stacksCatalog";
import { track } from "@/lib/analytics";

export interface BuyTier {
  key: string;
  label: string;
  sub: string;
  badge?: string;
  /** displayed amount (already per-month or per-cycle) */
  amount: number;
  per: "/mo" | "/cycle";
  includesPanel?: string;
}

export interface BuyBoxProps {
  name: string;
  category: string;
  tiers?: BuyTier[];
  selected?: string;
  onSelect?: (key: string) => void;
  /** GLP-1 physician wall */
  gated?: boolean;
  gatedStates?: string[];
  /** no pricing at all — physician-priced at consult */
  consultPriced?: boolean;
  ctaTestId: string;
}

const CTA = ({ testId, children }: { testId: string; children: React.ReactNode }) => (
  <Link
    href="/assessment"
    data-testid={testId}
    onClick={() => track("intake_cta", { source: "buybox", testId })}
    style={{
      display: "block", textAlign: "center", fontFamily: F, fontWeight: 600,
      fontSize: "var(--nx-t-base)", background: "var(--nx-cobalt)", color: "var(--nx-ceramic)",
      borderRadius: "var(--nx-r-pill)", padding: "14px 26px", textDecoration: "none",
    }}
  >
    {children}
  </Link>
);

export function BuyBox(props: BuyBoxProps) {
  const { name, category, tiers, selected, onSelect, gated, gatedStates, consultPriced, ctaTestId } = props;
  const active = tiers?.find((t) => t.key === selected) ?? tiers?.[0];

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
        <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          {category}
        </p>
        <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", marginTop: 4, lineHeight: 1.1 }}>
          {name}
        </p>

        {gated ? (
          <>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginTop: "0.9rem" }}>
              <Lock size={14} /> Physician-assessed only
            </div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.55rem" }}>
              Prescribed after review — not bought from a shelf. Dosed and titrated by a licensed physician against your bloodwork.
            </p>
            {gatedStates && (
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.6rem" }}>
                Unavailable in {gatedStates.join(", ")}.
              </p>
            )}
            <div style={{ marginTop: "1.1rem" }}>
              <CTA testId={ctaTestId}>Begin eligibility intake</CTA>
            </div>
          </>
        ) : consultPriced || !tiers?.length ? (
          <>
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.9rem", lineHeight: 1 }}>
              Priced at consultation
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>
              Dosed and priced by your physician at intake, against your protocol.
            </p>
            <div style={{ marginTop: "1.1rem" }}>
              <CTA testId={ctaTestId}>Begin your intake</CTA>
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
                    <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", whiteSpace: "nowrap" }}>
                      {usd(t.amount)}
                      <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>{t.per}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {active?.includesPanel && (
              <p style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: "0.7rem" }}>
                <Check size={13} strokeWidth={2.6} /> Includes {active.includesPanel} panel
              </p>
            )}
            <div style={{ marginTop: "1rem" }}>
              <CTA testId={ctaTestId}>Begin your intake</CTA>
            </div>
          </>
        )}
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-muted)", marginTop: "0.75rem", textAlign: "center" }}>
          No charge unless prescribed. Physician review required.
        </p>
      </div>

      {/* ── MOBILE PERSISTENT BAR — price + CTA, always reachable ── */}
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
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
        }}
        data-testid="buybar"
      >
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {name}
          </p>
          <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.05 }}>
            {gated ? "Eligibility first" : consultPriced || !active ? "At consult" : (
              <>
                {usd(active.amount)}
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>{active.per} · if prescribed</span>
              </>
            )}
          </p>
        </div>
        <Link
          href="/assessment"
          data-testid={`${ctaTestId}-bar`}
          style={{
            flexShrink: 0, fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)",
            background: "var(--nx-cobalt)", color: "var(--nx-ceramic)",
            borderRadius: "var(--nx-r-pill)", padding: "11px 20px", textDecoration: "none", whiteSpace: "nowrap",
          }}
        >
          {gated ? "Check eligibility" : "Begin intake"}
        </Link>
      </div>
      {/* spacer so the fixed bar never covers the footer’s last line on mobile */}
      <div className="lg:hidden" style={{ height: 64 }} aria-hidden />
    </>
  );
}
