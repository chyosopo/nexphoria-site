import { motion } from "framer-motion";
import { EducationCard } from "@/components/EducationCard";

/* Editorial brand images */
import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import editorialPrescription from "@/assets/brand/editorial-prescription.webp";
import editorialProtocolKit from "@/assets/brand/editorial-protocol-kit.webp";
import editorialPharmacy from "@/assets/brand/editorial-pharmacy.webp";

/* ─────────────────────────────────────────────────────────────
   EducationHub — Wave 5
   Homepage section: 4-card education grid on cream background.
   ───────────────────────────────────────────────────────────── */

const articles = [
  {
    eyebrow: "FOUNDATIONS",
    title: "What is a peptide, exactly?",
    readTime: "8 MIN",
    excerpt:
      "Short chains of amino acids that signal cells. Understanding mechanism is the first step toward informed therapy.",
    href: "/education/what-is-a-peptide",
    imageSrc: editorialBloodwork,
  },
  {
    eyebrow: "PROTOCOLS",
    title: "Reading your bloodwork without panic.",
    readTime: "12 MIN",
    excerpt:
      "Reference ranges are population averages — not your personal optimum. A primer on biomarker interpretation.",
    href: "/education/reading-your-bloodwork",
    imageSrc: editorialPrescription,
  },
  {
    eyebrow: "SAFETY",
    title: "Side effects, contraindications, and when to stop.",
    readTime: "9 MIN",
    excerpt:
      "Every peptide has a side-effect profile. We catalog them, severity-rated, with clinical recourse.",
    href: "/education/side-effects-and-contraindications",
    imageSrc: editorialProtocolKit,
  },
  {
    eyebrow: "REGULATION",
    title: "The legal landscape of compounded peptides in 2026.",
    readTime: "14 MIN",
    excerpt:
      "503A pharmacies, FDA enforcement discretion, and what 'research-only' really means.",
    href: "/education/legal-landscape-compounded-peptides-2026",
    imageSrc: editorialPharmacy,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export function EducationHub() {
  return (
    <section
      data-testid="education-hub"
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
      }}
      className="py-20 lg:py-28"
    >
      <div className="nx-container">

        {/* ── Section header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "3rem",
          }}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "var(--nx-fg)",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg)",
                }}
              >
                EDUCATION
              </p>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.625rem",
                letterSpacing: "-0.01em",
              }}
            >
              Learn before you start.{" "}
              <em>Before you start.</em>
            </h2>

            {/* Subhead */}
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "15px",
                color: "var(--nx-fg-muted)",
                lineHeight: 1.6,
              }}
            >
              Peptide therapy demands literacy. Read the science. Then decide.
            </p>
          </div>

          {/* Explore all link */}
          <a
            href="/education"
            data-testid="education-hub-explore-all-link"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--nx-fg)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              whiteSpace: "nowrap",
              alignSelf: "flex-end",
              paddingBottom: "2px",
              transition: "opacity 150ms ease",
            }}
            className="hover:opacity-60"
          >
            Explore all articles →
          </a>
        </motion.div>

        {/* ── Cards grid ───────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          data-testid="education-hub-grid"
        >
          {articles.map((article, i) => (
            <motion.div
              key={article.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <EducationCard {...article} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
