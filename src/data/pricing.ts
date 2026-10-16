/**
 * PRICING — EDITABLE PLACEHOLDERS. Rates are not finalised.
 * To publish a rate, set `price` (e.g. '$00 / hour') and leave `published: true`.
 * While `price` is null the UI shows a "Rate to be confirmed" placeholder.
 * Add `deposit`, `discounts`, etc. here later when the booking system grows.
 */
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string | null;
  unit?: string;
  includes: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'hourly',
    name: 'Hourly Rental',
    description: '[Placeholder] Short sessions, portraits and content days.',
    price: null,
    unit: 'per hour',
    includes: ['[Minimum booking length — to be confirmed]', 'Access to all available rooms'],
  },
  {
    id: 'half-day',
    name: 'Half Day',
    description: '[Placeholder] A longer window for multi-look or multi-room shoots.',
    price: null,
    unit: 'per half day',
    includes: ['[Hours included — to be confirmed]', 'Access to all available rooms'],
  },
  {
    id: 'full-day',
    name: 'Full Day',
    description: '[Placeholder] Commercial productions and campaign work.',
    price: null,
    unit: 'per day',
    includes: ['[Hours included — to be confirmed]', 'Access to all available rooms'],
  },
];

export const pricingNote =
  'Rates, deposits and studio policies are being finalised. Send an inquiry and we will reply with current information.';
