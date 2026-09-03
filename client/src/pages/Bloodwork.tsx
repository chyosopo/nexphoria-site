/* JOB: sell the panel and the retest loop that gate every protocol. */
import { useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { StickyAssessBar } from "@/components/StickyAssessBar";
import { useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, faqJsonLd, breadcrumbJsonLd, orgJsonLd } from "@/lib/seo";
import { BiomarkerCard } from "@/components/BiomarkerCard";
import { BIOMARKERS } from "@/data/biomarkers";
import {
  BIOMARKER_PANEL,
  PANEL_TOTAL_MARKERS,
  PANEL_CATEGORY_COUNT,
} from "@/data/biomarkerPanel";
import { SITE_STATS } from "@/data/siteStats";
import { PANELS, FLAGSHIP_STACKS, usd, type PanelTier } from "@/data/stacksCatalog";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { peptides, CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";
import { GOAL_OF_STACK } from "@/data/protocolSelector";
import { track } from "@/lib/analytics";
import { Link } from "wouter";
import { ArrowRight, Check, Droplet, Stethoscope, RefreshCw, FlaskConical, ClipboardCheck, TestTube } from "lucide-react";
import { FONT, S } from "@/lib/typography";
import { FaqAccordion } from "@/components/EnterprisePatterns";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import {
  PANEL_ART,
  heroSampleRows,
  SURFACE_PILLS,
  BLOODWORK_FAQ_ITEMS,
} from "@/data/bloodworkContent";

const NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum'",
};

/* ══════════════════════════════════════════════════════════════
   HERO — data-hero pattern, dark cobalt, benefit-led
   ══════════════════════════════════════════════════════════════ */
function Hero() {
  // Cast the sample readout to the visitor's world so her panel leads with her
  // markers (Estradiol first, not Total Testosterone).
  const [heroLoc] = useLocation();
  const heroWorld = resolveWorld(heroLoc);
  const sampleRows = heroSampleRows(heroWorld);
  // WCAG 2.2.2 — the looping lab film is decorative motion; when the visitor
  // prefers reduced motion, hold the poster frame instead of autoplaying.
  const reduce = useReducedMotion();
  return (
    <section
      data-testid="bloodwork-hero"
      className="nx-gradient-hero-dark relative overflow-hidden" style={{ color: "var(--nx-ceramic)" }}
    >
      {/* (Decorative hero score ring removed — it was absolutely positioned
          over the right column and collided with the Live-panel glass card
          at every desktop width.) */}
      <div
        className="nx-container"
        style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}
      >
        <div
          style={{ display: "grid", gap: "3rem", alignItems: "end" }}
          className="md:grid-cols-[1.1fr_0.9fr]"
        >
          <Reveal>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <span className="nx-icon-circle on-dark" aria-hidden>
                  <Droplet size={19} strokeWidth={1.9} />
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-caps)",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ width: 28, height: 1, backgroundColor: "var(--nx-acid)" }} />
                Your bloodwork
              </p>
              <h1
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-display)",
                  lineHeight: 0.98,
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-display)",
                  marginBottom: "1.5rem",
                }}
              >
                You start. Then your blood
              <br />
              <span style={{ color: "var(--nx-acid)" }}>tells your doctor what changed.</span>
              </h1>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-lg)",
                  lineHeight: 1.55,
                  color: "rgba(246, 249, 252,0.75)",
                  maxWidth: 520,
                  marginBottom: "2rem",
                }}
              >
                Tired, stuck, slow to recover? Your numbers usually say why.
              {" "}A full panel of {PANEL_TOTAL_MARKERS} markers across {PANEL_CATEGORY_COUNT} groups, drawn at week 12 of your plan and included, so your doctor adjusts your dose from what actually changed.
              </p>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <StartIntakeButton
                  source="bloodwork-hero"
                  variant="primary"
                  size="lg"
                >
                  Start your assessment
                </StartIntakeButton>
                <Link
                  href="/peptides"
                  data-testid="bloodwork-hero-cta-science"
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: "var(--nx-ceramic)",
                    padding: "0.9rem 1.4rem",
                    border: "1px solid rgba(246, 249, 252,0.28)",
                    borderRadius: "var(--nx-r-pill)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  See the science <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>

              <div
                className="grid grid-cols-3"
                style={{ gap: 12, marginTop: "3rem", maxWidth: 560 }}
              >
                {[
                  { n: `${PANEL_TOTAL_MARKERS}+`, l: "Biomarkers" },
                  { n: PANEL_CATEGORY_COUNT.toString(), l: "Panels" },
                  { n: "90d", l: "Retest cadence" },
                ].map((k) => (
                  <div key={k.l} className="nx-stat-card on-dark">
                    <span className="nx-stat-num" style={NUM}>{k.n}</span>
                    <span className="nx-stat-lbl">{k.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right-side glass card: sample vial-panel readout */}
          <Reveal delay={0.1}>
            <div
              style={{
                background:
                  "linear-gradient(160deg, rgba(246, 249, 252,0.06) 0%, rgba(246, 249, 252,0.02) 100%)",
                border: "1px solid rgba(246, 249, 252,0.14)",
                borderRadius: "var(--nx-r-md)",
                padding: "1.6rem 1.6rem 1.4rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    letterSpacing: "var(--nx-ls-caps)",
                    textTransform: "uppercase",
                    color: "rgba(246, 249, 252,0.55)",
                  }}
                >
                  Live panel · sample
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    color: "var(--nx-acid)",
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "var(--nx-r-pill)",
                      backgroundColor: "var(--nx-acid)",
                      display: "inline-block",
                    }}
                  />
                  Optimal band
                </div>
              </div>

              {sampleRows.map((r, i) => (
                <div
                  key={r.m}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr auto",
                    alignItems: "center",
                    padding: "0.7rem 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(246, 249, 252,0.09)",
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                  }}
                >
                  <div style={{ color: "rgba(246, 249, 252,0.9)", fontWeight: 500 }}>{r.m}</div>
                  <div style={{ ...NUM, color: "rgba(246, 249, 252,0.7)" }}>
                    {r.v} <span style={{ fontSize: "var(--nx-t-xs)", opacity: 0.6 }}>{r.u}</span>
                  </div>
                  <div
                    style={{
                      ...NUM,
                      color: "var(--nx-acid)",
                      fontWeight: 500,
                      fontSize: "var(--nx-t-xs)",
                    }}
                  >
                    {r.d}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "1.1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(246, 249, 252,0.09)",
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  color: "rgba(246, 249, 252,0.5)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                }}
              >
                Illustrative 90-day trajectory · partner laboratory · reviewed by a Nexphoria
                physician
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Cinematic lab — living proof band (Higgsfield kling3.0) ── */}
      <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-band)" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: "var(--nx-r-lg)", boxShadow: "var(--nx-e-4)" }} data-testid="bloodwork-video-band">
          <video autoPlay={!reduce} muted loop={!reduce} playsInline
            src="img/img_6d36ae1989c8.mp4"
            poster="img/img_b9ec00db43d6.webp"
            className="w-full h-auto block" style={{ aspectRatio: "16 / 7", objectFit: "cover" }}
            aria-label="Partner-laboratory lab work at week 12" />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 62%, rgba(21, 24, 28,0.30))" }} />
          <p className="absolute left-6 bottom-4 md:left-8 md:bottom-5" style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-bg)", textShadow: "0 2px 16px rgba(21, 24, 28,0.45)", margin: 0 }}>
            Your numbers, at week 12.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRUST ROW — calm single-row operating facts, straight after hero.
   Claims are limited to what is true for Nexphoria: licensed physicians,
   503A pharmacy, prescription-gated, lab-monitored. No CLIA/CAP/FDA.
   ══════════════════════════════════════════════════════════════ */
