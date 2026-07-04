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
import { ArrowLeft, Check, Lock, Pill, Stethoscope, Microscope, FlaskConical, Snowflake, LayoutDashboard, RefreshCw } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_STACK } from "@/data/outcomeImagery";
import { VialArt, Tone } from "@/components/VialTile";
import { glyphForPeptide } from "@/lib/protocols";

/* on-brand tone cycle so a multi-vial lineup reads varied, not uniform */
const VIAL_TONES: Tone[] = ["sage", "cobalt", "mineral", "sky", "butter", "rose", "dusk"];
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
        <section className="nx-container" style={{ padding: "clamp(4.5rem,7.5vw,6.5rem) 0" }}>
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

  const INCLUDED: { Icon: typeof Pill; t: string }[] = [
    { Icon: Stethoscope, t: "Physician review & prescription" },
    { Icon: Microscope, t: `${stack.panel} bloodwork panel` },
    { Icon: FlaskConical, t: "503A pharmacy compounding" },
    { Icon: Snowflake, t: "Cold-chain, unbranded delivery" },
    { Icon: LayoutDashboard, t: "Marker dashboard & messaging" },
    { Icon: RefreshCw, t: "90-day retest & dose review" },
  ];

  return (
    <SiteLayout>
      {/* ── HERO — the outcome frame beside the claim, over a gradient field ── */}
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }}>
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
              <div className="nx-hero-frame" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "4 / 5", maxHeight: "min(58vh, 560px)" }}>
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
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, transparent 55%, color-mix(in srgb, var(--nx-fg) 34%, transparent) 100%)" }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── VIAL LINEUP — the protocol, rendered as its vials ── */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }}>
        <div className="nx-container" style={{ paddingTop: "clamp(1.8rem,3.5vw,2.8rem)", paddingBottom: "clamp(1.8rem,3.5vw,2.8rem)" }}>
          <p className="nx-eyebrow" style={{ textAlign: "center" }}>The vials in this protocol</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", gap: "clamp(1.5rem,5vw,3.5rem)", marginTop: "1.4rem" }}>
            {stack.peptides.map((p, i) => {
              const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <Reveal key={p.name} delay={i * 70}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                    <VialArt tone={VIAL_TONES[i % VIAL_TONES.length]} glyph={glyphForPeptide(slug)} size={150} />
                    <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.1, textAlign: "center" }}>{p.name}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", textAlign: "center" }}>{p.spec}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BODY — content rail + sticky buy-box ── */}
      <section className="nx-container" style={{ padding: "clamp(1.6rem,3vw,2.4rem) 0 clamp(2rem,4vw,3rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* — LEFT: the story — */}
          <div>
            {/* Protocol — peptide chips (icon + name), then the details table */}
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>What is in the protocol</p>
            {/* compact floating spec tiles — name · dose · spec, pharmaceutical-precise */}
            <div className="nx-float-grid dense" style={{ marginTop: "0.9rem" }}>
              {stack.peptides.map((p, i) => (
                <Reveal key={p.name} delay={i * 40}>
                  <div className="nx-float-card" style={{ cursor: "default", height: "100%" }}>
                    <div className="nx-float-card__body">
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <span className="nx-icon-circle" aria-hidden style={{ width: 30, height: 30, flexShrink: 0 }}><Pill size={15} strokeWidth={2} /></span>
                        <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.1 }}>{p.name}</p>
                      </div>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: "0.7rem" }}>{p.dose}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-muted)", marginTop: "0.2rem" }}>{p.spec}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "1.4rem" }}>
              {stack.synergy}
            </p>

            {/* What every protocol includes */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              What is included, every month
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginTop: "1.2rem" }}>
              {INCLUDED.map((x, i) => (
                <Reveal key={x.t} delay={i * 45}>
                  <div className="nx-glass-tile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="nx-icon-circle" aria-hidden><x.Icon size={19} strokeWidth={1.9} /></span>
                    <p style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: "var(--nx-fg)", lineHeight: 1.3 }}>{x.t}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Timeline — drawn spine */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              What the weeks look like
            </h2>
            <div className="nx-timeline" style={{ marginTop: "1.4rem" }}>
              {stack.timeline.map((t, i) => (
                <Reveal key={t.wk} delay={i * 55}>
                  <div className="nx-timeline-step" style={{ paddingBottom: i < stack.timeline.length - 1 ? "1.1rem" : 0 }}>
                    <span className="nx-timeline-node" aria-hidden>{i + 1}</span>
                    <div className="nx-glass-tile" style={{ display: "block" }}>
                      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)" }}>{t.wk}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{t.effect}</p>
                    </div>
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
              <div style={{ borderRadius: "var(--nx-r-lg)", padding: "clamp(1.6rem,3vw,2.2rem)", background: "var(--nx-cobalt-soft)", border: "1px solid var(--nx-border)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
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
      <section className="nx-gradient-hero-dark" style={{ padding: "clamp(3rem,6vw,4.6rem) 0", overflow: "hidden" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Before you begin</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.6vw,52px)", color: "var(--nx-ceramic)", maxWidth: "20ch", marginTop: "0.8rem", lineHeight: 1.06, letterSpacing: "-0.015em" }}>
            This protocol is not for everyone.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1.4rem", maxWidth: 760 }}>
            {stack.contraindications.map((c) => (
              <div key={c} className="nx-stat-card on-dark" style={{ flexDirection: "row", alignItems: "flex-start", gap: 11 }}>
                <Check size={17} strokeWidth={2.4} style={{ color: "var(--nx-acid)", marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-acid)", opacity: 0.92 }}>{c}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.4rem" }}><Disclaimer variant="night" /></div>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className="nx-container" style={{ padding: "clamp(3.5rem,6vw,5.5rem) 0 clamp(4.5rem,7vw,6rem)", textAlign: "center" }}>
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
