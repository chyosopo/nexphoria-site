import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/Logo";

type Sex = "female" | "male" | null;

interface BaseQuestion {
  id: string;
  question: string;
  sub?: string;
  type: "single" | "multi" | "text";
  options?: string[];
}

const femaleQuestions: BaseQuestion[] = [
  {
    id: "age",
    question: "How old are you?",
    sub: "Age influences hormone baselines and protocol selection.",
    type: "single",
    options: ["21–29", "30–39", "40–49", "50–59", "60+"],
  },
  {
    id: "goal",
    question: "What's your primary goal?",
    sub: "We'll build your protocol around this.",
    type: "single",
    options: [
      "Weight loss & body composition",
      "Hormonal balance",
      "Skin & recovery",
      "Longevity & anti-aging",
      "Energy & cognition",
      "Better sleep",
    ],
  },
  {
    id: "health",
    question: "Any current health conditions or medications?",
    sub: "Your physician reviews all of this — honesty helps.",
    type: "single",
    options: [
      "None",
      "Thyroid condition",
      "Cardiovascular",
      "Diabetes / metabolic",
      "Other (I'll specify in notes)",
    ],
  },
  {
    id: "labs",
    question: "Have you had comprehensive labs in the last 6 months?",
    sub: "Labs are required before any prescription is written.",
    type: "single",
    options: [
      "Yes — I can share them",
      "No — I'll do the Nexphoria panel",
      "Not sure",
    ],
  },
];

const maleQuestions: BaseQuestion[] = [
  {
    id: "age",
    question: "How old are you?",
    sub: "Age influences hormone baselines and protocol selection.",
    type: "single",
    options: ["21–29", "30–39", "40–49", "50–59", "60+"],
  },
  {
    id: "goal",
    question: "What's your primary goal?",
    sub: "We'll build your protocol around this.",
    type: "single",
    options: [
      "Weight loss & body composition",
      "Muscle & performance",
      "Testosterone optimization",
      "Longevity & anti-aging",
      "Recovery & repair",
      "Energy & cognition",
    ],
  },
  {
    id: "health",
    question: "Any current health conditions or medications?",
    sub: "Your physician reviews all of this — honesty helps.",
    type: "single",
    options: [
      "None",
      "Cardiovascular",
      "Diabetes / metabolic",
      "On TRT or hormone therapy",
      "Other (I'll specify in notes)",
    ],
  },
  {
    id: "labs",
    question: "Have you had comprehensive labs in the last 6 months?",
    sub: "Labs are required before any prescription is written.",
    type: "single",
    options: [
      "Yes — I can share them",
      "No — I'll do the Nexphoria panel",
      "Not sure",
    ],
  },
];

