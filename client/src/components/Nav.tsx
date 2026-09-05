/* ═══ The menu (2026-09-05, after alyverx.com) ═══
   Chiya: "even the menu bar, how it opens every component, it is so
   amazing." The grammar taken: each top item opens its own full-width
   panel; the panel has a rail on the left (the whole list, the quiz, the
   protocols, blood testing) and the products themselves on the right, each
   with its picture, its name and its price, grouped by goal. On a phone the
   same panels stack as an accordion in a full-screen drawer with the one
   button at the bottom. Copy is the plain deck; nothing here persuades.

   Nav law (ROADMAP 1.3) still holds: ONE button, at most five links, the
   cart icon. Treatments · Protocols · Blood testing · How it works · Find
   your medicine. */
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { StartIntakeButton } from "./StartIntakeButton";
import { CartIconButton } from "./CartIconButton";
import { SkuPhoto } from "./SkuPhoto";
import { VialPanel, labelSpec } from "./VialMockup";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { FLAGSHIP_STACKS, usd, type FlagshipStack } from "@/data/stacksCatalog";
import { stackArt } from "@/data/outcomeImagery";
import { F, S } from "@/lib/typography";

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
  { label: "Treatments", href: "/peptides", panel: "treatments" },
  { label: "Protocols", href: "/stacks", panel: "protocols" },
  { label: "Blood testing", href: "/labs" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Find your medicine", href: "/quiz" },
];

/* The goals, in four columns. Only goals with a medicine behind them render
   (liveCategories), so the menu can never open on an empty page. */
const GROUPS: { key: string; label: string; goals: PeptideCategory[] }[] = [
  { key: "weight", label: "Weight and body", goals: ["metabolic", "growth"] },
  { key: "recovery", label: "Recovery and ageing", goals: ["recovery", "skin", "longevity"] },
  { key: "mind", label: "Mind and sleep", goals: ["cognition", "sleep"] },
  { key: "sexual", label: "Sexual health and hormones", goals: ["sexual-health", "hormone"] },
].map((g) => ({ ...g, goals: liveCategories(g.goals as PeptideCategory[]).filter((c) => (g.goals as PeptideCategory[]).includes(c)) }));

function skusFor(goal: PeptideCategory): SoloPeptide[] {
  return peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
}

function priceLine(s: SoloPeptide): string {
  if (statusOf(s) !== "live") return "Not yet available";
  if (s.gated) return "Priced after review";
  return s.pricing ? `From ${usd(s.pricing.m12)}/mo` : "Priced at consultation";
}

