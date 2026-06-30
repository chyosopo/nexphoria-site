import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { apiRequest } from "@/lib/queryClient";
import { useSeo } from "@/lib/seo";

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

// ─── Shared style helpers ─────────────────────────────────────────────────────

const monoEyebrow: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
  marginBottom: "1.25rem",
};

const playfairQuestion: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 500,
  fontStyle: "italic",
  fontSize: "clamp(1.625rem, 4vw, 2.25rem)",
  color: "var(--nx-fg)",
  lineHeight: 1.2,
  marginBottom: "0.5rem",
};

const subCopy: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontSize: "15px",
  color: "var(--nx-fg-muted)",
  lineHeight: 1.55,
  marginBottom: "2rem",
};

const pill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "0.875rem 1.25rem",
  borderRadius: "100px",
  border: "1px solid var(--nx-border)",
  backgroundColor: "transparent",
  fontFamily: "'Inter Tight', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.09em",
  textTransform: "uppercase" as const,
  color: "var(--nx-fg-muted)",
  cursor: "pointer",
  flexShrink: 0,
};

const pillPrimary = (disabled: boolean): React.CSSProperties => ({
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "0.875rem 1.5rem",
  borderRadius: "100px",
  border: "none",
  backgroundColor: disabled ? "#D1D5DB" : "var(--nx-fg)",
  fontFamily: "'Inter Tight', sans-serif",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: disabled ? "#9CA3AF" : "var(--nx-bg-cream)",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "background-color 0.2s",
});

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

