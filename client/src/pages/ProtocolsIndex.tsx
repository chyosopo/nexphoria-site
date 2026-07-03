/* ═══ PROTOCOLS INDEX — P5 · the seven flagship stacks ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_STACK } from "@/data/outcomeImagery";

const ALL_CATEGORIES = ["All", "Recovery", "Skin", "Growth", "Cognitive", "Longevity", "Metabolic", "Sleep"];
const matchCat = (c: string, filter: string) => filter === "All" || c.toLowerCase().includes(filter.toLowerCase());
/* Only surface a chip when it actually has protocols behind it — a 0-count
   filter is a dead end (visual-QA finding). "All" always shows. */
const CATEGORIES = ALL_CATEGORIES.filter(
  (c) => c === "All" || FLAGSHIP_STACKS.some((s) => matchCat(s.category, c)),
);

export default function ProtocolsIndex() {
  const [filter, setFilter] = useState("All");
  useSeo({
    title: "Protocols — Physician-Curated Peptide Stacks | Nexphoria",
    description: "Seven flagship peptide protocols, each with defined bloodwork, timeline, and physician oversight.",
    jsonLd: [webPageJsonLd({ name: "Protocols", description: "Flagship peptide stacks.", path: "/stacks" })],
  });

  const shown = FLAGSHIP_STACKS.filter((s) => matchCat(s.category, filter));

  return (
    <SiteLayout>
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.6rem,3vw,2.4rem)", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Protocols</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.8rem" }}>
            Seven protocols. <em style={{ color: "var(--nx-cobalt)" }}>Each one measured.</em>
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
            A protocol is a physician-curated combination — chosen to work together, gated by a defined bloodwork panel, run on a twelve-week timeline, and re-measured on a fixed retest. Not a cart of vials. A plan.
          </p>
        </div>
      </section>

      {/* why a protocol vs à la carte */}
      <section className="nx-container" style={{ padding: "0 0 clamp(1.2rem,2.5vw,2rem)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 12 }}>
          {[
            { h: "Chosen to combine", d: "Each peptide is picked for how it works with the others in the stack — synergy a physician plans, not a basket you assemble." },
            { h: "One panel, one timeline", d: "A single bloodwork tier gates the whole protocol, and every component runs on the same twelve-week arc — one baseline, one retest." },
            { h: "Priced as a plan", d: "Cadence pricing — one month, three months at 15% off, twelve months at 30% with the panel included — applies to the protocol as a whole." },
          ].map((b) => (
            <div key={b.h} className="nx-glass-tile" style={{ display: "block" }}>
              <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{b.h}</h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* filter */}
      <section className="nx-container" style={{ paddingBottom: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map((c) => {
            const n = c === "All" ? FLAGSHIP_STACKS.length : FLAGSHIP_STACKS.filter((s) => matchCat(s.category, c)).length;
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={active} data-testid={`protofilter-${c.toLowerCase()}`} style={{
                fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, padding: "8px 16px", borderRadius: "var(--nx-r-pill)", cursor: "pointer",
                background: active ? "var(--nx-cobalt)" : "transparent",
                color: active ? "var(--nx-ceramic)" : "var(--nx-fg-graphite)",
                border: `1px solid ${active ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
                transition: "background var(--nx-dur-2) var(--nx-ease), color var(--nx-dur-2) var(--nx-ease), border-color var(--nx-dur-2) var(--nx-ease)",
              }}>
                {c}<span style={{ opacity: 0.6, marginLeft: 6, fontWeight: 500 }}>{n}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>
          {shown.length} {shown.length === 1 ? "protocol" : "protocols"}{filter !== "All" ? ` · ${filter}` : ""}
        </p>
      </section>

      {/* grid */}
      <section className="nx-container" style={{ padding: "1rem 0 4rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
          {shown.map((s, i) => {
            const rec = s.cadences.find((c) => c.key === "3mo");
            return (
              <Reveal key={s.slug} delay={i * 50}>
                <Link href={`/stacks/${s.slug}`} data-testid={`protocol-${s.slug}`} className="nx-protocol-card" style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "var(--nx-r-lg)", overflow: "hidden", border: "1px solid var(--nx-border)", background: "var(--nx-ceramic)", boxShadow: "var(--nx-e-2)", textDecoration: "none" }}>
                  {OUTCOME_STACK[s.slug] && (
                    <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden" }}>
                      <img src={OUTCOME_STACK[s.slug]} alt="" aria-hidden loading="lazy" width={1632} height={2048} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {s.gated && (
                        <span style={{ position: "absolute", top: 12, right: 12, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-ceramic)", background: "color-mix(in srgb, var(--nx-fg) 62%, transparent)", backdropFilter: "blur(6px)", borderRadius: "var(--nx-r-pill)", padding: "4px 10px" }}>
                          <Lock size={11} /> Assessed
                        </span>
                      )}
                    </div>
                  )}
                  <div style={{ padding: "1.1rem 1.2rem 1.3rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{s.category}</p>
                    <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.3rem", lineHeight: 1.05 }}>{s.name}</h2>
                    <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-body)", color: "var(--nx-cobalt)", marginTop: "0.1rem" }}>{s.tagline}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.6rem", flex: 1 }}>{s.bestFor}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>
                        {s.gated ? "Physician-assessed" : rec ? `From ${usd(rec.perMonth ?? rec.total)}/mo` : ""}
                      </p>
                      <ArrowRight size={17} style={{ color: "var(--nx-cobalt)" }} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          {/* Build-your-own tile — fills the orphan grid slot and offers the custom path (visual-QA finding). Only when no filter narrows the set. */}
          {filter === "All" && (
            <Reveal delay={shown.length * 50}>
              <Link href="/stacks/build" data-testid="protocol-build" className="nx-protocol-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "var(--nx-r-lg)", overflow: "hidden", border: "1px dashed var(--nx-border)", background: "transparent", textDecoration: "none", padding: "1.4rem 1.3rem", minHeight: 220 }}>
                <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Custom</p>
                <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.3rem", lineHeight: 1.05 }}>Build your own</h2>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-body)", color: "var(--nx-cobalt)", marginTop: "0.1rem" }}>Start from a goal</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.6rem" }}>Assemble a stack around your goal and let a physician review it — same panel, same oversight as a flagship.</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>Physician-reviewed</p>
                  <ArrowRight size={17} style={{ color: "var(--nx-cobalt)" }} />
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* not sure which — route to the assessment */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(2.6rem,5vw,4rem) 0" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Not sure which fits?</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            The intake decides — <em style={{ color: "var(--nx-acid)" }}>not the catalog.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            You don’t have to pick correctly from a grid. Share your history and bloodwork; a physician matches you to the right protocol, or tells you none is appropriate.
          </p>
          <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: 15, background: "var(--nx-ceramic)", color: "var(--nx-bg-dark)", borderRadius: "var(--nx-r-pill)", padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }} data-testid="proto-assess-cta">
            Begin your intake
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
