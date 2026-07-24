import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ExitIntentModal — fires ONCE per session when the pointer leaves toward the
 * top of the viewport (classic exit-intent trigger). Captures the visitor's
 * email into /api/waitlist as a "last-chance" lead. Suppressed on mobile
 * (unreliable trigger) and on the Assessment / Gate routes (where the user is
 * already deep in-funnel).
 */

const SEEN_KEY_MEMORY: { seen: boolean } = { seen: false };

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches || "ontouchstart" in window;
}

function currentPath() {
  if (typeof window === "undefined") return "/";
  return window.location.hash.replace(/^#/, "") || "/";
}

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  // "invalid" (malformed email) vs "err" (our endpoint failed) — distinct
  // failures, distinct messages (a valid email against a down API was being
  // told "enter a valid email").
  const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "err">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isMobile()) return;
    if (SEEN_KEY_MEMORY.seen) return;
    const path = currentPath();
    if (path.startsWith("/assessment") || path === "/") return;

    const onMouseOut = (e: MouseEvent) => {
      if (SEEN_KEY_MEMORY.seen) return;
      // Trigger only if cursor exits upward through the top edge
      if (e.clientY <= 0 && e.relatedTarget === null) {
        SEEN_KEY_MEMORY.seen = true;
        setOpen(true);
      }
    };

    // Give the visitor a moment before arming
    const armTimer = setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
    }, 15000);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  const submit = async () => {
    const val = email.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(val)) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val, source: `exit-intent:${currentPath()}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("err");
    }
  };

  const close = () => setOpen(false);

  // On open: remember what had focus, move focus into the dialog. On close:
  // restore focus to the trigger context (WCAG 2.4.3 focus order).
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      'input, button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the dialog (manual focus trap, no deps).
  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
      'input:not([disabled]), button:not([disabled]), [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!nodes || nodes.length === 0) return;
    const items = Array.from(nodes);
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement as HTMLElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: "var(--nx-z-overlay)" as unknown as number,
              backgroundColor: "rgba(21, 24, 28,0.55)",
              backdropFilter: "blur(4px)",
            }}
            data-testid="exit-intent-backdrop"
          />
          <motion.div
            key="exit-modal"
            ref={panelRef}
            onKeyDown={onDialogKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "var(--nx-z-modal)" as unknown as number,
              width: "min(460px, calc(100vw - 32px))",
              backgroundColor: "var(--nx-bg-cream, var(--nx-ceramic))",
              borderRadius: "var(--nx-r-xs)",
              boxShadow: "0 40px 80px -20px rgba(21, 24, 28,0.35)",
              padding: "36px 32px 28px",
              border: "1px solid var(--nx-border)",
            }}
            data-testid="exit-intent-modal"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              data-testid="exit-intent-close"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "var(--nx-fg-muted)",
                fontSize: "var(--nx-t-lg)",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-wide)",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: 14,
              }}
            >
              Before you go
            </p>

            <h2
              id="exit-intent-title"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "var(--nx-t-h3)",
                lineHeight: 1.15,
                color: "var(--nx-fg)",
                marginBottom: 10,
              }}
            >
              Save your spot on the pharmacy list.
            </h2>

            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-base)",
                color: "var(--nx-fg-muted)",
                lineHeight: 1.55,
                marginBottom: 20,
              }}
            >
              We&rsquo;ll email you when your peptide protocol is ready to prescribe.
              Physician-reviewed, state-licensed compounding, no commitment.
            </p>

            {state === "done" ? (
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--nx-r-2xs)",
                  backgroundColor: "rgba(152, 182, 213, 0.18)",
                  border: "1px solid var(--nx-acid, var(--nx-acid))",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-base)",
                  color: "var(--nx-fg)",
                }}
                data-testid="exit-intent-success"
              >
                You&rsquo;re on the list. Check your inbox for what happens next.
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "err" || state === "invalid") setState("idle");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submit();
                    }}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-1"
                    data-testid="exit-intent-email"
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--nx-r-2xs)",
                      border: state === "err" || state === "invalid" ? "1px solid var(--nx-danger)" : "1px solid var(--nx-border)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-base)",
                      backgroundColor: "var(--nx-ceramic)",
                      color: "var(--nx-fg)",
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={submit}
                    disabled={state === "sending"}
                    data-testid="exit-intent-submit"
                    style={{
                      padding: "0 1.25rem",
                      borderRadius: "var(--nx-r-2xs)",
                      border: "none",
                      backgroundColor: "var(--nx-fg)",
                      color: "var(--nx-bg-cream, var(--nx-ceramic))",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 600,
                      letterSpacing: "var(--nx-ls-caps)",
                      textTransform: "uppercase",
                      cursor: state === "sending" ? "wait" : "pointer",
                      opacity: state === "sending" ? 0.7 : 1,
                    }}
                  >
                    {state === "sending" ? "…" : "Notify me"}
                  </button>
                </div>
                {(state === "err" || state === "invalid") && (
                  <p
                    style={{
                      marginTop: 8,
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-xs)",
                      color: "var(--nx-danger)",
                    }}
                    role="alert"
                  >
                    {state === "invalid"
                      ? "Please enter a valid email."
                      : "We couldn't save that just now — email hello@nexphoria.com and we'll add you by hand."}
                  </p>
                )}
                <p
                  style={{
                    marginTop: 14,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-xs)",
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  Written sparingly. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
