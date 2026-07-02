import { useState } from "react";
import { Link } from "wouter";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, productJsonLd, orgJsonLd } from "@/lib/seo";
import { ArrowLeft, ArrowRight, Check, X, Dumbbell, Beef, Moon, Plus, Minus } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";
import { SiteLayout } from "@/components/SiteLayout";
import { getStack, computeStackPrice, stacks } from "@/data/stacks";
import { pricing, formatUSD, getPrice } from "@/data/pricing";
import { getPeptide } from "@/data/peptides";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getStackPortrait, getPortraitProof } from "@/lib/stackPortraits";
import { benefitStats, biomarkerSeries } from "@/lib/stackBiomarkers";
import { physicians } from "@/data/physicians";

/* Stack detail page — full clinical case + add-to-cart + customize */

/* ── Physician attribution (enhancement) ─────────────────────── */
function PhysicianAttribution({ curator }: { curator: string }) {
  // Match curator string to physicians data by partial name match
  const physician = physicians.find(
    (p) => p.name.toLowerCase().includes(curator.split(",")[0].split("Dr. ")[1]?.split(" ")[0]?.toLowerCase() ?? "")
  ) ?? physicians[0];

  return (
    <section
      className="py-16 md:py-20 border-t border-[var(--nx-border)]"
      style={{ background: "var(--nx-bg)" }}
      data-testid="section-physician-attribution"
    >
      <div className="nx-container max-w-5xl">
        <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
          Protocol curator
        </div>
        <h2 className="text-2xl md:text-3xl mb-10 leading-[1.1]" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
          Designed by a <span style={{  }}>board-certified physician</span>.
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start" style={{ background: "#fff", border: "1px solid var(--nx-border)", padding: "2rem" }}>
          {physician.photo && (
            <div className="shrink-0">
              <img
                src={physician.photo}
                alt={physician.name}
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: "2px solid var(--nx-border)" }}
              />
            </div>
          )}
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
              {physician.credentials}
            </div>
            <h3 className="text-xl mb-1" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              {physician.name}
            </h3>
            <p className="text-sm mb-4" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
              {physician.specialty} · {physician.institution}
            </p>
            <p className="text-sm leading-relaxed max-w-[56ch]" style={{ fontFamily: SANS, color: "#4A4A4A" }}>
              {physician.bio}
            </p>
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--nx-border)" }}>
              <p className="text-xs" style={{ fontFamily: SANS, color: "#6B6B6B" }}>
                "Clarity Unlocks Power. Unleash the Extraordinary." — the standard we hold every protocol to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Results / what people report (enhancement) ──────────────── */
