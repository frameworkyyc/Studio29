import { postForm } from '@/lib/submit';
import type { BookingProvider } from './types';

/** Initial provider: simple inquiry submission. Swap for a calendar/payments provider later. */
export const bookingProvider: BookingProvider = {
  submitInquiry: (inquiry) => postForm('booking', { ...inquiry }),
};
