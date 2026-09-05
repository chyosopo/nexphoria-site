/* ═══ A section the reader opens ═══
   The product page carries two kinds of block. The SPINE — how it works,
   what arrives, the first twelve weeks — is the page, and stays open. The
   REFERENCE — the citations, the prescriber and pharmacy disclosures — is
   what a reader consults rather than reads, and it was costing more height
   than the spine it surrounded (the parties block alone measured 1,582px on
   a phone, 18% of the page).

   So the reference folds. The heading and one line of what is inside stay
   visible, and the material is one tap away. Nothing is removed: <details>
   keeps its contents in the DOM, so the prerendered HTML a crawler or a
   LegitScript reviewer fetches is unchanged, and the compliance gates read
   the same text they always did.

   Chiya, 2026-09-05: "it's still endless and so much going on and there's no
   clarity." Clarity here is not fewer facts; it is a page whose shape says
   which facts are the point. */
import { ChevronDown } from "lucide-react";
import { F, S } from "@/lib/typography";
import "@/styles/pdp.css";

export function FoldSection({
  id,
  title,
  summary,
  defaultOpen = false,
  testid,
  children,
}: {
  id?: string;
  title: string;
  /** One line naming what is inside, so the closed row still informs. */
  summary: string;
  defaultOpen?: boolean;
  testid?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="nx-fold nx-pdp-sec" open={defaultOpen} data-testid={testid}>
      <summary className="nx-fold__head">
        <span className="nx-fold__text">
          <h2 id={id} className="nx-dsh3 nx-fold__title" style={{ fontFamily: S }}>{title}</h2>
          <span className="nx-fold__sub" style={{ fontFamily: F }}>{summary}</span>
        </span>
        <span className="nx-fold__chev" aria-hidden="true"><ChevronDown size={20} strokeWidth={2} /></span>
      </summary>
      <div className="nx-fold__body">{children}</div>
    </details>
  );
}
