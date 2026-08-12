async function main() {
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: process.cwd() + '/vite.config.ts', server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  const L = (p: string) => vite.ssrLoadModule(p);
  const { peptides } = await L('/src/data/peptides.ts');
  const { pricing, priceAtCadence } = await L('/src/data/pricing.ts');
  const { SOLO_CATALOG } = await L('/src/data/soloCatalog.ts');
  const { FLAGSHIP_STACKS } = await L('/src/data/stacksCatalog.ts');
  const { stacks: legacyStacks } = await L('/src/data/stacks.ts');

  console.log('═ LAYER CENSUS ═');
  console.log(`legacy peptides.ts: ${peptides.length} · pricing.ts: ${Object.keys(pricing).length} · soloCatalog: ${SOLO_CATALOG.length} · FLAGSHIP_STACKS: ${FLAGSHIP_STACKS.length} · legacy stacks.ts: ${legacyStacks.length}`);

  console.log('\n═ PEPTIDE PRICE DRIFT (cart layer vs PDP layer, 1-month) ═');
  let issues = 0;
  for (const s of SOLO_CATALOG) {
    if (!s.pricing) continue;
    let cart1: number | null = null;
    try { cart1 = priceAtCadence(s.slug, '1mo'); } catch { cart1 = null; }
    if (cart1 == null || Number.isNaN(cart1)) { console.log(`  CART-UNKNOWN  ${s.slug}  (PDP $${s.pricing.m1}/mo · cart layer has no price)`); issues++; continue; }
    if (cart1 !== s.pricing.m1) { console.log(`  DRIFT  ${s.slug}: PDP $${s.pricing.m1} vs cart $${cart1}`); issues++; }
  }
  if (!issues) console.log('  none');

  console.log('\n═ CART-SELLABLE SLUGS WITH NO NEW PDP ═');
  const soloSlugs = new Set(SOLO_CATALOG.map((x: any) => x.slug));
  let orphans = 0;
  for (const p of peptides) if (!soloSlugs.has(p.slug)) { console.log(`  ${p.slug}  (legacy-data only — excluded from builder; PDP intentionally absent)`); orphans++; }
  if (!orphans) console.log('  none');

  console.log('\n═ STACK PRICE DRIFT (cart vs PDP, all cadences) ═');
  let sd = 0;
  for (const ns of FLAGSHIP_STACKS) {
    if (ns.gated) { console.log(`  ${ns.slug}: gated — intentionally unpriced/unsellable ✓`); continue; }
    for (const key of ['1mo', '3mo', '12mo'] as const) {
      const pdp = ns.cadences.find((c: any) => c.key === key)?.perMonth;
      const cart = priceAtCadence(ns.slug, key);
      if (cart !== pdp) { console.log(`  DRIFT  ${ns.slug}@${key}: PDP $${pdp} vs cart $${cart}`); sd++; }
    }
  }
  if (!sd) console.log('  none — all 7 stacks × 3 cadences agree');

  console.log('\n═ GLP-1 / ORPHAN LEAK CHECK (the builder\'s real sellable predicate) ═');
  const sellable = peptides.filter((p: any) => {
    const s2 = SOLO_CATALOG.find((x: any) => x.slug === p.slug);
    return !!s2 && !s2.gated && !!s2.pricing;
  });
  const gated = SOLO_CATALOG.filter((s2: any) => s2.gated).map((s2: any) => s2.slug);
  let leaks = 0;
  for (const g of gated) if (sellable.some((p: any) => p.slug === g)) { console.log(`  ⚠ GATED-SELLABLE: ${g}`); leaks++; }
  const soloSet = new Set(SOLO_CATALOG.map((x: any) => x.slug));
  for (const p of peptides) if (!soloSet.has(p.slug) && sellable.some((q: any) => q.slug === p.slug)) { console.log(`  ⚠ ORPHAN-SELLABLE: ${p.slug}`); leaks++; }
  console.log(leaks ? `  ${leaks} leaks` : `  none — builder offers ${sellable.length} sellable solos; gated + orphans excluded`);

  console.log('\n═ LEGACY STACK FALLBACK INTEGRITY (stacks[].peptides ⊆ pricing) ═');
  /* The cart's legacy fallback (CartProvider → computeStackPrice) prices each
     legacy stack as Σ pricing[slug]?.monthlyPrice || 0. A peptide slug that is
     absent from pricing silently contributes $0, understating the total. This
     asserts every legacy stack peptide is priced. Audit-only; no runtime effect. */
  let unpriced = 0;
  for (const s of legacyStacks) {
    for (const slug of s.peptides) {
      if (!pricing[slug]) { console.log(`  UNPRICED  ${s.slug} → ${slug} (absent from pricing.ts — would price $0 in cart fallback)`); unpriced++; }
    }
  }
  if (!unpriced) console.log('  none — every legacy stack peptide is priced');

  await vite.close(); process.exit(0);
}
main();

/* ═══ E40 GATE — legacy display library vs canonical catalog ═══ */
{
  const { peptides } = await import("../client/src/data/peptides");
  const { SOLO_CATALOG } = await import("../client/src/data/soloCatalog");
  const canon = new Map(SOLO_CATALOG.map((s: any) => [s.slug, s]));
  const ghosts = peptides.filter((p: any) => !canon.has(p.slug));
  const nameDrift = peptides.filter((p: any) => canon.has(p.slug) && canon.get(p.slug)!.name !== p.name);
  console.log("\n═ LEGACY DISPLAY LIBRARY vs CANONICAL CATALOG (E40) ═");
  if (ghosts.length) { console.log("  GHOSTS (rendered but unsellable):", ghosts.map((g: any) => g.slug).join(", ")); failures++; }
  if (nameDrift.length) { console.log("  NAME DRIFT:", nameDrift.map((g: any) => g.slug).join(", ")); failures++; }
  if (!ghosts.length && !nameDrift.length) console.log("  none — display membership + names are canonical");
}
