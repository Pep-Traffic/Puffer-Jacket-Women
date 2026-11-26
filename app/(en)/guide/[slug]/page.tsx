import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Split from "@/components/Split";
import { productBySlug, type Product } from "@/lib/catalog";
import { guideBySlug, guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompareTable from "@/components/CompareTable";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import ReadingProgress from "@/components/ReadingProgress";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guide/${guide.slug}`,
    image: guide.image,
    type: "article",
  });
}

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default async function GuideArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const path = `/guide/${guide.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Buying guide", path: "/guide" },
    { name: guide.title, path },
  ];
  const related = guide.products.map(productBySlug).filter((p): p is Product => Boolean(p));
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <ReadingProgress />
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="container guide-layout">
        <aside className="guide-toc" aria-label="On this page">
          <p className="guide-toc__title">On this page</p>
          <ol>
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.heading}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="guide">
          <h1>
            <Split>{guide.title}</Split>
          </h1>
          <p className="guide__byline">
            By{" "}
            <Link href="/about">Puffer Jacket Women</Link>
            {" · Updated "}
            <time dateTime={guide.updated}>{dateFormat.format(new Date(guide.updated))}</time>
          </p>
          <p className="guide__answer">{guide.answer}</p>

          {guide.table ? (
            <div className="guide__table">
              <CompareTable caption={guide.table.caption} columns={guide.table.columns} rows={guide.table.rows} />
            </div>
          ) : null}

          {guide.sections.map((s) => {
            const List = s.ordered ? "ol" : "ul";
            return (
              <section key={s.id} id={s.id} className="guide__section" aria-labelledby={`${s.id}-heading`}>
                <h2 id={`${s.id}-heading`}>{s.heading}</h2>
                {s.body?.map((p) => <p key={p}>{p}</p>)}
                {s.list ? (
                  <List className={`guide__list${s.ordered ? " guide__list--ordered" : ""}`}>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </List>
                ) : null}
                {s.after?.map((p) => <p key={p}>{p}</p>)}
              </section>
            );
          })}

          <section className="guide__section" aria-labelledby="more-guides-heading">
            <h2 id="more-guides-heading">More guides</h2>
            <ul className="guide__list">
              <li>
                <Link href="/guide">How to choose a puffer jacket for women</Link>
              </li>
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guide/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>

      {related.length > 0 ? (
        <section className="section section--stone" aria-labelledby="guide-products-heading">
          <div className="container">
            <div className="section-head">
              <h2 id="guide-products-heading">
                <Split>Styles mentioned in this guide</Split>
              </h2>
              <Link href="/shop" className="textlink">
                See the full range
              </Link>
            </div>
            <div className="grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.description,
          path,
          published: guide.published,
          updated: guide.updated,
          image: guide.image.src,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
