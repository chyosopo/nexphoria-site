# NEXPHORIA — ANALYTICS EVENT MAP (E37)
*One choke-point: `client/src/lib/analytics.ts` → `track(event, props)`. Today it emits a
`nx:analytics` CustomEvent + console; when a vendor lands (PostHog/Plausible/Segment),
one edit inside `track()` lights up every call site. No PII in props — names/emails never leave the form.*

## The intake funnel
| Event | Fires when | Props | Call site |
|---|---|---|---|
| `intake_started` | Any "Begin your intake" entry | `source` | StartIntakeButton |
| `intake_cta` | Buy-box CTA (PDP rail or mobile bar) | `source: buybox`, `testId` | BuyBox |
| `goal_selected` | Assessment step 1 goal pick | `goal, category, protocol, step` | Assessment |
| `product_viewed` | PDP mount | `slug` | GoalVialTile / PDPs |
| `cadence_selected` | Buy-box tier tap | `cadence, product` | BuyBox |
| `checkout_step` | Checkout step advance (validated) | `step` (1=payment, 2=review) | Checkout |
| `checkout_submitted` | Intake order accepted by API | `id` | Checkout |

## Conversion definition (for the vendor, later)
`intake_started → goal_selected → checkout_step:1 → checkout_step:2 → checkout_submitted`
Drop-off between any adjacent pair is the funnel report.

## Rules
1. Event names are `snake_case`, past tense for completions, noun_verb for actions.
2. Props are coarse dimensions only (slugs, steps, cadences) — never free-text user input.
3. New events get a row here in the same PR that adds the call.