function TrustRow() {
  const items = [
    { Icon: Stethoscope, label: "Licensed U.S. physicians" },
    { Icon: FlaskConical, label: "503A compounding pharmacy" },
    { Icon: ClipboardCheck, label: "Prescription required" },
    { Icon: TestTube, label: "Lab-monitored results" },
  ];
  return (
    <section
      aria-label="How Nexphoria operates"
      data-testid="bloodwork-trust-row"
      style={{
        background: "var(--nx-ceramic)",
        borderBottom: "1px solid var(--nx-border)",
      }}
    >
      <div
        className="nx-container"
        style={{ paddingTop: "1.4rem", paddingBottom: "1.4rem" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.9rem 2.4rem",
          }}
        >
          {items.map(({ Icon, label }) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
              }}
            >
              <Icon size={15} strokeWidth={1.8} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FILTER CHIPS + CATEGORY GRID — Hims-Labs pattern
   ══════════════════════════════════════════════════════════════ */
function PanelExplorer() {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return BIOMARKER_PANEL;
    return BIOMARKER_PANEL.filter((c) => c.id === active);
  }, [active]);

  const chips = [
    { id: "all", name: "All panels" },
    ...BIOMARKER_PANEL.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <section
      data-testid="bloodwork-panel-explorer"
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
    >
      <div className="nx-container">
        <div className="nx-divider-ornament" aria-hidden style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}><i /></div>
        {/* Section header */}
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 720 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
                marginBottom: "1rem",
              }}
            >
              What we measure
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-h2)",
                lineHeight: 1.05,
                letterSpacing: "var(--nx-ls-tight)",
                fontWeight: 500,
                color: "var(--nx-fg)",
                marginBottom: "0.9rem",
              }}
            >
              {PANEL_TOTAL_MARKERS} markers. {PANEL_CATEGORY_COUNT} systems. One clear picture.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-body)",
                lineHeight: 1.6,
                color: "var(--nx-fg-graphite)",
              }}
            >
              Annual physicals measure a handful of basic markers. Our panel goes further — from
              cardiovascular risk to hormone balance to a 21-factor biological-age composite — so
              your protocol is calibrated to your chemistry, not a population average.
            </p>
          </div>
        </Reveal>

        {/* Filter chips — these toggle a filtered grid, they do not switch
            tab panels; an ARIA tablist without tabpanels/roving-tabindex/
            arrow-keys promises AT users navigation that does not exist, so
            model them honestly as an aria-pressed toggle group (matching the
            PanelTiers picker below). */}
        <div
          role="group"
          aria-label="Filter biomarker categories"
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--nx-border)",
          }}
        >
          {chips.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                data-testid={`chip-${c.id}`}
                onClick={() => setActive(c.id)}
                className="nx-filter-chip"
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  // active state stays this page's ink-dark look; inactive
                  // inherits the class so its hover can actually fire
                  ...(isActive ? { backgroundColor: "var(--nx-fg)", color: "var(--nx-ceramic)", borderColor: "var(--nx-fg)" } : {}),
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Screen-reader status — the chips re-render the grid silently; mirror
            the Assessment.tsx sr-only live pattern so AT users hear the result
            of a filter change (which panel, and how many are now shown). */}
        <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="panel-explorer-status">
          {active === "all"
            ? `Showing all ${BIOMARKER_PANEL.length} biomarker panels.`
            : `Showing 1 of ${BIOMARKER_PANEL.length} biomarker panels: ${visible[0]?.name ?? ""}.`}
        </p>

        {/* Category grid */}
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {visible.map((cat) => (
            <Reveal key={cat.id}>
              <article
                data-testid={`panel-card-${cat.id}`}
                className="nx-glass-card"
                style={{
                  padding: "1.5rem 1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 320,
                }}
              >
                {PANEL_ART[cat.id] && (
                  <span className="relative block overflow-hidden -mt-1 mb-4" style={{ borderRadius: "var(--nx-r-md)", aspectRatio: "4 / 3", background: "var(--nx-ice)" }}>
                    <img src={PANEL_ART[cat.id]} alt="" aria-hidden loading="lazy"
                      className="w-full h-full transition-transform duration-700"
                      style={{ objectFit: "cover" }} />
                    <span className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(180deg, rgba(10,20,35,0) 52%, rgba(10,20,35,0.58))" }}>
                      <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>{cat.eyebrow}</span>
                    </span>
                  </span>
                )}
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div>
                                        <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-xl)",
                        letterSpacing: "var(--nx-ls-normal)",
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                  </div>
                  <div
                    style={{
                      ...NUM,
                      fontFamily: FONT,
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      color: "var(--nx-fg-graphite)",
                      padding: "0.25rem 0.55rem",
                      border: "1px solid var(--nx-border)",
                      borderRadius: "var(--nx-r-pill)",
                    }}
                  >
                    {cat.count} markers
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                    lineHeight: 1.55,
                    color: "var(--nx-fg-graphite)",
                    marginBottom: "1rem",
                    minHeight: 70,
                  }}
                >
                  {cat.blurb}
                </p>

                {/* Biomarker chips — every marker as a calm, flat pill */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0.9rem 0 0",
                    marginTop: "auto",
                    borderTop: "1px solid var(--nx-border)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    flex: 1,
                    alignContent: "flex-start",
                  }}
                >
                  {/* Dedupe after stripping the (absolute)/(percentage)
                      qualifiers — Immunity rendered every pill twice */}
                  {Array.from(new Set(cat.markers.map((m) => m.name.split(" (")[0]))).map((name) => (
                    <li
                      key={name}
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 500,
                        lineHeight: 1.25,
                        letterSpacing: "0.01em",
                        color: "var(--nx-fg-graphite)",
                        background: "var(--nx-bg)",
                        border: "1px solid var(--nx-border)",
                        borderRadius: "var(--nx-r-pill)",
                        padding: "0.32rem 0.72rem",
                      }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Explainer strip */}
        <Reveal>
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: "var(--nx-ceramic)",
              border: "1px solid var(--nx-border)",
              borderRadius: "var(--nx-r-md)",
              display: "grid",
              gap: "1.25rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-[auto_1fr]"
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-h1)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-display)",
                color: "var(--nx-fg)",
                lineHeight: 0.9,
                ...NUM,
              }}
            >
              {/* Bound to the single source of truth — the closing anchor
                  restates the panel's real breadth (was an unsourced "1,000+"
                  with no unit, off-voice against the page's precise count). */}
              {PANEL_TOTAL_MARKERS}
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-caps)",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-graphite)",
                  marginBottom: "0.5rem",
                }}
              >
                What a full panel catches
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-body)",
                  lineHeight: 1.55,
                  color: "var(--nx-fg)",
                }}
              >
                Biomarkers are measurable indicators in your blood that signal how well every
                system is functioning. Track them over time and you catch drift early, prove
                progress, and adjust dose before an issue becomes a diagnosis.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PANEL COMPARISON — "not all bloodwork is the same" matrix.
   The LongevityMeds-study move (docs/LONGEVITYMEDS-STUDY.md §5),
   done truthfully: every row states what a physician panel does
   that a once-a-year physical and a mail-order kit do not. Marker
   count binds to PANEL_TOTAL_MARKERS — never hardcoded.
   ══════════════════════════════════════════════════════════════ */
