/* ═══ /quiz — the assessment, and the site's front door for anyone who
   knows the symptom and not the molecule ═══
   Three questions, then a recommendation. See data/quiz.ts for why this
   exists and the law it keeps: the answers are NOT medical intake, nothing
   is stored, nothing leaves the browser. The real questions happen at
   checkout, with the physician. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { m, PRESS_SPRING, rise, stagger, useSheen } from "@/motion";
import { Q_GOAL, Q_SHAPE, Q_TRIED, TRIED_NOTE, GOAL_PROTOCOL, type QuizOption } from "@/data/quiz";
import { GOAL_SHOUT, GOAL_TEACHING } from "@/data/goalTeaching";
import { CATEGORY_LABELS, peptides, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd, getStack } from "@/data/stacksCatalog";
import { ProductCard } from "@/components/ProductCard";
import { track } from "@/lib/analytics";
import "@/styles/quiz.css";

/* Every live medicine indicated for the goal, the favoured ones first. The
   quiz never invents an indication: the pool is the catalog's own mapping,
   and `favours` only reorders it. */
function recommend(goal: PeptideCategory, favours: string[]): SoloPeptide[] {
  const inGoal = peptides
    .filter((p) => p.category === goal)
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s) && statusOf(s!) === "live");
  const score = (s: SoloPeptide) => (favours.includes(s.slug) ? 0 : 1);
  return [...inGoal].sort((a, b) => score(a) - score(b));
}

