# Puffer Jacket Women

Premium women's outerwear store for pufferjacketwomen.com, built with Next.js 16 as a static export.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Build for deployment

```powershell
npm run build
```

The build writes plain files to `out/`. Upload that folder to any static host (Vercel, Netlify, Cloudflare Pages or your own server) and point pufferjacketwomen.com at it.

## Before launch

- **Products, prices and photos are placeholders.** Edit `lib/catalog.ts`. Prices stay `null` until real ones are confirmed, and no price, rating or stock level is ever invented.
- **Photos.** Replace the placeholder frames in `components/PlaceholderFrame.tsx` with real product images.
- **Specifications.** Fill in the "To confirm" values for shell, fill and sizing on the product page and in the size chart (`app/size-guide/page.tsx`).
- **Brand name.** Change `lib/site.ts` if the display name changes. Metadata, the sitemap, robots and llms.txt all read from it.
- **Checkout.** The bag works, but checkout is UI only. Connect a payment provider before taking orders; `app/checkout/page.tsx` is where the provider goes.
- **Structured data.** Product Offer and rating data are left out on purpose. Add them only once the price and reviews are real.

## SEO and AEO

- Per-page titles, descriptions, canonical URLs and Open Graph tags.
- JSON-LD: Organization, WebSite, BreadcrumbList, ItemList, Product and FAQPage.
- `sitemap.xml` and `robots.txt` (AI crawlers are allowed; the bag and checkout are excluded).
- `llms.txt` for AI assistants and answer engines.

## Design

The design system is recorded in `DESIGN.md`, with its machine-readable sidecar in `.impeccable/design.json`.
