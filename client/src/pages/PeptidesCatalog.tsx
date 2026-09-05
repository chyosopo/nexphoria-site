/* JOB: browse by goal, reach a PDP in one click; nothing else. */
/* ═══ PEPTIDES CATALOG — the twenty-two, to docs/COPY-DECK-PLAIN.md ═══
   The polish pass (2026-09-05): the goal tiles are the filter (a snap rail
   on the phone, five across on the desktop); on the phone the same goals
   follow as a sticky chip row once the tiles scroll away; the search field
   carries its icon, its clear button and a results line; the empty state
   is a tile; each group is its name and its line, then the cards. The
   styles live in styles/catalog.css (imported by ProductTile). */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SOLO_CATALOG, SOLO_CATEGORIES, type SoloCategory } from "@/data/soloCatalog";
import { Check, Search, SearchX, X } from "lucide-react";
import { F, S } from "@/lib/typography";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_TILE, TILE_DARK } from "@/lib/studioTiles";
import heroStill from "@/assets/studio/hero-still.webp";
import heroStill1200 from "@/assets/studio/hero-still-1200.webp";


/* Category key → the name the reader sees (the deck's category vocabulary,
   the same words as the goal tiles). Keys stay as they are in soloCatalog;
   only the display changes here. "Skin & Longevity" holds both the skin
   medicines and the energy and healthy ageing ones, so it shows as the
   first of those two names and its group line names both. */
const CAT_LABEL: Record<SoloCategory, string> = {
  Growth: "Body composition",
  Cognitive: "Focus and mood",
  Recovery: "Recovery",
  "Skin & Longevity": "Skin, energy and ageing",
  Metabolic: "Weight loss",
  Sleep: "Sleep",
  "Sexual Health": "Sexual health",
  Hormone: "Hormones",
};
/* One plain phrase per group, shown as the group heading. */
const CAT_LINE: Record<SoloCategory, string> = {
  Growth: "Body composition: your own growth hormone, lean mass and fat.",
  Cognitive: "Focus and mood: focus by day and a steadier mood under stress.",
  Recovery: "Recovery: injury and recovery from training.",
  "Skin & Longevity": "Skin, energy and ageing: skin firmness, cellular energy and healthy ageing.",
  Metabolic: "Weight loss: appetite and weight.",
  Sleep: "Sleep: deep sleep.",
  "Sexual Health": "Sexual health: desire, closeness and erectile function.",
  Hormone: "Hormones: low testosterone.",
};
const labelFor = (c: string) => (c === "All" ? "All" : CAT_LABEL[c as SoloCategory] ?? c);
/* The sticky header is 64px tall (Nav: h-16); the chip row pins under it. */
const HEADER_PX = 64;
const PHONE = "(max-width: 760px)";

/* Scroll a rail sideways so one of its children is in view: horizontal only,
   so choosing a goal from below never yanks the page back up to the tiles. */
function revealInRail(rail: HTMLElement | null, el: HTMLElement | null, pad: number) {
  if (!rail || !el || !window.matchMedia(PHONE).matches) return;
  const r = rail.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  if (e.left >= r.left && e.right <= r.right) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  rail.scrollTo({ left: rail.scrollLeft + (e.left - r.left) - pad, behavior: reduce ? "auto" : "smooth" });
}

