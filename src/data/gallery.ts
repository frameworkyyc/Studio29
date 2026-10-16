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
  { id: 'i-01', file: 'living-room-01', alt: 'Living room at Studio 29', category: 'interiors', orientation: 'landscape', approved: true },
  { id: 'i-02', file: 'kitchen-01', alt: 'Kitchen with large island', category: 'interiors', orientation: 'portrait', approved: true },
  { id: 'i-03', file: 'dining-room-01', alt: 'Dining room at Studio 29', category: 'interiors', orientation: 'landscape', approved: true },
  { id: 'i-04', file: 'living-room-02', alt: 'Living room seating area', category: 'interiors', orientation: 'portrait', approved: true },
  { id: 'i-05', file: 'kitchen-02', alt: 'Kitchen island detail', category: 'interiors', orientation: 'square', approved: true },
  { id: 'i-06', file: 'living-room-03', alt: 'Living room decor detail', category: 'interiors', orientation: 'portrait', approved: true },
  { id: 'i-07', file: 'dining-room-02', alt: 'Dining room table setting', category: 'interiors', orientation: 'landscape', approved: true },
  { id: 'i-08', file: 'kitchen-03', alt: 'Kitchen detail', category: 'interiors', orientation: 'square', approved: true },
  // Guest photographer example (hidden until the file exists, approval is given and a credit is set):
  // { id: 'g-01', file: 'guest-portrait-01', alt: 'Portrait in the living room', category: 'portrait',
  //   orientation: 'portrait', approved: true, credit: 'Photographer Name', creditUrl: 'https://instagram.com/…' },
];

export const isPublishable = (img: GalleryImage) =>
  img.approved && (img.category === 'interiors' || Boolean(img.credit));
