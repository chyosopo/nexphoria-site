/* The add-on tests worth showing beside a medicine, a protocol or a goal,
   as quiet chips into /labs. Reads data/labs; renders nothing when none. */
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { addonsFor } from "@/data/labs";
import { usd } from "@/data/stacksCatalog";
import { F } from "@/lib/typography";

export function AddonsFor({ keys, testId }: { keys: string[]; testId?: string }) {
  const seen = new Set<string>();
  const list = keys.flatMap((k) => addonsFor(k)).filter((a) => (seen.has(a.slug) ? false : (seen.add(a.slug), true))).slice(0, 3);
  if (list.length === 0) return null;
  return (
    <div className="nx-addons-for" data-testid={testId}>
      <p style={{ fontFamily: F }} className="nx-addons-for__h">Go deeper, if you want to</p>
      <ul>
        {list.map((a) => (
          <li key={a.slug}>
            <Link href="/labs" className="nx-addons-for__chip" style={{ fontFamily: F }}>
              <Plus size={12} strokeWidth={2.6} aria-hidden="true" /> {a.name} <span>{usd(a.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
