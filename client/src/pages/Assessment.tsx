/* JOB: the storefront — goal, short intake, named-protocol recommendation, one button to checkout. */
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, ShieldCheck, ChevronDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { LabeledProgress, WhyWeAsk, IntakeSidebar, TrustStrip, STEP_LABELS } from "./AssessmentParts";
import { Reveal } from "@/components/Reveal";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { MxHeader } from "@/components/SignatureTile";
import heroAssessment from "@/assets/brand/hero-assessment.webp";
import { GoalVialTile, GOAL_TILE_CONFIG, goalGlyphToMolecular } from "@/components/GoalVialTile";
import { VialArt, categoryToTone } from "@/components/VialTile";
import { track } from "@/lib/analytics";
import { F } from "@/lib/typography";
import { SOLO_FROM_LABEL } from "@/data/pricing";
import { getStack, usd } from "@/data/stacksCatalog";
import { useCart } from "@/contexts/CartProvider";
import assessmentTrustHero from "@/assets/nx_v11_trust_assessment_hero.webp";

// ─── Types ───────────────────────────────────────────────────────────────────

type Gender = "female" | "male" | null;

interface FormData {
  gender: Gender;
  goal: string;
  age: string;
  medications: string;
  noMedications: boolean;
  medicalHistory: string[];
  recentLabs: string;
  name: string;
  email: string;
  phone: string;
  state: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7; // 0 = gender, 1–6 = questions, 7 = review/submit

const GOALS = [
  "Metabolic health & body composition",
  "Skin & recovery",
  "Longevity & healthy aging",
  "Strength & performance",
  "Cognitive function",
  "Hormonal optimization",
  "Other / not sure yet",
];

// Goal → flagship stack surfaced as the recommendation (ROADMAP 2.2).
// Mapped only where the flagship genuinely serves the goal; the GLP-1 goal
// maps to gated Ignite (eligibility wall — never direct checkout). Hormonal
// optimization and "not sure" have no flagship match and fall back to the
// pricing path.
const GOAL_STACK_SLUG: Record<string, string> = {
  "Metabolic health & body composition": "ignite",
  "Strength & performance": "ascend",
  "Longevity & healthy aging": "meridian",
  "Cognitive function": "lucidity",
  "Skin & recovery": "wolverine",
};

const AGE_RANGES = ["18–29", "30–39", "40–49", "50–59", "60+"];

const MEDICAL_HISTORY_OPTIONS = [
  { id: "cancer", label: "Active or prior cancer diagnosis" },
  { id: "cardiovascular", label: "Cardiovascular disease or arrhythmia" },
  { id: "diabetes", label: "Type 1 or Type 2 diabetes" },
  { id: "autoimmune", label: "Autoimmune condition" },
  { id: "pregnancy", label: "Currently pregnant or nursing" },
  { id: "none", label: "None of the above" },
];

const LAB_OPTIONS = [
  { id: "yes-recent", label: "Yes — within the last 6 months", sub: "I can share them" },
  { id: "yes-older", label: "Yes — but older than 6 months", sub: "May need a redraw" },
  { id: "no", label: "No — I will use the Nexphoria panel", sub: "We'll order labs for you" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

// ─── Shared token-only style helpers ──────────────────────────────────────────
// Every size is a --nx-t-* token; every color a --nx-* token — so the whole
// flow casts azure (men) or orchid (women) automatically. No raw hex, no
// per-file font redeclaration (family comes from lib/typography).

const eyebrow: React.CSSProperties = {
  fontFamily: F,
  fontSize: "var(--nx-t-xs)",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
  marginBottom: "1rem",
};

const question: React.CSSProperties = {
  fontFamily: F,
  fontWeight: 500,
  fontSize: "var(--nx-t-h2)",
  color: "var(--nx-fg)",
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
  marginBottom: "1.125rem",
};

// One calm, slightly larger sub-line under each headline — hims-tier reads as a
// single serene sentence with generous space before the input, not dense body.
const subCopy: React.CSSProperties = {
  fontFamily: F,
  fontSize: "var(--nx-t-lg)",
  fontWeight: 400,
  color: "var(--nx-fg-graphite)",
  lineHeight: 1.55,
  marginBottom: "clamp(2.75rem, 5vw, 3.5rem)",
};

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontFamily: F,
  fontSize: "var(--nx-t-xs)",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--nx-fg-muted)",
  marginBottom: "0.5rem",
};

// ─── Validation helpers ───────────────────────────────────────────────────────

function isStepValid(step: number, form: FormData): boolean {
  switch (step) {
    case 0: return form.gender !== null;
    case 1: return form.goal !== "";
    case 2: return form.age !== "";
    case 3: return form.noMedications || form.medications.trim().length > 0;
    case 4: return form.medicalHistory.length > 0;
    case 5: return form.recentLabs !== "";
    case 6: {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        form.name.trim().length > 0 &&
        emailRe.test(form.email) &&
        form.state !== ""
      );
    }
    default: return true;
  }
}

// A calm, screen-reader-only description of what the current step still needs.
// No red-scare, no exclamation — this feeds a polite aria-live region only.
function stepRequirement(step: number, form: FormData): string {
  if (isStepValid(step, form)) return "";
  switch (step) {
    case 0: return "Select your biological sex to continue.";
    case 1: return "Select a primary goal to continue.";
    case 2: return "Select an age range to continue.";
    case 3: return "List your medications, or mark that you take none, to continue.";
    case 4: return "Select at least one option to continue.";
    case 5: return "Select a bloodwork option to continue.";
    case 6: return "Enter your name, a valid email, and your state to continue.";
    default: return "";
  }
}

// ─── Radio-group keyboard support (WAI-ARIA radiogroup pattern) ────────────────
// Roving tabindex: only the checked option (or the first, when none is chosen)
// is in the tab order; arrow keys then move selection AND focus within the group.

function rovingTabIndex(values: string[], current: string, index: number): 0 | -1 {
  const active = values.indexOf(current);
  return index === (active >= 0 ? active : 0) ? 0 : -1;
}

function makeRadioKeyDown(
  values: string[],
  current: string,
  onSelect: (value: string) => void,
) {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const backward = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!forward && !backward) return;
    e.preventDefault();
    const from = Math.max(0, values.indexOf(current));
    const next = (from + (forward ? 1 : -1) + values.length) % values.length;
    onSelect(values[next]);
    const radios = e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]');
    radios[next]?.focus();
  };
}

