export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const productionTypes = [
  'Lifestyle photography',
  'Couples / engagement',
  'Maternity',
  'Personal branding',
  'Commercial / product',
  'Content creation (video / social)',
  'Fashion / editorial',
  'Boudoir',
  'Other',
] as const;

export const durations = ['1 hour', '2 hours', '3 hours', '4 hours', 'Half day', 'Full day', 'Not sure yet'] as const;

export type BookingField =
  | 'fullName' | 'email' | 'business' | 'productionType' | 'date' | 'startTime' | 'duration' | 'attendees' | 'details';

export interface BookingValues {
  fullName: string; email: string; business: string; productionType: string; date: string;
  startTime: string; duration: string; attendees: string; details: string;
}

export const emptyBooking: BookingValues = {
  fullName: '', email: '', business: '', productionType: '', date: '', startTime: '', duration: '', attendees: '', details: '',
};

export const todayISO = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export function validateBooking(v: BookingValues): Errors<BookingField> {
  const e: Errors<BookingField> = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.productionType) e.productionType = 'Please choose a type of session.';
  if (!v.date) e.date = 'Please choose a preferred date.';
  else if (v.date < todayISO()) e.date = 'Please choose a date that has not passed.';
  if (!v.startTime) e.startTime = 'Please choose a preferred start time.';
  if (!v.duration) e.duration = 'Please choose an estimated duration.';
  const n = Number(v.attendees);
  if (!v.attendees || !Number.isInteger(n) || n < 1 || n > 99) e.attendees = 'Please enter the number of attendees (1–99).';
  if (v.details.length > 3000) e.details = 'Please keep details under 3,000 characters.';
  return e;
}

export type ContactField = 'fullName' | 'email' | 'topic' | 'message';
export interface ContactValues { fullName: string; email: string; topic: string; message: string }
export const emptyContact: ContactValues = { fullName: '', email: '', topic: '', message: '' };
export const contactTopics = ['Booking question', 'Collaboration', 'Featuring my work', 'General inquiry'] as const;

export function validateContact(v: ContactValues): Errors<ContactField> {
  const e: Errors<ContactField> = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your name.';
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.topic) e.topic = 'Please choose a topic.';
  if (v.message.trim().length < 10) e.message = 'Please write a short message (at least 10 characters).';
  if (v.message.length > 3000) e.message = 'Please keep your message under 3,000 characters.';
  return e;
}
