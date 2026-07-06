/**
 * GoalVialTile — the assessment intake's version of the marketing-site VialTile.
 *
 * Front face: tinted panel, small vial art, goal name, one-liner.
 * Back face (hover / tap): "You'd take" peptides, protocol name, monthly range, CTA cue.
 *
 * Fires `assessment_tile_hover` via the shared analytics choke-point the FIRST
 * time the user hovers a given tile in a session, so the marketing/product team
 * can see which categories attract the most interest during intake — before a
 * user commits to a consult. Debounced 200ms so cursor sweeps don't inflate.
 */

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { VialArt, categoryToTone, type Tone } from "@/components/VialTile";
import { track } from "@/lib/analytics";
import { CATEGORY_FEELING } from "@/data/peptides";
import { Check } from "lucide-react";

export interface GoalVialTileProps {
  goal: string;                 // the raw GOALS[] string used as form.goal
  displayName: string;          // rendered on the tile — can be a shorter label
  oneLiner: string;             // front-face qualifier under the goal name
  feeling?: string;             // the goal's feeling line (ROADMAP 4.2) — shown on the front face when present
  category: string;             // maps to Tone via categoryToTone()
  protocol: string;             // e.g. "Metabolic Protocol (GLP-1 Agonist)"
  peptides: string;             // e.g. "Tirzepatide · Retatrutide"
  monthlyRange: string;         // e.g. "$220–$420/mo"
  glyph?: "flask" | "leaf" | "spark" | "crescent" | "bolt" | "drop";
  selected: boolean;
  onClick: () => void;
  testId?: string;
}

/**
 * Goal glyphs are friendly aliases; VialArt/MolecularGlyph only draw the
 * molecular set. Map every alias to a real molecular glyph so the vial art
 * never renders empty.
 */
export type GoalGlyph = "flask" | "leaf" | "spark" | "crescent" | "bolt" | "drop";
type MolecularGlyphId = React.ComponentProps<typeof VialArt>["glyph"];
const GOAL_GLYPH_TO_MOLECULAR: Record<GoalGlyph, MolecularGlyphId> = {
  drop: "fragment",
  flask: "ring",
  leaf: "branch",
  spark: "secretagogue",
  crescent: "ghrh",
  bolt: "helix",
};
export function goalGlyphToMolecular(glyph: GoalGlyph): MolecularGlyphId {
  return GOAL_GLYPH_TO_MOLECULAR[glyph];
}

