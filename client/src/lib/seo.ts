/**
 * Lightweight SEO without extra dependencies.
 *
 * `useSeo` imperatively manages <title>, meta description, canonical, and
 * Open Graph / Twitter tags, and cleans up structured-data it injected.
 * Works with wouter browser-path routing: the effect re-runs whenever the
 * page's title, description, path, ogImage, or JSON-LD payload changes, so
 * navigating between two routes that share a title/description still refreshes
 * the page-specific structured data. No react-helmet needed — keeps the bundle
 * lean and avoids a provider wrapper.
 */

import { useEffect } from "react";

const SITE = "Nexphoria";
// Production domain — live on Cloudflare Pages.
const BASE_URL = "https://nexphoria.com";
const DEFAULT_OG = `${BASE_URL}/og/og-default.png`; // MUST be absolute: crawlers require full URLs.

export interface SeoOptions {
  title: string;
  description: string;
  /** Path-only canonical, e.g. "/peptides/bpc-157". */
  path?: string;
  ogImage?: string;
  /** JSON-LD objects to inject for this page. */
  jsonLd?: Record<string, unknown>[];
  /**
   * When true, emit <meta name="robots" content="noindex, nofollow"> for this
   * page and restore indexability on unmount. For transactional / private
   * routes (cart, checkout, gate, gift-claim) that must stay out of the index
   * — they carry no evergreen content and would only dilute crawl budget.
   */
  noindex?: boolean;
  /**
   * Open Graph object type. Defaults to "website". Editorial routes pass
   * "article" so the og:type matches their Article JSON-LD (and social/LLM
   * unfurlers treat the page as a dated article, not a generic page).
   */
  ogType?: "website" | "article";
  /**
   * Open Graph article:* metadata — emitted ONLY when ogType === "article"
   * and the value is real (never fabricated). These page-type-specific tags
   * are removed on unmount so they never linger onto a non-article route.
   */
  articleMeta?: { publishedTime?: string; author?: string; section?: string };
}

/**
 * Resolve any image reference to an absolute crawlable URL. Handles absolute
 * http(s) URLs, protocol-relative, root-relative, and Vite's base:"./" relative
 * asset paths (e.g. "./assets/x.webp") — never produces "nexphoria.com./…".
 */
