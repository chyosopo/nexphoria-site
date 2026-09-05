/* ═══ Find your medicine (the quiz) ═══
   Chiya 2026-09-05, after alyvewellness.com: a short quiz as the front door,
   in second person, that ends at the medicines a physician can prescribe for
   the goal. Four questions, all preference: the goal, how you would rather
   take it, how soon you want to notice something, one medicine or a plan.
   No health question is asked here and nothing is stored or sent; the answers
   live in component state and the health questions come next, with a
   physician, in the medical engine (CLAUDE.md: PHI never touches this repo).
   The register is the plain deck: we show what can be prescribed for the
   goal; the reader decides. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductTile, ProtocolTile } from "@/components/ProductTile";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, isSellable, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { track } from "@/lib/analytics";

const GOAL_ORDER: PeptideCategory[] = ["metabolic", "growth", "recovery", "skin", "longevity", "cognition", "sleep", "sexual-health", "hormone"];

/* One line per goal: what a physician here can prescribe for it. */
const GOAL_LINE: Record<PeptideCategory, string> = {
  metabolic: "Semaglutide and tirzepatide, one injection a week.",
  growth: "Tesamorelin and the growth hormone releasing peptides.",
  recovery: "BPC-157 and TB-500, for injury and recovery from training.",
  skin: "GHK-Cu and epitalon, for skin firmness and collagen.",
  longevity: "NAD+, MOTS-c and epitalon, for cellular energy and metabolism.",
  cognition: "Semax and Selank, nasal sprays for focus and mood.",
  sleep: "DSIP, one injection at bedtime.",
  "sexual-health": "PT-141, tadalafil and oxytocin, taken as needed.",
  hormone: "Testosterone with kisspeptin, dosed from blood work.",
};

type Route = "injection" | "nasal" | "as-needed" | "any";
type Onset = "days" | "weeks" | "months" | "any";
type Shape = "one" | "protocol" | "physician";

const ROUTES: { key: Route; label: string; line: string }[] = [
  { key: "injection", label: "A small injection under the skin", line: "Most peptides. A short, thin needle; instructions come with the first shipment." },
  { key: "nasal", label: "A nasal spray", line: "Semax, Selank, oxytocin and tadalafil." },
  { key: "as-needed", label: "Something I take only on the day", line: "PT-141, oxytocin and tadalafil, taken as needed." },
  { key: "any", label: "No preference", line: "Show me everything for the goal." },
];
const ONSETS: { key: Onset; label: string; line: string }[] = [
  { key: "days", label: "Within days", line: "The nasal sprays, the as-needed medicines and some of the others." },
  { key: "weeks", label: "Within a few weeks", line: "Most peptides. Typical onset is on each tile." },
  { key: "months", label: "Over months", line: "Body composition and weight change build over months." },
  { key: "any", label: "Either way", line: "Show me the typical onset of each." },
];
const SHAPES: { key: Shape; label: string; line: string }[] = [
  { key: "one", label: "One medicine", line: "A single medicine, with the same physician review and blood testing." },
  { key: "protocol", label: "A protocol of two or more", line: "Medicines that do different jobs, prescribed together on one plan." },
  { key: "physician", label: "Let the physician decide", line: "The health questions ask what you are treating; the physician chooses." },
];

const isNasal = (s: SoloPeptide) => s.route === "nasal" || /nasal spray/i.test(s.outcome);
const isAsNeeded = (s: SoloPeptide) => /as needed|before\./i.test(s.outcome);

const kicker: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" };
const h1: React.CSSProperties = { fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance" };
const body: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)" };

