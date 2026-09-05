/* Who this is for: one honest line, then the pointer to who should not. */
import { F, S } from "@/lib/typography";
import { forWhom } from "@/data/forWhom";

export function ForWhom({ slug, testId }: { slug: string; testId?: string }) {
  const line = forWhom(slug);
  if (!line) return null;
  return (
    <div className="nx-card" data-testid={testId ?? `forwhom-${slug}`}>
      <p className="nx-eyebrow">Who this is for</p>
      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.3, color: "var(--nx-fg)", marginTop: "0.5rem", maxWidth: "44ch" }}>{line}</p>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "0.8rem" }}>
        A licensed physician decides whether it is right for you. <a href="#solo-contra-title" className="nx-text-link" style={{ fontWeight: 600 }}>Who should not take it</a>
      </p>
    </div>
  );
}
