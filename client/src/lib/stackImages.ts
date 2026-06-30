/* Static map of stack image imports — Vite bundles these at build time */
import stackWolverine from "@/assets/brand/stack-wolverine.webp";
import stackGlow from "@/assets/brand/stack-glow.webp";
import stackSleep from "@/assets/brand/stack-sleep.webp";
import stackWeightloss from "@/assets/brand/stack-weightloss.webp";
import stackLongevity from "@/assets/brand/stack-longevity.webp";
import lifestyleCognition from "@/assets/brand/lifestyle-cognition.webp";

export const stackImages: Record<string, string> = {
  "stack-wolverine": stackWolverine,
  "stack-glow": stackGlow,
  "stack-sleep": stackSleep,
  "stack-weightloss": stackWeightloss,
  "stack-longevity": stackLongevity,
  "lifestyle-cognition": lifestyleCognition,
};

export function getStackImage(name: string): string {
  return stackImages[name] || stackWolverine;
}
