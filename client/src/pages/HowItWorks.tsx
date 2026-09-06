/* JOB: the five steps, from choosing a medicine to the week-12 blood test. */
/* ═══ HOW IT WORKS — the tile grammar (2026-09-05)
   The five steps as five numbered tiles, each with its photograph or
   render; the blood panel as one tile with the marker groups in two
   columns; the physicians and the pharmacy as two tiles with the verbatim
   compliance text set small; the decision and the price as one tile each;
   the closer as the house closer tile. Copy is the plain deck
   (docs/COPY-DECK-PLAIN.md) in the v3 register (docs/VOICE.md). State, do
   not persuade. Tokens only; the page's own classes live in
   client/src/styles/support.css. */
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "wouter";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { imgSrcSet } from "@/data/imageVariants";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS, PANEL_CATEGORY_COUNT, BIOMARKER_PANEL } from "@/data/biomarkerPanel";
import { SOLO_CATALOG, statusOf } from "@/data/soloCatalog";
import monthBox from "@/assets/studio/month-box.webp";
import monthBox1200 from "@/assets/studio/month-box-1200.webp";
import bloodTube from "@/assets/brand/editorial-bloodwork.webp";
import "@/styles/support.css";

/* One picture per step. The workflow-localised frames (img/…) resolve
   against the <base> tag and carry a build-time 800w companion; the
   bundled renders (the month box, the blood tube) are imported and get the
   sizes Vite ships. */
type StepImage = { src: string; srcSet?: string; alt: string; render?: boolean };

/* The five steps (the only step list on the site). `d` is the deck
   paragraph, verbatim; `detail` is the one plain paragraph the deck asks for. */
/* The pending sentence is a fact about the catalog, so it is read from the
   catalog. Every medicine went live on 2026-09-06 and this page kept telling
   the reader what a pending medicine does — a state that existed nowhere on
   the site. It returns by itself the moment one does. */
const HAS_PENDING = SOLO_CATALOG.some((s) => statusOf(s) !== "live");
const PENDING_NOTE = HAS_PENDING
  ? " A pending medicine shows its price and a notice. The only action is an email when it is available."
  : "";

const STEPS: { t: string; d: string; detail: string; img: StepImage }[] = [
  {
    t: "Choose a medicine or a protocol, and a term.",
    d: "One, three, six or twelve months. The longer terms cost less a month and carry more blood testing.",
    detail: `Every medicine and protocol page states what it is for, how it works, how it is taken, what to expect, and its price.${PENDING_NOTE}`,
    img: { src: monthBox, srcSet: `${monthBox1200} 1200w, ${monthBox} 1600w`, alt: "The month box, drawn in the house studio: the medicine, the blood kit, the first-dose card and the cold pack", render: true },
  },
  {
    t: "Complete a quick online visit at checkout.",
    d: "A few minutes on your history, your current medicines and your goal. It comes right after you order, before anything is made.",
    detail: "The order is placed first, then the questions are answered. They cover the conditions that rule each medicine out and the medicines already taken. Compounded GLP-1 medicines are restricted by law in some states; the health questions check.",
    img: { src: "img/img_329e054306f2.webp", srcSet: imgSrcSet("img/img_329e054306f2.webp", "img/img_329e054306f2-800w.webp"), alt: "A woman answering the online visit on a tablet at a bright desk" },
  },
  {
    t: "A physician reads them and decides.",
    d: "A licensed U.S. physician reviews your answers. They write the prescription, or explain why not. If not, nothing is made and the refund policy applies.",
    detail: "The physician reads the answers against the conditions that rule each medicine out and against the other medicines taken. A decision comes within a few business days.",
    img: { src: "img/img_334cb24acfa5.webp", srcSet: imgSrcSet("img/img_334cb24acfa5.webp", "img/img_334cb24acfa5-800w.webp"), alt: "A physician in a white coat with a stethoscope" },
  },
  {
    t: "Draw your blood at home, then take the first dose.",
    d: "The draw comes first. Your dose is set from what your own blood says.",
    detail: `The kit holds what you need to draw a small sample at home, and a prepaid box to send it back. It covers ${PANEL_TOTAL_MARKERS} markers across five systems. The physician reads the results before setting the first dose.`,
    img: { src: "img/img_d489ea4e9dbc.webp", srcSet: imgSrcSet("img/img_d489ea4e9dbc.webp", "img/img_d489ea4e9dbc-800w.webp"), alt: "The at-home blood kit box on a kitchen counter, by the window" },
  },
  {
    t: `At week ${RETEST_WEEK}, the same panel is drawn again.`,
    d: "The same markers, read against your first draw. What changed decides what happens to the dose.",
    detail: `At week ${RETEST_WEEK} the same ${PANEL_TOTAL_MARKERS} markers are drawn at home, and compared with the first marker by marker. The physician reads what changed. The dose continues, changes or stops.`,
    img: { src: bloodTube, alt: "A blood sample tube held up to the light in a laboratory" },
  },
];

