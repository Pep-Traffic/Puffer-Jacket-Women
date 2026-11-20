import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { notFound } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import {
  categories,
  categoryBySlug,
  photoForCategory,
  productsIn,
} from "@/lib/catalog";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import PhotoFrame from "@/components/PhotoFrame";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, SettleImage, Stagger, StaggerItem } from "@/components/Motion";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  const path = `/category/${cat.slug}`;
  return {
    title: cat.title,
    description: cat.intro,
    alternates: { canonical: path },
    openGraph: { title: cat.title, description: cat.intro, url: path },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const list = productsIn(cat.slug);
  const related = categories.filter((c) => c.slug !== cat.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: cat.name, path: `/category/${cat.slug}` },
  ];

  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container category-hero" aria-labelledby="category-heading">
        <Reveal className="category-hero__copy" y={18}>
          <h1 id="category-heading"><Split>{cat.title}</Split></h1>
          <p className="hero__lede">{cat.intro}</p>
          <p className="category-hero__best">
            <span>Best for</span> {cat.bestFor}
          </p>
          <ul className="checks checks--compact">
            {cat.tips.map((tip) => (
              <li key={tip}>
                <CheckCircle size={20} aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <SettleImage className="category-hero__media">
          <PhotoFrame photo={photoForCategory(cat)} ratio="4 / 5" priority />
        </SettleImage>
      </section>

      <section className="section" aria-labelledby="about-heading">
        <div className="container prose-wide">
          <Reveal>
            <h2 id="about-heading"><Split>About {cat.name.toLowerCase()} for women</Split></h2>
          </Reveal>
          {cat.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="prose">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="looks-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="looks-heading"><Split>Ways to wear {cat.name.toLowerCase()}</Split></h2>
            <p>Three simple combinations to start from. Swap in the colours and trousers you already own.</p>
          </Reveal>
          <Stagger className="looks">
            {cat.looks.map((look) => (
              <StaggerItem key={look.title} className="look">
                <h3>{look.title}</h3>
                <p>{look.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="checklist-heading">
        <div className="container two-col">
          <Reveal className="panel">
            <h2 id="checklist-heading"><Split>Before you buy</Split></h2>
            <ul className="checks">
              {cat.checklist.map((item) => (
                <li key={item}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="panel panel--ink">
            <h2 id="materials-heading"><Split>Materials and care</Split></h2>
            <p className="prose prose--small">{cat.materials}</p>
            <Link href="/guide#care" className="textlink">
              Care basics in the guide
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="products-heading">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="products-heading"><Split>{cat.name} styles</Split></h2>
            <span className="muted">
              {list.length} styles. {cat.sizing === "apparel" ? "Sizes XS to XL." : "One size."}
            </span>
          </Reveal>
          <Stagger className="grid">
            {list.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="faq-heading"><Split>{cat.name} questions</Split></h2>
            <p className="muted-lede">Answers to the questions shoppers ask about this category.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={cat.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="related-heading">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="related-heading"><Split>Keep building the outfit</Split></h2>
          </Reveal>
          <Stagger className="related">
            {related.map((c) => (
              <StaggerItem key={c.slug}>
                <Link href={`/category/${c.slug}`} className="related__link">
                  <span className="related__name">{c.name}</span>
                  <span className="related__intro">{c.intro}</span>
                  <span className="textlink">Shop {c.name.toLowerCase()}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(cat.title, list)} />
      <JsonLd data={faqSchema(cat.faqs)} />
    </>
  );
}
