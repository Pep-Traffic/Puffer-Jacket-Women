import Link from "next/link";
import { ArrowRight, ArrowUpRight, Handbag, Question, Ruler, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";
import FooterMark from "./FooterMark";
import BackToTop from "./BackToTop";

const services = [
  { href: "/size-guide", title: "Size guide", body: "Measure once and compare before you order.", icon: Ruler },
  { href: "/guide", title: "Buying guide", body: "Warmth, fill, fit and layering, explained.", icon: BookOpenText },
  { href: "/faq", title: "Questions", body: "Short answers to what shoppers ask first.", icon: Question },
  { href: "/cart", title: "Your bag", body: "Review your pieces before checkout.", icon: Handbag },
];

const columns = [
  {
    title: "Shop",
    links: [...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name })), { href: "/shop", label: "All products" }],
  },
  {
    title: "Guides",
    links: [
      { href: "/guide", label: "Buying guide" },
      { href: "/size-guide", label: "Size guide" },
      { href: "/faq", label: "Questions" },
    ],
  },
  {
    title: "Store",
    links: [
      { href: "/", label: "Home" },
      { href: "/cart", label: "Bag" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft">
      <div className="container">
        <ul className="ft__services">
          {services.map(({ href, title, body, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="ft__service">
                <Icon size={26} aria-hidden="true" />
                <span className="ft__service-title">{title}</span>
                <span className="ft__service-body">{body}</span>
                <ArrowUpRight size={18} className="ft__service-arrow" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="ft__main">
          <div className="ft__brand">
            <Link href="/" className="ft__logo" aria-label={`${site.name}, home`}>
              <strong>Puffer Jacket</strong> Women
            </Link>
            <p>
              Women&apos;s puffer jackets, vests, short sleeve layers, caps, hats and accessories, with fit and fill
              explained on every page.
            </p>
            <Link href="/shop" className="ft__cta">
              Shop the collection <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="ft__col">
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <span>{l.label}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <FooterMark />

        <div className="ft__bar">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Photography by Burst by Shopify. Products and prices are placeholders until launch.</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
