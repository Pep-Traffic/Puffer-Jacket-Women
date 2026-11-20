import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { breadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompareTable from "@/components/CompareTable";
import JsonLd from "@/components/JsonLd";
import ReadingProgress from "@/components/ReadingProgress";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Puffer jacket buying guide for women",
  description:
    "How to choose a puffer jacket for women: weather, fill and fill power, shell fabric, sleeve length, fit, layering with vests and caps, care and common mistakes.",
  alternates: { canonical: "/guide" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Buying guide", path: "/guide" },
];

const sections = [
  { id: "weather", title: "Start with the weather" },
  { id: "fill", title: "Fill: down or synthetic" },
  { id: "shell", title: "Shell fabric and closure" },
  { id: "cut", title: "Sleeve length and cut" },
  { id: "layering", title: "Layering with vests and short sleeves" },
  { id: "head", title: "Caps, hats and scarves" },
  { id: "fit", title: "Check the fit" },
  { id: "care", title: "Care that keeps the loft" },
  { id: "mistakes", title: "Common mistakes to avoid" },
  { id: "value", title: "Where to spend" },
];

const fitChecks = [
  "It closes over a knit without pulling at the shoulders.",
  "The sleeves reach your wrist with your arms at your sides, and stay put when you lift them.",
  "The hem covers your waistband when you sit down.",
  "You can move your arms freely without the jacket riding up.",
];

const careChecks = [
  "Read the care label before the first wash.",
  "Wash down-filled pieces gently, on a cool setting.",
  "Dry them fully, with clean dryer balls, so the fill does not clump.",
  "Store the jacket loosely folded, not compressed for long periods.",
];

const mistakes = [
  "Buying one size too small, which leaves no room for a knit underneath.",
  "Checking the length with your arms at your sides only, and not when you lift them.",
  "Choosing a light jacket for a long day outdoors, where wind and cold add up.",
  "Drying a puffer on high heat, which can damage the fill and the shell.",
  "Wearing a sleeveless vest on the coldest day without a long layer over the arms.",
];

export default function GuidePage() {
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
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="guide">
          <Reveal>
            <h1><Split>How to choose a puffer jacket for women</Split></h1>
            <p className="hero__lede">
              A practical guide to warmth, fill, fit and layering, for women's puffer jackets, vests, short sleeve layers, caps and
              accessories.
            </p>
          </Reveal>

          <Reveal>
            <section id="weather" className="guide__section" aria-labelledby="weather-heading">
              <h2 id="weather-heading"><Split>Start with the weather</Split></h2>
              <p>
                Decide what the jacket needs to do before you look at styles. A commute on wet city streets needs a
                hood and a water-resistant shell. A long walk in deep snow needs more fill and a longer cut. A mild
                spring needs a light piece that folds into a bag.
              </p>
              <p>
                Most people reach for the same jacket in every season. Choose the warmth for the coldest weather you
                expect, and layer for the rest.
              </p>
              <div className="guide__table">
                <CompareTable
                  caption="Quick picks by weather"
                  columns={["Weather", "Start with", "Add"]}
                  rows={[
                    ["Mild and dry", "A short sleeve layer", "A vest or a light knit"],
                    ["Cool and breezy", "A sleeveless puffer or a long sleeve jacket", "A fine knit underneath"],
                    ["Cold and dry", "A long sleeve puffer with a fuller fill", "A knit cap and a scarf"],
                    ["Wet and windy", "A hooded puffer with a water-resistant shell", "A beanie and gloves"],
                    ["Snow", "A long puffer coat with a drawcord hood", "A warm knit cap, scarf and gloves"],
                  ]}
                />
              </div>
              <p>
                For a full range to compare, open the{" "}
                <Link href="/category/long-sleeve" className="textlink">
                  long sleeve range
                </Link>
                , or the{" "}
                <Link href="/category/sleeveless" className="textlink">
                  sleeveless vests
                </Link>{" "}
                for lighter days.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="fill" className="guide__section" aria-labelledby="fill-heading">
              <h2 id="fill-heading"><Split>Fill: down or synthetic</Split></h2>
              <p>
                Down is light and compresses small, and it holds its loft in dry cold. Its warmth depends on the fill
                power. A higher fill power means more loft for the same weight. Synthetic fills are rated by weight,
                keep some warmth when damp, and are often easier to wash.
              </p>
              <p>
                Neither fill is better in every case. Choose down for cold, dry days and light packing. Choose
                synthetic for wet weather or frequent washing. The fill is only part of the warmth, so the cut and the
                fit matter just as much.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="shell" className="guide__section" aria-labelledby="shell-heading">
              <h2 id="shell-heading"><Split>Shell fabric and closure</Split></h2>
              <p>
                The shell is the outer fabric. A tight weave helps against wind. A water-resistant finish sheds light
                rain, but it is not the same as waterproof, which resists sustained rain with sealed seams.
              </p>
              <p>
                The zip, snaps and drawcords matter as much as the fabric. A zip that closes to the chin and a hem that
                cinches keep the warm air where it belongs. Check that each closure runs smoothly before you decide.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="cut" className="guide__section" aria-labelledby="cut-heading">
              <h2 id="cut-heading"><Split>Sleeve length and cut</Split></h2>
              <p>
                Sleeve length changes how much cover you get. A long sleeve puffer covers the wrists, which matters in
                wind. A cropped cut sits above the waist and balances high-waisted trousers. A long coat covers the hips
                for the coldest days.
              </p>
              <p>
                Lift your arms when you try a jacket on. The sleeve should stay over your wrist, and the body should not
                ride up.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="layering" className="guide__section" aria-labelledby="layering-heading">
              <h2 id="layering-heading"><Split>Layering with vests and short sleeves</Split></h2>
              <p>
                Layering is the most flexible way to stay warm. Start with a close-fitting base, add a sleeveless puffer
                for the core, and finish with a long jacket if the weather turns. A vest keeps the body warm without
                bulk at the arms.
              </p>
              <p>
                A short sleeve layer works under a coat on mild days, and it is easy to take off indoors. See the{" "}
                <Link href="/category/short-sleeve" className="textlink">
                  short sleeve layers
                </Link>{" "}
                for styling ideas.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="head" className="guide__section" aria-labelledby="head-heading">
              <h2 id="head-heading"><Split>Caps, hats and scarves</Split></h2>
              <p>
                Your head and neck lose heat quickly. A knit beanie covers the ears and suits cold days. A quilted cap
                keeps the wind off your face. A thick knit scarf adds warmth at the neck, and a printed silk scarf adds
                colour without weight.
              </p>
              <p>
                See the{" "}
                <Link href="/category/caps-hats" className="textlink">
                  caps and hats
                </Link>{" "}
                and the{" "}
                <Link href="/category/accessories" className="textlink">
                  accessories
                </Link>
                .
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="fit" className="guide__section" aria-labelledby="fit-heading">
              <h2 id="fit-heading"><Split>Check the fit</Split></h2>
              <p>Run these four checks in the fitting room, wearing the knit you will wear most.</p>
              <ul className="checks">
                {fitChecks.map((item) => (
                  <li key={item}>
                    <CheckCircle size={20} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="care" className="guide__section" aria-labelledby="care-heading">
              <h2 id="care-heading"><Split>Care that keeps the loft</Split></h2>
              <p>
                The loft is the thickness of the fill, and it is what traps the warm air. Care decides how well it
                holds.
              </p>
              <ul className="checks">
                {careChecks.map((item) => (
                  <li key={item}>
                    <CheckCircle size={20} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="mistakes" className="guide__section" aria-labelledby="mistakes-heading">
              <h2 id="mistakes-heading"><Split>Common mistakes to avoid</Split></h2>
              <ul className="checks">
                {mistakes.map((item) => (
                  <li key={item}>
                    <CheckCircle size={20} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="value" className="guide__section" aria-labelledby="value-heading">
              <h2 id="value-heading"><Split>Where to spend</Split></h2>
              <p>
                Spend first on fit and fill. A well-fitted jacket with a clear shell and a warm fill serves better than
                a fashionable cut that does not close properly. Accessories are a good place to add colour without
                changing the core layers.
              </p>
              <p>
                Words such as fill power, loft and water-resistant appear on most labels. The definitions are on the{" "}
                <Link href="/#glossary-heading" className="textlink">
                  home page
                </Link>
                .
              </p>
            </section>
          </Reveal>

          <Reveal>
            <p className="guide__next">
              Still deciding? Read the <Link href="/faq" className="textlink">questions page</Link>, check the{" "}
              <Link href="/size-guide" className="textlink">size guide</Link>, or browse the{" "}
              <Link href="/shop" className="textlink">full range</Link>.
            </p>
          </Reveal>
        </article>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
