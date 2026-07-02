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
          skin: "img/img_6f160880b229.webp",
          recovery: "img/img_526a46215359.webp",
          metabolic: "img/img_8fc6c0898049.webp",
          longevity: "img/img_b1321066ad00.webp",
          cognition: "img/img_3569e771fe66.webp",
          sleep: "img/img_29eba76bda96.webp",
        },
        vialArt: "img/img_54f472682fb8.webp",
        eyebrow: "Nexphoria for Women",
        h1: (
          <>
            Your biology, read properly. <em style={{ color: "var(--nx-cobalt)" }}>Then treated.</em>
          </>
        ),
        sub: "Seventy-six biomarkers, a licensed physician who reads them against your history, and protocols compounded for you in state-licensed 503A pharmacies — reviewed against your own results every ninety days.",
        categories: ["skin", "recovery", "metabolic", "longevity", "cognition", "sleep"],
        featured: ["ghk-cu", "bpc-157", "nad-plus", "epitalon"],
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