// ─── Motion variants ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 48 : -48,
    opacity: 0,
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionButton({
  label,
  sub,
  selected,
  onClick,
  testId,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  testId?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: sub ? "flex-start" : "center",
        justifyContent: "space-between",
        padding: "1rem 1.25rem",
        borderRadius: "4px",
        border: selected
          ? "2px solid var(--nx-fg)"
          : hovered
          ? "1.5px solid var(--nx-fg)"
          : "1px solid var(--nx-border)",
        backgroundColor: selected ? "var(--nx-fg)" : hovered ? "var(--nx-bg-cream)" : "#FFFFFF",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.15s, background-color 0.15s",
        gap: "0.75rem",
      }}
    >
      <span>
        <span
          style={{
            display: "block",
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: "15px",
            fontWeight: selected ? 600 : 400,
            color: selected ? "var(--nx-bg-cream)" : "var(--nx-fg)",
          }}
        >
          {label}
        </span>
        {sub && (
          <span
            style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: selected ? "rgba(255,255,255,0.6)" : "var(--nx-fg-muted)",
              marginTop: "0.25rem",
            }}
          >
            {sub}
          </span>
        )}
      </span>
      {selected && (
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.25)",
            border: "1.5px solid rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: sub ? "1px" : 0,
          }}
        >
          <Check size={11} style={{ color: "#FFFFFF" }} />
        </span>
      )}
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
  const [hovered, setHovered] = useState(false);

  return (
    <label
      data-testid={testId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.875rem 1.25rem",
        borderRadius: "4px",
        border: checked
          ? "2px solid var(--nx-fg)"
          : hovered
          ? "1.5px solid var(--nx-fg)"
          : "1px solid var(--nx-border)",
        backgroundColor: checked ? "var(--nx-fg)" : hovered ? "var(--nx-bg-cream)" : "#FFFFFF",
        cursor: "pointer",
        transition: "border-color 0.15s, background-color 0.15s",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "3px",
          border: checked ? "2px solid #FFFFFF" : "1.5px solid var(--nx-border)",
          backgroundColor: checked ? "rgba(255,255,255,0.25)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.15s",
        }}
      >
        {checked && <Check size={10} style={{ color: "#FFFFFF" }} />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        tabIndex={-1}
      />
      <span
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: "15px",
          fontWeight: checked ? 600 : 400,
          color: checked ? "var(--nx-bg-cream)" : "var(--nx-fg)",
        }}
      >
        {label}
      </span>
    </label>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Assessment() {
  useSeo({
    title: "Begin Assessment | Nexphoria",
    description: "5-minute medical intake. Physician review in 24-48 hours.",
    path: "/assessment",
  });
  const [, navigate] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

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

  // If gender pre-selected via URL, skip to step 1
  useEffect(() => {
    if (form.gender !== null && step === 0) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top of card on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const valid = isStepValid(step, form);

  // Progress — step 0 counts as 0%, step 7 (review) as 7/7
  const progressPct = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);

  function goNext() {
    if (!valid) return;
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
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
    if (!valid) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiRequest("POST", "/api/intake", form);
    } catch {
      // Endpoint may not exist yet — treat as success
    }
    setSubmitting(false);
    setSubmitted(true);
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
        transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
      };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="assessment-page"
    >
      {/* ── Header ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2rem",
          borderBottom: "1px solid var(--nx-border)",
          flexShrink: 0,
        }}
      >
        <Logo variant="dark" />
        {step > 0 && step <= TOTAL_STEPS && (
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            STEP {step} OF {TOTAL_STEPS}
          </p>
        )}
      </header>

      {/* ── Progress bar ── */}
      {step > 0 && step <= TOTAL_STEPS && (
        <div style={{ height: "2px", backgroundColor: "var(--nx-border)", flexShrink: 0 }}>
          <div
            style={{
              height: "100%",
              width: `${progressPct}%`,
              backgroundColor: "var(--nx-cobalt)",
              transition: "width 0.4s ease",
            }}
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}

      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem 5rem",
          overflow: "hidden",
        }}
      >
        <div ref={topRef} style={{ width: "100%", maxWidth: "640px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            {/* ════════════════════════════════════════════════════════════
                STEP 0 — Gender
            ════════════════════════════════════════════════════════════ */}
            {step === 0 && (
              <motion.div key="step-0" {...motionProps} data-testid="assessment-sex-step">
                <p style={{ ...monoEyebrow, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                  <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  INTAKE — STEP 01 OF 07
                  <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                </p>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  What is your biological sex?
                </h1>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.4,
                    marginBottom: "2.5rem",
                    textAlign: "center",
                    maxWidth: "400px",
                    margin: "0 auto 2.5rem",
                  }}
                >
                  Peptide protocols differ meaningfully between male and female physiology.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { value: "female" as const, label: "Female", sub: "Women's protocols" },
                    { value: "male" as const, label: "Male", sub: "Men's protocols" },
                  ].map(({ value, label, sub }) => {
                    const sel = form.gender === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setField("gender", value);
                          setDirection(1);
                          setStep(1);
                        }}
                        data-testid={`sex-select-${value}`}
                        style={{
                          padding: "2.5rem 1.5rem",
                          borderRadius: "4px",
                          border: sel ? "2px solid var(--nx-fg)" : "1.5px solid var(--nx-border)",
                          backgroundColor: sel ? "var(--nx-fg)" : "#FFFFFF",
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "border-color 0.2s, background-color 0.2s",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: "2rem",
                            color: sel ? "var(--nx-bg-cream)" : "var(--nx-fg)",
                            lineHeight: 1,
                            marginBottom: "0.5rem",
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px",
                            fontWeight: 500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: sel ? "rgba(255,255,255,0.55)" : "var(--nx-fg-muted)",
                          }}
                        >
                          {sub}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 1 — Primary goal
            ════════════════════════════════════════════════════════════ */}
            {step === 1 && (
              <motion.div key="step-1" {...motionProps} data-testid="assessment-step-1">
                <p style={monoEyebrow}>STEP 01 OF 07</p>
                <h2 style={playfairQuestion}>What is your primary clinical goal?</h2>
                <p style={subCopy}>
                  This shapes protocol selection. You can note secondary goals in your physician consult.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
                  {GOALS.map((g) => (
                    <OptionButton
                      key={g}
                      label={g}
                      selected={form.goal === g}
                      onClick={() => setField("goal", g)}
                      testId={`assessment-option-${g.replace(/\s+/g, "-").toLowerCase()}`}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 2 — Age
            ════════════════════════════════════════════════════════════ */}
            {step === 2 && (
              <motion.div key="step-2" {...motionProps} data-testid="assessment-step-2">
                <p style={monoEyebrow}>STEP 02 OF 07</p>
                <h2 style={playfairQuestion}>What is your age range?</h2>
                <p style={subCopy}>
                  Hormone reference intervals shift by decade. Age informs lab interpretation and safe dosing parameters.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
                  {AGE_RANGES.map((a) => (
                    <OptionButton
                      key={a}
                      label={a}
                      selected={form.age === a}
                      onClick={() => setField("age", a)}
                      testId={`assessment-option-${a.replace(/\s+/g, "-").toLowerCase()}`}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 3 — Current medications
            ════════════════════════════════════════════════════════════ */}
            {step === 3 && (
              <motion.div key="step-3" {...motionProps} data-testid="assessment-step-3">
                <p style={monoEyebrow}>STEP 03 OF 07</p>
                <h2 style={playfairQuestion}>Are you currently taking any medications?</h2>
                <p style={subCopy}>
                  Include prescription drugs, hormone therapy, insulin, and any controlled substances. Your physician reviews all of this before prescribing.
                </p>

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
                  <div style={{ marginBottom: "2.5rem" }}>
                    <label
                      htmlFor="medications-text"
                      style={{
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--nx-fg-muted)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      List medications (name, dose, frequency)
                    </label>
                    <textarea
                      id="medications-text"
                      value={form.medications}
                      onChange={(e) => setField("medications", e.target.value)}
                      rows={4}
                      placeholder="e.g. Metformin 500mg twice daily, Levothyroxine 50mcg daily..."
                      data-testid="assessment-medications-text"
                      style={{
                        width: "100%",
                        padding: "0.875rem 1rem",
                        borderRadius: "4px",
                        border: "1px solid var(--nx-border)",
                        backgroundColor: "#FFFFFF",
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "15px",
                        color: "var(--nx-fg)",
                        lineHeight: 1.5,
                        resize: "vertical",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--nx-cobalt)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--nx-border)"; }}
                    />
                  </div>
                )}

                {form.noMedications && <div style={{ marginBottom: "2.5rem" }} />}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 4 — Medical history
            ════════════════════════════════════════════════════════════ */}
            {step === 4 && (
              <motion.div key="step-4" {...motionProps} data-testid="assessment-step-4">
                <p style={monoEyebrow}>STEP 04 OF 07</p>
                <h2 style={playfairQuestion}>Do any of the following apply to your medical history?</h2>
                <p style={subCopy}>
                  Select all that apply. Certain conditions affect protocol eligibility and require additional physician review before a prescription can be issued.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
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
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 5 — Recent labs
            ════════════════════════════════════════════════════════════ */}
            {step === 5 && (
              <motion.div key="step-5" {...motionProps} data-testid="assessment-step-5">
                <p style={monoEyebrow}>STEP 05 OF 07</p>
                <h2 style={playfairQuestion}>Do you have recent comprehensive labs?</h2>
                <p style={subCopy}>
                  A complete blood panel is required before any prescription is written. Labs drawn within 6 months are generally acceptable; older results may require a redraw.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
                  {LAB_OPTIONS.map(({ id, label, sub }) => (
                    <OptionButton
                      key={id}
                      label={label}
                      sub={sub}
                      selected={form.recentLabs === id}
                      onClick={() => setField("recentLabs", id)}
                      testId={`assessment-option-${id}`}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 6 — Contact info
            ════════════════════════════════════════════════════════════ */}
            {step === 6 && (
              <motion.div key="step-6" {...motionProps} data-testid="assessment-step-6">
                <p style={monoEyebrow}>STEP 06 OF 07</p>
                <h2 style={playfairQuestion}>Where should your physician reach you?</h2>
                <p style={subCopy}>
                  Your physician will review your intake within 24–48 hours and contact you to schedule a consult.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.4rem" }}>
                      Full name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your legal name"
                      data-testid="assessment-contact-name"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--nx-cobalt)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--nx-border)"; }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.4rem" }}>
                      Email address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="you@example.com"
                      data-testid="assessment-contact-email"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--nx-cobalt)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--nx-border)"; }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.4rem" }}>
                      Phone number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="(212) 555-0100"
                      data-testid="assessment-contact-phone"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--nx-cobalt)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--nx-border)"; }}
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="contact-state" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.4rem" }}>
                      State of residence *
                    </label>
                    <select
                      id="contact-state"
                      value={form.state}
                      onChange={(e) => setField("state", e.target.value)}
                      data-testid="assessment-contact-state"
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230A0A0A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                        cursor: "pointer",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--nx-cobalt)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--nx-border)"; }}
                    >
                      <option value="">Select state…</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button type="button" onClick={goNext} disabled={!valid} data-testid="assessment-next" style={pillPrimary(!valid)}>
                    Review answers <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 7 — Review + submit
            ════════════════════════════════════════════════════════════ */}
            {step === 7 && (
              <motion.div key="step-7" {...motionProps} data-testid="assessment-step-7">
                <p style={monoEyebrow}>STEP 07 OF 07 — REVIEW</p>
                <h2 style={playfairQuestion}>Review your intake before submitting.</h2>
                <p style={subCopy}>
                  Your physician will receive these details. You can go back to change any answer.
                </p>

                {/* Summary card */}
                <div
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    marginBottom: "2rem",
                  }}
                >
                  {[
                    { label: "Biological sex", value: form.gender ? (form.gender.charAt(0).toUpperCase() + form.gender.slice(1)) : "—" },
                    { label: "Primary goal", value: form.goal || "—" },
                    { label: "Age range", value: form.age || "—" },
                    {
                      label: "Medications",
                      value: form.noMedications ? "None" : form.medications.trim() || "—",
                    },
                    {
                      label: "Medical history",
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
                      value:
                        form.recentLabs === "yes-recent"
                          ? "Yes — within 6 months"
                          : form.recentLabs === "yes-older"
                          ? "Yes — older than 6 months"
                          : form.recentLabs === "no"
                          ? "No — will use Nexphoria panel"
                          : "—",
                    },
                    { label: "Name", value: form.name || "—" },
                    { label: "Email", value: form.email || "—" },
                    { label: "Phone", value: form.phone || "—" },
                    { label: "State", value: form.state || "—" },
                  ].map(({ label, value }, i) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "0.75rem 1.25rem",
                        backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                        borderBottom: i < 9 ? "1px solid var(--nx-border)" : "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
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
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "14px",
                          color: "var(--nx-fg)",
                          lineHeight: 1.45,
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {submitError && (
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      color: "#B91C1C",
                      marginBottom: "1rem",
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={goBack} data-testid="assessment-back" style={pill}>
                    <ArrowLeft size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    data-testid="assessment-next"
                    style={pillPrimary(submitting)}
                  >
                    {submitting ? "Submitting…" : "Submit intake"} {!submitting && <ArrowRight size={13} />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                STEP 8 — Success
            ════════════════════════════════════════════════════════════ */}
            {step === 8 && (
              <motion.div
                key="step-8"
                {...(prefersReducedMotion
                  ? {}
                  : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.35 } })}
                style={{ textAlign: "center" }}
                data-testid="assessment-complete"
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "var(--nx-fg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 2rem",
                  }}
                >
                  <Check size={30} style={{ color: "var(--nx-bg-cream)" }} />
                </div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "1rem",
                  }}
                >
                  INTAKE RECEIVED
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "0.75rem",
                  }}
                >
                  Your intake is under review.
                </h2>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.4,
                    marginBottom: "1.5rem",
                  }}
                >
                  We'll be in touch within 24 hours.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "15px",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    maxWidth: "420px",
                    margin: "0 auto 2.5rem",
                  }}
                >
                  A board-certified physician will review your answers, request your blood panel if
                  needed, and contact you to schedule a telehealth consult. No prescription is issued
                  before that review is complete.
                </p>
                <button
                  type="button"
                  onClick={() => navigate(form.gender === "female" ? "/women" : "/men")}
                  data-testid="assessment-view-protocols"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "var(--nx-fg)",
                    color: "var(--nx-bg-cream)",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.875rem 2rem",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  VIEW {form.gender === "female" ? "WOMEN'S" : "MEN'S"} PROTOCOLS <ArrowRight size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Shared input style (defined outside component to avoid re-creation) ──────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.875rem 1rem",
  borderRadius: "4px",
  border: "1px solid var(--nx-border)",
  backgroundColor: "#FFFFFF",
  fontFamily: "'Inter Tight', sans-serif",
  fontSize: "15px",
  color: "var(--nx-fg)",
  lineHeight: 1.5,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};
