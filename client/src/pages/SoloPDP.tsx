/* ═══ SOLO PDP — P5 data · D12 layout ═══
   Content rail + sticky buy-box (lg+); mobile in-flow card + persistent
   price bar. Three commerce states: tiers / GLP-1 wall / consult-priced.
   Unknown slugs show an in-world not-found state. */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getSolo } from "@/data/soloCatalog";
import { ArrowLeft, Check } from "lucide-react";
import { F, S } from "@/lib/typography";

export default function SoloPDP({ slug, world }: { slug: string; world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  const solo = getSolo(slug);
  const [tier, setTier] = useState<string>("m3");

  useSeo({
    title: solo ? `${solo.name} — ${solo.category} | Nexphoria` : "Peptide — Nexphoria",
    description: solo ? `${solo.name}: ${solo.dose}. Physician-prescribed, ${solo.panel}-panel gated, retested. Educational — not medical advice.` : "",
    jsonLd: solo
      ? [
          webPageJsonLd({ name: solo.name, description: solo.mechanism.slice(0, 120), path: `/peptides/${solo.slug}`, type: "MedicalWebPage" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }, { name: solo.name, path: `/peptides/${solo.slug}` }]),
        ]
      : [],
  });

  if (!solo) {
    return (
      <SiteLayout variant={world ?? "showcase"}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginBottom: 12 }}>Peptide not found</h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-muted)", marginBottom: 28 }}>
            That entry isn’t in the current formulary. Browse the full catalog or start an assessment.
          </p>
          <Link href={`${base}/peptides`} style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
            ← All peptides
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const tiers: BuyTier[] | undefined = solo.pricing
    ? [
        { key: "m1", label: "1-Month", sub: "Cancel anytime", amount: solo.pricing.m1, per: "/mo" },
        { key: "m3", label: "3-Month", sub: "Save 15%", badge: "Recommended", amount: solo.pricing.m3, per: "/mo" },
        { key: "m12", label: "12-Month", sub: "Save 30% · panel included", badge: "Best value", amount: solo.pricing.m12, per: "/mo" },
      ]
    : undefined;

  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(2.4rem,5vw,3.4rem) 0 clamp(1.6rem,3vw,2.2rem)", zIndex: 1 }}>
          <Link href={`${base}/peptides`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
            <ArrowLeft size={15} /> All peptides
          </Link>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginTop: "1.1rem" }}>{solo.category}</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.03, letterSpacing: "-0.015em", color: "var(--nx-fg)", marginTop: "0.4rem" }}>{solo.name}</h1>
          <div className="grid sm:grid-cols-2" style={{ gap: 8, maxWidth: 620, marginTop: "1rem" }}>
            <div><p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Dose</p><p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)" }}>{solo.dose}</p></div>
            <div><p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Format</p><p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)" }}>{solo.spec}</p></div>
          </div>
        </div>
      </section>

      {/* ── BODY — content rail + sticky buy-box ── */}
      <section className="nx-container" style={{ padding: "clamp(1.2rem,2.5vw,2rem) 0 clamp(2rem,4vw,3rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* — LEFT — */}
          <div>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Mechanism</p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.7, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "0.6rem" }}>{solo.mechanism}</p>

            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", marginTop: "clamp(1.8rem,3.5vw,2.4rem)" }}>What to expect</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "1rem" }}>
              {solo.timeline.map((t, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="nx-glass-tile" style={{ height: "100%" }}>
                    <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-cobalt)" }}>{t.wk}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{t.effect}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="nx-glass-tile" style={{ display: "block", marginTop: "clamp(1.8rem,3.5vw,2.4rem)" }}>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Required bloodwork</p>
              <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(20px,2.6vw,26px)", color: "var(--nx-fg)", marginTop: "0.3rem" }}>{solo.panel} panel</h3>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem", maxWidth: "56ch" }}>{solo.panelNote ?? "Reviewed by your physician before and during the protocol."}</p>
              <Link href="/blood-work" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none", display: "inline-block", marginTop: "0.7rem" }}>See the panels →</Link>
            </div>

            {solo.gated && (
              <div style={{ borderRadius: 20, padding: "clamp(1.4rem,3vw,2rem)", background: "var(--nx-cobalt-soft)", border: "1px solid var(--nx-border)", marginTop: "clamp(1.8rem,3.5vw,2.4rem)" }}>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", maxWidth: "26ch" }}>GLP-1 therapy is prescribed after review — not bought from a shelf.</h3>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.7rem" }}>Eligibility depends on your medical history and your state. Begin with a structured intake; if appropriate, your physician prescribes and titrates it against your bloodwork.</p>
              </div>
            )}
          </div>

          {/* — RIGHT — */}
          <aside>
            <BuyBox
              name={solo.name}
              category={solo.category}
              tiers={tiers}
              selected={tier}
              onSelect={setTier}
              gated={solo.gated}
              gatedStates={solo.stateExclusions}
              consultPriced={!solo.gated && !solo.pricing}
              ctaTestId="solo-cta"
            />
          </aside>
        </div>
      </section>

      {/* ── CONTRAINDICATION NIGHT BAND ── */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(2.4rem,5vw,3.6rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Before you begin</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.6vw,38px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.7rem", lineHeight: 1.12 }}>Not for everyone.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1.2rem", maxWidth: 720 }}>
            {solo.contraindications.map((c) => (
              <div key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={17} strokeWidth={2.4} style={{ color: "var(--nx-acid)", marginTop: 3, flexShrink: 0 }} />
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-acid)", opacity: 0.9 }}>{c}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.6, color: "var(--nx-acid)", opacity: 0.7, maxWidth: "60ch", marginTop: "1.2rem" }}>These peptides are not FDA-approved and are prescribed off-label where a physician determines it appropriate. This page is educational and is not medical advice.</p>
        </div>
      </section>

      <section className="nx-container" style={{ padding: "2.6rem 0 4.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.6vw,38px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "0 auto", lineHeight: 1.12 }}>The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em></h2>
        <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: "var(--nx-r-pill)", padding: "14px 28px", marginTop: "1.4rem", textDecoration: "none" }}>Begin your intake</Link>
      </section>
    </SiteLayout>
  );
}