export default function Quiz() {
  useSeo({
    title: "Find your medicine | Nexphoria",
    description: "Four questions about what you are treating and how you would rather take it. At the end, the medicines a licensed U.S. physician can prescribe for it, with their typical onset and their price.",
    path: "/quiz",
    jsonLd: [webPageJsonLd({ name: "Find your medicine", description: "Four questions, then the medicines a physician can prescribe for your goal.", path: "/quiz" }), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Find your medicine", path: "/quiz" }])],
  });

  const goals = useMemo(() => liveCategories(GOAL_ORDER), []);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<PeptideCategory | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [onset, setOnset] = useState<Onset | null>(null);
  const [shape, setShape] = useState<Shape | null>(null);

  const next = (n: number) => { setStep(n); track("quiz_step", { step: n }); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };

  const result = useMemo(() => {
    if (!goal) return null;
    const all = peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => !!s && (isSellable(s) || statusOf(s) !== "live"));
    let list = all;
    let note = "";
    if (route === "nasal") { list = all.filter(isNasal); if (!list.length) { list = all; note = `None of the ${CATEGORY_LABELS[goal].toLowerCase()} medicines is a nasal spray. These are the injections.`; } }
    if (route === "as-needed") { list = all.filter(isAsNeeded); if (!list.length) { list = all; note = `None of the ${CATEGORY_LABELS[goal].toLowerCase()} medicines is taken only on the day. These are taken on a schedule.`; } }
    if (route === "injection") { list = all.filter((s) => !isNasal(s)); if (!list.length) { list = all; note = `The ${CATEGORY_LABELS[goal].toLowerCase()} medicines are nasal sprays.`; } }
    const stack = FLAGSHIP_STACKS.find((st) => st.category === CATEGORY_LABELS[goal]);
    return { list, note, stack };
  }, [goal, route]);

  const onsetLine = onset === "days"
    ? "Typical onset is on each tile. The nasal sprays and the as-needed medicines work the same day; most injected peptides take weeks."
    : onset === "months"
      ? "Typical onset is on each tile. Weight and body composition change over months; the week-12 blood test is where your physician reads it."
      : "Typical onset is on each tile, with the full effect on its page.";

  const total = 4;
  const Progress = ({ n }: { n: number }) => (
    <p style={{ ...kicker }} data-testid="quiz-progress">Question {n} of {total}</p>
  );

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <main className="nx-container nx-quiz" data-testid="quiz" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}>
        {step === 0 && (
          <section className="nx-quiz__step" aria-labelledby="quiz-q1">
            <Progress n={1} />
            <h1 id="quiz-q1" style={h1}>What would you like to treat?</h1>
            <p style={{ ...body, marginTop: "0.8rem", maxWidth: "56ch" }}>Four questions, a few seconds each. At the end: the medicines a licensed U.S. physician can prescribe for it, with their typical onset and their price. Your answers stay in your browser.</p>
            <ul className="nx-quiz__options" role="list">
              {goals.map((g) => (
                <li key={g}>
                  <button type="button" className={`nx-quiz__opt${goal === g ? " is-on" : ""}`} onClick={() => { setGoal(g); next(1); }} data-testid={`quiz-goal-${g}`}>
                    <span style={{ fontFamily: S }}>{CATEGORY_LABELS[g]}</span>
                    <span style={{ fontFamily: F }}>{GOAL_LINE[g]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === 1 && (
          <section className="nx-quiz__step" aria-labelledby="quiz-q2">
            <Progress n={2} />
            <h1 id="quiz-q2" style={h1}>How would you rather take it?</h1>
            <ul className="nx-quiz__options" role="list">
              {ROUTES.map((r) => (
                <li key={r.key}>
                  <button type="button" className={`nx-quiz__opt${route === r.key ? " is-on" : ""}`} onClick={() => { setRoute(r.key); next(2); }} data-testid={`quiz-route-${r.key}`}>
                    <span style={{ fontFamily: S }}>{r.label}</span>
                    <span style={{ fontFamily: F }}>{r.line}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="nx-text-link nx-quiz__back" onClick={() => next(0)} style={{ fontFamily: F }}><ArrowLeft size={14} aria-hidden="true" /> Back</button>
          </section>
        )}

        {step === 2 && (
          <section className="nx-quiz__step" aria-labelledby="quiz-q3">
            <Progress n={3} />
            <h1 id="quiz-q3" style={h1}>How soon do you want to notice something?</h1>
            <ul className="nx-quiz__options" role="list">
              {ONSETS.map((o) => (
                <li key={o.key}>
                  <button type="button" className={`nx-quiz__opt${onset === o.key ? " is-on" : ""}`} onClick={() => { setOnset(o.key); next(3); }} data-testid={`quiz-onset-${o.key}`}>
                    <span style={{ fontFamily: S }}>{o.label}</span>
                    <span style={{ fontFamily: F }}>{o.line}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="nx-text-link nx-quiz__back" onClick={() => next(1)} style={{ fontFamily: F }}><ArrowLeft size={14} aria-hidden="true" /> Back</button>
          </section>
        )}

        {step === 3 && (
          <section className="nx-quiz__step" aria-labelledby="quiz-q4">
            <Progress n={4} />
            <h1 id="quiz-q4" style={h1}>One medicine, or a plan of several?</h1>
            <ul className="nx-quiz__options" role="list">
              {SHAPES.map((s) => (
                <li key={s.key}>
                  <button type="button" className={`nx-quiz__opt${shape === s.key ? " is-on" : ""}`} onClick={() => { setShape(s.key); next(4); if (goal) track("quiz_result", { goal }); }} data-testid={`quiz-shape-${s.key}`}>
                    <span style={{ fontFamily: S }}>{s.label}</span>
                    <span style={{ fontFamily: F }}>{s.line}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="nx-text-link nx-quiz__back" onClick={() => next(2)} style={{ fontFamily: F }}><ArrowLeft size={14} aria-hidden="true" /> Back</button>
          </section>
        )}

        {step === 4 && goal && result && (
          <section className="nx-quiz__result" aria-labelledby="quiz-result" data-testid="quiz-result">
            <p style={kicker}>{CATEGORY_LABELS[goal]}</p>
            <h1 id="quiz-result" style={h1}>For {CATEGORY_LABELS[goal].toLowerCase()}, a physician here can prescribe these.</h1>
            <p style={{ ...body, marginTop: "0.8rem", maxWidth: "58ch" }}>{result.note ? `${result.note} ` : ""}{onsetLine} Each is compounded for you in a licensed U.S. pharmacy and dosed from your blood work.</p>
            <div className="nx-quiz__tiles">
              {result.list.map((s, i) => <ProductTile key={s.slug} sku={s} index={i} detail testId={`quiz-sku-${s.slug}`} />)}
              {shape !== "one" && result.stack && <ProtocolTile stack={result.stack} index={result.list.length} testId={`quiz-stack-${result.stack.slug}`} />}
            </div>
            <div className="nx-quiz__next">
              <p style={kicker}>What happens next</p>
              <ol style={{ ...body, listStyle: "decimal", paddingLeft: "1.4rem", marginTop: "0.6rem" }}>
                <li>The health questions. Your health history, current medicines and goals. A few minutes.</li>
                <li>A licensed U.S. physician reviews them and prescribes, or explains why not.</li>
                <li>Your medicine ships cold with an at-home blood kit. You draw before your first dose.</li>
              </ol>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center", marginTop: "1.2rem" }}>
                <Link href={`/assessment?goal=${goal}`} className="nx-cta-cobalt" data-testid="quiz-cta">Begin the health questions <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link href={`/goals/${goal}`} className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-goal-link">Read about {CATEGORY_LABELS[goal].toLowerCase()}</Link>
              </div>
              <button type="button" className="nx-text-link nx-quiz__back" onClick={() => { setRoute(null); setOnset(null); setShape(null); next(0); }} style={{ fontFamily: F }}><ArrowLeft size={14} aria-hidden="true" /> Start again</button>
            </div>
          </section>
        )}
      </main>
    </SiteLayout>
  );
}
