/**
 * Lightweight SEO without extra dependencies.
 *
 * `useSeo` imperatively manages <title>, meta description, canonical, and
 * Open Graph / Twitter tags on mount and cleans up structured-data it injected.
 * Works with wouter hash routing (runs on every page mount). No react-helmet
 * needed — keeps the bundle lean and avoids a provider wrapper.
 */

import { useEffect } from "react";

const SITE = "Nexphoria";
const BASE_URL = "https://nexphoria.pplx.app";
const DEFAULT_OG = "/og/og-default.png";

export interface SeoOptions {
  title: string;
  description: string;
  /** Path-only canonical, e.g. "/peptides/bpc-157". */
  path?: string;
  ogImage?: string;
  /** JSON-LD objects to inject for this page. */
  jsonLd?: Record<string, unknown>[];
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
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    const url = path ? `${BASE_URL}${path}` : BASE_URL;
    const img = ogImage ?? DEFAULT_OG;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, ogImage]);
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
    "Telehealth peptide therapy prescribed by board-certified physicians and compounded in U.S. 503A pharmacies.",
  medicalSpecialty: ["Endocrinology", "SportsMedicine", "InternalMedicine"],
  areaServed: "US",
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

export const productJsonLd = (p: {
  name: string;
  description: string;
  path: string;
  category?: string;
}): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  url: `${BASE_URL}${p.path}`,
  category: p.category,
  brand: { "@type": "Brand", name: "Nexphoria" },
});
