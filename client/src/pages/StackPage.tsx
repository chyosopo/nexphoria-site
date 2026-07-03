/* ═══ FLAGSHIP STACK PAGE — P5 data · D12 layout ═══
   Hero: outcome frame beside the claim. Body: content rail + sticky
   buy-box (lg+); mobile gets an in-flow card + persistent price bar.
   Ignite (GLP-1) renders the physician wall in both rails. */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { getStack, PANELS, PanelTier } from "@/data/stacksCatalog";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_STACK } from "@/data/outcomeImagery";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { faqJsonLd } from "@/lib/seo";

function panelFor(tier: PanelTier) {
  return PANELS.find((p) => p.tier === tier);
}

export default function StackPage({ slug }: { slug: string }) {
  const stack = getStack(slug);
  const [selected, setSelected] = useState<string>("3mo");
  const faq = stack
    ? buildPdpFaq({ name: stack.name, panel: stack.panel, gated: stack.gated, gatedStates: stack.stateExclusions, hasPricing: !stack.gated, firstMark: stack.timeline[0] })
    : [];

  useSeo({
    title: stack ? `${stack.name} — ${stack.category} | Nexphoria` : "Stack — Nexphoria",
    description: stack ? `${stack.name}: ${stack.bestFor} Physician-prescribed, bloodwork-gated, retested.` : "",
    jsonLd: stack
      ? [
          webPageJsonLd({ name: stack.name, description: stack.tagline, path: `/stacks/${stack.slug}` }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Protocols", path: "/stacks" }, { name: stack.name, path: `/stacks/${stack.slug}` }]),
          faqJsonLd(faq),
          // Prescription protocol: name/brand/category enrichment only — no offers/price (pharma rich-result policy).
          productJsonLd({ name: stack.name, description: stack.bestFor, path: `/stacks/${stack.slug}`, category: stack.category }),
        ]
      : [],
  });

  if (!stack) {
    return (
      <SiteLayout>
        <section className="nx-container" style={{ padding: "5rem 0" }}>
          <p style={{ fontFamily: F, color: "var(--nx-fg-graphite)" }}>Protocol not found.</p>
          <Link href="/stacks" style={{ fontFamily: F, color: "var(--nx-cobalt)" }}>← All protocols</Link>
        </section>
      </SiteLayout>
    );
  }

  const panel = panelFor(stack.panel);
  const tiers: BuyTier[] | undefined = stack.gated
    ? undefined
    : stack.cadences.map((c) => ({
        key: c.key,
        label: c.label,
        sub: c.sublabel,
        badge: c.badge,
        amount: c.perMonth ?? c.total,
        per: c.key === "fixed" ? "/cycle" : "/mo",
        includesPanel: c.includesPanel,
      }));

  return (
    <SiteLayout>
      {/* ── HERO — the outcome frame beside the claim ── */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(2.4rem,5vw,3.6rem) 0 clamp(1.8rem,3vw,2.4rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <Link href="/stacks" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
                <ArrowLeft size={15} /> All protocols
              </Link>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginTop: "1.2rem" }}>
                {stack.category}
              </p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "-0.015em", color: "var(--nx-fg)", marginTop: "0.5rem" }}>
                {stack.name}
              </h1>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(19px,2.4vw,26px)", color: "var(--nx-cobalt)", marginTop: "0.4rem" }}>
                {stack.tagline}
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                {stack.bestFor}
              </p>
            </div>
            {OUTCOME_STACK[stack.slug] && (
              <div style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "4 / 5", maxHeight: "min(58vh, 560px)" }}>
                <img
                  src={OUTCOME_STACK[stack.slug]}
                  alt=""
                  aria-hidden
                  fetchPriority="high"
                  width={1632}
                  height={2048}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  data-testid={`stack-outcome-${stack.slug}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BODY — content rail + sticky buy-box ── */}
      <section className="nx-container" style={{ padding: "clamp(1.6rem,3vw,2.4rem) 0 clamp(2rem,4vw,3rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* — LEFT: the story — */}
          <div>
            {/* Protocol table */}
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>The protocol</p>
            <div style={{ borderTop: "1px solid var(--nx-border)", marginTop: "0.8rem" }}>
              {stack.peptides.map((p) => (
                <div key={p.name} className="grid md:grid-cols-[1fr_1.2fr_1fr] gap-1 md:gap-6 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{p.name}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", alignSelf: "center" }}>{p.dose}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", alignSelf: "center" }}>{p.spec}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "1.4rem" }}>
              {stack.synergy}
            </p>

            {/* Timeline */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              What the weeks look like
            </h2>
            <div className="grid grid-cols-2" style={{ gap: 12, marginTop: "1.2rem" }}>
              {stack.timeline.map((t, i) => (
                <Reveal key={t.wk} delay={i * 60}>
                  <div className="nx-glass-tile" style={{ height: "100%" }}>
                    <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)" }}>{t.wk}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{t.effect}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Required panel */}
            <div className="nx-glass-tile" style={{ display: "block", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Required bloodwork</p>
              <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,2.8vw,30px)", color: "var(--nx-fg)", marginTop: "0.4rem" }}>
                {stack.panel} panel
              </h3>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "58ch", marginTop: "0.5rem" }}>
                {stack.panelNote ?? panel?.summary}
              </p>
              <Link href="/bloodwork" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none", display: "inline-block", marginTop: "0.8rem" }}>
                See the full {stack.panel} panel →
              </Link>
            </div>

            {/* GLP-1 narrative — the why of the wall, in flow */}
            {stack.gated && (
              <div style={{ borderRadius: 20, padding: "clamp(1.6rem,3vw,2.2rem)", background: "var(--nx-cobalt-soft)", border: "1px solid var(--nx-border)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                  <Lock size={15} /> Physician-assessed only
                </div>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "24ch" }}>
                  GLP-1 therapy is prescribed after review — not bought from a shelf.
                </h3>
                <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.8rem" }}>
                  Metabolic therapy is dosed by a licensed physician against your bloodwork and titrated over time. Eligibility depends on your medical history and your state. Begin with a structured intake; if a protocol is appropriate, your physician will prescribe it.
                </p>
                {stack.stateExclusions && (
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1rem" }}>
                    Not currently available for shipping addresses in: {stack.stateExclusions.join(", ")}.
                  </p>
                )}
              </div>
            )}

            <PdpFaq items={faq} />
          </div>

          {/* — RIGHT: the commerce rail — */}
          <aside>
            <BuyBox
              name={stack.name}
              category={stack.category}
              tiers={tiers}
              selected={selected}
              onSelect={setSelected}
              gated={stack.gated}
              gatedStates={stack.stateExclusions}
              ctaTestId={stack.gated ? "ignite-intake" : "stack-cta"}
            />
          </aside>
        </div>
      </section>

      {/* ── ONE NIGHT BAND — contraindications, stated plainly ── */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(2.6rem,5vw,4rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Before you begin</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.8rem", lineHeight: 1.12 }}>
            This protocol is not for everyone.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1.4rem", maxWidth: 720 }}>
            {stack.contraindications.map((c) => (
              <div key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={17} strokeWidth={2.4} style={{ color: "var(--nx-acid)", marginTop: 3, flexShrink: 0 }} />
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-acid)", opacity: 0.9 }}>{c}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.4rem" }}><Disclaimer variant="night" /></div>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className="nx-container" style={{ padding: "3rem 0 4.5rem", textAlign: "center" }}>
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
