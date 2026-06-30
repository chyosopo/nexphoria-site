#!/usr/bin/env python3
"""Prefix-aware retoning of Nexphoria from Clinical Premium (light) to Maximus (dark).

Old palette semantics:
  nx-ink    #0a0a0a  -> dark text on light bg, OR dark section bg
  nx-paper  #f8f7f4  -> light bg, OR light text on dark section
  nx-cream  #efece5  -> light surface (cards)
  nx-bone   #e6e2d8  -> light surface
  nx-sand   #d9cdb8  -> warm tan accent text / surface
  nx-emerald#0d4f3c  -> brand accent
  nx-emerald-deep     -> accent hover
  nx-gold   #b89968  -> secondary accent
  nx-mute   #6a6a64  -> secondary text
  nx-faint  #a8a59f  -> tertiary text

New (dark-only) mapping is PREFIX-AWARE because a single old token served
two opposite roles (e.g. paper = light-bg AND light-text).
"""
import re, sys, glob, os

# Order matters: longest / most specific first.
# Each entry: (regex, replacement). We operate on whole className tokens with optional opacity /NN.

REPLACEMENTS = []

def add(pat, repl):
    REPLACEMENTS.append((re.compile(pat), repl))

# ---- ACCENT (emerald / gold / sand-as-accent) -> acid green (primary) ----
# backgrounds
add(r'\bbg-nx-emerald-deep\b', 'bg-primary')
add(r'\bbg-nx-emerald\b', 'bg-primary')
add(r'\bbg-nx-gold\b', 'bg-primary')
# text
add(r'\btext-nx-emerald-deep\b', 'text-primary')
add(r'\btext-nx-emerald\b', 'text-primary')
add(r'\btext-nx-gold\b', 'text-primary')
# border
add(r'\bborder-nx-emerald-deep\b', 'border-primary')
add(r'\bborder-nx-emerald\b', 'border-primary')
add(r'\bborder-nx-gold\b', 'border-primary')
# ring / from / to / via / fill / stroke / shadow / decoration / outline
for pfx in ('ring','from','to','via','fill','stroke','decoration','outline','caret','accent','divide','racket'):
    add(rf'\b{pfx}-nx-emerald-deep\b', f'{pfx}-primary')
    add(rf'\b{pfx}-nx-emerald\b', f'{pfx}-primary')
    add(rf'\b{pfx}-nx-gold\b', f'{pfx}-primary')
# opacity variants e.g. bg-nx-emerald/20  text-nx-emerald/60
add(r'\bbg-nx-emerald(-deep)?/(\d+)\b', r'bg-primary/\2')
add(r'\btext-nx-emerald(-deep)?/(\d+)\b', r'text-primary/\2')
add(r'\bborder-nx-emerald(-deep)?/(\d+)\b', r'border-primary/\2')
add(r'\b(ring|from|to|via|fill|stroke|decoration|outline|shadow)-nx-emerald(-deep)?/(\d+)\b', r'\1-primary/\3')
add(r'\bbg-nx-gold/(\d+)\b', r'bg-primary/\1')
add(r'\btext-nx-gold/(\d+)\b', r'text-primary/\1')
add(r'\bborder-nx-gold/(\d+)\b', r'border-primary/\1')

# ---- TEXT colors ----
# light text on dark (paper as text) -> foreground (warm white)
add(r'\btext-nx-paper/(\d+)\b', r'text-foreground/\1')
add(r'\btext-nx-paper\b', 'text-foreground')
# dark text (ink as text) FLIPS to light foreground
add(r'\btext-nx-ink/(\d+)\b', r'text-foreground/\1')
add(r'\btext-nx-ink\b', 'text-foreground')
# muted / faint / sand text -> muted-foreground
add(r'\btext-nx-mute/(\d+)\b', r'text-muted-foreground/\1')
add(r'\btext-nx-mute\b', 'text-muted-foreground')
add(r'\btext-nx-faint/(\d+)\b', r'text-muted-foreground/\1')
add(r'\btext-nx-faint\b', 'text-muted-foreground')
add(r'\btext-nx-sand/(\d+)\b', r'text-muted-foreground/\1')
add(r'\btext-nx-sand\b', 'text-muted-foreground')
add(r'\btext-nx-cream\b', 'text-muted-foreground')
add(r'\btext-nx-bone\b', 'text-muted-foreground')

# ---- BACKGROUND colors ----
# paper/ink/cream/bone/sand backgrounds all become dark surfaces.
# ink (was dark section) -> background ; cream/bone/sand (raised light cards) -> card surface
add(r'\bbg-nx-paper/(\d+)\b', r'bg-background/\1')
add(r'\bbg-nx-paper\b', 'bg-background')
add(r'\bbg-nx-ink/(\d+)\b', r'bg-background/\1')
add(r'\bbg-nx-ink\b', 'bg-background')
add(r'\bbg-nx-cream/(\d+)\b', r'bg-card/\1')
add(r'\bbg-nx-cream\b', 'bg-card')
add(r'\bbg-nx-bone/(\d+)\b', r'bg-card/\1')
add(r'\bbg-nx-bone\b', 'bg-card')
add(r'\bbg-nx-sand/(\d+)\b', r'bg-card/\1')
add(r'\bbg-nx-sand\b', 'bg-card')
add(r'\bbg-nx-faint/(\d+)\b', r'bg-muted/\1')
add(r'\bbg-nx-faint\b', 'bg-muted')
add(r'\bbg-nx-mute\b', 'bg-muted')

# ---- BORDER colors -> border token ----
add(r'\bborder-nx-ink/(\d+)\b', r'border-border')
add(r'\bborder-nx-ink\b', 'border-border')
add(r'\bborder-nx-paper/(\d+)\b', r'border-foreground/\1')
add(r'\bborder-nx-paper\b', 'border-border')
add(r'\bborder-nx-cream\b', 'border-border')
add(r'\bborder-nx-sand\b', 'border-border')

# ---- gradient stops on ink/paper ----
add(r'\b(from|to|via)-nx-ink/(\d+)\b', r'\1-background/\2')
add(r'\b(from|to|via)-nx-ink\b', r'\1-background')
add(r'\b(from|to|via)-nx-paper/(\d+)\b', r'\1-background/\2')
add(r'\b(from|to|via)-nx-paper\b', r'\1-background')

# ---- divide / ring on ink/paper ----
add(r'\bdivide-nx-ink/(\d+)\b', r'divide-border')
add(r'\bdivide-nx-ink\b', 'divide-border')
add(r'\bring-nx-paper/(\d+)\b', r'ring-foreground/\1')
add(r'\bring-nx-ink/(\d+)\b', r'ring-border')


def process(path):
    with open(path) as f:
        src = f.read()
    orig = src
    for rx, repl in REPLACEMENTS:
        src = rx.sub(repl, src)
    if src != orig:
        with open(path, 'w') as f:
            f.write(src)
        return True
    return False

if __name__ == '__main__':
    files = []
    for ext in ('tsx','ts'):
        files += glob.glob(f'/home/user/workspace/nexphoria-site/client/src/**/*.{ext}', recursive=True)
    # don't touch index.css (already hand-written) or this script
    changed = 0
    for fp in files:
        if process(fp):
            changed += 1
            print("rewrote", os.path.relpath(fp, '/home/user/workspace/nexphoria-site'))
    print(f"\n{changed} files changed")
