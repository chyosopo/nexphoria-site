/* WCAG relative-luminance contrast, so the goal accent family is verified
   rather than eyeballed. Colour that carries navigation meaning has to be
   legible or the meaning is lost — and "it looked fine on my monitor" is how
   a pale-tint palette ships an unreadable tile. */
export function hexToRgb(h: string): [number, number, number] {
  const m = h.trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16)) as [number, number, number];
}
function chan(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
