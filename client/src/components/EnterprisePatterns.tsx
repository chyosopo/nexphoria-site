/* ═══ ENTERPRISE PATTERNS — shared hims/hundred/rythm-grade building blocks ═══
   Thin React wrappers over the V1 pattern-library CSS (index.css .nx-trust-*,
   .nx-steps-lg, .nx-faq-*, .nx-mini-*, .nx-biochip*). Consumed by every page
   after the world homes so the visual grammar is identical everywhere and each
   page's own JSX stays small (concurrent-agent-safe) and token-pure — all
   visual weight lives in CSS, inline styles are var(--nx-*)-only. Truth in
   every trust claim: the credential row states only what is true of Nexphoria. */
import { Link } from "wouter";
import {
  Stethoscope, FlaskConical, ClipboardCheck, Activity, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";

/* The four credentials that are TRUE for Nexphoria — no invented CLIA/FDA/CAP. */
export const TRUST_BADGES: { Icon: LucideIcon; label: string }[] = [
  { Icon: Stethoscope, label: "U.S.-licensed physicians" },
  { Icon: FlaskConical, label: "State-licensed 503A pharmacy" },
  { Icon: ClipboardCheck, label: "Prescription required" },
  { Icon: Activity, label: "Lab-monitored every 90 days" },
];

/** Calm quiet credential row — drop under any hero. TRUE claims only. */
export function TrustStrip({ testid = "trust-strip" }: { testid?: string }) {
  return (
    <div className="nx-trust-strip" data-testid={testid}>
      {TRUST_BADGES.map(({ Icon, label }) => (
        <div key={label} className="nx-trust-badge">
          <Icon size={18} strokeWidth={1.8} aria-hidden />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Section eyebrow + big serene headline + optional lead — hundred header grammar. */
export function SectionHead({
  eyebrow, title, lead, center = false, maxTitle = "18ch",
}: { eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; center?: boolean; maxTitle?: string }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginInline: center ? "auto" : undefined, maxWidth: center ? "60ch" : undefined }}>
      {eyebrow && (
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginTop: eyebrow ? "0.8rem" : 0, lineHeight: 1.1, letterSpacing: "-0.015em", maxWidth: center ? undefined : maxTitle, marginInline: center ? "auto" : undefined }}>
        {title}
      </h2>
      {lead && (
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1.1rem", maxWidth: "52ch", marginInline: center ? "auto" : undefined }}>
          {lead}
        </p>
      )}
    </div>
  );
}

/** Big airy numbered steps — hundred "How it works". Large numerals, hairline rule. */
export function NumberedSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="nx-steps-lg">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 70}>
          <div>
            <span className="nx-step-lg-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="nx-step-lg-rule" />
            <h3 className="nx-step-lg-title">{s.title}</h3>
            <p className="nx-step-lg-body">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Clean spacious FAQ accordion — native <details>, smooth reveal. */
export function FaqAccordion({ items, openFirst = true }: { items: { q: string; a: React.ReactNode }[]; openFirst?: boolean }) {
  return (
    <div>
      {items.map((item, i) => (
        <details key={item.q} className="nx-faq-item" open={openFirst && i === 0}>
          <summary>
            <span>{item.q}</span>
            <span className="nx-faq-plus" aria-hidden />
          </summary>
          <p className="nx-faq-a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Clinical-standard proof strip — a quiet standards statement, never a fabricated person. */
export function ProofStrip({ quote, attr, style }: { quote: string; attr: string; style?: React.CSSProperties }) {
  return (
    <div className="nx-proof" style={style}>
      <p className="nx-proof-quote">{quote}</p>
      <p className="nx-proof-attr">{attr}</p>
    </div>
  );
}

/** Abstract result-dashboard mockup — pure token geometry, no PHI, illustrative. */
export function DashboardMockup({
  title = "Biomarker index — retest trend",
  bars = [44, 58, 52, 71, 66, 88],
  rows = [
    { k: "Markers in optimal range", v: "61 / 76" },
    { k: "Biological age vs. chronological", v: "−3.4 yrs" },
  ],
  caption = "Illustrative — not a patient record",
}: {
  title?: string;
  bars?: number[];
  rows?: { k: string; v: string }[];
  caption?: string;
}) {
  return (
    <div className="nx-mini-panel" aria-hidden>
      <div className="nx-mini-head">
        <span className="nx-mini-title">{title}</span>
        <span className="nx-mini-pill">Sample</span>
      </div>
      <div className="nx-mini-bars">
        {bars.map((h, i) => (
          <div key={i} className={`nx-mini-bar${i === bars.length - 1 ? " hi" : ""}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.k} className="nx-mini-row">
          <span>{r.k}</span>
          <b>{r.v}</b>
        </div>
      ))}
      <div className="nx-mini-row">
        <span className="nx-mini-cap">{caption}</span>
      </div>
    </div>
  );
}

/** Inline "learn more" arrow link — one calm CTA per section. */
export function TextCta({ href, children, testid }: { href: string; children: React.ReactNode; testid?: string }) {
  return (
    <Link
      href={href}
      data-testid={testid}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}
    >
      {children}
      <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
    </Link>
  );
}