export default function Quiz() {
  useSeo({
    title: "Find what fits | Nexphoria",
    description:
      "Three questions, and we point you at the medicines a licensed U.S. physician can prescribe for what you want to change. No account, and nothing is stored.",
    path: "/quiz",
    jsonLd: [
      webPageJsonLd({ name: "Find what fits", description: "A three-question assessment.", path: "/quiz" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Find what fits", path: "/quiz" }]),
    ],
  });

  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<PeptideCategory | null>(null);
  const [shape, setShape] = useState<QuizOption | null>(null);
  const [tried, setTried] = useState<string | null>(null);
  const sheen = useSheen();

  const results = useMemo(
    () => (goal ? recommend(goal, shape?.favours ?? []) : []),
    [goal, shape],
  );

  const questions = [
    Q_GOAL,
    goal ? Q_SHAPE[goal] : null,
    Q_TRIED,
  ];
  const total = 3;

  /* What was chosen at each step, so Back re-opens a question with the
     reader's own answer still marked. Without this, going back showed a
     blank question and quietly discarded the choice they came to check. */
  const chosenAt: (QuizOption | null)[] = [
    goal ? Q_GOAL.options.find((o) => o.goal === goal) ?? null : null,
    shape,
    tried ? Q_TRIED.options.find((o) => o.label === tried) ?? null : null,
  ];

  const choose = (opt: QuizOption) => {
    /* Changing the goal invalidates the answer beneath it — the second
       question is a different question per goal. */
    if (step === 0 && opt.goal) {
      if (opt.goal !== goal) setShape(null);
      setGoal(opt.goal);
      track("quiz_step", { step: 1, answer: opt.goal });
    }
    if (step === 1) { setShape(opt); track("quiz_step", { step: 2 }); }
    if (step === 2) { setTried(opt.label); track("quiz_complete", { goal }); }
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => { setStep(0); setGoal(null); setShape(null); setTried(null); };

  /* ── The recommendation ── */
  if (step >= total && goal) {
    const first = results[0];
    const protoSlug = GOAL_PROTOCOL[goal];
    const protocol = protoSlug ? getStack(protoSlug) : undefined;
    return (
      <SiteLayout>
        <div className="nx-quiz">
          <div className="nx-container nx-quiz__wrap">
            <p className="nx-eyebrow">{CATEGORY_LABELS[goal]}</p>
            <h1 className="nx-quiz__h1" style={{ fontFamily: S }}>{GOAL_SHOUT[goal]}</h1>
            <p className="nx-quiz__lede" style={{ fontFamily: F }}>{GOAL_TEACHING[goal]}</p>
            {tried && TRIED_NOTE[tried] && (
              <p className="nx-quiz__note" style={{ fontFamily: F }} data-testid="quiz-tried-note">
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                {TRIED_NOTE[tried]}
              </p>
            )}

            {first ? (
              <>
                <h2 className="nx-quiz__h2" style={{ fontFamily: S }}>
                  Start with {first.name}.
                </h2>
                <p className="nx-quiz__why" style={{ fontFamily: F }}>
                  {first.outcome}{" "}
                  {first.pricing ? `From ${usd(first.pricing.m12)} a month, if a physician prescribes it.` : "Priced at consultation."}
                </p>
                <m.div className="nx-quiz__grid" variants={stagger(0.04)} initial="hidden" animate="show" data-testid="quiz-results">
                  {results.slice(0, 4).map((s, i) => (
                    <m.div key={s.slug} variants={rise} className="nx-cell">
                      <ProductCard sku={s} index={i} />
                    </m.div>
                  ))}
                </m.div>
              </>
            ) : (
              <p className="nx-quiz__why" style={{ fontFamily: F }}>
                Every medicine for this goal is on the shelf, with what it treats and what it costs.
              </p>
            )}

            {/* The protocol, when the goal has one. Someone who has just told
                us their whole goal is exactly the reader for whom two to four
                medicines prescribed together may be the more complete answer
                — and it was reachable only by browsing. Offered as an
                alternative, never as an upsell: no "recommended", no
                "best value", and the single medicine keeps the lead. */}
            {protocol && (
              <div className="nx-quiz__proto" data-testid="quiz-protocol">
                <p className="nx-quiz__proto-k" style={{ fontFamily: F }}>Or, prescribed together</p>
                <h3 className="nx-quiz__proto-t" style={{ fontFamily: S }}>{protocol.name}</h3>
                <p className="nx-quiz__proto-b" style={{ fontFamily: F }}>{protocol.tagline}</p>
                <Link href={`/stacks/${protocol.slug}`} className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-protocol-link">
                  Read the protocol <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className="nx-quiz__foot">
              <Link href={`/peptides?goal=${goal}`} className="nx-cta-cobalt" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-see-all">
                See every medicine for this <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button type="button" onClick={restart} className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-restart">
                Start again
              </button>
            </div>
            <p className="nx-quiz__legal" style={{ fontFamily: F }}>
              This is a place to start reading, not a prescription. A licensed U.S. physician reads your medical
              answers at checkout and decides what is appropriate, or explains why not. Your answers here are not
              stored and are not sent anywhere.
            </p>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ── The questions ── */
  const q = questions[step];
  if (!q) return null;
  return (
    <SiteLayout>
      <div className="nx-quiz">
        <div className="nx-container nx-quiz__wrap">
          <div className="nx-quiz__bar" aria-hidden="true">
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={i <= step ? "is-on" : undefined} />
            ))}
          </div>
          <p className="nx-eyebrow" data-testid="quiz-progress">Question {step + 1} of {total}</p>
          <h1 className="nx-quiz__h1" style={{ fontFamily: S }}>{q.title}</h1>
          {q.lead && <p className="nx-quiz__lede" style={{ fontFamily: F }}>{q.lead}</p>}

          <m.ul className={`nx-quiz__opts${q.options.length > 5 ? " nx-quiz__opts--many" : ""}`} variants={stagger(0.03)} initial="hidden" animate="show" data-testid={`quiz-q${step + 1}`}>
            {q.options.map((opt) => (
              <m.li key={opt.label} variants={rise}>
                <m.button
                  type="button"
                  className={`nx-quiz__opt nx-sheen${chosenAt[step]?.label === opt.label ? " is-on" : ""}`}
                  aria-pressed={chosenAt[step]?.label === opt.label}
                  onClick={() => choose(opt)}
                  whileTap={{ scale: 0.98 }}
                  transition={PRESS_SPRING}
                  {...sheen}
                  data-testid={`quiz-opt-${opt.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <span>
                    <span className="nx-quiz__opt-t" style={{ fontFamily: S }}>{opt.label}</span>
                    {opt.line && <span className="nx-quiz__opt-b" style={{ fontFamily: F }}>{opt.line}</span>}
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </m.button>
              </m.li>
            ))}
          </m.ul>

          <div className="nx-quiz__foot">
            {step > 0 ? (
              <button type="button" onClick={back} className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-back">
                <ArrowLeft size={15} aria-hidden="true" /> Back
              </button>
            ) : (
              <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="quiz-skip">
                Skip, and browse every medicine
              </Link>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
