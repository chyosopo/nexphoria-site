/* ═══ How it works, in three tiles (effecty study, 2026-09-05; 4:3 since the evening polish) ═══
   A photograph fills each tile; the step's name and one line sit at the
   bottom over a navy gradient. The three steps that involve the reader:
   the online visit, the physician, the box. The full five live on
   /how-it-works. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { RETEST_WEEK } from "@/data/monitoring";
import { imgSrcSet } from "@/data/imageVariants";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

const STEPS = [
  { t: "Complete a quick online visit.", b: "A few minutes on your history, your medicines and your goal. It comes right after you order.", img: "img/img_329e054306f2.webp", img800: "img/img_329e054306f2-800w.webp", alt: "A woman answering questions on a tablet at a bright desk" },
  { t: "A physician reads them and decides.", b: "A licensed U.S. physician reviews your answers. They write the prescription, or explain why not.", img: "img/img_334cb24acfa5.webp", img800: "img/img_334cb24acfa5-800w.webp", alt: "A physician in a white coat with a stethoscope" },
  { t: "The box arrives cold, with your blood kit.", b: `The medicine ships cold beside a ${PANEL_TOTAL_MARKERS}-marker blood kit. You draw first. The physician sets your dose from the results, and reads them again at week ${RETEST_WEEK}.`, img: "img/img_d489ea4e9dbc.webp", img800: "img/img_d489ea4e9dbc-800w.webp", alt: "The at-home blood kit box on a pale kitchen counter" },
];

export function HowTiles() {
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-road" data-testid="frontdoor-road">
      <Reveal>
        <div className="nx-sec-row">
          <div className="nx-sec-head">
            <p className="nx-eyebrow">How it works</p>
            <h2 id="fd-road" className="nx-dsh2" style={{ maxWidth: "24ch" }}>A quick online visit. A licensed physician decides the rest.</h2>
          </div>
          <Link href="/how-it-works" className="nx-cta-navy" data-testid="frontdoor-road-all" style={{ fontFamily: F }}>See every step <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </Reveal>
      <ol className="nx-tiles nx-tiles--3 nx-tiles--how" aria-label="The three steps">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} as="li" delay={i * 70} className="nx-tiles__item">
            <div className="nx-tile nx-tile--photo">
              <img src={s.img} srcSet={imgSrcSet(s.img, s.img800)} sizes="(max-width: 900px) 100vw, 33vw" alt={s.alt} loading="lazy" decoding="async" width={1600} height={1200} />
              <span className="nx-tile__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="nx-tile__foot">
                <span className="nx-tile__t" style={{ fontFamily: S }}>{s.t}</span>
                <span className="nx-tile__b" style={{ fontFamily: F }}>{s.b}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: ".8rem" }}>
        If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded.
      </p>
    </section>
  );
}
