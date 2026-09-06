/* ═══ The header (2026-09-05 polish, the ten-agent pass) ═══
   Chiya: "even the little menu sidebar." The bar carries the logo, three
   links, one pill and the cart. Treatments and Protocols each open a panel
   that is the tile grammar of the home: every goal is a small tile with its
   studio render, its name and one plain line from the deck, and every
   protocol is a tile with its name and its tagline. On a phone the menu
   button opens a full-height sheet: the goals as a two-column grid of
   tiles, then Protocols, How it works, FAQ and Contact as rows, then the
   one pill. The sheet closes on Escape and on a route change, traps focus
   while open, and locks the page behind it.

   Nav law (ROADMAP 1.3) still holds: ONE button, at most five links, the
   cart icon. Cut to the spine (Chiya 2026-09-05): Treatments · Protocols ·
   How it works. Copy is the plain deck; nothing here persuades. Styles live
   in client/src/styles/nav.css (tokens only). */
import { m, AnimatePresence, rise, stagger, EASE } from "@/motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { StartIntakeButton } from "./StartIntakeButton";
import { CartIconButton } from "./CartIconButton";
import { CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";
import { GOAL_ORDER, GOAL_SHOUT } from "@/data/goalTeaching";
import { GOAL_TILE, PROTO_TILE } from "@/lib/studioTiles";
import "@/styles/nav.css";

interface NavProps {
  variant?: "women" | "men" | "gate" | "showcase";
}

type PanelKey = "treatments" | "protocols";

interface NavItem {
  label: string;
  href: string;
  panel?: PanelKey;
}

const ITEMS: NavItem[] = [
  { label: "Medicines", href: "/peptides", panel: "treatments" },
  { label: "Protocols", href: "/stacks", panel: "protocols" },
  { label: "How it works", href: "/how-it-works" },
];

/* The rows under the goal tiles on a phone. */
const SHEET_ROWS: { label: string; line: string; href: string }[] = [
  { label: "Protocols", line: "Medicines prescribed together, on one plan.", href: "/stacks" },
  { label: "How it works", line: "The questions, the physician, the first dose.", href: "/how-it-works" },
  { label: "FAQ", line: "The questions people ask before they order.", href: "/faq" },
  { label: "Contact", line: "Write to us, and a person answers.", href: "/contact" },
];

/* The studio tile per goal. The tile set keys sexual health as "sexual";
   the light tiles carry navy type, the dark ones ceramic. */
const TILE_KEY: Record<PeptideCategory, string> = {
  metabolic: "metabolic", growth: "growth", recovery: "recovery", longevity: "longevity", cognition: "cognition",
  sleep: "sleep", "sexual-health": "sexual", hormone: "hormone", skin: "skin",
};
const GOAL_DARK: Record<PeptideCategory, boolean> = {
  metabolic: false, growth: true, recovery: false, longevity: false, cognition: true, sleep: true, "sexual-health": true, hormone: true, skin: false,
};

/* Only goals with a medicine behind them render, so a tile never opens on
   an empty shelf. */
const GOALS: PeptideCategory[] = liveCategories(GOAL_ORDER).filter((g) => GOAL_ORDER.includes(g));

const CONTAINER = "nx-container";

function GoalTile({ goal, onPick, sizes, testid }: { goal: PeptideCategory; onPick: () => void; sizes: string; testid: string }) {
  const tile = GOAL_TILE[TILE_KEY[goal]];
  const dark = GOAL_DARK[goal];
  return (
    <Link href={`/peptides?goal=${goal}`} className={`nx-mtile${dark ? " nx-mtile--dark" : ""}`} onClick={onPick} data-testid={testid} aria-label={`${CATEGORY_LABELS[goal]}: ${GOAL_SHOUT[goal]}`}>
      {tile && <img src={tile.src} srcSet={`${tile.src600} 600w, ${tile.src} 1200w`} sizes={sizes} alt="" width={1200} height={900} loading="lazy" decoding="async" />}
      <span className="nx-mtile__copy" aria-hidden="true">
        <span className="nx-mtile__name">{CATEGORY_LABELS[goal]}</span>
        <span className="nx-mtile__line">{GOAL_SHOUT[goal]}</span>
      </span>
      <span className="nx-mtile__arrow" aria-hidden="true"><ArrowRight size={15} /></span>
    </Link>
  );
}

/* The tenth tile: every medicine, on navy. */
function AllTile({ onPick, testid }: { onPick: () => void; testid: string }) {
  return (
    <Link href="/peptides" className="nx-mtile nx-mtile--all" onClick={onPick} data-testid={testid}>
      <span className="nx-mtile__copy">
        <span className="nx-mtile__name">Every medicine</span>
        <span className="nx-mtile__line">What each one treats, how you take it and what it costs.</span>
      </span>
      <span className="nx-mtile__arrow" aria-hidden="true"><ArrowRight size={15} /></span>
    </Link>
  );
}

function TreatmentsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div data-testid="nav-mega-pharmacy">
      <div className="nx-hdr__panel-head">
        <h2 className="nx-hdr__panel-title">Choose a goal, and see what a physician can prescribe for it.</h2>
        <Link href="/peptides" className="nx-hdr__panel-all" onClick={onPick} data-testid="mega-view-all">Every medicine, by goal and by price <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <ul className="nx-mtiles nx-mtiles--goals" role="list">
        {GOALS.map((g) => (
          <li key={g}><GoalTile goal={g} onPick={onPick} sizes="(max-width: 1100px) 25vw, 20vw" testid={`nav-goal-${g}`} /></li>
        ))}
        <li><AllTile onPick={onPick} testid="nav-goal-all" /></li>
      </ul>
    </div>
  );
}

function ProtocolsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div data-testid="nav-mega-protocols">
      <div className="nx-hdr__panel-head">
        <h2 className="nx-hdr__panel-title">Two to four medicines a physician prescribes together, on one plan.</h2>
        <Link href="/stacks" className="nx-hdr__panel-all" onClick={onPick} data-testid="mega-view-all-protocols">Every protocol <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <ul className="nx-mtiles nx-mtiles--protocols" role="list">
        {FLAGSHIP_STACKS.map((st) => {
          const tile = PROTO_TILE[st.slug];
          return (
            <li key={st.slug}>
              <Link href={`/stacks/${st.slug}`} className="nx-mtile nx-mtile--proto" onClick={onPick} data-testid={`mega-stack-${st.slug}`} aria-label={`${st.name}: ${st.tagline}`}>
                {tile && <img src={tile.src} srcSet={`${tile.src600} 600w, ${tile.src} 1200w`} sizes="33vw" alt="" width={1200} height={900} loading="lazy" decoding="async" />}
                <span className="nx-mtile__copy" aria-hidden="true">
                  <span className="nx-mtile__name">{st.name}</span>
                  <span className="nx-mtile__line">{st.tagline}</span>
                </span>
                <span className="nx-mtile__arrow" aria-hidden="true"><ArrowRight size={15} /></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Nav({ variant = "gate" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  /* The sheet's portal mounts on the client only (the smoke renderer has no
     portals); AnimatePresence inside it needs the portal to stay mounted
     through the exit, so the gate is "on the client", not "menu open". */
  const [onClient, setOnClient] = useState(false);
  useEffect(() => { setOnClient(true); }, []);
  const [open, setOpen] = useState<PanelKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* A route change closes everything. */
  useEffect(() => { setMenuOpen(false); setOpen(null); }, [location]);

  /* The sheet locks the page behind it, takes focus, and gives it back to
     the menu button when it closes. */
  useEffect(() => {
    if (!menuOpen) {
      if (restoreFocus.current) { restoreFocus.current = false; burgerRef.current?.focus(); }
      return;
    }
    restoreFocus.current = true;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* A desktop panel closes on a click anywhere else. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (t && (panelRef.current?.contains(t) || (t as Element).closest?.("[data-nav-trigger]"))) return;
      setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const navSource = variant === "showcase" ? "showcase-nav" : variant === "women" ? "women-nav" : variant === "men" ? "men-nav" : "gate-nav";
  const intakeSlug = variant === "women" ? "women-assessment" : variant === "men" ? "men-assessment" : "assessment";

  const openPanel = (k: PanelKey) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(k); };
  const scheduleClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(null), 180); };
  const pick = useCallback(() => { setOpen(null); setMenuOpen(false); }, []);

  /* Arrow keys move between the tiles inside an open panel. */
  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>("a[href]");
    if (!nodes || nodes.length === 0) return;
    const items = Array.from(nodes);
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    switch (e.key) {
      case "ArrowDown": case "ArrowRight": next = current < 0 ? 0 : (current + 1) % items.length; break;
      case "ArrowUp": case "ArrowLeft": next = current <= 0 ? items.length - 1 : current - 1; break;
      case "Home": next = 0; break;
      case "End": next = items.length - 1; break;
      default: return;
    }
    e.preventDefault();
    items[next]?.focus();
  };

  /* Tab stays inside the sheet while it is open. */
  const onSheetKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !sheetRef.current) return;
    const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
    if (items.length === 0) return;
    const first = items[0], last = items[items.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && (active === first || !sheetRef.current.contains(active))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  };

  const isCurrent = (href: string) => location === href || location.startsWith(`${href}/`);

  return (
    <header className={`nx-hdr${scrolled || open ? " is-raised" : ""}`} data-testid="site-nav">
      <nav className={`${CONTAINER} nx-hdr__bar`} aria-label="Primary">
        <div className="nx-hdr__logo"><Logo variant="dark" /></div>

        <ul className="nx-hdr__links">
          {ITEMS.map((item) => {
            const isPanel = !!item.panel;
            const isOpen = isPanel && open === item.panel;
            return (
              <li key={item.label} onMouseEnter={isPanel ? () => openPanel(item.panel!) : undefined} onMouseLeave={isPanel ? scheduleClose : undefined}>
                <Link
                  href={item.href}
                  className={`nx-hdr__link${isOpen ? " is-open" : ""}${isCurrent(item.href) ? " is-current" : ""}`}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  data-nav-trigger={isPanel ? "true" : undefined}
                  aria-haspopup={isPanel ? "true" : undefined}
                  aria-expanded={isPanel ? isOpen : undefined}
                  aria-controls={isPanel ? `nav-panel-${item.panel}` : undefined}
                  onFocus={isPanel ? () => openPanel(item.panel!) : undefined}
                  onClick={pick}
                >
                  {item.label}
                  {isPanel && <ChevronDown size={14} strokeWidth={2} className="nx-hdr__chev" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nx-hdr__side">
          <StartIntakeButton productSlug={intakeSlug} source={navSource} size="sm" className="nx-hdr__cta">Find what fits</StartIntakeButton>
          <CartIconButton className="nx-hdr__cart" />
          <button
            ref={burgerRef}
            type="button"
            className="nx-hdr__icon nx-hdr__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-sheet"
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={22} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.8} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* ── Desktop panels ── */}
      {open && createPortal(<div className="nx-hdr__scrim" aria-hidden="true" onMouseEnter={scheduleClose} />, document.body)}
      {open && (
        <div
          ref={panelRef}
          id={`nav-panel-${open}`}
          className="nx-hdr__panel"
          onMouseEnter={() => openPanel(open)}
          onMouseLeave={scheduleClose}
          onKeyDown={onPanelKeyDown}
          data-testid={`nav-panel-${open}`}
        >
          <div className={`${CONTAINER} nx-hdr__panel-body`}>
            {open === "treatments" ? <TreatmentsPanel onPick={pick} /> : <ProtocolsPanel onPick={pick} />}
          </div>
        </div>
      )}

      {/* ── Phone sheet ── */}
      {onClient && createPortal(
        <AnimatePresence>
        {menuOpen && (
        <m.div
          ref={sheetRef}
          id="nav-mobile-sheet"
          className="nx-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onSheetKeyDown}
          data-testid="nav-mobile-drawer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.18, ease: "easeIn" } }}
        >
          <div className={`${CONTAINER} nx-sheet__bar`}>
            <Logo variant="dark" />
            <button type="button" className="nx-hdr__icon" onClick={() => setMenuOpen(false)} aria-label="Close menu" data-testid="button-mobile-menu-close">
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className={`${CONTAINER} nx-sheet__body`}>
            <p className="nx-sheet__label" id="nav-sheet-goals">Medicines, by goal</p>
            <m.ul className="nx-mtiles nx-sheet__goals" role="list" aria-labelledby="nav-sheet-goals" variants={stagger(0.04, 0.08)} initial="hidden" animate="show">
              {GOALS.map((g) => (
                <m.li key={g} variants={rise}><GoalTile goal={g} onPick={pick} sizes="50vw" testid={`nav-mobile-category-${g}`} /></m.li>
              ))}
              <m.li variants={rise}><AllTile onPick={pick} testid="nav-mobile-link-treatments" /></m.li>
            </m.ul>
            <m.ul className="nx-sheet__rows" role="list" variants={stagger(0.04, 0.3)} initial="hidden" animate="show">
              {SHEET_ROWS.map((r) => (
                <m.li key={r.href} variants={rise}>
                  <Link href={r.href} className="nx-sheet__row" onClick={pick} data-testid={`nav-mobile-link-${r.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span>{r.label}<small>{r.line}</small></span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </div>
          <div className={`${CONTAINER} nx-sheet__foot`}>
            <StartIntakeButton productSlug={intakeSlug} source={`${navSource}-mobile`} size="md" className="nx-sheet__cta">Find what fits</StartIntakeButton>
            <p className="nx-sheet__note">A licensed U.S. physician prescribes, if appropriate.</p>
          </div>
        </m.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
