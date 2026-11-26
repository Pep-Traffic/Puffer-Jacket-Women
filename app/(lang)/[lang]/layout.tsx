import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Newsreader, Noto_Sans_Arabic, Noto_Sans_Devanagari, Outfit } from "next/font/google";
import "../../globals.css";
import { CartProvider } from "@/components/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { dirOf, indexedLocales, isLocale, t, translatedLocales, type Locale } from "@/lib/i18n";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-ui", display: "swap" });
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-deva",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: "%s | Puffer Jacket Women",
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

// Only the translated languages are built. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return translatedLocales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang: raw } = await params;
  if (!isLocale(raw) || raw === "en") notFound();
  const lang = raw as Locale;

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${outfit.variable} ${serif.variable} ${arabic.variable} ${devanagari.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          {t(lang).skipLink}
        </a>
        <CartProvider>
          <SiteHeader lang={lang} />
          {/* Page text that is not translated yet is marked as English. */}
          <main id="main" lang={indexedLocales.includes(lang) ? undefined : "en"}>
            {children}
          </main>
          <SiteFooter lang={lang} />
        </CartProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
