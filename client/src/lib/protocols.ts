/* protocols.ts — glyph mapping only.
   The former peptide/stack data arrays here were unrendered dead code carrying
   pre-compliance language (disease/healing claims); removed 2026-08 for LegitScript.
   Canonical peptide + stack data lives in data/peptides.ts and data/stacksCatalog.ts.
   glyphForPeptide is the only consumed export (StackPage.tsx). */

export const glyphForPeptide = (slug: string): "chain" | "helix" | "copper" | "fragment" | "branch" | "ghrh" | "secretagogue" | "ring" => {
  switch (slug) {
    case "bpc-157": return "chain";
    case "tb-500": return "helix";
    case "ghk-cu": return "copper";
    case "epitalon": return "fragment";
    case "thymosin-a1": return "branch";
    case "nad-plus": return "ring";
    case "mots-c": return "fragment";
    case "ipamorelin": return "secretagogue";
    case "dsip": return "chain";
    case "selank": return "branch";
    case "cjc-1295": return "ghrh";
    case "tirzepatide": return "ghrh";
    case "retatrutide": return "branch";
    case "aod-9604": return "fragment";
    case "tesamorelin": return "ghrh";
    default: return "ring";
  }
};
