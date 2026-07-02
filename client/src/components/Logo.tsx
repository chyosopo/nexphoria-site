import { Link } from "wouter";

interface LogoProps {
  variant?: "dark" | "light" | "green";
  className?: string;
  /** Show the "Peptide Pharmacy" sub-mark beside the wordmark */
  withSubmark?: boolean;
  /** Size of the mark in pixels (height) */
  markSize?: number;
}

/**
 * Nexphoria logo — the OFFICIAL brand mark.
 *
 * Sourced from the brand guidelines PDF:
 *  - Mark: three linked "cells" (top-right circle + connective body + bottom-left circle)
 *    representing molecular linkage / peptide bond.
 *  - Wordmark: NEXPHORIA — set in the brand grotesk.
 *  - Colors: black on cream (dark), acid green on black (green), white on dark (light).
 *
 * SVG path data lifted verbatim from:
 *   /client/src/assets/brand/logos/logo-black.svg
 *   /client/src/assets/brand/logos/logo-green.svg
 */
export function Logo({
  variant = "dark",
  className = "",
  withSubmark = true,
  markSize = 28,
}: LogoProps) {
  const ink =
    variant === "light" ? "#FFFFFF" : variant === "green" ? "#c6f184" : "#1C1815";
  const sub =
    variant === "light"
      ? "rgba(255,255,255,0.7)"
      : variant === "green"
      ? "rgba(198,241,132,0.75)"
      : "rgba(10,10,10,0.65)";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 no-underline ${className}`}
      data-testid="logo-nexphoria"
      aria-label="Nexphoria — Peptide Pharmacy"
    >
      {/* Official Nexphoria mark — three linked cells */}
      <svg
        width={markSize}
        height={markSize * (500 / 600)}
        viewBox="0 0 600 500"
        fill={ink}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: "block", flexShrink: 0 }}
      >
        <g>
          <circle cx="129.698" cy="380.792" r="71.864" />
          <path
            d="M519.834,328.405c-17.864-16.774-41.141-22.533-62.628-18.55
            c-18.724,3.471-38.055-0.118-53.17-11.702l-6.86-5.257c-15.349-11.763-23.999-29.746-25.629-49.016
            c-1.685-19.927-11.623-39.039-29.014-51.808c-16.815-12.346-37.204-16.273-56.18-12.583c-18.19,3.537-37.03,0.099-51.739-11.173
            l-7.496-5.744c-15.472-11.857-24.203-29.973-25.892-49.393c-1.792-20.603-12.408-40.363-31.14-53.138
            c-29.987-20.451-71.799-14.725-95.228,12.998c-26.524,31.385-21.393,78.205,10.727,103.18
            c17.127,13.317,38.364,17.629,58.085,13.695c18.6-3.71,37.886,0.889,52.94,12.426l6.216,4.764
            c15.349,11.763,23.999,29.746,25.629,49.016c1.685,19.927,11.623,39.039,29.014,51.809c16.815,12.346,37.204,16.273,56.18,12.583
            c18.19-3.537,37.03-0.099,51.739,11.173l7.704,5.904c14.677,11.248,24.521,28.127,25.467,46.594
            c1.094,21.348,11.653,41.983,30.521,55.197c34.727,24.32,83.49,13.65,104.428-24.632
            C548.956,386.504,543.301,350.44,519.834,328.405z"
          />
          <circle cx="470.305" cy="119.208" r="71.864" />
        </g>
      </svg>

      {/* Wordmark: NEXPHORIA */}
      <span
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "17px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          color: ink,
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        Nexphoria
      </span>

      {/* Submark: "Peptide Pharmacy" */}
      {withSubmark && (
        <>
          <span
            className="hidden sm:inline-block w-px h-3.5 flex-shrink-0"
            style={{ background: sub, opacity: 0.4 }}
            aria-hidden="true"
          />
          <span
            className="hidden sm:inline-block"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: sub,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Peptide Pharmacy
          </span>
        </>
      )}
    </Link>
  );
}
