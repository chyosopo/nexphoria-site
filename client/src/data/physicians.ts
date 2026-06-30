/* ──────────────────────────────────────────────────────────────
   Nexphoria Medical Advisory Team — single source of truth.
   5 board-certified US physicians. Used by: /physicians, gender home pages.
   ────────────────────────────────────────────────────────────── */

import drChen from "@/assets/doctors/dr-chen.jpg";
import drPatel from "@/assets/doctors/dr-patel.jpg";
import drReyes from "@/assets/doctors/dr-reyes.jpg";
import drOkafor from "@/assets/doctors/dr-okafor.jpg";
import drBennett from "@/assets/doctors/dr-bennett.jpg";

export type Physician = {
  photo: string;
  name: string;
  specialty: string;
  institution: string;
  credentials: string;
  bio: string;
};

export const physicians: Physician[] = [
  {
    photo: drChen,
    name: "Dr. Wei Chen, MD",
    specialty: "Internal Medicine",
    institution: "UCSF",
    credentials: "ABIM Board-Certified · Internal Medicine",
    bio: "Dr. Chen brings 18 years of internal medicine practice to Nexphoria's clinical review team. Trained at UCSF, she specializes in metabolic health, longevity medicine, and evidence-based peptide protocols for women.",
  },
  {
    photo: drPatel,
    name: "Dr. Arjun Patel, MD",
    specialty: "Endocrinology",
    institution: "Cleveland Clinic",
    credentials: "ABIM Board-Certified · Endocrinology",
    bio: "Dr. Patel is a Cleveland Clinic-trained endocrinologist with deep expertise in the growth-hormone axis, metabolic regulation, and GLP-1 pharmacology. He leads review of all hormonal and growth-secretagogue protocols.",
  },
  {
    photo: drReyes,
    name: "Dr. Mateo Reyes, MD",
    specialty: "Integrative Medicine",
    institution: "Mayo Clinic",
    credentials: "Mayo Clinic Fellowship · Integrative Medicine",
    bio: "Dr. Reyes integrates evidence-based peptide science with functional medicine. His Mayo Clinic training and extensive research background inform Nexphoria's longevity and recovery protocols.",
  },
  {
    photo: drOkafor,
    name: "Dr. Adaeze Okafor, MD",
    specialty: "Family Medicine",
    institution: "Johns Hopkins",
    credentials: "ABFM Board-Certified · Family Medicine",
    bio: "A Johns Hopkins-trained family physician, Dr. Okafor oversees patient safety review and ongoing lab interpretation. She ensures every protocol is appropriate for the member's baseline health.",
  },
  {
    photo: drBennett,
    name: "Dr. Sarah Bennett, MD",
    specialty: "Anti-Aging Medicine",
    institution: "Stanford",
    credentials: "Stanford Fellowship · Longevity & Anti-Aging Medicine",
    bio: "Dr. Bennett holds a Stanford fellowship in longevity medicine and is a recognized authority on NAD+ biology, epigenetic age reversal, and precision supplementation. She leads the Nexphoria longevity stack development.",
  },
];
