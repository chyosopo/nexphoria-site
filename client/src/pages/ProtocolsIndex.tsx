/* ═══ PROTOCOLS INDEX — P5 · the seven flagship stacks ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";

const F = "'General Sans', system-ui, sans-serif";
const S = "'Fraunces', Georgia, serif";

const CATEGORIES = ["All", "Recovery", "Skin", "Growth", "Cognitive", "Longevity", "Metabolic", "Sleep"];
const matchCat = (c: string, filter: string) => filter === "All" || c.toLowerCase().includes(filter.toLowerCase());

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
          <p style={{ fontFamily: F, fontSize: 16.5, lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
            Every protocol is a physician-curated combination with a defined bloodwork panel, a twelve-week timeline, and a retest built in.
          </p>
        </div>
      </section>

      {/* filter */}
      <section className="nx-container" style={{ paddingBottom: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontFamily: F, fontSize: 13.5, fontWeight: 600, padding: "8px 16px", borderRadius: 999, cursor: "pointer",
              background: filter === c ? "var(--nx-cobalt)" : "transparent",
              color: filter === c ? "var(--nx-ceramic)" : "var(--nx-fg-graphite)",
              border: `1px solid ${filter === c ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
              transition: "all 0.2s ease",
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* grid */}
      <section className="nx-container" style={{ padding: "1rem 0 4rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
          {shown.map((s, i) => {
            const rec = s.cadences.find((c) => c.key === "3mo");
            return (
              <Reveal key={s.slug} delay={i * 50}>
                <Link href={`/stacks/${s.slug}`} className="nx-glass-tile" data-testid={`protocol-${s.slug}`} style={{ height: "100%", display: "block" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                    <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{s.category}</p>
                    {s.gated && <Lock size={14} style={{ color: "var(--nx-fg-muted)" }} />}
                  </div>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: 28, color: "var(--nx-fg)", marginTop: "0.4rem", lineHeight: 1.05 }}>{s.name}</h2>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: 16, color: "var(--nx-cobalt)", marginTop: "0.1rem" }}>{s.tagline}</p>
                  <p style={{ fontFamily: F, fontSize: 13.5, lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>{s.bestFor}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                    <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--nx-fg)" }}>
                      {s.gated ? "Physician-assessed" : rec ? `From ${usd(rec.perMonth ?? rec.total)}/mo` : ""}
                    </p>
                    <ArrowRight size={17} style={{ color: "var(--nx-cobalt)" }} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
