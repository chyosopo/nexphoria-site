/* ──────────────────────────────────────────────────────────────
   Showcase — Nexphoria home (/) — CLEAN CTA HIERARCHY
   Rule: each section has ONE unique destination. No duplicate paths.

   Journey (top → bottom):
     1. Editorial header + primary CTA (assessment) + secondary (how-it-works)
     2. Two flagship stack tiles  → /stacks/wolverine, /stacks/glow
     3. Peptide category row × 5  → 5 UNIQUE peptides
     4. Trust band (no CTAs)
     5. Full library teaser         → /peptides (single link)
     6. Outcome pair                 → /how-it-works, /science  (unique)
     7. Custom path                  → /stacks/build, /lab-testing (unique)
     8. Final CTA                    → /assessment (only place assessment appears again)
   ────────────────────────────────────────────────────────────── */

import { SiteLayout } from "@/components/SiteLayout";
import { HeroTile, ProductTile, TrustBand, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { PillBadge } from "@/components/PillBadge";
import { GiantStatPanel } from "@/components/GiantStatPanel";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useSeo } from "@/lib/seo";

import objTirz from "@/assets/maximus/mx_obj_tirz_480.webp";
import objRecovery from "@/assets/maximus/mx_obj_recovery_480.webp";
import objNad from "@/assets/maximus/mx_obj_nad_480.webp";
import objPhone from "@/assets/maximus/mx_obj_phone_480.webp";
import objSkin from "@/assets/maximus/mx_obj_skin_480.webp";
import findYourFocusImg from "@/assets/brand/find-your-focus-clean.png";

