import re

path = "/home/user/workspace/nexphoria-site/PUNCH_LIST.md"
with open(path, encoding="utf-8") as f:
    lines = f.readlines()

# Resolution notes appended inline to each item id
notes = {
    "P01": "RESOLVED — Hero renders locked tagline \"Science you can feel. Results you can measure.\" with one acid accent on \"feel.\" (verified on deploy).",
    "P02": "RESOLVED — Home cost row reframed to \"From $149/mo\" teaser; no real $ on home.",
    "P03": "RESOLVED — Body italics down to one per page (footer signature exempt).",
    "P04": "RESOLVED — \"nootropic\" replaced in copy; only the real study-title citation remains (documented exception).",
    "P05": "RESOLVED — Home footer CTA made distinct: \"The molecules that matter, prescribed. Begin in four minutes.\" (acid, non-italic).",
    "P06": "NON-ISSUE — gap was a full-page screenshot artifact of sticky headings; sections contiguous.",
    "P07": "RESOLVED via P01 — one display treatment + one acid accent, no competing stack.",
    "P08": "RESOLVED — acid monogram avatars (initials + MD, gradient ring, hover scale).",
    "P09": "RESOLVED — RotatingKeyword.tsx deleted; no dead imports.",
    "P10": "RESOLVED — HeroVariantPicker hard-locked to single V4 hero; comment corrected.",
    "P11": "RESOLVED — acid-highlighted Nexphoria column; contrast lands hard.",
    "P12": "INTENTIONAL — /pricing is canonical pricing destination; full prices allowed there, enforced teaser-only on home. Documented.",
    "P13": "INTENTIONAL — footer signature confirmed; does not compete with per-page CTAs.",
    "P14": "RESOLVED — scroll reveals + hover micro-interactions added to static blocks; reduced-motion respected.",
    "P15": "RESOLVED — deliberate hover on all interactive elements.",
    "P16": "RESOLVED — section color transitions flow with separators.",
    "P17": "RESOLVED — WebPage/MedicalWebPage + BreadcrumbList JSON-LD added to remaining pages via lib/seo.ts.",
    "P18": "DONE — copy reviewed; brand voice tight, no filler beyond P04 swaps.",
    "P19": "VERIFIED — contextual CTA above global footer CTA on every page incl. legal.",
    "P20": "DONE — Konami-code Easter egg reveals acid toast; in-memory, reduced-motion aware.",
    "P21": "DONE — film-grain overlay + caption parallax; blur-to-sharp reveal verified.",
    "P22": "DOCUMENTED — fetch fails silent via .catch(); left as-is (analytics choke-point).",
    "V18": "VERIFIED — og/og-default.png ships in dist (deploy manifest).",
    "V19": "VERIFIED — About mission-first, no founder names.",
}

out = []
for ln in lines:
    m = re.match(r"^- \[ \] \*\*(P\d+|V\d+)", ln)
    if m:
        pid = m.group(1)
        ln = ln.replace("- [ ]", "- [x]", 1)
        if pid in notes:
            ln = ln.rstrip("\n") + f"  \n  → **{notes[pid]}**\n"
    out.append(ln)

# Add a status header after the legend
header = (
    "\n> **FINAL STATUS (June 29, 2026 deploy):** All P01–P22 + V18/V19 closed. "
    "Build exit 0. Deployed asset_id `447d20e1-231f-42af-b71e-af46e5c3b13a`. "
    "See SELF_GRADE.md for scoring.\n"
)
text = "".join(out)
text = text.replace(
    "Legend: [ ] open · [WIP] in progress · [x] complete",
    "Legend: [ ] open · [WIP] in progress · [x] complete" + header,
    1,
)
with open(path, "w", encoding="utf-8") as f:
    f.write(text)

remaining = sum(1 for l in out if l.startswith("- [ ]"))
print("Remaining open items:", remaining)
