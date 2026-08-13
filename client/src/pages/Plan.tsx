/* ═══ YOUR PLAN — Pricing and Bloodwork, merged ═══

   Chiya: "Maybe we can kill the pages that don't need, like the pricing and
   blood work. Maybe we can do it like hims.com action plan lab page."

   The two pages were 2,688 lines answering one question between them —
   "what do I get, and what does it cost" — and answering it in two places
   meant a visitor comparing us had to hold half the answer in their head
   while they navigated to the other half. Worse, the split let the two drift:
   Pricing described the panel, Bloodwork described the cadence.

   One page, in the order the question is actually asked:
     1. THE NUMBER      what a month costs, per molecule, from the catalog
     2. WHAT IS IN IT   everything the number covers, stated as completeness
     3. THE PANEL       the markers, grouped by system
     4. THE LOOP        draw, read, adjust, re-draw — the thing being sold

   Everything derives from the catalog and the panel data. There are no
   hardcoded figures on this page, which is the whole reason the old two-page
   split could disagree with itself. */
import { Link } from "wouter";
import { ArrowRight, Stethoscope, Microscope, FlaskConical, Snowflake, LayoutDashboard, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { BIOMARKER_PANEL, PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { accentFor } from "@/data/goalAccent";
import { VialHero } from "@/components/VialHero";

/* Everything a month covers. Stated as a list of what IS included — the house
   voice states assurance as completeness rather than denying extras. */
const INCLUDED = [
  { Icon: Stethoscope, t: "Physician review", d: "A U.S.-licensed physician reads your intake and writes the prescription." },
  { Icon: Microscope, t: `The ${PANEL_TOTAL_MARKERS}-marker panel`, d: "Drawn at a CLIA-certified lab near you, before your first dose." },
  { Icon: FlaskConical, t: "503A compounding", d: "Prepared by a state-licensed United States compounding pharmacy." },
  { Icon: Snowflake, t: "Cold-chain delivery", d: "Shipped temperature-controlled in unbranded packaging." },
  { Icon: LayoutDashboard, t: "Your marker dashboard", d: "Every result, tracked over time, with messaging to your care team." },
  { Icon: RefreshCw, t: "The 90-day retest", d: "The same markers re-drawn, and the dose set from what they say." },
];

export default function Plan() {
  useSeo({
    title: "Your plan — what it costs and what it covers | Nexphoria",
    description:
      `One number a month: physician review, the ${PANEL_TOTAL_MARKERS}-marker panel, 503A compounding, cold-chain delivery, and the 90-day retest.`,
    path: "/plan",
    jsonLd: [
      webPageJsonLd({ name: "Your plan", description: "What a Nexphoria protocol costs and everything the figure covers.", path: "/plan" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Your plan", path: "/plan" }]),
    ],
  });

  const priced = SOLO_CATALOG.filter((s) => s.pricing);

  return (
    <SiteLayout navVariant="showcase">
      {/* ── 1 · THE NUMBER ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          Your plan
        </p>
        <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.06, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "20ch", margin: "0.8rem auto 0" }}>
          One number a month. Everything within it.
        </h1>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "56ch", margin: "1rem auto 0" }}>
          The consultation, the {PANEL_TOTAL_MARKERS}-marker panel, the medication, the shipping and the
          90-day retest are all inside the figure. Your physician sets the dose; the price does not change with it.
        </p>
      </section>

      {/* ── 2 · PRICE PER MOLECULE — derived, one card each ── */}
      <section className="nx-container" aria-labelledby="plan-prices" style={{ paddingBottom: "var(--nx-sp-band)" }}>
        <h2 id="plan-prices" className="nx-eyebrow" style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          What each protocol costs
        </h2>
        <div className="nx-plan-prices">
          {SOLO_CATALOG.map((s) => {
            const a = accentFor(s.category);
            return (
              <Link key={s.slug} href={`/peptides/${s.slug}`} className="nx-planprice" style={{ background: a.tint, borderColor: a.edge }} data-testid={`plan-price-${s.slug}`}>
                <VialHero sku={s} width="86px" onTint />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: a.ink, opacity: 0.75 }}>
                    {s.category}
                  </p>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: a.ink, lineHeight: 1.15 }}>{s.name}</p>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: a.ink, marginTop: "0.4rem", lineHeight: 1 }}>
                    {s.pricing ? `${usd(s.pricing.m12)}/mo` : "At consultation"}
                  </p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", color: "var(--nx-fg-muted)", marginTop: "0.3rem" }}>
                    {s.pricing ? "12-month cadence · panel included" : "set with your physician"}
                  </p>
                </div>
                <ArrowRight size={16} aria-hidden style={{ color: a.ink, marginLeft: "auto", flexShrink: 0 }} />
              </Link>
            );
          })}
        </div>
        {priced.length > 0 && (
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", textAlign: "center", marginTop: "1rem" }}>
            Shorter cadences are available on every protocol page. Longer terms carry the lower monthly figure.
          </p>
        )}
      </section>

      {/* ── 3 · WHAT THE FIGURE COVERS ── */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)", padding: "var(--nx-sp-band) 0" }} aria-labelledby="plan-included">
        <div className="nx-container">
          <h2 id="plan-included" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, textAlign: "center", maxWidth: "24ch", margin: "0 auto" }}>
            Six things, one figure.
          </h2>
          <div className="nx-plan-incl">
            {INCLUDED.map((x, i) => (
              <Reveal key={x.t} delay={i * 55}>
                <div className="nx-plan-incl__item">
                  <span className="nx-icon-circle" aria-hidden><x.Icon size={19} strokeWidth={1.9} /></span>
                  <div>
                    <h3 style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-fg)" }}>{x.t}</h3>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.25rem" }}>{x.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · THE PANEL — the lab half of the old two pages ── */}
      <section className="nx-container" aria-labelledby="plan-panel" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
        <div style={{ textAlign: "center", maxWidth: "48ch", margin: "0 auto" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            The panel
          </p>
          <h2 id="plan-panel" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginTop: "0.6rem" }}>
            {PANEL_TOTAL_MARKERS} markers, read by your physician.
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "0.9rem" }}>
            Drawn before your first dose and again at 90 days. The same markers both times, so the
            comparison means something.
          </p>
        </div>

        <div className="nx-plan-panel">
          {BIOMARKER_PANEL.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 45}>
              <div className="nx-plan-panel__cat">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{cat.name}</h3>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 700, color: "var(--nx-cobalt)", background: "var(--nx-cobalt-soft)", borderRadius: "var(--nx-r-pill)", padding: "3px 9px" }}>
                    {cat.count}
                  </span>
                </div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{cat.blurb}</p>
                <ul className="nx-plan-panel__markers">
                  {cat.markers.slice(0, 6).map((m) => <li key={m.name}>{m.name}</li>)}
                  {cat.markers.length > 6 && <li className="more">+{cat.markers.length - 6} more</li>}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5 · THE LOOP + the one action ── */}
      <section className="nx-gradient-hero-dark" style={{ padding: "var(--nx-sp-sec) 0", overflow: "hidden" }} aria-labelledby="plan-close">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <h2 id="plan-close" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "24ch", margin: "0 auto", lineHeight: 1.1 }}>
            Draw, read, adjust, draw again.
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-acid)", maxWidth: "54ch", margin: "1rem auto 0" }}>
            That loop is the product. The molecule is how the loop moves a number, and your
            physician decides which number to move next.
          </p>
          <Link href="/assessment" className="nx-cta-ceramic" data-testid="plan-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.8rem" }}>
            Start your assessment
          </Link>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 75%, transparent)", marginTop: "0.9rem" }}>
            2 minutes · reviewed by a U.S.-licensed physician
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
