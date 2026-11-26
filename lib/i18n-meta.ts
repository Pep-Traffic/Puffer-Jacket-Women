import type { Metadata } from "next";
import { indexedLocales, localePath, t, type Locale } from "./i18n";
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

// Metadata for a page in one language: the title and description are written in
// that language where they exist. A language whose page text is translated is
// canonical to itself and lists its sister versions. Until then the English page
// is the canonical one, because the content is the same.
export function localizedMetadata(base: Metadata, lang: Locale, path: string): Metadata {
  const translated = indexedLocales.includes(lang);
  const canonical = translated ? localePath(lang, path) : path;
  let languages: Record<string, string> | undefined;
  if (translated) {
    languages = { "x-default": path };
    for (const l of indexedLocales) languages[l] = localePath(l, path);
  }
  const key = pageKeys[path];
  const copy = key ? t(lang).pageMeta[key] : undefined;
  return {
    ...base,
    ...(copy ? { title: { absolute: `${copy.title} | ${site.name}` }, description: copy.description } : {}),
    alternates: {
      ...base.alternates,
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      ...base.openGraph,
      ...(copy ? { title: `${copy.title} | ${site.name}`, description: copy.description } : {}),
      url: canonical === "/" ? site.url : canonical,
    },
  };
}
