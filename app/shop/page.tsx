import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { categories, productsIn, products } from "@/lib/catalog";
import { faqs } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompareTable from "@/components/CompareTable";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Every product in the Puffer Jacket Women store: long-sleeve and sleeveless puffers, short-sleeve layers, caps, hats and accessories, grouped by category with a comparison.",
  alternates: { canonical: "/shop" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "All products", path: "/shop" },
];

const shopFaqs = faqs.slice(2, 7);

export default function ShopPage() {
  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container intro" aria-labelledby="shop-heading">
        <Reveal>
          <h1 id="shop-heading"><Split>All products</Split></h1>
          <p className="hero__lede">
            Every category in one place: long sleeve, sleeveless, short sleeve, caps and hats, and accessories.
            Each group starts with a short guide to choosing that category.
          </p>
          <nav aria-label="Jump to category" className="jump">
            {categories.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="jump__link">
                {c.name}
              </a>
            ))}
          </nav>
        </Reveal>
      </section>

      <section className="section section--tint" aria-labelledby="compare-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="compare-heading"><Split>Compare the categories</Split></h2>
            <p>
              Each category does a different job. Use this table to find the right starting point, then open the
              category for styling ideas and a fit checklist.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <CompareTable
              caption="Categories at a glance"
              columns={["Category", "Best for", "Styles"]}
              rows={categories.map((c) => [c.name, c.bestFor, String(productsIn(c.slug).length)])}
            />
          </Reveal>
        </div>
      </section>

      {categories.map((c, i) => (
        <section
          key={c.slug}
          id={c.slug}
          className={`section${i % 2 === 0 ? " section--stone" : ""}`}
          aria-labelledby={`${c.slug}-heading`}
        >
          <div className="container">
            <Reveal className="section-head">
              <div>
                <h2 id={`${c.slug}-heading`}><Split>{c.name}</Split></h2>
                <p className="muted section-head__lede">{c.intro}</p>
              </div>
              <Link href={`/category/${c.slug}`} className="textlink">
                About {c.name.toLowerCase()}
              </Link>
            </Reveal>
            <Stagger className="grid">
              {productsIn(c.slug).map((product) => (
                <StaggerItem key={product.slug}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="shop-questions-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="shop-questions-heading"><Split>Before you choose</Split></h2>
            <p className="muted-lede">The questions that come up most often when shoppers compare styles.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={shopFaqs} />
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema("All products", products)} />
      <JsonLd data={faqSchema(shopFaqs)} />
    </>
  );
}
