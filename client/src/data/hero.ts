/* ═══ The hero's data — docs/DESIGN-PACKAGE.md §4 and §5, verbatim ═══
   Band ranges are scroll progress (0 to 1) through the 400vh hero, so 0.02
   of progress is 6vh. Every line here is final copy and ships as written;
   the voice gate (audit:voice) and the copy grep run over the rendered
   result. Change the words here, nowhere else. */

export type HeroEntrance = "blur" | "depth" | "punch" | "drift" | "rise";

export interface HeroBand {
  id: string;
  start: number;
  end: number;
  /** the caption, or the subline when `settle` is set */
  text: string;
  entrance: HeroEntrance;
  /** optional assembly window override in progress units (data-ramp) */
  ramp?: number;
  /** the settle band carries the headline, the line, the CTA */
  settle?: boolean;
  headline?: string;
}

export const HERO_BANDS: HeroBand[] = [
  {
    id: "b1",
    start: 0.0,
    end: 0.22,
    text: "Peptides, prescribed on your numbers.",
    entrance: "depth",
  },
  {
    id: "b2",
    start: 0.26,
    end: 0.48,
    text: "A doctor reads a 99\u2011marker panel before anything ships.", // non-breaking hyphen
    entrance: "blur",
  },
  {
    id: "b3",
    start: 0.52,
    end: 0.74,
    text: "The same panel again at 90 days. The dose follows the data.",
    entrance: "punch",
  },
  {
    id: "b4",
    start: 0.8,
    end: 1.0,
    settle: true,
    headline: "Built on your bloodwork.",
    text: "Physician prescribed. Compounded in a licensed U.S. pharmacy. Shipped cold.",
    entrance: "rise",
    ramp: 0.036,
  },
];

/* Phones, portrait tablets, landscape phones and reduced motion get this
   composed over the ending frame. */
export const HERO_STATIC = {
  kicker: "Prescribed by U.S. licensed physicians",
  headline: "Built on your bloodwork.",
  subline:
    "Peptides, prescribed by a U.S. physician who reads a 99-marker panel first. Compounded in a licensed U.S. pharmacy. Shipped cold.",
  cta: "Start your assessment",
  micro: "Two minutes. Billed only if a physician prescribes.",
};

/* Relative paths: the inline <base> in index.html anchors them to the site
   root on every host (custom domain and the github.io project page). The
   byte size is the Content-Length fallback for the loading ring; update it
   when the encode changes (stat -c %s client/public/hero/hero-scrub.mp4). */
export const HERO_ASSETS = {
  /* H.264 for every mainstream browser; VP9 WebM for builds without an H.264
     decoder (open-source Chromium, some Linux Firefox). The engine picks one
     with canPlayType and fetches only that one. */
  video: "hero/hero-scrub.mp4",
  videoBytes: 3963046,
  videoWebm: "hero/hero-scrub.webm",
  videoWebmBytes: 2250328,
  poster: "hero/hero-poster.jpg",
  ending: "hero/hero-end.jpg",
  /* the static hero's crop: the landed row, all four vials, for portrait screens */
  endingPortrait: "hero/hero-end-portrait.jpg",
};