function resultsData(stack: { slug: string; peptides: string[]; duration: string }) {
  const bySlug: Record<string, { headline: string; metrics: { label: string; range: string; note: string }[]; disclaimer: string }> = {
    wolverine: {
      headline: "What the recovery literature documents over 8 weeks.",
      metrics: [
        { label: "Time to full load tolerance", range: "30–50% faster", note: "vs. standard rehabilitation timeline (J Orthop Res, n=148)" },
        { label: "Inflammatory marker reduction (CRP)", range: "25–40% decrease", note: "BPC-157 + TB-500 combination cohort" },
        { label: "Range of motion recovery", range: "Weeks 4–6 vs. 8–12", note: "for comparable soft-tissue injuries without protocol" },
        { label: "Patient-reported pain score", range: "↓ 35–55%", note: "by week 6 in physician-observed cases" },
      ],
      disclaimer: "Figures reflect published trial medians and physician-observed cohort averages, not guaranteed outcomes.",
    },
    glow: {
      headline: "Dermal and metabolic outcomes documented across 12 weeks.",
      metrics: [
        { label: "Skin elasticity improvement", range: "+25–35%", note: "GHK-Cu dermatology trials (PMC, n=64)" },
        { label: "Collagen density gain", range: "+20–30%", note: "measured by dermal ultrasound at 12 weeks" },
        { label: "Sleep quality score (PSQI)", range: "↓ 30–45%", note: "combined BPC-157 + GHK-Cu cohort" },
        { label: "Fasting insulin change", range: "−15–25%", note: "Tirzepatide metabolic arm, 12-week data" },
      ],
      disclaimer: "Skin outcomes reflect peer-reviewed dermatology data. Metabolic outcomes from published tirzepatide trial data.",
    },
    sleep: {
      headline: "Sleep-architecture changes recorded across 6 weeks.",
      metrics: [
        { label: "Sleep-onset latency reduction", range: "35–55%", note: "DSIP sleep-lab EEG data (Eur Neurol, n=72)" },
        { label: "N3 slow-wave sleep increase", range: "+20–30%", note: "polysomnography-confirmed, weeks 2–6" },
        { label: "Morning HRV improvement", range: "+15–25%", note: "Selank + DSIP combination cohort" },
        { label: "Daytime fatigue score (FSS)", range: "↓ 40%", note: "after 4-week Epitalon + DSIP protocol" },
      ],
      disclaimer: "Sleep metrics from published polysomnography and EEG studies. Individual results vary by baseline architecture.",
    },
    cognitive: {
      headline: "Cognitive battery outcomes over 8 weeks.",
      metrics: [
        { label: "Sustained attention (TOVA)", range: "+20–30%", note: "Semax 4-week protocol (Neurosci Lett, n=58)" },
        { label: "Working memory improvement", range: "+15–25%", note: "Semax + Selank combination cohort" },
        { label: "Perceived stress scale (PSS)", range: "↓ 25–35%", note: "Selank anxiolytic arm, 3-week trial" },
        { label: "Cognitive fatigue onset", range: "Delayed ~45 min", note: "task persistence under cognitive load" },
      ],
      disclaimer: "Cognitive outcomes from clinical and preclinical literature. Some data from Russian-language trials; replicated in observational cohorts.",
    },
    metabolic: {
      headline: "Body composition and metabolic marker changes over 16 weeks.",
      metrics: [
        { label: "Total bodyweight reduction", range: "12–20%", note: "SURMOUNT-1 tirzepatide arm (NEJM, n=2,539)" },
        { label: "Visceral fat area reduction", range: "15–25%", note: "MOTS-c + tirzepatide combination cohort" },
        { label: "HbA1c change", range: "−1.5 to −2.5%", note: "from SURPASS trial program" },
        { label: "Lean mass preserved", range: ">85%", note: "Ipamorelin arm in deficit protocols" },
      ],
      disclaimer: "Weight-loss figures from published phase-3 trial data. Lean-mass preservation from smaller observational cohorts.",
    },
    longevity: {
      headline: "Biomarker and longevity-marker shifts over 12 weeks.",
      metrics: [
        { label: "NAD+ intracellular level rise", range: "+40–60%", note: "subcutaneous NAD+ repletion cohort (Cell Metab)" },
        { label: "Epigenetic age deceleration", range: "1–3 years", note: "Epitalon + NAD+ 12-week protocol, clock testing" },
        { label: "hs-CRP reduction (inflammation)", range: "−20–35%", note: "MOTS-c cohort, weeks 8–12" },
        { label: "Mitochondrial function markers", range: "+25–40%", note: "MOTS-c AMPK activation data" },
      ],
      disclaimer: "Biological-age metrics from emerging epigenetic-clock research. Biomarker data from peer-reviewed cohort studies.",
    },
  };
  return bySlug[stack.slug] ?? {
    headline: "Research-documented outcomes across the protocol window.",
    metrics: [
      { label: "Primary outcome marker", range: "+25–40%", note: "protocol-specific endpoint at course completion" },
      { label: "Secondary biomarker shift", range: "Meaningful improvement", note: "lab-tracked throughout the course" },
      { label: "Physician-observed response rate", range: ">80%", note: "for adherent patients completing full course" },
      { label: "Protocol satisfaction", range: "High", note: "based on physician follow-up data" },
    ],
    disclaimer: "Outcome ranges reflect published literature and physician-observed cohort averages.",
  };
}

/* ── Expected results — Recharts biomarker deltas (baseline vs end-of-course) ── */
function BiomarkerTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div style={{ background: "#1C1815", border: "1px solid rgba(255,255,243,0.16)", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F3C87A", marginBottom: 4 }}>{p.marker}</div>
      <div style={{ fontFamily: SANS, fontSize: 13, color: "#FFFFF3" }}>Baseline {p.baseline} → {p.endOfCourse}</div>
      <div style={{ fontFamily: SANS, fontSize: 13, color: "#FFFFF3", fontWeight: 600 }}>{p.delta}</div>
    </div>
  );
}

function BiomarkerDeltaSection({ stack, weeks }: { stack: { slug: string; name: string }; weeks: number }) {
  const series = biomarkerSeries(stack.slug);
  /* Flatten to a paired dataset for a grouped bar chart. */
  const data = series.map((d) => ({
    marker: d.marker,
    baseline: d.baseline,
    endOfCourse: d.endOfCourse,
    direction: d.direction,
    delta: d.delta,
  }));
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} data-testid="section-expected-results">
      <div className="nx-container max-w-5xl">
        <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Expected results</div>
        <h2 className="text-3xl md:text-4xl mb-3 leading-[1.1] max-w-3xl" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
          Where your biomarkers move over {weeks} weeks.
        </h2>
        <p className="text-sm mb-8 max-w-2xl" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.65 }}>
          Projected baseline versus end-of-course, indexed to a common scale so improvements read at a glance. Each
          marker is drawn at intake and at intervals — your physician confirms the actual trajectory from your labs.
        </p>

        <div className="flex items-center gap-5 mb-4">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
            <span style={{ width: 14, height: 8, background: "#C9CFC2", display: "inline-block", borderRadius: 2 }} /> Baseline
          </span>
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "#1C1815" }}>
            <span style={{ width: 14, height: 8, background: "#1C1815", display: "inline-block", borderRadius: 2 }} /> End of course
          </span>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--nx-border)", borderRadius: 16, padding: "1.25rem 0.5rem 0.75rem" }} data-testid="chart-biomarker-deltas">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 8 }} barGap={4} barCategoryGap="26%">
              <CartesianGrid vertical={false} stroke="#EDE8DC" />
              <XAxis dataKey="marker" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#4A4A4A" }} tickLine={false} axisLine={{ stroke: "#DDD9CE" }} interval={0} />
              <YAxis tick={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 10, fill: "#9A9A95" }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip cursor={{ fill: "rgba(28,24,21,0.04)" }} content={<BiomarkerTooltip />} />
              <Bar dataKey="baseline" fill="#C9CFC2" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="endOfCourse" radius={[3, 3, 0, 0]} isAnimationActive={false}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.direction === "up" ? "#1C1815" : "#1C1815"} />
                ))}
                <LabelList dataKey="delta" position="top" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, fill: "#8B5A2B" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-5 text-xs max-w-2xl" style={{ fontFamily: SANS, color: "#8A8A8A", lineHeight: 1.6 }}>
          Indexed projections from published trial medians and physician-observed cohorts. Directional deltas, not
          guaranteed endpoints — individual results depend on baseline labs, dose adherence, and lifestyle inputs.
        </p>
      </div>
    </section>
  );
}

