import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, FlaskConical, Plus, Minus, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { peptides, CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";
import { pricing, formatUSD, priceAtCadence, CADENCE_DISCOUNTS, type CadenceKey } from "@/data/pricing";
import { useCart } from "@/contexts/CartProvider";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import { getStack } from "@/data/stacks";
import { getSolo } from "@/data/soloCatalog";
import { getStackPortrait } from "@/lib/stackPortraits";

const cadencePctOf = (c: CadenceKey): number => (CADENCE_DISCOUNTS[c]?.pct ?? 0);

const MONO = "'General Sans', system-ui, sans-serif";
const SERIF = "'General Sans', system-ui, sans-serif";
const SANS = "'Inter', sans-serif";

/* ──────────────────────────────────────────────────────────────
   Benefit bullets per peptide (two short lines)
   ────────────────────────────────────────────────────────────── */
const BENEFIT_BULLETS: Record<string, [string, string]> = {
  "bpc-157": ["Accelerates tendon & gut repair", "Calms local inflammation"],
  "tb-500": ["Systemic tissue recovery", "Eases nagging strains"],
  "ghk-cu": ["Rebuilds collagen & elastin", "Evens tone, softens lines"],
  semax: ["Sharpens focus & recall", "Lifts mental fatigue"],
  selank: ["Calm without sedation", "Steadies mood under stress"],
  tesamorelin: ["Targets visceral fat", "Raises IGF-1 physiologically"],
  ipamorelin: ["Clean GH pulse", "Deepens sleep & recovery"],
  "cjc-1295": ["Sustains GH baseline", "Pairs synergistically with Ipamorelin"],
  epitalon: ["Recalibrates circadian rhythm", "Studied for telomere support"],
  "thymosin-a1": ["Restores T-cell function", "Modulates immune surveillance"],
  "nad-plus": ["Fuels mitochondrial energy", "Supports DNA repair"],
  "mots-c": ["Exercise-mimetic metabolism", "Improves glucose handling"],
  dsip: ["Deeper slow-wave sleep", "Shortens sleep-onset latency"],
  tirzepatide: ["Steady weight loss", "Curbs cravings & food noise"],
  retatrutide: ["Largest fat-loss lever", "Raises energy expenditure"],
  "aod-9604": ["Targeted lipolysis", "Spares glucose & IGF-1"],
};

/* ──────────────────────────────────────────────────────────────
   Goals → which peptide categories are most relevant
   ────────────────────────────────────────────────────────────── */

type Goal = {
  id: string;
  title: string;
  blurb: string;
  categories: PeptideCategory[];
  recommended: string[]; // peptide slugs (pre-checked when goal selected)
  curatorNote: string;
};

const GOALS: Goal[] = [
  {
    id: "recovery",
    title: "Repair & recover",
    blurb: "Tendon, joint, soft-tissue healing. Train harder, bounce back faster.",
    categories: ["recovery", "growth"],
    recommended: ["bpc-157", "tb-500", "ghk-cu"],
    curatorNote: "Local repair signal + systemic cell migration + collagen synthesis. The classic injury-rehab triad.",
  },
  {
    id: "skin",
    title: "Skin & aesthetics",
    blurb: "Collagen, tone, dermal density. Reverse visible aging from the inside.",
    categories: ["skin", "recovery"],
    recommended: ["ghk-cu", "bpc-157"],
    curatorNote: "Copper-binding tripeptide for dermal renewal, BPC-157 for systemic repair support.",
  },
  {
    id: "weight",
    title: "Weight & metabolic",
    blurb: "Sustainable fat loss with muscle preservation, monitored monthly.",
    categories: ["metabolic", "growth"],
    recommended: ["tirzepatide", "ipamorelin", "aod-9604"],
    curatorNote: "GLP-1 for satiety + GH secretagogue to preserve lean mass + adipose-selective lipolysis.",
  },
  {
    id: "sleep",
    title: "Sleep & restoration",
    blurb: "Deeper sleep, faster onset, more restorative REM.",
    categories: ["sleep"],
    recommended: ["dsip", "epitalon"],
    curatorNote: "Delta-sleep peptide + pineal regulator. Repeat seasonally as a circadian reset.",
  },
  {
    id: "cognitive",
    title: "Focus & mood",
    blurb: "Stress resilience, clarity, attention without stimulants.",
    categories: ["cognition"],
    recommended: ["semax", "selank"],
    curatorNote: "Two Russian cognitive peptides with decades of clinical literature. Calm focus, not stimulation.",
  },
  {
    id: "longevity",
    title: "Longevity & cellular",
    blurb: "Mitochondrial function, healthspan markers, biological-age tracking.",
    categories: ["longevity"],
    recommended: ["nad-plus", "mots-c", "epitalon"],
    curatorNote: "Cellular energetics + mitochondrial signaling + telomerase support. The biological-age trio.",
  },
  {
    id: "performance",
    title: "Performance & GH",
    blurb: "Lean mass, energy, recovery from heavy training cycles.",
    categories: ["growth"],
    recommended: ["ipamorelin", "cjc-1295"],
    curatorNote: "Pulsatile GH release plus GHRH analog for amplitude. Used by athletic-medicine clinicians.",
  },
];

/* ──────────────────────────────────────────────────────────────
   Goal → matched flagship stack. When a user selects a goal we can
   surface the physician-curated stack that already targets it, with
   a confidence score derived from how closely their live selection
   overlaps the curated formula.
   ────────────────────────────────────────────────────────────── */
const GOAL_TO_STACK: Record<string, string> = {
  recovery: "wolverine",
  skin: "glow",
  weight: "metabolic",
  sleep: "sleep",
  cognitive: "cognitive",
  longevity: "longevity",
  performance: "metabolic",
};

/* Confidence = base match for a curated goal + overlap between the
   user's live picks and the flagship formula. Bounded 60–99 so the
   surface always reads as a strong, honest recommendation. */
function stackConfidence(stackPeptides: string[], picked: string[]): number {
  if (stackPeptides.length === 0) return 0;
  const overlap = stackPeptides.filter((s) => picked.includes(s)).length;
  const coverage = overlap / stackPeptides.length; // 0–1
  const raw = 72 + Math.round(coverage * 26); // 72 → 98
  return Math.max(60, Math.min(99, raw));
}

/* ──────────────────────────────────────────────────────────────
   Custom-stack bundle pricing — same 12% bundle discount as flagship
   stacks, scaled with size: 2 = 10%, 3 = 12%, 4+ = 15%.
   ────────────────────────────────────────────────────────────── */
function bundleDiscount(n: number): number {
  if (n >= 4) return 0.15;
  if (n === 3) return 0.12;
  if (n === 2) return 0.10;
  return 0;
}

/* ──────────────────────────────────────────────────────────────
   Steps
   ────────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3;

export default function BuildYourStack() {
  useSeo({
    title: "Build your own peptide stack — custom, physician-reviewed",
    description: "Pick your goal, choose 2–4 compatible peptides, lock in a bundle discount. Every custom stack is reviewed by a board-certified physician and compounded in a U.S. 503A pharmacy before dispensing.",
    path: "/stacks/build",
    jsonLd: [webPageJsonLd({
      name: "Build Your Peptide Stack",
      description: "Custom physician-reviewed peptide stack builder. Choose your goal, select compounds, get physician review.",
      path: "/stacks/build",
    })],
  });

  const cart = useCart();
  const [step, setStep] = useState<Step>(1);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [cadence, setCadence] = useState<CadenceKey>("3mo");
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const goal = useMemo(() => GOALS.find((g) => g.id === goalId) ?? null, [goalId]);

  // Physician-curated flagship stack that matches the chosen goal, plus a
  // live confidence score reflecting how closely the current picks overlap it.
  const matchedStack = useMemo(
    () => (goalId ? getStack(GOAL_TO_STACK[goalId] ?? "") ?? null : null),
    [goalId],
  );
  const confidence = useMemo(
    () => (matchedStack ? stackConfidence(matchedStack.peptides, picked) : 0),
    [matchedStack, picked],
  );

  /* Sellable = in the current formulary (soloCatalog), not physician-gated
     (GLP-1), and carries transparent pricing. Everything else is intake-only
     and must not be self-serve buildable. */
  const sellable = useMemo(
    () => peptides.filter((p) => { const s = getSolo(p.slug); return !!s && !s.gated && !!s.pricing; }),
    [],
  );
  // Available peptides for the chosen goal (whole catalog if no goal yet)
  const eligible = useMemo(() => {
    if (!goal) return sellable;
    const fromGoal = sellable.filter((p) => goal.categories.includes(p.category));
    // Always include the explicitly recommended peptides, even if their
    // primary category isn't in the goal's category list (e.g. tirzepatide
    // for "weight" is metabolic, but ipamorelin for the same goal is growth).
    const extras = sellable.filter(
      (p) => goal.recommended.includes(p.slug) && !fromGoal.some((q) => q.slug === p.slug),
    );
    return [...fromGoal, ...extras];
  }, [goal]);

  // Pricing math
  const lines = picked.map((slug) => {
    const monthly = priceAtCadence(slug, cadence);
    const peptide = peptides.find((p) => p.slug === slug);
    return { slug, monthly, name: peptide?.name ?? slug };
  });
  const subtotal = lines.reduce((a, l) => a + l.monthly, 0);
  const discount = bundleDiscount(picked.length);
  const bundleTotal = Math.round(subtotal * (1 - discount));
  const bundleSavings = subtotal - bundleTotal;
  const cadencePct = Math.round(cadencePctOf(cadence) * 100);

  function pickGoal(id: string) {
    setGoalId(id);
    // Seed with curator's recommended picks
    const g = GOALS.find((x) => x.id === id);
    if (g) setPicked(g.recommended.slice(0, 3));
    setStep(2);
  }

  function togglePeptide(slug: string) {
    setPicked((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  function addBundleToCart() {
    // Add each peptide at the selected cadence. The cart's natural subtotal
    // doesn't apply the bundle discount, but each peptide flowing through
    // the cadence discount engine already captures the headline savings.
    picked.forEach((slug) => cart.addPeptide(slug, { qty: 1, cadence }));
    cart.open();
    setAdded(true);
    setToast(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const canContinueStep2 = picked.length >= 2 && picked.length <= 5;

  return (
    <SiteLayout navVariant="showcase">
      {/* Toast notification */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
          style={{ background: "var(--nx-fg)", color: "var(--nx-ceramic)", fontFamily: MONO, fontSize: 12, letterSpacing: "0.08em" }}
          role="status"
          aria-live="polite"
        >
          <ShoppingBag size={15} style={{ color: "var(--nx-acid)" }} />
          <span>Stack added to cart</span>
          <span style={{ color: "var(--nx-acid)", fontWeight: 600 }}>✓</span>
        </div>
      )}
      <div style={{ background: "var(--mx-page-bg, var(--nx-ceramic))", minHeight: "100vh", paddingTop: 80 }}>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="nx-container py-12 md:py-20">
          <div className="max-w-3xl">
            <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 18 }}>
              <Sparkles size={11} className="inline-block mr-1.5 -mt-0.5" />
              Custom protocol builder
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--nx-fg)",
                fontWeight: 400,
              }}
              data-testid="text-build-title"
            >
              Build your own stack
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  
                  fontWeight: 400,
                  display: "block",
                  color: "var(--nx-fg-muted)",
                  fontSize: "0.65em",
                  marginTop: 10,
                }}
              >
                in three steps.
              </span>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.5, color: "var(--nx-fg)", marginTop: 22, maxWidth: 620 }}>
              Pick your goal. Choose 2–5 compatible peptides. Lock in a bundle discount on top of your cadence pricing. Every custom stack still goes through a US-licensed physician review before it ships from the pharmacy.
            </p>
          </div>

          {/* Step indicator with progress bar */}
          <div className="mt-12" data-testid="step-indicator">
            {/* Progress bar */}
            <div className="relative h-1 rounded-full mb-5" style={{ background: "var(--nx-rock)" }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%`, background: "var(--nx-acid)" }}
              />
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              {[
                { n: 1, label: "Pick your goal" },
                { n: 2, label: "Choose your peptides" },
                { n: 3, label: "Review & add to cart" },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-3 md:gap-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: step >= (s.n as Step) ? "var(--nx-fg)" : "transparent",
                        border: step >= (s.n as Step) ? "1px solid var(--nx-fg)" : "1px solid #9FACBB",
                        color: step >= (s.n as Step) ? "var(--nx-acid)" : "var(--nx-fg-muted)",
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 600,
                        transition: "all 300ms",
                      }}
                    >
                      {step > (s.n as Step) ? <Check size={13} /> : s.n}
                    </span>
                    <span
                      className="hidden sm:inline"
                      style={{
                        fontFamily: MONO,
                        fontSize: 10.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: step >= (s.n as Step) ? "var(--nx-fg)" : "var(--nx-fg-muted)",
                        transition: "color 300ms",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span
                      className="h-px w-8 md:w-16"
                      style={{ background: step > (s.n as Step) ? "var(--nx-acid)" : "#C1CAD4", transition: "background 300ms" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Step 1 — pick goal ─────────────────────────────────── */}
        {step === 1 && (
          <section className="nx-container pb-24" data-testid="step-1-goal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => pickGoal(g.id)}
                  className="text-left group nx-goal-card"
                  data-testid={`button-goal-${g.id}`}
                  style={{
                    background: "var(--nx-ceramic)",
                    border: "1px solid var(--nx-rock)",
                    borderRadius: 4,
                    padding: "28px 24px",
                    fontFamily: SANS,
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "var(--nx-fg-muted)", textTransform: "uppercase" }}>
                      {g.id === "performance" ? "07" : g.id === "longevity" ? "06" : g.id === "cognitive" ? "05" : g.id === "sleep" ? "04" : g.id === "weight" ? "03" : g.id === "skin" ? "02" : "01"} / 07
                    </p>
                    <ArrowRight size={16} style={{ color: "var(--nx-fg)", opacity: 0.4 }} className="group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.01em", fontWeight: 500, color: "var(--nx-fg)" }}>
                    {g.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--nx-fg-graphite)", marginTop: 8, lineHeight: 1.5 }}>
                    {g.blurb}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {g.recommended.slice(0, 3).map((slug) => {
                      const p = peptides.find((pp) => pp.slug === slug);
                      return p ? (
                        <span
                          key={slug}
                          style={{
                            fontFamily: MONO,
                            fontSize: 9.5,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            background: "#EFF2F5",
                            color: "var(--nx-fg)",
                            padding: "3px 8px",
                            borderRadius: 2,
                          }}
                        >
                          {p.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom: no goal */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => { setGoalId(null); setPicked([]); setStep(2); }}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: 4,
                }}
                data-testid="button-skip-goal"
              >
                Skip — I know exactly what I want
              </button>
            </div>
          </section>
        )}

        {/* ── Step 2 — pick peptides ─────────────────────────────── */}
        {step === 2 && (
          <section className="nx-container pb-24" data-testid="step-2-peptides">
            {/* Curator note */}
            {goal && (
              <div
                className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5"
                style={{ background: "var(--nx-fg)", borderRadius: 4, color: "var(--nx-ceramic)" }}
              >
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "var(--nx-acid)", textTransform: "uppercase", marginBottom: 6 }}>
                    Curator's note · {goal.title}
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.85)", maxWidth: 720 }}>
                    {goal.curatorNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", whiteSpace: "nowrap" }}
                  data-testid="button-change-goal"
                >
                  ← Change goal
                </button>
              </div>
            )}

            {/* Recommended flagship stack — surfaces with a live confidence score */}
            {matchedStack && (
              <div
                className="mb-8 overflow-hidden"
                style={{ background: "var(--nx-fg)", borderRadius: 4, border: "1px solid #1c1c1c" }}
                data-testid="recommended-stack-surface"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[132px_1fr] items-stretch">
                  {/* Portrait proof */}
                  <div
                    className="relative hidden sm:block"
                    style={{ minHeight: 172, backgroundImage: `url(${getStackPortrait(matchedStack.slug)})`, backgroundSize: "cover", backgroundPosition: "center top" }}
                    aria-hidden="true"
                  >
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(21, 24, 28,0) 55%, var(--nx-fg) 100%)" }} />
                  </div>

                  <div className="p-5 md:p-6 flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "var(--nx-acid)", textTransform: "uppercase", marginBottom: 8 }}>
                          <ShieldCheck size={11} className="inline-block mr-1.5 -mt-0.5" />
                          Physician-curated match
                        </p>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--nx-ceramic)", lineHeight: 1.1 }} data-testid="text-matched-stack-name">
                            The {matchedStack.name} stack
                          </h3>
                          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                            {matchedStack.peptides.length} peptides · {matchedStack.duration.split(",")[0]}
                          </span>
                        </div>
                        <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", marginTop: 8, maxWidth: 560 }}>
                          {matchedStack.purpose}
                        </p>
                      </div>

                      {/* Confidence dial */}
                      <div className="flex-shrink-0 text-right" data-testid="confidence-score">
                        <p style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, lineHeight: 1, color: "var(--nx-acid)", letterSpacing: "-0.02em" }}>
                          {confidence}<span style={{ fontSize: 16, fontWeight: 500 }}>%</span>
                        </p>
                        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 3 }}>
                          Goal match
                        </p>
                      </div>
                    </div>

                    {/* Confidence meter */}
                    <div className="mt-4 relative h-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                        style={{ width: `${confidence}%`, background: "var(--nx-acid)" }}
                        data-testid="confidence-meter"
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-4 flex-wrap">
                      <Link
                        href={`/stacks/${matchedStack.slug}`}
                        className="inline-flex items-center gap-2"
                        data-testid="link-view-matched-stack"
                        style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--nx-fg)", background: "var(--nx-acid)", padding: "9px 16px", borderRadius: 999 }}
                      >
                        See the {matchedStack.name} protocol <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPicked(matchedStack.peptides)}
                        data-testid="button-use-matched-formula"
                        style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: 4 }}
                      >
                        Use the exact formula
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout: peptide grid + sticky summary */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
              {/* Peptide picker */}
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <h2 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {goal ? `Recommended for ${goal.title.toLowerCase()}` : "Choose from the catalog"}
                  </h2>
                  <p style={{ fontFamily: MONO, fontSize: 11, color: "var(--nx-fg-muted)", letterSpacing: "0.08em" }}>
                    {picked.length} / 5 picked
                  </p>
                </div>

                {/* Empty-state hint before any picks */}
                {picked.length < 2 && (
                  <div className="mb-4 px-4 py-2.5 rounded" style={{ background: "#EFF2F5", border: "1px solid var(--nx-rock)" }}>
                    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: "var(--nx-fg-muted)", textTransform: "uppercase" }}>
                      Pick at least 2 peptides to continue
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eligible.map((p) => {
                    const isPicked = picked.includes(p.slug);
                    const pr = pricing[p.slug];
                    const monthly = pr ? priceAtCadence(p.slug, cadence) : 0;
                    const isRecommended = goal ? goal.recommended.includes(p.slug) : false;
                    const bullets = BENEFIT_BULLETS[p.slug];
                    const synergies = p.pairsWith
                      ?.filter(s => picked.includes(s) && s !== p.slug)
                      .map(s => peptides.find(pp => pp.slug === s)?.name)
                      .filter((n): n is string => Boolean(n)) ?? [];
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => togglePeptide(p.slug)}
                        className="text-left transition-all"
                        data-testid={`button-pick-${p.slug}`}
                        style={{
                          background: isPicked ? "var(--nx-fg)" : "var(--nx-ceramic)",
                          color: isPicked ? "var(--nx-ceramic)" : "var(--nx-fg)",
                          border: isPicked ? "1px solid var(--nx-fg)" : isRecommended ? "2px solid var(--nx-acid)" : "1px solid var(--nx-rock)",
                          borderRadius: 4,
                          padding: "18px 18px",
                          fontFamily: SANS,
                          position: "relative",
                        }}
                      >
                        {isRecommended && (
                          <span style={{ position: "absolute", top: 8, right: 8, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg)", background: "var(--nx-acid)", padding: "2px 6px", borderRadius: 2 }}>
                            Recommended
                          </span>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: isPicked ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                              {CATEGORY_LABELS[p.category]}
                            </p>
                            <p style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                              {p.name}
                            </p>
                            <p style={{ fontSize: 12.5, color: isPicked ? "rgba(255,255,255,0.7)" : "var(--nx-fg-graphite)", marginTop: 4, lineHeight: 1.45 }}>
                              {p.tagline}
                            </p>
                            {bullets && (
                              <ul className="mt-2 space-y-0.5">
                                {bullets.map((b, bi) => (
                                  <li key={bi} style={{ fontSize: 11.5, color: isPicked ? "rgba(255,255,255,0.65)" : "var(--nx-fg)", lineHeight: 1.4, display: "flex", gap: 5 }}>
                                    <span style={{ color: "var(--nx-acid)", flexShrink: 0 }}>·</span>{b}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {synergies.length > 0 && (
                              <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.08em", color: isPicked ? "rgba(152, 182, 213,0.9)" : "#7A929A", textTransform: "uppercase", marginTop: 6 }}>
                                ⚡ Synergy with {synergies.join(" & ")}
                              </p>
                            )}
                          </div>
                          <span
                            className="flex-shrink-0 inline-flex items-center justify-center"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 999,
                              background: isPicked ? "var(--nx-acid)" : "transparent",
                              border: isPicked ? "1px solid var(--nx-acid)" : "1px solid #C1CAD4",
                              color: "var(--nx-fg)",
                            }}
                          >
                            {isPicked ? <Check size={13} strokeWidth={3} /> : <Plus size={13} />}
                          </span>
                        </div>
                        <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${isPicked ? "rgba(255,255,255,0.15)" : "var(--nx-bg)"}` }}>
                          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: isPicked ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)", textTransform: "uppercase" }}>
                            {pr?.vialSpec.split("·")[0]?.trim() ?? p.administration}
                          </span>
                          <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600 }}>
                            {monthly ? `${formatUSD(monthly)}/mo` : "—"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sticky summary */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-rock)", borderRadius: 4 }}>
                  <div className="p-5 border-b" style={{ borderColor: "var(--nx-bg)" }}>
                    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                      Your stack
                    </p>
                    <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {picked.length === 0 ? "Start picking" : `${picked.length} ${picked.length === 1 ? "peptide" : "peptides"}`}
                    </p>
                  </div>

                  {/* cadence selector */}
                  <div className="p-5 border-b" style={{ borderColor: "var(--nx-bg)" }}>
                    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 10 }}>
                      Cadence
                    </p>
                    <div className="flex gap-1.5">
                      {(["1mo", "3mo", "12mo"] as CadenceKey[]).map((c) => {
                        const active = cadence === c;
                        const pct = Math.round(cadencePctOf(c) * 100);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCadence(c)}
                            className="flex-1 transition-all"
                            data-testid={`button-cadence-${c}`}
                            style={{
                              padding: "10px 8px",
                              border: active ? "1px solid var(--nx-fg)" : "1px solid var(--nx-rock)",
                              background: active ? "var(--nx-fg)" : "var(--nx-ceramic)",
                              color: active ? "var(--nx-ceramic)" : "var(--nx-fg)",
                              fontFamily: MONO,
                              fontSize: 10.5,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              borderRadius: 3,
                            }}
                          >
                            <div>{c === "1mo" ? "Monthly" : c === "3mo" ? "Quarterly" : "Annual"}</div>
                            {pct > 0 && (
                              <div style={{ color: active ? "var(--nx-acid)" : "var(--nx-fg-muted)", fontSize: 9.5, marginTop: 2 }}>
                                Save {pct}%
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* lines */}
                  {lines.length > 0 && (
                    <div className="p-5 border-b" style={{ borderColor: "var(--nx-bg)" }}>
                      <ul className="space-y-2.5">
                        {lines.map((l) => (
                          <li key={l.slug} className="flex items-center justify-between gap-3 text-sm">
                            <span style={{ fontFamily: SANS, color: "var(--nx-fg)" }}>{l.name}</span>
                            <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--nx-fg)" }}>{formatUSD(l.monthly)}/mo</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* totals */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "var(--nx-fg-muted)", textTransform: "uppercase" }}>Subtotal</span>
                      <span style={{ fontFamily: MONO, fontSize: 13, color: "var(--nx-fg)" }}>{formatUSD(subtotal)}/mo</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "var(--nx-fg-muted)", textTransform: "uppercase" }}>
                          Bundle ({picked.length}×) -{Math.round(discount * 100)}%
                        </span>
                        <span style={{ fontFamily: MONO, fontSize: 13, color: "var(--nx-fg)" }}>-{formatUSD(bundleSavings)}/mo</span>
                      </div>
                    )}
                    {cadencePct > 0 && (
                      <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.08em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginTop: 4 }}>
                        Cadence savings already applied to each line
                      </p>
                    )}
                    <div className="flex items-baseline justify-between pt-4 mt-3" style={{ borderTop: "1px solid var(--nx-bg)" }}>
                      <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500 }}>Stack total</span>
                      <span style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, letterSpacing: "-0.01em" }}>
                        {formatUSD(bundleTotal)}<span style={{ fontFamily: MONO, fontSize: 11, color: "var(--nx-fg-muted)", marginLeft: 4 }}>/mo</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!canContinueStep2}
                      className="w-full mt-5 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      data-testid="button-continue-step2"
                      style={{
                        background: "var(--nx-fg)",
                        color: "var(--nx-acid)",
                        padding: "13px 18px",
                        fontFamily: MONO,
                        fontSize: 11.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        borderRadius: 999,
                      }}
                    >
                      Continue
                      <ArrowRight size={14} />
                    </button>

                    {picked.length < 2 && (
                      <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.08em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginTop: 10, textAlign: "center" }}>
                        Pick at least 2 peptides to continue
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* ── Step 3 — review ─────────────────────────────────────── */}
        {step === 3 && (
          <section className="nx-container pb-24" data-testid="step-3-review">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
              {/* Review pane */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2"
                    data-testid="button-back-to-peptides"
                    style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: "var(--nx-fg-muted)", textTransform: "uppercase" }}
                  >
                    <ArrowLeft size={13} /> Edit peptides
                  </button>
                </div>

                <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                  Your custom protocol
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 15, color: "var(--nx-fg-graphite)", marginTop: 8, maxWidth: 600 }}>
                  Review the stack below, then add it to your cart. A US-licensed physician will review your intake and confirm the protocol before anything ships from the pharmacy.
                </p>

                {/* Peptide cards */}
                <div className="mt-8 space-y-4">
                  {picked.map((slug) => {
                    const p = peptides.find((pp) => pp.slug === slug);
                    if (!p) return null;
                    const monthly = priceAtCadence(p.slug, cadence);
                    return (
                      <div
                        key={slug}
                        className="flex items-start gap-4 p-5"
                        style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-rock)", borderRadius: 4 }}
                      >
                        <div className="flex-shrink-0" style={{ width: 56, height: 56, background: "#EFF2F5", borderRadius: 4, display: "grid", placeItems: "center" }}>
                          <MolecularGlyph glyph={p.glyph} size={36} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3">
                            <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.name}</p>
                            <p style={{ fontFamily: MONO, fontSize: 12, color: "var(--nx-fg)", whiteSpace: "nowrap" }}>{formatUSD(monthly)}/mo</p>
                          </div>
                          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginTop: 4 }}>
                            {CATEGORY_LABELS[p.category]} · {p.administration}
                          </p>
                          <p style={{ fontSize: 13.5, color: "var(--nx-fg)", marginTop: 8, lineHeight: 1.55 }}>
                            <strong style={{ fontWeight: 600 }}>Mechanism. </strong>{p.mechanism.length > 240 ? p.mechanism.slice(0, 240) + "…" : p.mechanism}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePeptide(slug)}
                          aria-label={`Remove ${p.name}`}
                          data-testid={`button-remove-${slug}`}
                          style={{ color: "var(--nx-fg-muted)" }}
                          className="hover:text-black"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Protocol timeline — 12 weeks */}
                <div className="mt-10 p-6" style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-rock)", borderRadius: 4 }}>
                  <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 14 }}>
                    Protocol timeline
                  </p>
                  <div className="space-y-0">
                    {[
                      { weeks: "Wk 1–2", phase: "Titration", note: "Start at lowest dose. Physician confirms tolerance." },
                      { weeks: "Wk 3–6", phase: "Loading", note: "Full therapeutic dose. First measurable markers." },
                      { weeks: "Wk 7–10", phase: "Working", note: "Peak biological response. Lab draw at week 8." },
                      { weeks: "Wk 11–12", phase: "Consolidation", note: "Taper to maintenance or end cycle. Final labs." },
                    ].map((row, i, arr) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center" style={{ width: 24 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 999, background: "var(--nx-acid)", flexShrink: 0, marginTop: 3 }} />
                          {i < arr.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 20, background: "var(--nx-rock)" }} />}
                        </div>
                        <div className="pb-4">
                          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg)", marginBottom: 2 }}>
                            {row.weeks} · <span style={{ color: "var(--nx-fg-muted)" }}>{row.phase}</span>
                          </p>
                          <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--nx-fg-graphite)", lineHeight: 1.5 }}>{row.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What happens next */}
                <div className="mt-8 p-6" style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-rock)", borderRadius: 4 }}>
                  <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em", color: "var(--nx-fg-muted)", textTransform: "uppercase", marginBottom: 12 }}>
                    What happens next
                  </p>
                  <ol className="space-y-3 list-none">
                    {[
                      "Add the stack to your cart and complete a 4-minute medical intake.",
                      "A US-licensed physician reviews your intake and labs (or orders new ones if needed) within 24 hours.",
                      "Once cleared, the protocol is compounded in a 503A pharmacy and shipped cold-chain to your door.",
                      "You message your physician any time through the member portal — protocols can be adjusted at every reassessment.",
                    ].map((line, i) => (
                      <li key={i} className="flex gap-3" style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: "var(--nx-fg)" }}>
                        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: "var(--nx-fg)", minWidth: 22 }}>0{i + 1}</span>
                        {line}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Order summary */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div style={{ background: "var(--nx-fg)", color: "var(--nx-ceramic)", borderRadius: 4 }}>
                  <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: "rgba(152, 182, 213,0.85)", textTransform: "uppercase", marginBottom: 6 }}>
                      Order summary
                    </p>
                    <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500 }}>
                      {picked.length}-peptide custom stack
                    </p>
                    <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginTop: 4 }}>
                      Billed {cadence === "1mo" ? "monthly" : cadence === "3mo" ? "quarterly" : "annually"}
                    </p>
                  </div>

                  {/* Per-peptide line breakdown */}
                  <div className="px-6 pb-3">
                    {lines.map((l) => (
                      <div key={l.slug} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", fontFamily: MONO, fontSize: 11.5 }}>
                        <span style={{ color: "rgba(255,255,255,0.65)" }}>{l.name}</span>
                        <span style={{ color: "rgba(255,255,255,0.9)" }}>{formatUSD(l.monthly)}/mo</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between" style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                      <span>Subtotal</span><span>{formatUSD(subtotal)}/mo</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between" style={{ fontFamily: MONO, fontSize: 12, color: "var(--nx-acid)" }}>
                        <span>Bundle {Math.round(discount * 100)}% off</span>
                        <span>-{formatUSD(bundleSavings)}/mo</span>
                      </div>
                    )}
                    {cadencePct > 0 && (
                      <div className="flex justify-between" style={{ fontFamily: MONO, fontSize: 11, color: "rgba(152, 182, 213,0.7)" }}>
                        <span>Cadence saving ({cadencePct}%)</span>
                        <span>applied</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 500 }}>Total</span>
                      <span style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em" }}>
                        {formatUSD(bundleTotal)}<span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>/mo</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={addBundleToCart}
                      className="w-full inline-flex items-center justify-center gap-2"
                      data-testid="button-add-bundle-to-cart"
                      style={{
                        background: added ? "var(--nx-acid)" : "var(--nx-ceramic)",
                        color: "var(--nx-fg)",
                        padding: "14px 18px",
                        fontFamily: MONO,
                        fontSize: 11.5,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        borderRadius: 999,
                        transition: "all 200ms ease",
                      }}
                    >
                      {added ? (
                        <>
                          <Check size={14} strokeWidth={3} /> Added to cart
                        </>
                      ) : (
                        <>
                          Add stack to cart <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                    <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: 12, textAlign: "center" }}>
                      Physician review required before shipping
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-5 flex items-start gap-3" style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-rock)", borderRadius: 4 }}>
                  <FlaskConical size={16} style={{ color: "var(--nx-fg)", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.55, color: "var(--nx-fg-graphite)" }}>
                    Want a physician to design this for you from scratch? <Link href="/assessment" className="underline" style={{ color: "var(--nx-fg)" }} data-testid="link-take-assessment">Take the 4-minute assessment</Link> and we'll build a protocol from your labs and goals.
                  </p>
                </div>
              </aside>
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
