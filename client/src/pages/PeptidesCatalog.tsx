/* ═══ PEPTIDES CATALOG — P5 wave 2 · the 19-solo shelf ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { SOLO_CATALOG, SOLO_CATEGORIES } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";

export default function PeptidesCatalog({ world }: { world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  const [filter, setFilter] = useState<string>("All");
  useSeo({
    title: "Peptides — The Full Catalog | Nexphoria",
    description: "Nineteen physician-prescribed peptides, each with dosing, mechanism, timeline, and required bloodwork stated plainly.",
    jsonLd: [webPageJsonLd({ name: "Peptides", description: "Solo peptide catalog.", path: "/peptides" })],
  });

  const cats = ["All", ...SOLO_CATEGORIES];
  const shown = SOLO_CATALOG.filter((s) => filter === "All" || s.category === filter);

  return (
    <SiteLayout>
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.4rem,3vw,2.2rem)", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The catalog</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.8rem" }}>
            Nineteen peptides. <em style={{ color: "var(--nx-cobalt)" }}>Nothing hidden.</em>
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
            Every peptide lists its dose, its format, its mechanism, and the bloodwork it requires — before you ever begin.
          </p>
        </div>
      </section>

      <section className="nx-container" style={{ paddingBottom: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, padding: "8px 15px", borderRadius: "var(--nx-r-pill)", cursor: "pointer",
              background: filter === c ? "var(--nx-cobalt)" : "transparent",
              color: filter === c ? "var(--nx-ceramic)" : "var(--nx-fg-graphite)",
              border: `1px solid ${filter === c ? "var(--nx-cobalt)" : "var(--nx-border)"}`, transition: "all 0.2s ease",
            }}>{c}</button>
          ))}
        </div>
      </section>

      <section className="nx-container" style={{ padding: "1rem 0 4rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
          {shown.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link href={`${base}/peptides/${s.slug}`} className="nx-glass-tile" data-testid={`peptide-${s.slug}`} style={{ height: "100%", display: "block" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                  <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{s.category}</p>
                  {s.gated && <Lock size={13} style={{ color: "var(--nx-fg-muted)" }} />}
                </div>
                <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: 25, color: "var(--nx-fg)", marginTop: "0.35rem", lineHeight: 1.05 }}>{s.name}</h2>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>{s.dose}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.9rem" }}>
                  <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: "var(--nx-fg)" }}>
                    {s.gated ? "Physician-assessed" : s.pricing ? `From ${usd(s.pricing.m12)}/mo` : "Priced at consult"}
                  </p>
                  <ArrowRight size={16} style={{ color: "var(--nx-cobalt)" }} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
