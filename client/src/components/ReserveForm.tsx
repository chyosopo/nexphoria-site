/* A pending medicine or protocol (awaiting FDA rulemaking for compounding)
   is shown with its figure, and the only action is an email when it becomes
   available. No reservation, no locked price, no place in line (Chiya
   2026-09-04: the site informs; it does not persuade). Same lead sink as the
   footer (/api/waitlist), with the product in `source`. Degrades gracefully
   on a static host. */
import { useState } from "react";
import { Check } from "lucide-react";
import { F } from "@/lib/typography";
import { track } from "@/lib/analytics";

export function ReserveForm({ slug, kind, testId = "reserve" }: { slug: string; kind: "peptide" | "stack"; testId?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setState("invalid"); return; }
    setState("sending");
    track("reserve", { slug, kind });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val, source: `reserve:${kind}:${slug}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setEmail("");
    } catch {
      setState("err");
    }
  };

  if (state === "done") {
    return (
      <p className="nx-reserve__done" style={{ fontFamily: F }} data-testid={`${testId}-done`}>
        <Check size={15} strokeWidth={2.5} aria-hidden="true" /> Noted. One email when it is available. Nothing else.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="nx-reserve" data-testid={testId} noValidate>
      <label htmlFor={`${testId}-email`} className="sr-only">Email address</label>
      <input
        id={`${testId}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (state !== "idle") setState("idle"); }}
        className="nx-reserve__input"
        style={{ fontFamily: F }}
        aria-invalid={state === "invalid"}
        aria-describedby={`${testId}-note`}
      />
      <button type="submit" className="nx-cta-cobalt nx-reserve__btn" disabled={state === "sending"} data-testid={`${testId}-submit`}>
        {state === "sending" ? "Sending" : "Tell me when it is available"}
      </button>
      <p id={`${testId}-note`} className="nx-reserve__note" style={{ fontFamily: F }} aria-live="polite">
        {state === "invalid"
          ? "Please enter a valid email address."
          : state === "err"
            ? "That did not go through. Please try again in a moment."
            : "One email when it is available. A physician reviews every order before anything ships."}
      </p>
    </form>
  );
}
