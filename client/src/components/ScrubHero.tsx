/* ═══ ScrubHero — the scroll-scrubbed hero (docs/DESIGN-PACKAGE.md §4, §5, §8)

   One 6 second shot, cold-chain arrival, played forward as the visitor scrolls
   down and backward as they scroll up. Built to the scrub-pipeline standard:
     · the video is fetched as a streamed Blob behind an honest loading ring
       with a 20 second no-progress watchdog (hosts without Range support
       otherwise clamp every seek to zero on the live site);
     · displayed time is a dt-normalised lerp that rests when converged and
       when the hero is off screen;
     · seeks are gated (one in flight, newest target coalesced, error escape);
     · every DOM write is delta-gated, so a converged frame costs nothing;
     · captions are paced in scroll distance with smoothstep ramps, and the
       first band opens settled on a one-time load ramp;
     · five static-hero gates, identical in CSS and JS, decided LIVE on every
       rotation, resize and preference flip;
     · the page is complete without the video: poster behind everything, the
       ending frame for the static hero, the video decorative and out of the
       tab order.
   The engine writes the DOM imperatively through refs: React state per frame
   would re-render four bands sixty times a second for nothing. */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { F, S } from "@/lib/typography";
import { HERO_BANDS, HERO_ASSETS, HERO_STATIC } from "@/data/hero";

/* The five gates. Character for character the same strings as the CSS
   media queries in index.css (search "STATIC-HERO GATES"). */
const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

const RING_C = 126; // circumference of the r=20 ring

const smoothstep = (p: number, e0: number, e1: number) => {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* Split a sentence into word spans with an ordered threshold per word, so the
   entrances (drift, rise, blur) stagger in reading order. Done once at render,
   deterministic, so the prerendered HTML and the hydrated tree agree. */
function Words({ text, spread = 0.45 }: { text: string; spread?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="nx-hb-w"
          style={{ ["--th" as string]: (i / words.length) * spread }}
        >
          {w}
        </span>
      )).flatMap((el, i) => (i < words.length - 1 ? [el, " "] : [el]))}
    </>
  );
}

