/* JOB: give the coverage of a protocol or panel as a one-time gift — or
   generate a link asking someone else to cover yours. ═══ THE GIFT ═══
   Honesty is the architecture (hone.com grammar, our voice): a gift covers
   the COST. The recipient still completes their own intake, their own
   physician reads their labs and can decline — and an unprescribed gift is
   refunded, the same pay-only-if-prescribed promise the whole site makes.
   The giver never sees the recipient's health data. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Copy, Gift as GiftIcon, ShieldCheck, Stethoscope, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { usd } from "@/data/stacksCatalog";
import { allGiftItems, encodeGiftAsk, TERM_LABELS, type GiftItem } from "@/data/gift";
import { track } from "@/lib/analytics";
import { F, S } from "@/lib/typography";

const GIFT_FAQ = [
  {
    q: "Can I really gift a prescription protocol?",
    a: "You gift the coverage, not the prescription. Your gift pays for the protocol term or panel; the recipient completes their own intake, and a licensed physician reviews their bloodwork and history before anything is prescribed. Medicine is never dispensed on a gift alone.",
  },
  {
    q: "What if their physician doesn't prescribe it?",
    a: "The same promise that covers every Nexphoria intake covers a gift: no one pays for medicine that isn't prescribed. If the physician declines, or recommends a different protocol, the gift's value is applied to what is actually prescribed — or refunded.",
  },
  {
    q: "Will I see their results?",
    a: "No. You'll know your gift was redeemed; their intake, bloodwork, and everything after stays between them and their physician. That privacy is not a setting — it's the law, and ours by design.",
  },
  {
    q: "Can I ask someone to cover my protocol?",
    a: "Yes — build your plan below and send the link it generates. Whoever opens it sees exactly what they'd be covering and the one-time price, pays once, and you complete your intake as usual.",
  },
];

const HOW = [
  { Icon: GiftIcon, t: "Choose the gift", d: "A protocol term or a bloodwork panel, at its real one-time price — the same numbers on our pricing page." },
  { Icon: Stethoscope, t: "They qualify on their own", d: "The recipient completes their own intake. A licensed physician reads their labs and history — and can decline." },
  { Icon: RefreshCw, t: "Covered, or returned", d: "If prescribed, your gift covers it. If not, the value is applied to what is prescribed — or refunded." },
];

type Mode = "give" | "request";

export default function Gift() {
  useSeo({
    title: "Give a protocol — the Nexphoria gift",
    description: "Cover someone's peptide protocol or bloodwork panel with a one-time payment — or send a link asking someone to cover yours. They still qualify with their own physician; unprescribed gifts are refunded.",
    path: "/gift",
    jsonLd: [
      webPageJsonLd({ name: "The Nexphoria Gift", description: "Gift the coverage of a physician-reviewed protocol or bloodwork panel.", path: "/gift" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gift", path: "/gift" }]),
      faqJsonLd(GIFT_FAQ),
    ],
  });

  const items = useMemo(() => allGiftItems(), []);

  // ?item=stack:glow&mode=request preselects (PDP "Gift this protocol" links)
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const [kind0, slug0] = (params.get("item") ?? "").split(":");
  const preselected = items.find((g) => g.kind === kind0 && g.slug === slug0) ?? null;

  const [mode, setMode] = useState<Mode>(params.get("mode") === "request" ? "request" : "give");
  const [sel, setSel] = useState<GiftItem | null>(preselected);
  const [termKey, setTermKey] = useState<string>(preselected?.terms[0]?.key ?? "3mo");
  const [fromName, setFromName] = useState("");
  const [copied, setCopied] = useState(false);

  const term = sel?.terms.find((t) => t.key === termKey) ?? sel?.terms[0] ?? null;

  const shareUrl = useMemo(() => {
    if (!sel || !term) return "";
    const base = (window as unknown as { __NX_APP_BASE__?: string }).__NX_APP_BASE__ ?? "";
    return `${window.location.origin}${base}/gift/claim?${encodeGiftAsk(sel.kind, sel.slug, term.key, fromName)}`;
  }, [sel, term, fromName]);

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      track("gift_link_copied", { item: sel?.slug, term: term?.key });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked — the visible URL below stays selectable */
    }
  };

  const choose = (g: GiftItem) => {
    setSel(g);
    setTermKey(g.terms[0]?.key ?? "3mo");
    track("gift_item_selected", { item: g.slug, kind: g.kind, mode });
  };

  const stacks = items.filter((g) => g.kind === "stack");
  const panels = items.filter((g) => g.kind === "panel");

  const itemCard = (g: GiftItem) => {
    const active = sel?.slug === g.slug && sel.kind === g.kind;
    const from = Math.min(...g.terms.map((t) => t.total));
    return (
      <button
        key={`${g.kind}-${g.slug}`}
        type="button"
        onClick={() => choose(g)}
        aria-pressed={active}
        data-testid={`gift-item-${g.slug}`}
        className="nx-glass-tile"
        style={{
          display: "flex", flexDirection: "column", textAlign: "left", cursor: "pointer",
          border: active ? "1.5px solid var(--nx-cobalt)" : undefined,
          background: active ? "var(--nx-cobalt-soft)" : undefined,
        }}
      >
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          {g.kind === "stack" ? "Protocol" : "Bloodwork"}
        </p>
        <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: 4, lineHeight: 1.12 }}>{g.name}</p>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: 6, flex: 1 }}>{g.tagline}</p>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: 10 }}>
          {g.terms.length > 1 ? `From ${usd(from)}` : usd(from)}
          <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · one-time</span>
        </p>
      </button>
    );
  };

  return (
    <SiteLayout navVariant="showcase">
      {/* ── HERO ── */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            The gift
          </p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "-0.018em", color: "var(--nx-fg)", maxWidth: "17ch", marginTop: "0.9rem" }}>
            Health you can <em style={{ color: "var(--nx-cobalt)" }}>actually give.</em>
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1.1rem" }}>
            One payment covers someone's protocol or bloodwork panel — their labs, their physician, their supply.
            They still qualify on their own: a licensed physician reviews their intake and can decline,
            and a gift that isn't prescribed is refunded. You cover the cost; medicine keeps its gate.
          </p>
          {/* mode switch */}
          <div role="group" aria-label="Give or request" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1.6rem" }}>
            {([["give", "Give a gift"], ["request", "Ask someone to cover mine"]] as [Mode, string][]).map(([m, label]) => (
              <button
                key={m}
                onClick={() => { setMode(m); track("gift_mode", { mode: m }); }}
                aria-pressed={mode === m}
                className="nx-filter-chip"
                data-testid={`gift-mode-${m}`}
                style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP 1 · CHOOSE ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "0" }} aria-labelledby="gift-choose-title">
        <h2 id="gift-choose-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
          {mode === "give" ? "1 · Choose what to give" : "1 · Choose what you're asking for"}
        </h2>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "0.4rem" }}>
          Real catalog prices — the same numbers as the pricing page. Physician-assessed protocols can't be pre-paid and aren't listed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 12, marginTop: "1.2rem" }}>
          {stacks.map(itemCard)}
        </div>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "1.6rem" }}>
          Or a bloodwork panel on its own
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "0.8rem" }}>
          {panels.map(itemCard)}
        </div>
      </section>

      {/* ── STEP 2 · TERM + SUMMARY / LINK ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="gift-term-title">
        <div className="nx-glass-tile" style={{ display: "block", padding: "clamp(1.4rem,3vw,2rem)", maxWidth: 860 }} data-testid="gift-summary">
          <h2 id="gift-term-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
            {sel ? `2 · ${sel.name}` : "2 · Pick a supply length"}
          </h2>
          {!sel && (
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "0.5rem" }}>
              Select a protocol or panel above to see its one-time price.
            </p>
          )}
          {sel && (
            <>
              {sel.terms.length > 1 && (
                <div role="group" aria-label="Supply length" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "0.9rem" }}>
                  {sel.terms.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTermKey(t.key)}
                      aria-pressed={termKey === t.key}
                      className="nx-filter-chip"
                      data-testid={`gift-term-${t.key}`}
                      style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginTop: "1rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }} data-testid="gift-total">
                {term ? usd(term.total) : ""}
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-muted)" }}> · one-time{sel.kind === "stack" ? ` · ${term?.label.toLowerCase()}` : ""}</span>
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.5rem" }}>
                Refunded, or applied to what their physician does prescribe, if this protocol isn't.
              </p>

              {mode === "give" ? (
                /* ── GIVE: payment capture is pending the payments backend —
                   route the giver to the concierge path honestly rather than
                   fake a checkout. */
                <div style={{ marginTop: "1.4rem", borderTop: "1px solid var(--nx-border)", paddingTop: "1.2rem" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", maxWidth: "58ch" }}>
                    Gift checkout is concierge for now: tell us who it's for and we arrange payment and
                    delivery by email — nothing is charged until you confirm with a person.
                  </p>
                  <a
                    href={`mailto:hello@nexphoria.com?subject=${encodeURIComponent(`Gift: ${sel.name} (${term?.label ?? ""})`)}&body=${encodeURIComponent(
                      `I'd like to gift ${sel.name} — ${term?.label ?? ""}, ${term ? usd(term.total) : ""} one-time.\n\nMy name:\nRecipient's first name:\nWhen should it arrive (date or "right away"):\nA note to include (optional):`,
                    )}`}
                    className="nx-cta-cobalt"
                    data-testid="gift-give-cta"
                    style={{ marginTop: "1rem", fontSize: "var(--nx-t-base)", padding: "13px 26px", display: "inline-flex" }}
                    onClick={() => track("gift_give_started", { item: sel.slug, term: term?.key })}
                  >
                    Arrange this gift
                  </a>
                </div>
              ) : (
                /* ── REQUEST: generate the share link ── */
                <div style={{ marginTop: "1.4rem", borderTop: "1px solid var(--nx-border)", paddingTop: "1.2rem" }}>
                  <label htmlFor="gift-from" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", display: "block" }}>
                    Your first name <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}>· shown to whoever opens the link</span>
                  </label>
                  <input
                    id="gift-from"
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    maxLength={24}
                    placeholder="Ava"
                    className="nx-input"
                    data-testid="gift-from-name"
                    style={{ maxWidth: 280, marginTop: "0.5rem" }}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: "1rem" }}>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="nx-cta-cobalt"
                      data-testid="gift-copy-link"
                      style={{ fontSize: "var(--nx-t-base)", padding: "13px 26px", display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer" }}
                    >
                      {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
                      {copied ? "Link copied" : "Copy your link"}
                    </button>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                      Send it however you like — text, email, anything.
                    </span>
                  </div>
                  <p
                    data-testid="gift-share-url"
                    style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.7rem", wordBreak: "break-all", userSelect: "all", background: "var(--nx-bg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-sm)", padding: "0.6rem 0.8rem", maxWidth: 640 }}
                  >
                    {shareUrl}
                  </p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.6rem", maxWidth: "58ch" }}>
                    The link carries only the protocol, the term, and the name above — no health information, ever.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS + PRIVACY ── */}
      <section className="nx-section" style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)" }} aria-label="How gifting works">
        <div className="nx-container">
          <p className="nx-eyebrow">How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 14, marginTop: "1.4rem" }}>
            {HOW.map(({ Icon, t, d }) => (
              <Reveal key={t}>
                <div className="nx-glass-card" style={{ padding: "1.7rem 1.5rem", height: "100%" }}>
                  <span className="nx-icon-circle" aria-hidden><Icon size={19} strokeWidth={1.9} /></span>
                  <h3 style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-body)", color: "var(--nx-fg)", marginTop: "0.8rem" }}>{t}</h3>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: "1.6rem", maxWidth: 720 }}>
            <ShieldCheck size={19} strokeWidth={1.9} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.6, color: "var(--nx-fg-graphite)" }}>
              <strong style={{ fontWeight: 600, color: "var(--nx-fg)" }}>Their results stay theirs.</strong>{" "}
              You'll know the gift was redeemed; the recipient's intake, bloodwork, and physician conversations never come to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)", maxWidth: 860 }} aria-label="Gift questions">
        <p className="nx-eyebrow">Questions, answered</p>
        <div style={{ marginTop: "1rem" }}>
          {GIFT_FAQ.map((f, i) => (
            <details key={f.q} className="nx-faq-item" open={i === 0}>
              <summary>{f.q}<span className="nx-faq-plus" aria-hidden /></summary>
              <p className="nx-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "1.6rem" }}>
          Prefer to browse first?{" "}
          <Link href="/stacks" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }}>
            See the protocols <ArrowRight size={14} aria-hidden />
          </Link>
        </p>
      </section>
    </SiteLayout>
  );
}
