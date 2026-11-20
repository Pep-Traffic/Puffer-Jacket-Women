import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { categories, productsIn, products, photoForCategory } from "@/lib/catalog";
import { faqs } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompareTable from "@/components/CompareTable";
import PhotoFrame from "@/components/PhotoFrame";
import ProductCard from "@/components/ProductCard";
import SectionRail, { type RailItem } from "@/components/SectionRail";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "All puffer jackets for women",
  description:
    "Shop every puffer jacket for women: long sleeve and sleeveless puffers, short sleeve layers, caps, hats and accessories, with a short guide to each category.",
  alternates: { canonical: "/shop" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "All products", path: "/shop" },
];

const shopFaqs = faqs.slice(2, 7);

const railItems: RailItem[] = [
  { id: "compare", label: "Compare" },
  ...categories.map((c) => ({ id: c.slug, label: c.name })),
  { id: "shop-questions", label: "Questions" },
];

export default function ShopPage() {
  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="intro shop-hero" aria-labelledby="shop-heading">
        <div className="container">
          <Reveal className="shop-hero__copy">
            <h1 id="shop-heading"><Split>All puffer jackets for women</Split></h1>
            <p className="hero__lede">
              Every puffer jacket for women in one place: long sleeve, sleeveless, short sleeve, caps and hats, and
              accessories. Each group starts with a short guide to choosing that category.
            </p>
            <p className="shop-hero__count">
              <strong>{products.length} styles</strong> in {categories.length} categories. Apparel sizes run XS to XL.
              Prices are confirmed before launch.
            </p>
          </Reveal>

          <Stagger className="shop-tiles">
            {categories.map((c, i) => (
              <StaggerItem key={c.slug} className={`shop-tile${i < 2 ? " shop-tile--wide" : ""}`}>
                <a href={`#${c.slug}`} className="shop-tile__link">
                  <PhotoFrame photo={photoForCategory(c)} ratio="4 / 3" />
                  <span className="shop-tile__row">
                    <span className="shop-tile__name">{c.name}</span>
                    <span className="shop-tile__count">{productsIn(c.slug).length} styles</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SectionRail items={railItems} label="Jump to a category" />

      <section className="section section--tint shop-compare" id="compare" aria-labelledby="compare-heading">
        <div className="container shop-compare__grid">
          <Reveal className="shop-compare__intro">
            <h2 id="compare-heading"><Split>Compare puffer jackets for women by category</Split></h2>
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

      {categories.map((c, i) => {
        const list = productsIn(c.slug);
        const reverse = i % 2 === 1;
        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`section anchored shop-cat${reverse ? " shop-cat--reverse" : ""}${
              i % 2 === 0 ? " section--stone" : ""
            }`}
            aria-labelledby={`${c.slug}-heading`}
          >
            <div className="container shop-cat__layout">
              <Reveal className="shop-cat__media">
                <PhotoFrame photo={photoForCategory(c)} ratio="4 / 5" />
              </Reveal>

              <div className="shop-cat__body">
                <Reveal className="shop-cat__head">
                  <h2 id={`${c.slug}-heading`}><Split>{c.name}</Split></h2>
                  <p className="shop-cat__intro">{c.intro}</p>
                  <dl className="shop-cat__facts">
                    <div>
                      <dt>Best for</dt>
                      <dd>{c.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Styles</dt>
                      <dd>{list.length}</dd>
                    </div>
                    <div>
                      <dt>Sizes</dt>
                      <dd>{c.sizing === "apparel" ? "XS to XL" : "One size"}</dd>
                    </div>
                  </dl>
                  <Link href={`/category/${c.slug}`} className="textlink shop-cat__more">
                    About {c.name.toLowerCase()}
                  </Link>
                </Reveal>

                <Stagger className="shop-cat__items">
                  {list.map((product) => (
                    <StaggerItem key={product.slug}>
                      <ProductCard product={product} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section anchored" id="shop-questions" aria-labelledby="shop-questions-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="shop-questions-heading"><Split>Before you choose a puffer jacket</Split></h2>
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
