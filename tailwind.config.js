/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F2EC',
        beige: '#E8E1D7',
        charcoal: '#292723',
        taupe: '#A99B8A',
        // Darker taupe for small text on ivory (meets AA contrast).
        'taupe-deep': '#6F6457',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond Variable"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.22em' },
      maxWidth: { page: '88rem' },
      transitionTimingFunction: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
