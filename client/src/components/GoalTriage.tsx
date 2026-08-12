/* GoalTriage — the goal-first entry surface.

   Replaces "here is our catalog, find yourself in it" with "what are you here
   for" (docs/IVYRX-STUDY.md §2). One card per live goal, outcome first,
   molecules named underneath as evidence rather than as the offer.

   Composition follows the rendered grammar Atlas measured
   (docs/IVYRX-STUDY-VISUAL.md §V2): generous whitespace, a single dark CTA per
   card, accents held to a few percent, hairline borders. No countdowns, no
   scarcity — the reference uses none either, and our voice forbids them.

   Conversion routes to INTAKE, not cart. That is not a limitation we are
   working around: the reference's marketing site takes no intake and no
   payment either, handing off to its engine, and our PHI boundary requires
   the same. The storefront's job is triage and legibility. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/EnterprisePatterns";
import { F, S } from "@/lib/typography";
import { liveGoals, goalSkus, goalLede, goalConversion } from "@/data/goals";

export function GoalTriage({
  world,
  eyebrow = "Start here",
  title = "What are you here for?",
  background = "var(--nx-bg)",
  testid = "goal-triage",
}: {
  world?: "men" | "women";
  eyebrow?: string;
  title?: React.ReactNode;
  background?: string;
  testid?: string;
}) {
  const base = world ? `/${world}` : "";
  const goals = liveGoals();

  // A goal with nothing behind it is never rendered (see liveGoals), so an
  // empty catalog degrades to no section rather than to empty cards.
  if (goals.length === 0) return null;

  return (
    <section data-testid={testid} className="nx-section" style={{ backgroundColor: background }}>
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "clamp(2rem,4vw,3rem)", maxWidth: "56ch" }}>
            <SectionHead
              eyebrow={eyebrow}
              title={title}
              lead="Every route begins the same way — bloodwork first, then a physician decides what, if anything, is appropriate."
            />
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "clamp(1rem,2vw,1.5rem)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          }}
        >
          {goals.map((g) => {
            const skus = goalSkus(g);
            const toIntake = goalConversion(g) === "intake";
            return (
              <Reveal key={g.slug}>
                <article
                  data-testid={`goal-card-${g.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "var(--nx-r-md)",
                    background: "var(--nx-ceramic)",
                    padding: "clamp(1.5rem,3vw,2rem)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: S,
                      fontSize: "var(--nx-t-h3)",
                      lineHeight: 1.15,
                      color: "var(--nx-fg)",
                      margin: 0,
                    }}
                  >
                    {g.label}
                  </h3>

                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-body)",
                      lineHeight: 1.6,
                      color: "var(--nx-fg-graphite)",
                      margin: "0.75rem 0 0",
                    }}
                  >
                    {goalLede(g, world)}
                  </p>

                  {/* Molecules as evidence, not as the offer — the inversion
                      this whole surface exists to make. */}
                  <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--nx-border)" }}>
                    <p
                      style={{
                        fontFamily: F,
                        fontSize: "var(--nx-t-2xs)",
                        fontWeight: 600,
                        letterSpacing: "var(--nx-ls-caps)",
                        textTransform: "uppercase",
                        color: "var(--nx-fg-muted)",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      Routes a physician may consider
                    </p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {skus.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`${base}/peptides/${s.slug}`}
                            style={{
                              display: "inline-block",
                              fontFamily: F,
                              fontSize: "var(--nx-t-xs)",
                              color: "var(--nx-fg-graphite)",
                              textDecoration: "none",
                              border: "1px solid var(--nx-border)",
                              borderRadius: "var(--nx-r-2xs)",
                              padding: "0.3rem 0.55rem",
                            }}
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ flex: 1 }} />

                  <Link
                    /* /assessment is NOT worlded — there is one route, not a
                       per-world variant. Using `${base}/assessment` here shipped
                       a dead primary CTA on both world homes (audit:legitscript
                       §1 caught it; smoke and audit:funnel did not, because the
                       funnel path clicks the goal tile rather than this button).
                       PDP links ARE worlded, so base still applies there. */
                    href={toIntake ? "/assessment" : `${base}/peptides/${skus[0].slug}`}
                    data-testid={`goal-cta-${g.slug}`}
                    style={{
                      marginTop: "1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      alignSelf: "flex-start",
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
                      fontWeight: 600,
                      color: "var(--nx-ceramic)",
                      background: "var(--nx-fg)",
                      borderRadius: "var(--nx-r-sm)",
                      padding: "0.7rem 1.1rem",
                      textDecoration: "none",
                    }}
                  >
                    {toIntake ? "Begin the assessment" : "See the protocol"}
                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
                  </Link>

                  {/* Conditional grammar, per the disclosure architecture. */}
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-2xs)",
                      lineHeight: 1.5,
                      color: "var(--nx-fg-muted)",
                      margin: "0.75rem 0 0",
                    }}
                  >
                    Dispensed only if prescribed.
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
