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
        tileArt: {
          growth: "https://www.trybloom.ai/img/4f8d5177-ba34-4f5c-b95c-d9271b2813b6",
          recovery: "https://www.trybloom.ai/img/ace22acf-b023-4522-a773-c0671f5aaf37",
          metabolic: "https://www.trybloom.ai/img/bd229679-e0cc-4e85-affb-59f40f25da4c",
          longevity: "https://www.trybloom.ai/img/80b00897-8b9e-4c60-b488-845ad2a7873d",
          cognition: "https://www.trybloom.ai/img/44a95318-984c-4c77-8384-201b86ab9a3d",
          sleep: "https://www.trybloom.ai/img/e5a8ed3d-a365-4f27-b254-98db2d8adeba",
        },
        vialArt: "https://www.trybloom.ai/img/354a63d7-16ff-498f-b9a3-cae919bfa098",
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