export default function Showcase() {
  // Showcase is an internal design/component preview — noindex
  useSeo({
    title: "Component Showcase | Nexphoria",
    description: "Internal component showcase for Nexphoria. Not for public consumption.",
    path: "/showcase",
  });

  useEffect(() => {
    let metaRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
    return () => {
      metaRobots?.setAttribute("content", "index, follow, max-image-preview:large");
    };
  }, []);

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          {/* ── 1. Editorial header + hero CTA row ── */}
          {/* Bask pattern #3: pill-badge section label */}
          {/* Bask pattern #4: gray-word emphasis within headline — 'body' + '.' muted so 'Optimize your' and 'Restore your edge' pop */}
          <MxHeader
            badge={<PillBadge tone="acid">Physician-directed peptide therapy</PillBadge>}
            headline={
              <>
                Optimize your{" "}
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>
                  body.
                </span>
                <br />
                <span>Restore your edge.</span>
              </>
            }
            subtitle="Doctor-designed peptide protocols delivered through licensed US compounding pharmacies. Pick a goal — we'll handle the rest."
          />

          <div
            className="flex flex-wrap items-center gap-3 md:gap-4"
            style={{ marginTop: 32, marginBottom: 48 }}
            data-testid="home-hero-cta-row"
          >
            <StartIntakeButton
              source="home_hero_above_fold"
              size="lg"
              className="rounded-full"
            >
              Start free assessment · 5 min
            </StartIntakeButton>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full text-[14px] font-medium transition-colors"
              style={{
                border: "1px solid color-mix(in oklab, var(--nx-fg) 18%, transparent)",
                color: "var(--nx-fg)",
                background: "transparent",
              }}
              data-testid="link-hero-how-it-works"
            >
              How it works
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <span
              className="hidden md:inline-flex items-center gap-2 ml-2"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "color-mix(in oklab, var(--nx-fg) 55%, transparent)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--nx-acid, #c6f184)",
                  boxShadow: "0 0 0 3px color-mix(in oklab, var(--nx-acid, #c6f184) 30%, transparent)",
                }}
              />
              No commitment · Physician-reviewed in 24–48h
            </span>
          </div>

          {/* ── 2. Two flagship stack tiles ── */}
          <div className="mx-grid">
            <ColoredHeroTile
              href="/stacks/wolverine"
              tone="cobalt"
              glyph={TileGlyphs.hex}
              label={<>Restore performance<br />and recovery</>}
              caption="Wolverine stack · BPC-157 · TB-500"
              ctaLabel="Explore Wolverine"
            />
            <ColoredHeroTile
              href="/stacks/glow"
              tone="rose"
              glyph={TileGlyphs.leaf}
              label={<>Glow from<br />the inside out</>}
              caption="Glow stack · GHK-Cu · Topicals"
              ctaLabel="Explore Glow"
            />
          </div>

          {/* ── 3. Peptide category row × 5 — UNIQUE peptides, no stack repeats ── */}
          <div className="mx-grid small" style={{ marginTop: 16 }}>
            <ProductTile
              href="/peptides/tirzepatide"
              pill="New"
              label={<>Metabolic<br />reset</>}
              meta="Tirzepatide · GLP-1"
              objSrc={objTirz}
              objAlt="Tirzepatide vial"
            />
            <ProductTile
              href="/peptides/bpc-157"
              label={<>Gut<br />& joints</>}
              meta="BPC-157"
              objSrc={objRecovery}
              objAlt="BPC-157"
            />
            <ProductTile
              href="/peptides/nad-plus"
              pill="Longevity"
              dark
              label={<>Cellular<br />energy</>}
              meta="NAD+ · Mitochondrial"
              objSrc={objNad}
              objAlt="NAD+ vial"
            />
            <ProductTile
              href="/peptides/ghk-cu"
              label={<>Skin<br />repair</>}
              meta="GHK-Cu · Copper peptide"
              objSrc={objSkin}
              objAlt="GHK-Cu"
            />
            <ProductTile
              href="/peptides/cjc-1295"
              label={<>Growth<br />& sleep</>}
              meta="CJC-1295 · Ipamorelin"
              objSrc={objPhone}
              objAlt="Growth hormone peptides"
            />
          </div>

          {/* ── 4. Trust band (no CTAs) ── */}
          <TrustBand
            headline="Compounded in US pharmacies, supervised by US clinicians."
            items={[
              { num: "FDA-503A", lbl: "Compounding pharmacy" },
              { num: "24-48h", lbl: "Doctor consult" },
              { num: "Free", lbl: "Cold-chain shipping" },
            ]}
          />

          {/* Bask pattern #6: one-giant-stat panel between trust and library */}
          <GiantStatPanel
            badge="By the numbers"
            value="16"
            label={<>Peptides in the library. <span>Every one</span> with a mechanism, a citation, and a physician behind it.</>}
            footnote="US 503A compounding · Third-party tested · Physician-prescribed"
          />

          {/* ── 5. Full library teaser — single destination ── */}
          <section style={{ marginTop: 96 }}>
            <MxHeader
              badge={<PillBadge>The library</PillBadge>}
              headline={
                <>
                  A pharmacy{" "}
                  <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>
                    built around
                  </span>{" "}
                  <span>evidence.</span>
                </>
              }
              subtitle="Every peptide we dispense has a mechanism, a citation, and a physician behind it. See the full library — or let our assessment match you to a protocol."
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <Link
                href="/peptides"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[13px] font-semibold uppercase tracking-[0.08em] transition-transform"
                style={{
                  background: "var(--nx-fg)",
                  color: "var(--nx-bg-cream, #fffff3)",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                }}
                data-testid="link-full-library"
              >
                Browse the full library
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </section>

          {/* ── 6. Outcome pair — how-it-works + science (unique) ── */}
          <section style={{ marginTop: 96 }}>
            <MxHeader
              badge={<PillBadge>Why Nexphoria</PillBadge>}
              headline={
                <>
                  Telehealth that{" "}
                  <span>actually</span>{" "}
                  <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>
                    shows you
                  </span>
                  <br />
                  the labs.
                </>
              }
              subtitle="Quest Diagnostics every 90 days. Outcomes you can read. A physician you can message. The opposite of a clinic where the doctor never calls back."
            />
            <div className="mx-grid">
              <ColoredHeroTile
                href="/how-it-works"
                tone="sky"
                glyph={TileGlyphs.wave}
                label={<>How it works<br />in 4 steps</>}
                caption="From intake to refill"
                ctaLabel="See the flow"
              />
              <ColoredHeroTile
                href="/science"
                tone="cobalt"
                glyph={TileGlyphs.hex}
                label={<>The science<br />we stand on</>}
                caption="Mechanisms · citations · dosing"
                ctaLabel="Read the science"
              />
            </div>
          </section>

          {/* ── 7. Custom path — build-your-own + lab testing (unique) ── */}
          <section style={{ marginTop: 96 }}>
            <MxHeader
              badge={<PillBadge tone="acid">Custom protocol builder</PillBadge>}
              headline={
                <>
                  <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>
                    Or build it
                  </span>
                  <br />
                  <span>yourself.</span>
                </>
              }
              subtitle="Pick a goal. Choose 2–5 compatible peptides. Lock in a bundle discount on top of your cadence pricing. Every custom stack still goes through US-licensed physician review before it ships."
            />
            <div className="mx-grid">
              <Link
                href="/stacks/build"
                className="mx-tile dark"
                style={{ aspectRatio: "5 / 3", padding: "44px" }}
                data-testid="cta-builder"
              >
                <div className="mx-tile-head">
                  <span
                    className="mx-pill"
                    style={{ background: "#c6f184", color: "#0A0A0A" }}
                  >
                    Build a stack
                  </span>
                  <div
                    className="mx-tile-label"
                    style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                  >
                    Compose your<br />own protocol.
                  </div>
                </div>
                <div className="mx-tile-meta">3 steps · Save 10–15% on bundle</div>
              </Link>
              <Link
                href="/lab-testing"
                className="mx-tile"
                style={{ aspectRatio: "5 / 3", padding: "44px" }}
                data-testid="cta-labtesting"
              >
                <div className="mx-tile-head">
                  <span className="mx-pill">Lab testing</span>
                  <div
                    className="mx-tile-label"
                    style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                  >
                    Measure what<br />you treat.
                  </div>
                </div>
                <div className="mx-tile-meta">Quest Diagnostics · Every 90 days</div>
              </Link>
            </div>
          </section>

          {/* ── 8. Final CTA — cinematic image embed ── */}
          <section style={{ marginTop: 96, marginBottom: 40 }}>
            <div
              className="final-cta-hero"
              style={{
                position: "relative",
                borderRadius: "var(--mx-tile-radius, 20px)",
                overflow: "hidden",
                minHeight: "clamp(560px, 78vh, 820px)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                isolation: "isolate",
                backgroundColor: "#0A0A0A",
              }}
              data-testid="home-final-cta"
            >
              {/* Background image — clean generated 'find your focus' scene: athlete in dim gym, no text baked in */}
              <img
                src={findYourFocusImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  filter: "contrast(1.05) saturate(0.9) brightness(0.82)",
                  zIndex: 0,
                }}
              />
              {/* Left-to-right dark scrim for CTA legibility on the left column */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.62) 30%, rgba(10,10,10,0.28) 55%, rgba(10,10,10,0.0) 90%), linear-gradient(180deg, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.10) 55%, rgba(10,10,10,0.68) 100%)",
                  zIndex: 1,
                }}
              />
              {/* Subtle grain */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  opacity: 0.4,
                  mixBlendMode: "overlay",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              {/* Content — bottom left composition, doesn't collide with baked-in headline */}
              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  padding: "clamp(40px, 6vw, 72px)",
                  maxWidth: 560,
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,243,0.7)",
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--nx-acid, #c6f184)",
                      boxShadow: "0 0 0 3px rgba(198,241,132,0.28)",
                    }}
                  />
                  Your protocol · begins here
                </p>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 400,
                    fontSize: "clamp(32px, 4.4vw, 56px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.015em",
                    color: "#fffff3",
                    marginBottom: 22,
                    textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                  }}
                >
                  Ready when<br />you are.
                </div>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 15,
                    color: "rgba(255,255,243,0.85)",
                    maxWidth: 440,
                    marginBottom: 32,
                    lineHeight: 1.55,
                    textShadow: "0 1px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  Take the 5-minute assessment. No card needed. We&rsquo;ll match you to a doctor-designed protocol or build one with you from the library.
                </p>
                <StartIntakeButton
                  source="home_final_cta"
                  variant="primary"
                  size="xl"
                  showArrow={false}
                  className="!uppercase !tracking-[0.08em] !text-[13px] !font-semibold"
                >
                  Start assessment →
                </StartIntakeButton>
                <p
                  style={{
                    marginTop: 18,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,243,0.55)",
                  }}
                >
                  Physician-reviewed · 24–48h response
                </p>
              </div>
            </div>
          </section>

          {/* Final trust line */}
          <p
            style={{
              marginTop: 60,
              textAlign: "center",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(14,14,15,0.4)",
              fontFamily: "'General Sans', system-ui, sans-serif",
            }}
          >
            Licensed in all 50 US states · 503A compounding pharmacy ·
            Quest Diagnostics partner
          </p>
        </div>
      </main>
    </SiteLayout>
  );
}