function PanelComparison() {
  return (
    <ComparisonMatrix
      testid="bloodwork-comparison"
      eyebrow="Why this panel"
      title="Not all bloodwork is the same."
      lead="A once-a-year physical and a mail-order kit both stop at a number. This panel exists to change a prescription: read against optimal ranges, by a physician, and retested until the trend proves it."
      columns={[
        { label: "The Nexphoria panel", sub: "Included with every protocol", highlight: true, badge: "Nexphoria" },
        { label: "A standard annual physical", sub: "Once-a-year checkup" },
        { label: "A direct-to-consumer kit", sub: "Mail-order finger-prick" },
      ]}
      rows={[
        {
          label: "Biomarkers measured",
          cells: [
            { text: `${PANEL_TOTAL_MARKERS} across ${PANEL_CATEGORY_COUNT} systems`, tone: "pos" },
            { text: "A basic metabolic panel + lipids", tone: "neg" },
            { text: "A handful, varies by kit", tone: "neg" },
          ],
        },
        {
          label: "Read against",
          cells: [
            { text: "Optimal ranges, not just “normal”", tone: "pos" },
            { text: "Standard reference ranges", tone: "neg" },
            { text: "Reference ranges, or none", tone: "neg" },
          ],
        },
        {
          label: "Who reviews it",
          cells: [
            { text: "A board-certified physician", tone: "pos" },
            { text: "Your provider, at the visit", tone: "plain" },
            { text: "An algorithm, or no one", tone: "neg" },
          ],
        },
        {
          label: "Retested",
          cells: [
            { text: "At week 12, read against your start", tone: "pos" },
            { text: "Once a year", tone: "neg" },
            { text: "One-time snapshot", tone: "neg" },
          ],
        },
        {
          label: "What happens next",
          cells: [
            { text: "Your dose is calibrated to the results", tone: "pos" },
            { text: "General advice", tone: "neg" },
            { text: "No treatment path", tone: "neg" },
          ],
        },
        {
          label: "Where you draw",
          cells: [
            { text: `${SITE_STATS.labSites.display} partner labs or an at-home kit`, tone: "pos" },
            { text: "A clinic appointment", tone: "plain" },
            { text: "At-home finger-prick", tone: "plain" },
          ],
        },
        {
          label: "Cost",
          cells: [
            { text: "Included in your protocol", tone: "pos" },
            { text: "Copay + visit", tone: "plain" },
            { text: "$50–200 per kit", tone: "plain" },
          ],
        },
      ]}
      footnote="A standard physical and a home kit both have their place. The difference is what happens after the draw: here, every marker feeds a physician's prescribing decision and is retested until the trend confirms the protocol is working."
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   LIVE TRAJECTORY — the real BiomarkerCard set
   ══════════════════════════════════════════════════════════════ */
function LiveTrajectory() {
  return (
    <section
      data-testid="bloodwork-live"
      aria-labelledby="bw-live-title"
      className="nx-section"
      style={{
        backgroundColor: "var(--nx-bg-dark)",
        color: "var(--nx-ceramic)",
      }}
    >
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 640 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-acid)",
                marginBottom: "1rem",
              }}
            >
              Protocol results
            </p>
            <h2
              id="bw-live-title"
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-h2)",
                lineHeight: 1.05,
                letterSpacing: "var(--nx-ls-tight)",
                fontWeight: 500,
                marginBottom: "0.9rem",
              }}
            >
              Ninety days. Two draws. Every marker trending.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-body)",
                lineHeight: 1.6,
                color: "rgba(246, 249, 252,0.7)",
              }}
            >
              Illustrative trajectory of one Nexphoria patient across the first quarter — reference
              range, current value, direction of travel, and clinical interpretation on every card.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {BIOMARKERS.slice(0, 8).map((b) => (
            <Reveal key={b.name}>
              <BiomarkerCard m={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS — 3 numbered steps
   ══════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const STEPS = [
    {
      n: "01",
      Icon: Droplet,
      title: "You start",
      body: "Your doctor prescribes from your questionnaire. Your plan is made for you and ships cold, and you begin.",
    },
    {
      n: "02",
      Icon: Stethoscope,
      title: "Week 12: the full panel",
      body: `A ${PANEL_TOTAL_MARKERS}-marker panel through a CLIA-certified partner laboratory, included. Walk into any of ${SITE_STATS.labSites.display} centers or use the at-home collection kit.`,
    },
    {
      n: "03",
      Icon: RefreshCw,
      title: "Your dose, adjusted",
      body: "A board-certified physician reads every marker against your goals and holds, adjusts or tapers your dose from what changed.",
    },
  ];
  return (
    <section
      data-testid="bloodwork-how"
      aria-labelledby="bw-how-title"
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
    >
      <div className="nx-container">
        <div className="nx-divider-ornament" aria-hidden style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}><i /></div>
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 620 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
                marginBottom: "1rem",
              }}
            >
              How it works
            </p>
            <h2
              id="bw-how-title"
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-h2)",
                lineHeight: 1.05,
                letterSpacing: "var(--nx-ls-tight)",
                fontWeight: 500,
                color: "var(--nx-fg)",
              }}
            >
              Prove it, prescribe it, retest it.
            </h2>
          </div>
        </Reveal>

        <div className="nx-timeline">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div
                className="nx-timeline-step"
                style={{ paddingBottom: i < STEPS.length - 1 ? "clamp(1.6rem,3vw,2.2rem)" : 0 }}
              >
                <span className="nx-timeline-node" aria-hidden>{s.n}</span>
                <div
                  data-testid={`how-step-${s.n}`}
                  className="nx-glass-tile"
                  style={{ display: "block" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.7rem" }}>
                    <span className="nx-icon-circle" aria-hidden>
                      <s.Icon size={19} strokeWidth={1.9} />
                    </span>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-lg)",
                        fontWeight: 500,
                        letterSpacing: "var(--nx-ls-normal)",
                        color: "var(--nx-fg)",
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: "var(--nx-t-sm)",
                      lineHeight: 1.55,
                      color: "var(--nx-fg-graphite)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ WHICH PANEL DO I NEED? — the Maximus-style on-page tool (study §4):
   two questions, a true answer. The gate is DERIVED: a goal's required
   tier is the highest tier any of its routes (flagship stack + solos)
   actually gates on in the catalog data — no marketing logic. ══ */
const TIER_RANK: Record<PanelTier, number> = { Basic: 0, Full: 1, Elite: 2 };

function requiredTierFor(goal: PeptideCategory): PanelTier {
  const tiers: PanelTier[] = [
    ...FLAGSHIP_STACKS.filter((s) => GOAL_OF_STACK[s.slug] === goal).map((s) => s.panel),
    ...peptides
      .filter((p) => p.category === goal)
      .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)?.panel)
      .filter((t): t is PanelTier => Boolean(t)),
  ];
  return tiers.sort((a, b) => TIER_RANK[b] - TIER_RANK[a])[0] ?? "Basic";
}