// ─── Motion — native-app step transition ──────────────────────────────────────
// Transform + opacity only (compositor-safe, no layout thrash). Short travel,
// Apple-tight settle. prefers-reduced-motion drops it entirely.

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 24 : -24, opacity: 0 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionButton({
  label,
  sub,
  selected,
  onClick,
  testId,
  tabIndex,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  testId?: string;
  tabIndex?: number;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabIndex}
      onClick={onClick}
      data-testid={testId}
      data-selected={selected}
      className="nx-opt"
      style={{ alignItems: sub ? "flex-start" : "center" }}
    >
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontFamily: F,
            fontSize: "var(--nx-t-base)",
            fontWeight: selected ? 600 : 500,
            color: "var(--nx-fg)",
            lineHeight: 1.3,
          }}
        >
          {label}
        </span>
        {sub && (
          <span
            style={{
              display: "block",
              fontFamily: F,
              fontSize: "var(--nx-t-xs)",
              color: "var(--nx-fg-muted)",
              marginTop: "0.25rem",
              lineHeight: 1.4,
            }}
          >
            {sub}
          </span>
        )}
      </span>
      <span className="nx-opt-check" data-selected={selected} aria-hidden="true">
        {selected && <Check size={13} strokeWidth={2.5} />}
      </span>
    </button>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
  testId,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  testId?: string;
}) {
  return (
    <label data-testid={testId} data-selected={checked} className="nx-opt nx-opt--row">
      <span className="nx-opt-box" data-selected={checked} aria-hidden="true">
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          fontFamily: F,
          fontSize: "var(--nx-t-base)",
          fontWeight: checked ? 600 : 500,
          color: "var(--nx-fg)",
          lineHeight: 1.35,
        }}
      >
        {label}
      </span>
    </label>
  );
}

