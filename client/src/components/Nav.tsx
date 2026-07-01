import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { StartIntakeButton } from "./StartIntakeButton";
import { CartIconButton } from "./CartIconButton";

interface NavProps {
  variant?: "women" | "men" | "gate" | "showcase";
}

const showcaseLinks = [
  { label: "Pharmacy", href: "/peptides" },
  { label: "Stacks", href: "/stacks" },
  { label: "Build a stack", href: "/stacks/build" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Science", href: "/science" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const womenLinks = [
  { label: "Pharmacy", href: "/women/peptides" },
  { label: "Stacks", href: "/stacks" },
  { label: "Custom Protocol", href: "/assessment" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const menLinks = [
  { label: "Pharmacy", href: "/men/peptides" },
  { label: "Stacks", href: "/stacks" },
  { label: "Custom Protocol", href: "/assessment" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "Journal", href: "/journal" },
  { label: "How It Works", href: "/how-it-works" },
];

const gateLinks = [
  { label: "For Women", href: "/women" },
  { label: "For Men", href: "/men" },
  { label: "Stacks", href: "/stacks" },
  { label: "Bloodwork", href: "/bloodwork" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Science", href: "/science" },
  { label: "Journal", href: "/journal" },
];

export function Nav({ variant = "gate" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
      style={{ borderBottom: "1px solid var(--nx-border)" }}
    >
      <nav className="nx-container h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo variant="dark" />

        {/* Center: links — desktop */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-nx-graphite hover:text-nx-cobalt transition-colors no-underline"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#4A4A4A" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: CTAs — desktop */}
        <div className="hidden md:flex items-center gap-3">
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
        <div className="md:hidden flex items-center gap-1">
          <CartIconButton />
        <button
          className="p-2 -mr-2 text-nx-fg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
          style={{ color: "#0A0A0A" }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: "var(--nx-border)" }}>
          <ul className="nx-container py-4 flex flex-col gap-1 list-none">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2.5 text-sm font-medium no-underline"
                  style={{ color: "#4A4A4A", fontFamily: "'General Sans', system-ui, sans-serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t mt-2" style={{ borderColor: "var(--nx-border)" }}>
              <StartIntakeButton
                productSlug={intakeSlug}
                source={`${navSource}-mobile`}
                size="sm"
                className="w-full justify-center"
              >
                Start Intake
              </StartIntakeButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
