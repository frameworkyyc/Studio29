# Studio 29 — website

React + TypeScript + Tailwind (Vite). Static SPA served by a Cloudflare Worker (static assets), deployed with Wrangler.

```bash
npm install
npm run dev      # local
npm run build    # typecheck + build + sitemap/robots (set SITE_URL=https://your-domain)
npm run cf:preview  # run the built site + API locally in the Workers runtime
npm run deploy   # build + wrangler deploy (manual deploy)
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
To go live, set Worker secret `INQUIRY_WEBHOOK_URL` (Zapier/Make/n8n/email relay) and build variable `VITE_INQUIRY_ENDPOINT=/api/inquiry` (see `.env.example`, `worker/index.ts`).

## Booking architecture
Pages talk to `BookingProvider` (`src/lib/booking/types.ts`); today it is inquiry-only. Calendar, payments/deposits, confirmations, accounts and discount codes plug in behind that interface.

## Deploy (Cloudflare Workers Builds)
Config lives in `wrangler.jsonc` (static assets from `dist`, SPA fallback, Worker runs only for `/api/*`).
Dashboard > Workers & Pages > studio29 > Settings > Build:
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Non-production branch deploy command:** `npx wrangler versions upload`
- **Root directory:** `/`
- **Build variables:** `SITE_URL` and `VITE_SITE_URL` = your production URL (e.g. `https://studio29.ca`); optional `VITE_INQUIRY_ENDPOINT=/api/inquiry`
- The Worker name in the dashboard must match `name` in `wrangler.jsonc` (`studio29`).
- **Preview deploy command** (runs for every non-production branch): `npx wrangler versions upload`, or `npx wrangler preview` (open beta; needs the `previews` block already in `wrangler.jsonc`).
- Cloudflare runs the Production deploy command only for builds of the production branch (Settings > Build > Branch control). Builds of any other branch run the Preview command.
