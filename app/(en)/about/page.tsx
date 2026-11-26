import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { apparelSizes, productsIn, stockedCategories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "About Puffer Jacket Women",
  description:
    "Who we are: a clothing store for women's puffer jackets and vests, preparing to open, with plain guides to fit, fill, layering and care.",
  path: "/about",
  absoluteTitle: true,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  const sizes = `${apparelSizes[0]} to ${apparelSizes[apparelSizes.length - 1]}`;

  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="container">
        <article className="guide">
          <h1>
            <Split>About Puffer Jacket Women</Split>
          </h1>
          <p className="guide__answer">
            Puffer Jacket Women is an online clothing store for women&apos;s puffer jackets and vests in sizes {sizes}.
            The store is preparing to open, and publishes plain advice on fit, fill, layering and care.
          </p>

          <section className="guide__section" aria-labelledby="range-heading">
            <h2 id="range-heading">What do we list?</h2>
            <ul className="guide__list">
              {stockedCategories().map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`}>{c.title}</Link>
                  : {productsIn(c.slug).length} styles.
                </li>
              ))}
            </ul>
            <p>Other categories on the site are marked as coming soon until they have styles to show.</p>
          </section>

          <section className="guide__section" aria-labelledby="advice-heading">
            <h2 id="advice-heading">How is our advice written?</h2>
            <p>
              The <Link href="/guide">buying guide</Link> and the articles under it explain general
              knowledge about puffer jackets: how fill and shells work, how a jacket should fit and how to look after
              it. We do not publish ratings, reviews or test results that we do not have.
            </p>
          </section>

          <section className="guide__section" aria-labelledby="status-heading">
            <h2 id="status-heading">What is still to be confirmed?</h2>
            <p>
              Prices, shell and fill details, the final size chart, delivery, returns and payment options will be
              published here before any order is taken.
            </p>
          </section>
        </article>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
