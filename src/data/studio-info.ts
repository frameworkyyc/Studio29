import { placeholder } from '@/config/site';

/** General studio information. `value: null` renders as an editable placeholder. */
export interface InfoRow {
  label: string;
  value: string | null;
  placeholder?: string;
}

export const studioInfo: InfoRow[] = [
  { label: 'Type of space', value: 'Residential photography and content creation space' },
  { label: 'Location', value: 'Creekstone, Calgary, Alberta' },
  { label: 'Address', value: 'Shared with confirmed bookings only' },
  { label: 'Spaces available', value: 'Living room, kitchen, dining room, two bathrooms' },
  { label: 'Booking', value: 'By inquiry' },
  { label: 'Parking & access', value: null, placeholder: placeholder('Parking and access details') },
  { label: 'Maximum group size', value: null, placeholder: placeholder('Maximum attendees') },
  { label: 'Hours of operation', value: null, placeholder: placeholder('Available hours') },
  { label: 'Power, Wi-Fi & lighting notes', value: null, placeholder: placeholder('Technical details') },
];

export const amenities: string[] = [
  'Fully furnished living room',
  'Modern kitchen with a large island',
  'Furnished dining room',
  'Two bathrooms for guest convenience',
];
