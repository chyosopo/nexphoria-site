/* What to expect, as data (the playbook, 2026-09-04): when you feel it, when
   the full effect arrives, how strong the evidence is, what it stacks well
   with, and what does the same job. Every field is read from the catalog so
   a card can never promise what the entry does not say. Names in the
   combine/avoid lists resolve to live PDPs; a retired name renders as text. */
import { Link } from "wouter";
import { Clock, Flag, FlaskConical, Layers, Scale } from "lucide-react";
import { F, S } from "@/lib/typography";
import { EVIDENCE_LABEL, EVIDENCE_NOTE, soloByName, type SoloPeptide } from "@/data/soloCatalog";

function NameList({ names, base }: { names: string[]; base: string }) {
  return (
    <>
      {names.map((n, i) => {
        const s = soloByName(n);
        return (
          <span key={n}>
            {i > 0 && <span aria-hidden> · </span>}
            {s ? <Link href={`${base}/peptides/${s.slug}`} className="nx-text-link" style={{ fontWeight: 600 }}>{n}</Link> : n}
          </span>
        );
      })}
    </>
  );
}

export function ExpectCard({ sku, base = "", testId }: { sku: SoloPeptide; base?: string; testId?: string }) {
  const ev = sku.evidence;
  const hasAny = sku.feelBy || sku.fullEffect || ev || sku.combine?.length || sku.avoid?.length;
  if (!hasAny) return null;
  return (
    <div className="nx-expect" data-testid={testId ?? `expect-${sku.slug}`}>
      <div className="nx-expect__grid">
        {sku.feelBy && (
          <div className="nx-expect__cell">
            <p className="nx-expect__label" style={{ fontFamily: F }}><Clock size={13} strokeWidth={2} aria-hidden="true" /> Typical onset</p>
            <p className="nx-expect__value" style={{ fontFamily: S }}>{sku.feelBy}</p>
          </div>
        )}
        {sku.fullEffect && (
          <div className="nx-expect__cell">
            <p className="nx-expect__label" style={{ fontFamily: F }}><Flag size={13} strokeWidth={2} aria-hidden="true" /> Full effect</p>
            <p className="nx-expect__value" style={{ fontFamily: S }}>{sku.fullEffect}</p>
          </div>
        )}
        {ev && (
          <div className="nx-expect__cell">
            <p className="nx-expect__label" style={{ fontFamily: F }}><FlaskConical size={13} strokeWidth={2} aria-hidden="true" /> Evidence</p>
            <p className="nx-expect__value" style={{ fontFamily: S }}>{EVIDENCE_LABEL[ev]}</p>
            <span className="nx-evidence" aria-hidden="true">
              {[1, 2, 3].map((n) => <i key={n} className={n <= ev ? "on" : undefined} />)}
            </span>
            <p className="nx-expect__note" style={{ fontFamily: F }}>{EVIDENCE_NOTE[ev]}</p>
          </div>
        )}
      </div>
      {(sku.combine?.length || sku.avoid?.length) ? (
        <div className="nx-expect__rules">
          {sku.combine && sku.combine.length > 0 && (
            <p style={{ fontFamily: F }}>
              <span className="nx-expect__rule"><Layers size={13} strokeWidth={2} aria-hidden="true" /> Often prescribed with</span>{" "}
              <NameList names={sku.combine} base={base} />
            </p>
          )}
          {sku.avoid && sku.avoid.length > 0 && (
            <p style={{ fontFamily: F }}>
              <span className="nx-expect__rule"><Scale size={13} strokeWidth={2} aria-hidden="true" /> Does the same job, pick one</span>{" "}
              <NameList names={sku.avoid} base={base} />
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