function stackPrice(st: FlagshipStack): string {
  if (st.gated) return "Priced at consultation";
  const from = st.cadences.length ? Math.min(...st.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
  return from ? `From ${usd(from)}/mo` : "";
}

/* One product row in a panel: the vial, the name, the price. */
function MenuSku({ s, onPick }: { s: SoloPeptide; onPick: () => void }) {
  return (
    <Link href={`/peptides/${s.slug}`} className="nx-mega__item" onClick={onPick} data-testid={`mega-sku-${s.slug}`}>
      <span className="nx-mega__thumb" aria-hidden="true">
        <SkuPhoto slug={s.slug} name={s.name} className="nx-mega__img" fallback={<VialPanel name={s.name} dose={labelSpec(s.spec)} size="70%" ratio="1 / 1" fill={0.58} />} />
      </span>
      <span className="nx-mega__text">
        <span className="nx-mega__name" style={{ fontFamily: F }}>{s.name}</span>
        <span className="nx-mega__price" style={{ fontFamily: F }}>{priceLine(s)}</span>
      </span>
    </Link>
  );
}

function TreatmentsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="nx-mega__grid" data-testid="nav-mega-pharmacy">
      <aside className="nx-mega__rail" aria-label="Treatments">
        <Link href="/peptides" className="nx-mega__all" onClick={onPick} data-testid="mega-view-all">
          <span className="nx-mega__all-art" aria-hidden="true"><img src="img/img_b02fe34b47f7.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="nx-mega__all-title" style={{ fontFamily: S }}>All twenty-two medicines</span>
          <span className="nx-mega__all-line" style={{ fontFamily: F }}>What each is for, and its price. <ArrowRight size={13} aria-hidden="true" /></span>
        </Link>
        <Link href="/quiz" className="nx-mega__rail-link" onClick={onPick} data-testid="mega-quiz-link" style={{ fontFamily: F }}>Find your medicine <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <Link href="/labs" className="nx-mega__rail-link" onClick={onPick} data-testid="mega-labs-link" style={{ fontFamily: F }}>Blood testing <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <Link href="/how-it-works" className="nx-mega__rail-link" onClick={onPick} data-testid="mega-how-link" style={{ fontFamily: F }}>How it works <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </aside>
      <div className="nx-mega__cols">
        {GROUPS.filter((g) => g.goals.length).map((g) => (
          <section key={g.key} className="nx-mega__col" aria-label={g.label}>
            <p className="nx-mega__group" style={{ fontFamily: F }}>{g.label}</p>
            {g.goals.map((goal) => (
              <div key={goal} className="nx-mega__goal">
                <Link href={`/goals/${goal}`} className="nx-mega__goal-link" onClick={onPick} data-testid={`mega-category-${goal}`} style={{ fontFamily: F }}>
                  {CATEGORY_LABELS[goal]} <ArrowRight size={13} aria-hidden="true" />
                </Link>
                <ul className="nx-mega__list">
                  {skusFor(goal).map((s) => <li key={s.slug}><MenuSku s={s} onPick={onPick} /></li>)}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

function ProtocolsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="nx-mega__grid nx-mega__grid--protocols" data-testid="nav-mega-protocols">
      <aside className="nx-mega__rail" aria-label="Protocols">
        <Link href="/stacks" className="nx-mega__all" onClick={onPick} data-testid="mega-view-all-protocols">
          <span className="nx-mega__all-title" style={{ fontFamily: S }}>Medicines prescribed together</span>
          <span className="nx-mega__all-line" style={{ fontFamily: F }}>Two to four medicines on one plan, with one blood test before and one at week 12. <ArrowRight size={13} aria-hidden="true" /></span>
        </Link>
        <Link href="/stacks/build" className="nx-mega__rail-link" onClick={onPick} data-testid="mega-build-link" style={{ fontFamily: F }}>Build your own <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </aside>
      <ul className="nx-mega__stacks">
        {FLAGSHIP_STACKS.map((st) => {
          const art = stackArt(st.slug);
          return (
            <li key={st.slug}>
              <Link href={`/stacks/${st.slug}`} className="nx-mega__stack" onClick={onPick} data-testid={`mega-stack-${st.slug}`}>
                <span className="nx-mega__stack-art" aria-hidden="true">{art && <img src={art} alt="" loading="lazy" decoding="async" />}</span>
                <span className="nx-mega__text">
                  <span className="nx-mega__name" style={{ fontFamily: F }}>{st.name}</span>
                  <span className="nx-mega__line" style={{ fontFamily: F }}>{st.peptides.map((p) => p.name).join(" + ")}</span>
                  <span className="nx-mega__price" style={{ fontFamily: F }}>{stackPrice(st)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Nav({ variant = "gate" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<PanelKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState<PanelKey | null>("treatments");
  const [scrolled, setScrolled] = useState(false);
  const [, location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setOpen(null); }, [location]);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navSource = variant === "showcase" ? "showcase-nav" : variant === "women" ? "women-nav" : variant === "men" ? "men-nav" : "gate-nav";
  const intakeSlug = variant === "women" ? "women-assessment" : variant === "men" ? "men-assessment" : "assessment";

  const openPanel = (k: PanelKey) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(k); };
  const scheduleClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(null), 160); };
  const pick = () => setOpen(null);

  /* Arrow keys move between the links inside an open panel. */
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

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? "bg-white/95 md:backdrop-blur-md shadow-sm" : "bg-white"}`}
      style={{ borderBottom: "1px solid var(--nx-border)", transform: "translateZ(0)" }}
      data-testid="site-nav"
    >
      <nav className="nx-container h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4" aria-label="Primary">
        <div className="flex items-center"><Logo variant="dark" /></div>

        <ul className="hidden md:flex items-center justify-center gap-6 list-none m-0">
          {ITEMS.map((item) => {
            const isPanel = !!item.panel;
            const isOpen = isPanel && open === item.panel;
            return (
              <li key={item.label} className="relative" onMouseEnter={isPanel ? () => openPanel(item.panel!) : undefined} onMouseLeave={isPanel ? scheduleClose : undefined}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 py-2 text-sm font-medium no-underline transition-colors"
                  style={{ fontFamily: F, color: isOpen ? "var(--nx-fg)" : "var(--nx-fg-graphite)" }}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-haspopup={isPanel ? "true" : undefined}
                  aria-expanded={isPanel ? isOpen : undefined}
                  onFocus={isPanel ? () => openPanel(item.panel!) : undefined}
                >
                  {item.label}
                  {isPanel && <ChevronDown size={14} strokeWidth={2} className="transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3 justify-end">
          <StartIntakeButton productSlug={intakeSlug} source={navSource} size="sm" className="text-xs">Get started</StartIntakeButton>
          <CartIconButton />
        </div>

        <div className="md:hidden flex items-center gap-1 justify-end col-start-3">
          <CartIconButton />
          <button className="p-2 -mr-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} data-testid="button-mobile-menu" style={{ color: "var(--nx-fg)" }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Desktop panels ── */}
      {open && (
        <div ref={panelRef} className="nx-mega hidden md:block absolute left-0 right-0 top-full" onMouseEnter={() => openPanel(open)} onMouseLeave={scheduleClose} onKeyDown={onPanelKeyDown} data-testid={`nav-panel-${open}`}>
          <div className="nx-mega__sheet">
            <div className="nx-container nx-mega__body">
              {open === "treatments" ? <TreatmentsPanel onPick={pick} /> : <ProtocolsPanel onPick={pick} />}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile full-screen drawer, portaled to body (the sticky header's
          transform would otherwise become the containing block) ── */}
      {menuOpen && createPortal(
        <div className="md:hidden fixed left-0 right-0 bg-white z-[60] flex flex-col" style={{ top: "64px", height: "calc(100dvh - 64px)", borderTop: "1px solid var(--nx-border)" }} data-testid="nav-mobile-drawer">
          <div className="nx-container flex-1 overflow-y-auto py-4" style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}>
            <ul className="nx-mega-m" role="list">
              {ITEMS.map((item) => (
                <li key={item.label} className="nx-mega-m__item">
                  {item.panel ? (
                    <>
                      <button type="button" className="nx-mega-m__head" aria-expanded={mobileOpen === item.panel} onClick={() => setMobileOpen(mobileOpen === item.panel ? null : item.panel!)} data-testid={`nav-mobile-${item.panel}`} style={{ fontFamily: F }}>
                        {item.label} <ChevronDown size={18} strokeWidth={2} style={{ transform: mobileOpen === item.panel ? "rotate(180deg)" : "none" }} aria-hidden="true" />
                      </button>
                      {mobileOpen === item.panel && (
                        <div className="nx-mega-m__panel">
                          {item.panel === "treatments" ? (
                            <>
                              <Link href="/peptides" className="nx-mega-m__link" onClick={() => setMenuOpen(false)} style={{ fontFamily: F }}>All twenty-two medicines <ArrowRight size={14} aria-hidden="true" /></Link>
                              {GROUPS.filter((g) => g.goals.length).map((g) => (
                                <div key={g.key} className="nx-mega-m__group">
                                  <p className="nx-mega__group" style={{ fontFamily: F }}>{g.label}</p>
                                  {g.goals.map((goal) => (
                                    <div key={goal} className="nx-mega__goal">
                                      <Link href={`/goals/${goal}`} className="nx-mega__goal-link" onClick={() => setMenuOpen(false)} data-testid={`nav-mobile-category-${goal}`} style={{ fontFamily: F }}>{CATEGORY_LABELS[goal]} <ArrowRight size={13} aria-hidden="true" /></Link>
                                      <ul className="nx-mega__list">
                                        {skusFor(goal).map((s) => <li key={s.slug}><MenuSku s={s} onPick={() => setMenuOpen(false)} /></li>)}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </>
                          ) : (
                            <ul className="nx-mega__stacks nx-mega__stacks--m">
                              {FLAGSHIP_STACKS.map((st) => (
                                <li key={st.slug}>
                                  <Link href={`/stacks/${st.slug}`} className="nx-mega__stack" onClick={() => setMenuOpen(false)}>
                                    <span className="nx-mega__stack-art" aria-hidden="true">{stackArt(st.slug) && <img src={stackArt(st.slug)} alt="" loading="lazy" decoding="async" />}</span>
                                    <span className="nx-mega__text">
                                      <span className="nx-mega__name" style={{ fontFamily: F }}>{st.name}</span>
                                      <span className="nx-mega__price" style={{ fontFamily: F }}>{stackPrice(st)}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="nx-mega-m__head" onClick={() => setMenuOpen(false)} data-testid={`nav-mobile-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`} style={{ fontFamily: F }}>
                      {item.label} <ArrowUpRight size={18} strokeWidth={2} style={{ color: "var(--nx-fg-muted)" }} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="nx-container py-4" style={{ borderTop: "1px solid var(--nx-border)", background: "white" }}>
            <StartIntakeButton productSlug={intakeSlug} source={`${navSource}-mobile`} size="md" className="w-full justify-center">Get started</StartIntakeButton>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
