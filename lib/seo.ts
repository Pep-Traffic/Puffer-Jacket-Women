import { absoluteUrl, site } from "./site";
import { colourOptionsFor, sizesFor, type Category, type Product } from "./catalog";
import type { FaqItem } from "./faq";

// Structured data builders. Product data carries no Offer and no rating
// while prices and reviews do not exist: nothing invented is marked up.

const storeId = `${site.url}/#store`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": storeId,
    name: site.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl("/brand/logo.png"),
    image: absoluteUrl("/brand/logo.png"),
    ...(Object.values(site.socials).some(Boolean)
      ? { sameAs: Object.values(site.socials).filter(Boolean) }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": storeId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product, category: Category) {
  const url = absoluteUrl(`/product/${product.slug}`);
  const options = colourOptionsFor(product);
  const { length, neck, front, pockets, quilting } = product.details;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.summary,
    url,
    image: options.flatMap((o) => o.photos.map((p) => absoluteUrl(p.src))),
    color: options.map((o) => o.colour).join(", "),
    category: category.name,
    size: sizesFor(product.category),
    brand: { "@type": "Brand", name: site.name },
    audience: { "@type": "PeopleAudience", suggestedGender: "female" },
    additionalProperty: [
      ["Length", length],
      ["Collar or hood", neck],
      ["Front closure", front],
      ["Pockets", pockets],
      ["Quilting", quilting],
    ].map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
  };
}

export function itemListSchema(name: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: absoluteUrl(`/product/${product.slug}`),
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  image: string;
}) {
  const url = absoluteUrl(article.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(article.image),
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: "en-US",
    author: { "@type": "Organization", "@id": storeId, name: site.name, url: absoluteUrl("/about") },
    publisher: { "@id": storeId },
  };
}

// Answers that still wait on a store decision are shown to visitors but are not
// offered to search engines or assistants as answers.
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => !item.pending)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };
}
