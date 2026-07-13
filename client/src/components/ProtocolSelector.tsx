/* ═══ PROTOCOL SELECTOR — the goal page as a decision surface ═══
   Maximus grammar (docs/MAXIMUS-STUDY.md §2–3) in Nexphoria voice: an
   on-page "which sounds like you?" chip row that highlights the matching
   route card. 2–4 routes per goal, uniform card skeleton — badges, name,
   "Best for:", three facts, price anchor. The visitor self-selects; the
   copy keeps repeating that a physician confirms. */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { selectorRoutes } from "@/data/protocolSelector";
import type { PeptideCategory } from "@/data/peptides";
import { track } from "@/lib/analytics";
import { F, S } from "@/lib/typography";

type Pick = "protocol" | "compound" | "unsure" | null;

export function ProtocolSelector({ goal, world }: { goal: PeptideCategory; world: "men" | "women" }) {
  const routes = selectorRoutes(goal, world);
  const [pick, setPick] = useState<Pick>(null);
  if (routes.length < 2) return null; // no real choice to offer

  const hasProtocol = routes.some((r) => r.kind === "protocol");
  const matchSlug =
    pick === "protocol" ? routes.find((r) => r.kind === "protocol")?.slug
    : pick === "compound" ? routes.find((r) => r.kind === "compound")?.slug
    : undefined;

  const choose = (p: Exclude<Pick, null>) => {
    setPick(p);
    track("selector_pick", { goal, pick: p, world });
  };

  const chips: { key: Exclude<Pick, null>; label: string }[] = [
    ...(hasProtocol ? [{ key: "protocol" as const, label: "I want the complete, curated protocol" }] : []),
    { key: "compound", label: "I'd rather start with one targeted compound" },
    { key: "unsure", label: "Not sure — let the physician decide" },
  ];

  return (
    <section id="routes" className="nx-section" aria-labelledby={`selector-title-${goal}`} data-testid={`selector-${goal}`}>
      <div className="nx-container">
        <p className="nx-eyebrow">Choose your route</p>
        <h2 id={`selector-title-${goal}`} style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,40px)", color: "var(--nx-fg)", marginTop: "0.7rem", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "22ch" }}>
          {routes.length} routes to the same goal.
        </h2>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "0.8rem" }}>
          Pick the shape that fits how you want to work. Whichever you choose, a
          physician confirms it against your bloodwork — and can decline.
        </p>

        {/* ── the question — on-page, low-commitment (Maximus §3) ── */}
        <div role="group" aria-label="Which sounds like you?" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1.4rem" }}>
          <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", alignSelf: "center", marginRight: 4 }}>
            Which sounds like you?
          </span>
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => choose(c.key)}
              aria-pressed={pick === c.key}
              className="nx-filter-chip"
              data-testid={`selector-chip-${c.key}`}
              style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── the routes — uniform comparison skeleton ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))", gap: 14, marginTop: "1.6rem", alignItems: "stretch" }}>
          {routes.map((r) => {
            const matched = matchSlug === r.slug;
            return (
              <Link
                key={r.slug}
                href={r.href}
                className="nx-float-card"
                data-testid={`selector-route-${r.slug}`}
                style={matched ? { borderColor: "var(--nx-cobalt)", boxShadow: "var(--nx-e-2)" } : undefined}
                aria-current={matched ? "true" : undefined}
              >
                <div className="nx-float-card__body">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                    {matched && (
                      <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-bg)", background: "var(--nx-cobalt)", borderRadius: "var(--nx-r-pill)", padding: "3px 10px" }}>
                        Your match
                      </span>
                    )}
                    {r.badges.map((b) => (
                      <span key={b} style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--nx-cobalt)", background: "var(--nx-cobalt-soft)", borderRadius: "var(--nx-r-pill)", padding: "3px 10px" }}>
                        {b}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.7rem" }}>
                    {r.name}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.45rem" }}>
                    <strong style={{ fontWeight: 600, color: "var(--nx-fg)" }}>Best for:</strong> {r.bestFor}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0.7rem 0 0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {r.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)" }}>
                        <Check size={14} strokeWidth={2.4} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 3 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.95rem" }}>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                      {r.priceLine}
                      {!r.gated && r.priceLine.startsWith("From") && (
                        <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span>
                      )}
                    </span>
                    <ArrowRight size={16} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                  {r.note && (
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.45rem" }}>{r.note}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── the honest exit — the intake decides, not the catalog ── */}
        <div
          data-testid="selector-unsure"
          style={{
            marginTop: 14,
            border: `1px solid ${pick === "unsure" ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
            borderRadius: "var(--nx-r-md)",
            background: "var(--nx-ceramic)",
            padding: "1rem 1.2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0, maxWidth: "60ch" }}>
            {pick === "unsure" && (
              <strong style={{ fontWeight: 700, color: "var(--nx-cobalt)", textTransform: "uppercase", fontSize: "var(--nx-t-xs)", letterSpacing: "0.08em", marginRight: 8 }}>
                Your match
              </strong>
            )}
            You don't have to pick correctly from a grid. Share your history and
            bloodwork; a physician matches you to the right route — or tells you none is appropriate.
          </p>
          <Link href={`/assessment?gender=${world === "women" ? "female" : "male"}&goal=${goal}`} className="nx-text-link" data-testid="selector-assess" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            Start your assessment <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
