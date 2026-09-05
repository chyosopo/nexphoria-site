/* ═══ What a peptide does — the three-frame explainer (2026-09-05) ═══
   Chiya: "I wanna learn on the site and immediately know what it can do for
   me, why I need it." Three frames, one sentence of teaching under each:
   the signal (the chain, drawn), the prescription (the vial, rendered in
   the house studio), the blood (the marker chart, drawn). Facts only. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { PeptideChain, MarkerChart } from "@/components/diagrams/Diagrams";
import { SKU_PHOTO } from "@/components/SkuPhoto";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function Explainer() {
  const frames = [
    {
      art: <PeptideChain />,
      t: "A signal you already make.",
      b: "A peptide is a short chain of amino acids, the same building blocks as protein. The body makes thousands of them as messages: release growth hormone tonight, you have eaten enough, repair this tendon.",
    },
    {
      art: <div className="nx-explain__media"><img src={SKU_PHOTO.sermorelin} alt="A Nexphoria vial of sermorelin" loading="lazy" decoding="async" width={1600} height={1600} /></div>,
      t: "The exact one, prescribed.",
      b: "Each medicine here is a precise copy of one of those messages. A licensed U.S. physician reads the health questions and prescribes the one that fits the goal, at a starting dose, compounded to order.",
    },
    {
      art: <MarkerChart />,
      t: "The blood shows it.",
      b: `A ${PANEL_TOTAL_MARKERS}-marker panel is drawn at home before the first dose and again at week ${RETEST_WEEK}. The physician sets the dose from what changed.`,
    },
  ];
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-explain" data-testid="frontdoor-explainer">
      <Reveal>
        <div className="nx-sec-head">
          <p className="nx-eyebrow">What a peptide does</p>
          <h2 id="fd-explain" className="nx-dsh2 nx-shout" style={{ maxWidth: "20ch" }}>The body's own signals. Prescribed.</h2>
          <p className="nx-lede">The whole idea, in three frames.</p>
        </div>
      </Reveal>
      <ol className="nx-explain" aria-label="How it works, in three frames">
        {frames.map((f, i) => (
          <Reveal key={f.t} delay={i * 70} className="nx-explain__item">
            <li className="nx-explain__frame">
              <div className="nx-explain__art">
                {f.art}
                <span className="nx-explain__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="nx-explain__t nx-shout" style={{ fontFamily: S }}>{f.t}</p>
              <p className="nx-explain__b" style={{ fontFamily: F }}>{f.b}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.4rem", display: "inline-flex", alignItems: "center", gap: 6 }} data-testid="frontdoor-learn">
        Every step, and every marker <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </section>
  );
}
