import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopPage, { metadata as enMetadata } from "@/app/(en)/shop/page";
import { isLocale, translatedLocales } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/i18n-meta";

export function generateStaticParams() {
  return translatedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  return localizedMetadata(enMetadata, lang, "/shop");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <ShopPage />;
}