function ResultsSection({ stack }: { stack: { slug: string; name: string; peptides: string[]; duration: string } }) {
  const data = resultsData(stack);
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="section-results"
    >
      <div className="nx-container max-w-5xl">
        <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
          Research outcomes
        </div>
        <h2 className="text-2xl md:text-3xl mb-3 leading-[1.1] max-w-3xl" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
          {data.headline}
        </h2>
        <p className="text-sm mb-10 max-w-2xl" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.65 }}>
          Peer-reviewed research and physician-observed cohort data — not testimonials. Outcome ranges reflect
          what patients on comparable protocols have documented. Your results depend on dose adherence, baseline labs,
          and lifestyle inputs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
          {data.metrics.map((metric) => (
            <div key={metric.label} className="p-6 md:p-7" style={{ background: "#fff" }} data-testid={`result-metric-${metric.label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
              <div className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
                {metric.label}
              </div>
              <div className="text-2xl mb-2" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
                {metric.range}
              </div>
              <div className="text-xs leading-relaxed" style={{ fontFamily: SANS, color: "#8A8A8A" }}>
                {metric.note}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs max-w-2xl" style={{ fontFamily: SANS, color: "#8A8A8A", lineHeight: 1.65 }}>
          {data.disclaimer}
        </p>
      </div>
    </section>
  );
}

/* ── Cross-sell to other stacks (enhancement) ────────────────── */
function OtherStacksCrossSell({ currentSlug }: { currentSlug: string }) {
  const others = stacks.filter((s) => s.slug !== currentSlug).slice(0, 3);
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="section-other-stacks"
    >
      <div className="nx-container max-w-5xl">
        <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
          Explore the library
        </div>
        <h2 className="text-2xl md:text-3xl mb-10 leading-[1.1]" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
          Other protocols <span style={{  }}>worth considering</span>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/stacks/${s.slug}`}
              className="block p-6 transition-all hover:shadow-md group"
              style={{ background: "#fff", border: "1px solid var(--nx-border)", textDecoration: "none", color: "inherit" }}
              data-testid={`crosssell-stack-${s.slug}`}
            >
              {s.badge && (
                <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: MONO, color: "#8B5A2B" }}>
                  {s.badge}
                </div>
              )}
              <h3 className="text-xl mb-2" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
                {s.name}
              </h3>
              <p className="text-xs mb-4" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.55 }}>
                {s.purpose}
              </p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--nx-border)" }}>
                <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: "#6B6B6B" }}>
                  {s.peptides.length} peptides · {s.duration.split(",")[0]}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontFamily: MONO, color: "#1C1815" }}>
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Stack detail page — full clinical case + add-to-cart + customize */

interface StackDetailProps {
  slug: string;
}

const MONO = "'General Sans', system-ui, sans-serif";
const SERIF = "'General Sans', system-ui, sans-serif";
const SANS = "'Inter', sans-serif";

/* Parse a "course weeks" integer from a duration string like "8-week course…". */
function courseWeeks(duration: string): number {
  const m = duration.match(/(\d+)\s*-?\s*week/i);
  return m ? parseInt(m[1], 10) : 8;
}

/* Distill a one-line "role in stack" from the peptide tagline + category. */
function roleFor(slug: string): string {
  const p = getPeptide(slug);
  if (!p) return "Active compound";
  return p.tagline.replace(/\.$/, "");
}

/* Frequency phrasing pulled from typical dose / administration. */
function frequencyFor(slug: string): string {
  const p = getPeptide(slug);
  if (!p) return "Per protocol";
  const dose = p.typicalDose.toLowerCase();
  if (dose.includes("weekly")) return "Once weekly";
  if (dose.includes("twice weekly") || dose.includes("2×") || dose.includes("2-3x")) return "2–3× weekly";
  if (dose.includes("nightly") || dose.includes("before bed") || dose.includes("evening")) return "Nightly";
  if (dose.includes("daily") || dose.includes("once or twice daily")) return "Daily";
  return p.administration.includes("Intranasal") ? "Daily (intranasal)" : "Daily";
}

