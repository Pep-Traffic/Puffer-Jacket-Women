import Split from "@/components/Split";
import type { Metadata } from "next";
import { faqGroups } from "@/lib/faq";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompareTable from "@/components/CompareTable";
import JsonLd from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = pageMetadata({
  title: "Puffer jacket size guide for women",
  description:
    "How to measure for a women's puffer jacket or vest: bust, waist, hips and sleeve length, what to do between sizes, and fit notes by category.",
  path: "/size-guide",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Size guide", path: "/size-guide" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const steps = [
  {
    title: "Bust",
    body: "Measure around the fullest part of the chest, keeping the tape level under your arms.",
  },
  {
    title: "Waist",
    body: "Measure around the natural waistline, above the navel, while you stand relaxed.",
  },
  {
    title: "Hips",
    body: "Measure around the fullest part of the hips, with your feet together.",
  },
  {
    title: "Sleeve length",
    body: "Measure from the shoulder seam to the wrist, with your arm slightly bent.",
  },
];

const tips = [
  "Measure over the underwear or the thin top you will wear under the jacket.",
  "Stand straight and breathe out before you read the tape.",
  "Ask someone to help, so the tape stays level at the back.",
  "Write the numbers down and compare them with the chart, not with memory.",
];

export default function SizeGuidePage() {
  return (
    <>
      <div className="container crumb-row">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container intro" aria-labelledby="size-heading">
        <Reveal>
          <h1 id="size-heading"><Split>Puffer jacket size guide for women</Split></h1>
          <p className="hero__lede">
            Find your size in a puffer jacket for women by measuring over light clothing. Keep the tape level and snug without pulling it tight, then compare your
            measurements with the chart.
          </p>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="measure-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="measure-heading"><Split>Measure in four places</Split></h2>
          </Reveal>
          <Stagger className="steps-grid">
            {steps.map((step, i) => (
              <StaggerItem key={step.title} className="step-card">
                <span className="step-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="tips-heading">
        <div className="container two-col">
          <Reveal>
            <h2 id="tips-heading"><Split>Measuring tips</Split></h2>
            <ul className="checks">
              {tips.map((tip) => (
                <li key={tip}>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="between-heading"><Split>If you are between sizes</Split></h2>
            <p className="prose prose--small">
              Choose the larger size for layered pieces such as puffers, because they need room over a knit. Choose
              the smaller size for a short sleeve layer that you plan to wear close to the body, because it should lie
              flat under a coat.
            </p>
            <p className="prose prose--small">
              If you are still unsure, compare your measurements with a jacket you already own and like, rather than
              with the number on its label.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="fitcat-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="fitcat-heading"><Split>Fit by category</Split></h2>
            <p>What to check first in each category, and what to allow for underneath.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <CompareTable
              caption="Fit notes by category"
              columns={["Category", "Check first", "Allow for"]}
              rows={[
                ["Long sleeve", "Sleeve length with your arms lifted", "A fine knit or shirt underneath"],
                ["Sleeveless", "Armhole closeness and waistband length", "A shirt or knit under the vest"],
                ["Short sleeve", "Sleeve ends above the elbow", "A jacket or coat worn over it"],
                ["Caps and hats", "A snug fit above the ears", "Hair and any hood underneath"],
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="chart-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="chart-heading"><Split>Size chart</Split></h2>
            <p>The values below are placeholders until the final size chart is confirmed.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Bust (in)</th>
                    <th scope="col">Waist (in)</th>
                    <th scope="col">Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s) => (
                    <tr key={s}>
                      <th scope="row">{s}</th>
                      <td>To confirm</td>
                      <td>To confirm</td>
                      <td>To confirm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="size-questions-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="size-questions-heading"><Split>Questions about fit</Split></h2>
            <p className="muted-lede">The fit questions shoppers ask most often.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={faqGroups[1].items} />
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqGroups[1].items)} />
    </>
  );
}
