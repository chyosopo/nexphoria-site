/* ═══ The visual benefit layer ═══
   What each medicine is good for, what it does in the body, where it works,
   and how you take it, as data a card can draw. Copy system v4: plain,
   sensory, never a promised result. "goodFor" is what the medicine is used
   for; "effects" are what it does (direction + thing); "region" is where it
   acts, drawn on the body map; "how" is the route and rhythm. Keyed by the
   catalog slug so a retired molecule never renders. */

export type EffectDir = "down" | "up" | "steady";
export type Region = "brain" | "gut" | "abdomen" | "muscle" | "joints" | "skin" | "cells" | "sleep" | "desire";
export type Route = "injection" | "spray" | "capsule";

export interface Benefit {
  goodFor: string[];
  effects: { dir: EffectDir; text: string }[];
  region: Region;
  how: { route: Route; rhythm: string };
}

export const REGION_LABEL: Record<Region, string> = {
  brain: "Works in the brain",
  gut: "Works on appetite and digestion",
  abdomen: "Works on abdominal fat",
  muscle: "Works on muscle and growth",
  joints: "Works on tendons, muscle and joints",
  skin: "Works in the skin",
  cells: "Works at the cellular level",
  sleep: "Works on the sleep cycle",
  desire: "Works on desire, in the brain",
};

export const ROUTE_LABEL: Record<Route, string> = {
  injection: "Small injection under the skin",
  spray: "Nasal spray",
  capsule: "Capsule",
};

