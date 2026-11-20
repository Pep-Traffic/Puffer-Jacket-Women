import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/components/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const archivo = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
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
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader lang="en" />
          <main id="main">{children}</main>
          <SiteFooter lang="en" />
        </CartProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