export function GoalVialTile({
  goal,
  displayName,
  oneLiner,
  feeling,
  category,
  protocol,
  peptides,
  monthlyRange,
  glyph = "drop",
  selected,
  onClick,
  testId,
}: GoalVialTileProps) {
  const tone: Tone = categoryToTone(category);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);       // mobile fallback
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackedOnce = useRef(false);

  // Cleanup any dangling timer on unmount
  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const flipped = hovered || tapped || selected;

  // Tint helpers — pull the tone palette from VialArt so tile + vial share a hue.
  // We keep VialArt as the source of truth; local defaults just mirror the visible cream/ink used inside VialArt so the surface reads as tinted at low density.
  const tintBg: Record<Tone, string> = {
    cream:   "var(--nx-tint-cream-bg)",
    sage:    "var(--nx-tint-sage-bg)",
    rose:    "var(--nx-tint-rose-bg)",
    sky:     "var(--nx-tint-sky-bg)",
    dusk:    "var(--nx-tint-dusk-bg)",
    butter:  "var(--nx-tint-butter-bg)",
    cobalt:  "var(--nx-tint-cobalt-bg)",
    mineral: "var(--nx-tint-mineral-bg)",
  };
  const tintInk: Record<Tone, string> = {
    cream:   "var(--nx-tint-cream-ink)",
    sage:    "var(--nx-tint-sage-ink)",
    rose:    "var(--nx-tint-rose-ink)",
    sky:     "var(--nx-tint-sky-ink)",
    dusk:    "var(--nx-tint-dusk-ink)",
    butter:  "var(--nx-tint-butter-ink)",
    cobalt:  "var(--nx-tint-cobalt-ink)",
    mineral: "var(--nx-tint-mineral-ink)",
  };

  const bg = tintBg[tone];
  const ink = tintInk[tone];

  const handleMouseEnter = () => {
    setHovered(true);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (!trackedOnce.current) {
        track("assessment_tile_hover", {
          goal,
          category,
          protocol,
          step: 1,
          timestamp: Date.now(),
        });
        trackedOnce.current = true;
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const handleTouchStart = () => {
    // Mobile: tap once to flip, tap again (via onClick) to select.
    setTapped((t) => !t);
    if (!trackedOnce.current) {
      track("assessment_tile_hover", {
        goal,
        category,
        protocol,
        step: 1,
        surface: "touch",
        timestamp: Date.now(),
      });
      trackedOnce.current = true;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      data-testid={testId}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        padding: 0,
        borderRadius: "8px",
        border: selected
          ? "2px solid var(--nx-fg)"
          : hovered
          ? "1.5px solid var(--nx-fg)"
          : "1px solid var(--nx-border)",
        backgroundColor: bg,
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color var(--nx-dur-2) var(--nx-ease), transform var(--nx-dur-base) var(--nx-ease), box-shadow var(--nx-dur-base) var(--nx-ease)",
        transform: hovered && !selected ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered && !selected ? "0 8px 24px rgba(21, 24, 28, 0.08)" : "none",
        overflow: "hidden",
        minHeight: "168px",
      }}
    >
      {/* Selected check pin */}
      {selected && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "var(--nx-fg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <Check size={13} style={{ color: "var(--nx-bg-cream)" }} strokeWidth={3} />
        </span>
      )}

      {/* Card body — front + back are absolute layers, flipped by opacity */}
      <div style={{ position: "relative", padding: "1rem 1.125rem", minHeight: "168px" }}>
        {/* FRONT — always mounted, fades out on flip */}
        <div
          style={{
            display: "flex",
            gap: "0.875rem",
            alignItems: "center",
            opacity: flipped ? 0 : 1,
            transition: "opacity var(--nx-dur-2) var(--nx-ease)",
            position: flipped ? "absolute" : "static",
            inset: flipped ? "1rem 1.125rem" : "auto",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <VialArt tone={tone} glyph={goalGlyphToMolecular(glyph)} size={78} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ink,
                opacity: 0.6,
                margin: "0 0 0.375rem 0",
              }}
            >
              {category.toUpperCase()}
            </p>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "17px",
                fontWeight: 600,
                lineHeight: 1.2,
                color: ink,
                margin: "0 0 0.375rem 0",
              }}
            >
              {displayName}
            </p>
            <p
              style={{
                fontFamily: feeling ? "'Fraunces', Georgia, serif" : "'General Sans', system-ui, sans-serif",
                fontStyle: feeling ? "italic" : undefined,
                fontSize: feeling ? "13.5px" : "12.5px",
                lineHeight: 1.4,
                color: ink,
                opacity: 0.78,
                margin: 0,
              }}
            >
              {feeling ?? oneLiner}
            </p>
          </div>
        </div>

        {/* BACK — mounted only when flipped, fades in */}
        <div
          style={{
            opacity: flipped ? 1 : 0,
            transition: "opacity var(--nx-dur-2) var(--nx-ease) var(--nx-dur-1)",
            pointerEvents: flipped ? "auto" : "none",
            position: flipped ? "static" : "absolute",
            inset: flipped ? "auto" : "1rem 1.125rem",
          }}
        >
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "8.5px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ink,
              opacity: 0.55,
              margin: "0 0 0.375rem 0",
            }}
          >
            YOUR PROTOCOL
          </p>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: 1.25,
              color: ink,
              margin: "0 0 0.75rem 0",
            }}
          >
            {protocol}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginBottom: "0.75rem" }}>
            <Row label="You’d take" value={peptides} ink={ink} />
            <Row label="Range" value={monthlyRange} ink={ink} />
          </div>

          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ink,
              margin: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            {selected ? "This is my goal ✓" : "Choose this goal →"}
          </p>
        </div>
      </div>
    </button>
  );
}