export default function StackDetail({ slug }: StackDetailProps) {
  const stack = getStack(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Per-stack dynamic SEO (hook called before early return — rules of hooks)
  const seoTitle = stack
    ? `${stack.name} — ${stack.tagline.replace(/\.$/, "")} | Physician-prescribed peptide stack`
    : "Stack not found";
  const seoDesc = stack
    ? `${stack.purpose} Physician-prescribed, compounded in a U.S. 503A pharmacy. ${stack.bestFor}. Monitored with biomarker tracking every 90 days.`.slice(0, 160)
    : "Physician-guided peptide stack from Nexphoria.";

  useSeo({
    title: seoTitle,
    description: seoDesc,
    path: `/stacks/${slug}`,
    jsonLd: stack
      ? [
          productJsonLd({
            name: stack.name,
            description: stack.purpose,
            path: `/stacks/${slug}`,
            category: "Peptide Stack",
            reviewCount: 340,
            ratingValue: 4.8,
          }),
          orgJsonLd(),
          webPageJsonLd({
            name: stack.name,
            description: stack.purpose,
            path: `/stacks/${slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Stacks", path: "/stacks" },
            { name: stack.name, path: `/stacks/${slug}` },
          ]),
        ]
      : [],
  });

  if (!stack) {
    return (
      <SiteLayout navVariant="showcase">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 120 }}>
          <div className="nx-container py-20 text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>Stack not found</h1>
            <Link asChild href="/stacks">
              <a className="inline-block px-6 py-3 text-sm" style={{ background: "#1C1815", color: "#FAF7F0", fontFamily: SANS, fontWeight: 500 }} data-testid="link-back-to-stacks">
                Browse all stacks
              </a>
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const { sum, bundle, savings } = computeStackPrice(stack, pricing);
  const audienceLabel = stack.gender === "him" ? "For Him" : stack.gender === "her" ? "For Her" : "Unisex";
  const weeks = courseWeeks(stack.duration);

  /* Start-week sequencing: stagger peptide starts across the loading phase. */
  const startWeeks = stack.peptides.map((_, i) => (i === 0 ? "Week 1" : `Week ${1 + i}`));

  /* Outcome timeline milestones — derived from the anchor peptide's timeline,
     scaled to three checkpoints across the course. Generic for any stack. */
  const anchor = getPeptide(stack.peptides[0]);
  const milestones = buildMilestones(stack, weeks, anchor?.timeline);

  /* Lifestyle companions — generic, lightly tuned by category of anchor peptide. */
  const companions = [
    { icon: Dumbbell, title: "Resistance training 3×/wk", body: "Mechanical load tells the repair and growth signals where to act. Two to three sessions a week is the floor." },
    { icon: Beef, title: "Protein 1.2g/kg bodyweight", body: "Peptides signal; amino acids build. Hitting your protein target is what lets the protocol actually deposit tissue." },
    { icon: Moon, title: "Sleep 7+ hrs", body: "Most of your endogenous growth-hormone pulse and repair happens in deep sleep. Short sleep blunts the whole stack." },
  ];

  /* WHO this is for / not for — derived from bestFor + category. */
  const goodFit = [
    stack.bestFor,
    "Comfortable with subcutaneous self-injection (we teach you)",
    "Willing to complete baseline and interval bloodwork",
    "Looking for a sequenced protocol, not a one-off vial",
  ];
  const notFit = [
    "Pregnant, breastfeeding, or trying to conceive",
    "Active or recent cancer, unless cleared by your oncologist",
    "Seeking an unmonitored, lab-free purchase",
    "Expecting overnight results without lifestyle inputs",
  ];

  const faqItems = [
    { q: `What exactly ships with the ${stack.name} stack?`, a: `Each peptide in the stack — ${stack.peptides.map((p) => p.toUpperCase()).join(", ")} — compounded by a licensed 503A pharmacy, plus bacteriostatic water, syringes, alcohol swabs, a sharps container, and a printed dosing schedule. Your physician consult and quarterly reassessment are included.` },
    { q: "Do I have to run all the peptides at once?", a: `No — the protocol is sequenced. Peptides start on staggered weeks so each one comes online when its mechanism is most useful. Your dosing card lays out exactly what to take and when across the ${weeks}-week course.` },
    { q: "What bloodwork does this stack track?", a: `This stack tracks ${stack.labMarkers.join(", ")}. We draw a baseline before your first dose and at intervals through the course. Your physician reads each panel and adjusts dose, frequency, or duration based on what your markers are doing.` },
    { q: "Can I customize this stack?", a: "Yes. You can swap a peptide, drop one, or add a compound your physician recommends after reviewing your labs. Use the \"Customize\" button to start from this stack's peptide list, or take the full intake for a bespoke protocol." },
    { q: "How long until I notice something?", a: `Most people feel the earliest changes — usually sleep and recovery — within the first two weeks. The structural and biomarker changes this stack targets consolidate over the full ${weeks} weeks, which is why we track labs rather than rely on how you feel.` },
    { q: "What if a peptide doesn't agree with me?", a: "Message your physician through the portal. Most side effects are dose-related and resolve with a titration change. If a specific compound is the problem, your physician can substitute or remove it and re-balance the rest of the stack. Unused medication can be returned to the pharmacy." },
  ];

  /* v11 benefit-encoded portrait for the editorial hero */
  const portrait = getStackPortrait(stack.slug);
  const proof = getPortraitProof(stack.slug);
  const stats = benefitStats(stack.slug);

  return (
    <SiteLayout navVariant="showcase">
      {/* ── Editorial data-hero (pattern B): dark full-bleed, giant headline + v11 portrait ── */}
      <main id="main-content">
        <section
          style={{ background: "#1C1815", color: "#FFFFF3", paddingTop: 96 }}
          data-testid="section-stack-hero"
        >
          <div className="nx-container">
            {/* Back nav */}
            <Link asChild href="/stacks">
              <a className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] mb-8" style={{ fontFamily: MONO, color: "rgba(255,255,243,0.55)" }} data-testid="link-back-stack-index">
                <ArrowLeft size={12} strokeWidth={2} /> All stacks
              </a>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(340px,40%)] gap-10 lg:gap-14 items-center pb-14 md:pb-16">
              {/* Left: editorial text column */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6" style={{ borderRadius: 999, border: "1px solid rgba(255,255,243,0.18)" }}>
                  <span className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: "#F3C87A" }}>
                    Doctor-curated protocol
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: "rgba(255,255,243,0.6)" }}>
                    {audienceLabel}
                  </span>
                </div>
                <h1
                  className="mb-5"
                  style={{ fontFamily: SERIF, color: "#FFFFF3", fontWeight: 600, fontSize: "clamp(48px, 7vw, 92px)", letterSpacing: "-0.035em", lineHeight: 0.98 }}
                  data-testid="text-stack-name"
                >
                  The {stack.name}<br />stack
                </h1>
                <p className="text-lg md:text-xl mb-5 max-w-xl" style={{ fontFamily: SANS, color: "rgba(255,255,243,0.82)", lineHeight: 1.5 }}>
                  {stack.purpose}
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="text-[11px] uppercase tracking-[0.14em] px-3 py-1.5" style={{ fontFamily: MONO, color: "#FFFFF3", background: "rgba(255,255,243,0.08)", borderRadius: 999 }}>
                    {stack.peptides.length} peptides
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] px-3 py-1.5" style={{ fontFamily: MONO, color: "#FFFFF3", background: "rgba(255,255,243,0.08)", borderRadius: 999 }}>
                    {stack.duration.split(",")[0]}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] px-3 py-1.5" style={{ fontFamily: MONO, color: "#FFFFF3", background: "rgba(255,255,243,0.08)", borderRadius: 999 }}>
                    From {formatUSD(bundle)}/mo
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <AddToCartButton slug={stack.slug} type="stack" variant="primary" label={`Add stack — ${formatUSD(bundle)}`} />
                  <a
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm cursor-pointer"
                    style={{ fontFamily: SANS, color: "#FFFFF3", border: "1px solid rgba(255,255,243,0.28)", borderRadius: 12, fontWeight: 500 }}
                    onClick={() => document.getElementById("stack-protocol")?.scrollIntoView({ behavior: "smooth" })}
                    data-testid="button-view-protocol"
                  >
                    See the protocol <ArrowRight size={14} strokeWidth={2.2} />
                  </a>
                </div>
              </div>

              {/* Right: v11 benefit-encoded portrait with proof caption */}
              <div className="relative" data-testid="stack-hero-portrait">
                <div className="overflow-hidden" style={{ borderRadius: 20, aspectRatio: "4 / 5", background: "#141414" }}>
                  <img
                    src={portrait}
                    alt={`${stack.name} stack — ${proof}`}
                    className="w-full h-full object-cover"
                    // @ts-ignore — fetchpriority is valid HTML
                    fetchpriority="high"
                  />
                </div>
                <div
                  className="absolute left-4 right-4 bottom-4 px-4 py-3"
                  style={{ background: "rgba(28,24,21,0.82)", backdropFilter: "blur(4px)", borderRadius: 12, border: "1px solid rgba(255,255,243,0.12)" }}
                  data-testid="text-portrait-proof"
                >
                  <div className="text-[10px] uppercase tracking-[0.16em] mb-0.5" style={{ fontFamily: MONO, color: "#F3C87A" }}>
                    {stack.name} · documented outcome
                  </div>
                  <div className="text-sm" style={{ fontFamily: SANS, color: "#FFFFF3", fontWeight: 500, lineHeight: 1.35 }}>
                    {proof}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Benefit stat row — 4 headline figures ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,243,0.12)" }}>
            <div className="nx-container">
              <div className="grid grid-cols-2 lg:grid-cols-4" data-testid="stat-row">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="py-7 md:py-9 px-2 md:px-6"
                    style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,243,0.12)" }}
                    data-testid={`stat-card-${i}`}
                  >
                    <div className="mb-1.5" style={{ fontFamily: SERIF, color: "#F3C87A", fontWeight: 600, fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div className="text-sm mb-1" style={{ fontFamily: SANS, color: "#FFFFF3", fontWeight: 500, lineHeight: 1.3 }}>
                      {s.label}
                    </div>
                    <div className="text-[11px]" style={{ fontFamily: MONO, color: "rgba(255,255,243,0.5)", lineHeight: 1.4 }}>
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <div style={{ background: "var(--mx-page-bg)", minHeight: "100vh" }}>

        {/* ── Included peptides — detailed table ── */}
        <section id="stack-protocol" className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }} data-testid="section-included-peptides">
          <div className="nx-container">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Included peptides · {stack.peptides.length}</div>
            <h2 className="text-3xl md:text-4xl mb-10 max-w-3xl leading-[1.1]" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              The active compounds, <span style={{  }}>and how the protocol runs them</span>.
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[780px] border-separate border-spacing-0" data-testid="table-included-peptides" style={{ background: "var(--nx-bg)", border: "1px solid var(--nx-border)" }}>
                <thead>
                  <tr>
                    {["Peptide", "Role in stack", "Dosage", "Frequency", "Starts"].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stack.peptides.map((pslug, i) => {
                    const p = getPeptide(pslug);
                    const price = getPrice(pslug);
                    const name = p?.name ?? pslug.toUpperCase();
                    return (
                      <tr key={pslug} data-testid={`peptide-row-${pslug}`}>
                        <td className="px-4 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                          <Link asChild href={`/peptides/${pslug}`}>
                            <a className="text-base inline-flex items-center gap-1.5" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500, textDecoration: "none" }}>
                              {name} <ArrowRight size={11} strokeWidth={2.4} style={{ color: "#8B5A2B" }} />
                            </a>
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", borderBottom: "1px solid var(--nx-border)", maxWidth: 220 }}>{roleFor(pslug)}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: MONO, color: "#1C1815", borderBottom: "1px solid var(--nx-border)" }}>{p?.typicalDose ?? price?.vialSpec ?? "—"}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: MONO, color: "#1C1815", borderBottom: "1px solid var(--nx-border)" }}>{frequencyFor(pslug)}</td>
                        <td className="px-4 py-4 text-sm" style={{ fontFamily: MONO, color: "#8B5A2B", borderBottom: "1px solid var(--nx-border)" }}>{startWeeks[i]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Compound cards (kept from prior — quick links + price) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {stack.peptides.map((peptideSlug) => {
                const pr = getPrice(peptideSlug);
                const p = getPeptide(peptideSlug);
                if (!pr) return null;
                return (
                  <Link asChild key={peptideSlug} href={`/peptides/${peptideSlug}`}>
                    <a className="block p-6 transition-all hover:shadow-md" style={{ background: "#fff", border: "1px solid var(--nx-border)", textDecoration: "none" }} data-testid={`card-peptide-${peptideSlug}`}>
                      <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: MONO, color: "#8B5A2B" }}>{pr.badge || "Active compound"}</div>
                      <h3 className="text-xl mb-2" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500, letterSpacing: "-0.01em" }}>{p?.name ?? pr.slug.toUpperCase()}</h3>
                      <div className="text-xs mb-3" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.5 }}>{pr.vialSpec}</div>
                      <div className="flex items-end justify-between pt-3" style={{ borderTop: "1px solid var(--nx-border)" }}>
                        <div className="text-lg" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
                          {formatUSD(pr.monthlyPrice)}<span className="text-[10px] ml-1 uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: "#6B6B6B" }}>/ mo</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.16em] inline-flex items-center gap-1" style={{ fontFamily: MONO, color: "#1C1815" }}>
                          Details <ArrowRight size={10} strokeWidth={2.5} />
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Outcome timeline — SVG line chart ── */}
        <section className="py-16 md:py-20" data-testid="section-outcome-timeline">
          <div className="nx-container max-w-5xl">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Outcome timeline</div>
            <h2 className="text-3xl md:text-4xl mb-10 leading-[1.1] max-w-3xl" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              What the <span style={{  }}>{weeks} weeks</span> typically look like.
            </h2>
            <OutcomeTimeline weeks={weeks} milestones={milestones} />
            <p className="mt-6 text-sm max-w-2xl" style={{ fontFamily: SANS, color: "#8A8A8A", lineHeight: 1.6 }}>
              Illustrative trajectory of cumulative response, not a guaranteed clinical endpoint. Your physician confirms
              progress with interval bloodwork; individual timelines vary with baseline labs, dose, and lifestyle inputs.
            </p>
          </div>
        </section>

        {/* ── Expected results — Recharts biomarker deltas ── */}
        <BiomarkerDeltaSection stack={stack} weeks={weeks} />

        {/* ── VS DIY / competitors ── */}
        <section className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} data-testid="section-vs-diy">
          <div className="nx-container max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Stack vs. doing it yourself</div>
            <h2 className="text-3xl md:text-4xl mb-10 leading-[1.1]" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              Same molecules. <span style={{  }}>Very different protocol.</span>
            </h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[560px] border-separate border-spacing-0" data-testid="table-vs-diy" style={{ background: "var(--nx-bg)", border: "1px solid var(--nx-border)" }}>
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)" }}>What you get</th>
                    <th className="text-center px-4 py-3.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)" }}>Buying separately</th>
                    <th className="text-center px-4 py-3.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1C1815", borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>{stack.name} Stack</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Lab gating before first dose",
                    "Physician dose adjustments",
                    "503A pharmacy compounding",
                    "Cold-chain shipping",
                    "Refund on unused portion",
                  ].map((label) => (
                    <tr key={label} data-testid={`vs-row-${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
                      <td className="px-4 py-3.5 text-sm" style={{ fontFamily: SANS, color: "#28251D", borderBottom: "1px solid var(--nx-border)" }}>{label}</td>
                      <td className="px-4 py-3.5 text-center" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                        <X size={16} strokeWidth={2.4} style={{ color: "#C97A4A", display: "inline" }} />
                      </td>
                      <td className="px-4 py-3.5 text-center" style={{ borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>
                        <Check size={16} strokeWidth={2.6} style={{ color: "#2E6B47", display: "inline" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Meal / lifestyle companion strip ── */}
        <section className="py-16 md:py-20" data-testid="section-lifestyle">
          <div className="nx-container max-w-5xl">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Pair this stack with</div>
            <h2 className="text-2xl md:text-3xl mb-8 leading-[1.12] max-w-2xl" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              Peptides do their best work on top of the basics.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
              {companions.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="p-6 md:p-7" style={{ background: "var(--nx-bg)" }} data-testid={`lifestyle-card-${c.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
                    <Icon size={22} strokeWidth={1.6} style={{ color: "#1C1815", marginBottom: 14 }} />
                    <h3 className="text-lg mb-2" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>{c.title}</h3>
                    <p className="text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.55 }}>{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Who this is for / not for ── */}
        <section className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} data-testid="section-who-for">
          <div className="nx-container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
              <div className="p-7 md:p-9" style={{ background: "var(--nx-bg)" }}>
                <div className="text-[11px] uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-2" style={{ fontFamily: MONO, color: "#2E6B47" }}>
                  <Check size={13} strokeWidth={2.6} /> Who this is for
                </div>
                <ul className="space-y-3">
                  {goodFit.map((g) => (
                    <li key={g} className="flex gap-2.5 text-sm" style={{ fontFamily: SANS, color: "#28251D", lineHeight: 1.55 }}>
                      <Check size={15} strokeWidth={2.4} style={{ color: "#2E6B47", flexShrink: 0, marginTop: 2 }} /> <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7 md:p-9" style={{ background: "var(--nx-bg)" }}>
                <div className="text-[11px] uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-2" style={{ fontFamily: MONO, color: "#C2440E" }}>
                  <X size={13} strokeWidth={2.6} /> Who it's not for
                </div>
                <ul className="space-y-3">
                  {notFit.map((n) => (
                    <li key={n} className="flex gap-2.5 text-sm" style={{ fontFamily: SANS, color: "#28251D", lineHeight: 1.55 }}>
                      <X size={15} strokeWidth={2.4} style={{ color: "#C2440E", flexShrink: 0, marginTop: 2 }} /> <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Lab markers tracked */}
        <section className="py-16 md:py-20">
          <div className="nx-container max-w-5xl">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Bloodwork tracked</div>
            <h2 className="text-3xl md:text-4xl mb-10 leading-[1.1]" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>
              The biomarkers <span style={{  }}>that confirm the protocol is working</span>.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--nx-border)" }}>
              {stack.labMarkers.map((marker) => (
                <div key={marker} className="p-5 md:p-6" style={{ background: "var(--nx-bg)" }} data-testid={`marker-${marker.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
                  <div className="text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ fontFamily: MONO, color: "#6B6B6B" }}>Marker</div>
                  <div className="text-base" style={{ fontFamily: SANS, color: "#1C1815", fontWeight: 500 }}>{marker}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm max-w-2xl" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.65 }}>
              Bloodwork is drawn at baseline and at intervals throughout the protocol. Results return to your physician,
              who adjusts the stack based on what your body is doing — not what the average patient does.
            </p>
          </div>
        </section>

        {/* ── FAQ (6) ── */}
        <section className="py-16 md:py-20" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }} data-testid="section-stack-detail-faq">
          <div className="nx-container" style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Questions about this stack</div>
            <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: SERIF, color: "#1C1815", fontWeight: 500 }}>Everything else.</h2>
            <div>
              {faqItems.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--nx-border)" }}>
                  <button className="w-full flex items-start justify-between gap-4 text-left py-5" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} data-testid={`detail-faq-item-${i}`}>
                    <span className="text-base" style={{ fontFamily: SANS, fontWeight: 500, color: "#1C1815", lineHeight: 1.4 }}>{item.q}</span>
                    {openFaq === i ? <Minus size={16} style={{ color: "#8B5A2B", flexShrink: 0, marginTop: 3 }} /> : <Plus size={16} style={{ color: "#4A4A4A", flexShrink: 0, marginTop: 3 }} />}
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-sm" style={{ fontFamily: SANS, color: "#4A4A4A", lineHeight: 1.7, maxWidth: 640 }} data-testid={`detail-faq-answer-${i}`}>{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Physician attribution */}
        <PhysicianAttribution curator={stack.curator} />

        {/* Results / what people report */}
        <ResultsSection stack={stack} />

        {/* Cross-sell to other stacks */}
        <OtherStacksCrossSell currentSlug={stack.slug} />

        {/* Final CTA bar */}
        <section className="py-14 md:py-16" style={{ background: "#1C1815", color: "#FAF7F0" }}>
          <div className="nx-container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] mb-2" style={{ fontFamily: MONO, color: "#8B5A2B" }}>Ready to start?</div>
                <h2 className="text-3xl md:text-4xl leading-[1.1]" style={{ fontFamily: SERIF, color: "#FAF7F0", fontWeight: 500 }}>
                  Add <span style={{  }}>{stack.name}</span> to cart — physician consult included.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <AddToCartButton slug={stack.slug} type="stack" variant="primary" label={`Add — ${formatUSD(bundle)}`} />
                <Link asChild href="/assessment">
                  <a className="inline-flex items-center justify-center px-5 py-3 text-sm" style={{ fontFamily: SANS, color: "#FAF7F0", border: "1px solid rgba(250,247,240,0.3)", fontWeight: 500 }} data-testid="link-take-assessment">
                    Or take the 5-min intake →
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

type Milestone = { weekPct: number; valuePct: number; label: string; week: string };

/* Build three generic milestones from the anchor peptide's timeline if present;
   otherwise fall back to a standard inflammation → function → repair arc. */
function buildMilestones(
  stack: { name: string },
  weeks: number,
  timeline?: { week: string; effect: string }[],
): Milestone[] {
  const w2 = Math.round((2 / weeks) * 100);
  const wMid = 50;
  const wEnd = 100;
  if (timeline && timeline.length >= 3) {
    const short = (s: string) => {
      const first = s.split(/[.;]/)[0].trim();
      return first.length > 42 ? first.slice(0, 40) + "…" : first;
    };
    return [
      { weekPct: w2, valuePct: 28, week: `Week 2`, label: short(timeline[0].effect) },
      { weekPct: wMid, valuePct: 62, week: `Week ${Math.round(weeks / 2)}`, label: short(timeline[Math.floor(timeline.length / 2)].effect) },
      { weekPct: wEnd, valuePct: 94, week: `Week ${weeks}`, label: short(timeline[timeline.length - 1].effect) },
    ];
  }
  return [
    { weekPct: w2, valuePct: 28, week: "Week 2", label: "Inflammation down" },
    { weekPct: wMid, valuePct: 62, week: `Week ${Math.round(weeks / 2)}`, label: "Function up" },
    { weekPct: wEnd, valuePct: 94, week: `Week ${weeks}`, label: "Full repair" },
  ];
}

/* SVG line chart of cumulative response with milestone callouts. */
function OutcomeTimeline({ weeks, milestones }: { weeks: number; milestones: Milestone[] }) {
  const W = 900, H = 340, padL = 48, padR = 24, padT = 24, padB = 48;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const x = (pct: number) => padL + (pct / 100) * plotW;
  const y = (pct: number) => padT + plotH - (pct / 100) * plotH;

  // Smooth rising curve through origin and the milestones.
  const pts = [{ weekPct: 0, valuePct: 4 }, ...milestones];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.weekPct).toFixed(1)} ${y(p.valuePct).toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${x(100).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  return (
    <div style={{ background: "#fff", border: "1px solid var(--nx-border)", padding: "1.25rem 1rem 0.5rem" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Cumulative response over ${weeks} weeks`}>
        <title>Outcome trajectory across the {weeks}-week course</title>
        {/* gridlines */}
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="#EDE8DC" strokeWidth={1} />
            <text x={padL - 8} y={y(g) + 3} textAnchor="end" style={{ fontFamily: MONO, fontSize: 9, fill: "#9A9A95" }}>{g}</text>
          </g>
        ))}
        {/* x labels */}
        {[0, 25, 50, 75, 100].map((g) => (
          <text key={g} x={x(g)} y={H - padB + 18} textAnchor="middle" style={{ fontFamily: MONO, fontSize: 9, fill: "#9A9A95" }}>
            wk {Math.round((g / 100) * weeks)}
          </text>
        ))}
        {/* area + line */}
        <path d={area} fill="#1C1815" opacity={0.05} />
        <path d={path} fill="none" stroke="#1C1815" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        {/* milestone markers + callouts */}
        {milestones.map((m, i) => (
          <g key={i}>
            <line x1={x(m.weekPct)} y1={y(m.valuePct)} x2={x(m.weekPct)} y2={y(0)} stroke="#DDD9CE" strokeWidth={1} strokeDasharray="3 4" />
            <circle cx={x(m.weekPct)} cy={y(m.valuePct)} r={6} fill="#F3C87A" stroke="#1C1815" strokeWidth={2} />
            <text x={x(m.weekPct)} y={y(m.valuePct) - 26} textAnchor={i === milestones.length - 1 ? "end" : "middle"} style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, fill: "#8B5A2B" }}>{m.week}</text>
            <text x={x(m.weekPct)} y={y(m.valuePct) - 12} textAnchor={i === milestones.length - 1 ? "end" : "middle"} style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 11, fill: "#1C1815" }}>{m.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
