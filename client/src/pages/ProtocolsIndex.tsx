/* ═══ PROTOCOLS INDEX — P5 · the seven flagship stacks ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_STACK } from "@/data/outcomeImagery";
import vialLineupHero from "@/assets/brand/vial-lineup-hero.webp";
import vialLineupMaster from "@/assets/brand/vial-lineup-master.webp";

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
    jsonLd: [
      webPageJsonLd({ name: "Protocols", description: "Flagship peptide stacks.", path: "/stacks" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Protocols", path: "/stacks" }]),
    ],
  });

  const shown = FLAGSHIP_STACKS.filter((s) => matchCat(s.category, filter));

  return (
    <SiteLayout>
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.8rem,3vw,2.6rem)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Protocols</p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem" }}>
                Seven protocols. <em style={{ color: "var(--nx-cobalt)" }}>Each one measured.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1rem" }}>
                A protocol is a physician-curated combination — chosen to work together, gated by a defined bloodwork panel, run on a twelve-week timeline, and re-measured on a fixed retest. Not a cart of vials. A plan.
              </p>
            </div>
            <div className="nx-hero-media nx-hero-frame" style={{ aspectRatio: "5 / 4" }}>
              <img src={vialLineupHero} alt="The Nexphoria protocol vial lineup" fetchPriority="high" width={1600} height={1280} />
              <div className="nx-gradient-overlay tint" aria-hidden />
            </div>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
          {shown.map((s, i) => {
            const rec = s.cadences.find((c) => c.key === "3mo");
            return (
              <Reveal key={s.slug} delay={i * 50}>
                <Link href={`/stacks/${s.slug}`} data-testid={`protocol-${s.slug}`} className="nx-product-card">
                  <div className="nx-product-card__media tall">
                    {OUTCOME_STACK[s.slug] && (
                      <img src={OUTCOME_STACK[s.slug]} alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                    )}
                    <div className="nx-gradient-overlay soft" aria-hidden />
                    <span style={{ position: "absolute", top: 14, left: 14, fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>{s.category}</span>
                    {s.gated && (
                      <span style={{ position: "absolute", top: 12, right: 12, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-ceramic)", background: "color-mix(in srgb, var(--nx-fg) 62%, transparent)", backdropFilter: "blur(6px)", borderRadius: "var(--nx-r-pill)", padding: "4px 10px" }}>
                        <Lock size={11} /> Assessed
                      </span>
                    )}
                    <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
                      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-ceramic)", lineHeight: 1.02 }}>{s.name}</h2>
                      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-body)", color: "var(--nx-ceramic)", opacity: 0.86, marginTop: "0.1rem" }}>{s.tagline}</p>
                    </div>
                  </div>
                  <div className="nx-product-card__body">
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", flex: 1 }}>{s.bestFor}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", paddingTop: "0.9rem", borderTop: "1px solid var(--nx-border)" }}>
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
          {/* Build-your-own tile — same tall product silhouette, vial imagery under an ink wash. */}
          {filter === "All" && (
            <Reveal delay={shown.length * 50}>
              <Link href="/stacks/build" data-testid="protocol-build" className="nx-product-card">
                <div className="nx-product-card__media tall">
                  <img src={vialLineupMaster} alt="" aria-hidden loading="lazy" width={1600} height={2000} />
                  <div className="nx-gradient-overlay tint" aria-hidden />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.4rem 1.4rem 1.5rem" }}>
                    <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-ceramic)", opacity: 0.82 }}>Custom</p>
                    <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-ceramic)", marginTop: "0.3rem", lineHeight: 1.02 }}>Build your own</h2>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-ceramic)", opacity: 0.9, marginTop: "0.55rem", maxWidth: "34ch" }}>Start from a goal and assemble a stack around it — a physician reviews it with the same panel and oversight as a flagship.</p>
                  </div>
                </div>
                <div className="nx-product-card__body">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>Physician-reviewed</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>Start building <ArrowRight size={16} /></span>
                  </div>
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
