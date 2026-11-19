import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Split from "@/components/Split";
import { notFound } from "next/navigation";
import {
  categoryBySlug,
  photoForProduct,
  productBySlug,
  products,
  productsIn,
  sizesFor,
} from "@/lib/catalog";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoFrame from "@/components/PhotoFrame";
import AddToBag from "@/components/AddToBag";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, SettleImage, Stagger, StaggerItem } from "@/components/Motion";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  const path = `/product/${product.slug}`;
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: path },
    openGraph: {
      title: product.name,
      description: product.summary,
      url: path,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  const category = product ? categoryBySlug(product.category) : undefined;
  if (!product || !category) notFound();

  const related = productsIn(category.slug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const questions = [
    {
      q: "What are the shell and fill?",
      a: "The shell fabric and the fill are confirmed before launch. They will appear in the specification table on this page.",
    },
    {
      q: "How does this style fit?",
      a: `Use the size guide and the fit notes for ${category.name.toLowerCase()}. Compare your measurements with a piece you already wear and like.`,
    },
    {
      q: "How should I store it?",
      a: "Store it loosely folded or hung. Avoid long periods compressed in a small bag, because that can flatten the fill.",
    },
  ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: category.name, path: `/category/${category.slug}` },
    { name: product.name, path: `/product/${product.slug}` },
  ];

  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container pdp" aria-label={product.name}>
        <SettleImage className="pdp__gallery">
          <PhotoFrame
            photo={photoForProduct(product)}
            ratio="4 / 5"
            priority
            caption="Stock photo. The product photograph replaces this before launch."
          />
        </SettleImage>

        <Reveal className="pdp__info" delay={0.1}>
          <p className="pdp__category">
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </p>
          <h1><Split>{product.name}</Split></h1>
          <p className="pdp__colour">{product.colour}</p>
          <div className="pdp__pricebox">
            <p className="pdp__price">Price to confirm</p>
            <p className="pdp__note">
              <Info size={16} aria-hidden="true" />
              Placeholder product. Price, materials and sizing are confirmed before launch.
            </p>
          </div>
          <p className="pdp__summary">{product.summary}</p>

          <AddToBag
            slug={product.slug}
            name={product.name}
            colour={product.colour}
            sizes={sizesFor(product.category)}
          />

          <dl className="specs">
            <dt>Shell</dt>
            <dd>To confirm</dd>
            <dt>Fill</dt>
            <dd>To confirm</dd>
            <dt>Care</dt>
            <dd>Follow the care label</dd>
            <dt>Sizing</dt>
            <dd>{category.sizing === "apparel" ? "XS to XL" : "One size"}</dd>
          </dl>

          <p className="pdp__links">
            <Link href="/size-guide" className="textlink">
              Size guide
            </Link>
            <Link href="/guide" className="textlink">
              Buying guide
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="section section--tint" aria-labelledby="details-heading">
        <div className="container prose-wide">
          <Reveal>
            <h2 id="details-heading"><Split>About this piece</Split></h2>
          </Reveal>
          <Reveal delay={0.05}>
            <details className="accordion" open>
              <summary>Details</summary>
              <p>
                {product.summary} Shell, fill and closure are confirmed before launch. This style sits in the{" "}
                {category.name.toLowerCase()} range, so you can compare it with the rest of the collection.
              </p>
            </details>
            <details className="accordion">
              <summary>Fit and layering</summary>
              <p>{category.paragraphs[2]}</p>
            </details>
            <details className="accordion">
              <summary>How to wear it</summary>
              {category.looks.map((look) => (
                <p key={look.title}>
                  <strong>{look.title}.</strong> {look.body}
                </p>
              ))}
            </details>
            <details className="accordion">
              <summary>Care</summary>
              <p>
                Follow the care label. As a general rule, wash gently, dry fully, and avoid long periods compressed in
                a bag.
              </p>
            </details>
            <details className="accordion">
              <summary>Delivery and returns</summary>
              <p>Delivery and return details are confirmed before launch. This section shows the final policy.</p>
            </details>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="product-questions-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="product-questions-heading"><Split>Questions about this style</Split></h2>
            <p className="muted-lede">Answers that apply to this piece while its details are being confirmed.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={questions} />
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section--stone" aria-labelledby="related-products-heading">
          <div className="container">
            <Reveal className="section-head">
              <h2 id="related-products-heading"><Split>More {category.name.toLowerCase()}</Split></h2>
              <Link href={`/category/${category.slug}`} className="textlink">
                See the full range
              </Link>
            </Reveal>
            <Stagger className="grid">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <JsonLd data={productSchema(product, category)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(questions)} />
    </>
  );
}
