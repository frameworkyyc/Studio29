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
  hero: { name: 'living-room-01', alt: 'Furnished living room at Studio 29 with a dark leather sofa, wood coffee table, wall-mounted TV and glowing floor lamps' },
  intro: { name: 'living-room-02', alt: 'Ladder shelf styled with books, plants and a bronze duck beside the living room TV, with a warm paper floor lamp' },
  about: { name: 'entry-01', alt: 'Entryway console with a snake plant, stacked books and a brass bowl beneath an abstract painting' },
  bookingCta: { name: 'dining-room-01', alt: 'Dining room at Studio 29 with a dark table, six grey chairs, leather placemats and a pendant light' },
  livingRoom: { name: 'living-room-01', alt: 'Furnished living room at Studio 29 with a dark leather sofa, wood coffee table, wall-mounted TV and glowing floor lamps' },
  kitchen: { name: 'kitchen-01', alt: 'Kitchen with a large island at Studio 29' },
  diningRoom: { name: 'dining-room-01', alt: 'Dining room at Studio 29 with a dark table, six grey chairs, leather placemats and a pendant light' },
  amenities: { name: 'bathroom-01', alt: 'Guest bathroom at Studio 29' },
} satisfies Record<string, PhotoSlot>;