export default function PeptidesCatalog({ world }: { world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  /* A hero tile arrives with ?goal=<peptide category>; the shelf opens on
     that goal. Read once, on the client only (the prerender sees "All"). */
  const [filter, setFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "All";
    const g = new URLSearchParams(window.location.search).get("goal");
    const map: Record<string, SoloCategory> = { metabolic: "Metabolic", growth: "Growth", recovery: "Recovery", longevity: "Skin & Longevity", skin: "Skin & Longevity", cognition: "Cognitive", sleep: "Sleep", "sexual-health": "Sexual Health", hormone: "Hormone" };
    return (g && map[g]) || "All";
  });
  const [q, setQ] = useState("");
  // Roving tabindex for the category filter toolbar (same idiom as Journal's
  // filter row): exactly one chip is Tab-reachable; Arrow/Home/End move focus
  // only (focus-follows, no auto-activation — a filter must not swap the grid
  // on mere traversal); Enter/Space/click still activate. Seeded to "All" (0).
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tilesRef = useRef<HTMLDivElement | null>(null);
  const pillsRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  /* The chip row shows only once the tiles have scrolled up under the
     header. A sentinel just below the search field tells us: when it has
     left through the top of the viewport, the tiles are gone. */
  const [chipsShown, setChipsShown] = useState(false);
  useEffect(() => {
    const s = sentinelRef.current;
    if (!s || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setChipsShown(!entry.isIntersecting && entry.boundingClientRect.top < HEADER_PX),
      { rootMargin: `-${HEADER_PX}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);
  useSeo({
    // World-aware path + title/description so /peptides, /men/peptides, and
    // /women/peptides each carry their own canonical/og:url and aren't three
    // homepage-canonical duplicates (the old omitted-path bug).
    path: `${base}/peptides`,
    title: world === "women"
      ? "Prescription peptides for women | Nexphoria"
      : world === "men"
      ? "Prescription peptides for men | Nexphoria"
      : "Prescription peptides, by what they treat | Nexphoria",
    description: "Prescription peptides organised by what they treat, each with what it is for, how it works, how you take it, and what it costs. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.",
    jsonLd: [
      // World-aware path so the WebPage node's url matches this page's own
      // canonical/og:url + breadcrumb + itemList (all `${base}/peptides`) on
      // /men/peptides and /women/peptides — not a neutral /peptides that
      // contradicts its siblings on the worlded routes.
      webPageJsonLd({ name: "Peptides", description: "Solo peptide catalog.", path: `${base}/peptides` }),
      breadcrumbJsonLd(
        world
          ? [{ name: "Home", path: "/" }, { name: world === "men" ? "Men" : "Women", path: `/${world}` }, { name: "Peptides", path: `/${world}/peptides` }]
          : [{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }],
      ),
      // ItemList of every catalog entry — real names/paths only, no prices/ratings here.
      itemListJsonLd({
        name: "Nexphoria peptide catalog",
        description: "Prescription peptides in the Nexphoria catalog.",
        items: SOLO_CATALOG.map((s) => ({ name: s.name, path: `${base}/peptides/${s.slug}` })),
      }),
    ],
  });

  const cats = ["All", ...SOLO_CATEGORIES];
  const needle = q.trim().toLowerCase();
  const shown = SOLO_CATALOG.filter(
    (s) =>
      (filter === "All" || s.category === filter) &&
      (!needle ||
        s.name.toLowerCase().includes(needle) ||
        s.category.toLowerCase().includes(needle) ||
        labelFor(s.category).toLowerCase().includes(needle) ||
        s.outcome.toLowerCase().includes(needle) ||
        s.mechanism.toLowerCase().includes(needle)),
  );

  /* On the phone the chosen tile and the chosen pill slide into view (a
     goal can arrive from a hero tile, a tile, or a chip). */
  useEffect(() => {
    const i = cats.indexOf(filter);
    revealInRail(tilesRef.current, chipRefs.current[i] ?? null, 24);
    revealInRail(pillsRef.current, pillRefs.current[i] ?? null, 24);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (c: string, i: number) => { setFilter(c); setFocusIdx(i); };

  const onFilterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = cats.length;
    let next = focusIdx;
    switch (e.key) {
      case "ArrowRight":
        next = (focusIdx + 1) % n;
        break;
      case "ArrowLeft":
        next = (focusIdx - 1 + n) % n;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setFocusIdx(next);
    chipRefs.current[next]?.focus();
  };

  // sr-only announcement mirrors the result set so AT users hear the new
  // filtered result set on every filter/search change (the plural word and
  // count match exactly what the grid shows).
  const noun = shown.length === 1 ? "peptide" : "peptides";
  const resultStatus = needle
    ? `Showing ${shown.length} ${noun} matching “${q.trim()}”${filter !== "All" ? ` in ${labelFor(filter)}` : ""}.`
    : filter === "All"
    ? `Showing all ${shown.length} ${noun}.`
    : `Showing ${shown.length} ${noun} in ${labelFor(filter)}.`;

  return (
    /* Carry the visitor's world into the chrome — otherwise a woman on
       /women/peptides gets the generic nav whose "Peptides" link points to
       /peptides → redirects to /men/peptides, silently ejecting her from
       her world. Worlded catalog keeps her in it. */
    <SiteLayout navVariant={world ?? "showcase"} footerVariant={world ?? "shared"}>
      <div className="nx-tight">
      <section className="nx-tilehero" aria-labelledby="peptides-hero-title">
        <div className="nx-container">
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">The medicines</p>
            <h1 id="peptides-hero-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>Start with what you want to change.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>
              Choose a goal, and every page tells you what the medicine treats, how it works, how you take it and what it costs. A licensed U.S. physician prescribes it, and a licensed U.S. pharmacy compounds it.
            </p>
          </div>
          {/* The goal tiles ARE the filter: one tile per category, the studio
              render on its goal-toned panel, pressed state on the chosen one.
              A snap rail on the phone, five across on the desktop. */}
          <div ref={tilesRef} role="toolbar" aria-orientation="horizontal" aria-label="Filter the catalog by goal" aria-controls="catalog-results" onKeyDown={onFilterKeyDown} className={`nx-tiles nx-tiles--goals${filter !== "All" ? " has-choice" : ""}`} data-testid="catalog-goal-tiles">
            {cats.map((c, i) => {
              const active = filter === c;
              const tile = c === "All" ? null : CATEGORY_TILE[c as SoloCategory];
              const dark = c === "All" ? false : TILE_DARK[c as SoloCategory];
              return (
                <button
                  key={c}
                  type="button"
                  ref={(el) => { chipRefs.current[i] = el; }}
                  onClick={() => choose(c, i)}
                  aria-pressed={active}
                  tabIndex={i === focusIdx ? 0 : -1}
                  data-testid={`filter-${c.toLowerCase()}`}
                  className={`nx-tile nx-tile--goal${dark ? " nx-tile--dark" : ""}${active ? " is-active" : ""}`}
                  style={{ ["--i" as string]: i }}
                >
                  {tile
                    ? <img src={tile.src} srcSet={`${tile.src600} 600w, ${tile.src} 1200w`} sizes="(max-width: 760px) 66vw, 20vw" alt="" width={1200} height={900} loading={i < 5 ? "eager" : "lazy"} decoding="async" />
                    : <img src={heroStill} srcSet={`${heroStill1200} 1200w, ${heroStill} 1800w`} sizes="(max-width: 760px) 66vw, 20vw" alt="" width={1800} height={1400} fetchPriority="high" decoding="async" />}
                  <span className="nx-tile__title" style={{ fontFamily: S }}>{c === "All" ? "All medicines" : labelFor(c)}</span>
                  <span className="nx-tile__check" aria-hidden="true"><Check strokeWidth={3} aria-hidden="true" />{active ? "Showing" : "Show"}</span>
                </button>
              );
            })}
          </div>
          <div className="nx-tilehero__foot">
            <div className="nx-search">
              <Search className="nx-search__icon" aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a medicine by name, goal, or mechanism"
                aria-label="Search the catalog"
                aria-controls="catalog-results"
                className="nx-input"
                data-testid="catalog-search"
                style={{ fontFamily: F }}
              />
              {q && (
                <button type="button" className="nx-search__clear" onClick={() => { setQ(""); searchRef.current?.focus(); }} aria-label="Clear the search" data-testid="catalog-search-clear">
                  <X aria-hidden="true" />
                </button>
              )}
            </div>
            {/* the results line, visible; the count is in the live region for AT */}
            <p className="nx-catalog-status" style={{ fontFamily: F }} aria-hidden="true" data-testid="catalog-results-line">
              {needle
                ? <>Matching <b>“{q.trim()}”</b>{filter !== "All" ? <> in <b>{labelFor(filter)}</b></> : null}.</>
                : filter === "All"
                ? <>Showing <b>every medicine</b>, by goal.</>
                : <>Showing <b>{labelFor(filter)}</b>.</>}
            </p>
          </div>
        </div>
      </section>

      {/* The sticky chip row (phone): the goals as pills, pinned under the
          header once the tiles have scrolled away. The sentinel above it is
          what the observer watches. */}
      <div ref={sentinelRef} aria-hidden="true" />
      <div className={`nx-goalchips${chipsShown ? " is-shown" : ""}`} data-testid="catalog-goal-chips" aria-hidden={!chipsShown}>
        <div className="nx-goalchips__bar">
          <div ref={pillsRef} className="nx-goalchips__row" role="toolbar" aria-orientation="horizontal" aria-label="Filter the catalog by goal" aria-controls="catalog-results">
            {cats.map((c, i) => (
              <button
                key={c}
                type="button"
                ref={(el) => { pillRefs.current[i] = el; }}
                onClick={() => choose(c, i)}
                aria-pressed={filter === c}
                tabIndex={chipsShown ? 0 : -1}
                className="nx-goalchip"
                style={{ fontFamily: F }}
                data-testid={`catalog-chip-${c.toLowerCase()}`}
              >
                {c === "All" ? "All medicines" : labelFor(c)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id="catalog-results" className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-tight)" }} aria-label="Peptide catalog" data-testid="catalog-results">
        {/* Screen-reader-only live region: announces the new filtered count on
            every filter/search change without the whole grid being re-read. The
            visible results line above is a styled label, not the live region
            (avoids a doubled announcement). */}
        <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="catalog-sr-status">
          {resultStatus}
        </p>
        {shown.length === 0 && (
          <div className="nx-catalog-empty" data-testid="filter-empty">
            <span className="nx-catalog-empty__icon" aria-hidden="true"><SearchX /></span>
            <h2 style={{ fontFamily: S }}>{needle ? `No matches for “${q.trim()}”.` : `No matches in ${labelFor(filter)}.`}</h2>
            <p style={{ fontFamily: F }}>Clear the search, or choose another goal from the tiles.</p>
            <button type="button" onClick={() => { setFilter("All"); setFocusIdx(0); setQ(""); }} className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="filter-empty-clear">
              Clear the filters
            </button>
          </div>
        )}
        {/* Goals before chemistry (ROADMAP 3.2): the default view groups the
            shelf by goal; filter and search flatten to one grid. */}
        {(() => {
          /* ProductCard draws the render itself, so nothing here picks a photo.
             The price line lives in the card, so a shelf card can never
             disagree with the PDP it links to. */
          const card = (s: (typeof shown)[number], i: number) => (
            <Reveal key={s.slug} delay={i * 35}>
              <ProductCard sku={s} index={i} />
            </Reveal>
          );
          const grouped = filter === "All" && !needle;
          if (!grouped) {
            return (
              <div className="nx-float-grid">
                {shown.map((s, i) => card(s, i))}
              </div>
            );
          }
          // Her page should open on her strongest affinity (Skin & Longevity),
          // not Growth — which on her home is last. Men keep the default order.
          const WOMEN_SHELF_ORDER = ["Skin & Longevity", "Metabolic", "Recovery", "Sleep", "Cognitive", "Sexual Health", "Growth"];
          const orderedCats = world === "women"
            ? [...SOLO_CATEGORIES].sort((a, b) => {
                const ia = WOMEN_SHELF_ORDER.indexOf(a); const ib = WOMEN_SHELF_ORDER.indexOf(b);
                return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
              })
            : SOLO_CATEGORIES;
          return orderedCats.map((cat) => {
            const items = shown.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="nx-catgroup" data-testid={`catalog-group-${cat.toLowerCase()}`}>
                <div className="nx-catgroup__head">
                  <h2 className="nx-dsh3" style={{ fontFamily: S }}>{labelFor(cat)}.</h2>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)" }}>{(CAT_LINE[cat] ?? "").replace(/^[^:]+:\s*/, "")}</p>
                </div>
                <div className="nx-float-grid">
                  {items.map((s, i) => card(s, i))}
                </div>
              </div>
            );
          });
        })()}
      </section>

      {/* the closer: the next step is a physician, as one tile */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="peptides-assess-title">
        <div className="nx-closer-tile">
          <div>
            <h2 id="peptides-assess-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0 }}>
              From here, a licensed physician reads your answers and decides.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>
              You complete a quick online visit at checkout, and the physician prescribes the medicine that fits or explains why not.
            </p>
            <Link href="/how-it-works" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", marginTop: "1.2rem" }} data-testid="catalog-assess-cta">
              How it works
            </Link>
          </div>
        </div>
      </section>
      </div>
    </SiteLayout>
  );
}
