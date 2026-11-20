import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage, { generateMetadata as enGenerateMetadata } from "@/app/(en)/product/[slug]/page";
import { products } from "@/lib/catalog";
import { isLocale, translatedLocales } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/i18n-meta";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return translatedLocales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  const base = await enGenerateMetadata({ params: Promise.resolve({ slug }) });
  return localizedMetadata(base, lang, `/product/${slug}`);
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <ProductPage params={Promise.resolve({ slug })} />;
}
