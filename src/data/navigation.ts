export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'The Studio', to: '/studio' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Bookings', to: '/bookings' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export const bookCta = { label: 'Book the Studio', to: '/bookings#inquiry' } as const;