/* The two parties a reader can write to, each with the compliance block
   verbatim from Bask (data/compliance.ts). The lines are the deck's. */
const PARTIES: { eyebrow: string; name: string; line: string; body: string; testid: string }[] = [
  {
    eyebrow: "The physicians",
    name: PROVIDER_INFO.name,
    line: `Prescriptions are written by independent, U.S.-licensed physicians of ${PROVIDER_INFO.name}, through the Bask Health telehealth platform.`,
    body: PROVIDER_INFO.body,
    testid: "hiw-party-provider",
  },
  {
    eyebrow: "The pharmacy",
    name: PHARMACY_INFO.name,
    line: `Medicines are compounded by ${PHARMACY_INFO.name}, a state-licensed 503A compounding pharmacy in Houston, Texas.`,
    body: PHARMACY_INFO.body,
    testid: "hiw-party-pharmacy",
  },
];

export default function HowItWorks() {
  useSeo({
    title: "How it works | Nexphoria",
    description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel. A quick online visit, a physician's decision, a blood kit before the first dose, and the same test again at week ${RETEST_WEEK}.`,
    path: "/how-it-works",
    jsonLd: [
      webPageJsonLd({ name: "How it works", description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel.`, path: "/how-it-works", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How Nexphoria peptide therapy works",
        description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel.`,
        steps: STEPS.map((s) => ({ name: s.t, text: s.d })),
      }),
    ],
  });

  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="nx-tilehero" aria-labelledby="hiw-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">How it works</p>
            <h1 id="hiw-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>A quick online visit. A licensed physician decides the rest.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>Five steps, from choosing a medicine to the week-{RETEST_WEEK} blood panel. Each one is set out below, in the order it happens.</p>
            <div className="nx-tilehero__foot">
              <Link href="/peptides" className="nx-cta-cobalt" data-testid="hiw-hero-cta">Browse every medicine</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The five steps, as five numbered tiles ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-steps">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">The steps</p>
            <h2 id="hiw-steps" className="nx-dsh2" style={{ maxWidth: "24ch" }}>From choosing a medicine to the week-12 panel.</h2>
          </div>
        </Reveal>
        <ol className="sp-steps" data-testid="hiw-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={Math.min(i * 40, 200)}>
              <li className={i % 2 === 1 ? "sp-step sp-step--flip" : "sp-step"} data-testid={`hiw-step-${i + 1}`}>
                <div className="sp-step__copy">
                  <span className="nx-steptile__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="nx-steptile__t" style={{ fontFamily: S }}><span className="sr-only">Step {i + 1}. </span>{s.t}</h3>
                  <p className="nx-steptile__b" style={{ fontFamily: F }}>{s.d}</p>
                  <p className="nx-steptile__b" style={{ fontFamily: F }}>{s.detail}</p>
                </div>
                <div className={s.img.render ? "sp-step__media sp-step__media--render" : "sp-step__media"}>
                  <img src={s.img.src} srcSet={s.img.srcSet} sizes="(max-width: 900px) 100vw, 40vw" alt={s.img.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Blood testing, as one tile with the marker groups in two columns ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-blood">
        <Reveal>
          <div className="sp-tile">
            <div className="nx-sec-head">
              <p className="nx-eyebrow">Blood testing</p>
              <h2 id="hiw-blood" className="nx-dsh2" style={{ maxWidth: "26ch" }}>Your blood is tested before the first dose, and again at week {RETEST_WEEK}.</h2>
              <p className="nx-lede">
                The kit reads {PANEL_TOTAL_MARKERS} markers across {PANEL_CATEGORY_COUNT} systems, drawn at home. Terms of three months and longer include the week-{RETEST_WEEK} test. Six- and twelve-month terms add a six-month test, and twelve-month terms add a test each quarter. On its own the test is $149; a further test on a plan is $99.
              </p>
            </div>
            <ul className="sp-panel__list" data-testid="hiw-panel">
              {BIOMARKER_PANEL.map((c) => (
                <li key={c.name} className="sp-panel__item">
                  <div className="sp-panel__row">
                    <p className="sp-panel__name">{c.name}</p>
                    <span className="sp-panel__count">{c.count} marker{c.count === 1 ? "" : "s"}</span>
                  </div>
                  {c.blurb ? <p className="sp-panel__blurb">{c.blurb}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── Who is involved: the physicians and the pharmacy, as two tiles ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-who">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Who is involved</p>
            <h2 id="hiw-who" className="nx-dsh2" style={{ maxWidth: "24ch" }}>Everyone involved is named here, with what each one does.</h2>
            <p className="nx-lede">
              Nexphoria operates the service and does not make clinical decisions. The online visit is completed through the Bask Health telehealth platform, and blood work is analysed by a CLIA-certified laboratory.
            </p>
          </div>
        </Reveal>
        <ul className="sp-two" data-testid="hiw-parties">
          {PARTIES.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <li className="sp-tile" data-testid={p.testid}>
                <p className="sp-tile__eyebrow">{p.eyebrow}</p>
                <h3 className="sp-tile__t">{p.name}</h3>
                <p className="sp-tile__b">{p.line}</p>
                <p className="sp-fine">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── If the physician does not prescribe, as one calm tile ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-decline">
        <Reveal>
          <div className="sp-tile sp-tile--calm" data-testid="hiw-decline">
            <div className="nx-sec-head">
              <p className="nx-eyebrow">The decision</p>
              <h2 id="hiw-decline" className="nx-dsh2" style={{ maxWidth: "24ch" }}>If the physician does not prescribe, nothing is made.</h2>
              <p className="nx-lede">
                The physician explains why not. Nothing is compounded and nothing ships, and the refund policy sets out what is refunded.
              </p>
            </div>
            <p className="sp-tile__link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)" }}>
              <Link href="/legal/refund-policy" className="nx-text-link" style={{ fontWeight: 600 }}>Read the refund policy</Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── What it costs, as one tile ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-price">
        <Reveal>
          <div className="sp-tile" data-testid="hiw-price">
            <div className="nx-sec-head">
              <p className="nx-eyebrow">Price</p>
              <h2 id="hiw-price" className="nx-dsh2" style={{ maxWidth: "26ch" }}>One monthly price covers the medicine, the physician and the blood work.</h2>
              <p className="nx-lede">
                One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood testing the term includes, and cold shipping. Three months is 10% less per month, six 15%, twelve 20%.
              </p>
            </div>
            <p className="sp-tile__link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)" }}>
              <Link href="/peptides" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="hiw-pricing-all">See every medicine, with its price</Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Closer, as one tile ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="hiw-closer">
        <div className="nx-closer-tile">
          <div>
            <h2 id="hiw-closer" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>A physician decides, and prescribes if it is appropriate.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>A licensed U.S. physician reviews your online visit and prescribes the medicine that fits, or explains why not.</p>
            <Link href="/peptides" className="nx-cta-ceramic" data-testid="hiw-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>See the medicines</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
