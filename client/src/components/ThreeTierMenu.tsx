import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/* Three-tier pharmacy menu — surfaces the new positioning on every home page:
   1. Single peptides (catalog)
   2. Doctor-curated stacks
   3. Fully custom protocol (intake)
   This is the central pharmacy-first navigation block.
*/

interface ThreeTierMenuProps {
  gender: "women" | "men";
}

interface Tier {
  num: string;
  eyebrow: string;
  title: string;
  italic: string;
  body: string;
  cta: string;
  href: string;
  testid: string;
  meta: string;
}

export function ThreeTierMenu({ gender }: ThreeTierMenuProps) {
  const peptidesHref = gender === "women" ? "/women/peptides" : "/men/peptides";

  const tiers: Tier[] = [
    {
      num: "01",
      eyebrow: "Tier 01 · Á la carte",
      title: "Single",
      italic: "peptides",
      body:
        "Pick exactly the compounds you want. 16 peptides, individually priced, individually compounded. Your physician approves before anything ships.",
      cta: "Browse the catalog",
      href: peptidesHref,
      testid: "tier-peptides",
      meta: "16 peptides · from $149/mo",
    },
    {
      num: "02",
      eyebrow: "Tier 02 · Doctor-curated",
      title: "Flagship",
      italic: "stacks",
      body:
        "Six pre-built protocols formulated by our medical directors — each tested against published literature and our internal outcomes. Buy as-is or customize.",
      cta: "See the six stacks",
      href: "/stacks",
      testid: "tier-stacks",
      meta: "6 stacks · 12% bundle savings",
    },
    {
      num: "03",
      eyebrow: "Tier 03 · Bespoke",
      title: "Custom",
      italic: "protocol",
      body:
        "Take the structured intake. Our physicians design a peptide protocol around your bloodwork, goals, and medical history — no off-the-shelf bundle required.",
      cta: "Take the intake",
      href: "/assessment",
      testid: "tier-custom",
      meta: "Personalized · physician-built",
    },
  ];

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid={`${gender}-three-tier-menu`}
    >
      <div className="nx-container">
        {/* Eyebrow */}
        <div
          className="text-[11px] uppercase tracking-[0.24em] mb-3"
          style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#1F5FD0" }}
        >
          The Pharmacy · Three ways to start
        </div>

        {/* Headline */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2
            className="text-4xl md:text-5xl leading-[1.05]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0E2447", fontWeight: 500 }}
          >
            Choose the compounds. <span style={{  }}>Or let us choose for you.</span>
          </h2>
          <p
            className="mt-5 text-base md:text-lg max-w-2xl"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#4A6690", lineHeight: 1.65 }}
          >
            Nexphoria is a peptide pharmacy. We don't lock you into a single bundle — pick à la carte,
            grab a physician-curated stack, or have your doctor build something custom.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--nx-border)" }}>
          {tiers.map((t) => (
            <Link asChild key={t.testid} href={t.href}>
              <a
                className="block group transition-colors"
                style={{
                  background: "#fff",
                  textDecoration: "none",
                  padding: "2.5rem 2rem",
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                data-testid={t.testid}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mb-5"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#1F5FD0" }}
                >
                  {t.eyebrow}
                </div>

                <div
                  className="text-[3.5rem] leading-[0.9] mb-6"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    color: "#0E2447",
                    fontWeight: 500,
                  }}
                >
                  {t.title}
                  <br />
                  <span
                    style={{
                      
                      fontWeight: 400,
                      color: "#4A6690",
                    }}
                  >
                    {t.italic}
                  </span>
                </div>

                <p
                  className="text-sm mb-6 flex-1"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#4A6690", lineHeight: 1.65 }}
                >
                  {t.body}
                </p>

                <div
                  className="text-[10px] uppercase tracking-[0.18em] mb-4"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#5C77A0" }}
                >
                  {t.meta}
                </div>

                <span
                  className="inline-flex items-center gap-1.5 text-sm transition-colors group-hover:gap-2.5"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    color: "#0E2447",
                    fontWeight: 500,
                    borderTop: "1px solid var(--nx-border)",
                    paddingTop: "1.25rem",
                  }}
                >
                  {t.cta} <ArrowRight size={14} strokeWidth={2} />
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
