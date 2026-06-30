/**
 * MoleculeIcon — abstract peptide ribbon mark as inline SVG.
 * Used in protocol cards before generated molecule imagery is ready.
 */
export function MoleculeIcon({
  variant = "ribbon",
  className = "",
  size = 64,
}: {
  variant?: "ribbon" | "helix" | "tripeptide" | "ghrh";
  className?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none" as const,
    xmlns: "http://www.w3.org/2000/svg",
    className,
  };

  if (variant === "helix") {
    return (
      <svg {...common} aria-label="α-helix peptide">
        <path d="M20 10 Q50 30, 20 50 Q-10 70, 20 90" stroke="currentColor" strokeWidth="1.5" />
        <path d="M80 10 Q50 30, 80 50 Q110 70, 80 90" stroke="currentColor" strokeWidth="1.5" />
        {[15, 30, 45, 60, 75].map((y) => (
          <line key={y} x1="22" y1={y} x2="78" y2={y + 5} stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        ))}
        <circle cx="22" cy="15" r="2" fill="currentColor" />
        <circle cx="78" cy="15" r="2" fill="currentColor" />
        <circle cx="22" cy="50" r="2" fill="currentColor" />
        <circle cx="78" cy="50" r="2" fill="currentColor" />
        <circle cx="22" cy="85" r="2" fill="currentColor" />
        <circle cx="78" cy="85" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "tripeptide") {
    return (
      <svg {...common} aria-label="copper tripeptide">
        <circle cx="20" cy="25" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="55" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="35" r="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="26" y1="29" x2="44" y2="51" stroke="currentColor" strokeWidth="1" />
        <line x1="56" y1="51" x2="74" y2="39" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="75" r="4" fill="currentColor" />
        <text x="50" y="78" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace">Cu</text>
        <line x1="50" y1="61" x2="50" y2="71" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2,2" />
      </svg>
    );
  }

  if (variant === "ghrh") {
    return (
      <svg {...common} aria-label="GHRH analog">
        <path d="M10 50 Q30 20, 50 50 T90 50" stroke="currentColor" strokeWidth="2" />
        <path d="M10 60 Q30 30, 50 60 T90 60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {[15, 30, 45, 60, 75].map((x) => (
          <circle key={x} cx={x + 5} cy={50 - Math.sin((x / 90) * Math.PI * 2) * 15} r="1.5" fill="currentColor" />
        ))}
      </svg>
    );
  }

  // ribbon default — BPC-157 style
  return (
    <svg {...common} aria-label="peptide ribbon">
      <path
        d="M10 50 Q25 25, 40 50 T70 50 T100 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 55 Q25 30, 40 55 T70 55 T100 55"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      {[18, 35, 52, 68, 85].map((x) => (
        <circle key={x} cx={x} cy={45 + Math.sin(x / 6) * 8} r="1.5" fill="currentColor" />
      ))}
    </svg>
  );
}

/* Look up by peptide slug */
export function moleculeVariantFor(slug: string): "ribbon" | "helix" | "tripeptide" | "ghrh" {
  if (slug === "ghk-cu") return "tripeptide";
  if (slug === "tb-500") return "helix";
  if (slug === "cjc-ipa" || slug === "sermorelin" || slug === "tesamorelin" || slug === "ipamorelin") return "ghrh";
  return "ribbon";
}