export default function Assessment() {
  const [sex, setSex] = useState<Sex>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [complete, setComplete] = useState(false);
  const [, navigate] = useLocation();

  const questions = sex === "female" ? femaleQuestions : maleQuestions;
  const totalSteps = questions.length;
  const progressPct = sex === null ? 0 : Math.round(((step + 1) / (totalSteps + 1)) * 100);

  const handleSexSelect = (s: "female" | "male") => {
    setSex(s);
    setStep(0);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      setSex(null);
    }
  };

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="assessment-page"
    >
      {/* ── Minimal nav ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2rem",
          borderBottom: "1px solid var(--nx-border)",
        }}
      >
        <Logo variant="dark" />
        {sex !== null && !complete && (
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
            STEP {step + 2} / {totalSteps + 1}
          </p>
        )}
      </header>

      {/* ── Progress bar ── */}
      {sex !== null && !complete && (
        <div
          style={{
            height: "2px",
            backgroundColor: "var(--nx-border)",
          }}
        >
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

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem 5rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "560px" }}>

          {/* ── Step 0: Sex selection ── */}
          {sex === null && (
            <div data-testid="assessment-sex-step">
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1.25rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                STEP 01
                <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              </p>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.15,
                  marginBottom: "0.75rem",
                  textAlign: "center",
                }}
              >
                What's your biological sex?
              </h1>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "#4A4A4A",
                  lineHeight: 1.6,
                  marginBottom: "2.5rem",
                  textAlign: "center",
                  maxWidth: "380px",
                  margin: "0 auto 2.5rem",
                }}
              >
                Peptide protocols are calibrated to your biology.
                Your answer determines which protocol paths we show you.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { value: "female" as const, label: "Female", sub: "Protocols for women" },
                  { value: "male" as const, label: "Male", sub: "Protocols for men" },
                ].map(({ value, label, sub }) => (
                  <button
                    key={value}
                    onClick={() => handleSexSelect(value)}
                    data-testid={`sex-select-${value}`}
                    style={{
                      padding: "2.5rem 1.5rem",
                      borderRadius: "4px",
                      border: "1.5px solid var(--nx-border)",
                      backgroundColor: "#FFFFFF",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--nx-cobalt)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--nx-border)";
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "2rem",
                        color: "var(--nx-fg)",
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
                        color: "var(--nx-fg-muted)",
                      }}
                    >
                      {sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Steps 1-N ── */}
          {sex !== null && !complete && currentQuestion && (
            <div data-testid={`assessment-step-${step + 1}`}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1.25rem",
                }}
              >
                STEP {String(step + 2).padStart(2, "0")} / {String(totalSteps + 1).padStart(2, "0")}
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.2,
                  marginBottom: currentQuestion.sub ? "0.5rem" : "2rem",
                }}
              >
                {currentQuestion.question}
              </h2>
              {currentQuestion.sub && (
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.5,
                    marginBottom: "2rem",
                  }}
                >
                  {currentQuestion.sub}
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
                {currentQuestion.options?.map((option) => {
                  const selected = currentAnswer === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(currentQuestion.id, option)}
                      data-testid={`assessment-option-${option.replace(/\s+/g, "-").toLowerCase()}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 1.25rem",
                        borderRadius: "4px",
                        border: selected ? "2px solid var(--nx-cobalt)" : "1px solid var(--nx-border)",
                        backgroundColor: selected ? "var(--nx-cobalt-soft)" : "#FFFFFF",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "border-color 0.15s, background-color 0.15s",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "15px",
                          fontWeight: selected ? 600 : 400,
                          color: selected ? "var(--nx-cobalt)" : "var(--nx-fg)",
                        }}
                      >
                        {option}
                      </span>
                      {selected && (
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "var(--nx-cobalt)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Check size={11} style={{ color: "#FFFFFF" }} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={handleBack}
                  data-testid="assessment-back"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.875rem 1.25rem",
                    borderRadius: "100px",
                    border: "1px solid var(--nx-border)",
                    backgroundColor: "transparent",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg-muted)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <ArrowLeft size={13} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  data-testid="assessment-next"
                  style={{
                    flex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 1.5rem",
                    borderRadius: "100px",
                    border: "none",
                    backgroundColor: currentAnswer ? "var(--nx-cobalt)" : "#D1D5DB",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    cursor: currentAnswer ? "pointer" : "not-allowed",
                    transition: "background-color 0.2s",
                  }}
                >
                  {step < totalSteps - 1 ? "CONTINUE" : "SEE MY RESULTS"}{" "}
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* ── Complete ── */}
          {complete && (
            <div
              style={{ textAlign: "center" }}
              data-testid="assessment-complete"
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "var(--nx-cobalt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 2rem",
                }}
              >
                <Check size={28} style={{ color: "#FFFFFF" }} />
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
                INTAKE COMPLETE
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                }}
              >
                We're reviewing your answers.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "#4A4A4A",
                  lineHeight: 1.7,
                  maxWidth: "400px",
                  margin: "0 auto 2.5rem",
                }}
              >
                Your physician will receive your intake, request your blood panel, and reach out
                within 24 hours to schedule your consult.
              </p>
              <button
                onClick={() => navigate(sex === "female" ? "/women" : "/men")}
                data-testid="assessment-view-protocols"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "var(--nx-cobalt)",
                  color: "#FFFFFF",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.875rem 2rem",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                VIEW {sex === "female" ? "WOMEN'S" : "MEN'S"} PROTOCOLS →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