function absUrl(src: string): string {
  if (/^https?:\/\//.test(src)) {
    // Rebase a prerender-time localhost origin onto the canonical host: bundled
    // assets (base:"./") resolve against the ephemeral 127.0.0.1:<port> <base>
    // during snapshotting, so an already-absolute src can carry that port. A
    // crawlable og:image / JSON-LD image MUST be https://nexphoria.com, never
    // the throwaway prerender port.
    const local = src.match(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(\/.*)?$/i);
    return local ? `${BASE_URL}${local[1] ?? ""}` : src;
  }
  if (src.startsWith("//")) return `https:${src}`;
  const clean = src.replace(/^\.?\/*/, ""); // strip leading "./", "/", "."
  return `${BASE_URL}/${clean}`;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keep the en-US hreflang alternate self-referential (== canonical). The static
 * shell ships one `<link rel="alternate" hreflang="en-US" href=".../">` anchored
 * to the homepage; without this, EVERY prerendered interior page would inherit
 * that homepage href, telling crawlers "the en-US version of /science is the
 * home page" — a hreflang/canonical mismatch that undermines consolidation. The
 * site is single-language, so the correct alternate is the page's own canonical.
 */
function setAltLang(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", "en-US");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, path, ogImage, jsonLd, noindex, ogType, articleMeta }: SeoOptions) {
  // Stable serialization of the JSON-LD payload so the effect re-runs when the
  // structured data changes even if title/description/path are identical across
  // a client-side navigation. A string primitive compares by value in the dep
  // array, so this cannot loop.
  const jsonLdKey = JSON.stringify(jsonLd ?? []);
  const articleMetaKey = JSON.stringify(articleMeta ?? null);
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    const url = path ? `${BASE_URL}${path}` : BASE_URL;
    // absUrl handles absolute, protocol-relative, root-relative AND Vite's
    // base:"./" asset paths (e.g. an imported "./assets/x.webp") — so a
    // per-page ogImage from a bundled import never yields "nexphoria.com./…".
    const img = ogImage ? absUrl(ogImage) : DEFAULT_OG;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setLink("canonical", url);
    setAltLang(url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("property", "og:type", ogType ?? "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    // Transactional / private routes opt out of indexing. Restored on cleanup
    // so a client-side navigation back to a content page re-enables indexing.
    if (noindex) setMeta("name", "robots", "noindex, nofollow");

    // Inject page-specific JSON-LD; tag them so we can remove on unmount.
    const nodes: HTMLScriptElement[] = [];
    (jsonLd ?? []).forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-nx-jsonld", "true");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
      nodes.push(s);
    });

    // Article-only OG metadata. Unlike the shared og:* tags (overwritten each
    // navigation), these are created fresh and removed on cleanup so an article
    // page's published_time/author never bleeds onto the next, non-article route.
    const articleNodes: HTMLMetaElement[] = [];
    if (ogType === "article" && articleMeta) {
      const addArticleMeta = (key: string, content: string) => {
        const el = document.createElement("meta");
        el.setAttribute("property", key);
        el.setAttribute("content", content);
        el.setAttribute("data-nx-article", "true");
        document.head.appendChild(el);
        articleNodes.push(el);
      };
      if (articleMeta.publishedTime) addArticleMeta("article:published_time", articleMeta.publishedTime);
      if (articleMeta.author) addArticleMeta("article:author", articleMeta.author);
      if (articleMeta.section) addArticleMeta("article:section", articleMeta.section);
    }

    window.scrollTo(0, 0);

    return () => {
      nodes.forEach((n) => n.remove());
      articleNodes.forEach((n) => n.remove());
      if (noindex) setMeta("name", "robots", "index, follow, max-image-preview:large");
    };
    // jsonLdKey stands in for jsonLd (a fresh array each render); the primitives
    // are listed explicitly. eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, ogImage, jsonLdKey, noindex, ogType, articleMetaKey]);
}

/** Shared structured-data builders. */
/**
 * Stable @id anchors for the site's identity graph. Every node that describes
 * Nexphoria or the site references these instead of re-declaring an anonymous
 * duplicate — so crawlers consolidate one Organization / one WebSite across all
 * 116 routes (Google explicitly supports cross-page @id references). Fragment
 * @ids on the origin are the schema.org convention for site-wide singletons.
 */
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export const orgJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Nexphoria",
  // Real registered entity (see CLAUDE.md / repo header): Nexphoria Research LLC.
  legalName: "Nexphoria Research LLC",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon/favicon-512.png`,
  description:
    "Physician-guided peptide therapy. Science you can feel. Results you can measure.",
  slogan: "Science you can feel. Results you can measure.",
  // Real, in-use inboxes — hello@ (Contact.tsx / Footer.tsx) and press@
  // (Contact.tsx press desk). No phone number is published anywhere on the
  // site, so none is emitted.
  email: "hello@nexphoria.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@nexphoria.com",
      areaServed: "US",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "press",
      email: "press@nexphoria.com",
      areaServed: "US",
      availableLanguage: "English",
    },
  ],
  // sameAs is INTENTIONALLY omitted. No confirmed public social/profile URL
  // for Nexphoria exists in the codebase — the footer, nav, and contact page
  // expose only mailto: links, never a social handle. Fabricating a sameAs
  // profile URL is a structured-data honesty violation; add entries here ONLY
  // when a real, verified profile URL exists.
});

/**
 * WebSite identity node for the site entry pages. Establishes the canonical
 * site name + URL for search engines (enables the name in sitelinks).
 *
 * potentialAction (a SearchAction / sitelinks searchbox) is INTENTIONALLY
 * omitted: the site has no on-site search endpoint, and advertising a
 * "/search?q={query}" template that 404s is fabricated capability. Add a
 * potentialAction ONLY once a real search route exists.
 */
export const websiteJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Nexphoria",
  url: BASE_URL,
  inLanguage: "en-US",
  // Reference the single Organization node by @id rather than re-declaring it.
  publisher: { "@id": ORG_ID },
});

export const medicalBusinessJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${BASE_URL}/#medical-business`,
  name: "Nexphoria",
  url: BASE_URL,
  description:
    "Telehealth peptide therapy prescribed by board-certified physicians, partnered with U.S. state-licensed 503A compounding pharmacies.",
  medicalSpecialty: ["Endocrinology", "SportsMedicine", "InternalMedicine"],
  areaServed: "US",
});

