/* ═══ EVIDENCE — the citations, moved to where they convert ═══

   Salvaged from the Science page (deleted 2026-08-13, Chiya: "I think we can
   kill the science page, it doesn't make sense"). The page was 1,376 lines
   carrying 20 citations for a 20-SKU catalog; 4 SKUs remain, and a visitor
   deciding on tirzepatide was never going to detour to a separate page to read
   about it. The citations themselves are a real LegitScript trust asset, so
   they are not deleted — they are re-keyed BY MOLECULE and rendered on the PDP
   of the molecule they support, at the moment the question arises.

   RULES THIS FILE ENFORCES:
   · A citation appears under a molecule ONLY if the study is about that
     molecule. SURPASS-2 is a head-to-head, so it legitimately appears under
     both GLP-1s; nothing else is double-listed to pad a list.
   · An empty list renders NOTHING. It never falls back to a neighbouring
     molecule's evidence, and it is never padded — see PT-141 below.
   · Never write a citation from memory. Every entry here was moved verbatim
     from the Science page, which sourced them at the time. Adding a new one
     means Chiya supplies the reference.

   PT-141 (bremelanotide) has NO entry. The Science page never carried one, and
   inventing a plausible-looking reference on a medical page is the single
   worst thing this file could do. Its evidence block simply does not render.
   Chiya to supply the bremelanotide references. */

export interface Evidence {
  /** Full citation, as printed. */
  cite: string;
  /** What the study actually found — plain, no spin, no outcome promise. */
  finding: string;
}

export const EVIDENCE_BY_SLUG: Record<string, Evidence[]> = {
  "tirzepatide": [
    {
      cite: "Jastreboff AM et al. Tirzepatide once weekly for the treatment of obesity. N Engl J Med. 2022;387(3):205–216.",
      finding: "SURMOUNT-1: in 2,539 adults with obesity, tirzepatide produced mean weight reductions of 15–21% over 72 weeks, substantially exceeding placebo and establishing dual GIP/GLP-1 agonism as a leading pharmacotherapy for chronic weight management.",
    },
    {
      cite: "Frías JP et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes (SURPASS-2). N Engl J Med. 2021;385(6):503–515.",
      finding: "Head-to-head RCT in which tirzepatide produced greater reductions in HbA1c and body weight than semaglutide 1 mg, with a comparable gastrointestinal tolerability profile.",
    },
    {
      cite: "Aronne LJ et al. Continued treatment with tirzepatide for maintenance of weight reduction in adults with obesity. JAMA. 2024;331(1):38–48.",
      finding: "SURMOUNT-4: withdrawal of tirzepatide led to substantial weight regain, while continued treatment maintained and extended weight loss — underscoring that obesity pharmacotherapy is a chronic-disease intervention.",
    }
  ],
  "semaglutide": [
    {
      cite: "Wilding JPH et al. Once-weekly semaglutide in adults with overweight or obesity. N Engl J Med. 2021;384(11):989–1002.",
      finding: "STEP-1: semaglutide 2.4 mg weekly achieved a mean 14.9% body-weight reduction versus 2.4% with placebo across 68 weeks, with improvements in cardiometabolic risk factors and physical functioning.",
    },
    {
      cite: "Garvey WT et al. Two-year effects of semaglutide in adults with overweight or obesity (STEP-5). Nat Med. 2022;28(10):2083–2091.",
      finding: "Long-term RCT showing semaglutide maintained a mean 15.2% weight reduction at 104 weeks, confirming durability of effect with continued treatment.",
    },
    {
      cite: "Frías JP et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes (SURPASS-2). N Engl J Med. 2021;385(6):503–515.",
      finding: "Head-to-head RCT in which tirzepatide produced greater reductions in HbA1c and body weight than semaglutide 1 mg, with a comparable gastrointestinal tolerability profile.",
    }
  ],
  "tesamorelin": [
    {
      cite: "Falutz J et al. Effects of tesamorelin on visceral adipose tissue. N Engl J Med. 2007;357(23):2359–2370.",
      finding: "Pivotal trial showing tesamorelin reduced visceral adipose tissue and improved lipid profiles in patients with HIV-associated lipodystrophy, supporting its FDA approval.",
    }
  ],
  "pt-141": [],
};

/** The evidence for a molecule. Empty array when we have none — callers must
 *  render nothing rather than substitute. */
export function evidenceFor(slug: string): Evidence[] {
  return EVIDENCE_BY_SLUG[slug] ?? [];
}
