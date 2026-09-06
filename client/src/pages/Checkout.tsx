/* JOB: capture the order for physician review; zero distractions.
   The card grammar (2026-09-05): every step is a tile with the numbered
   pill of the how-it-works tiles; the summary is one tile with the figure
   once. Headings are sentences, not caps labels. */
import { track } from "@/lib/analytics";
import { CONDITIONAL } from "@/components/RegulatoryDisclosure";
import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Shield, Stethoscope, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { isGLP1Excluded, getStack, GLP1_STATE_EXCLUSIONS } from "@/data/stacksCatalog";
import { getSolo } from "@/data/soloCatalog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { F, S } from "@/lib/typography";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PayToday } from "@/components/PayToday";
import { PhysicianGate } from "@/components/PhysicianProofBand";
import { LineArt, lineTermLine, lineTypeLabel } from "@/components/CartLineCard";

/* Local form schema — server validates on submit via insertCheckoutSchema.
   DO NOT change these fields — checkout schema is locked. */
const formSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  age: z.coerce.number().int().min(18, "Must be 18+").max(110),
  /* coerce, not z.boolean(): react-hook-form can hand a checkbox's value
     back as "on"/"" rather than a strict boolean, which silently failed the
     old z.boolean() and blocked submit the moment any screening box was
     touched. Output type is still boolean — the server contract is unchanged. */
  cardiacHistory: z.coerce.boolean(),
  diabetic: z.coerce.boolean(),
  hormonalRx: z.coerce.boolean(),
  allergies: z.string().optional(),
  shippingAddress: z.string().min(4, "Enter your shipping address"),
  city: z.string().min(1, "City required"),
  state: z.string().length(2, "Use 2-letter state code"),
  zip: z.string().min(5, "Enter a valid zip").max(10),
});
type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Contact and shipping", "Billing", "Medical details"] as const;

/* The four beats after the order, in one place. The page has two end
   states — the order submitted, and the card payment returned — and each
   carried its own hand-written version of this list, so the same four
   steps reached the reader in two different wordings. The paid state also
   rendered them without the numbered chip .nx-beats lays out, which put
   the text in the 24px number column. */
const WHAT_HAPPENS_NEXT = [
  "A licensed physician reads your answers and decides",
  "You hear by email either way",
  "If prescribed, a licensed 503A pharmacy compounds it to order",
  "It ships cold, with the blood kit you draw before the first dose",
] as const;

/* PayToday is the house block for the figure; inside the summary tile it
   sits flush so the tile stays one card. */
const FLUSH: React.CSSProperties = { background: "transparent", border: 0, padding: 0 };

