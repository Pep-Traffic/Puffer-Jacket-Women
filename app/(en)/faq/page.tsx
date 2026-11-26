import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { faqGroups, faqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FaqTopics from "@/components/FaqTopics";

export const metadata: Metadata = pageMetadata({
  title: "Puffer jacket questions for women",
  description:
    "Answers to common questions about puffer jackets for women: warmth, waterproofing, sizing, layering, washing and drying, orders and returns.",
  path: "/faq",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Questions", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="faq-hero" aria-labelledby="faq-heading">
        <img className="faq-hero__photo" src="/brand/mountains.webp" alt="" width={1600} height={546} />
        <div className="faq-hero__copy">
          <p className="faq-hero__label">FAQ</p>
          <h1 id="faq-heading"><Split>Frequently Asked Questions</Split></h1>
          <p className="faq-hero__lede">
            Quick answers about puffer jackets for women: fill, fit, care, sizing, orders and returns.
          </p>
        </div>
      </section>

      <section className="container faq-page" aria-label="Questions by topic">
        <FaqTopics groups={faqGroups} />
        <p className="faq-page__guide">
          For the reasoning behind these answers, read the <Link href="/guide" className="textlink">buying guide</Link>.
        </p>
      </section>

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
