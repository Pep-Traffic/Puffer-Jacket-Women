import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { notFound } from "next/navigation";
import {
  categoryBySlug,
  colourOptionsFor,
  photoForProduct,
  productBySlug,
  products,
  productsIn,
  sizesFor,
} from "@/lib/catalog";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";
import { guidesForProduct } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductPurchase from "@/components/ProductPurchase";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

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
  const sizeLine = categoryBySlug(product.category)?.sizing === "apparel" ? "Sizes XS to XL." : "One size.";
  return pageMetadata({
    title: `${product.name} for women`,
    description: `${product.summary} ${sizeLine} See photos, fit notes and care advice.`,
    path: `/product/${product.slug}`,
    image: photoForProduct(product),
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  const category = product ? categoryBySlug(product.category) : undefined;
  if (!product || !category) notFound();

  // The next three styles after this one, so every product receives links.
  const siblings = productsIn(category.slug);
  const position = siblings.findIndex((p) => p.slug === product.slug);
  const related = [...siblings.slice(position + 1), ...siblings.slice(0, position)].slice(0, 3);

  const { length, neck, front, pockets, quilting } = product.details;
  const colours = colourOptionsFor(product).map((o) => o.colour);
  const sizeRange = sizesFor(product.category);
  const guideLinks = guidesForProduct(product.slug);
  const hasHood = /\bhood\b/i.test(neck);

  const questions = [
    {
      q: `What length is the ${product.name}?`,
      a: `The ${product.name} is ${length === "Longline" ? "a longline coat" : `cut to the ${length.toLowerCase()}`}.`,
    },
    {
      q: `Does the ${product.name} have a hood?`,
      a: `${hasHood ? "Yes" : "No hood is listed for this style"}. Neckline: ${neck.toLowerCase()}.`,
    },
    {
      q: `How does the ${product.name} close, and what pockets does it have?`,
      a: `Front: ${front.toLowerCase()}. Pockets: ${pockets.toLowerCase()}.`,
    },
    {
      q: `What sizes and colours is the ${product.name} listed in?`,
      a: `It is listed in sizes ${sizeRange[0]} to ${sizeRange[sizeRange.length - 1]}, in ${colours.join(" and ").toLowerCase()}.`,
    },
    {
      q: "How should I store it?",
      a: "Store it loosely folded or hung. Avoid long periods compressed in a small bag, because that can flatten the fill.",
    },
    {
      q: "What are the shell and fill?",
      a: "The shell fabric and the fill are confirmed before launch. They will appear in the specification table on this page.",
      pending: true,
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

      <ProductPurchase
        slug={product.slug}
        name={product.name}
        summary={product.summary}
        categoryName={category.name}
        sizing={category.sizing}
        sizes={sizesFor(product.category)}
        options={colourOptionsFor(product)}
        stock={!product.photos?.length}
      />

      <section className="section section--tint" aria-labelledby="details-heading">
        <div className="container pdp-details">
          <Reveal className="pdp-details__head">
            <h2 id="details-heading"><Split>About this piece</Split></h2>
            <p className="muted-lede">
              Shell, fill, fit and care for this style. Items marked to confirm are finalised before launch.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="pdp-details__body">
            <p className="prose">
              {product.summary} It is a women&apos;s style in {colours.join(" and ").toLowerCase()}. Shell and fill are
              still to be confirmed.
            </p>
            <p className="prose">{category.paragraphs[2]}</p>
            {category.looks.map((look) => (
              <p className="prose" key={look.title}>
                <strong>{look.title}.</strong> {look.body}
              </p>
            ))}
            <dl className="specs">
              <dt>Colour</dt>
              <dd>{colours.join(", ")}</dd>
              <dt>Length</dt>
              <dd>{length}</dd>
              <dt>Collar or hood</dt>
              <dd>{neck}</dd>
              <dt>Front</dt>
              <dd>{front}</dd>
              <dt>Pockets</dt>
              <dd>{pockets}</dd>
              <dt>Quilting</dt>
              <dd>{quilting}</dd>
              <dt>Shell</dt>
              <dd>To confirm</dd>
              <dt>Fill</dt>
              <dd>To confirm</dd>
              <dt>Care</dt>
              <dd>Follow the care label</dd>
              <dt>Sizing</dt>
              <dd>{category.sizing === "apparel" ? "XS to XL" : "One size"}</dd>
            </dl>
            <p className="pdp-details__links">
              <Link href="/size-guide" className="textlink">
                Size guide
              </Link>
              <Link href="/guide" className="textlink">
                Buying guide
              </Link>
            </p>
            {guideLinks.length > 0 ? (
              <ul className="guide__list">
                {guideLinks.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guide/${g.slug}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
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
        <section className="section section--stone pdp-related" aria-labelledby="related-products-heading">
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
