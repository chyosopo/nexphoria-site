/* ═══ WOMEN'S HOME — P3 rebuild · thin config over the WorldHome engine ═══
   Orchid tokens apply automatically under /women via [data-world]. */
import { WorldHome } from "@/components/WorldHome";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export default function WomenHome() {
  useSeo({
    title: "Nexphoria for Women — Physician-Prescribed Peptide Protocols",
    description:
      "Seventy-six biomarkers, physician review, state-licensed 503A compounding, and a 90-day retest loop. Peptide protocols for women, read properly.",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria for Women", description: "Physician-prescribed peptide protocols for women — read properly, then treated.", path: "/women" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Women", path: "/women" }]),
    ],
  });
  return (
    <WorldHome
      config={{
        world: "women",
        tileArt: {
          skin: "https://www.trybloom.ai/img/0e80b3a5-04e7-469b-aa07-f4a4ffe30179",
          recovery: "https://www.trybloom.ai/img/5d2dd8ef-cf5e-4fdc-85a7-6b87d85df16d",
          metabolic: "https://www.trybloom.ai/img/0951d178-5de6-4211-ade2-df2e7bd36fbd",
          longevity: "https://www.trybloom.ai/img/ae1cf698-e42c-4c3a-8994-fe4e7b8c23f3",
          cognition: "https://www.trybloom.ai/img/57983c14-9014-446c-bde8-7682be16ffb4",
          sleep: "https://www.trybloom.ai/img/547fe46b-bfec-4a57-8841-a48db10b1975",
        },
        vialArt: "https://www.trybloom.ai/img/8af95628-e4ce-42a2-ade7-538102843091",
        eyebrow: "Nexphoria for Women",
        h1: (
          <>
            Your biology, read properly. <em style={{ color: "var(--nx-cobalt)" }}>Then treated.</em>
          </>
        ),
        sub: "Seventy-six biomarkers, a licensed physician who reads them against your history, and protocols compounded for you in state-licensed 503A pharmacies — reviewed against your own results every ninety days.",
        categories: ["skin", "recovery", "metabolic", "longevity", "cognition", "sleep"],
        featured: ["ghk-cu", "bpc-157", "tirzepatide", "epitalon"],
        nightEyebrow: "The standard",
        nightH2: (
          <>
            Nothing assumed. <em style={{ color: "var(--nx-acid)" }}>Everything measured.</em>
          </>
        ),
        nightBody:
          "Hormonal context changes what a marker means. Every protocol here begins from your panel, not a template — and every ninety days the same markers are drawn again and reviewed by a physician before anything continues.",
      }}
    />
  );
}