export const BENEFITS: Record<string, Benefit> = {
  semaglutide: {
    goodFor: ["Weight loss", "Appetite", "Blood sugar"],
    effects: [{ dir: "down", text: "Appetite" }, { dir: "up", text: "Fullness after meals" }, { dir: "steady", text: "Blood sugar" }],
    region: "gut",
    how: { route: "injection", rhythm: "Once a week" },
  },
  tirzepatide: {
    goodFor: ["Weight loss", "Appetite", "Blood sugar"],
    effects: [{ dir: "down", text: "Appetite, on two hormones" }, { dir: "up", text: "Fullness after meals" }, { dir: "steady", text: "Blood sugar" }],
    region: "gut",
    how: { route: "injection", rhythm: "Once a week" },
  },
  tesamorelin: {
    goodFor: ["Abdominal fat", "Lean mass", "Body composition"],
    effects: [{ dir: "up", text: "Your own growth hormone" }, { dir: "down", text: "Deep abdominal fat" }, { dir: "up", text: "Lean mass" }],
    region: "abdomen",
    how: { route: "injection", rhythm: "Once a day, in the evening" },
  },
  "pt-141": {
    goodFor: ["Sexual desire", "Men and women", "On the day you choose"],
    effects: [{ dir: "up", text: "Desire, through the brain" }, { dir: "steady", text: "Works within 1 to 3 hours" }, { dir: "steady", text: "Active for several hours" }],
    region: "desire",
    how: { route: "injection", rhythm: "As needed, about an hour ahead" },
  },
  sermorelin: {
    goodFor: ["Recovery", "Sleep quality", "Lean mass"],
    effects: [{ dir: "up", text: "Your own growth hormone" }, { dir: "up", text: "Overnight repair" }, { dir: "steady", text: "Your body's own rhythm" }],
    region: "muscle",
    how: { route: "injection", rhythm: "Once a night, at bedtime" },
  },
  ipamorelin: {
    goodFor: ["Recovery", "Lean mass", "Sleep quality"],
    effects: [{ dir: "up", text: "Growth hormone pulses, more often" }, { dir: "steady", text: "Cortisol and prolactin" }, { dir: "up", text: "Overnight repair" }],
    region: "muscle",
    how: { route: "injection", rhythm: "Once a night, at bedtime" },
  },
  "cjc-1295": {
    goodFor: ["Lean mass", "Recovery", "Paired with ipamorelin"],
    effects: [{ dir: "up", text: "Growth hormone pulses, bigger" }, { dir: "up", text: "IGF-1" }, { dir: "up", text: "Overnight repair" }],
    region: "muscle",
    how: { route: "injection", rhythm: "Once a night, at bedtime" },
  },
  "ipa-cjc": {
    goodFor: ["Lean mass", "Recovery", "Body composition"],
    effects: [{ dir: "up", text: "Growth hormone, more often and more" }, { dir: "up", text: "IGF-1" }, { dir: "up", text: "Overnight repair" }],
    region: "muscle",
    how: { route: "injection", rhythm: "Once a night, at bedtime" },
  },
  selank: {
    goodFor: ["Stress", "Mood", "Focus under pressure"],
    effects: [{ dir: "down", text: "The stress response" }, { dir: "steady", text: "Mood" }, { dir: "up", text: "Clear thinking, without sedation" }],
    region: "brain",
    how: { route: "spray", rhythm: "Twice a day" },
  },
  semax: {
    goodFor: ["Focus", "Memory", "Mental stamina"],
    effects: [{ dir: "up", text: "BDNF, the brain's growth signal" }, { dir: "up", text: "Focus and attention" }, { dir: "up", text: "Mental stamina" }],
    region: "brain",
    how: { route: "spray", rhythm: "Once a day, in the morning" },
  },
  cerebrolysin: {
    goodFor: ["Brain support", "After stress or injury", "Short course"],
    effects: [{ dir: "up", text: "Support for nerve cells" }, { dir: "steady", text: "A defined ten-day course" }, { dir: "steady", text: "Given by injection" }],
    region: "brain",
    how: { route: "injection", rhythm: "Daily for ten days" },
  },
  "methylene-blue": {
    goodFor: ["Mental clarity", "Stamina", "Cellular energy"],
    effects: [{ dir: "up", text: "Energy made by your mitochondria" }, { dir: "up", text: "Mental clarity" }, { dir: "steady", text: "Low dose, daily" }],
    region: "brain",
    how: { route: "capsule", rhythm: "One capsule a day" },
  },
  "bpc-157": {
    goodFor: ["Injuries", "Tendons and joints", "Gut lining"],
    effects: [{ dir: "up", text: "Repair signalling" }, { dir: "up", text: "Blood supply to injured tissue" }, { dir: "down", text: "Inflammation at the site" }],
    region: "joints",
    how: { route: "injection", rhythm: "Once a day" },
  },
  "tb-500": {
    goodFor: ["Recovery from training", "Muscle and tendon", "Flexibility"],
    effects: [{ dir: "up", text: "Repair cells moved to the site" }, { dir: "up", text: "Tissue repair" }, { dir: "down", text: "Inflammation" }],
    region: "joints",
    how: { route: "injection", rhythm: "Twice a week" },
  },
  "bpc-tb-combo": {
    goodFor: ["Injuries", "Recovery from training", "Whole-body repair"],
    effects: [{ dir: "up", text: "The repair signal, from BPC-157" }, { dir: "up", text: "Repair cells at the site, from TB-500" }, { dir: "down", text: "Inflammation" }],
    region: "joints",
    how: { route: "injection", rhythm: "BPC-157 daily, TB-500 twice a week" },
  },
  "ghk-cu": {
    goodFor: ["Skin quality", "Collagen", "Wound healing"],
    effects: [{ dir: "up", text: "Collagen production" }, { dir: "up", text: "Elasticity" }, { dir: "up", text: "Skin repair" }],
    region: "skin",
    how: { route: "injection", rhythm: "Once a day" },
  },
  epitalon: {
    goodFor: ["Healthy ageing", "Sleep-wake cycle", "Short course"],
    effects: [{ dir: "up", text: "Telomere maintenance" }, { dir: "steady", text: "The sleep-wake rhythm" }, { dir: "steady", text: "A 20-day course, a few times a year" }],
    region: "cells",
    how: { route: "injection", rhythm: "Daily for 20 days" },
  },
  "nad-plus": {
    goodFor: ["Energy", "Recovery", "Healthy ageing"],
    effects: [{ dir: "up", text: "NAD+, the energy coenzyme" }, { dir: "up", text: "Cellular energy" }, { dir: "up", text: "Recovery" }],
    region: "cells",
    how: { route: "injection", rhythm: "Three times a week" },
  },
  "mots-c": {
    goodFor: ["Metabolism", "Endurance", "Training"],
    effects: [{ dir: "up", text: "The pathways exercise switches on" }, { dir: "up", text: "Endurance" }, { dir: "steady", text: "Metabolism" }],
    region: "cells",
    how: { route: "injection", rhythm: "Twice a week" },
  },
  dsip: {
    goodFor: ["Falling asleep", "Deep sleep", "Waking rested"],
    effects: [{ dir: "down", text: "Time to fall asleep" }, { dir: "up", text: "Deep sleep" }, { dir: "steady", text: "Waking without grogginess" }],
    region: "sleep",
    how: { route: "injection", rhythm: "Once a night, at bedtime" },
  },
};

export function benefitFor(slug: string): Benefit | undefined {
  return BENEFITS[slug];
}
