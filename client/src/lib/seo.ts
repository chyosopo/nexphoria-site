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
}

/**
 * Resolve any image reference to an absolute crawlable URL. Handles absolute
 * http(s) URLs, protocol-relative, root-relative, and Vite's base:"./" relative
 * asset paths (e.g. "./assets/x.webp") — never produces "nexphoria.com./…".
 */
function absUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
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

export function useSeo({ title, description, path, ogImage, jsonLd }: SeoOptions) {
  // Stable serialization of the JSON-LD payload so the effect re-runs when the
  // structured data changes even if title/description/path are identical across
  // a client-side navigation. A string primitive compares by value in the dep
  // array, so this cannot loop.
  const jsonLdKey = JSON.stringify(jsonLd ?? []);
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    const url = path ? `${BASE_URL}${path}` : BASE_URL;
    const img = ogImage ? (ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`) : DEFAULT_OG;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setLink("canonical", url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

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

    window.scrollTo(0, 0);

    return () => {
      nodes.forEach((n) => n.remove());
    };
    // jsonLdKey stands in for jsonLd (a fresh array each render); the primitives
    // are listed explicitly. eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, ogImage, jsonLdKey]);
}

/** Shared structured-data builders. */
export const orgJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexphoria",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon/favicon-512.png`,
  description:
    "Physician-guided peptide therapy. Science you can feel. Results you can measure.",
  slogan: "Science you can feel. Results you can measure.",
});

export const medicalBusinessJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
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
  isPartOf: { "@type": "WebSite", name: "Nexphoria", url: BASE_URL },
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

export const itemListJsonLd = (p: {
  name: string;
  description?: string;
  items: { name: string; path: string; description?: string }[];
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: p.name,
  ...(p.description ? { description: p.description } : {}),
  numberOfItems: p.items.length,
  itemListElement: p.items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE_URL}${it.path}`,
    name: it.name,
    ...(it.description ? { description: it.description } : {}),
  })),
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