export function ScrubHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const ring = ringRef.current;
    if (!root || !stage || !video || !ring) return;

    const bands = bandRefs.current.filter(Boolean) as HTMLDivElement[];
    const cache = bands.map(() => ({ op: -1, k: -1 }));

    /* ── progress ───────────────────────────────────────────── */
    const heroProgress = () => {
      const r = root.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      if (range <= 0) return 1;
      return clamp(-r.top / range, 0, 1);
    };

    /* ── load ramp for band one (the single designed exception) ─ */
    let loadK = 0;
    let loadStart = 0;
    let loadRaf: number | null = null;
    const loadTick = (now: number) => {
      if (!loadStart) loadStart = now;
      const t = clamp((now - loadStart) / 1100, 0, 1);
      loadK = t * t * (3 - 2 * t);
      updateCaptions(shown, now);
      if (t < 1) loadRaf = requestAnimationFrame(loadTick);
      else loadRaf = null;
    };

    /* ── captions, delta-gated ──────────────────────────────── */
    const updateCaptions = (p: number, now = performance.now()) => {
      for (let i = 0; i < bands.length; i++) {
        const b = HERO_BANDS[i];
        const el = bands[i];
        const c = cache[i];
        const f = Math.min(0.02, (b.end - b.start) / 3);
        const first = i === 0;
        const last = i === bands.length - 1;
        const fadeIn = first ? 1 : smoothstep(p, b.start, b.start + f);
        const fadeOut = last ? 1 : 1 - smoothstep(p, b.end - f, b.end);
        const op = fadeIn * fadeOut;
        const ramp = b.ramp ?? Math.min(0.025, (b.end - b.start) * 0.35);
        let k = clamp((p - b.start) / ramp, 0, 1);
        if (first) k = Math.max(k, loadK);
        if (Math.abs(op - c.op) > 0.004) {
          c.op = op;
          el.style.opacity = String(op);
          const on = op > 0.02;
          if (el.dataset.on !== String(on)) {
            el.dataset.on = String(on);
            el.style.visibility = on ? "visible" : "hidden";
          }
        }
        if (Math.abs(k - c.k) > 0.008) {
          c.k = k;
          el.style.setProperty("--k", k.toFixed(3));
        }
      }
      void now;
    };

    /* ── seeks, gated ───────────────────────────────────────── */
    let seekBusy = false;
    let pending: number | null = null;
    const requestSeek = (t: number) => {
      if (!video.duration || !Number.isFinite(t)) return;
      if (seekBusy) { pending = t; return; }
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pending !== null) { const t = pending; pending = null; requestSeek(t); }
    };
    const onVideoError = () => {
      seekBusy = false;
      pending = null;
      if (!started) return; // a stale src from a snapshot is not our failure
      failVideo();
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onVideoError);

    /* ── the lerp that rests ────────────────────────────────── */
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let heroOnScreen = true;
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const k = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      requestSeek(shown * (video.duration || 0));
      updateCaptions(shown, now);
    };
    const onScroll = () => {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      heroOnScreen = e.isIntersecting;
      if (heroOnScreen) onScroll();
      else if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    });
    io.observe(root);

    /* ── the streamed Blob with a loading ring ──────────────── */
    let inited = false;
    let started = false;
    let failed = false;
    const failVideo = () => {
      if (failed) return;
      failed = true;
      ring.style.setProperty("--ld", String(RING_C));
      stage.classList.remove("nx-video-ready");
      stage.classList.add("nx-video-failed");
    };
    /* Relative asset paths resolve against the document (the runtime <base>),
       never against the stylesheet: a url() inside a CSS custom property
       would resolve from /assets/. */
    const abs = (rel: string) => new URL(rel, document.baseURI).href;
    const h264 = video.canPlayType('video/mp4; codecs="avc1.64001F"') !== "";
    const src = h264 ? HERO_ASSETS.video : HERO_ASSETS.videoWebm;
    const srcBytes = h264 ? HERO_ASSETS.videoBytes : HERO_ASSETS.videoWebmBytes;
    const srcType = h264 ? "video/mp4" : "video/webm";
    const loadHeroBlob = async () => {
      const ctrl = new AbortController();
      let watchdog = window.setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(abs(src), { signal: ctrl.signal, priority: "low" } as RequestInit);
      if (!res.ok || !res.body) throw new Error("hero video " + res.status);
      const total = Number(res.headers.get("Content-Length")) || srcBytes;
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let got = 0;
      let lastRing = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        clearTimeout(watchdog);
        watchdog = window.setTimeout(() => ctrl.abort(), 20000);
        chunks.push(value);
        got += value.length;
        const frac = Math.min(1, got / total);
        const now = performance.now();
        if (now - lastRing > 100 || frac === 1) {
          lastRing = now;
          ring.style.setProperty("--ld", String(Math.round(RING_C * (1 - frac))));
        }
      }
      clearTimeout(watchdog);
      ring.style.setProperty("--ld", "0");
      video.src = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: srcType }));
      video.load();
      video.addEventListener("canplay", () => {
        requestSeek(heroProgress() * video.duration);
        stage.classList.add("nx-video-ready");
      }, { once: true });
    };
    const startBlobFetch = () => {
      if (started) return;
      started = true;
      loadHeroBlob().catch(failVideo);
    };
    const initHeroOnce = () => {
      if (inited) return;
      inited = true;
      // The poster wins the bandwidth race by design: paint it first, then
      // start the Blob only once it is in (or has failed). Both live ONLY
      // inside the gated path so the static hero never downloads either.
      const poster = abs(HERO_ASSETS.poster);
      stage.style.setProperty("--nx-hero-poster", `url("${poster}")`);
      const img = new Image();
      img.onload = startBlobFetch;
      img.onerror = startBlobFetch;
      img.src = poster;
      window.setTimeout(startBlobFetch, 4000);
    };

    /* ── the five gates, decided live ───────────────────────── */
    let scrubOn = false;
    const enableScrub = () => {
      if (scrubOn) return;
      scrubOn = true;
      initHeroOnce();
      window.addEventListener("scroll", onScroll, { passive: true });
      cache.forEach((c) => { c.op = -1; c.k = -1; });
      stage.classList.add("nx-scrub-on");
      if (loadK < 1 && loadRaf === null) loadRaf = requestAnimationFrame(loadTick);
      updateCaptions(heroProgress());
      onScroll();
    };
    const disableScrub = () => {
      if (!scrubOn) return;
      scrubOn = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      if (loadRaf !== null) { cancelAnimationFrame(loadRaf); loadRaf = null; }
      stage.classList.remove("nx-scrub-on");
    };
    const mqls = GATES.map((q) => window.matchMedia(q));
    const applyHeroMode = () => {
      if (mqls.some((m) => m.matches)) disableScrub();
      else enableScrub();
    };
    mqls.forEach((m) => m.addEventListener("change", applyHeroMode));
    applyHeroMode();

    return () => {
      disableScrub();
      io.disconnect();
      mqls.forEach((m) => m.removeEventListener("change", applyHeroMode));
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onVideoError);
      if (video.src.startsWith("blob:")) URL.revokeObjectURL(video.src);
    };
  }, []);

  return (
    <section ref={rootRef} className="nx-hero" aria-label="Nexphoria" data-testid="scrub-hero">
      <div ref={stageRef} className="nx-hero-stage">
        {/* Footage layers — decorative, out of the tab order. */}
        <div className="nx-hero-poster" aria-hidden="true" />
        <video
          ref={videoRef}
          className="nx-hero-video"
          preload="none"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="nx-hero-scrim" aria-hidden="true" />
        <div className="nx-hero-motes" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
        </div>
        <svg ref={ringRef} className="nx-hero-ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
            strokeDasharray={RING_C} style={{ strokeDashoffset: "var(--ld, 126)" }} />
        </svg>

        {/* Caption bands — the scrub journey. Band 1 is the page h1. */}
        <div className="nx-hero-bands">
          {HERO_BANDS.map((b, i) => {
            const Tag = i === 0 ? "h1" : "p";
            return (
              <div
                key={b.id}
                ref={(el) => { bandRefs.current[i] = el; }}
                className={`nx-hb nx-hb-${b.entrance} ${b.settle ? "nx-hb-settle" : ""}`}
                data-band={b.id}
                style={{ ["--k" as string]: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
              >
                {b.settle ? (
                  <>
                    <h2 className="nx-hb-headline" style={{ fontFamily: S }}>
                      <span className="sr-only">{b.headline}</span>
                      <span aria-hidden="true"><Words text={b.headline!} spread={0.5} /></span>
                    </h2>
                    <svg className="nx-marker-line nx-hb-line" viewBox="0 0 320 24" aria-hidden="true">
                      <circle className="nx-ml-a" cx="8" cy="12" r="4" />
                      <path d="M12 12 C 60 12, 90 6, 130 12 S 220 18, 260 12 S 300 10, 308 12" pathLength={1} />
                      <circle className="nx-ml-b" cx="312" cy="12" r="4" />
                    </svg>
                    <p className="nx-hb-sub" style={{ fontFamily: F }}>{b.text}</p>
                    <div className="nx-hb-cta">
                      <Link href="/assessment" className="nx-cta-cobalt nx-hb-btn" data-testid="frontdoor-hero-cta">
                        {HERO_STATIC.cta}
                      </Link>
                      <span className="nx-hb-micro" style={{ fontFamily: F }}>{HERO_STATIC.micro}</span>
                    </div>
                  </>
                ) : (
                  <Tag className="nx-hb-line-text" style={{ fontFamily: S }}>
                    <span className="sr-only">{b.text}</span>
                    <span aria-hidden="true" className="nx-hb-copy">
                      {b.entrance === "blur" || b.entrance === "depth" ? (
                        <>
                          <span className="nx-hb-soft">{b.text}</span>
                          <span className="nx-hb-sharp">{b.text}</span>
                        </>
                      ) : (
                        <Words text={b.text} />
                      )}
                    </span>
                  </Tag>
                )}
              </div>
            );
          })}
        </div>

        {/* The static hero: phones, portrait tablets, landscape phones and
            reduced motion. A designed layout over the ending frame, never a
            fallback apology. Same copy, composed (DESIGN-PACKAGE §5). */}
        <div className="nx-hero-static" data-testid="hero-static">
          <img
            src={HERO_ASSETS.endingPortrait}
            alt=""
            aria-hidden="true"
            width={1300}
            height={1071}
            decoding="async"
          />
          <div className="nx-hero-static-copy">
            <p className="nx-hero-kicker" style={{ fontFamily: F }}>{HERO_STATIC.kicker}</p>
            <p className="nx-hero-static-h" style={{ fontFamily: S }}>{HERO_STATIC.headline}</p>
            <p className="nx-hero-static-sub" style={{ fontFamily: F }}>{HERO_STATIC.subline}</p>
            <Link href="/assessment" className="nx-cta-cobalt nx-hb-btn" data-testid="frontdoor-hero-cta-static">
              {HERO_STATIC.cta}
            </Link>
            <p className="nx-hb-micro" style={{ fontFamily: F }}>{HERO_STATIC.micro}</p>
          </div>
        </div>

        <div className="nx-hero-cue" aria-hidden="true">
          <span style={{ fontFamily: F }}>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
