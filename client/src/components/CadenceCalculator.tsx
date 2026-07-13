/* ═══ CADENCE CALCULATOR — the commitment ladder made concrete
   (MAXIMUS-STUDY §5). Pick a protocol, see the monthly-equivalent at each
   cadence and the real dollars a longer commitment saves over a year. Every
   number is DERIVED from priceAtCadence — no authored prices, no invented
   discount energy. Truth-only: it visualizes the existing ladder, it does
   not create a new offer. ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";
import { priceAtCadence, formatUSD, CADENCE_DISCOUNTS } from "@/data/pricing";
import { track } from "@/lib/analytics";
import { F, S } from "@/lib/typography";

const OPTIONS = FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length > 0);
const CADENCES = ["1mo", "3mo", "12mo"] as const;

export function CadenceCalculator() {
  const [slug, setSlug] = useState(OPTIONS[0]?.slug ?? "");
  const stack = OPTIONS.find((s) => s.slug === slug) ?? OPTIONS[0];
  if (!stack) return null;

  const perMonth = {
    "1mo": priceAtCadence(stack.slug, "1mo"),
    "3mo": priceAtCadence(stack.slug, "3mo"),
    "12mo": priceAtCadence(stack.slug, "12mo"),
  };
  // Real annual comparison: paying month-to-month for a year vs the annual plan.
  const yearAtMonthly = perMonth["1mo"] * 12;
  const yearAtAnnual = perMonth["12mo"] * 12;
  const yearSaved = yearAtMonthly - yearAtAnnual;

  const choose = (s: string) => {
    setSlug(s);
    track("cadence_calc", { protocol: s });
  };

  return (
    <div className="nx-glass-tile" data-testid="cadence-calculator" style={{ display: "block", padding: "clamp(1.4rem,3vw,2rem)", maxWidth: 860 }}>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
        See your plan
      </p>
      <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", marginTop: "0.5rem", lineHeight: 1.15 }}>
        What each cadence actually costs.
      </h3>

      {/* protocol picker */}
      <div role="group" aria-label="Choose a protocol" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1.1rem" }}>
        {OPTIONS.map((s) => (
          <button
            key={s.slug}
            onClick={() => choose(s.slug)}
            aria-pressed={slug === s.slug}
            className="nx-filter-chip"
            data-testid={`cadence-pick-${s.slug}`}
            style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* the three cadences, side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "1.3rem" }}>
        {CADENCES.map((k) => {
          const best = k === "12mo";
          const save = CADENCE_DISCOUNTS[k].savePct;
          return (
            <div
              key={k}
              data-testid={`cadence-col-${k}`}
              style={{
                border: `1px solid ${best ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
                borderRadius: "var(--nx-r-md)",
                background: best ? "var(--nx-cobalt-soft)" : "var(--nx-bg)",
                padding: "1rem 1.1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: best ? "var(--nx-cobalt)" : "var(--nx-fg-muted)" }}>
                {CADENCE_DISCOUNTS[k].label}
                {best && " · best value"}
              </p>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.2vw,32px)", color: "var(--nx-fg)", lineHeight: 1, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
                {formatUSD(perMonth[k])}
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-muted)" }}>/mo</span>
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                {save > 0 ? `Save ${save}% vs monthly` : "Billed monthly"}
              </p>
              {best && (
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: 2 }}>
                  Panel included
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* the concrete year-one delta */}
      {yearSaved > 0 && (
        <p aria-live="polite" style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg)", marginTop: "1.2rem" }} data-testid="cadence-saved">
          On {stack.name}, the annual plan runs{" "}
          <strong style={{ fontWeight: 700, color: "var(--nx-cobalt)" }}>{formatUSD(yearSaved)} less over a year</strong>{" "}
          than paying month-to-month — with the bloodwork panel included. If prescribed.
        </p>
      )}

      <Link href={`/stacks/${stack.slug}`} className="nx-text-link" data-testid="cadence-see-protocol" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.9rem" }}>
        See the {stack.name} protocol <ArrowRight size={15} aria-hidden />
      </Link>
    </div>
  );
}