export const drugJsonLd = (opts: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Drug",
  name: opts.name,
  description: opts.description,
  url: `${BASE_URL}${opts.path}`,
  prescriptionStatus: "https://schema.org/PrescriptionOnly",
  isAvailableGenerically: false,
});

export const faqJsonLd = (
  items: { q: string; a: string }[],
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});

export const webPageJsonLd = (p: {
  name: string;
  description: string;
  path: string;
  /** Use "MedicalWebPage" for clinical/science pages, else "WebPage". */
  type?: "WebPage" | "MedicalWebPage";
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": p.type ?? "WebPage",
  name: p.name,
  description: p.description,
  url: `${BASE_URL}${p.path}`,
  // Single-language site — asserted truthfully on WebSite.inLanguage and the
  // en-US hreflang alternate; mirror it on the page node so each route is
  // language-explicit for crawlers that read the page graph in isolation.
  inLanguage: "en-US",
  // Reference the site-wide WebSite singleton by @id (defined on the entry
  // pages) instead of duplicating an anonymous WebSite node on every route.
  isPartOf: { "@id": WEBSITE_ID },
});

export const breadcrumbJsonLd = (
  crumbs: { name: string; path: string }[],
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${BASE_URL}${c.path}`,
  })),
});

export const physicianJsonLd = (p: {
  name: string;
  jobTitle?: string;
  medicalSpecialty?: string;
  alumniOf?: string;
  credentials?: string;
  description?: string;
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  name: p.name,
  ...(p.jobTitle ? { jobTitle: p.jobTitle } : {}),
  ...(p.medicalSpecialty ? { medicalSpecialty: p.medicalSpecialty } : {}),
  ...(p.alumniOf ? { alumniOf: { "@type": "CollegeOrUniversity", name: p.alumniOf } } : {}),
  ...(p.credentials ? { hasCredential: p.credentials } : {}),
  ...(p.description ? { description: p.description } : {}),
  worksFor: { "@type": "MedicalBusiness", name: "Nexphoria", url: BASE_URL },
});

export const productJsonLd = (p: {
  name: string;
  description: string;
  path: string;
  category?: string;
  price?: number;
  reviewCount?: number;
  ratingValue?: number;
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  url: `${BASE_URL}${p.path}`,
  category: p.category,
  brand: { "@type": "Brand", name: "Nexphoria" },
  ...(p.price !== undefined ? {
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Nexphoria" },
    },
  } : {}),
  // aggregateRating is emitted ONLY when a caller supplies BOTH real numbers.
  // Never default to invented rating/review counts — fabricated review data is a
  // Google structured-data penalty risk and violates institutional-honesty law.
  ...(p.ratingValue !== undefined && p.reviewCount !== undefined ? {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.ratingValue,
      reviewCount: p.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  } : {}),
});

/**
 * ItemList for catalog / index pages — enumerates child entries in real order.
 * Each item points at its own canonical path; no prices or ratings are emitted
 * here (those belong on the child PDPs, gated by real data).
 */
export const itemListJsonLd = (p: {
  name: string;
  description?: string;
  items: { name: string; path: string }[];
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: p.name,
  ...(p.description ? { description: p.description } : {}),
  numberOfItems: p.items.length,
  itemListElement: p.items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: `${BASE_URL}${it.path}`,
  })),
});

/**
 * Article schema for editorial / journal pages. Emit datePublished, author, and
 * image ONLY when the caller passes real values — never fabricate a date, an
 * author, or a byline. author is modelled as an Organization (the editorial
 * team), not an invented individual physician.
 */
export const articleJsonLd = (p: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  authorName?: string;
  image?: string;
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: p.headline,
  description: p.description,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${p.path}` },
  url: `${BASE_URL}${p.path}`,
  inLanguage: "en-US",
  // Bind editorial content into the site graph by @id, the same way WebPage
  // nodes reference the WebSite singleton — so an Article resolves to its site.
  isPartOf: { "@id": WEBSITE_ID },
  ...(p.datePublished ? { datePublished: p.datePublished } : {}),
  ...(p.authorName ? { author: { "@type": "Organization", name: p.authorName } } : {}),
  ...(p.image ? { image: absUrl(p.image) } : {}),
  publisher: {
    "@type": "Organization",
    name: "Nexphoria",
    logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon/favicon-512.png` },
  },
});

export const howToJsonLd = (p: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: p.name,
  description: p.description,
  step: p.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});
