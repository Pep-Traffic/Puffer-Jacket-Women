import type { MetadataRoute } from "next";
import { colourOptionsFor, photoForCategory, products, stockedCategories } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Only pages that should appear in search results: the English pages, categories
// that have styles, and the guides. Translated pages are added once their text is
// translated. The bag and checkout are not listed. No change dates are given,
// because the build time is not the date a page changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, images?: string[]): MetadataRoute.Sitemap[number] => ({
    // The home page is written without a trailing slash, as its canonical is.
    url: absoluteUrl(path === "/" ? "" : path),
    ...(images ? { images: images.map(absoluteUrl) } : {}),
  });

  return [
    ...["/", "/shop", "/guide", "/size-guide", "/faq", "/about"].map((path) => page(path)),
    ...guides.map((g) => ({ ...page(`/guide/${g.slug}`, [g.image.src]), lastModified: g.updated })),
    ...stockedCategories().map((c) => page(`/category/${c.slug}`, [photoForCategory(c).src])),
    ...products.map((p) =>
      page(
        `/product/${p.slug}`,
        colourOptionsFor(p).flatMap((o) => o.photos.map((photo) => photo.src)),
      ),
    ),
  ];
}
