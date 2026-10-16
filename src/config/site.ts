/**
 * Central business details. Anything the owner has not supplied is `null`
 * and the UI shows a clearly marked placeholder or omits it. Never invent
 * contact details here.
 */
export const site = {
  name: 'Studio 29',
  tagline: 'Curated spaces for creative expression.',
  description:
    'Studio 29 is a curated, residential photography and content creation space in Creekstone, Calgary, Alberta, available to rent for photographers, creatives and brands.',
  /** Set VITE_SITE_URL at build time (e.g. https://studio29.ca). Used for canonical + OG URLs. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
  locale: 'en_CA',
  location: { neighbourhood: 'Creekstone', city: 'Calgary', region: 'Alberta', country: 'Canada' },
  instagram: { handle: '@studio29.yyc', url: 'https://www.instagram.com/studio29.yyc/' },
  /** Not supplied yet — leave null. Forms + Instagram are the contact routes until set. */
  email: null as string | null,
  phone: null as string | null,
  /** Optional backend for the forms (JSON POST). Empty = forms report honestly that sending is not connected. */
  inquiryEndpoint: (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined) ?? '',
  ogImage: '/og-default.png',
} as const;

export const placeholder = (label: string) => `[${label} — to be confirmed]`;
