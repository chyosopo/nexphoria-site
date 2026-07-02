import { useState } from "react";
import { Link } from "wouter";
import { useSeo, webPageJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { ArrowRight, FlaskConical, Layers, Stethoscope, Plus, Minus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { stacks, computeStackPrice } from "@/data/stacks";
import { pricing, formatUSD } from "@/data/pricing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getStackPortrait, getPortraitProof } from "@/lib/stackPortraits";
import { MxHeader } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";
import { VialArt, categoryToTone } from "@/components/VialTile";
import { getPeptide } from "@/data/peptides";

/* Stack catalog — pharmacy tier 2: doctor-curated combinations */

/* ── Curator badges — awarded to 3 stacks based on outcomes data ───────── */
const CURATOR_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  wolverine: { label: "Doctor's pick", color: "#0A0A0A", bg: "#c6f184" },
  metabolic: { label: "Most popular", color: "#fff", bg: "#0A0A0A" },
  cognitive: { label: "Staff favourite", color: "#0A0A0A", bg: "#f0ede6" },
};

/* ── Derived metadata per stack (difficulty + evidence tier + goal) ─────────
   Kept here so the comparison table and card overlays stay in sync with
   /data/stacks.ts. Goal/benefit lines are distilled from stack.purpose. */
type StackMeta = {
  goal: string;
  course: string;
  difficulty: "Entry" | "Standard" | "Advanced";
  evidence: "Established" | "Emerging" | "Investigational";
};

const STACK_META: Record<string, StackMeta> = {
  wolverine: { goal: "Soft-tissue & injury repair", course: "8 wk", difficulty: "Standard", evidence: "Emerging" },
  glow: { goal: "Skin, collagen & metabolic", course: "12 wk", difficulty: "Standard", evidence: "Established" },
  sleep: { goal: "Sleep depth & circadian", course: "6 wk", difficulty: "Entry", evidence: "Emerging" },
  cognitive: { goal: "Focus, mood & stress", course: "8 wk", difficulty: "Entry", evidence: "Emerging" },
  metabolic: { goal: "Weight loss + muscle hold", course: "16 wk", difficulty: "Advanced", evidence: "Established" },
  longevity: { goal: "Cellular & healthspan", course: "12 wk", difficulty: "Advanced", evidence: "Investigational" },
};

function metaFor(slug: string): StackMeta {
  return STACK_META[slug] ?? { goal: "Physician-formulated", course: "8 wk", difficulty: "Standard", evidence: "Emerging" };
}

const MONO = "'General Sans', system-ui, sans-serif";
const SERIF = "'General Sans', system-ui, sans-serif";
const SANS = "'Inter', sans-serif";

/* ── KPI strip figures (derived from data) ───────────────────────────────── */
const peptideCount = new Set(stacks.flatMap((s) => s.peptides)).size;
const categoryCount = 4; // recovery/skin · sleep/cognition · metabolic · longevity
const avgPeptides = Math.round(stacks.reduce((a, s) => a + s.peptides.length, 0) / stacks.length);

const KPIS = [
  { value: `${stacks.length}`, label: "Flagship stacks" },
  { value: `${peptideCount}`, label: "Peptides in catalog" },
  { value: `${categoryCount}`, label: "Outcome categories" },
  { value: `${avgPeptides}`, label: "Avg peptides / stack" },
];

/* ── Stack anatomy tiles ──────────────────────────────────────────────────── */
const ANATOMY = [
  { n: "01", icon: Layers, title: "Synergistic peptides", body: "2–3 compounds chosen to act on complementary pathways — local repair plus systemic signaling, not redundant overlap." },
  { n: "02", icon: ArrowRight, title: "Phased dosing", body: "A loading phase, a working phase, and a taper. Each peptide starts on the week its mechanism is most useful." },
  { n: "03", icon: FlaskConical, title: "Lab gating", body: "Baseline bloodwork before the first dose, then interval draws. The protocol advances only when markers clear." },
  { n: "04", icon: Stethoscope, title: "Physician adjustments", body: "Your medical director reads each panel and tunes dose, frequency, and duration to your body — not the average." },
];

/* ── FAQ tail ─────────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  { q: "Can I customize a stack?", a: "Yes. Every flagship stack is a starting point. You can swap a peptide, drop one you don't need, or add a compound your physician recommends after reviewing your labs. Open any stack and choose \"Customize\" to begin from its peptide list, or take the intake for a fully bespoke protocol." },
  { q: "Can I switch mid-stack?", a: "You can. If a peptide isn't agreeing with you or your goals shift, your physician can adjust the protocol at any reassessment — or sooner if needed. There are no long-term contracts; pause, change, or cancel through your member portal." },
  { q: "Do stacks require bloodwork?", a: "Yes. Every stack is gated on a baseline panel and tracks a defined set of markers throughout the course. Bloodwork is how your physician confirms the protocol is working and catches anything that needs adjustment before it becomes a problem." },
  { q: "How are stacks priced?", a: "Each stack is priced as a discounted bundle of its individual peptides — roughly 12% below the sum of the parts — billed monthly. The physician consult and quarterly reassessments are included. Lab draws are itemized separately or bundled in select tiers. 3- and 12-month cadences carry deeper savings." },
  { q: "What if a peptide doesn't agree with me?", a: "Tell your physician through the portal. Most side effects are dose-related and resolve with a titration change. If a specific compound is the issue, your physician can substitute or remove it and re-balance the rest of the stack. Unused medication can be returned to the pharmacy." },
];

export default function StackIndex() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: "Physician-curated peptide stacks — repair, sleep, metabolic, longevity",
    description: "Six physician-designed peptide stacks — Wolverine, Glow, Restore, Clarity, Prime, Balance. Each bundled and lab-gated. Prescribed, compounded in a U.S. 503A pharmacy, monitored every 90 days.",
    path: "/stacks",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Peptide Stacks",
        description: "Physician-curated multi-peptide stacks for recovery, skin, sleep, cognition, metabolic health, and longevity.",
        path: "/stacks",
      }),
      itemListJsonLd({
        name: "Nexphoria physician-curated stacks",
        description: "Six flagship stacks: Wolverine, Glow, Restore, Clarity, Prime, Balance.",
        items: stacks.map((s) => ({
          name: s.name,
          path: `/stacks/${s.slug}`,
          description: s.purpose,
        })),
      }),
      faqJsonLd(FAQ_ITEMS),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Stacks", path: "/stacks" },
      ]),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      <div style={{ background: "var(--mx-page-bg)", minHeight: "100vh", paddingTop: 80 }}>
        {/* ── Maximus hero ── */}
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Doctor-curated stacks</PillBadge>}
            headline={<><span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Pre-built protocols,</span><br /><span>physician-formulated</span>.</>}
            subtitle="Six flagship stacks designed by our medical directors — each tested against published clinical literature and our internal outcomes data. Add full stacks to cart or customize before checkout."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <StackHeroTile
              href="/stacks/wolverine"
              slug="wolverine"
              name="Wolverine"
              proof={getPortraitProof("wolverine")}
            />
            <StackHeroTile
              href="/stacks/glow"
              slug="glow"
              name="Glow"
              proof={getPortraitProof("glow")}
            />
          </div>

          {/* KPI strip — Maximus style */}
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ marginTop: 24, gap: 12 }}
            data-testid="kpi-strip"
          >
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="px-5 py-5 md:py-6"
                style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(14,14,15,0.08)" }}
                data-testid={`kpi-${k.label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
              >
                <div className="text-3xl md:text-4xl leading-none mb-1.5" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
                  {k.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stack Anatomy explainer band ── */}
        <section className="nx-container pt-14 md:pt-20 pb-2" data-testid="section-stack-anatomy">
          <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
            Stack anatomy
          </div>
          <h2 className="text-2xl md:text-3xl mb-8 max-w-3xl leading-[1.12]" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
            What makes a <span style={{  }}>stack</span> different from a pile of peptides.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
            {ANATOMY.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.n} className="p-6 md:p-7 relative" style={{ background: "var(--nx-bg)" }} data-testid={`anatomy-tile-${i}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: MONO, color: "#8B5A2B" }}>{a.n}</span>
                    <Icon size={18} strokeWidth={1.6} style={{ color: "#0A0A0A" }} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>{a.title}</h3>
                  <p className="text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.55 }}>{a.body}</p>
                  {i < ANATOMY.length - 1 && (
                    <ArrowRight size={14} strokeWidth={2} className="hidden lg:block absolute" style={{ color: "#8B5A2B", right: -7, top: "50%" }} aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="nx-container pt-14 md:pt-20 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {stacks.map((stack) => {
              const { sum, bundle, savings } = computeStackPrice(stack, pricing);
              const meta = metaFor(stack.slug);
              // Subtle tint by stack identity so each card has its own quiet color
              const STACK_TINT: Record<string, string> = {
                wolverine: "#E8EFEC",  // cobalt-soft (recovery/men)
                glow: "#F7ECE6",       // rose (skin/her)
                longevity: "#F0F2E6",  // sage
                "weight-loss": "#EEF1F4", // mineral
                sleep: "#EAE6F1",      // dusk
                vitality: "#F2EDDE",   // butter
                cognition: "#E8EEF1",  // sky
              };
              const cardTint = STACK_TINT[stack.slug] ?? "#fff";
              return (
                <Link asChild key={stack.slug} href={`/stacks/${stack.slug}`}>
                  <a
                    className="block group transition-all hover:shadow-lg"
                    style={{ background: cardTint, border: "1px solid var(--nx-border)", textDecoration: "none" }}
                    data-testid={`card-stack-${stack.slug}`}
                  >
                    {/* Benefit-encoded portrait + overlay panel */}
                    <div className="aspect-[4/5] w-full overflow-hidden relative" style={{ background: "var(--nx-bg-cream)" }}>
                      <img
                        src={getStackPortrait(stack.slug)}
                        alt={`${stack.name} stack — ${getPortraitProof(stack.slug)}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.12) 42%, transparent 68%)" }} aria-hidden />
                      {/* Curator / flagship badge */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        {CURATOR_BADGE[stack.slug] && (
                          <span
                            className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em]"
                            style={{ background: CURATOR_BADGE[stack.slug].bg, color: CURATOR_BADGE[stack.slug].color, fontFamily: MONO }}
                          >
                            {CURATOR_BADGE[stack.slug].label}
                          </span>
                        )}
                        {stack.badge && (
                          <span className="px-2 py-1 text-[9px] uppercase tracking-[0.2em]" style={{ background: "#0A0A0A", color: "#FAF7F0", fontFamily: MONO }}>
                            {stack.badge}
                          </span>
                        )}
                      </div>
                      {/* Benefit-proof + includes overlay panel */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3">
                        <div className="text-[13px] mb-2 max-w-[92%]" style={{ fontFamily: SANS, color: "#FFFFF3", fontWeight: 500, lineHeight: 1.35 }} data-testid={`proof-${stack.slug}`}>
                          {getPortraitProof(stack.slug)}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "rgba(255,255,243,0.72)" }}>
                          {stack.peptides.length} peptides · {meta.course} protocol · From {formatUSD(bundle)}/mo
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-7">
                      <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
                        {stack.peptides.length} peptides · {stack.gender === "him" ? "For Him" : stack.gender === "her" ? "For Her" : "Unisex"}
                      </div>
                      <h2 className="text-3xl mb-1.5" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
                        {stack.name}
                      </h2>
                      <p className="text-base mb-3" style={{ fontFamily: SERIF, color: "#4A4A4A",  }}>
                        {stack.tagline}
                      </p>
                      <p className="text-sm mb-4" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.6 }}>
                        {stack.purpose}
                      </p>

                      {/* BEST FOR mono line */}
                      <div className="text-[10px] uppercase tracking-[0.14em] mb-4 pb-4" style={{ fontFamily: MONO, color: "#0A0A0A", borderBottom: "1px solid var(--nx-border)" }}>
                        <span style={{ color: "#8B5A2B" }}>Best for:</span> {meta.goal}
                      </div>

                      {/* Peptide vial cluster */}
                      <div className="flex items-end gap-3 mb-5" style={{ minHeight: 96 }} data-testid={`vial-cluster-${stack.slug}`}>
                        {stack.peptides.slice(0, 4).map((slug, idx) => {
                          const pep = getPeptide(slug);
                          if (!pep) return null;
                          return (
                            <div
                              key={slug}
                              style={{
                                transform: `translateY(${idx % 2 === 0 ? -2 : 2}px) rotate(${(idx - 1) * 3}deg)`,
                                transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                              }}
                              className="group-hover:translate-y-0"
                            >
                              <VialArt tone={categoryToTone(pep.category)} glyph={pep.glyph} size={80} />
                              <div
                                className="text-center mt-1"
                                style={{
                                  fontFamily: MONO,
                                  fontSize: 9,
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  color: "#4A4A4A",
                                }}
                              >
                                {pep.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price + actions */}
                      <div className="flex items-end justify-between pt-5" style={{ borderTop: "1px solid var(--nx-border)" }}>
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
                            Monthly · stack price
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>{formatUSD(bundle)}</span>
                            <span className="text-sm line-through" style={{ fontFamily: MONO, color: "#9A9A95" }}>{formatUSD(sum)}</span>
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.12em] mt-0.5" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
                            Save {formatUSD(savings)}
                          </div>
                        </div>
                        <div onClick={(e) => e.preventDefault()}>
                          <AddToCartButton slug={stack.slug} type="stack" variant="compact" label="Add stack" />
                        </div>
                      </div>

                      {/* View stack CTA */}
                      <div
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] group-hover:gap-2.5 transition-all"
                        style={{ fontFamily: MONO, color: "#0A0A0A" }}
                      >
                        View stack <ArrowRight size={12} strokeWidth={2.4} />
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}

            {/* Build Your Own tile — always last in grid */}
            <Link asChild href="/stacks/build">
              <a
                className="block group transition-all hover:shadow-lg"
                style={{ background: "#0A0A0A", border: "1px solid #0A0A0A", textDecoration: "none" }}
                data-testid="card-build-your-own"
              >
                <div className="aspect-[16/10] w-full relative flex items-center justify-center" style={{ background: "#0A0A0A" }}>
                  {/* Acid grid decoration */}
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden style={{ opacity: 0.2 }}>
                    <circle cx="60" cy="60" r="50" stroke="#c6f184" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="60" cy="60" r="30" stroke="#c6f184" strokeWidth="1" />
                    <line x1="60" y1="10" x2="60" y2="110" stroke="#c6f184" strokeWidth="0.75" />
                    <line x1="10" y1="60" x2="110" y2="60" stroke="#c6f184" strokeWidth="0.75" />
                  </svg>
                  <div className="absolute" style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: "rgba(198,241,132,0.8)", textTransform: "uppercase", marginBottom: 10 }}>Custom protocol</div>
                    <div className="inline-flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 999, border: "1.5px solid #c6f184" }}>
                      <Plus size={22} style={{ color: "#c6f184" }} />
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: "rgba(198,241,132,0.75)", textTransform: "uppercase", marginBottom: 8 }}>
                    Build your own stack
                  </div>
                  <h2 className="text-2xl mb-2" style={{ fontFamily: SERIF, color: "#fff", fontWeight: 500 }}>
                    None of the above?
                  </h2>
                  <p className="text-sm mb-5" style={{ fontFamily: SANS, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Pick 2–5 peptides, choose your cadence, and build a custom stack in three steps. Every custom protocol still goes through physician review before it ships.
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full group-hover:gap-3 transition-all"
                    style={{ background: "#c6f184", color: "#0A0A0A", fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}
                  >
                    Start building <ArrowRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* ── Stack comparison table ── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }}
          data-testid="section-stack-comparison"
        >
          <div className="nx-container">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
              Compare all six
            </div>
            <h2 className="text-2xl md:text-3xl mb-8 max-w-3xl leading-[1.12]" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
              Every stack, <span style={{  }}>side by side</span>.
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-0" data-testid="table-stack-comparison" style={{ background: "var(--nx-bg)", border: "1px solid var(--nx-border)" }}>
                <thead>
                  <tr>
                    {["Stack", "Goal", "Peptides", "Course", "Price", "Difficulty", "Evidence tier"].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stacks.map((s) => {
                    const { bundle } = computeStackPrice(s, pricing);
                    const m = metaFor(s.slug);
                    return (
                      <tr key={s.slug} data-testid={`comparison-row-${s.slug}`}>
                        <td className="px-4 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                          <Link asChild href={`/stacks/${s.slug}`}>
                            <a className="text-base" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500, textDecoration: "none" }}>{s.name}</a>
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", borderBottom: "1px solid var(--nx-border)" }}>{m.goal}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: MONO, color: "#0A0A0A", borderBottom: "1px solid var(--nx-border)" }}>{s.peptides.length}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: MONO, color: "#0A0A0A", borderBottom: "1px solid var(--nx-border)" }}>{m.course}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500, borderBottom: "1px solid var(--nx-border)" }}>{formatUSD(bundle)}<span className="text-[10px]" style={{ fontFamily: MONO, color: "#6B6B6B" }}> /mo</span></td>
                        <td className="px-4 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                          <Pill text={m.difficulty} />
                        </td>
                        <td className="px-4 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                          <Pill text={m.evidence} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-xs max-w-2xl" style={{ fontFamily: SANS, color: "#8A8A8A", lineHeight: 1.6 }}>
              Difficulty reflects titration complexity and monitoring intensity; evidence tier reflects the depth of
              published human data for the stack's core compounds. Your physician confirms suitability at intake.
            </p>
          </div>
        </section>

        {/* ── Why stacked protocols work better — editorial band ── */}
        <section className="nx-container py-16 md:py-24" data-testid="section-why-stacked">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
                Why stacked protocols work better
              </div>
              <h2 className="text-2xl md:text-4xl mb-6 leading-[1.1]" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
                One peptide moves a pathway. A stack moves a <span style={{  }}>system</span>.
              </h2>
              <div className="space-y-4 text-base" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.7 }}>
                <p>
                  Most physiology is not governed by a single switch. Tissue repair needs local signaling <span>and</span> systemic
                  cell migration <span>and</span> collagen synthesis. Sleep needs faster onset <span>and</span> deeper slow-wave architecture
                  <span> and</span> a steadier circadian clock. A lone peptide can nudge one of those levers — rarely all three.
                </p>
                <p>
                  Stacks pair compounds whose mechanisms are complementary rather than redundant. BPC-157 acts where the
                  injury is; TB-500 travels to coordinate the repair crew; GHK-Cu rebuilds the matrix. Together they produce
                  a faster, more complete response than any one at a higher dose — and at a lower dose of each, which improves
                  tolerability.
                </p>
                <p>
                  Just as important: a stack is sequenced and lab-gated. Each peptide starts on the week its mechanism is most
                  useful, and the protocol advances only when your bloodwork clears. That is the difference between buying three
                  vials and running a protocol.
                </p>
              </div>
            </div>

            {/* vs single peptide mini-chart */}
            <div className="lg:pt-12" data-testid="chart-vs-single">
              <VsSingleChart />
            </div>
          </div>
        </section>

        {/* ── FAQ tail ── */}
        <section className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }} data-testid="section-stack-faq">
          <div className="nx-container" style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
              Stack questions
            </div>
            <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: SERIF, color: "#0A0A0A", fontWeight: 500 }}>
              Before you add to cart.
            </h2>
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--nx-border)" }}>
                  <button
                    className="w-full flex items-start justify-between gap-4 text-left py-5"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    data-testid={`stack-faq-item-${i}`}
                  >
                    <span className="text-base" style={{ fontFamily: SANS, fontWeight: 500, color: "#0A0A0A", lineHeight: 1.4 }}>{item.q}</span>
                    {openFaq === i ? <Minus size={16} style={{ color: "#8B5A2B", flexShrink: 0, marginTop: 3 }} /> : <Plus size={16} style={{ color: "#4A4A4A", flexShrink: 0, marginTop: 3 }} />}
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.7, maxWidth: 640 }} data-testid={`stack-faq-answer-${i}`}>
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer CTA — assessment ── */}
        <section className="nx-container py-16 md:py-20">
          <div className="p-8 md:p-12 max-w-4xl mx-auto" style={{ background: "#0A0A0A" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "rgba(198,241,132,0.8)" }}>
                  Not sure which stack?
                </div>
                <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: SERIF, color: "#fff", fontWeight: 500 }}>
                  Take the 5-minute assessment.
                </h2>
                <p className="text-base max-w-lg" style={{ fontFamily: SANS, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Our physicians design a protocol around your bloodwork, goals, and medical history — not a template.
                </p>
              </div>
              <Link asChild href="/assessment">
                <a
                  className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5"
                  style={{ background: "#c6f184", color: "#0A0A0A", fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}
                  data-testid="link-assessment-cta"
                >
                  Start assessment <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

/* Editorial portrait hero tile for the index (Wolverine / Glow) — the v11
   portrait proves the benefit; label + proof sit in a glass panel. */
function StackHeroTile({ href, slug, name, proof }: { href: string; slug: string; name: string; proof: string }) {
  return (
    <Link asChild href={href}>
      <a
        className="block group relative overflow-hidden"
        style={{ borderRadius: 20, aspectRatio: "4 / 5", background: "#141414", textDecoration: "none" }}
        data-testid={`hero-stack-${slug}`}
      >
        <img
          src={getStackPortrait(slug)}
          alt={`${name} stack — ${proof}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.15) 46%, transparent 72%)" }} aria-hidden />
        <div className="absolute left-6 right-6 bottom-6">
          <div className="text-[11px] uppercase tracking-[0.18em] mb-2" style={{ fontFamily: MONO, color: "#c6f184" }}>
            Flagship stack
          </div>
          <h3 className="mb-2" style={{ fontFamily: SERIF, color: "#FFFFF3", fontWeight: 600, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            The {name} stack
          </h3>
          <p className="text-sm mb-4 max-w-[34ch]" style={{ fontFamily: SANS, color: "rgba(255,255,243,0.85)", lineHeight: 1.4 }}>
            {proof}
          </p>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] px-4 py-2 group-hover:gap-3 transition-all" style={{ fontFamily: MONO, color: "#0A0A0A", background: "#c6f184", borderRadius: 999, fontWeight: 600 }}>
            Explore stack <ArrowRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </a>
    </Link>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: "#0A0A0A", background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)" }}>
      {text}
    </span>
  );
}

