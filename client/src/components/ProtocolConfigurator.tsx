import { useState, useMemo } from "react";
import { Check, Plus, ChevronDown, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartProvider";
import { cadenceCardsFor, formatUSD, type CadenceKey, getPrice } from "@/data/pricing";
import { peptides } from "@/data/peptides";
import { F, S } from "@/lib/typography";

/* ──────────────────────────────────────────────────────────────
   ProtocolConfigurator — Hims-style PDP product configurator.

   Full "build-your-plan" experience:
     1. Dose selector (dropdown, peptide-specific)
     2. Cadence radio cards (Monthly / Quarterly / Annual)
     3. Add-on upsells (paired peptides, biomarker retest, MD consult)
     4. Live "total this cycle" price recap
     5. Sticky Add-to-Cart with animated success state

   Two visual identities, driven by `gender` — all colors from --nx-* tokens:
     - "men"   → deep navy surface, hard edges (radius 4)
     - "women" → ceramic surface, Fraunces display, soft rounds (radius 14)
   ────────────────────────────────────────────────────────────── */

type Gender = "men" | "women" | "neutral";

interface ProtocolConfiguratorProps {
  slug: string;
  productName: string;
  category: string;
  gender?: Gender;
  pairsWith?: string[];
  typicalDose?: string;
}

interface DoseOption {
  id: string;
  label: string;
  sublabel: string;
  priceDelta: number; // added to base monthly
}

interface AddOn {
  id: string;
  title: string;
  sub: string;
  priceOneOff: number;
  slug?: string; // if linked to a peptide slug
}

/* Derive 2–3 dose options per peptide from typicalDose string.
   Falls back to a Standard / Loading / Maintenance ladder. */
function getDoseOptions(slug: string, typicalDose?: string): DoseOption[] {
  // Tirzepatide / semaglutide → weight-loss titration ladder
  if (slug === "tirzepatide") {
    return [
      { id: "start", label: "Starter · 2.5 mg / week", sublabel: "First 4 weeks, low-side-effect entry", priceDelta: 0 },
      { id: "std", label: "Standard · 5–7.5 mg / week", sublabel: "Most common maintenance dose", priceDelta: 60 },
      { id: "max", label: "Advanced · 10–15 mg / week", sublabel: "For patients titrated up under MD review", priceDelta: 140 },
    ];
  }
  if (slug === "semaglutide") {
    return [
      { id: "start", label: "Starter · 0.25 mg / week", sublabel: "Titration start", priceDelta: 0 },
      { id: "std", label: "Standard · 1–1.7 mg / week", sublabel: "Most common dose", priceDelta: 45 },
      { id: "max", label: "Advanced · 2.4 mg / week", sublabel: "Physician-supervised titration", priceDelta: 90 },
    ];
  }
  if (slug === "bpc-157") {
    return [
      { id: "std", label: "Standard · 250 mcg / day", sublabel: "Recovery + maintenance", priceDelta: 0 },
      { id: "loading", label: "Loading · 500 mcg / day", sublabel: "First 4 weeks post-injury", priceDelta: 40 },
    ];
  }
  if (slug === "tb-500") {
    return [
      { id: "std", label: "Standard · 2 mg × 2 / week", sublabel: "Recovery baseline", priceDelta: 0 },
      { id: "loading", label: "Loading · 5 mg / week", sublabel: "First 4–6 weeks, aggressive recovery", priceDelta: 70 },
    ];
  }
  if (slug === "ghk-cu") {
    return [
      { id: "topical", label: "Topical serum · 3% GHK-Cu", sublabel: "Nightly skin protocol", priceDelta: 0 },
      { id: "subq", label: "Subcutaneous · 1–2 mg", sublabel: "Systemic dermal + hair support", priceDelta: 55 },
    ];
  }
  if (slug === "cjc-1295" || slug === "ipamorelin" || slug === "cjc-1295-ipamorelin") {
    return [
      { id: "std", label: "Standard · nightly pulse", sublabel: "Aligns with natural GH release", priceDelta: 0 },
      { id: "twice", label: "Advanced · AM + PM", sublabel: "Two-pulse protocol for GH-driven goals", priceDelta: 80 },
    ];
  }
  if (slug === "dsip") {
    return [
      { id: "std", label: "Standard · 100 mcg nightly", sublabel: "Sleep-onset dose", priceDelta: 0 },
      { id: "high", label: "Deep · 200 mcg nightly", sublabel: "For persistent sleep-architecture issues", priceDelta: 25 },
    ];
  }
  if (slug === "epithalon" || slug === "epitalon") {
    return [
      { id: "cycle", label: "Cycle · 10 mg / day × 20 days", sublabel: "Twice-yearly protocol", priceDelta: 0 },
    ];
  }
  if (slug === "nad-plus" || slug === "nad") {
    return [
      { id: "sub", label: "Subcutaneous · 100 mg / day", sublabel: "At-home injection", priceDelta: 0 },
      { id: "iv", label: "IV drip · 500 mg / session", sublabel: "In-clinic partner locations", priceDelta: 240 },
    ];
  }
  // Sensible fallback
  return [
    { id: "std", label: "Standard protocol", sublabel: typicalDose || "Standard physician-set dose", priceDelta: 0 },
    { id: "loading", label: "Loading protocol", sublabel: "Higher initial dose, first 4 weeks", priceDelta: 45 },
  ];
}

/* Two worlds, one engine — colors resolve from --nx-* tokens so the
   women-world CSS scope repaints these to orchid automatically and token
   updates propagate here. Alpha overlays stay rgba (no alpha-token system).
   Fonts come from typography.ts (F/S), not per-theme redeclarations. */
const MEN_TOKENS = {
  bg: "var(--nx-fg)",
  bgSoft: "var(--nx-bg-dark)",
  surface: "var(--nx-bg-dark)",
  surfaceHover: "var(--nx-cobalt-hover)",
  border: "rgba(102, 143, 185,0.22)",
  borderStrong: "rgba(102, 143, 185,0.45)",
  text: "var(--nx-bg)",
  textMuted: "rgba(232, 237, 241,0.62)",
  textFaint: "rgba(232, 237, 241,0.42)",
  accent: "var(--nx-accent)",
  accentSoft: "rgba(102, 143, 185,0.14)",
  accentInk: "var(--nx-fg)",
  radius: 4,
  weightBold: 700,
};

const WOMEN_TOKENS = {
  bg: "var(--nx-bg)",
  bgSoft: "var(--nx-bg-cream)",
  surface: "var(--nx-ceramic)",
  surfaceHover: "var(--nx-cobalt-soft)",
  border: "rgba(81, 100, 119,0.22)",
  borderStrong: "rgba(110, 132, 155,0.55)",
  text: "var(--nx-fg)",
  textMuted: "rgba(28, 33, 38,0.62)",
  textFaint: "rgba(28, 33, 38,0.42)",
  accent: "var(--nx-accent)",
  accentSoft: "rgba(110, 132, 155,0.12)",
  accentInk: "var(--nx-ceramic)",
  radius: 14,
  weightBold: 500,
};

const NEUTRAL_TOKENS = {
  bg: "var(--nx-bg)",
  bgSoft: "var(--nx-bg-cream)",
  surface: "var(--nx-ceramic)",
  surfaceHover: "var(--nx-cobalt-soft)",
  border: "rgba(21, 24, 28,0.14)",
  borderStrong: "rgba(21, 24, 28,0.6)",
  text: "var(--nx-fg)",
  textMuted: "rgba(21, 24, 28,0.62)",
  textFaint: "rgba(21, 24, 28,0.4)",
  accent: "var(--nx-fg)",
  accentSoft: "rgba(21, 24, 28,0.06)",
  accentInk: "var(--nx-bg)",
  radius: 8,
  weightBold: 600,
};

export function ProtocolConfigurator({
  slug,
  productName,
  category,
  gender = "neutral",
  pairsWith = [],
  typicalDose,
}: ProtocolConfiguratorProps) {
  const t = gender === "men" ? MEN_TOKENS : gender === "women" ? WOMEN_TOKENS : NEUTRAL_TOKENS;
  const { addPeptide } = useCart();

  const cadenceCards = useMemo(() => cadenceCardsFor(slug), [slug]);
  const doseOptions = useMemo(() => getDoseOptions(slug, typicalDose), [slug, typicalDose]);
  const basePrice = getPrice(slug)?.monthlyPrice ?? 0;

  const [dose, setDose] = useState<string>(doseOptions[0]?.id ?? "std");
  const [cadence, setCadence] = useState<CadenceKey>("3mo");
  const [addOns, setAddOns] = useState<Record<string, boolean>>({});
  const [doseOpen, setDoseOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const selectedDose = doseOptions.find((d) => d.id === dose) ?? doseOptions[0];
  const selectedCadence = cadenceCards.find((c) => c.cadence === cadence);

  // Build add-ons list — paired peptides (max 2) + retest + MD consult
  const availableAddOns: AddOn[] = useMemo(() => {
    const list: AddOn[] = [];
    pairsWith.slice(0, 2).forEach((pSlug) => {
      const p = peptides.find((x) => x.slug === pSlug);
      const pPrice = getPrice(pSlug)?.monthlyPrice;
      if (p && pPrice) {
        list.push({
          id: `pair-${pSlug}`,
          title: `Add ${p.name}`,
          sub: `Pairs with ${productName} · same physician review`,
          priceOneOff: pPrice,
          slug: pSlug,
        });
      }
    });
    list.push({
      id: "biomarker-retest",
      title: "Add biomarker retest",
      sub: "50-marker follow-up panel at week 8",
      priceOneOff: 149,
    });
    list.push({
      id: "md-consult",
      title: "Add 30-min MD consult",
      sub: "Video session with your prescribing physician",
      priceOneOff: 79,
    });
    return list;
  }, [pairsWith, productName]);

  // Live totals
  const perMonth = (selectedCadence?.pricePerMonth ?? basePrice) + (selectedDose?.priceDelta ?? 0);
  const addOnTotal = availableAddOns.reduce((sum, a) => (addOns[a.id] ? sum + a.priceOneOff : sum), 0);
  const cadenceMonths = cadence === "1mo" ? 1 : cadence === "3mo" ? 3 : 12;
  const cycleTotal = perMonth * cadenceMonths + addOnTotal;
  const savings = selectedCadence ? Math.round((basePrice - selectedCadence.pricePerMonth) * cadenceMonths) : 0;

  const toggleAddOn = (id: string) => setAddOns((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAdd = () => {
    addPeptide(slug, { cadence });
    // Also add any selected paired peptides
    availableAddOns.forEach((a) => {
      if (addOns[a.id] && a.slug) {
        addPeptide(a.slug, { cadence: "1mo" });
      }
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const isMen = gender === "men";
  const isWomen = gender === "women";

  // Fonts from the typography source of truth — General Sans for interface,
  // Fraunces for the women-world display voice. No per-theme redeclaration.
  const fontBody = F;
  const fontMono = F;
  const fontDisplay = isWomen ? S : F;

  return (
    <div
      data-testid={`hims-configurator-${slug}`}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: t.radius,
        padding: "28px",
        color: t.text,
      }}
    >
      {/* ── Step label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: "var(--nx-t-xs)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: t.accent,
          }}
        >
          Build your protocol
        </span>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: "var(--nx-t-xs)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: t.textFaint,
          }}
        >
          3 steps · &lt; 60 seconds
        </span>
      </div>

      {/* ── STEP 1 · DOSE */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: t.accent,
              width: "18px",
            }}
          >
            01
          </span>
          <span style={{ fontFamily: fontBody, fontSize: "var(--nx-t-sm)", fontWeight: t.weightBold, color: t.text }}>
            Choose your dose
          </span>
        </div>

        <button
          onClick={() => setDoseOpen((v) => !v)}
          data-testid={`dose-dropdown-${slug}`}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            background: t.bgSoft,
            border: `1px solid ${doseOpen ? t.borderStrong : t.border}`,
            borderRadius: t.radius,
            color: t.text,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.18s ease",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fontBody, fontSize: "var(--nx-t-sm)", fontWeight: t.weightBold, color: t.text }}>
              {selectedDose?.label}
            </div>
            <div
              style={{
                fontFamily: fontMono,
                fontSize: "var(--nx-t-xs)",
                color: t.textMuted,
                marginTop: "3px",
                letterSpacing: "0.02em",
              }}
            >
              {selectedDose?.sublabel}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {selectedDose && selectedDose.priceDelta > 0 && (
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 600,
                  color: t.accent,
                }}
              >
                +{formatUSD(selectedDose.priceDelta)}/mo
              </span>
            )}
            <ChevronDown
              size={16}
              style={{
                color: t.textMuted,
                transform: doseOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        </button>

        {doseOpen && (
          <div
            style={{
              marginTop: "8px",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: t.radius,
              overflow: "hidden",
            }}
          >
            {doseOptions.map((opt, i) => {
              const isSelected = opt.id === dose;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDose(opt.id);
                    setDoseOpen(false);
                  }}
                  data-testid={`dose-option-${slug}-${opt.id}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: isSelected ? t.accentSoft : "transparent",
                    border: "none",
                    borderTop: i > 0 ? `1px solid ${t.border}` : "none",
                    color: t.text,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: fontBody,
                        fontSize: "var(--nx-t-sm)",
                        fontWeight: isSelected ? t.weightBold : 500,
                        color: t.text,
                      }}
                    >
                      {opt.label}
                    </div>
                    <div
                      style={{
                        fontFamily: fontMono,
                        fontSize: "var(--nx-t-xs)",
                        color: t.textMuted,
                        marginTop: "2px",
                      }}
                    >
                      {opt.sublabel}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: fontMono,
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 600,
                        color: opt.priceDelta > 0 ? t.accent : t.textFaint,
                      }}
                    >
                      {opt.priceDelta === 0 ? "Included" : `+${formatUSD(opt.priceDelta)}/mo`}
                    </span>
                    {isSelected && <Check size={14} style={{ color: t.accent }} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── STEP 2 · CADENCE */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: t.accent,
              width: "18px",
            }}
          >
            02
          </span>
          <span style={{ fontFamily: fontBody, fontSize: "var(--nx-t-sm)", fontWeight: t.weightBold, color: t.text }}>
            Pick your plan
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
          {cadenceCards.map((card) => {
            const isSelected = cadence === card.cadence;
            return (
              <button
                key={card.cadence}
                onClick={() => setCadence(card.cadence)}
                data-testid={`cadence-card-${slug}-${card.cadence}`}
                aria-pressed={isSelected}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                  padding: "16px 18px",
                  background: isSelected ? t.accent : t.bgSoft,
                  color: isSelected ? t.accentInk : t.text,
                  border: `1px solid ${isSelected ? t.accent : t.border}`,
                  borderRadius: t.radius,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s ease",
                }}
              >
                {/* Radio dot */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: `1.5px solid ${isSelected ? t.accentInk : t.textMuted}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: t.accentInk }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: fontBody,
                        fontSize: "var(--nx-t-sm)",
                        fontWeight: t.weightBold,
                      }}
                    >
                      {card.label}
                    </span>
                    {card.badge && card.badge !== "Flexible" && (
                      <span
                        style={{
                          fontFamily: fontMono,
                          fontSize: "var(--nx-t-xs)",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          padding: "3px 7px",
                          borderRadius: isMen ? 2 : 999,
                          background: isSelected
                            ? "rgba(21, 24, 28,0.14)"
                            : card.badge === "Best value"
                            ? t.accentSoft
                            : "rgba(255,255,255,0.06)",
                          color: isSelected ? t.accentInk : t.accent,
                          border: isSelected ? "none" : `1px solid ${t.border}`,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: fontMono,
                      fontSize: "var(--nx-t-xs)",
                      color: isSelected ? "rgba(21, 24, 28,0.65)" : t.textMuted,
                      marginTop: "3px",
                    }}
                  >
                    {card.sublabel}
                  </p>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: isMen ? fontMono : fontDisplay,
                      fontSize: isWomen ? "var(--nx-t-h3)" : "var(--nx-t-xl)",
                      fontWeight: isMen ? 700 : 500,
                      lineHeight: 1,
                      letterSpacing: isMen ? "-0.02em" : "-0.01em",
                    }}
                  >
                    {formatUSD(card.pricePerMonth)}
                  </div>
                  <p
                    style={{
                      fontFamily: fontMono,
                      fontSize: "var(--nx-t-xs)",
                      color: isSelected ? "rgba(21, 24, 28,0.55)" : t.textFaint,
                      marginTop: "3px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    / month
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3 · ADD-ONS */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: t.accent,
              width: "18px",
            }}
          >
            03
          </span>
          <span style={{ fontFamily: fontBody, fontSize: "var(--nx-t-sm)", fontWeight: t.weightBold, color: t.text }}>
            Optional add-ons
          </span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: "var(--nx-t-xs)",
              color: t.textFaint,
              marginLeft: "auto",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Skip if you like
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {availableAddOns.map((a) => {
            const isOn = !!addOns[a.id];
            return (
              <button
                key={a.id}
                onClick={() => toggleAddOn(a.id)}
                data-testid={`addon-${slug}-${a.id}`}
                aria-pressed={isOn}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  background: isOn ? t.accentSoft : "transparent",
                  border: `1px solid ${isOn ? t.borderStrong : t.border}`,
                  borderRadius: t.radius,
                  color: t.text,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s ease",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: isMen ? 3 : 6,
                    border: `1.5px solid ${isOn ? t.accent : t.textMuted}`,
                    background: isOn ? t.accent : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isOn && <Check size={13} strokeWidth={3} style={{ color: t.accentInk }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: "var(--nx-t-sm)",
                      fontWeight: 600,
                      color: t.text,
                    }}
                  >
                    {a.title}
                  </div>
                  <div
                    style={{
                      fontFamily: fontMono,
                      fontSize: "var(--nx-t-xs)",
                      color: t.textMuted,
                      marginTop: "2px",
                    }}
                  >
                    {a.sub}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fontMono,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    color: isOn ? t.accent : t.textMuted,
                    flexShrink: 0,
                  }}
                >
                  +{formatUSD(a.priceOneOff)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Live total recap */}
      <div
        style={{
          padding: "18px 20px",
          background: isMen ? "var(--nx-fg)" : t.bgSoft,
          border: `1px solid ${t.borderStrong}`,
          borderRadius: t.radius,
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px" }}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isMen ? t.accent : t.textMuted,
            }}
          >
            Total this cycle
          </span>
          {savings > 0 && (
            <span
              style={{
                fontFamily: fontMono,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.accent,
              }}
            >
              You save {formatUSD(savings)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <span
              style={{
                fontFamily: isMen ? fontMono : fontDisplay,
                fontSize: isWomen ? "var(--nx-t-h2)" : "var(--nx-t-h2)",
                fontWeight: isMen ? 700 : 500,
                color: isMen ? t.text : t.text,
                lineHeight: 1,
                letterSpacing: isMen ? "-0.02em" : "-0.01em",
              }}
              data-testid={`cycle-total-${slug}`}
            >
              {formatUSD(cycleTotal)}
            </span>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: "var(--nx-t-xs)",
                color: isMen ? t.textMuted : t.textMuted,
                marginLeft: "8px",
                letterSpacing: "0.04em",
              }}
            >
              · {cadenceMonths === 1 ? "1 month" : `${cadenceMonths} months`}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: fontMono,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 600,
                color: isMen ? t.text : t.text,
              }}
            >
              {formatUSD(perMonth)}/mo
            </div>
            <div
              style={{
                fontFamily: fontMono,
                fontSize: "var(--nx-t-xs)",
                color: t.textFaint,
                marginTop: "2px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {addOnTotal > 0 ? `+ ${formatUSD(addOnTotal)} add-ons` : "billed monthly"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Add to cart */}
      <button
        onClick={handleAdd}
        data-testid={`hims-add-${slug}`}
        aria-label={`Add ${productName} to cart`}
        style={{
          width: "100%",
          padding: "18px 20px",
          background: justAdded ? t.accent : isMen ? t.accent : "var(--nx-fg)",
          color: justAdded ? t.accentInk : isMen ? t.accentInk : "var(--nx-bg)",
          border: "none",
          borderRadius: t.radius,
          fontFamily: fontBody,
          fontSize: "var(--nx-t-sm)",
          fontWeight: 700,
          letterSpacing: isMen ? "0.06em" : "0.02em",
          textTransform: isMen ? "uppercase" : "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          transition: "all 0.2s ease",
          boxShadow: justAdded ? `0 8px 24px ${t.accentSoft}` : "none",
        }}
      >
        {justAdded ? (
          <>
            <Check size={17} strokeWidth={2.8} /> Added — begin intake
          </>
        ) : (
          <>
            <Plus size={16} strokeWidth={2.8} /> Add to cart · {formatUSD(cycleTotal)}
          </>
        )}
      </button>

      {/* ── Trust line */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
        <Sparkles size={11} style={{ color: t.accent }} />
        <p
          style={{
            fontFamily: fontMono,
            fontSize: "var(--nx-t-xs)",
            color: t.textMuted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
          }}
        >
          U.S. MD written · 503A compounded · HSA/FSA · Cancel anytime
        </p>
      </div>
    </div>
  );
}
