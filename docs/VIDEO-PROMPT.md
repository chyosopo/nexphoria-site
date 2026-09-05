# The home hero video — the prompt (2026-09-05, v2: hyper-motion athletic)

Chiya: "not a single vial. Hyper motion, lifestyle, athlete, high-res,
crispy video," as crisp and engaging as enhanced.com's film. Same energy,
our world: cold porcelain light, navy, ice; the product only as the last
beat. No text, no logos.

Use the MASTER PROMPT for a text-to-video model (Kling 2.x, Veo 3, Runway
Gen-4, Higgsfield). Generate each SHOT separately at 4 to 6 s and cut them
fast in the edit (0.8 to 1.5 s per cut). For image-to-video, feed the
first-frame render named in the shot.

## Master prompt (per shot, prepend this)

Hyper-real athletic lifestyle film, 4K, shot on a high-speed cinema
camera, 120 fps slow motion cut against real-time bursts, razor-sharp
focus, high micro-contrast, fine film grain, anamorphic 2.39 look, very
shallow depth of field. Cold porcelain light: white studio daylight and
ice-blue rim light, deep navy shadows, wet-skin specular highlights, breath
visible in cold air. Palette locked to porcelain white, pale ice blue and
deep navy; no warm cast, no other colour. Fast, precise, expensive.
Photoreal skin, sweat, fabric and hair detail. No text, no logos, no
watermark.

## The shot list (10 shots, ~4 s each, cut fast)

1. **The start.** A sprinter in a navy kit explodes out of the blocks on a
   pale track at dawn, low angle, dust and breath in ice-blue light. Camera
   whip-pans with the launch.
2. **Hands and chalk.** Extreme close-up: a hand claps chalk, the cloud
   hangs in cold window light, then grips a steel bar. 120 fps.
3. **The pull.** A woman in her forties finishes a heavy pull, side
   profile, every muscle of the forearm and shoulder in sharp relief,
   ice-blue rim light along the arm. Camera arcs slowly around her.
4. **The swim.** A swimmer breaks the surface of a cold pool at first
   light, water sheeting off in slow motion, droplets crisp against a navy
   background. Top-down, then level with the water.
5. **The breath.** Macro of a face mid-effort, eyes open, breath fogging in
   cold air, sweat beading on the brow, absolute stillness for one beat.
6. **The road.** A runner in a navy layer on a coastal path at dawn, tracked
   from a car at speed, sea a cold pale blue, hair and jacket whipping.
7. **The recovery.** The same runner on a stone step, head down, hands on
   knees, chest rising, steam off the shoulders in the cold. Slow push-in.
8. **The morning.** A man in his forties at a bright kitchen window at
   seven in the morning drinks a glass of water in one motion, porcelain
   light, navy shadows. (first frame: client/src/assets/life/hero-kitchen.webp
   for the female version)
9. **The kit.** A plain matte-white box with a pale-ice band on a stone
   counter, lid lifted in one clean motion, cold light inside; a hand sets
   a small glass vial with a navy cap beside it. (first frame:
   review/studio/out/hero-still.png)
10. **The product.** Macro of the vial on porcelain: ice-blue refraction
    through the glass, one light sweep across the label, then hold. The
    hero headline lands on this frame. (first frame: review/studio/out/pdp/pdp-sermorelin.png)

## Negative prompt

text, captions, watermark, logo, warm tones, orange, yellow, green, purple,
neon, lens-flare streaks, motion blur on faces, soft focus, plastic skin,
extra limbs, distorted hands, gym signage, branded apparel, crowds,
cartoon, low resolution.

## Settings that matter

- 16:9 for the home hero; also 9:16 for the phone if the model allows.
- 4 to 6 s per generation, 24 fps master with 120 fps slow-motion shots;
  cut at 0.8 to 1.5 s in the edit so it feels fast.
- Motion strength high for shots 1, 4, 6; medium for 2, 3, 5, 7, 8; low
  for 9 and 10 (the product never wobbles).
- Lock the seed and the palette line across shots so skin, light and navy
  match; change only the shot description.
- Export ProRes, then WebM (VP9) and MP4 (H.264) at 1920 wide, 20 Mbps
  master; the hero autoplays muted, loops, and shows hero-still.webp until
  the first frame is ready. 18 to 22 s total, loop point on shot 10.
