import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { StartIntakeButton } from "./StartIntakeButton";
import { CartIconButton } from "./CartIconButton";
import { CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";

interface NavProps {
  variant?: "women" | "men" | "gate" | "showcase";
}

interface NavLink {
  label: string;
  href: string;
  /** When true, this item opens the Peptides mega-menu on hover (desktop). */
  mega?: boolean;
}

const showcaseLinks: NavLink[] = [
  { label: "Peptides", href: "/peptides", mega: true },
  { label: "Stacks", href: "/stacks" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Science", href: "/science" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const womenLinks: NavLink[] = [
  { label: "Peptides", href: "/women/peptides", mega: true },
  { label: "Stacks", href: "/stacks" },
  { label: "Custom Protocol", href: "/assessment" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const menLinks: NavLink[] = [
  { label: "Peptides", href: "/men/peptides", mega: true },
  { label: "Stacks", href: "/stacks" },
  { label: "Custom Protocol", href: "/assessment" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const gateLinks: NavLink[] = [
  { label: "For Women", href: "/women" },
  { label: "For Men", href: "/men" },
  { label: "Stacks", href: "/stacks" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Science", href: "/science" },
  { label: "Journal", href: "/journal" },
];

/* Six category tiles for the Peptides mega-menu. Order + copy tuned for
   the Hims-style "quiet mega-menu on hover" pattern: six restrained tiles,
   each a benefit line, plus a featured-peptides column on the right. */
const MEGA_CATEGORIES: { key: PeptideCategory; blurb: string }[] = [
  { key: "recovery", blurb: "Tissue repair, injury, training load" },
  { key: "skin", blurb: "Collagen, tone, aesthetic outcomes" },
  { key: "growth", blurb: "GH pulse, lean mass, body composition" },
  { key: "longevity", blurb: "Cellular energy, immune, healthspan" },
  { key: "cognition", blurb: "Focus, mood, neuroprotection" },
  { key: "metabolic", blurb: "Appetite, weight, glucose control" },
];

const MEGA_FEATURED: { name: string; slug: string; note: string }[] = [
  { name: "BPC-157", slug: "bpc-157", note: "The repair signal" },
  { name: "GHK-Cu", slug: "ghk-cu", note: "The skin reset" },
  { name: "Tirzepatide", slug: "tirzepatide", note: "The appetite reset" },
  { name: "NAD+", slug: "nad-plus", note: "The energy currency" },
];

export function Nav({ variant = "gate" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [location]);

  // Lock body scroll while the mobile full-screen drawer is open.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Close mega-menu / drawer on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links =
    variant === "showcase" ? showcaseLinks :
    variant === "women" ? womenLinks :
    variant === "men" ? menLinks :
    gateLinks;

  const navSource =
    variant === "showcase" ? "showcase-nav" :
    variant === "women" ? "women-nav" :
    variant === "men" ? "men-nav" :
    "gate-nav";
  const intakeSlug =
    variant === "women" ? "women-assessment" :
    variant === "men" ? "men-assessment" :
    "assessment";

  // Peptides base path drives every mega-menu link so women/men stay scoped.
  const pharmacyBase =
    variant === "women" ? "/women/peptides" :
    variant === "men" ? "/men/peptides" :
    "/peptides";

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || megaOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid var(--nx-border)" }}
      data-testid="site-nav"
    >
      <nav
        className="nx-container h-14 grid grid-cols-[auto_1fr_auto] items-center gap-4"
        aria-label="Primary"
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo variant="dark" />
        </div>

        {/* Center: links — desktop */}
        <ul className="hidden md:flex items-center justify-center gap-7 list-none m-0">
          {links.map((link) => {
            const isMega = !!link.mega;
            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={isMega ? openMega : undefined}
                onMouseLeave={isMega ? scheduleCloseMega : undefined}
              >
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 py-2 text-sm font-medium no-underline transition-colors"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    color: megaOpen && isMega ? "var(--nx-fg)" : "var(--nx-fg-graphite)",
                  }}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-haspopup={isMega ? "true" : undefined}
                  aria-expanded={isMega ? megaOpen : undefined}
                  onFocus={isMega ? openMega : undefined}
                >
                  {link.label}
                  {isMega && (
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-200"
                      style={{ transform: megaOpen ? "rotate(180deg)" : "none" }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: CTAs — desktop */}
        <div className="hidden md:flex items-center gap-3 justify-end">
          <StartIntakeButton
            productSlug={intakeSlug}
            source={navSource}
            size="sm"
            className="text-xs"
          >
            Start Intake
          </StartIntakeButton>
          <CartIconButton />
        </div>

        {/* Mobile right: cart + hamburger */}
        <div className="md:hidden flex items-center gap-1 justify-end col-start-3">
          <CartIconButton />
          <button
            className="p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-testid="button-mobile-menu"
            style={{ color: "var(--nx-fg)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Desktop Peptides mega-menu ── */}
      {megaOpen && (
        <div
          className="hidden md:block absolute left-0 right-0 top-full"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          data-testid="nav-mega-pharmacy"
        >
          <div
            className="shadow-lg"
            style={{
              background: "#ffffff",
              borderTop: "1px solid var(--nx-border)",
              borderBottom: "1px solid var(--nx-border)",
            }}
          >
            <div className="nx-container py-8 grid grid-cols-[1.6fr_1fr] gap-10">
              {/* Category tiles */}
              <div>
                <p
                  className="mb-4 text-[11px] uppercase"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    letterSpacing: "0.14em",
                    color: "var(--nx-fg-muted)",
                    fontWeight: 500,
                  }}
                  data-testid="mega-heading-categories"
                >
                  Shop by outcome
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {MEGA_CATEGORIES.map((c) => (
                    <Link
                      key={c.key}
                      href={`${pharmacyBase}?category=${c.key}`}
                      className="group block no-underline transition-colors"
                      style={{
                        border: "1px solid var(--nx-border)",
                        borderRadius: 14,
                        padding: "1rem 1.05rem",
                        background: "var(--nx-bg)",
                      }}
                      data-testid={`mega-category-${c.key}`}
                      onClick={() => setMegaOpen(false)}
                    >
                      <span
                        className="flex items-center justify-between"
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--nx-fg)",
                        }}
                      >
                        {CATEGORY_LABELS[c.key]}
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2}
                          className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="mt-1 block"
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: 12.5,
                          color: "var(--nx-fg-graphite)",
                          lineHeight: 1.45,
                        }}
                      >
                        {c.blurb}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href={pharmacyBase}
                  className="mt-4 inline-flex items-center gap-1.5 no-underline"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--nx-fg)",
                  }}
                  data-testid="mega-view-all"
                  onClick={() => setMegaOpen(false)}
                >
                  View the full pharmacy
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>

              {/* Featured peptides */}
              <div style={{ borderLeft: "1px solid var(--nx-border)", paddingLeft: "2.5rem" }}>
                <p
                  className="mb-4 text-[11px] uppercase"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    letterSpacing: "0.14em",
                    color: "var(--nx-fg-muted)",
                    fontWeight: 500,
                  }}
                  data-testid="mega-heading-featured"
                >
                  Featured peptides
                </p>
                <ul className="flex flex-col gap-1 list-none m-0">
                  {MEGA_FEATURED.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`${pharmacyBase}/${p.slug}`}
                        className="group flex items-baseline justify-between no-underline py-1.5"
                        data-testid={`mega-featured-${p.slug}`}
                        onClick={() => setMegaOpen(false)}
                      >
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--nx-fg)",
                          }}
                        >
                          {p.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: 12,
                            color: "var(--nx-fg-graphite)",
                          }}
                        >
                          {p.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/stacks"
                  className="mt-5 block no-underline"
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: 14,
                    padding: "0.9rem 1rem",
                    background: "var(--nx-bg)",
                  }}
                  data-testid="mega-stacks-promo"
                  onClick={() => setMegaOpen(false)}
                >
                  <span
                    className="block"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                    }}
                  >
                    Not sure where to start?
                  </span>
                  <span
                    className="mt-0.5 inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 12.5,
                      color: "var(--nx-fg-graphite)",
                    }}
                  >
                    Explore doctor-built stacks
                    <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile full-screen drawer ── */}
      {menuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bg-white z-40 flex flex-col"
          style={{ top: "56px", height: "calc(100vh - 56px)", borderTop: "1px solid var(--nx-border)" }}
          data-testid="nav-mobile-drawer"
        >
          <div className="nx-container flex-1 overflow-y-auto py-6">
            <ul className="flex flex-col list-none m-0">
              {links.map((link) => (
                <li
                  key={link.label}
                  style={{ borderBottom: "1px solid var(--nx-border)" }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 no-underline"
                    style={{
                      color: "var(--nx-fg)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                    data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={18} strokeWidth={2} style={{ color: "var(--nx-fg-muted)" }} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Category quick-links inside the drawer */}
            <p
              className="mt-8 mb-3 text-[11px] uppercase"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                letterSpacing: "0.14em",
                color: "var(--nx-fg-muted)",
                fontWeight: 500,
              }}
            >
              Shop by outcome
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MEGA_CATEGORIES.map((c) => (
                <Link
                  key={c.key}
                  href={`${pharmacyBase}?category=${c.key}`}
                  className="no-underline"
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: 14,
                    padding: "0.75rem 0.85rem",
                    background: "var(--nx-bg)",
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--nx-fg)",
                  }}
                  data-testid={`nav-mobile-category-${c.key}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {CATEGORY_LABELS[c.key]}
                </Link>
              ))}
            </div>
          </div>

          {/* Sticky CTA footer of the drawer */}
          <div
            className="nx-container py-5"
            style={{ borderTop: "1px solid var(--nx-border)", background: "white" }}
          >
            <StartIntakeButton
              productSlug={intakeSlug}
              source={`${navSource}-mobile`}
              size="md"
              className="w-full justify-center"
            >
              Start Intake
            </StartIntakeButton>
          </div>
        </div>
      )}
    </header>
  );
}