export default function Checkout() {
  // Checkout is a private transactional page — noindex (centralized in useSeo).
  // Breadcrumb (Home → Cart → Checkout) records the real navigational trail.
  useSeo({
    title: "Checkout",
    description: "Submit your information for physician review. A licensed physician reviews every order before anything is dispensed.",
    path: "/checkout",
    noindex: true,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cart", path: "/cart" }, { name: "Checkout", path: "/checkout" }])],
  });
  const { lines, subtotal, itemCount, clear, dueToday } = useCart();

  /* ─── GLP-1 state gate (defense-in-depth: PDPs already gate; this enforces at checkout) ─── */
  /* The GLP-1 state block reads the medicine's OWN state exclusions.
     It used to read `gated`, which was true of the GLP-1 solos only while
     they were physician-assessed; when the catalog went live on 2026-09-06
     every solo became ungated, so this went quietly false and a reader in
     AK, AR, IN, MI, MN or SC could check out compounded semaglutide. The
     exclusions are a legal fact about the medicine, not about how it was
     sold, and soloCatalog carries them per entry. */
  const cartHasGLP1 = lines.some(
    (l) => (getSolo(l.slug)?.stateExclusions?.length ?? 0) > 0 || (getStack(l.slug)?.stateExclusions?.length ?? 0) > 0,
  );

  const { toast } = useToast();
  const [submittedId, setSubmittedId] = useState<number | null>(null);

  /* ── The return from Stripe ──────────────────────────────────────────
     functions/api/checkout-session.ts sends the reader to hosted Stripe
     Checkout and asks it to return them here with ?paid=1&session_id=…
     Without this, a completed payment landed back on an empty form and the
     reader saw NOTHING confirming they had paid — the worst outcome a
     checkout can produce. The cart is cleared once, on arrival. */
  const search = useSearch();
  const paid = new URLSearchParams(search).get("paid") === "1";
  const paidSession = new URLSearchParams(search).get("session_id") || "";
  const clearedRef = useRef(false);
  useEffect(() => {
    if (!paid || clearedRef.current) return;
    clearedRef.current = true;
    track("checkout_paid", { session: paidSession ? "yes" : "unknown" });
    clear();
  }, [paid, paidSession, clear]);
  const [step, setStep] = useState(0); // 0 contact + shipping, 1 billing, 2 health questions + confirm

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      age: 30,
      cardiacHistory: false,
      diabetic: false,
      hormonalRx: false,
      allergies: "",
      shippingAddress: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      /* Staging behavior pending Bask/MDI wiring: the static production host
         has no /api server, so capture can fail. When it does, we FAIL
         HONESTLY — no fabricated confirmation number, no false "with our
         physician team" promise — and hand the user a working path
         (retry / concierge email). Health answers are never persisted
         client-side (PHI stays out of the repo and its storage). */
      /* ── 1 · PAYMENT ──────────────────────────────────────────────────
         /api/checkout-session is the Cloudflare Pages Function that creates
         a Stripe Checkout Session (functions/api/checkout-session.ts). It is
         handed WHAT is being bought — slug, term, quantity — and never the
         price: every amount is looked up server-side from the generated
         manifest, so a browser cannot name its own total.
         PHI LAW: the cart lines go to Stripe. The medical answers in
         `values` DO NOT, and must never be added to this call. */
      const pay = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          items: lines.map((l) => ({ type: l.type, slug: l.slug, cadence: l.cadence, qty: l.qty })),
        }),
      });
      if (pay.ok) {
        const { url } = (await pay.json()) as { url?: string };
        if (url) {
          track("checkout_payment_redirect", { lines: lines.length });
          window.location.assign(url); // hosted Stripe Checkout takes it from here
          return { ok: true, id: 0, message: "redirecting" };
        }
      }
      /* Payments not switched on for this environment (503), or Stripe
         refused. Fall through to the intake capture below rather than
         inventing a confirmation — the reader gets a working path either
         way, and the failure is visible instead of silent. */
      const why = pay.status === 503 ? "payments_not_configured" : `stripe_${pay.status}`;
      track("checkout_payment_unavailable", { why });

      /* ── 2 · INTAKE CAPTURE (fallback) ─────────────────────────────── */
      return await apiRequest<{ ok: boolean; id: number; message: string }>("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          age: Number(values.age),
          state: values.state.toUpperCase(),
          allergies: values.allergies || null,
          cartJson: JSON.stringify(lines.map((l) => ({ slug: l.slug, type: l.type, qty: l.qty }))),
          subtotal,
        }),
      });
    },
    onSuccess: (data) => {
      if (data.message === "redirecting") return; // the browser is leaving for Stripe
      setSubmittedId(data.id);
      track("checkout_submitted", { id: data.id });
      queryClient.invalidateQueries({ queryKey: ["/api/checkout"] });
      clear();
      toast({ title: "Submitted for physician review", description: "We'll be in touch upon review." });
    },
    onError: () => {
      track("checkout_capture_unavailable", {});
      toast({
        title: "We could not submit your intake",
        description: "The answers stayed on this page. Try again, or email hello@nexphoria.com and a person will finish it.",
        variant: "destructive",
      });
    },
  });

  const enteredState = form.watch("state") || "";
  const glp1Blocked = cartHasGLP1 && enteredState.length === 2 && isGLP1Excluded(enteredState);

  const onSubmit = (values: FormValues) => {
    if (glp1Blocked) return; // hard stop — server will also validate
    mutation.mutate(values);
  };

  /* Advance the step indicator after validating the current step's fields */
  const goNext = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 0) fields = ["name", "email", "age", "shippingAddress", "city", "state", "zip"];
    const ok = fields.length ? await form.trigger(fields) : true;
    if (ok && step === 0 && glp1Blocked) return; // notice below the address explains why
    if (ok) setStep((s) => { const n = Math.min(s + 1, 2); track("checkout_step", { step: n }); return n; });
  };

  const terms = lines.filter((l) => !l.oneTime).map((l) => `${l.months} ${l.months === 1 ? "month" : "months"} of ${l.name}`).join(" · ");

  /* ─── Paid: the return from hosted Stripe Checkout ─── */
  if (paid) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: "clamp(1.5rem, 5vh, 3rem)" }}>
          <div className="nx-container py-[var(--nx-sp-sec)] max-w-2xl">
            <div className="text-center">
              <div className="inline-flex p-5 rounded-full mb-6" style={{ background: "var(--nx-cobalt-soft)", color: "var(--nx-success)" }} aria-hidden="true">
                <Check size={32} strokeWidth={1.5} />
              </div>
              <h1 className="nx-cartpage__h1" style={{ fontFamily: S, margin: "0 auto" }}>
                Payment received. A physician reviews it next.
              </h1>
              <p className="nx-cartpage__lede" style={{ fontFamily: F, margin: "1rem auto 0" }}>
                A licensed U.S. physician now reviews the order. If it is appropriate, the medicine is compounded to
                order and ships cold with your blood kit. If it is not, nothing is made and the refund policy applies.
              </p>
              {paidSession && (
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1rem" }} data-testid="checkout-paid-ref">
                  Your reference: {paidSession.replace(/[^A-Za-z0-9]+/g, "").slice(-12)}
                </p>
              )}
              <div className="nx-steptile text-left max-w-md mx-auto" style={{ marginTop: "2rem" }}>
                <span className="nx-steptile__n" style={{ fontFamily: F }} aria-hidden="true">Next</span>
                <h2 className="nx-steptile__t" style={{ fontFamily: S }}>What happens next.</h2>
                <ol className="nx-beats" style={{ marginTop: "1rem" }}>
                  {WHAT_HAPPENS_NEXT.map((t, i) => (
                    <li key={t}><i>{i + 1}</i><span style={{ fontFamily: F }}>{t}</span></li>
                  ))}
                </ol>
              </div>
              <div style={{ marginTop: "2rem", display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/how-it-works" className="nx-cta-cobalt" style={{ fontFamily: F, fontWeight: 600 }}>See how it works</Link>
                <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }}>Back to the medicines</Link>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.6rem" }}>
                Questions: <a href="mailto:hello@nexphoria.com" className="nx-text-link">hello@nexphoria.com</a>
              </p>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ─── Success screen (intake-complete confirmation) ─── */
  if (submittedId !== null) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
          <div className="nx-container py-[var(--nx-sp-sec)] max-w-2xl">
            <div className="text-center">
              <div className="inline-flex p-5 rounded-full mb-6" style={{ background: "var(--nx-cobalt-soft)", color: "var(--nx-success)" }} aria-hidden="true">
                <Check size={32} strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-fg-graphite)", margin: "0 0 .8rem" }}>
                Submission #{submittedId.toString().padStart(5, "0")}
              </p>
              <h1 className="nx-cartpage__h1" style={{ fontFamily: S, margin: "0 auto" }}>
                Your intake is complete.
              </h1>
              <p className="nx-cartpage__lede" style={{ fontFamily: F, margin: "1rem auto 0" }}>
                The order and the health answers are now with the physician team. An email follows from a licensed
                physician with either an approval and final payment link or a request for additional information.
              </p>

              {/* Progress: complete */}
              <div className="max-w-md mx-auto mt-8 mb-8">
                <StepBar current={3} labels={[...STEPS, "Physician"]} />
              </div>

              <div className="nx-steptile text-left max-w-md mx-auto mb-8">
                <span className="nx-steptile__n" style={{ fontFamily: F }} aria-hidden="true">Next</span>
                <h2 className="nx-steptile__t" style={{ fontFamily: S }}>What happens next.</h2>
                <ol className="nx-beats" style={{ marginTop: "1rem" }}>
                  {WHAT_HAPPENS_NEXT.map((t, i) => (
                    <li key={t}><i>{i + 1}</i><span style={{ fontFamily: F }}>{t}</span></li>
                  ))}
                </ol>
                <Link href="/how-it-works" className="nx-text-link" data-testid="checkout-timeline-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem" }}>
                  See the full timeline
                </Link>
              </div>
              <Link href="/" className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="link-back-home">
                <ArrowLeft size={14} aria-hidden="true" /> Back to Nexphoria
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ─── Empty cart guard ─── */
  if (lines.length === 0) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
          <div className="nx-container py-20 max-w-md text-center">
            <h1 className="nx-cartpage__h1" style={{ fontFamily: S, margin: "0 auto" }}>
              Your cart is empty.
            </h1>
            <p className="nx-cartpage__lede" style={{ fontFamily: F, margin: "1rem auto 1.4rem" }}>
              Add a medicine or a protocol before checkout.
            </p>
            <Link href="/peptides" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="link-empty-checkout-stacks">
              Browse every medicine
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ─── Form ─── */
  const errors = form.formState.errors;

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh" }}>
        {/* the header is sticky and in flow: the page starts one breath below it */}
        <div className="nx-container nx-section-y" style={{ paddingTop: "clamp(2rem, 4vw, 3rem)" }}>
          {/* Back to the cart */}
          <Link href="/cart" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginBottom: "1.2rem" }} data-testid="link-back-to-cart">
            <ArrowLeft size={14} aria-hidden="true" /> Back to the cart
          </Link>

          {/* Header + progress indicator */}
          <Reveal>
            <div style={{ marginTop: "1.2rem", maxWidth: "42rem" }}>
              <h1 className="nx-cartpage__h1" style={{ fontFamily: S }} data-testid="checkout-title">
                Where it ships, and how you pay.
              </h1>
              <p className="nx-cartpage__lede" style={{ fontFamily: F }}>
                A licensed U.S. physician reviews the order. If it is appropriate, the medicine is compounded and ships cold.
              </p>
              <PrescribedPromise testid="checkout-promise" style={{ marginTop: "0.8rem" }} />
              <PhysicianGate testid="checkout-physician-gate" style={{ marginTop: "0.75rem" }} />
            </div>
          </Reveal>

          <div style={{ margin: "1.6rem 0 0", maxWidth: "42rem" }}>
            <StepBar current={step} labels={[...STEPS]} onStep={(i) => i < step && setStep(i)} />
          </div>

          <div className="nx-cartgrid">
            {/* Mobile-only compact order summary — the full rail stacks BELOW
                the form on phones, so shoppers reached Continue without ever
                seeing what they were submitting. Native <details>, collapsed. */}
            <details className="lg:hidden nx-mobilesummary" data-testid="checkout-mobile-summary">
              <summary style={{ fontFamily: F }}>
                <span>Your order · {itemCount} {itemCount === 1 ? "item" : "items"}</span>
                <span>{formatUSD(dueToday)} <small>today</small></span>
              </summary>
              <div>
                <ul className="nx-summary__lines">
                  {lines.map((line) => <SummaryLine key={`m-${line.type}-${line.slug}`} line={line} />)}
                </ul>
              </div>
            </details>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="nx-steps-col">
              {/* STAGE 1 — contact, then shipping */}
              {step === 0 && (
                <>
                  <StepTile n="01" title="Who this is for." lead="The name on the order, the email the physician writes to, and your age.">
                    <div className="nx-fields-2">
                      <Field label="Full name" error={errors.name?.message}>
                        <input {...form.register("name")} type="text" className="nx-input" data-testid="input-name" autoComplete="name" />
                      </Field>
                      <Field label="Email" error={errors.email?.message}>
                        <input {...form.register("email")} type="email" className="nx-input" data-testid="input-email" autoComplete="email" />
                      </Field>
                    </div>
                    <Field label="Age" error={errors.age?.message}>
                      <input {...form.register("age", { valueAsNumber: true })} type="number" min={18} max={110} className="nx-input max-w-[120px]" data-testid="input-age" />
                    </Field>
                  </StepTile>

                  <StepTile n="02" title="Where it ships." lead={`Shipped cold to all 50 states once a physician approves the order. GLP-1 protocols are not available in ${GLP1_STATE_EXCLUSIONS.join(", ")}.`}>
                    <Field label="Street address" error={errors.shippingAddress?.message}>
                      <input {...form.register("shippingAddress")} type="text" className="nx-input" data-testid="input-address" autoComplete="street-address" />
                    </Field>
                    {/* City spans the row on phones so State and ZIP pair up */}
                    <div className="nx-fields-addr">
                      <Field label="City" error={errors.city?.message}>
                        <input {...form.register("city")} type="text" className="nx-input" data-testid="input-city" autoComplete="address-level2" />
                      </Field>
                      <Field label="State" error={errors.state?.message}>
                        <input {...form.register("state")} type="text" maxLength={2} placeholder="NY" className="nx-input uppercase" data-testid="input-state" autoComplete="address-level1" />
                      </Field>
                      <Field label="ZIP" error={errors.zip?.message}>
                        <input {...form.register("zip")} type="text" className="nx-input" data-testid="input-zip" autoComplete="postal-code" />
                      </Field>
                    </div>
                    {glp1Blocked && (
                      <div role="alert" data-testid="notice-glp1-state" className="nx-note">
                        <p><strong>Not available in {enteredState.toUpperCase()}.</strong></p>
                        <p style={{ marginTop: ".3rem" }}>
                          One or more items in the order involve GLP-1 therapy, which we do not currently
                          offer in your state. Remove those items to continue, or{" "}
                          <Link href="/contact" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
                            contact our clinical team
                          </Link>{" "}
                          about alternatives.
                        </p>
                      </div>
                    )}
                  </StepTile>

                  <div className="nx-stepnav">
                    <PrimaryBtn onClick={goNext} testId="button-step-payment">Continue to billing <ArrowRight size={14} aria-hidden="true" /></PrimaryBtn>
                  </div>
                </>
              )}

              {/* STAGE 2 — billing (deferred: no card is collected until a physician approves) */}
              {step === 1 && (
                <>
                  <StepTile n="03" title="How billing works." lead="Billing runs through Bask Health, our telehealth billing partner. The card details are entered there.">
                    <div className="nx-note" style={{ display: "flex", gap: ".8rem", alignItems: "flex-start" }} data-testid="notice-deferred-billing">
                      <Stethoscope size={16} style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                      <div>
                        <p><strong>A physician decides before anything is made.</strong></p>
                        <p style={{ marginTop: ".3rem" }}>
                          The price is complete: one number a month, with the physician's review, the medicine, cold shipping and the week-12
                          blood test within it. If the physician declines, the refund policy sets out what is refunded.
                        </p>
                      </div>
                    </div>

                    <ol className="nx-beats" aria-label="How billing works">
                      {[
                        "Check out at the price shown. One number a month.",
                        "Answer the questionnaire. Two minutes.",
                        "A U.S. licensed doctor reads every answer and decides.",
                        "If prescribed, the medicine is made to order and ships cold. If not, the refund policy applies.",
                      ].map((t, i) => (
                        <li key={i}><i>{i + 1}</i><span>{t}</span></li>
                      ))}
                    </ol>

                    {/* The gift door, where it matters most: the person at the
                        price who won't be the one paying it. Quiet, one line. */}
                    <div className="nx-note nx-note--row" data-testid="checkout-gift-door">
                      <p style={{ maxWidth: "48ch" }}>
                        <strong>Someone else covering this?</strong>{" "}
                        One payment on their side; their results stay theirs.
                      </p>
                      <Link href="/gift?mode=request" className="nx-text-link" data-testid="checkout-gift-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                        Create the link
                      </Link>
                    </div>
                  </StepTile>

                  <div className="nx-stepnav">
                    <GhostBtn onClick={() => setStep(0)} testId="button-step-back-address"><ArrowLeft size={14} aria-hidden="true" /> Back</GhostBtn>
                    <PrimaryBtn onClick={() => setStep(2)} testId="button-step-review">Continue to the medical details <ArrowRight size={14} aria-hidden="true" /></PrimaryBtn>
                  </div>
                </>
              )}

              {/* STAGE 3 — the medical details, then confirm */}
              {step === 2 && (
                <>
                  <StepTile n="04" title="A few medical details." lead="Answer plainly. A physician reads every answer, and the answers are encrypted in transit.">
                    <div style={{ display: "grid", gap: ".6rem" }}>
                      <YesNoField
                        label="History of cardiac events, stroke, or untreated hypertension"
                        helper="Includes prior MI, stent, arrhythmia under treatment, or BP > 160/100 untreated."
                        {...form.register("cardiacHistory")}
                        testId="checkbox-cardiac"
                      />
                      <YesNoField
                        label="Type 1 or 2 diabetes (currently treated)"
                        helper="Includes insulin, metformin, GLP-1 agonist, or SGLT2 inhibitor."
                        {...form.register("diabetic")}
                        testId="checkbox-diabetic"
                      />
                      <YesNoField
                        label="Currently taking hormonal medication"
                        helper="HRT, TRT, oral contraceptives, thyroid hormone, or active oncology Rx."
                        {...form.register("hormonalRx")}
                        testId="checkbox-hormonal"
                      />
                    </div>
                    <Field label="Known allergies" helper="Optional: preservatives, latex, peptide-class reactions, or N/A" error={errors.allergies?.message}>
                      <input {...form.register("allergies")} type="text" placeholder="None known" className="nx-input" data-testid="input-allergies" />
                    </Field>
                  </StepTile>

                  <StepTile n="05" title="Confirm the order." lead="What goes to the physician with the answers.">
                    <ul className="nx-summary__lines" data-testid="checkout-confirm-lines">
                      {lines.map((line) => <SummaryLine key={`c-${line.type}-${line.slug}`} line={line} />)}
                    </ul>
                    <div className="nx-drawer__figure" style={{ paddingTop: "1rem", borderTop: "1px solid var(--nx-border)" }}>
                      <span style={{ fontFamily: F }}><b>Today, for the whole term</b>{formatUSD(subtotal)} a month</span>
                      <strong style={{ fontFamily: S }}>{formatUSD(dueToday)}</strong>
                    </div>

                    <div className="nx-stepnav">
                      <GhostBtn onClick={() => setStep(1)} testId="button-step-back-payment"><ArrowLeft size={14} aria-hidden="true" /> Back</GhostBtn>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="nx-cta-cobalt disabled:opacity-60"
                        style={{ fontFamily: F }}
                        data-testid="button-submit-checkout"
                      >
                        {mutation.isPending ? "Submitting…" : "Submit for physician review"}
                      </button>
                    </div>
                    <p className="nx-summary__fine" style={{ fontFamily: F, maxWidth: "52ch" }}>
                      By submitting, you consent to review by a licensed physician. Billing runs through Bask Health, and the refund policy sets out what is refunded if the physician declines.
                    </p>
                    {(() => {
                      const errored = Object.keys(errors);
                      if (errored.length === 0) return null;
                      // Route the fix-it note to the stage that actually has the error.
                      const FIELD_STEP: Record<string, number> = {
                        name: 0, email: 0, shippingAddress: 0, city: 0, state: 0, zip: 0,
                        age: 0, cardiacHistory: 2, diabetic: 2, hormonalRx: 2, allergies: 2,
                      };
                      const badStep = Math.min(...errored.map((f) => FIELD_STEP[f] ?? 0));
                      const count = errored.length;
                      return (
                        <button
                          type="button"
                          onClick={() => setStep(badStep)}
                          className="nx-note"
                          style={{ display: "block", width: "100%", textAlign: "left", cursor: "pointer", background: "var(--nx-cobalt-soft)", color: "var(--nx-cobalt-hover)" }}
                          data-testid="text-form-errors"
                        >
                          {count === 1 ? "One field needs" : `${count} fields need`} attention in {STEPS[badStep]}. Tap to review.
                        </button>
                      );
                    })()}
                  </StepTile>
                </>
              )}
            </form>

            {/* The summary: one tile, the figure once (PayToday states it). */}
            <Reveal delay={80}>
              <aside className="nx-summary" aria-label="Your order" data-testid="checkout-summary">
                <h2 className="nx-summary__h" style={{ fontFamily: S }}>Your order.</h2>
                <ul className="nx-summary__lines">
                  {lines.map((line) => <SummaryLine key={`${line.type}-${line.slug}`} line={line} />)}
                </ul>
                <div className="nx-summary__rule" />
                <PayToday amount={formatUSD(subtotal)} dueToday={formatUSD(dueToday)} terms={terms} testid="checkout-pay-today" style={FLUSH} />
                <div className="nx-summary__rule" />
                <ul className="nx-summary__rows" aria-label="The facts">
                  <li style={{ fontFamily: F }}><Stethoscope size={13} aria-hidden="true" /> A U.S. licensed doctor reviews every order</li>
                  <li style={{ fontFamily: F }}><Shield size={13} aria-hidden="true" /> Encrypted in transit</li>
                  <li style={{ fontFamily: F }}><Truck size={13} aria-hidden="true" /> Cold shipping, plain packaging</li>
                  <li style={{ fontFamily: F }}><Check size={13} aria-hidden="true" /> {CONDITIONAL.chargeCondition}</li>
                  <li style={{ fontFamily: F }}><Shield size={13} aria-hidden="true" /> 503A-licensed US compounding pharmacy</li>
                </ul>
                <p className="nx-summary__fine" style={{ fontFamily: F }}>Billing is handled by Bask Health, our telehealth billing partner. Prescription only. A licensed physician decides, and can decline.</p>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

