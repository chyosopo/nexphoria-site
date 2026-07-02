/**
 * MolecularGlyph — hand-drawn, monoline line-art suggestive of molecular
 * structure. NOT chemically accurate; each glyph is a distinct, recognizable
 * silhouette per peptide family. Strokes use currentColor; key functional
 * groups are accented in acid green (#8FC6FF). Respects the brand palette only.
 *
 * One <svg> per glyph id (matches Peptide.glyph). 200x200 viewBox.
 */

const ACID = "#8FC6FF";

type GlyphId =
  | "chain"
  | "ring"
  | "copper"
  | "helix"
  | "branch"
  | "ghrh"
  | "secretagogue"
  | "fragment";

export function MolecularGlyph({
  glyph,
  size = 120,
  className = "",
  title = "",
}: {
  glyph: GlyphId;
  size?: number;
  className?: string;
  title?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 200 200",
    fill: "none" as const,
    xmlns: "http://www.w3.org/2000/svg",
    className,
    role: "img" as const,
    "aria-label": title || `${glyph} molecular glyph`,
  };
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (glyph) {
    case "chain":
      // A bent amino-acid chain: nodes connected by bonds, two acid-accent residues.
      return (
        <svg {...common}>
          <title>{title}</title>
          <polyline points="24,140 54,108 88,128 118,92 150,112 178,78" {...stroke} />
          <circle cx="24" cy="140" r="9" {...stroke} />
          <circle cx="54" cy="108" r="9" {...stroke} />
          <circle cx="88" cy="128" r="9" fill={ACID} stroke={ACID} />
          <circle cx="118" cy="92" r="9" {...stroke} />
          <circle cx="150" cy="112" r="9" fill={ACID} stroke={ACID} />
          <circle cx="178" cy="78" r="9" {...stroke} />
          {/* side branches */}
          <line x1="54" y1="108" x2="48" y2="78" {...stroke} />
          <line x1="118" y1="92" x2="126" y2="62" {...stroke} />
        </svg>
      );
    case "helix":
      // Twisting double-strand suggesting an actin-binding helix.
      return (
        <svg {...common}>
          <title>{title}</title>
          <path d="M58 24 C 120 56, 80 90, 142 122 C 80 150, 120 168, 58 178" {...stroke} />
          <path d="M142 24 C 80 56, 120 90, 58 122 C 120 150, 80 168, 142 178" {...stroke} />
          {[40, 78, 116, 154].map((y, i) => (
            <line key={y} x1={i % 2 ? 70 : 70} y1={y} x2={130} y2={y} {...stroke} />
          ))}
          <circle cx="58" cy="24" r="6" fill={ACID} stroke={ACID} />
          <circle cx="142" cy="178" r="6" fill={ACID} stroke={ACID} />
        </svg>
      );
    case "copper":
      // Tripeptide with a central copper ion (acid node) held by coordination bonds.
      return (
        <svg {...common}>
          <title>{title}</title>
          <polyline points="36,150 76,116 100,150 124,116 164,150" {...stroke} />
          <circle cx="36" cy="150" r="9" {...stroke} />
          <circle cx="76" cy="116" r="9" {...stroke} />
          <circle cx="124" cy="116" r="9" {...stroke} />
          <circle cx="164" cy="150" r="9" {...stroke} />
          {/* central copper ion */}
          <circle cx="100" cy="64" r="14" fill={ACID} stroke={ACID} />
          <text x="100" y="69" textAnchor="middle" fontSize="13" fill="#000" fontFamily="monospace">Cu</text>
          {/* coordination bonds (dashed) */}
          <line x1="76" y1="116" x2="92" y2="78" {...stroke} strokeDasharray="4 5" />
          <line x1="124" y1="116" x2="108" y2="78" {...stroke} strokeDasharray="4 5" />
          <line x1="100" y1="150" x2="100" y2="78" {...stroke} strokeDasharray="4 5" />
        </svg>
      );
    case "fragment":
      // Short cleaved fragment — a snapped chain with an acid terminus.
      return (
        <svg {...common}>
          <title>{title}</title>
          <polyline points="30,96 64,72 98,104" {...stroke} />
          <polyline points="120,72 150,104 182,80" {...stroke} />
          <circle cx="30" cy="96" r="8" {...stroke} />
          <circle cx="64" cy="72" r="8" {...stroke} />
          <circle cx="98" cy="104" r="8" fill={ACID} stroke={ACID} />
          <circle cx="120" cy="72" r="8" fill={ACID} stroke={ACID} />
          <circle cx="150" cy="104" r="8" {...stroke} />
          <circle cx="182" cy="80" r="8" {...stroke} />
          {/* cleavage gap marker */}
          <line x1="103" y1="120" x2="115" y2="56" stroke={ACID} strokeWidth={2.2} strokeDasharray="3 5" />
        </svg>
      );
    case "branch":
      // Branched tuftsin-like glyph radiating from a core.
      return (
        <svg {...common}>
          <title>{title}</title>
          <circle cx="100" cy="100" r="11" fill={ACID} stroke={ACID} />
          {[
            [100, 100, 100, 36],
            [100, 100, 158, 70],
            [100, 100, 158, 130],
            [100, 100, 100, 164],
            [100, 100, 42, 130],
            [100, 100, 42, 70],
          ].map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />
              <circle cx={x2} cy={y2} r="8" {...stroke} />
            </g>
          ))}
        </svg>
      );
    case "ghrh":
      // Long helix-bar suggesting a GHRH peptide chain with a receptor cap.
      return (
        <svg {...common}>
          <title>{title}</title>
          <path d="M28 150 C 70 110, 130 110, 172 70" {...stroke} />
          {[
            [40, 140], [62, 124], [86, 116], [112, 104], [138, 92], [162, 78],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="7" {...(i === 5 ? { fill: ACID, stroke: ACID } : stroke)} />
          ))}
          {/* receptor cap */}
          <path d="M150 56 C 170 44, 190 56, 184 78" {...stroke} />
          <circle cx="40" cy="140" r="9" fill={ACID} stroke={ACID} />
        </svg>
      );
    case "secretagogue":
      // Compact ring fused to a short tail — small-molecule secretagogue feel.
      return (
        <svg {...common}>
          <title>{title}</title>
          <polygon points="84,52 124,52 144,90 124,128 84,128 64,90" {...stroke} />
          <circle cx="104" cy="90" r="6" fill={ACID} stroke={ACID} />
          <polyline points="124,128 150,150 176,140" {...stroke} />
          <polyline points="84,128 58,150 34,138" {...stroke} />
          <circle cx="176" cy="140" r="7" {...stroke} />
          <circle cx="34" cy="138" r="7" fill={ACID} stroke={ACID} />
        </svg>
      );
    case "ring":
    default:
      // Aromatic-ring style fallback.
      return (
        <svg {...common}>
          <title>{title}</title>
          <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" {...stroke} />
          <circle cx="100" cy="100" r="22" {...stroke} />
          <circle cx="100" cy="100" r="6" fill={ACID} stroke={ACID} />
        </svg>
      );
  }
}
