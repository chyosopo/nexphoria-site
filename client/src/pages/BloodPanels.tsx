/* ═══ BLOOD WORK OFFER — P5 · three panel tiers, stack mapping ═══ */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { PANELS, FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { Check } from "lucide-react";
import { F, S } from "@/lib/typography";

export default function BloodPanels() {
  useSeo({
    title: "Blood Work — Basic, Full, Elite Panels | Nexphoria",
    description: "Three physician-defined blood panels, from a baseline safety screen to advanced cardiometabolic depth. Every protocol is gated on the right one.",
    jsonLd: [webPageJsonLd({ name: "Blood Work", description: "Panel tiers.", path: "/blood-work", type: "MedicalWebPage" })],
  });

  return (
    <SiteLayout>
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.6rem,3vw,2.4rem)", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Blood work</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.8rem" }}>
            Nothing is prescribed <em style={{ color: "var(--nx-cobalt)" }}>before it's measured.</em>
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
            Every protocol is gated on the right panel — drawn at baseline, then retested on a fixed schedule so a physician can read the trend, not a snapshot.
          </p>
        </div>
      </section>

      {/* three tiers */}
      <section className="nx-container" style={{ padding: "1rem 0 2rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 14, alignItems: "stretch" }}>
          {PANELS.map((p, i) => (
            <Reveal key={p.tier} delay={i * 70}>
              <div className="nx-glass-tile" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{p.tier}</p>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: 34, color: "var(--nx-fg)", marginTop: "0.3rem", lineHeight: 1 }}>{usd(p.price)}</p>
                {p.freeWith && <p style={{ fontFamily: F, fontSize: 12.5, color: "var(--nx-cobalt)", fontWeight: 600, marginTop: 4 }}>{p.freeWith}</p>}
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>{p.summary}</p>
                <div style={{ marginTop: "1rem", flex: 1 }}>
                  {p.adds.map((a) => (
                    <div key={a} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                      <Check size={15} strokeWidth={2.4} style={{ color: "var(--nx-cobalt)", marginTop: 3, flexShrink: 0 }} />
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)" }}>{a}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: F, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "1rem", borderTop: "1px solid var(--nx-border)", paddingTop: "0.8rem" }}>
                  Retest: {p.retest}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* stack → panel mapping */}
      <section className="nx-container" style={{ padding: "2rem 0" }}>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)" }}>Which protocol needs which panel</h2>
        <div style={{ borderTop: "1px solid var(--nx-border)", marginTop: "1rem" }}>
          {FLAGSHIP_STACKS.map((s) => (
            <Link key={s.slug} href={`/stacks/${s.slug}`} className="grid grid-cols-[1fr_auto] gap-4 py-3.5" style={{ borderBottom: "1px solid var(--nx-border)", textDecoration: "none", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: 19, color: "var(--nx-fg)" }}>{s.name}</p>
                <p style={{ fontFamily: F, fontSize: 12.5, color: "var(--nx-fg-muted)" }}>{s.category}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>{s.panel}{s.panelNote && s.panelNote.includes("plus") ? " +" : ""} panel</p>
            </Link>
          ))}
        </div>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1.4rem", maxWidth: "60ch" }}>
          Draws are handled through an at-home collection partner. Your results populate one dashboard and are read by your physician before anything is prescribed or adjusted.
        </p>
      </section>

      <section className="nx-container" style={{ padding: "1rem 0 4.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,40px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "0 auto", lineHeight: 1.12 }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: "var(--nx-r-pill)", padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }}>
          Begin your intake
        </Link>
      </section>
    </SiteLayout>
  );
}
