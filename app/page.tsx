import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import {
  ArrowRight,
  CheckCircle,
  CloudRain,
  Drop,
  Hand,
  Leaf,
  Ruler,
  Snowflake,
  Sun,
  Thermometer,
  Wind,
} from "@phosphor-icons/react/dist/ssr";
import { categories, photoForCategory, products } from "@/lib/catalog";
import { photos } from "@/lib/images";
import { faqs } from "@/lib/faq";
import { glossary } from "@/lib/glossary";
import { faqSchema } from "@/lib/seo";
import FeaturedCard from "@/components/FeaturedCard";
import PhotoFrame from "@/components/PhotoFrame";
import JsonLd from "@/components/JsonLd";
import Marquee from "@/components/Marquee";
import { type Layer } from "@/components/LayerStack";
import LayerStory from "@/components/LayerStory";
import Glossary from "@/components/Glossary";
import HeroReel from "@/components/HeroReel";
import FitRequest from "@/components/FitRequest";
import DayPlanner from "@/components/DayPlanner";
import DetailZoom from "@/components/DetailZoom";
import ScrollRow from "@/components/ScrollRow";
import { FaqList } from "@/components/FaqList";
import { DrawLine, Reveal, SettleImage, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: { absolute: "Puffer Jackets for Women | Puffer Jacket Women" },
  description:
    "Shop women's puffer jackets, sleeveless puffer vests, short-sleeve layers, caps, hats and accessories. Fit, fill, materials and layering guidance on every page.",
  alternates: { canonical: "/" },
};

const layers: Layer[] = [
  {
    name: "Base layer",
    title: "Start close to the skin",
    body: "A short sleeve layer or a fine knit keeps warmth close to the body without adding bulk.",
    photo: photos.shortSleeve,
  },
  {
    name: "Middle layer",
    title: "Add a vest and keep your arms free",
    body: "A sleeveless puffer over a shirt or knit warms the core while your arms stay free to move.",
    photo: photos.longSleevePark,
  },
  {
    name: "Outer layer",
    title: "Finish with a long puffer",
    body: "A long sleeve puffer handles wind, snow and long walks. Add a hood when the weather turns.",
    photo: photos.longSleeveTrench,
  },
];

const useCases = [
  {
    icon: <CloudRain size={26} aria-hidden="true" />,
    title: "Wet commutes",
    body: "A hooded long sleeve puffer with a water-resistant shell keeps light rain off on the way to work.",
    href: "/guide#shell",
    label: "Read about shells and closures",
    photo: photos.longSleevePark,
    position: "50% 30%",
  },
  {
    icon: <Snowflake size={26} aria-hidden="true" />,
    title: "Snow days",
    body: "A long puffer coat with a drawcord hood, worn with a knit cap and a scarf, covers the cold spells.",
    href: "/category/long-sleeve",
    label: "Shop long sleeve",
    photo: photos.longSleeveTrench,
    position: "50% 40%",
  },
  {
    icon: <Wind size={26} aria-hidden="true" />,
    title: "Windy walks",
    body: "A close weave and a high collar block the wind. A beanie keeps the ears warm when the gusts pick up.",
    href: "/category/caps-hats",
    label: "Shop caps and hats",
    photo: photos.capsPortrait,
    position: "50% 30%",
  },
  {
    icon: <Sun size={26} aria-hidden="true" />,
    title: "Mild mornings",
    body: "A short sleeve layer under an open jacket works from breakfast through to the afternoon.",
    href: "/category/short-sleeve",
    label: "Shop short sleeve",
    photo: photos.shortSleeve,
    position: "50% 35%",
  },
];

