/* ══ D6 — TYPOGRAPHY SOURCE OF TRUTH ══
   The only place the families are named. Pages import; nobody redeclares.
   General Sans carries the interface; Fraunces speaks only in display. */
/* The faces are tokens (2026-09-04): a second sheet can swap the display
   face without touching a single component. Defined in index.css :root. */
export const F = "var(--nx-font-body)";
export const S = "var(--nx-font-display)";
export const FONT = F; // legacy alias — several pages destructure this name