function Row({ label, value, ink }: { label: string; value: string; ink: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "baseline" }}>
      <span
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: ink,
          opacity: 0.55,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: ink,
          textAlign: "right",
          lineHeight: 1.35,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Goal → tile config map. Extracted so both the intake step and the outcome
 * page can rehydrate the same tinted tile from just `form.goal`.
 */
export const GOAL_TILE_CONFIG: Record<
  string,
  {
    displayName: string;
    oneLiner: string;
    /** the goal's feeling line (ROADMAP 4.2) — reuses CATEGORY_FEELING where the goal maps 1:1 */
    feeling: string;
    category: string;
    protocol: string;
    peptides: string;
    monthlyRange: string;
    glyph: "flask" | "leaf" | "spark" | "crescent" | "bolt" | "drop";
  }
> = {
  "Metabolic health & body composition": {
    displayName: "Metabolic & body composition",
    feeling: CATEGORY_FEELING.metabolic,
    oneLiner: "GLP-1 agonists for fat loss and glycemic control.",
    category: "metabolic",
    protocol: "Metabolic Protocol (GLP-1 Agonist)",
    peptides: "Tirzepatide · Retatrutide",
    monthlyRange: "$320–$540/mo",
    glyph: "flask",
  },
  "Strength & performance": {
    displayName: "Strength & performance",
    feeling: CATEGORY_FEELING.growth,
    oneLiner: "Growth hormone pulse for lean mass and recovery.",
    category: "growth",
    protocol: "Performance Protocol (CJC-1295 + Ipamorelin)",
    peptides: "CJC-1295 · Ipamorelin",
    monthlyRange: "$210–$340/mo",
    glyph: "bolt",
  },
  "Longevity & healthy aging": {
    displayName: "Longevity & aging",
    feeling: CATEGORY_FEELING.longevity,
    oneLiner: "NAD+ restoration and senescence signaling.",
    category: "longevity",
    protocol: "Longevity Protocol (NAD+ / Epitalon)",
    peptides: "NAD+ · Epitalon",
    monthlyRange: "$240–$420/mo",
    glyph: "spark",
  },
  "Cognitive function": {
    displayName: "Cognitive function",
    feeling: CATEGORY_FEELING.cognition,
    oneLiner: "Nootropic peptides for focus, memory, and mood.",
    category: "cognition",
    protocol: "Cognitive Protocol (Selank / Semax)",
    peptides: "Selank · Semax",
    monthlyRange: "$180–$260/mo",
    glyph: "spark",
  },
  "Skin & recovery": {
    displayName: "Skin & recovery",
    feeling: "Repair, inside and out.",
    oneLiner: "Tissue repair and dermal remodeling stack.",
    category: "recovery",
    protocol: "Repair Protocol (BPC-157 / GHK-Cu)",
    peptides: "BPC-157 · GHK-Cu",
    monthlyRange: "$190–$310/mo",
    glyph: "leaf",
  },
  "Hormonal optimization": {
    displayName: "Hormonal optimization",
    feeling: "Your own axis, restarted.",
    oneLiner: "HPG-axis restart — endogenous testosterone preservation.",
    category: "growth",
    protocol: "HPG-Axis Protocol (Enclomiphene)",
    peptides: "Enclomiphene · Kisspeptin",
    monthlyRange: "$150–$240/mo",
    glyph: "drop",
  },
  "Other / not sure yet": {
    displayName: "Not sure yet",
    feeling: "Start where you are.",
    oneLiner: "A physician will help you triage after labs return.",
    category: "cognition",
    protocol: "Physician-Guided Match",
    peptides: "Determined after lab review",
    monthlyRange: "Varies by protocol",
    glyph: "drop",
  },
};
