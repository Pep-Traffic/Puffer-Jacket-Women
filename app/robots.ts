import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { translatedLocales } from "@/lib/i18n";

export const dynamic = "force-static";

// Search engines and AI assistants may read the catalogue, guides and FAQ.
// The bag and checkout, in every language, are private and stay out of crawls.
const privatePaths = [
  "/cart",
  "/checkout",
  ...translatedLocales.flatMap((l) => [`/${l}/cart`, `/${l}/checkout`]),
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
