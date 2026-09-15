/* ═══ The four feature blocks (2026-09-15) ═══
   openloophealth.com stacks two-column blocks, alternating sides: an icon
   square, a caps eyebrow, a bold headline with one italic phrase, a
   paragraph, a pill; beside it a dark panel with a drawn screen inside.
   Ours are the four facts of the care: the physician, the blood panel,
   the pharmacy, the person who answers. Each screen is drawn from the
   house pieces: the physician photograph, our own vial render, the panel's
   real marker count and retest week. */
import { Link } from "wouter";
import { ArrowRight, Check, Stethoscope, Droplets, FlaskConical, MessageCircle, Snowflake, Video } from "lucide-react";
import { F } from "@/lib/typography";
import { SKU_PHOTO_600 } from "@/components/SkuPhoto";
import physician from "@/assets/hero-physician.webp";
import careTeam from "@/assets/doctors/dr-reyes.webp";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

function Block({ id, flip, Icon, eyebrow, lead, grad, body, href, cta, testId, children }: {
  id: string; flip?: boolean; Icon: typeof Stethoscope; eyebrow: string; lead: string; grad: string; body: string; href: string; cta: string; testId: string; children: React.ReactNode;
}) {
  return (
    <div className={`nx-oltwo${flip ? " nx-oltwo--flip" : ""}`} aria-labelledby={id} role="group">
      <div>
        <span className="nx-olicon" aria-hidden="true"><Icon strokeWidth={2} /></span>
        <p className="nx-eyebrow">{eyebrow}</p>
        <h3 id={id} className="nx-oltwo__h2">{lead} <span className="nx-grad">{grad}</span></h3>
        <p className="nx-oltwo__p" style={{ fontFamily: F }}>{body}</p>
        <Link href={href} className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid={testId}>{cta} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
      <div className="nx-olpanel" aria-hidden="true">
        <div className="nx-olscreen" style={{ fontFamily: F }}>{children}</div>
      </div>
    </div>
  );
}

export function FeatureBlocks() {
  return (
    <section className="nx-container nx-sec" aria-label="How the care is built" data-testid="frontdoor-features">
      <div className="nx-olfeats">
        <Block id="fd-f-physician" Icon={Stethoscope} eyebrow="The physician" lead="A licensed physician" grad="reads every order." href="/how-it-works" cta="How it works" testId="frontdoor-feature-physician"
          body="A U.S.-licensed physician reviews your health history and your goal, prescribes if it is appropriate, and reviews every dose change after that. The visit happens online, from your phone.">
          <div className="nx-olscreen__bar"><span className="nx-olscreen__ico"><Video /></span> Your visit <em>Online</em></div>
          <div className="nx-olscreen__body">
            <div className="nx-olscreen__row">
              <img src={physician} alt="" width={1600} height={1200} loading="lazy" decoding="async" />
              <div><b>A licensed U.S. physician</b><small>Reviews your answers and your goal</small></div>
              <span className="nx-olscreen__tag"><Check strokeWidth={3} /> Reviewed</span>
            </div>
            <div className="nx-olscreen__row">
              <div><b>Your prescription</b><small>Written if it is appropriate, with the dose and the schedule</small></div>
            </div>
            <div className="nx-olscreen__row">
              <div><b>Every dose change</b><small>Reviewed by the physician before it takes effect</small></div>
            </div>
          </div>
        </Block>

        <Block id="fd-f-blood" flip Icon={Droplets} eyebrow="The blood panel" lead="The dose is set" grad="from your blood." href="/how-it-works" cta="The blood panel" testId="frontdoor-feature-blood"
          body={`An at-home kit of ${PANEL_TOTAL_MARKERS} markers ships with the first order, included. The physician reads it before the first dose and again at week ${RETEST_WEEK}, so the dose follows your numbers.`}>
          <div className="nx-olscreen__bar"><span className="nx-olscreen__ico"><Droplets /></span> Your panel <em>{PANEL_TOTAL_MARKERS} markers</em></div>
          <div className="nx-olscreen__body">
            <div className="nx-olscreen__row">
              <div><b>Baseline panel</b><small>Drawn at home before the first dose</small></div>
              <span className="nx-olscreen__tag"><Check strokeWidth={3} /> Read by the physician</span>
            </div>
            <div className="nx-olscreen__row">
              <div><b>Week-{RETEST_WEEK} panel</b><small>The same markers again</small><div className="nx-olscreen__bar2"><i /><small>Week 8 of {RETEST_WEEK}</small></div></div>
            </div>
            <div className="nx-olscreen__row">
              <div><b>Your dose</b><small>Set from the panel, adjusted from the retest</small></div>
            </div>
          </div>
        </Block>

        <Block id="fd-f-pharmacy" Icon={FlaskConical} eyebrow="The pharmacy" lead="Compounded for you." grad="Shipped cold." href="/peptides" cta="Every medicine" testId="frontdoor-feature-pharmacy"
          body="Your medicine is compounded to the prescription by a licensed U.S. 503A pharmacy and shipped cold to your door, in a plain carton, to all 50 states. The month's syringes and swabs come with it.">
          <div className="nx-olscreen__bar"><span className="nx-olscreen__ico"><Snowflake /></span> Your order <em>Ships cold</em></div>
          <div className="nx-olscreen__body">
            <div className="nx-olscreen__row">
              <img className="nx-olscreen__vial" src={SKU_PHOTO_600.sermorelin} alt="" width={600} height={600} loading="lazy" decoding="async" />
              <div><b>Sermorelin</b><small>One month, compounded to the prescription</small></div>
              <span className="nx-olscreen__tag"><Check strokeWidth={3} /> Compounded</span>
            </div>
            <div className="nx-olscreen__row">
              <div><b>Cold shipping</b><small>An ice pack in the carton</small><div className="nx-olscreen__bar2"><i /><small>In transit</small></div></div>
            </div>
            <div className="nx-olscreen__row">
              <span className="nx-olscreen__ico"><Droplets /></span>
              <div><b>Blood kit</b><small>In the first box, with a prepaid return</small></div>
            </div>
          </div>
        </Block>

        <Block id="fd-f-support" flip Icon={MessageCircle} eyebrow="Support" lead="Questions go to a person." grad="A person answers." href="/contact" cta="Contact" testId="frontdoor-feature-support"
          body="Write to the care team from your phone on any business day. Clinical questions go to the physician through the secure portal, and the answer comes back in writing.">
          <div className="nx-olscreen__bar"><span className="nx-olscreen__ico"><MessageCircle /></span> Care team <em>Nexphoria</em></div>
          <div className="nx-olscreen__body">
            <p className="nx-olscreen__msg nx-olscreen__msg--me">My week-{RETEST_WEEK} results came in. Has the physician seen them?</p>
            <p className="nx-olscreen__meta nx-olscreen__meta--r">Delivered</p>
            <div className="nx-olscreen__row">
              <img src={careTeam} alt="" width={44} height={44} loading="lazy" decoding="async" />
              <div><b>Care team</b><small>Yes. The physician has read them and left a note on your dose in the portal.</small></div>
            </div>
            <p className="nx-olscreen__meta">A person answers on business days</p>
          </div>
        </Block>
      </div>
    </section>
  );
}