type Depth = "required" | "hormonal" | "deepest";
const DEPTH_OPTIONS: { key: Depth; label: string }[] = [
  { key: "required", label: "Just what my protocol requires" },
  { key: "hormonal", label: "Add the full hormonal picture" },
  { key: "deepest", label: "The deepest read available" },
];

function recommendTier(goal: PeptideCategory, depth: Depth): PanelTier {
  const base = requiredTierFor(goal);
  if (depth === "deepest") return "Elite";
  if (depth === "hormonal") return TIER_RANK[base] > TIER_RANK.Full ? base : "Full";
  return base;
}

/* ══ PANEL TIERS — Basic / Full / Elite pricing + stack→panel mapping (merged from BloodPanels) ══ */
function PanelTiers() {
  // which tier do most protocols gate on?
  const demand: Record<string, number> = {};
  FLAGSHIP_STACKS.forEach((st) => { demand[st.panel] = (demand[st.panel] ?? 0) + 1; });
  const mostRequired = Object.entries(demand).sort((a, b) => b[1] - a[1])[0]?.[0];

  /* the picker: goal + depth → recommended tier, highlighted below */
  const [pickGoal, setPickGoal] = useState<PeptideCategory | null>(null);
  const [pickDepth, setPickDepth] = useState<Depth | null>(null);
  const rec = pickGoal && pickDepth ? recommendTier(pickGoal, pickDepth) : null;
  const pickerGoals = (Object.keys(CATEGORY_LABELS) as PeptideCategory[]).filter(
    (g) => peptides.some((p) => p.category === g),
  );

  return (
    <section id="tiers" aria-labelledby="bw-tiers-title" className="nx-section" style={{ background: "var(--nx-bg-cream)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow">Panel tiers</p>
        <h2 id="bw-tiers-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.08, color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.7rem" }}>
          Nothing is prescribed <em style={{ fontStyle: "italic", color: "var(--nx-cobalt)" }}>before it's measured.</em>
        </h2>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
          Every protocol is gated on the right panel — drawn at baseline, then retested on a fixed schedule so a physician can read the trend, not a snapshot.
        </p>

        {/* ── the two-question picker — answers from the catalog, not a quiz
            script; the recommended tier lights up in the grid below ── */}
        <div className="nx-glass-tile" data-testid="panel-picker" style={{ display: "block", marginTop: "1.8rem", padding: "1.4rem 1.5rem" }}>
          <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>
            Which panel do you need?
          </p>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: "1rem" }}>
            1 · What are you here to change?
          </p>
          <div role="group" aria-label="Your goal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "0.6rem" }}>
            {pickerGoals.map((g) => (
              <button
                key={g}
                onClick={() => { setPickGoal(g); if (pickDepth) track("panel_pick", { goal: g, depth: pickDepth, rec: recommendTier(g, pickDepth) }); }}
                aria-pressed={pickGoal === g}
                className="nx-filter-chip"
                data-testid={`panel-pick-goal-${g}`}
                style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
              >
                {CATEGORY_LABELS[g]}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: "1.1rem" }}>
            2 · How deep do you want the read?
          </p>
          <div role="group" aria-label="Panel depth" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "0.6rem" }}>
            {DEPTH_OPTIONS.map((d) => (
              <button
                key={d.key}
                onClick={() => { setPickDepth(d.key); if (pickGoal) track("panel_pick", { goal: pickGoal, depth: d.key, rec: recommendTier(pickGoal, d.key) }); }}
                aria-pressed={pickDepth === d.key}
                className="nx-filter-chip"
                data-testid={`panel-pick-depth-${d.key}`}
                style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: rec ? "var(--nx-fg)" : "var(--nx-fg-muted)", marginTop: "1.1rem", borderTop: "1px solid var(--nx-border)", paddingTop: "1rem" }} data-testid="panel-pick-result">
            {rec && pickGoal ? (
              <>
                <strong style={{ fontWeight: 700, color: "var(--nx-cobalt)" }}>The {rec} panel</strong>
                {": "}
                {CATEGORY_LABELS[pickGoal]} routes gate on the {requiredTierFor(pickGoal)} panel
                {TIER_RANK[rec] > TIER_RANK[requiredTierFor(pickGoal)] ? "; your depth choice steps it up" : ""}.
                {" "}It is highlighted below. Your physician confirms the tier at intake.
              </>
            ) : (
              "Answer both and the right tier lights up below. A physician confirms it at intake. The panel is the gate the protocol passes through."
            )}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3" style={{ gap: 14, alignItems: "stretch" }}>
          {PANELS.map((p, i) => {
            const hot = rec ? p.tier === rec : p.tier === mostRequired;
            const depth = PANELS.slice(0, i + 1).reduce((n, q) => n + q.adds.length, 0);
            const maxDepth = PANELS.reduce((n, q) => n + q.adds.length, 0);
            return (
            <Reveal key={p.tier} delay={i * 70}>
              <div className="nx-glass-tile" style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", border: hot ? "1.5px solid var(--nx-cobalt)" : undefined }}>
                {hot && (
                  <p style={{ position: "absolute", top: 14, right: 16, fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--nx-cobalt)" }} data-testid="panel-most-required">
                    {rec ? "Recommended for you" : "Most protocols gate here"}
                  </p>
                )}
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{p.tier}</p>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.3rem", lineHeight: 1 }}>{usd(p.price)}</p>
                {p.freeWith && <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-cobalt)", fontWeight: 600, marginTop: 4 }}>{p.freeWith}</p>}
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>{p.summary}</p>
                <div style={{ marginTop: "1rem", flex: 1 }}>
                  {i > 0 && (
                    <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: 8 }}>
                      Everything in {PANELS[i - 1].tier}, plus:
                    </p>
                  )}
                  {p.adds.map((a) => (
                    <div key={a} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                      <Check size={15} strokeWidth={2.4} style={{ color: "var(--nx-cobalt)", marginTop: 3, flexShrink: 0 }} />
                      <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)" }}>{a}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1rem" }} aria-hidden>
                  <div style={{ height: 4, borderRadius: "var(--nx-r-pill)", background: "var(--nx-border)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.round((depth / maxDepth) * 100)}%`, background: "var(--nx-cobalt)", borderRadius: "var(--nx-r-pill)" }} />
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: 5 }}>Cumulative depth · {depth} marker groups</p>
                </div>
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.8rem", borderTop: "1px solid var(--nx-border)", paddingTop: "0.8rem" }}>
                  Retest: {p.retest}
                </p>
              </div>
            </Reveal>
          );})}
        </div>

        {/* stack → panel mapping */}
        <div className="mt-12">
          <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>Which protocol needs which panel</h3>
          <div style={{ borderTop: "1px solid var(--nx-border)", marginTop: "1rem" }}>
            {FLAGSHIP_STACKS.map((s) => (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="grid grid-cols-[1fr_auto] gap-4 py-3.5" style={{ borderBottom: "1px solid var(--nx-border)", textDecoration: "none", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}</p>
                  <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)" }}>{s.category}</p>
                </div>
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>{s.panel} panel{s.panelNote && s.panelNote.includes("plus") ? " + add-ons" : ""}</p>
              </Link>
            ))}
          </div>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1.4rem", maxWidth: "60ch" }}>
            Draw at {SITE_STATS.labSites.display} partner laboratory locations or with the at-home collection kit. Your results populate one dashboard and are read by your physician at week 12 before anything is adjusted.
          </p>
          {/* THE offer's local next step (fleet audit S2: a desktop buyer at
              peak price-consideration had no in-flow CTA for ~10,000px) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.7rem", marginTop: "1.6rem" }}>
            <Link href="/assessment" className="nx-cta-cobalt" data-testid="bloodwork-tiers-cta" style={{ fontFamily: FONT, fontWeight: 600, fontSize: "var(--nx-t-base)", padding: "13px 26px" }}>
              Start your assessment
            </Link>
            <PrescribedPromise testid="bloodwork-tiers-promise" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DEFAULT EXPORT
   ══════════════════════════════════════════════════════════════ */
export default function Bloodwork() {
  // Shared page: follow the visitor's chosen world so the outcome
  // photography matches the palette SiteLayout already applies.
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  useSeo({
    title: `Peptide therapy bloodwork: a full ${PANEL_TOTAL_MARKERS}-marker panel at week 12`,
    description: `${PANEL_TOTAL_MARKERS} biomarkers across ${PANEL_CATEGORY_COUNT} partner-laboratory panels. Calibrate your protocol to your chemistry, not a population average. Results appear in your portal after physician review.`,
    path: "/bloodwork",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Bloodwork",
        description: `A full ${PANEL_TOTAL_MARKERS}-marker blood panel at week 12 of every Nexphoria plan, included, read by your physician so your dose follows what changed.`,
        path: "/bloodwork",
        type: "MedicalWebPage",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Bloodwork", path: "/bloodwork" }]),
      faqJsonLd(BLOODWORK_FAQ_ITEMS),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* The frictionless arc (ROADMAP 9.1): feeling → proof → what one draw
          surfaces → THE OFFER → depth → the retest moat → path → close.
          Cut from 15 stacked sections (16k px of scroll): SectionPills,
          SystemsMosaic, ResultsDashboard, ActionPlan, OfferStack, MarkerWall,
          WhyItMatters — each duplicated a kept section or served no JOB. Those
          seven de-rendered components have now been deleted outright (they were
          the last in-repo home of the retiring amber/rust/bg-cream aliases);
          only the sections composed below remain. */}
      {/* Plain wrapper, NOT a second <main id="main-content">: SiteLayout owns the sole <main> landmark + skip-link target. A nested <main>/duplicate id is invalid HTML5 (house pattern, cf. Pricing/Contact/FAQ). */}
      <div>
        <Hero />
        <TrustRow />
        <GlowingBody world={world} />
        <PanelTiers />
        <div id="explore" />
        <PanelExplorer />
        <PanelComparison />
        <LiveTrajectory />
        <HowItWorks />
        {/* The FAQ the JSON-LD promises — visible objection-handling at the
            close (invisible FAQPage markup risks a rich-result penalty) */}
        <section className="nx-container" aria-labelledby="bloodwork-faq-title" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
          <h2 id="bloodwork-faq-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginBottom: "1.4rem" }}>
            Before you book the draw.
          </h2>
          <FaqAccordion items={BLOODWORK_FAQ_ITEMS} openFirst={false} />
        </section>
        <FinalCTAStrip
          title="Every protocol starts with proof."
          sub={`A physician reviews all ${PANEL_TOTAL_MARKERS} markers before a single dose is prescribed. Book your panel in five minutes.`}
        />
      </div>
      {/* Sticky contextual CTA on long pages (ROADMAP 6.2) */}
      <StickyAssessBar label="It starts with the panel" testid="sticky-assess-bloodwork" />
    </SiteLayout>
  );
}

/* ══ GLOWING BODY — what one draw can surface ══ */
function GlowingBody({ world }: { world: "men" | "women" }) {
  return (
    <section id="surface" aria-label="What one blood draw can surface" className="relative overflow-hidden" style={{ background: "var(--nx-bg-dark)" }}>
      <div className="nx-container relative" style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>
        <div className="relative mx-auto" style={{ maxWidth: 880 }}>
          <img src={world === "women" ? "img/img_f04642b4a1f1.webp" : "img/img_af00f66cbf20.webp"} alt="" aria-hidden className="w-full" style={{ display: "block", borderRadius: "var(--nx-r-lg)" }} loading="lazy" />
          {SURFACE_PILLS.map((p, pi) => (
            <span key={p.t} className="hidden sm:inline-block absolute nx-float" style={{ left: p.x, top: p.y, fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: p.hot ? "var(--nx-bg)" : "rgba(243, 245, 247,0.4)", border: `1px solid ${p.hot ? "rgba(243, 245, 247,0.55)" : "rgba(243, 245, 247,0.18)"}`, borderRadius: "var(--nx-r-pill)", padding: "8px 16px", background: "rgba(22, 27, 32,0.35)", backdropFilter: "blur(6px)", animationDelay: `${pi * 0.55}s` }}>
              {p.t}
            </span>
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 nx-pulse-chip" style={{ top: "44%", fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", background: "var(--nx-ceramic)", borderRadius: "var(--nx-r-pill)", padding: "9px 16px", boxShadow: "var(--nx-e-3)", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "var(--nx-r-pill)", background: "var(--nx-success)", color: "var(--nx-fg)", textAlign: "center", lineHeight: "16px", fontSize: "var(--nx-t-xs)", marginRight: 8 }}>✓</span>
            All {PANEL_TOTAL_MARKERS} reviewed by a physician
          </span>
        </div>
        {/* Mobile: the floating pills above are hidden below sm — restate
            what the panel surfaces as a wrapped row so phones keep the point */}
        <div className="sm:hidden flex flex-wrap justify-center gap-2 mt-6">
          {SURFACE_PILLS.map((p) => (
            <span key={p.t} style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "rgba(243, 245, 247,0.75)", border: "1px solid rgba(243, 245, 247,0.22)", borderRadius: "var(--nx-r-pill)", padding: "7px 13px" }}>
              {p.t}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {[["One draw", `5-minute booking, ${SITE_STATS.labSites.display} locations`], [`${PANEL_TOTAL_MARKERS} markers`, "sugar to hormones"], ["Week 12", "included in your plan"]].map(([t, s]) => (
            <div key={t} style={{ background: "rgba(243, 245, 247,0.94)", borderRadius: "var(--nx-r-md)", padding: "1.1rem 1.2rem" }}>
              <div style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt-hover)" }}>{t}</div>
              <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: 4 }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "rgba(243, 245, 247,0.45)", marginTop: "1.2rem" }}>
          Lab results alone do not diagnose any condition. Out-of-range markers are conversations to have with your physician.
        </p>
      </div>
    </section>
  );
}