const materials = [
  {
    title: "Nylon",
    pattern: "diagonal",
    chips: ["Wind protection", "Packable"],
    body: "A smooth, light fabric with a tight weave. Nylon shells suit wind protection and packable designs.",
    icon: <Wind size={26} aria-hidden="true" />,
  },
  {
    title: "Polyester",
    pattern: "grid",
    chips: ["Holds its shape", "Dries quickly"],
    body: "Holds its shape, resists stretching and dries quickly. A common choice for everyday puffers and vests.",
    icon: <Drop size={26} aria-hidden="true" />,
  },
  {
    title: "Cotton blends",
    pattern: "weave",
    chips: ["Soft on skin", "Check the care label"],
    body: "Softer against the skin and common in casual layers and knits. Cotton holds water for longer, so check the care label.",
    icon: <Leaf size={26} aria-hidden="true" />,
  },
  {
    title: "Knit and wool blends",
    pattern: "rib",
    chips: ["Warm for its weight", "Beanies and scarves"],
    body: "Used in beanies, scarves and gloves. Thick knits hold the most warmth for their weight.",
    icon: <Hand size={26} aria-hidden="true" />,
  },
];

const steps = [
  {
    title: "Choose the sleeve length",
    body: "Long sleeve for full cover, sleeveless for layering, short sleeve for mild weather.",
  },
  {
    title: "Match the warmth to your weather",
    body: "A heavier fill and a longer cut suit snow. A lighter piece suits cool days and layering.",
  },
  {
    title: "Check the fit before you layer",
    body: "Try it over the knit you will wear most. It should close without pulling, and the sleeves should reach your wrist.",
  },
];

const careItems = [
  "Read the care label before the first wash.",
  "Wash down-filled pieces gently, on a cool setting.",
  "Dry them fully, with clean dryer balls, to restore the loft.",
  "Store the jacket loosely, not compressed for months.",
];

const sizingItems = [
  "Bust: around the fullest part of the chest.",
  "Waist: around the natural waistline.",
  "Sleeve length: from the shoulder seam to the wrist.",
];

const guideLinks = [
  { href: "/guide#weather", title: "Choose by weather", body: "Match the warmth to the coldest day you expect." },
  { href: "/guide#fill", title: "Fill and fill power", body: "What the numbers on a label mean for warmth." },
  { href: "/guide#fit", title: "Fit checks", body: "Four quick tests to run in the fitting room." },
  { href: "/guide#care", title: "Care for the loft", body: "How to wash and dry a puffer so it keeps its shape." },
];

const journalPhotos = [photos.longSleevePark, photos.longSleeveTrench, photos.capsWood, photos.accessoriesKnit];

