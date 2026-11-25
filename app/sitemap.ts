import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";
import { locales, localePath, translatedLocales, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

// The English home page is written without a trailing slash, as its canonical is.
function addressFor(lang: Locale, path: string): string {
  const local = localePath(lang, path);
  return absoluteUrl(local === "/" ? "" : local);
}

// Every public page is listed in each language it exists in, with links to its
// other language versions. The bag and checkout are not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/shop", "/guide", "/size-guide", "/faq"];
  const paths = [
    ...staticPages,
    ...categories.map((c) => `/category/${c.slug}`),
    ...products.map((p) => `/product/${p.slug}`),
  ];
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const priority = path === "/" ? 1 : path.startsWith("/product/") ? 0.8 : path.startsWith("/category/") ? 0.9 : 0.7;
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = addressFor(l, path);
    for (const lang of ["en", ...translatedLocales] as Locale[]) {
      entries.push({
        url: addressFor(lang, path),
        lastModified,
        changeFrequency: "weekly",
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
