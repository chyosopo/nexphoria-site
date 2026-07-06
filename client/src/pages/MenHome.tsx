/* JOB: the men's front door — cast the engine azure and start the assessment. */
/* ═══ MEN'S HOME — P3 rebuild · thin config over the WorldHome engine ═══ */
import { WorldHome } from "@/components/WorldHome";
import { HomeTrust } from "@/components/HomeTrust";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { OUTCOME_CATEGORY, OUTCOME_HERO } from "@/data/outcomeImagery";
import faqConsultMen from "@/assets/brand/faq-consult-men.webp";

export default function MenHome() {
  useSeo({
    title: "Nexphoria for Men — Physician-Prescribed Peptide Protocols",
    description:
      "Ninety-nine biomarkers, physician review, state-licensed 503A compounding, and a 90-day retest loop. Peptide protocols for men, measured first.",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria for Men", description: "Physician-prescribed peptide protocols for men — measured, prescribed, retested.", path: "/men" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Men", path: "/men" }]),
    ],
  });
  return (
    <WorldHome
      config={{
        world: "men",
        tileArt: OUTCOME_CATEGORY.men,
        heroArt: OUTCOME_HERO.men,
        vialArt: "img/img_7dd6cd5b4581.webp",
        eyebrow: "Nexphoria for Men",
        // Beat structure (ROADMAP 4.1): feeling → possibility → proof → path.
        // The sub is a narrative sentence, never a feature list.
        h1: (
          <>
            The strongest version of you <em style={{ color: "var(--nx-cobalt)" }}>is measurable.</em>
          </>
        ),
        sub: "Start with what you want back — recovery, drive, deep sleep, lean strength. A licensed physician reads your bloodwork, prescribes only what your numbers justify, and re-draws the same markers every ninety days, so the change is proven, not assumed.",
        categories: ["growth", "recovery", "metabolic", "longevity", "cognition", "sleep"],
        featured: ["bpc-157", "ipamorelin", "tesamorelin", "nad-plus"],
        nightEyebrow: "The standard",
        nightH2: (
          <>
            A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
          </>
        ),
        nightBody:
          "Most of this market sells vials and disappears. Here, the same panel is drawn again every ninety days, the trend is placed next to the protocol, and a physician decides what changes. Nothing is assumed.",
        trustSlot: <HomeTrust />,
        faqArt: faqConsultMen,
        heroMarker: { label: "IGF-1", delta: "+23%", state: "Into the optimal band" },
      }}
    />
  );
}
