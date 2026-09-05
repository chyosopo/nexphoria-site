/* JOB: read the protocols on the shelf and reach one. */
/* ═══ PROTOCOLS INDEX — the protocols still on the shelf, to
   docs/COPY-DECK-PLAIN.md. Reads FLAGSHIP_STACKS, which the launch scope
   filters (stacksCatalog LAUNCH_STACK_SLUGS). ═══ */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/EnterprisePatterns";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd, stackReservable, SAME_JOB, PAIRS_WELL } from "@/data/stacksCatalog";
import { soloByName } from "@/data/soloCatalog";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { stackArt, outcomeSrcSet } from "@/data/outcomeImagery";
import vialLineupHero from "@/assets/brand/vial-lineup-hero.webp";
import vialLineupMaster from "@/assets/brand/vial-lineup-master.webp";

/* Filter chips in the deck's category vocabulary (the same words as the
   goal tiles and the catalog filters). Each chip matches a protocol by
   substrings of its stacksCatalog `category`, so a renamed category still
   lands behind the right word. */
const ALL_CATEGORIES = [
  "All", "Weight loss", "Body composition", "Recovery", "Skin and ageing", "Energy and healthy ageing",
  "Focus and mood", "Sleep", "Sexual health", "Hormones",
];
const CHIP_ALIASES: Record<string, string[]> = {
  "Weight loss": ["metabolic", "weight"],
  "Body composition": ["growth", "gh axis", "body composition"],
  Recovery: ["recovery"],
  "Skin and ageing": ["skin"],
  "Energy and healthy ageing": ["longevity", "cellular", "energy", "healthy ageing"],
  "Focus and mood": ["cognitive", "cognition", "focus", "mood"],
  Sleep: ["sleep"],
  "Sexual health": ["sexual"],
  Hormones: ["hormone", "testosterone"],
};
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
     shared ones between, the other world's flagship last, never hidden
     (one engine underneath). */
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
  const desc = `Medicines prescribed together, on one plan. A protocol is two to four medicines a physician prescribes together, with one blood test before you start and the same test at week ${RETEST_WEEK}.`;
  useSeo({
    title: "Protocols: medicines prescribed together | Nexphoria",
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
        description: "Peptide protocols in the Nexphoria catalog.",
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
            <div className="nx-sec-head">
              <p className="nx-eyebrow">Protocols</p>
              <h1 id="protocols-hero-title" className="nx-dsh1" style={{ maxWidth: "16ch" }}>
                Protocols. Medicines prescribed together, on one plan.
              </h1>
              <p className="nx-lede" style={{ maxWidth: "50ch" }}>
                A protocol is two to four medicines a physician prescribes together, with one blood test before you start and the same test at week {RETEST_WEEK}. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.
              </p>
            </div>
            <div className="nx-hero-media nx-hero-frame nx-hero-bleed" style={{ position: "relative", aspectRatio: "5 / 4" }}>
              <img src={vialLineupHero} alt="The Nexphoria protocol vial lineup" fetchPriority="high" width={1600} height={1280} />
              <div className="nx-gradient-overlay tint" aria-hidden />
            </div>
          </div>
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
                      <span className="nx-float-badge">Pending</span>
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
              <Link href="/stacks" data-testid="protocol-build" className="nx-float-card">
                <div className="nx-float-card__media">
                  <img src={vialLineupMaster} alt="" aria-hidden loading="lazy" width={1600} height={2000} />
                </div>
                <div className="nx-float-card__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Custom</p>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem" }}>Build your own</h2>
                  <p className="nx-line-1" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4, color: "var(--nx-fg-muted)", marginTop: "0.25rem" }}>Choose the medicines. A physician reviews them.</p>
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
          title={<>How they fit together.</>}
          lead="Each medicine in a protocol does a different job. The same rule applies if you build your own."
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
          </div>
        </div>
      </section>

      {/* Blood testing. The sample "biomarker index" dashboard was retired 2026-09-03: fabricated-looking figures. */}
      <section className="nx-container nx-sec" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-label="Blood testing">
        <div style={{ maxWidth: 720 }}>
          <div>
            <SectionHead
              eyebrow="Blood testing"
              title={<>A blood test before you start, and again at week {RETEST_WEEK}.</>}
              lead={`The kit ships with your first order and you draw at home before the first dose. At week ${RETEST_WEEK} the same ${PANEL_TOTAL_MARKERS} markers are tested again and your physician adjusts from what changed.`}
              maxTitle="18ch"
            />
          </div>
        </div>
      </section>

      {/* the closer: the health questions choose */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "var(--nx-sp-band) 0" }} aria-labelledby="protocols-assess-title">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <h2 id="protocols-assess-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            Not sure which one?
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            The health questions ask what you are treating. A licensed physician chooses the protocol, or a single medicine if that fits better.
          </p>
          <Link href="/peptides" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }} data-testid="proto-assess-cta">
            See if I'm eligible
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
