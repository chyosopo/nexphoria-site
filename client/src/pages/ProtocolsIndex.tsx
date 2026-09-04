/* JOB: compare the seven flagship protocols and pick one. */
/* ═══ PROTOCOLS INDEX — the flagship stacks still on the shelf ═══
   Reads FLAGSHIP_STACKS, which the launch scope filters (stacksCatalog
   LAUNCH_STACK_SLUGS). It was 'the seven'; six are retired. ═══ */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { SpineStrip } from "@/components/SpineStrip";
import { Reveal } from "@/components/Reveal";
import { ProofStrip, SectionHead } from "@/components/EnterprisePatterns";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd, stackReservable, stackComponents, SAME_JOB, PAIRS_WELL, FULL_STACK } from "@/data/stacksCatalog";
import { soloByName } from "@/data/soloCatalog";
import { RETEST_WEEK } from "@/data/monitoring";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { stackArt, outcomeSrcSet } from "@/data/outcomeImagery";
import vialLineupHero from "@/assets/brand/vial-lineup-hero.webp";
import vialLineupMaster from "@/assets/brand/vial-lineup-master.webp";

const ALL_CATEGORIES = ["All", "Recovery", "Skin", "Growth", "Cognitive", "Longevity", "Metabolic", "Sleep"];
/* Chip → category-substring aliases. "Growth" must also catch "GH Axis &
   Body Composition" (Ascend) — plain substring matching left it orphaned
   behind a chip that auto-hid itself at zero matches. */
const CHIP_ALIASES: Record<string, string[]> = { Growth: ["growth", "gh axis"] };
const matchCat = (c: string, filter: string) =>
  filter === "All" ||
  (CHIP_ALIASES[filter] ?? [filter.toLowerCase()]).some((m) => c.toLowerCase().includes(m));
/* Only surface a chip when it actually has protocols behind it — a 0-count
   filter is a dead end (visual-QA finding). "All" always shows. */
const CATEGORIES = ALL_CATEGORIES.filter(
  (c) => c === "All" || FLAGSHIP_STACKS.some((s) => matchCat(s.category, c)),
);

