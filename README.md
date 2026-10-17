# Studio 29 — website

React + TypeScript + Tailwind (Vite). Static SPA, deploys to Cloudflare Pages.

```bash
npm install
npm run dev      # local
npm run build    # typecheck + build + sitemap/robots (set SITE_URL=https://your-domain)
```

## 1. Add your photos and logo (needed before launch)
No images were available when this was built, so every photo slot shows a labelled placeholder.
Drop files in and they appear automatically, with no code changes:

| File (src/assets/photos) | Used for |
|---|---|
| `hero.jpg` | Homepage + Studio page hero |
| `intro.jpg`, `about.jpg`, `booking-cta.jpg` | Home intro, About, booking CTA |
| `living-room-01/02/03`, `kitchen-01/02/03`, `dining-room-01/02`, `bathroom-01` | Rooms + gallery |

- Logos are installed in `src/assets/logo` (transparent PNGs: wordmark, lockup with tagline, S|29 roundel, each in dark and light). Replace with SVGs of the same names for crisper output.
- Export WebP/JPG at most 2400px wide, ~300 KB each. Update alt text in `src/data/photos.ts` and `gallery.ts` to describe each photo.
- Replace `public/og-default.png` (1200×630) with a photo-based share image if desired.

## 2. Edit content (`src/data`, `src/config`)
- `config/site.ts`: name, Instagram, email/phone (null until supplied)
- `data/spaces.ts`: rooms. The upstairs studio and boudoir suite exist as `status: 'planned'` (hidden). Set `'available'` and add copy/photos to launch them.
- `data/pricing.ts`, `data/faq.ts` (policies), `data/studio-info.ts`: placeholders render as dashed "to be confirmed" tags until filled.
- `data/gallery.ts`: non-interior images require `approved: true` **and** a `credit`.

## 3. Connect the forms
Forms never claim delivery without a real backend. Without one they show "Not sent" and offer copy-to-clipboard plus Instagram.
To go live on Cloudflare Pages, set secret `INQUIRY_WEBHOOK_URL` (Zapier/Make/n8n/email relay) and build var `VITE_INQUIRY_ENDPOINT=/api/inquiry` (see `.env.example`, `functions/api/inquiry.ts`).

## Booking architecture
Pages talk to `BookingProvider` (`src/lib/booking/types.ts`); today it is inquiry-only. Calendar, payments/deposits, confirmations, accounts and discount codes plug in behind that interface.

## Deploy (Cloudflare Pages)
Build command `npm run build`, output `dist`, env `SITE_URL` + `VITE_SITE_URL`. SPA routing via `public/_redirects`.
