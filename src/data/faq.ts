import { placeholder } from '@/config/site';

/** Booking process (descriptive only — no invented policies or turnaround times). */
export const bookingSteps = [
  { title: 'Send an inquiry', text: 'Share your date, the type of session and a few details about your project.' },
  { title: 'We review', text: 'We check the details against the studio calendar and reply to you directly.' },
  { title: 'Confirm your booking', text: 'Once confirmed, you receive the studio address and arrival information.' },
] as const;

/** Policies are placeholders until the owner provides them. */
export const policies = [
  { title: 'Deposits & payment', text: placeholder('Deposit and payment terms') },
  { title: 'Cancellations & rescheduling', text: placeholder('Cancellation policy') },
  { title: 'Studio guidelines', text: placeholder('House rules and care of the space') },
  { title: 'Insurance & liability', text: placeholder('Insurance requirements, if any') },
] as const;