/* ─── UI helpers ─── */

/** One line of the order, as it reads in the summaries: the thumb, the
    name, the plan in words, the monthly price. */
function SummaryLine({ line }: { line: ReturnType<typeof useCart>["lines"][number] }) {
  return (
    <li className="nx-summary__line" data-testid={`checkout-line-${line.type}-${line.slug}`}>
      <div className="nx-summary__thumb" aria-hidden="true"><LineArt line={line} /></div>
      <div style={{ minWidth: 0 }}>
        <strong style={{ fontFamily: F }}>{line.name}</strong>
        <small style={{ fontFamily: F }}>{lineTypeLabel(line.type)} · qty {line.qty} · {lineTermLine(line)}</small>
      </div>
      <em style={{ fontFamily: F }}>{line.complimentary ? "Included" : `${formatUSD(line.lineTotal)}${line.oneTime ? "" : "/mo"}`}</em>
    </li>
  );
}

function StepBar({ current, labels, onStep }: { current: number; labels: readonly string[]; onStep?: (i: number) => void }) {
  return (
    <ol className="nx-stepbar" aria-label="The steps">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = !!onStep && done;
        return (
          <li key={label}>
            <button
              type="button"
              onClick={() => clickable && onStep?.(i)}
              className={active ? "is-now" : done ? (clickable ? "is-done is-link" : "is-done") : undefined}
              style={{ fontFamily: F }}
              data-testid={`button-step-indicator-${i}`}
              aria-current={active ? "step" : undefined}
            >
              <i aria-hidden="true">{done ? <Check size={13} /> : i + 1}</i>
              <span>{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function PrimaryBtn({ children, onClick, testId }: { children: React.ReactNode; onClick: () => void; testId: string }) {
  return (
    <button type="button" onClick={onClick} className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid={testId}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, testId }: { children: React.ReactNode; onClick: () => void; testId: string }) {
  return (
    <button type="button" onClick={onClick} className="nx-cta-ghost" style={{ fontFamily: F }} data-testid={testId}>
      {children}
    </button>
  );
}

/** A step, as a tile: the numbered pill, the sentence, one line, the fields. */
function StepTile({ n, title, lead, children }: { n: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="nx-steptile" aria-label={title} data-testid={`checkout-step-${n}`}>
        <span className="nx-steptile__n" style={{ fontFamily: F }} aria-hidden="true">{n}</span>
        <h2 className="nx-steptile__t" style={{ fontFamily: S }}>{title}</h2>
        {lead ? <p className="nx-steptile__b" style={{ fontFamily: F }}>{lead}</p> : null}
        <div className="nx-steptile__body">{children}</div>
      </section>
    </Reveal>
  );
}

function Field({ label, helper, error, children }: { label: string; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className={error ? "nx-field nx-field-error" : "nx-field"}>
      <span className="nx-field__l" style={{ fontFamily: F }}>{label}</span>
      {helper ? <span className="nx-field__h" style={{ fontFamily: F }}>{helper}</span> : null}
      {children}
      {error ? <span role="alert" className="nx-field__e" style={{ fontFamily: F }}>{error}</span> : null}
    </label>
  );
}

// React Hook Form `register` returns a non-React ref; spread it normally
const YesNoField = ({
  label,
  helper,
  testId,
  ...rest
}: {
  label: string;
  helper?: string;
  testId: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="nx-yesno">
      <input type="checkbox" data-testid={testId} {...rest} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <strong style={{ fontFamily: F }}>{label}</strong>
        {helper ? <span style={{ fontFamily: F }}>{helper}</span> : null}
      </div>
    </label>
  );
};