const details = [
  { title: "Baffle stitching", body: "Even channels keep the fill spread out, so there are no cold spots.", x: 44, y: 70 },
  { title: "Collar and hood", body: "A high collar or a drawcord hood closes the gap where wind gets in.", x: 52, y: 37 },
  { title: "Cuffs and hem", body: "Elastic or a drawcord seals the edges, so warm air stays inside.", x: 67, y: 77 },
  { title: "Zip and storm flap", body: "A flap behind the zip blocks wind along the front closure.", x: 50, y: 60 },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const homeFaqs = faqs.slice(0, 6);

  return (
    <>
      <section className="container hero" aria-labelledby="hero-heading">
        <Reveal className="hero__copy" y={18}>
          <h1 id="hero-heading">
            <strong>Puffer jackets</strong> for women, <span className="hero__accent">built for the cold.</span>
          </h1>
          <p className="hero__lede">
            Long sleeve, sleeveless, short sleeve, caps and accessories, with fit and fill explained on every page.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn">
              Shop the collection
            </Link>
            <Link href="/size-guide" className="btn btn--ghost">
              Check your size
            </Link>
          </div>
          <ul className="chips" aria-label="Shop by category">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <HeroReel
          slides={[
            { src: "/videos/lux-1.mp4", poster: "/videos/lux-1.jpg", label: "Long sleeve", alt: "Woman in a mustard puffer jacket on a forest path. Long sleeve puffer jackets." },
            { src: "/videos/lux-2.mp4", poster: "/videos/lux-2.jpg", label: "Caps and hats", alt: "Woman in a dark cap and wool coat in falling snow. Caps, hats and scarves." },
            { src: "/videos/lux-3.mp4", poster: "/videos/lux-3.jpg", label: "Short sleeve", alt: "Woman in a striped knit top and grey shorts. Light short sleeve layers." },
          ]}
        />
      </section>

      <Marquee
        items={[
          "Long sleeve",
          "Sleeveless",
          "Short sleeve",
          "Caps and hats",
          "Accessories",
          "Layering",
          "Fill and warmth",
          "Fit guide",
        ]}
      />

      <section className="section" aria-labelledby="categories-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="categories-heading"><Split>Shop by category</Split></h2>
            <p>
              Five categories in one wardrobe. Start with the piece you need most, then add the layers around it.
            </p>
          </Reveal>
          <ul className="cats">
            {categories.map((c) => {
              const photo = photoForCategory(c);
              return (
                <li key={c.slug} className="cat">
                  <Link href={`/category/${c.slug}`} className="cat__link">
                    <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
                    <span className="cat__panel">
                      <span className="cat__name">{c.name}</span>
                      <span className="cat__more">
                        <span className="cat__intro">{c.intro}</span>
                        <span className="cat__cta">
                          Shop {c.name.toLowerCase()} <ArrowRight size={16} aria-hidden="true" />
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="usecases-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="usecases-heading"><Split>Dress for the day ahead</Split></h2>
            <p>
              Start with what the day will bring. Each case below points to the pieces and the guide sections that
              fit it best.
            </p>
          </Reveal>
          <DayPlanner items={useCases} />
        </div>
      </section>

      <section className="section" aria-labelledby="detail-heading">
        <div className="container">
          <DetailZoom photo={photos.heroYellowPuffer} details={details}>
            <h2 id="detail-heading">
              <Split>Look closely at a puffer jacket</Split>
            </h2>
            <p className="muted-lede">Four details that tell you how a puffer will wear. Check them on any jacket.</p>
          </DetailZoom>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="layers-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="layers-heading"><Split>Layer for the weather</Split></h2>
            <p>Three layers do most of the work. Start from the base and build up.</p>
          </Reveal>
          <LayerStory layers={layers} />
        </div>
      </section>

      <section className="section" aria-labelledby="materials-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="materials-heading"><Split>What shell fabrics are made of</Split></h2>
            <p>
              The shell is the first thing wind and rain meet. These are the fabrics you will see most often, and what
              each one does well.
            </p>
          </Reveal>
          <ul className="fabrics">
            {materials.map((m) => (
              <li key={m.title} className={`fabric fabric--${m.pattern}`} tabIndex={0}>
                <span className="fabric__icon">{m.icon}</span>
                <div className="fabric__text">
                  <h3>{m.title}</h3>
                  <div className="fabric__more">
                    <div>
                      <p>{m.body}</p>
                      <ul className="fabric__chips">
                        {m.chips.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="featured-heading"><Split>Featured pieces</Split></h2>
            <Link href="/shop" className="textlink">
              Shop all products
            </Link>
          </Reveal>
          <Stagger className="featured">
            {featured.map((product, i) => (
              <StaggerItem key={product.slug} className={`featured__cell featured__cell--${i + 1}`}>
                <FeaturedCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
          <p className="featured__note">Photographs are stock images until product photography is added.</p>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="warmth-heading">
        <div className="container">
          <div className="warm">
            <Reveal className="warm__text">
              <h2 id="warmth-heading"><Split>What warmth really depends on</Split></h2>
            <p>
              Insulation works by trapping still air. The more air a fill holds for its weight, the warmer a jacket
              feels at a given weight.
            </p>
            <p>
              Fill power measures how much space one ounce of down takes up once it has loft. A higher number means
              more loft for less weight. Synthetic fills are rated by weight instead.
            </p>
            <Link href="/guide#fill" className="textlink">
              Read the full guide
            </Link>
            </Reveal>
            <Reveal delay={0.1} className="warm__photo">
              <PhotoFrame photo={photos.accessoriesKnit} ratio="4 / 3" />
            </Reveal>
          </div>
          <Stagger className="warm__facts">
            <StaggerItem className="warm__fact">
              <Snowflake size={28} aria-hidden="true" />
              <h3>Warmth comes from trapped air</h3>
              <p>Stitched channels keep the fill evenly spread, so there are no cold spots.</p>
            </StaggerItem>
            <StaggerItem className="warm__fact">
              <Thermometer size={28} aria-hidden="true" />
              <h3>Match the fill to your weather</h3>
              <p>A lighter jacket suits cool days. A heavier one suits snow and long time outdoors.</p>
            </StaggerItem>
            <StaggerItem className="warm__fact">
              <Ruler size={28} aria-hidden="true" />
              <h3>A close fit keeps the air in</h3>
              <p>Gaps at the cuffs and hem let warm air out, so check the fit before you layer.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="glossary-heading">
        <div className="container">
          <Glossary items={glossary}>
            <Reveal>
              <h2 id="glossary-heading"><Split>Words you will see on a label</Split></h2>
              <p className="muted-lede">Short definitions of the terms used on product pages and in the buying guide.</p>
            </Reveal>
          </Glossary>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="steps-heading">
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="steps-heading"><Split>Three decisions before you buy</Split></h2>
          </Reveal>
          <div className="steps">
            <DrawLine className="steps__line" />
            <Stagger className="steps__list">
              {steps.map((step) => (
                <StaggerItem key={step.title} className="step">
                  <span className="step__icon" aria-hidden="true">
                    <CheckCircle size={22} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="care-heading">
        <div className="container two-col">
          <Reveal className="panel">
            <h2 id="care-heading"><Split>Care that keeps the loft</Split></h2>
            <ul className="checks">
              {careItems.map((item) => (
                <li key={item}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="panel panel--ink">
            <h2 id="sizing-heading"><Split>Size in three measurements</Split></h2>
            <ul className="checks">
              {sizingItems.map((item) => (
                <li key={item}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/size-guide" className="textlink">
              Open the size guide
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="questions-heading">
        <div className="container faq-layout">
          <Reveal>
            <h2 id="questions-heading"><Split>Questions about puffer jackets</Split></h2>
            <p className="muted-lede">Short answers to the questions shoppers ask first.</p>
            <Link href="/faq" className="textlink">
              All questions
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={homeFaqs} />
          </Reveal>
        </div>
        <JsonLd data={faqSchema(homeFaqs)} />
      </section>

      <section className="section" aria-labelledby="guide-heading">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="guide-heading"><Split>The buying guide</Split></h2>
            <Link href="/guide" className="textlink">
              Read the full guide
            </Link>
          </Reveal>
          <Stagger className="journal">
            {guideLinks.map((item, i) => (
              <StaggerItem key={item.href} className="journal__card">
                <Link href={item.href}>
                  <PhotoFrame photo={journalPhotos[i]} ratio="4 / 3" />
                  <span className="journal__title">{item.title}</span>
                  <span className="journal__body">{item.body}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="fit-heading">
        <div className="container fit">
          <Reveal className="fit__intro">
            <h2 id="fit-heading"><Split>Get a fit recommendation</Split></h2>
            <p>
              Tell us your height, usual size and the weather you dress for. We reply with the cut and fill that suit
              you.
            </p>
            <ul className="checks">
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>A personal reply, not an automated list</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Advice on fit over your usual layers</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <FitRequest />
          </Reveal>
        </div>
      </section>

      <section className="closing closing--ink" aria-labelledby="closing-heading">
        <div className="container closing__grid">
          <Reveal>
            <h2 id="closing-heading"><Split>Find the layer for tomorrow&apos;s weather</Split></h2>
            <p>Every category in one store. Start with a puffer, then add the vest, the cap or the scarf.</p>
            <div className="closing__actions">
              <Link href="/shop" className="btn">
                Shop all products
              </Link>
              <Link href="/guide" className="textlink">
                Read the buying guide
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="closing__photo">
            <PhotoFrame photo={photos.capsWood} ratio="4 / 3" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
