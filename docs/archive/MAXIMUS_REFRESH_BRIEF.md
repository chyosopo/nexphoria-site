# Maximus Refresh — Subagent Brief

You are part of a 4-agent team refreshing Nexphoria pages with the approved Maximus tile design system. The home page (`/`), Peptides catalog, and StackIndex are already done. Your job is to refresh the top-hero band of ONE assigned page. Do NOT rewrite content below the hero — that work is already done and excellent.

## Hard rules (DO NOT violate)
1. **Only edit the top hero section.** Everything below the hero stays exactly as-is. The user has built rich content there over many sessions.
2. **Do not modify `client/src/data/peptides.ts`** or any data file.
3. **Do not rename `--nx-cobalt`** or any existing CSS token. The Maximus tokens (`--mx-*`) coexist with `--nx-*`.
4. **Hash routing is via wouter** with `useHashLocation` — already configured.
5. **No localStorage / sessionStorage / cookies.**
6. **Use `npx tsc --noEmit`** to verify NO TypeScript errors after your edit. If errors appear, fix them before completing.
7. **Report exactly what files you changed and what lines.**

## The Maximus pattern to apply

### Imports to add at top of file
```tsx
import { HeroTile, MxHeader } from "@/components/MaximusTile";
import heroRun1280 from "@/assets/maximus/max_hero_run_1280.webp";
import heroRun720 from "@/assets/maximus/max_hero_run_720.webp";
import heroYoga1280 from "@/assets/maximus/max_hero_yoga_1280.webp";
import heroYoga720 from "@/assets/maximus/max_hero_yoga_720.webp";
```

### Component prop names (CRITICAL — use EXACT names)

**`<MxHeader>`** takes:
- `eyebrow: string` — small uppercase label (e.g. "How it works")
- `headline: React.ReactNode` — main heading (Fraunces serif, supports `<em>` and `<br/>`)
- `subtitle?: string` — body paragraph

**`<HeroTile>`** takes:
- `href: string`
- `imgSrc: string` (1280 webp)
- `imgSrcSm: string` (720 webp)
- `alt: string`
- `label: React.ReactNode` — big serif headline on the tile
- `caption: string` — small caption under label
- `ctaLabel?: string` — bottom-left CTA pill text (default "Explore")
- `dark?: boolean` — dark variant for rhythm
- `priority?: boolean` — eager-load the first hero image

### Wrapper structure
```tsx
return (
  <SiteLayout navVariant="showcase">
    <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
      <div className="mx-page">
        <MxHeader
          eyebrow="..."
          headline={<>... <em>italic accent</em> ...</>}
          subtitle="..."
        />

        <div className="mx-grid">
          <HeroTile ... priority label={<>...<br/>...</>} caption="..." ctaLabel="..." />
          <HeroTile ... dark label={<>...<br/>...</>} caption="..." ctaLabel="..." />
        </div>
      </div>
    </main>

    {/* EVERYTHING BELOW STAYS UNCHANGED — original page content */}
    ...
  </SiteLayout>
);
```

**Note:** `<div className="mx-grid">` is the wrapper. `mx-hero` is the class on each individual tile (the component does that itself — do not wrap manually).

### Image selection rules
- **Energetic / performance / men's pages** → use `heroRun1280` + `heroRun720`
- **Calm / longevity / women's / wellness pages** → use `heroYoga1280` + `heroYoga720`
- Pair them on pages that want both vibes

### Navigation
- All refreshed pages should use `<SiteLayout navVariant="showcase">` (some currently use `variant="gate"` — change to showcase).

### Background continuity
- Wrap the original page content (BELOW the new hero) so its top section uses `background: var(--mx-page-bg)` if it currently uses `bg-background` or `var(--nx-bg)` — to avoid a hard color seam.

## Reference: see how Showcase.tsx, Peptides.tsx, StackIndex.tsx do it

These three are already done correctly. Read them to understand the pattern:
- `/home/user/workspace/nexphoria-site/client/src/pages/Showcase.tsx` (gold standard)
- `/home/user/workspace/nexphoria-site/client/src/pages/Peptides.tsx` (just refreshed)
- `/home/user/workspace/nexphoria-site/client/src/pages/StackIndex.tsx` (just refreshed)

## After your edit
1. Run `cd /home/user/workspace/nexphoria-site && npx tsc --noEmit 2>&1 | head -40` to verify no TS errors.
2. If errors: fix them.
3. Report: file path, lines changed, headline/caption text you chose, and "TS clean" or what errors remained.

## Do NOT
- Spawn other subagents
- Run `npm run build` (the main agent will do that)
- Run `deploy_website` or `publish_website`
- Edit any file you weren't assigned
- Rewrite or "improve" content below the hero
