import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { faqGroups, faqs } from "@/lib/faq";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { FaqGroups } from "@/components/FaqList";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Puffer jacket questions",
  description:
    "Answers to common questions about puffer jackets: fill and warmth, fit and layering, care, caps and hats, accessories and shopping.",
  alternates: { canonical: "/faq" },
};

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

      <section className="container intro" aria-labelledby="faq-heading">
        <Reveal>
          <h1 id="faq-heading"><Split>Questions about puffer jackets</Split></h1>
          <p className="hero__lede">
            Short answers to the questions shoppers ask most about puffer jackets, vests, layers, caps and sizing.
            For the reasoning behind them, read the <Link href="/guide" className="textlink">buying guide</Link>.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <FaqGroups groups={faqGroups} />
          </Reveal>
        </div>
      </section>

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
