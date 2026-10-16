/**
 * Booking architecture seam.
 *
 * Today the site runs an INQUIRY-ONLY flow: a form posts to `site.inquiryEndpoint`
 * (see ./inquiry-provider.ts). The UI talks to the `BookingProvider` interface,
 * never to a vendor, so later upgrades slot in behind it without touching pages:
 *
 *   getAvailability  -> live availability calendar
 *   createCheckout   -> online payments / booking deposits
 *   (confirmations, cancellations, accounts, discount codes) -> server-side,
 *   triggered from the provider once a booking record exists.
 *
 * Methods other than `submitInquiry` are intentionally optional and unused today.
 */
export interface BookingInquiry {
  fullName: string;
  email: string;
  business?: string;
  productionType: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  duration: string;
  attendees: number;
  details?: string;
  /** Which space(s) — reserved for when upstairs studio / suite open. */
  spaceIds?: string[];
  /** Reserved for future use. */
  discountCode?: string;
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string };

export interface BookingProvider {
  submitInquiry(inquiry: BookingInquiry): Promise<SubmitResult>;
  getAvailability?(range: { from: string; to: string }): Promise<{ date: string; available: boolean }[]>;
  createCheckout?(inquiryId: string): Promise<{ url: string }>;
}
