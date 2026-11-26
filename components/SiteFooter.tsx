import Link from "next/link";
import {
  ArrowsClockwise,
  Clock,
  EnvelopeSimple,
  Headset,
  LockSimple,
  MapPin,
  Package,
  PhoneCall,
} from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";
import { localePath, t, type Locale } from "@/lib/i18n";
import FooterMark from "./FooterMark";
import NewsletterForm from "./NewsletterForm";
import BrandMark from "./BrandMark";
import LocaleSelects from "./LocaleSelects";

// Official brand marks, each in its brand colour.
const socials = [
  { key: "instagram", label: "Instagram", mark: "instagram" },
  { key: "facebook", label: "Facebook", mark: "facebook" },
  { key: "youtube", label: "YouTube", mark: "youtube" },
  { key: "pinterest", label: "Pinterest", mark: "pinterest" },
] as const;

// Payment marks. Show only the methods the store actually accepts.
const paymentMarks = ["visa", "mastercard", "paypal", "applepay"] as const;

export default function SiteFooter({ lang = "en" }: { lang?: Locale }) {
  const s = t(lang);
  const year = new Date().getFullYear();
  const L = (path: string) => localePath(lang, path);

  // Only details that have been supplied are shown.
  const contactLines = [
    { icon: PhoneCall, text: site.contact.phone as string },
    { icon: Clock, text: site.contact.hours as string },
    { icon: MapPin, text: site.contact.address as string },
  ].filter((line) => line.text);

  const features = [
    { icon: LockSimple, title: s.featCheckoutTitle, body: s.featCheckoutBody },
    { icon: ArrowsClockwise, title: s.featReturnsTitle, body: s.featReturnsBody },
    { icon: Package, title: s.featShipTitle, body: s.featShipBody },
    { icon: Headset, title: s.featFitTitle, body: s.featFitBody },
  ];

  const columns = [
    {
      title: s.colShop,
      links: [
        { href: L("/shop"), label: s.linkAll },
        ...categories.map((c) => ({
          href: L(`/category/${c.slug}`),
          label: s.categories[c.slug as keyof typeof s.categories],
        })),
      ],
    },
    {
      title: s.colCare,
      links: [
        { href: `mailto:${site.contactEmail}`, label: s.linkContact },
        { href: L("/faq"), label: s.linkQuestions },
        { href: L("/size-guide"), label: s.linkSize },
        { href: L("/cart"), label: s.linkBag },
      ],
    },
    {
      title: s.colInfo,
      links: [
        { href: L("/guide"), label: s.linkGuide },
        // The About page exists in English only.
        { href: "/about", label: s.linkAbout },
        { href: L("/checkout"), label: s.linkCheckout },
        { href: L("/"), label: s.home },
      ],
    },
  ];

  return (
    <footer className="ft">
      <div className="container">
        <section className="ft-join" aria-labelledby="join-heading">
          <div className="ft-join__brand">
            <img src="/brand/logo-640.webp" alt="Puffer Jacket Women logo" width={640} height={169} loading="lazy" />
          </div>
          <div className="ft-join__copy">
            <h2 id="join-heading">{s.joinHeading}</h2>
            <p>{s.joinBody}</p>
          </div>
          <NewsletterForm lang={lang} />
        </section>

        <div className="ft__main">
          <div className="ft__col ft__brand">
            <p className="ft__brand-name">{site.name}</p>
            <p className="ft__brand-body">
              Women&apos;s puffer jackets and vests, with plain advice on fit, fill, layering and care.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="ft__col">
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("mailto:") ? (
                      <a href={l.href}>{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <ul className="ft__features">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon size={30} aria-hidden="true" />
              <span>
                <span className="ft__feature-title">{title}</span>
                <span className="ft__feature-body">{body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="ft__contact" aria-label="Contact">
          <p>
            <EnvelopeSimple size={18} aria-hidden="true" />
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
          {contactLines.map(({ icon: Icon, text }) => (
            <p key={text}>
              <Icon size={18} aria-hidden="true" />
              <span>{text}</span>
            </p>
          ))}
        </div>

        <div className="ft__bar">
          <p className="ft__copy">{s.copyright.replace("{year}", String(year)).replace("{name}", site.name)}</p>

          <div className="ft__payments">
            <span className="ft__payments-label">{s.paymentsLabel}</span>
            <ul aria-hidden="true">
              {paymentMarks.map((mark) => (
                <li key={mark}>
                  <BrandMark name={mark} size={30} />
                </li>
              ))}
            </ul>
          </div>

          <ul className="ft__socials" aria-label={s.socialsLabel}>
            {socials.map(({ key, label, mark }) => {
              const url: string = site.socials[key];
              return (
                <li key={key}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <BrandMark name={mark} size={22} />
                    </a>
                  ) : (
                    <span aria-hidden="true" title={`${label} link added before launch`}>
                      <BrandMark name={mark} size={22} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <LocaleSelects lang={lang} />
        </div>

        <FooterMark />
      </div>
    </footer>
  );
}
