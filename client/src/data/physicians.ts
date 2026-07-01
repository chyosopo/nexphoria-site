/* ──────────────────────────────────────────────────────────────
   Nexphoria Medical Advisory Team — single source of truth.
   5 board-certified US physicians. Used by: /physicians, gender home pages.
   ────────────────────────────────────────────────────────────── */

import drChen from "@/assets/doctors/dr-chen.webp";
import drPatel from "@/assets/doctors/dr-patel.webp";
import drReyes from "@/assets/doctors/dr-reyes.webp";
import drOkafor from "@/assets/doctors/dr-okafor.webp";
import drBennett from "@/assets/doctors/dr-bennett.webp";

export type Physician = {
  photo: string;
  name: string;
  specialty: string;
  institution: string;
  credentials: string;
  bio: string;
  /** Long-form CV shown when patient expands "Read more" */
  extendedBio: string;
  /** Areas the doctor signs off on inside Nexphoria */
  focus: string[];
  /** Public-record publications / training */
  publications: string[];
  /** Languages they consult in */
  languages: string;
};

export const physicians: Physician[] = [
  {
    photo: drChen,
    name: "Dr. Wei Chen, MD",
    specialty: "Internal Medicine",
    institution: "UCSF",
    credentials: "ABIM Board-Certified · Internal Medicine",
    bio: "Dr. Chen brings 18 years of internal medicine practice to Nexphoria's clinical review team. Trained at UCSF, she specializes in metabolic health, longevity medicine, and evidence-based peptide protocols for women.",
    extendedBio:
      "Wei completed her MD at UCSF School of Medicine and her residency at UCSF Medical Center, where she was selected as chief resident. She practiced as an attending internist at Sutter Pacific Medical Foundation for over a decade before transitioning into preventative and longevity medicine. She is fluent in clinical pharmacology of GLP-1 and growth-hormone axis modulation and has been published on metabolic syndrome management. At Nexphoria she co-authors the GLOW and Metabolic protocols and personally reviews every female patient over 45.",
    focus: ["Metabolic protocols (Tirzepatide, Semaglutide)", "Female longevity stacks", "Hormonal optimization", "Lab interpretation & dose titration"],
    publications: ["JAMA Internal Medicine (2019) — primary author, metabolic risk reduction in women 40-60", "American Journal of Medicine (2021) — co-author, GLP-1 long-term safety"],
    languages: "English, Mandarin",
  },
  {
    photo: drPatel,
    name: "Dr. Arjun Patel, MD",
    specialty: "Endocrinology",
    institution: "Cleveland Clinic",
    credentials: "ABIM Board-Certified · Endocrinology",
    bio: "Dr. Patel is a Cleveland Clinic-trained endocrinologist with deep expertise in the growth-hormone axis, metabolic regulation, and GLP-1 pharmacology. He leads review of all hormonal and growth-secretagogue protocols.",
    extendedBio:
      "Arjun trained at Cleveland Clinic and completed an additional fellowship in endocrinology and metabolism at Mayo. He has consulted for compounding pharmacies on safe peptide sterility and dose-escalation protocols and has authored peer-reviewed work on incretin pharmacology. He maintains a private practice in Cleveland in addition to his work with Nexphoria and is a member of the Endocrine Society. He signs every Wolverine, Cognitive, and Strength protocol.",
    focus: ["Growth-hormone secretagogue protocols (CJC-1295, Ipamorelin, Sermorelin)", "Tirzepatide / Semaglutide titration", "Wolverine (recovery) stack", "Male hormonal optimization"],
    publications: ["Journal of Clinical Endocrinology & Metabolism (2020) — GH secretagogue pharmacokinetics", "Endocrine Practice (2022) — co-author, incretin therapy in mid-life adults"],
    languages: "English, Hindi, Gujarati",
  },
  {
    photo: drReyes,
    name: "Dr. Mateo Reyes, MD",
    specialty: "Integrative Medicine",
    institution: "Mayo Clinic",
    credentials: "Mayo Clinic Fellowship · Integrative Medicine",
    bio: "Dr. Reyes integrates evidence-based peptide science with functional medicine. His Mayo Clinic training and extensive research background inform Nexphoria's longevity and recovery protocols.",
    extendedBio:
      "Mateo trained at Mayo Clinic and completed his integrative medicine fellowship there. He spent six years as an attending in the Mayo Clinic Department of General Internal Medicine before launching a precision-medicine consultancy. He brings a rigorous evidence-based filter to functional protocols — only peptides with at least Tier B+ evidence make it into the Nexphoria formulary on his sign-off. He co-developed the Restore (sleep) and Longevity stacks.",
    focus: ["Longevity stack (NAD+, MOTS-c, Epitalon)", "Restore (sleep) protocols", "BPC-157 tissue-repair use cases", "Evidence-tier formulary review"],
    publications: ["Mayo Clinic Proceedings (2019) — integrative approaches to mid-life sleep disturbance", "Integrative Medicine Research (2023) — review, peptide therapeutics evidence framework"],
    languages: "English, Spanish",
  },
  {
    photo: drOkafor,
    name: "Dr. Adaeze Okafor, MD",
    specialty: "Family Medicine",
    institution: "Johns Hopkins",
    credentials: "ABFM Board-Certified · Family Medicine",
    bio: "A Johns Hopkins-trained family physician, Dr. Okafor oversees patient safety review and ongoing lab interpretation. She ensures every protocol is appropriate for the member's baseline health.",
    extendedBio:
      "Adaeze trained at Johns Hopkins School of Medicine and completed her family medicine residency at Johns Hopkins Bayview. She practiced primary care in Baltimore for nine years before moving into preventative medicine. At Nexphoria she owns the safety-review checklist: every member's intake form, Quest baseline panel, and 90-day follow-up labs cross her desk. She has zero tolerance for protocols that conflict with a member's existing medications or labs.",
    focus: ["Safety review on all new members", "Drug-interaction screening", "Quest baseline & 90-day lab interpretation", "Refill medical necessity sign-off"],
    publications: ["Journal of Family Medicine (2018) — long-term primary care outcomes review", "American Family Physician (2021) — co-author, polypharmacy in mid-life"],
    languages: "English, Igbo",
  },
  {
    photo: drBennett,
    name: "Dr. Sarah Bennett, MD",
    specialty: "Anti-Aging Medicine",
    institution: "Stanford",
    credentials: "Stanford Fellowship · Longevity & Anti-Aging Medicine",
    bio: "Dr. Bennett holds a Stanford fellowship in longevity medicine and is a recognized authority on NAD+ biology, epigenetic age reversal, and precision supplementation. She leads the Nexphoria longevity stack development.",
    extendedBio:
      "Sarah completed her MD at Stanford and her fellowship in longevity medicine at the Stanford Center on Longevity. Her research focus is mitochondrial bioenergetics — specifically NAD+ precursor pharmacology and MOTS-c signaling. She has presented at the American Aging Association and contributed to consensus statements on safe longevity-peptide use. She authors the Longevity stack and reviews every member's epigenetic-age trajectory.",
    focus: ["Longevity stack architecture", "NAD+ / MOTS-c / Epitalon protocols", "Epigenetic-age tracking (TruDiagnostic, Horvath clock)", "Female peri/post-menopausal optimization"],
    publications: ["Aging Cell (2021) — NAD+ precursor pharmacology in adults 40+", "Cell Metabolism (2023) — co-author, MOTS-c signaling review"],
    languages: "English, French",
  },
];
