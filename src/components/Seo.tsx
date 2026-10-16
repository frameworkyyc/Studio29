import { useEffect } from 'react';
import { site } from '@/config/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-route head management (title, description, canonical, Open Graph). */
export default function Seo({ title, description, path, image = site.ogImage, noindex }: SeoProps) {
  useEffect(() => {
    const full = path === '/' ? `${site.name} | Photography & Content Studio Rental in Calgary` : `${title} | ${site.name}`;
    const url = site.url ? `${site.url}${path}` : '';
    const img = image.startsWith('http') || !site.url ? image : `${site.url}${image}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    if (url) {
      setMeta('property', 'og:url', url);
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
    }
  }, [title, description, path, image, noindex]);
  return null;
}
