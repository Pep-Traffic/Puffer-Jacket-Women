import type { Metadata } from "next";
import { locales, localePath, t, type Locale } from "./i18n";
import { site } from "./site";

type PageKey = "home" | "shop" | "guide" | "sizeGuide" | "faq" | "cart" | "checkout";

const pageKeys: Record<string, PageKey> = {
  "/": "home",
  "/shop": "shop",
  "/guide": "guide",
  "/size-guide": "sizeGuide",
  "/faq": "faq",
  "/cart": "cart",
  "/checkout": "checkout",
};

// Gives a page its own address in one language: canonical points at that
// language's address, every language version is listed for search engines, and
// the title and description are written in that language where they exist.
export function localizedMetadata(base: Metadata, lang: Locale, path: string): Metadata {
  const languages: Record<string, string> = { "x-default": path };
  for (const l of locales) languages[l] = localePath(l, path);
  const key = pageKeys[path];
  const copy = key ? t(lang).pageMeta[key] : undefined;
  return {
    ...base,
    ...(copy ? { title: { absolute: `${copy.title} | ${site.name}` }, description: copy.description } : {}),
    alternates: {
      ...base.alternates,
      canonical: localePath(lang, path),
      languages,
    },
    openGraph: {
      ...base.openGraph,
      ...(copy ? { title: `${copy.title} | ${site.name}`, description: copy.description } : {}),
      url: localePath(lang, path),
    },
  };
}