export default function ProtocolsIndex() {
  const [filter, setFilter] = useState("All");
  /* The shelf reads in the visitor's world (Chiya: worlds fully separate,
     everything tailored): her protocols lead on her side, his on his, the
     shared ones between, the other world's flagship last — badged, never
     hidden (one engine underneath). */
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  const ownLean = world === "women" ? "her" : "him";
  const otherLean = world === "women" ? "him" : "her";
  const leanRank = (lean?: "him" | "her" | "both") =>
    lean === ownLean ? 0 : lean === otherLean ? 2 : 1;
  // Single-sourced so the meta description and the webPage JSON-LD node can't
  // drift apart. Typed MedicalWebPage for clinical E-E-A-T parity with the
  // protocol PDPs it indexes (StackPage) and the sibling goal-protocol index
  // (Category) — both already MedicalWebPage; this flagship index was the
  // lone plain WebPage outlier.
  const desc = "Seven flagship peptide protocols, each with a defined timeline, a full blood panel at week 12, and doctor oversight.";
  useSeo({
    title: "Protocols: Doctor-Curated Peptide Stacks | Nexphoria",
    description: desc,
    // Neutral canonical. This index renders at four routes (/stacks,
    // /protocols, /men/protocols, /women/protocols); consolidate them onto
    // /stacks — the same URL the webPage/breadcrumb JSON-LD already declares —
    // so Google indexes one page. Omitting path silently canonicalized the
    // whole index onto the homepage (the SoloPDP omitted-path deindex bug).
    path: "/stacks",
    jsonLd: [
      webPageJsonLd({ name: "Protocols", description: desc, path: "/stacks", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Protocols", path: "/stacks" }]),
      // ItemList of the flagship protocols — real names/paths only, no prices here.
      itemListJsonLd({
        name: "Nexphoria peptide protocols",
        description: "Doctor-curated peptide stacks in the Nexphoria formulary.",
        items: FLAGSHIP_STACKS.map((s) => ({ name: s.name, path: `/stacks/${s.slug}` })),
      }),
    ],
  });

  const shown = FLAGSHIP_STACKS.filter((s) => matchCat(s.category, filter))
    .slice()
    .sort((a, b) => leanRank(a.worldLean) - leanRank(b.worldLean));

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      <section className="nx-hero-r3 relative" style={{ overflow: "hidden" }} aria-labelledby="protocols-hero-title">
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Protocols</p>
              <h1 id="protocols-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-snug)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem" }}>
                Protocols. <em style={{ color: "var(--nx-cobalt)" }}>Medications that work together, one plan.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1rem" }}>
                A protocol combines two to four medications that work together, on one plan, with a free baseline blood kit on your first order and the same panel again at week 12. Prescribed online by licensed U.S. physicians.
              </p>
            </div>
            <div className="nx-hero-media nx-hero-frame nx-hero-bleed" style={{ position: "relative", aspectRatio: "5 / 4" }}>
              <img src={vialLineupHero} alt="The Nexphoria protocol vial lineup" fetchPriority="high" width={1600} height={1280} />
              <div className="nx-gradient-overlay tint" aria-hidden />
              <div
                style={{
                  position: "absolute", top: 14, right: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  background: "color-mix(in srgb, var(--nx-bg-dark) 60%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "var(--nx-r-pill)", padding: "8px 14px",
                }}
              >
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
                  {FLAGSHIP_STACKS.length} protocols · one panel each
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SpineStrip stop={2} />

      {/* why a protocol vs à la carte */}
      <section className="nx-container" style={{ paddingTop: "0", paddingBottom: "var(--nx-sp-tight)" }} aria-label="Why a protocol">
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 12 }}>
          {[
            { h: "Chosen to work together", d: "Each medication in a protocol is picked for how it works alongside the others." },
            { h: "Test, start, retest", d: `A free baseline blood kit with your first order, and the same panel again at week ${RETEST_WEEK}, included.` },
            { h: "One figure, paid up front", d: "One month to try it, or 10, 15 or 20% less per month at three, six and twelve months. The figure is complete." },
          ].map((b) => (
            <div key={b.h} className="nx-glass-tile" style={{ display: "block" }}>
              <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{b.h}</h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* filter */}
      <section className="nx-container" style={{ paddingBottom: "1rem" }} aria-label="Filter protocols">
        <div role="group" aria-label="Filter protocols by category" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map((c) => {
            const n = c === "All" ? FLAGSHIP_STACKS.length : FLAGSHIP_STACKS.filter((s) => matchCat(s.category, c)).length;
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={active} data-testid={`protofilter-${c.toLowerCase()}`} className="nx-filter-chip" style={{
                fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600,
              }}>
                {c}<span style={{ opacity: 0.6, marginLeft: 6, fontWeight: 500 }}>{n}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>
          {shown.length} {shown.length === 1 ? "protocol" : "protocols"}{filter !== "All" ? ` · ${filter}` : ""}
        </p>
      </section>

      {/* grid — compact floating product tiles (hims pattern) */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-sec)" }} aria-label="Protocols">
        <div className="nx-float-grid">
          {shown.map((s, i) => {
            const rec = s.cadences.length ? Math.min(...s.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
            const reservable = stackReservable(s);
            return (
              <Reveal key={s.slug} delay={i * 45}>
                <Link href={`/stacks/${s.slug}`} data-testid={`protocol-${s.slug}`} className="nx-float-card">
                  <div className="nx-float-card__media">
                    {stackArt(s.slug, world) && (
                      <img
                        src={stackArt(s.slug, world)}
                        srcSet={outcomeSrcSet(stackArt(s.slug, world)!)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt="" aria-hidden loading="lazy" width={1632} height={2048}
                      />
                    )}
                    {s.gated && (
                      <span className="nx-float-badge"><Lock size={10} aria-hidden="true" /> Assessed</span>
                    )}
                    {reservable && (
                      <span className="nx-float-badge">Reserve</span>
                    )}
                    {/* the lean badge makes a cross-world flagship read as
                        intentional, not a leak */}
                    {s.worldLean && s.worldLean !== "both" && (
                      <span className="nx-float-badge" style={{ top: "auto", bottom: 8 }}>
                        Made for {s.worldLean}
                      </span>
                    )}
                  </div>
                  <div className="nx-float-card__body">
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{s.category}</p>
                    <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem" }}>{s.name}</h2>
                    <p className="nx-line-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4, color: "var(--nx-fg-muted)", marginTop: "0.25rem" }}>{s.tagline}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.85rem" }}>
                      <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                        {s.gated ? "Priced at consultation" : rec ? `From ${usd(rec)}/mo` : ""}
                      </span>
                      <ArrowRight size={16} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          {/* Build-your-own — same floating silhouette, vial imagery */}
          {filter === "All" && (
            <Reveal delay={shown.length * 45}>
              <Link href="/stacks/build" data-testid="protocol-build" className="nx-float-card">
                <div className="nx-float-card__media">
                  <img src={vialLineupMaster} alt="" aria-hidden loading="lazy" width={1600} height={2000} />
                </div>
                <div className="nx-float-card__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Custom</p>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem" }}>Build your own</h2>
                  <p className="nx-line-1" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4, color: "var(--nx-fg-muted)", marginTop: "0.25rem" }}>Start from a goal. Your doctor reviews it.</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.85rem" }}>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>Start building</span>
                    <ArrowRight size={16} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── How they fit together: what to combine, what to pick one of (the playbook) ── */}
      <section className="nx-container" style={{ paddingTop: "0", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="protocols-synergy-title" data-testid="protocols-synergy">
        <SectionHead
          eyebrow="How they fit together"
          title={<>What to combine, and what to pick one of.</>}
          lead="Every protocol is built on one rule: each medicine does a different job. Here is the same rule, so you can build your own with confidence."
          maxTitle="18ch"
        />
        <div className="nx-synergy" style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
          <div className="nx-synergy__col">
            <p className="nx-synergy__h" style={{ fontFamily: F }}>Pairs well</p>
            <ul className="nx-synergy__list">
              {PAIRS_WELL.map((p) => (
                <li key={p.pair.join("+")} className="nx-synergy__item">
                  <p style={{ fontFamily: S }} className="nx-synergy__pair">
                    {p.pair.map((n, i) => { const s = soloByName(n); return (
                      <span key={n}>{i > 0 && <span aria-hidden> + </span>}{s ? <Link href={`/peptides/${s.slug}`}>{n}</Link> : n}</span>
                    ); })}
                  </p>
                  <p style={{ fontFamily: F }} className="nx-synergy__note">{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="nx-synergy__col nx-synergy__col--one">
            <p className="nx-synergy__h" style={{ fontFamily: F }}>One at a time</p>
            <ul className="nx-synergy__list">
              {SAME_JOB.map((g) => (
                <li key={g.name} className="nx-synergy__item">
                  <p style={{ fontFamily: S }} className="nx-synergy__pair">{g.name}</p>
                  <p style={{ fontFamily: F }} className="nx-synergy__members">
                    {g.members.map((n, i) => { const s = soloByName(n); return (
                      <span key={n}>{i > 0 && <span aria-hidden> · </span>}{s ? <Link href={`/peptides/${s.slug}`}>{n}</Link> : n}</span>
                    ); })}
                  </p>
                  <p style={{ fontFamily: F }} className="nx-synergy__note">{g.note}</p>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: F }} className="nx-synergy__foot">
              {FULL_STACK.name}: {FULL_STACK.line} From {usd(FULL_STACK.base)}/mo, if prescribed.
            </p>
          </div>
        </div>
      </section>

      {/* Measured, then adjusted. The sample "biomarker index" dashboard was retired 2026-09-03: fabricated-looking figures. */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }} aria-label="Measured, then adjusted">
        <div style={{ maxWidth: 720 }}>
          <div>
            <SectionHead
              eyebrow="Measured, then adjusted"
              title={<>Every protocol answers to the panel.</>}
              lead={`A free baseline blood kit ships with your first order, so your physician doses against your numbers. At week ${RETEST_WEEK} the same panel is drawn again, included, and your dose follows what changed.`}
              maxTitle="15ch"
            />
            <ProofStrip
              quote="Your physician reads your baseline before your dose is set, and your week-12 panel before any protocol continues."
              attr="The Nexphoria clinical standard"
              style={{ marginTop: "clamp(1.8rem,3vw,2.6rem)" }}
            />
          </div>
        </div>
      </section>

      {/* not sure which — route to the assessment */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "var(--nx-sp-band) 0" }} aria-labelledby="protocols-assess-title">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>Not sure which fits?</p>
          <h2 id="protocols-assess-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            Not sure which one? <em style={{ color: "var(--nx-acid)" }}>Start with a few health questions.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            Answer a few health questions and a licensed physician will point you to the right protocol, or to a single medication if that fits better.
          </p>
          <Link href="/assessment" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }} data-testid="proto-assess-cta">
            Get started
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
