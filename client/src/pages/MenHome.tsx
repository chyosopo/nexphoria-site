/* ═══ MEN'S HOME — P3 rebuild · thin config over the WorldHome engine ═══ */
import { WorldHome } from "@/components/WorldHome";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export default function MenHome() {
  useSeo({
    title: "Nexphoria for Men — Physician-Prescribed Peptide Protocols",
    description:
      "Seventy-six biomarkers, physician review, state-licensed 503A compounding, and a 90-day retest loop. Peptide protocols for men, measured first.",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria for Men", description: "Physician-prescribed peptide protocols for men — measured, prescribed, retested.", path: "/men" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Men", path: "/men" }]),
    ],
  });
  return (
    <WorldHome
      config={{
        world: "men",
        eyebrow: "Nexphoria for Men",
        h1: (
          <>
            Performance is a number. <em style={{ color: "var(--nx-cobalt)" }}>We measure it first.</em>
          </>
        ),
        sub: "Seventy-six biomarkers, a licensed physician who reads them, and protocols compounded in state-licensed 503A pharmacies — adjusted against your own bloodwork every ninety days.",
        categories: ["growth", "recovery", "metabolic", "longevity", "cognition", "sleep"],
        featured: ["bpc-157", "ipamorelin", "tirzepatide", "nad-plus"],
        nightEyebrow: "The standard",
        nightH2: (
          <>
            A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
          </>
        ),
        nightBody:
          "Most of this market sells vials and disappears. Here, the same panel is drawn again every ninety days, the trend is placed next to the protocol, and a physician decides what changes. Nothing is assumed.",
      }}
    />
  );
}
