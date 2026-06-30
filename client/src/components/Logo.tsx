import { Link } from "wouter";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#0A0A0A";
  const cobalt = "#0A0A0A";

  return (
    <Link href="/" className={`inline-flex items-center gap-2 no-underline ${className}`} data-testid="logo-nexphoria">
      {/* SVG wordmark */}
      <svg
        width="140"
        height="28"
        viewBox="0 0 140 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nexphoria"
      >
        {/* N mark — geometric letterform */}
        <path
          d="M2 24V4h3.5L16 18.5V4H19.5V24H16L5.5 9.5V24H2Z"
          fill={textColor}
        />
        {/* EXPHORIA text */}
        <text
          x="26"
          y="21"
          fontFamily="'Inter Tight', sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.08em"
          fill={textColor}
        >
          EXPHORIA
        </text>
      </svg>
      {/* Cobalt dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cobalt }}
      />
      {/* Peptide pharmacy sub-mark */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: cobalt,
        }}
      >
        Peptide Pharmacy
      </span>
    </Link>
  );
}
