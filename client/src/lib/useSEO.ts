import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
}

export function useSEO({ title, description, ogImage }: SEOConfig) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.content = content;
    };

    setMeta("meta[name='description']", description);
    setMeta("meta[property='og:title']", title);
    setMeta("meta[property='og:description']", description);
    if (ogImage) setMeta("meta[property='og:image']", ogImage);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, ogImage]);
}
