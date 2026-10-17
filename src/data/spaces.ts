import { slots, type PhotoSlot } from './photos';

/**
 * Bookable spaces. `status: 'planned'` entries are NEVER rendered publicly —
 * they exist so the upstairs studio / boudoir suite can be switched on later
 * by changing `status` to 'available' (and adding photos + copy).
 */
export interface Space {
  id: string;
  status: 'available' | 'planned';
  title: string;
  kicker: string;
  summary: string;
  description: string;
  highlights: string[];
  photo: PhotoSlot;
  /** Extra images shown on The Studio page (base names in src/assets/photos). */
  gallery: PhotoSlot[];
}

export const spaces: Space[] = [
  {
    id: 'living-room',
    status: 'available',
    title: 'Living Room',
    kicker: 'The heart of the home',
    summary: 'Warm, neutral and softly layered — a fully furnished living room with curated decor.',
    description:
      'A fully furnished living room styled in warm, neutral tones. Curated decor and considered furniture give you an authentic lifestyle setting for portraits, couples, maternity and brand work, without the work of staging it yourself.',
    highlights: ['Fully furnished', 'Warm, neutral palette', 'Curated decor'],
    photo: slots.livingRoom,
    gallery: [
      { name: 'living-room-02', alt: 'Ladder shelf styled with books, plants and a bronze duck beside the living room TV' },
      { name: 'entry-01', alt: 'Entryway console with a snake plant, stacked books and a brass bowl beneath an abstract painting' },
    ],
  },
  {
    id: 'kitchen',
    status: 'available',
    title: 'Kitchen',
    kicker: 'Where lifestyle happens',
    summary: 'A modern kitchen with a large island, made for lifestyle, product and food-adjacent content.',
    description:
      'A modern kitchen anchored by a large island. It works as a natural gathering point for lifestyle sessions, a clean backdrop for product and brand content, and a convincing setting for everyday moments.',
    highlights: ['Modern finishes', 'Large island', 'Lifestyle and product friendly'],
    photo: slots.kitchen,
    gallery: [
      { name: 'kitchen-02', alt: 'Kitchen island at Studio 29' },
      { name: 'kitchen-03', alt: 'Kitchen detail at Studio 29' },
    ],
  },
  {
    id: 'dining-room',
    status: 'available',
    title: 'Dining Room',
    kicker: 'Set for the table',
    summary: 'A furnished dining room for editorial tablescapes, family portraits and brand moments.',
    description:
      'A furnished dining room that offers a different mood from the living spaces. Use it for styled table scenes, group portraits, or simply as another distinct location within the same booking.',
    highlights: ['Furnished', 'Group-friendly', 'A distinct second setting'],
    photo: slots.diningRoom,
    gallery: [],
  },
  {
    id: 'amenities',
    status: 'available',
    title: 'Additional Amenities',
    kicker: 'For your comfort',
    summary: 'Two bathrooms for guest convenience, so clients and crew stay comfortable.',
    description:
      'Two bathrooms are available for guest convenience, so clients, models and crew can freshen up or change between looks.',
    highlights: ['Two bathrooms for guests'],
    photo: slots.amenities,
    gallery: [],
  },
  // ---- Planned (not published). Flip status to 'available' when ready. ----
  {
    id: 'portrait-studio',
    status: 'planned',
    title: 'Portrait Studio',
    kicker: 'Upstairs',
    summary: '',
    description: '',
    highlights: [],
    photo: { name: 'portrait-studio-01', alt: '' },
    gallery: [],
  },
  {
    id: 'boudoir-suite',
    status: 'planned',
    title: 'Boudoir Suite',
    kicker: 'Private suite',
    summary: '',
    description: '',
    highlights: [],
    photo: { name: 'boudoir-suite-01', alt: '' },
    gallery: [],
  },
];

export const availableSpaces = spaces.filter((s) => s.status === 'available');