/* Mini bar chart: outcome completeness — single peptide vs full stack across
   three levers. Pure SVG, no deps. */
function VsSingleChart() {
  const levers = [
    { name: "Mechanism reach", single: 38, stack: 92 },
    { name: "Symptom coverage", single: 44, stack: 88 },
    { name: "Time to result", single: 50, stack: 82 },
    { name: "Tolerability", single: 60, stack: 86 },
  ];
  const W = 460, rowH = 64, padL = 0, top = 56, barH = 12, gap = 8, maxW = 320;
  const H = top + levers.length * rowH + 8;
  return (
    <div style={{ background: "#fff", border: "1px solid var(--nx-border)", padding: "1.5rem" }}>
      <div className="flex items-center gap-5 mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
          <span style={{ width: 14, height: 6, background: "#C9CFC2", display: "inline-block" }} /> Single peptide
        </span>
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "#0A0A0A" }}>
          <span style={{ width: 14, height: 6, background: "#0A0A0A", display: "inline-block" }} /> Full stack
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Outcome completeness — single peptide versus full stack">
        <title>Single peptide vs full stack — relative outcome completeness</title>
        {levers.map((l, i) => {
          const y = top + i * rowH;
          return (
            <g key={l.name}>
              <text x={padL} y={y - 8} style={{ fontFamily: MONO, fontSize: 11, fill: "#0A0A0A" }}>{l.name}</text>
              <rect x={padL} y={y} width={(l.single / 100) * maxW} height={barH} fill="#C9CFC2" rx={1} />
              <text x={padL + (l.single / 100) * maxW + 6} y={y + barH - 1} style={{ fontFamily: MONO, fontSize: 9, fill: "#8A8A8A" }}>{l.single}</text>
              <rect x={padL} y={y + barH + gap} width={(l.stack / 100) * maxW} height={barH} fill="#0A0A0A" rx={1} />
              <text x={padL + (l.stack / 100) * maxW + 6} y={y + barH * 2 + gap - 1} style={{ fontFamily: MONO, fontSize: 9, fill: "#8B5A2B" }}>{l.stack}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-[11px]" style={{ fontFamily: SANS, color: "#8A8A8A", lineHeight: 1.5 }}>
        Illustrative — relative completeness of outcome across levers, not a clinical endpoint. Individual results vary
        and depend on your baseline labs.
      </p>
    </div>
  );
}
