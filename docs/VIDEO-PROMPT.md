# The home hero video — the prompt (2026-09-05)

Chiya: "a video for the home page … as crispy and sharp and engaging and
amazing as enhanced.com's." Their film is black, high-contrast, macro
product, fast cuts, grain. Ours keeps the sheet: porcelain, navy, ice,
one window light. Same energy, our world.

Use the MASTER PROMPT for a text-to-video model (Kling 2, Veo 3, Runway
Gen-4, Higgsfield). For image-to-video, feed a studio render
(review/studio/out/hero-still.png or a pdp-*.png) as the first frame and
use the SHOT prompt for that shot only.

## Master prompt (one clip, 8 to 10 s, loopable)

Cinematic macro product film, photoreal, 4K, 24 fps, anamorphic look, very
shallow depth of field. A single small glass medicine vial with a plain
white label and a deep navy flip cap stands on pale porcelain stone in a
cold white studio. One tall window of cool morning light from the left;
long soft navy shadows; ice-blue highlights refract through the glass and
the clear liquid inside. The camera pushes in slowly on a slider, then
arcs a few degrees around the vial as light sweeps across the label. A
slow, fine haze of condensation beads on the cold glass. Palette: porcelain
white, pale ice blue, deep navy; no other colour. Fine film grain, crisp
edges, high micro-contrast, no motion blur on the product. No text, no
logos, no hands, no people. Calm, precise, expensive. Ends on the same
framing it began on, for a seamless loop.

## Negative prompt

text, watermark, logo, hands, people, warm tones, orange, yellow, green,
purple, neon, lens flare streaks, fast shaky camera, blur on the product,
plastic look, cartoon, extra caps, floating objects, distorted label.

## The shot list (for a 20 s cut, 5 shots of 4 s)

1. **The window.** Extreme close-up of the vial's shoulder and cap; light
   sweeps left to right across the aluminium; ice-blue refraction blooms
   in the glass. Camera: micro push-in. (image-to-video: pdp-sermorelin.png)
2. **The liquid.** Inside the vial, the meniscus catches the light; a
   single slow bubble rises through clear liquid. Camera: locked off.
3. **The row.** Three vials in a line on porcelain, back to front, the
   focus racking from the front label to the back cap. Camera: slow lateral
   slide. (image-to-video: proto-recover-wide.png)
4. **The kit.** A plain matte-white box with a pale-ice band opens a few
   centimetres, the lid lifting in one clean motion, cold light inside.
   Camera: high three-quarter, slow tilt down.
5. **The person.** A woman in her early forties in a navy knit at a bright
   kitchen window at seven in the morning, holding a plain glass of water,
   turning her head toward the light, calm. Camera: slow dolly in, 35 mm.
   (image-to-video: client/src/assets/life/hero-kitchen.webp)

Grade every shot the same: porcelain white, pale ice blue, deep navy, fine
grain, high micro-contrast, no warm cast.

## Settings that matter

- Aspect 16:9 for the home hero (2400 × 1000 crop lives behind the
  headline); also render 9:16 for the phone if the model allows.
- Duration 8 to 10 s per generation; stitch in the edit.
- Motion strength low to medium: the product never wobbles.
- Seed-lock one clip you like and vary only the prompt's camera line for
  the others, so the glass and the label match across shots.
- Export ProRes or H.264 at 20 Mbps, then encode WebM (VP9) and MP4 (H.264)
  at 1920 wide for the site; the hero autoplays muted, loops, and shows the
  still (hero-still.webp) until the first frame is ready.
