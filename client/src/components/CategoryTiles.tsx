import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface CategoryTile {
  label: string;
  description: string;
  href: string;
  image?: string;
}

interface CategoryTilesProps {
  tiles: CategoryTile[];
  eyebrow?: string;
}

/**
 * CategoryTiles — Maximus-pattern horizontal 4-tile row.
 * Each tile has image background + label + arrow.
 * Hover: lifts + brightens (scale 1.03, brightness 1.05).
 * Used directly below hero on /women and /men.
 */
export function CategoryTiles({ tiles, eyebrow = "EXPLORE BY GOAL" }: CategoryTilesProps) {
  return (
    <section
      style={{
        backgroundColor: "var(--nx-bg)",
        paddingBottom: "4rem",
        paddingTop: "0.5rem",
      }}
      data-testid="category-tiles"
    >
      <div className="nx-container">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "var(--nx-cobalt)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
              }}
            >
              {eyebrow}
            </p>
          </div>
        </Reveal>

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${tiles.length}, minmax(140px, 1fr))`,
            overflowX: "auto",
          }}
        >
          {tiles.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 60}>
              <Link href={tile.href} className="block no-underline group">
                <div
                  style={{
                    position: "relative",
                    height: "220px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#0A0A0A",
                    cursor: "pointer",
                    transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                  className="group-hover:scale-[1.02]"
                >
                  {/* Image background */}
                  {tile.image && (
                    <img
                      src={tile.image}
                      alt={tile.label}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "filter 300ms ease",
                      }}
                      className="group-hover:brightness-110"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                    }}
                  />

                  {/* No image fallback: sage solid bg */}
                  {!tile.image && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "var(--nx-cobalt)",
                        opacity: 0.85,
                      }}
                    />
                  )}

                  {/* Bottom content */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1.25rem",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: "1.25rem",
                          color: "#FFFFFF",
                          lineHeight: 1.15,
                          marginBottom: "4px",
                        }}
                      >
                        {tile.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        {tile.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.35)",
                        flexShrink: 0,
                        transition: "transform 200ms ease, border-color 200ms ease",
                      }}
                      className="group-hover:translate-x-0.5 group-hover:border-white/70"
                    >
                      <ArrowRight size={12} color="#FFFFFF" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
