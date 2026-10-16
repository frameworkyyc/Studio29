// Generates sitemap.xml + robots.txt in dist/ from SITE_URL (or VITE_SITE_URL).
import { writeFileSync } from 'node:fs';

const url = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '');
const paths = ['/', '/studio', '/gallery', '/bookings', '/about', '/contact'];

if (!url) {
  console.warn('[postbuild] SITE_URL not set — skipping sitemap. Set SITE_URL=https://your-domain for production builds.');
  writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\n');
} else {
  const body = paths.map((p) => `  <url><loc>${url}${p}</loc></url>`).join('\n');
  writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`);
}