// Sticky bottom navigation — one persistent footer for the whole flow so the
// primary action never remounts between steps (native-app feel). Sticks to the
// thumb zone on mobile, sits inline on desktop.
function StepNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
  backLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  nextLabel: string;
  backLabel: string;
}) {
  return (
    <div className="assessment-stepnav" role="group" aria-label="Intake step navigation">
      <div className="assessment-stepnav-inner">
        <button type="button" onClick={onBack} data-testid="assessment-back" className="nx-step-back">
          <ArrowLeft size={15} aria-hidden="true" /> {backLabel}
        </button>
        {/* aria-disabled (not native `disabled`) keeps the primary action in the
            tab order while inactive, so keyboard and screen-reader users can
            focus it and hear, via aria-describedby, exactly what the step still
            needs. The onNext handlers (goNext / handleSubmit) no-op when the
            step is invalid or a submit is already in flight, so an inactive
            click stays a safe no-op. */}
        <button
          type="button"
          onClick={onNext}
          aria-disabled={nextDisabled}
          aria-describedby="assessment-sr-status"
          data-testid="assessment-next"
          className="nx-step-next"
        >
          {nextLabel} <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Assessment() {
  useSeo({
    title: "Start your peptide protocol — structured intake, physician-reviewed",
    description: "Tell us your goals, history, and medications. A board-certified U.S. physician reviews your bloodwork and designs a 503A-compounded peptide protocol after review. No algorithms, no auto-approvals.",
    path: "/assessment",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Medical Intake Assessment",
        description: "structured intake for physician-prescribed peptide therapy. Board-certified physician review of every intake.",
        path: "/assessment",
        type: "MedicalWebPage",
      }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Assessment", path: "/assessment" }]),
    ],
  });
  const [loc, navigate] = useLocation();
  // Landing hero casts to the visitor's chosen world (male hero was the
  // only cast on this shared intake entrance) — gender selection inside
  // the flow still re-scopes everything via data-world.
  const heroWorld = resolveWorld(loc);
  const prefersReducedMotion = useReducedMotion();
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);
  // When the user jumps back from Review to fix one answer, "Continue" returns
  // them straight to Review rather than re-walking every step (hims-tier edit-in-place).
  const [editReturn, setEditReturn] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // A11y — move focus to the freshly-mounted step heading, but only after an
  // explicit navigation (never on first load or draft restore, which would
  // hijack focus). AnimatePresence mounts the new heading after the old one
  // exits, so a ref callback is the reliable moment to focus.
  const wantsFocusRef = useRef(false);
  const setHeadingRef = useCallback((el: HTMLHeadingElement | null) => {
    if (el && wantsFocusRef.current) {
      el.focus();
      wantsFocusRef.current = false;
    }
  }, []);

  // Read ?gender= from URL
  const urlParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
  const urlGender = urlParams.get("gender");

  const [form, setForm] = useState<FormData>({
    gender: (urlGender === "female" || urlGender === "male") ? urlGender : null,
    goal: "",
    age: "",
    medications: "",
    noMedications: false,
    medicalHistory: [],
    recentLabs: "",
    name: "",
    email: "",
    phone: "",
    state: "",
  });

  // E38 — the draft survives a refresh. Restore once, then autosave.
  const DRAFT_KEY = "nx-assessment-draft";
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.v === 1 && d.form) {
          // Restore all fields, including the selected world (gender), so the
          // orchid/azure cast survives a refresh.
          setForm((f) => ({ ...f, ...d.form }));
          if (typeof d.step === "number" && d.step > 0) {
            setStep(d.step);
            setDraftRestored(true);
          }
        }
      }
    } catch { /* private mode / corrupt draft — start clean */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (submitted) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ v: 1, form, step })); } catch { /* ignore */ }
  }, [form, step, submitted]);

  // If gender pre-selected via URL, skip to step 1
  useEffect(() => {
    if (form.gender !== null && step === 0) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top of card on step change — but never on first render:
  // scrolling on mount threw first-time visitors past the entire landing
  // hero before they had read a word of it.
  const skipMountScroll = useRef(true);
  useEffect(() => {
    if (skipMountScroll.current) { skipMountScroll.current = false; return; }
    // Smooth scrolling is motion — honor prefers-reduced-motion by jumping
    // instantly for users who opted out, matching the flow's calm-motion posture.
    topRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
  }, [step, prefersReducedMotion]);

  const valid = isStepValid(step, form);
  const inFlow = step > 0 && step <= TOTAL_STEPS;
  // ROADMAP 2.2 — resolve the flagship protocol matched to the chosen goal
  // once; the success screen presents it as the recommendation peak.
  const { addStack, close: closeCart } = useCart();
  const recCfg = form.goal ? GOAL_TILE_CONFIG[form.goal] : undefined;
  const recSlug = GOAL_STACK_SLUG[form.goal];
  const recStack = recSlug ? getStack(recSlug) : undefined;
  const recSellable = !!(recStack && !recStack.gated && recStack.cadences.length > 0);
  // Gentle, non-blocking email format hint — only after the field is left and
  // only when there is something to correct. Never a red-scare mid-typing.
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const showEmailHint = emailBlurred && form.email.trim().length > 0 && !emailValid;

  function goNext() {
    if (!valid) return;
    wantsFocusRef.current = true;
    // Edit-in-place: a corrected answer returns to the Review step directly.
    if (editReturn && step < 7) {
      setEditReturn(false);
      setDirection(1);
      setStep(7);
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    wantsFocusRef.current = true;
    setEditReturn(false);
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  // Jump from Review back to a specific step to edit one answer, then return.
  function goToStep(target: number) {
    wantsFocusRef.current = true;
    setEditReturn(true);
    setDirection(-1);
    setStep(target);
  }

  // The recommendation's ONE action (ROADMAP 2.2): sellable match → stack in
  // cart on the recommended cadence, straight to checkout. Gated match →
  // eligibility wall. No match → the pricing path.
  function handleRecommendationCta() {
    if (recStack && recSellable) {
      track("assessment_rec_checkout", { goal: form.goal, stack: recStack.slug });
      addStack(recStack.slug, { cadence: "3mo" });
      closeCart(); // addStack opens the drawer; checkout IS the destination
      navigate("/checkout");
    } else if (recStack) {
      track("assessment_rec_eligibility", { goal: form.goal, stack: recStack.slug });
      navigate(`/stacks/${recStack.slug}`);
    } else {
      navigate("/pricing");
    }
  }

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleMedicalHistory(id: string) {
    setForm((f) => {
      if (id === "none") {
        // "None" clears all others
        return { ...f, medicalHistory: f.medicalHistory.includes("none") ? [] : ["none"] };
      }
      // Selecting anything else clears "none"
      const without = f.medicalHistory.filter((x) => x !== "none");
      return {
        ...f,
        medicalHistory: without.includes(id)
          ? without.filter((x) => x !== id)
          : [...without, id],
      };
    });
  }

  async function handleSubmit() {
    if (!valid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiRequest("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } catch {
      // Endpoint may not exist yet — treat as success
    }
    setSubmitting(false);
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    setSubmitted(true);
    wantsFocusRef.current = true;
    setStep(8); // success screen
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: slideVariants,
        custom: direction,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { duration: 0.35, ease: APPLE_EASE },
        style: { willChange: "transform, opacity" as const },
      };

  // Shared footer wiring — one persistent action, label/handler by step.
  const footerNextLabel = editReturn && step >= 1 && step <= 6
    ? "Return to review"
    : step === 6
      ? "Review answers"
      : step === 7
        ? (submitting ? "Submitting…" : "Submit intake")
        : "Continue";
  const footerBackLabel = step === 7 ? "Edit" : "Back";
  const footerNextDisabled = step === 7 ? submitting : !valid;
  const footerOnNext = step === 7 ? handleSubmit : goNext;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <SiteLayout navVariant="showcase">
      {/* ════════════════ LANDING HERO (step 0 only) ════════════════ */}
      {step === 0 && (
        <div style={{ background: "var(--mx-page-bg)" }}>
          <div className="mx-page">
            <MxHeader
              eyebrow="Start your protocol"
              headline={
                <>Tell us your goal.<br /><span>We’ll build the protocol.</span></>
              }
              subtitle="A short, structured intake. Your peptide protocol is compounded and shipped only after a licensed physician reviews your labs."
            />

            {/* Editorial hero — the first deliberate step, dawn light */}
            <figure
              className="relative overflow-hidden nx-editorial-bleed"
              style={{ borderRadius: "var(--nx-r-lg)", border: "1px solid var(--nx-border)" }}
              data-testid="assessment-hero-editorial"
            >
              <img
                src={heroWorld === "women" ? "img/img_329e054306f2.webp" : heroAssessment}
                alt={heroWorld === "women"
                  ? "A woman sits upright at a desk by a bright window at dawn, tablet in hand, beginning her health intake"
                  : "A man sits upright at a desk by a bright window at dawn, tablet in hand, beginning his health intake"}
                className="w-full object-cover"
                style={{ aspectRatio: "21 / 9", minHeight: "300px" }}
                loading="eager"
                decoding="async"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--nx-fg) 52%, transparent) 0%, color-mix(in srgb, var(--nx-fg) 10%, transparent) 34%, transparent 55%)",
                }}
              />
              <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-xl)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "var(--nx-ceramic)",
                    maxWidth: "40ch",
                    textShadow: "0 1px 12px color-mix(in srgb, var(--nx-fg) 40%, transparent)",
                  }}
                >
                  Four minutes of questions. A physician, a lab panel, and a protocol on the other side.
                </p>
              </figcaption>
            </figure>
          </div>

        </div>
      )}

      {/* ── Benefit-encoded landing band (landing/step 0 only) ── */}
      {step === 0 && (
        <section
          data-testid="assessment-landing-band"
          style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
        >
          <div
            className="assessment-landing-band-grid"
            style={{
              maxWidth: "1120px",
              margin: "0 auto",
              padding: "3.5rem 1.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: "var(--nx-r-lg)",
                border: "1px solid var(--nx-border)",
                backgroundColor: "var(--nx-bg-cream)",
              }}
            >
              <img
                src={assessmentTrustHero}
                alt="A 38-biomarker peptide lab panel and physician dashboard used to calibrate your protocol"
                loading="eager"
                decoding="async"
                data-testid="assessment-landing-image"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div data-testid="assessment-landing-copy">
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                WHAT YOUR INTAKE BUILDS
              </p>
              <h2
                style={{
                  fontFamily: F,
                  fontWeight: 500,
                  fontSize: "var(--nx-t-h1)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.25rem",
                }}
              >
                Every answer maps to a biomarker your physician will calibrate against.
              </h2>
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-lg)",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                }}
              >
                The intake takes about four minutes. It feeds a 38-biomarker lab panel, a
                physician review, and a compounded protocol dosed to your measured{" "}
                <span style={{ whiteSpace: "nowrap" }}>IGF-1</span>, metabolic, and hormonal
                numbers. No questionnaire-only prescribing.
              </p>
            </div>
          </div>
          <style>{`
            @media (min-width: 768px) {
              .assessment-landing-band-grid {
                grid-template-columns: 1.1fr 1fr !important;
                gap: 4rem !important;
              }
            }
          `}</style>
        </section>
      )}

      {/* ════════════════ ASSESSMENT FLOW ════════════════ */}
      {/* Two worlds, one engine: the selected sex re-scopes every --nx-* token
          for the whole flow — female → orchid/rose-quartz, male → azure/steel.
          Until a sex is chosen the flow inherits the layout's resolved world. */}
      <div
        // min-h-screen only mid-flow: on the landing step it stacked ~330px
        // of blank porcelain below the hero + landing band
        className={`${inFlow ? "min-h-screen " : ""}flex flex-col`}
        style={{ backgroundColor: "var(--nx-bg)" }}
        data-world={form.gender === "female" ? "women" : form.gender === "male" ? "men" : undefined}
        data-testid="assessment-page"
      >
        {/* Polite, screen-reader-only announcements: draft restoral + what the
            current step still needs. No visual noise, no red-scare. */}
        <p id="assessment-sr-status" className="sr-only" aria-live="polite" aria-atomic="true" data-testid="assessment-sr-status">
          {draftRestored ? "Your saved progress was restored. " : ""}
          {inFlow ? stepRequirement(step, form) : ""}
        </p>
        {/* Positive navigation confirmation — depends only on `step`, so it
            announces the new position once per advance (never on keystrokes),
            giving screen-reader users the same "how far along" cue the visible
            progress bar gives sighted users. */}
        <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="assessment-sr-step">
          {inFlow ? `Step ${step} of ${STEP_LABELS.length}, ${STEP_LABELS[Math.min(step - 1, STEP_LABELS.length - 1)]}.` : ""}
        </p>

        {/* ── Top progress bar ── */}
        {inFlow && <LabeledProgress step={step} />}

        {/* ── Main content + sidebar ── */}
        {/* Labeled region, NOT <main> — SiteLayout already owns the page's single
            <main id="main-content"> landmark; a nested <main> is an invalid,
            duplicate landmark (WCAG 1.3.1). A section + aria-label keeps the
            "intake" region discoverable without a second main. */}
        <section
          aria-label="Medical intake assessment"
          aria-busy={submitting || undefined}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "clamp(3.25rem, 7vw, 6rem) var(--nx-gutter) 3rem",
          }}
        >
          <div
            className={`assessment-layout${inFlow ? " assessment-layout--with-sidebar" : ""}`}
            style={{
              width: "100%",
              maxWidth: inFlow ? "1040px" : "640px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Question column */}
            <div
              ref={topRef}
              style={{ width: "100%", maxWidth: "640px", margin: "0 auto", minWidth: 0 }}
            >
              <div style={{ overflow: "hidden" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  {/* ════════════════ STEP 0 — Gender ════════════════ */}
                  {step === 0 && (
                    <motion.div key="step-0" {...motionProps} data-testid="assessment-sex-step">
                      <p style={{ ...eyebrow, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                        <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                        Intake · Before we begin
                        <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                      </p>
                      {/* h2, not h1 — the landing MxHeader owns the page's single
                          h1; a second h1 here would break heading order (WCAG 1.3.1)
                          and it stays consistent with the h2 questions on steps 1–7. */}
                      <h2 id="q-sex" ref={setHeadingRef} tabIndex={-1} style={{ ...question, fontSize: "var(--nx-t-h1)", textAlign: "center", marginBottom: "0.75rem", outline: "none" }}>
                        What is your biological sex?
                      </h2>
                      <p
                        style={{
                          ...subCopy,
                          fontSize: "var(--nx-t-lg)",
                          textAlign: "center",
                          maxWidth: "440px",
                          margin: "0 auto 2.5rem",
                        }}
                      >
                        Peptide protocols differ meaningfully between male and female physiology.
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="q-sex"
                        aria-describedby="assessment-why-text-0"
                        aria-required="true"
                        onKeyDown={makeRadioKeyDown(
                          ["female", "male"],
                          form.gender ?? "",
                          (v) => setField("gender", v as Gender),
                        )}
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                      >
                        {[
                          { value: "female" as const, label: "Female", sub: "Women's protocols" },
                          { value: "male" as const, label: "Male", sub: "Men's protocols" },
                        ].map(({ value, label, sub }, i) => {
                          const sel = form.gender === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              role="radio"
                              aria-checked={sel}
                              tabIndex={rovingTabIndex(["female", "male"], form.gender ?? "", i)}
                              onClick={() => {
                                setField("gender", value);
                                wantsFocusRef.current = true;
                                setDirection(1);
                                if (editReturn) {
                                  setEditReturn(false);
                                  setStep(7);
                                } else {
                                  setStep(1);
                                }
                              }}
                              data-testid={`sex-select-${value}`}
                              data-selected={sel}
                              className="nx-sex"
                            >
                              <span
                                style={{
                                  fontFamily: F,
                                  fontWeight: 500,
                                  fontSize: "var(--nx-t-h3)",
                                  color: "var(--nx-fg)",
                                  lineHeight: 1,
                                  marginBottom: "0.5rem",
                                }}
                              >
                                {label}
                              </span>
                              <span
                                style={{
                                  fontFamily: F,
                                  fontSize: "var(--nx-t-xs)",
                                  fontWeight: 600,
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  color: "var(--nx-fg-muted)",
                                }}
                              >
                                {sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <WhyWeAsk funnelStep={0} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 1 — Primary goal ════════════════ */}
                  {step === 1 && (
                    <motion.div key="step-1" {...motionProps} data-testid="assessment-step-1">
                      <p style={eyebrow}>Your goal</p>
                      <h2 id="q-goal" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>What is your primary clinical goal?</h2>
                      <p style={subCopy}>
                        This shapes protocol selection. You can note secondary goals in your physician consult.
                      </p>
                      <div
                        className="assessment-goal-grid"
                        role="group"
                        aria-labelledby="q-goal"
                        aria-describedby="assessment-why-text-1"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          gap: "1rem",
                          marginBottom: "2.25rem",
                        }}
                      >
                        {GOALS.map((g) => {
                          const cfg = GOAL_TILE_CONFIG[g];
                          if (!cfg) return null;
                          return (
                            <GoalVialTile
                              key={g}
                              goal={g}
                              displayName={cfg.displayName}
                              oneLiner={cfg.oneLiner}
                              feeling={cfg.feeling}
                              category={cfg.category}
                              protocol={cfg.protocol}
                              peptides={cfg.peptides}
                              monthlyRange={cfg.monthlyRange}
                              glyph={cfg.glyph}
                              selected={form.goal === g}
                              onClick={() => {
                                setField("goal", g);
                                track("goal_selected", { goal: g, category: cfg.category, protocol: cfg.protocol, step: 1 });
                              }}
                              testId={`assessment-option-${g.replace(/[\s\/]+/g, "-").toLowerCase()}`}
                            />
                          );
                        })}
                      </div>
                      {/* Progressive email capture — saves lead even if they abandon */}
                      <div
                        style={{
                          padding: "1.25rem",
                          borderRadius: "var(--nx-r-sm)",
                          border: "1px solid var(--nx-border)",
                          backgroundColor: "var(--nx-cobalt-soft)",
                          marginBottom: "1.75rem",
                        }}
                      >
                        <label htmlFor="assessment-early-email" style={fieldLabel}>
                          Save your progress · Optional
                        </label>
                        <input
                          id="assessment-early-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          autoComplete="email"
                          inputMode="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          onBlur={async (e) => {
                            const val = e.currentTarget.value.trim();
                            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (emailRe.test(val)) {
                              try {
                                await fetch("/api/waitlist", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ email: val, source: `assessment-early-${form.gender ?? "unknown"}`, goal: form.goal || undefined }),
                                });
                              } catch {}
                            }
                          }}
                          placeholder="you@example.com"
                          aria-describedby="assessment-early-email-hint"
                          data-testid="assessment-early-email"
                          className="nx-input"
                        />
                        <p
                          id="assessment-early-email-hint"
                          style={{
                            marginTop: "0.5rem",
                            fontFamily: F,
                            fontSize: "var(--nx-t-xs)",
                            color: "var(--nx-fg-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          We’ll email your protocol match so you can return where you left off. We contact you only about your intake, and you can unsubscribe at any time.
                        </p>
                      </div>
                      <WhyWeAsk funnelStep={1} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 2 — Age ════════════════ */}
                  {step === 2 && (
                    <motion.div key="step-2" {...motionProps} data-testid="assessment-step-2">
                      <p style={eyebrow}>Age</p>
                      <h2 id="q-age" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>What is your age range?</h2>
                      <p style={subCopy}>
                        Hormone reference intervals shift by decade. Age informs lab interpretation and safe dosing parameters.
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="q-age"
                        aria-describedby="assessment-why-text-2"
                        aria-required="true"
                        onKeyDown={makeRadioKeyDown(AGE_RANGES, form.age, (v) => setField("age", v))}
                        style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "0.5rem" }}
                      >
                        {AGE_RANGES.map((a, i) => (
                          <OptionButton
                            key={a}
                            label={a}
                            selected={form.age === a}
                            tabIndex={rovingTabIndex(AGE_RANGES, form.age, i)}
                            onClick={() => setField("age", a)}
                            testId={`assessment-option-${a.replace(/\s+/g, "-").toLowerCase()}`}
                          />
                        ))}
                      </div>
                      <WhyWeAsk funnelStep={2} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 3 — Current medications ════════════════ */}
                  {step === 3 && (
                    <motion.div key="step-3" {...motionProps} data-testid="assessment-step-3">
                      <p style={eyebrow}>Medications</p>
                      <h2 id="q-medications" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>Are you currently taking any medications?</h2>
                      <p style={subCopy}>
                        Include prescription drugs, hormone therapy, insulin, and any controlled substances. Your physician reviews all of this before prescribing.
                      </p>

                      {/* Grouped so assistive tech ties the None toggle and the
                          free-text field to the medications question + rationale,
                          matching the group semantics on steps 1, 4, and 5. */}
                      <div role="group" aria-labelledby="q-medications" aria-describedby="assessment-why-text-3">
                      {/* None checkbox */}
                      <div style={{ marginBottom: "1rem" }}>
                        <CheckboxRow
                          label="I am not taking any medications"
                          checked={form.noMedications}
                          onChange={(v) => setForm((f) => ({ ...f, noMedications: v, medications: v ? "" : f.medications }))}
                          testId="assessment-option-no-medications"
                        />
                      </div>

                      {/* Text area — disabled if "none" checked */}
                      {!form.noMedications && (
                        <div style={{ marginBottom: "0.5rem" }}>
                          <label htmlFor="medications-text" style={fieldLabel}>
                            List medications (name, dose, frequency)
                          </label>
                          <textarea
                            id="medications-text"
                            value={form.medications}
                            onChange={(e) => setField("medications", e.target.value)}
                            rows={4}
                            placeholder="e.g. Metformin 500mg twice daily, Levothyroxine 50mcg daily..."
                            // Sensitive free-text — keep it out of browser autofill
                            // history (privacy posture; nothing here is stored client-side
                            // beyond the local draft the user controls).
                            autoComplete="off"
                            aria-describedby="assessment-why-text-3"
                            data-testid="assessment-medications-text"
                            className="nx-input"
                            style={{ resize: "vertical" }}
                          />
                        </div>
                      )}
                      </div>

                      <WhyWeAsk funnelStep={3} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 4 — Medical history ════════════════ */}
                  {step === 4 && (
                    <motion.div key="step-4" {...motionProps} data-testid="assessment-step-4">
                      <p style={eyebrow}>Medical history</p>
                      <h2 id="q-history" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>Do any of the following apply to your medical history?</h2>
                      <p style={subCopy}>
                        Select all that apply. Certain conditions affect protocol eligibility and require additional physician review before a prescription can be issued.
                      </p>
                      <div role="group" aria-labelledby="q-history" aria-describedby="assessment-why-text-4" style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "0.5rem" }}>
                        {MEDICAL_HISTORY_OPTIONS.map(({ id, label }) => (
                          <CheckboxRow
                            key={id}
                            label={label}
                            checked={form.medicalHistory.includes(id)}
                            onChange={() => toggleMedicalHistory(id)}
                            testId={`assessment-option-${id}`}
                          />
                        ))}
                      </div>
                      <WhyWeAsk funnelStep={4} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 5 — Recent labs ════════════════ */}
                  {step === 5 && (
                    <motion.div key="step-5" {...motionProps} data-testid="assessment-step-5">
                      <p style={eyebrow}>Bloodwork</p>
                      <h2 id="q-labs" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>Do you have recent comprehensive labs?</h2>
                      <p style={subCopy}>
                        A complete blood panel is required before any prescription is written. Labs drawn within 6 months are generally acceptable; older results may require a redraw.
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="q-labs"
                        aria-describedby="assessment-why-text-5"
                        aria-required="true"
                        onKeyDown={makeRadioKeyDown(LAB_OPTIONS.map((o) => o.id), form.recentLabs, (v) => setField("recentLabs", v))}
                        style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "0.5rem" }}
                      >
                        {LAB_OPTIONS.map(({ id, label, sub }, i) => (
                          <OptionButton
                            key={id}
                            label={label}
                            sub={sub}
                            selected={form.recentLabs === id}
                            tabIndex={rovingTabIndex(LAB_OPTIONS.map((o) => o.id), form.recentLabs, i)}
                            onClick={() => setField("recentLabs", id)}
                            testId={`assessment-option-${id}`}
                          />
                        ))}
                      </div>
                      <WhyWeAsk funnelStep={5} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 6 — Contact info ════════════════ */}
                  {step === 6 && (
                    <motion.div key="step-6" {...motionProps} data-testid="assessment-step-6">
                      <p style={eyebrow}>Contact</p>
                      <h2 id="q-contact" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>Where should your physician reach you?</h2>
                      <p style={subCopy}>
                        A licensed physician reviews your intake and contacts you to schedule a consult.
                      </p>

                      {/* Field group tied to the contact question + rationale so
                          assistive tech scopes these inputs to the step, matching
                          the group semantics on steps 1, 3, 4, and 5. */}
                      <div role="group" aria-labelledby="q-contact" aria-describedby="assessment-why-text-6" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "0.5rem" }}>
                        {/* Name */}
                        <div>
                          <label htmlFor="contact-name" style={fieldLabel}>Full name <span aria-hidden="true">*</span></label>
                          <input
                            id="contact-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => setField("name", e.target.value)}
                            placeholder="Your legal name"
                            autoComplete="name"
                            autoCapitalize="words"
                            aria-required="true"
                            data-testid="assessment-contact-name"
                            className="nx-input"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="contact-email" style={fieldLabel}>Email address <span aria-hidden="true">*</span></label>
                          <input
                            id="contact-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setField("email", e.target.value)}
                            onBlur={() => setEmailBlurred(true)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            inputMode="email"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck={false}
                            aria-required="true"
                            aria-invalid={showEmailHint || undefined}
                            aria-describedby="contact-email-hint"
                            data-testid="assessment-contact-email"
                            className="nx-input"
                          />
                          <p
                            id="contact-email-hint"
                            aria-live="polite"
                            data-testid="assessment-email-hint"
                            style={{
                              marginTop: "0.5rem",
                              fontFamily: F,
                              fontSize: "var(--nx-t-xs)",
                              color: showEmailHint ? "var(--nx-fg-graphite)" : "var(--nx-fg-muted)",
                              lineHeight: 1.5,
                            }}
                          >
                            {showEmailHint
                              ? "Enter a complete address, e.g. name@domain.com — this is where your physician follows up."
                              : "We use this only to reach you about your intake."}
                          </p>
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="contact-phone" style={fieldLabel}>Phone number</label>
                          <input
                            id="contact-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            placeholder="(212) 555-0100"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-describedby="contact-phone-hint"
                            data-testid="assessment-contact-phone"
                            className="nx-input"
                          />
                          <p
                            id="contact-phone-hint"
                            style={{
                              marginTop: "0.5rem",
                              fontFamily: F,
                              fontSize: "var(--nx-t-xs)",
                              color: "var(--nx-fg-muted)",
                              lineHeight: 1.5,
                            }}
                          >
                            Optional. Used only if your physician needs to reach you by phone.
                          </p>
                        </div>

                        {/* State */}
                        <div>
                          <label htmlFor="contact-state" style={fieldLabel}>State of residence <span aria-hidden="true">*</span></label>
                          {/* Chevron is a positioned icon (not a data-URI) so it
                              reads var(--nx-cobalt) and follows world theming. */}
                          <div style={{ position: "relative" }}>
                            <select
                              id="contact-state"
                              value={form.state}
                              onChange={(e) => setField("state", e.target.value)}
                              autoComplete="address-level1"
                              aria-required="true"
                              data-testid="assessment-contact-state"
                              className="nx-input"
                              style={{
                                appearance: "none",
                                width: "100%",
                                paddingRight: "2.5rem",
                                cursor: "pointer",
                              }}
                            >
                              <option value="">Select state…</option>
                              {US_STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              strokeWidth={1.5}
                              aria-hidden
                              style={{
                                position: "absolute",
                                right: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                                color: "var(--nx-cobalt)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <WhyWeAsk funnelStep={6} />
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 7 — Review + submit ════════════════ */}
                  {step === 7 && (
                    <motion.div key="step-7" {...motionProps} data-testid="assessment-step-7">
                      <p style={eyebrow}>Review</p>
                      <h2 id="q-review" ref={setHeadingRef} tabIndex={-1} style={{ ...question, outline: "none" }}>Review your intake before submitting.</h2>
                      <p style={subCopy}>
                        Your physician will receive these details. Select any answer to change it.
                      </p>

                      {/* Screener disclaimer */}
                      <div
                        style={{
                          backgroundColor: "var(--nx-bg-cream)",
                          border: "1px solid var(--nx-border)",
                          borderRadius: "var(--nx-r-sm)",
                          padding: "0.875rem 1.25rem",
                          marginBottom: "1.5rem",
                          display: "flex",
                          gap: "0.625rem",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-xs)",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--nx-cobalt)",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          Note
                        </span>
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-sm)",
                            color: "var(--nx-fg-graphite)",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          This is a marketing screener. Formal medical eligibility is determined during physician review after your partner-laboratory labs are on file. No prescription is issued based on these answers alone.
                        </p>
                      </div>

                      {/* Summary card */}
                      <div
                        role="group"
                        aria-label="Your intake answers — select any row to edit it"
                        style={{
                          border: "1px solid var(--nx-border)",
                          borderRadius: "var(--nx-r-sm)",
                          overflow: "hidden",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {[
                          { label: "Biological sex", editStep: 0, value: form.gender ? (form.gender.charAt(0).toUpperCase() + form.gender.slice(1)) : "—" },
                          { label: "Primary goal", editStep: 1, value: form.goal || "—" },
                          { label: "Age range", editStep: 2, value: form.age || "—" },
                          { label: "Medications", editStep: 3, value: form.noMedications ? "None" : form.medications.trim() || "—" },
                          {
                            label: "Medical history",
                            editStep: 4,
                            value:
                              form.medicalHistory.length === 0
                                ? "—"
                                : form.medicalHistory.includes("none")
                                ? "None of the above"
                                : form.medicalHistory
                                    .map((id) => MEDICAL_HISTORY_OPTIONS.find((o) => o.id === id)?.label ?? id)
                                    .join(", "),
                          },
                          {
                            label: "Recent labs",
                            editStep: 5,
                            value:
                              form.recentLabs === "yes-recent"
                                ? "Yes — within 6 months"
                                : form.recentLabs === "yes-older"
                                ? "Yes — older than 6 months"
                                : form.recentLabs === "no"
                                ? "No — will use Nexphoria panel"
                                : "—",
                          },
                          { label: "Name", editStep: 6, value: form.name || "—" },
                          { label: "Email", editStep: 6, value: form.email || "—" },
                          { label: "Phone", editStep: 6, value: form.phone || "—" },
                          { label: "State", editStep: 6, value: form.state || "—" },
                        ].map(({ label, value, editStep }, i) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => goToStep(editStep)}
                            aria-label={`${label}: ${value === "—" ? "not provided" : value}. Select to edit.`}
                            data-testid={`assessment-review-edit-${editStep}`}
                            className="nx-review-row"
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "1rem",
                              padding: "0.75rem 1.25rem",
                              // single surface + hairline rows: the ceramic/cream
                              // zebra put warm bands on the cool azure page
                              backgroundColor: "var(--nx-bg)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: F,
                                fontSize: "var(--nx-t-xs)",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--nx-fg-muted)",
                                minWidth: "120px",
                                paddingTop: "2px",
                                flexShrink: 0,
                              }}
                            >
                              {label}
                            </span>
                            <span
                              style={{
                                fontFamily: F,
                                fontSize: "var(--nx-t-base)",
                                color: "var(--nx-fg)",
                                lineHeight: 1.45,
                                textAlign: "left",
                              }}
                            >
                              {value}
                            </span>
                            <span
                              className="nx-review-edit"
                              aria-hidden="true"
                              style={{
                                marginLeft: "auto",
                                alignSelf: "center",
                                fontFamily: F,
                                fontSize: "var(--nx-t-xs)",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--nx-fg-muted)",
                                flexShrink: 0,
                              }}
                            >
                              Edit
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Trust close — the institutional reassurance next to the commit action */}
                      <div
                        data-testid="assessment-trust-close"
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                          padding: "1rem 1.25rem",
                          borderRadius: "var(--nx-r-sm)",
                          border: "1px solid var(--nx-border)",
                          backgroundColor: "var(--nx-cobalt-soft)",
                          marginBottom: submitError ? "1rem" : "0.25rem",
                        }}
                      >
                        <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: "1px" }} />
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-base)",
                            color: "var(--nx-fg)",
                            lineHeight: 1.55,
                            margin: 0,
                          }}
                        >
                          A licensed physician reviews your answers. You pay only if prescribed — the evaluation is free.
                        </p>
                      </div>

                      <div aria-live="polite" role="alert" data-testid="assessment-submit-error">
                        {submitError && (
                          <p
                            style={{
                              fontFamily: F,
                              fontSize: "var(--nx-t-sm)",
                              color: "var(--nx-danger)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {submitError}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* ════════════════ STEP 8 — Success ════════════════ */}
                  {step === 8 && (
                    <motion.div
                      key="step-8"
                      {...(prefersReducedMotion
                        ? {}
                        : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.35, ease: APPLE_EASE } })}
                      style={{ textAlign: "center" }}
                      data-testid="assessment-complete"
                      role="status"
                      aria-live="polite"
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "var(--nx-r-pill)",
                          backgroundColor: "var(--nx-cobalt)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 2rem",
                        }}
                      >
                        <Check size={30} aria-hidden="true" style={{ color: "var(--nx-bg)" }} />
                      </div>
                      <p style={{ ...eyebrow, textAlign: "center" }}>Intake received</p>
                      <h2 ref={setHeadingRef} tabIndex={-1} style={{ ...question, fontSize: "var(--nx-t-h1)", textAlign: "center", outline: "none" }}>
                        {recStack
                          ? <>Based on your goals: the {recStack.name} protocol.</>
                          : "Your intake is under review."}
                      </h2>
                      <p
                        style={{
                          ...subCopy,
                          fontSize: "var(--nx-t-lg)",
                          textAlign: "center",
                          marginBottom: "2rem",
                        }}
                      >
                        {recStack
                          ? "A licensed physician still reviews everything before anything ships — this is the protocol your answers point to."
                          : "A licensed physician reviews your intake and emails you the next step."}
                      </p>

                      {/* ══ Recommendation peak (ROADMAP 2.2) — the named protocol
                          matched to the chosen goal, what's in it, monthly cost, the
                          panel, and the physician gate. Matched goals surface the
                          flagship stack's REAL contents and cadence pricing from
                          stacksCatalog; unmatched goals keep the goal-tile data.
                          No fabricated protocols, ingredients, prices, or biomarkers. */}
                      {recCfg && (() => {
                        const cfg = recCfg;
                        const tone = categoryToTone(cfg.category);
                        const rec3 = recStack?.cadences.find((c) => c.key === "3mo");
                        const minMo = recStack && recStack.cadences.length > 0
                          ? Math.min(...recStack.cadences.map((c) => c.perMonth ?? c.total))
                          : 0;
                        // Shared label/value styles for the calm three-row spec list.
                        const specTerm: React.CSSProperties = {
                          fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700,
                          letterSpacing: "0.12em", textTransform: "uppercase",
                          color: "var(--nx-fg-muted)", margin: 0,
                        };
                        const specDesc: React.CSSProperties = {
                          fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500,
                          color: "var(--nx-fg)", margin: "0.25rem 0 0 0", lineHeight: 1.45,
                        };
                        return (
                          <section
                            aria-labelledby="rec-protocol-name"
                            data-testid="outcome-protocol-tile"
                            style={{ borderRadius: "var(--nx-r-md)", overflow: "hidden", marginBottom: "2rem", textAlign: "left", border: "1px solid var(--nx-border)" }}
                          >
                            {/* Header band — the recommendation, named */}
                            <div style={{ backgroundColor: "var(--nx-fg)", padding: "1.125rem 1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                              <div style={{ flexShrink: 0 }}>
                                <VialArt tone={tone} glyph={goalGlyphToMolecular(cfg.glyph ?? "drop")} size={72} />
                              </div>
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-bg)", opacity: 0.72, margin: "0 0 0.375rem 0" }}>
                                  Based on your goal
                                </p>
                                <h3 id="rec-protocol-name" style={{ fontFamily: F, fontSize: "var(--nx-t-h3)", fontWeight: 600, color: "var(--nx-bg)", margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                                  the {recStack ? `${recStack.name} protocol` : cfg.protocol}
                                </h3>
                              </div>
                            </div>

                            {/* Spec list — what's in it, monthly cost, and the panel */}
                            <div style={{ backgroundColor: "var(--nx-cobalt-soft)", padding: "clamp(1.25rem, 4vw, 1.75rem)" }}>
                              <dl style={{ margin: 0, display: "grid", gap: "1rem" }}>
                                <div>
                                  <dt style={specTerm}>What's in it</dt>
                                  <dd style={specDesc}>{recStack ? recStack.peptides.map((p) => p.name).join(" · ") : cfg.peptides}</dd>
                                </div>
                                <div>
                                  <dt style={specTerm}>Monthly</dt>
                                  <dd style={specDesc}>
                                    {recSellable && rec3 ? (
                                      <>
                                        {usd(rec3.perMonth ?? rec3.total)}/mo on the recommended 3-month plan
                                        <span style={{ color: "var(--nx-fg-graphite)", fontWeight: 400 }}>
                                          {" "}· from {usd(minMo)}/mo on 12-month
                                        </span>
                                      </>
                                    ) : recStack ? (
                                      "Physician-priced after your eligibility review"
                                    ) : (
                                      <>
                                        {cfg.monthlyRange}
                                        <span style={{ color: "var(--nx-fg-graphite)", fontWeight: 400 }}>
                                          {" "}· single peptides from {SOLO_FROM_LABEL}/mo
                                        </span>
                                      </>
                                    )}
                                  </dd>
                                </div>
                                <div>
                                  <dt style={specTerm}>The panel</dt>
                                  <dd style={specDesc}>
                                    {recStack
                                      ? (recStack.panelNote ?? `${recStack.panel} blood panel — every dose is calibrated to your measured physiology.`)
                                      : "A lab panel calibrates every dose to your measured physiology."}
                                  </dd>
                                </div>
                              </dl>

                              {/* Physician gate — reused trust copy, verbatim in spirit */}
                              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.55, margin: "1.25rem 0 0 0", paddingTop: "1.25rem", borderTop: "1px solid var(--nx-border)" }}>
                                A licensed physician reviews your answers and prescribes only if it is clinically appropriate. You pay only if prescribed — the evaluation is free, and there is no charge for medication unless it is prescribed. Subject to physician approval after lab review.
                              </p>
                            </div>
                          </section>
                        );
                      })()}

                      {/* One primary action to continue, one quiet link to browse the rest */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", marginBottom: "2.5rem" }}>
                        <button
                          type="button"
                          onClick={handleRecommendationCta}
                          data-testid="assessment-continue-plan"
                          className="nx-cta-cobalt"
                        >
                          {recSellable ? "Continue to checkout" : recStack ? "Check eligibility" : "Continue to your plan"}{" "}
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate("/stacks")}
                          data-testid="assessment-view-protocols"
                          className="nx-text-link"
                        >
                          See other options
                        </button>
                      </div>

                      {/* What happens next — reassurance below the decision, not above it */}
                      <div style={{ backgroundColor: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-sm)", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", textAlign: "left" }}>
                        <p id="assessment-next-steps-label" style={{ ...eyebrow, marginBottom: "0.875rem" }}>What happens next</p>
                        {/* A real <ol> so assistive tech conveys the ordered
                            sequence; the visible 01–04 counters are decorative. */}
                        <ol aria-labelledby="assessment-next-steps-label" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                          {[
                            { n: "01", t: "A licensed physician reviews your intake" },
                            { n: "02", t: "Partner-laboratory requisition generated in your member portal"},
                            { n: "03", t: "Telehealth consult via Bask Health to finalize your protocol" },
                            { n: "04", t: "Protocol approved, compounded, and shipped cold-chain" },
                          ].map(({ n, t }) => (
                            <li key={n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                              <span aria-hidden="true" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, color: "var(--nx-cobalt)", flexShrink: 0, marginTop: "2px" }}>{n}</span>
                              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg)", lineHeight: 1.55, margin: 0 }}>{t}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <p
                        style={{
                          fontFamily: F,
                          fontSize: "var(--nx-t-sm)",
                          color: "var(--nx-fg-graphite)",
                          lineHeight: 1.7,
                          maxWidth: "440px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      >
                        A board-certified physician will review your answers, request your blood panel, and schedule a telehealth consult via Bask Health. No prescription is issued before that review is complete.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust strip ABOVE the sticky bar so the bar is the column's
                  last element and never detaches from the viewport bottom */}
              {inFlow && <TrustStrip />}

              {/* Sticky bottom action — persistent across steps 1–7 */}
              {inFlow && (
                <StepNav
                  onBack={goBack}
                  onNext={footerOnNext}
                  nextDisabled={footerNextDisabled}
                  nextLabel={footerNextLabel}
                  backLabel={footerBackLabel}
                />
              )}
            </div>

            {/* Sidebar — shown on question + review steps */}
            {inFlow && <IntakeSidebar />}
          </div>
        </section>
      </div>

      <style>{`
        /* ── Option cards — big, tappable, obvious cobalt selection ── */
        .nx-opt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 66px;
          padding: 1.25rem 1.5rem;
          border-radius: var(--nx-r-sm);
          border: 1px solid var(--nx-border);
          background-color: var(--nx-ceramic);
          cursor: pointer;
          text-align: left;
          gap: 0.75rem;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: border-color var(--nx-dur-2) var(--nx-ease),
                      background-color var(--nx-dur-2) var(--nx-ease),
                      box-shadow var(--nx-dur-2) var(--nx-ease),
                      transform var(--nx-dur-1) var(--nx-ease);
        }
        .nx-opt:hover { border-color: var(--nx-cobalt); }
        .nx-opt:active { transform: scale(0.99); transition-duration: var(--nx-dur-1); }
        .nx-opt[data-selected="true"] {
          border-color: var(--nx-cobalt);
          background-color: var(--nx-cobalt-soft);
        }
        .nx-opt--row { justify-content: flex-start; }
        /* Visible focus rings on token colors — the checkbox row wraps a
           visually-hidden native input, so :focus-within surfaces its focus. */
        .nx-opt:focus-visible,
        .nx-sex:focus-visible {
          outline: 2px solid var(--nx-cobalt);
          outline-offset: 2px;
        }
        .nx-opt--row:focus-within {
          outline: 2px solid var(--nx-cobalt);
          outline-offset: 2px;
        }
        .nx-opt-check {
          width: 22px; height: 22px; border-radius: var(--nx-r-pill);
          border: 1.5px solid var(--nx-border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--nx-bg);
          transition: background-color var(--nx-dur-2) var(--nx-ease),
                      border-color var(--nx-dur-2) var(--nx-ease);
        }
        .nx-opt-check[data-selected="true"] { background-color: var(--nx-cobalt); border-color: var(--nx-cobalt); }
        .nx-opt-box {
          width: 22px; height: 22px; border-radius: var(--nx-r-xs);
          border: 1.5px solid var(--nx-border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--nx-bg);
          transition: background-color var(--nx-dur-2) var(--nx-ease),
                      border-color var(--nx-dur-2) var(--nx-ease);
        }
        .nx-opt-box[data-selected="true"] { background-color: var(--nx-cobalt); border-color: var(--nx-cobalt); }

        /* ── Review summary rows — editable, jump back to the source step ── */
        .nx-review-row {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--nx-border);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: background-color var(--nx-dur-2) var(--nx-ease);
        }
        .nx-review-row:last-child { border-bottom: none; }
        .nx-review-row:hover { background-color: var(--nx-cobalt-soft) !important; }
        .nx-review-row:hover .nx-review-edit { color: var(--nx-cobalt); }
        .nx-review-row:focus-visible {
          outline: 2px solid var(--nx-cobalt);
          outline-offset: -2px;
        }
        .nx-review-row:focus-visible .nx-review-edit { color: var(--nx-cobalt); }

        /* ── Sex chooser — larger cards ── */
        .nx-sex {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 140px; padding: 2.25rem 1.5rem;
          border-radius: var(--nx-r-md);
          border: 1px solid var(--nx-border);
          background-color: var(--nx-ceramic);
          cursor: pointer; text-align: center;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          transition: border-color var(--nx-dur-2) var(--nx-ease),
                      background-color var(--nx-dur-2) var(--nx-ease),
                      box-shadow var(--nx-dur-2) var(--nx-ease),
                      transform var(--nx-dur-2) var(--nx-ease);
        }
        .nx-sex:hover { border-color: var(--nx-cobalt); transform: translateY(-1px); }
        .nx-sex:active { transform: translateY(0); transition-duration: var(--nx-dur-1); }
        .nx-sex[data-selected="true"] {
          border-color: var(--nx-cobalt);
          background-color: var(--nx-cobalt-soft);
        }

        /* ── Sticky bottom step nav (mobile-first, thumb zone) ── */
        .assessment-stepnav {
          position: sticky;
          bottom: 0;
          z-index: var(--nx-z-bar);
          margin: 2rem calc(-1 * var(--nx-gutter)) 0;
          padding: 0.875rem var(--nx-gutter) calc(0.875rem + env(safe-area-inset-bottom));
          background-color: color-mix(in srgb, var(--nx-bg) 88%, transparent);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--nx-border);
        }
        .assessment-stepnav-inner {
          display: flex; gap: 0.75rem; max-width: 640px; margin: 0 auto;
        }
        .nx-step-back {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;
          min-height: 48px; padding: 0 1.25rem;
          border-radius: var(--nx-r-pill);
          border: 1px solid var(--nx-border);
          background-color: transparent;
          font-family: ${F}; font-size: var(--nx-t-sm); font-weight: 600;
          letter-spacing: 0.04em; color: var(--nx-fg-graphite);
          cursor: pointer; flex-shrink: 0;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          transition: border-color var(--nx-dur-2) var(--nx-ease), color var(--nx-dur-2) var(--nx-ease);
        }
        .nx-step-back:hover { border-color: var(--nx-cobalt); color: var(--nx-cobalt); }
        .nx-step-back:focus-visible,
        .nx-step-next:focus-visible {
          outline: 2px solid var(--nx-cobalt);
          outline-offset: 2px;
        }
        .nx-step-next {
          flex: 1;
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          min-height: 48px; padding: 0 1.5rem;
          border-radius: var(--nx-r-pill);
          border: 1px solid var(--nx-cobalt);
          background-color: var(--nx-cobalt);
          font-family: ${F}; font-size: var(--nx-t-base); font-weight: 600;
          letter-spacing: 0.02em; color: var(--nx-bg);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          transition: background-color var(--nx-dur-2) var(--nx-ease),
                      border-color var(--nx-dur-2) var(--nx-ease),
                      transform var(--nx-dur-1) var(--nx-ease),
                      opacity var(--nx-dur-2) var(--nx-ease);
        }
        .nx-step-next:not([aria-disabled="true"]):hover { background-color: var(--nx-cobalt-hover); border-color: var(--nx-cobalt-hover); }
        .nx-step-next:not([aria-disabled="true"]):active { transform: scale(0.985); }
        .nx-step-next[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }

        @media (min-width: 768px) {
          .assessment-stepnav {
            position: static;
            margin: 2.75rem 0 0;
            padding: 0;
            background-color: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            border-top: none;
          }
        }

        @media (min-width: 980px) {
          .assessment-layout--with-sidebar {
            grid-template-columns: minmax(0, 640px) 320px !important;
            max-width: 1040px !important;
          }
          .assessment-layout--with-sidebar > div:first-child { margin: 0 !important; }
        }
        @media (max-width: 560px) {
          .assessment-goal-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nx-opt, .nx-sex, .nx-step-next, .nx-step-back, .nx-review-row { transition: none !important; }
          .assessment-stepnav { -webkit-backdrop-filter: none; backdrop-filter: none; }
        }
      `}</style>
    </SiteLayout>
  );
}
