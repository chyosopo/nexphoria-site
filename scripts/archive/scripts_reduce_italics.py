#!/usr/bin/env python3
"""Reduce editorial serif-italics to ONE per page.
Keeps the FIRST serif-italic span in each file as italic; converts every
subsequent one to a non-italic colored emphasis (preserves text-nx-acid /
text-nx-olive color, drops the italic styling).

Two italic mechanisms exist in the codebase:
  - class "font-serif-italic"            -> non-italic replacement: "font-medium"
  - class "font-serif italic"            -> non-italic replacement: "font-medium"
We replace by toggling only the italic-bearing tokens, leaving color intact.
"""
import re, sys

# Files to process. For each, the index (0-based) of the italic to KEEP.
# Default keep index 0 (the hero). Some pages we keep a later one if hero italic
# is weak; specified explicitly below.
PAGES = {
    "client/src/pages/About.tsx": 0,
    "client/src/pages/Community.tsx": 0,
    "client/src/pages/Contact.tsx": 0,
    "client/src/pages/FAQ.tsx": 0,
    "client/src/pages/HowItWorks.tsx": 0,
    "client/src/pages/LabTesting.tsx": 0,
    "client/src/pages/PeptideDetail.tsx": 0,
    "client/src/pages/Peptides.tsx": 0,
    "client/src/pages/Physicians.tsx": 0,
    "client/src/pages/Pricing.tsx": 0,
    "client/src/pages/Protocols.tsx": 0,
    "client/src/pages/Science.tsx": 0,
    "client/src/pages/StackReveal.tsx": 0,
    "client/src/pages/legal/LegalIndex.tsx": 0,
    "client/src/pages/Legal.tsx": 0,
}

BASE = "/home/user/workspace/nexphoria-site/"

# Match a className attribute value containing the italic tokens.
# We find span/p tags whose className includes either italic mechanism.
ITALIC_RE = re.compile(r'(className=")([^"]*?)(")')

def is_italic_class(cls: str) -> bool:
    return ("font-serif-italic" in cls) or ("font-serif italic" in cls)

def deitalicize(cls: str) -> str:
    # Replace the italic mechanism with non-italic emphasis, keep colors.
    c = cls
    c = c.replace("font-serif-italic", "font-medium")
    c = c.replace("font-serif italic", "font-medium")
    # collapse double spaces
    c = re.sub(r"\s+", " ", c).strip()
    return c

total_kept = 0
total_changed = 0
for rel, keep_idx in PAGES.items():
    path = BASE + rel
    with open(path) as f:
        src = f.read()
    # find all className occurrences that are italic, in order
    matches = list(ITALIC_RE.finditer(src))
    italic_positions = [m for m in matches if is_italic_class(m.group(2))]
    if not italic_positions:
        continue
    # Build new source by walking matches and replacing all but keep_idx
    out = []
    last = 0
    italic_seen = 0
    changed = 0
    for m in matches:
        cls = m.group(2)
        out.append(src[last:m.start()])
        if is_italic_class(cls):
            if italic_seen == keep_idx:
                out.append(m.group(0))  # keep as-is
            else:
                new_cls = deitalicize(cls)
                out.append(f'{m.group(1)}{new_cls}{m.group(3)}')
                changed += 1
            italic_seen += 1
        else:
            out.append(m.group(0))
        last = m.end()
    out.append(src[last:])
    new_src = "".join(out)
    with open(path, "w") as f:
        f.write(new_src)
    print(f"{rel}: {italic_seen} italics -> kept 1 (idx {keep_idx}), de-italicized {changed}")
    total_kept += 1
    total_changed += changed

print(f"\nDONE: {total_kept} pages, {total_changed} italics removed.")
