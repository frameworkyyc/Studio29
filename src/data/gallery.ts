/**
 * GALLERY — add an entry per approved photograph.
 *  - `file`: base name of the file in src/assets/photos (no extension)
 *  - `category`: studio interiors may be uncredited; every other category is
 *    only shown when `approved: true` AND a `credit` is present.
 *  - Entries whose image file is missing are hidden in production.
 */
export type GalleryCategory = 'interiors' | 'lifestyle' | 'branding' | 'portrait' | 'commercial';

export const categoryLabels: Record<GalleryCategory, string> = {
  interiors: 'Studio Interiors',
  lifestyle: 'Lifestyle',
  branding: 'Branding',
  portrait: 'Portrait',
  commercial: 'Commercial',
};

export interface GalleryImage {
  id: string;
  file: string;
  alt: string;
  category: GalleryCategory;
  orientation: 'landscape' | 'portrait' | 'square';
  approved: boolean;
  /** Photographer credit — required for anything other than studio interiors. */
  credit?: string;
  creditUrl?: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'i-01', file: 'living-room-01', alt: 'Living room with a leather sofa, wood coffee table and wall-mounted TV', category: 'interiors', orientation: 'portrait', approved: true },
  { id: 'i-02', file: 'dining-room-01', alt: 'Dining room with a dark table, grey chairs and a pendant light', category: 'interiors', orientation: 'square', approved: true },
  { id: 'i-03', file: 'living-room-02', alt: 'Ladder shelf styled with books, plants and a bronze duck', category: 'interiors', orientation: 'portrait', approved: true },
  { id: 'i-04', file: 'entry-01', alt: 'Entryway console beneath an abstract painting', category: 'interiors', orientation: 'portrait', approved: true },
  // Kitchen photos: add kitchen-01.webp etc. to src/assets/photos, then uncomment.
  // { id: 'i-05', file: 'kitchen-01', alt: 'Kitchen with a large island', category: 'interiors', orientation: 'landscape', approved: true },
  // Also supplied but intentionally not published (rooms not currently offered): office-01, bedroom-01.
  // Guest photographer example (hidden until the file exists, approval is given and a credit is set):
  // { id: 'g-01', file: 'guest-portrait-01', alt: 'Portrait in the living room', category: 'portrait',
  //   orientation: 'portrait', approved: true, credit: 'Photographer Name', creditUrl: 'https://instagram.com/…' },
];

export const isPublishable = (img: GalleryImage) =>
  img.approved && (img.category === 'interiors' || Boolean(img.credit));
