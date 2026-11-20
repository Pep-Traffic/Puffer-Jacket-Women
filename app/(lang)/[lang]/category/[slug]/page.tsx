import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage, { generateMetadata as enGenerateMetadata } from "@/app/(en)/category/[slug]/page";
import { categories } from "@/lib/catalog";
import { isLocale, translatedLocales } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/i18n-meta";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return translatedLocales.flatMap((lang) => categories.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  const base = await enGenerateMetadata({ params: Promise.resolve({ slug }) });
  return localizedMetadata(base, lang, `/category/${slug}`);
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <CategoryPage params={Promise.resolve({ slug })} />;
}
