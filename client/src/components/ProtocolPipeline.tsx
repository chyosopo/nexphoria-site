/* ═══ PROTOCOL PIPELINE — FLAGSHIP-REBUILD P1/P4 · Seed's numbered-stage
   grammar: how a protocol is DECIDED, 01→05, laid out like a research
   paper's method. Rigor communicated by structure. Reusable across the
   world home, /science, and /how-it-works. Tokens only; both worlds theme
   through --nx-cobalt. No claims — describes the process, which is true. */
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";

export interface PipelineStage {
  index: string; // "01"
  title: string;
  body: string;
}

/** The canonical five stages — the medical engine, in order. */
export const PROTOCOL_STAGES: PipelineStage[] = [
  { index: "01", title: "Intake", body: "A structured history — goals, training, medications, prior labs. Read by a person, not scored by a form." },
  { index: "02", title: "Panel", body: "Baseline bloodwork across eleven systems establishes the biology a protocol has to answer to." },
  { index: "03", title: "Physician", body: "A board-certified, U.S.-licensed physician reviews both, prescribes only what the numbers justify — and can decline." },
  { index: "04", title: "Compounding", body: "If prescribed, a state-licensed 503A pharmacy prepares it under USP <797> and ships it cold-chain." },
  { index: "05", title: "Retest", body: "The same markers are re-drawn every 90 days. The physician reads the trend and adjusts, holds, or stops." },
];

export function ProtocolPipeline({
  eyebrow = "The medical engine",
  heading = "How a protocol is decided.",
  stages = PROTOCOL_STAGES,
  testId = "protocol-pipeline",
}: {
  eyebrow?: string;
  heading?: string;
  stages?: PipelineStage[];
  testId?: string;
}) {
  return (
    <div data-testid={testId}>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "-0.015em", marginTop: "0.6rem", maxWidth: "20ch" }}>
        {heading}
      </h2>
      <ol className="nx-pipeline">
        {stages.map((s, i) => (
          <Reveal key={s.index} delay={i * 70}>
            <li className="nx-pipeline__stage">
              <span className="nx-pipeline__idx" aria-hidden style={{ fontFamily: F, fontVariantNumeric: "tabular-nums" }}>{s.index}</span>
              <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.6rem" }}>{s.title}</h3>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
