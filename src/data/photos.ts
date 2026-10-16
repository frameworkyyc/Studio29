/**
 * Named photo slots used across the site. `name` is the file's base name in
 * src/assets/photos. Change alt text here once, and every page updates.
 * Alt text describes only what is visible — update it to match each photo.
 */
export interface PhotoSlot {
  name: string;
  alt: string;
}

export const slots = {
  hero: { name: 'hero', alt: 'The Studio 29 living room, styled in warm neutral tones' },
  intro: { name: 'intro', alt: 'A styled corner of Studio 29' },
  about: { name: 'about', alt: 'Interior detail at Studio 29' },
  bookingCta: { name: 'booking-cta', alt: 'Studio 29 interior, ready for a session' },
  livingRoom: { name: 'living-room-01', alt: 'Furnished living room at Studio 29' },
  kitchen: { name: 'kitchen-01', alt: 'Kitchen with a large island at Studio 29' },
  diningRoom: { name: 'dining-room-01', alt: 'Furnished dining room at Studio 29' },
  amenities: { name: 'bathroom-01', alt: 'Guest bathroom at Studio 29' },
} satisfies Record<string, PhotoSlot>;
