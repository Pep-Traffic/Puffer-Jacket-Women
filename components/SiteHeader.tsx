"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowsClockwise,
  CaretDown,
  Handbag,
  Heart,
  List,
  MagnifyingGlass,
  Question,
  Ruler,
  Truck,
  X,
} from "@phosphor-icons/react";
import {
  categories,
  categoryBySlug,
  productBySlug,
  products,
  productsIn,
  type Product,
} from "@/lib/catalog";
import { swatchFor } from "@/lib/swatch";
import { SAVED_EVENT, readSaved } from "@/lib/saved";
import { useCart } from "./CartProvider";

// One panel is open at a time, below the header row.
type Panel =
  | { kind: "menu" }
  | { kind: "category"; slug: string }
  | { kind: "search" }
  | { kind: "saved" }
  | null;

function isSamePanel(a: Panel, b: Panel): boolean {
  if (!a || !b) return false;
  if (a.kind !== b.kind) return false;
  return a.kind !== "category" || a.slug === (b as { slug: string }).slug;
}

// Short service notes. Each one is true today: nothing here promises a price,
// a shipping threshold or a payment provider that has not been chosen.
const notes = [
  { icon: Ruler, text: "Fit guidance on every page" },
  { icon: Truck, text: "Shipping confirmed at checkout" },
  { icon: ArrowsClockwise, text: "Returns policy shown before you pay" },
  { icon: Question, text: "Questions? Read the FAQ", href: "/faq" },
];

export default function SiteHeader() {
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const { count } = useCart();
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const searchField = useRef<HTMLInputElement>(null);

  // Saved pieces: read this browser's list and follow changes made elsewhere.
  useEffect(() => {
    const sync = () => setSavedSlugs(readSaved());
    sync();
    window.addEventListener(SAVED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SAVED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Escape and a click outside the header close the open panel.
  useEffect(() => {
    if (!panel) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPanel(null);
    }
    function onPointer(event: PointerEvent) {
      if (header.current && !header.current.contains(event.target as Node)) setPanel(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [panel]);

  // Opening search puts the cursor in the search field.
  useEffect(() => {
    if (panel?.kind === "search") searchField.current?.focus();
  }, [panel]);

  // Going to a new page closes whatever was open.
  useEffect(() => {
    setPanel(null);
    setQuery("");
  }, [pathname]);

  function toggle(next: Panel) {
    setPanel((current) => (isSamePanel(current, next) ? null : next));
  }

  // Hovering a category opens its panel, on fine pointers only.
  function hoverCategory(slug: string) {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setPanel({ kind: "category", slug });
    }
  }

  const openCategory = panel?.kind === "category" ? categoryBySlug(panel.slug) : undefined;

  const q = query.trim().toLowerCase();
  const results: Product[] = q
    ? products
        .filter((p) =>
          [p.name, p.colour, p.summary, categoryBySlug(p.category)?.name ?? ""].some((value) =>
            value.toLowerCase().includes(q),
          ),
        )
        .slice(0, 8)
    : [];

  const savedProducts = savedSlugs
    .map((slug) => productBySlug(slug))
    .filter((p): p is Product => p !== undefined);

  return (
    <>
      <div className="topbar">
        <ul className="topbar__list">
          {notes.map(({ icon: Icon, text, href }) => (
            <li key={text} className="topbar__item">
              <Icon size={18} aria-hidden="true" />
              {href ? <Link href={href}>{text}</Link> : <span>{text}</span>}
            </li>
          ))}
        </ul>
      </div>

      <header
        ref={header}
        className="site-header"
        onMouseLeave={() => setPanel((p) => (p?.kind === "category" ? null : p))}
        onBlur={(event) => {
          if (!header.current?.contains(event.relatedTarget as Node | null)) setPanel(null);
        }}
      >
        <div className="container site-header__inner">
          {/* Logo slot: the logo goes here. The space is kept until it is added. */}
          <Link href="/" className="logo-slot" aria-label="Puffer Jacket Women, home" />

          <nav className="nav" aria-label="Main">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              Home
            </Link>
            {categories.map((c) => {
              const isOpen = panel?.kind === "category" && panel.slug === c.slug;
              return (
                <div key={c.slug} className="nav-item">
                  <Link
                    href={`/category/${c.slug}`}
                    aria-current={pathname === `/category/${c.slug}` ? "page" : undefined}
                    onMouseEnter={() => hoverCategory(c.slug)}
                    onFocus={() => setPanel({ kind: "category", slug: c.slug })}
                  >
                    {c.name}
                  </Link>
                  <button
                    type="button"
                    className="nav-item__toggle"
                    aria-label={`Show ${c.name.toLowerCase()} styles`}
                    aria-expanded={isOpen}
                    aria-controls="header-panel"
                    onClick={() => toggle({ kind: "category", slug: c.slug })}
                  >
                    <CaretDown size={14} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/shop" className="header-pill">
              Shop all
            </Link>
            <button
              type="button"
              className="icon-btn"
              aria-label="Search"
              aria-expanded={panel?.kind === "search"}
              aria-controls="header-panel"
              onClick={() => toggle({ kind: "search" })}
            >
              <MagnifyingGlass size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label={`Saved pieces, ${savedSlugs.length}`}
              aria-expanded={panel?.kind === "saved"}
              aria-controls="header-panel"
              onClick={() => toggle({ kind: "saved" })}
            >
              <Heart size={22} aria-hidden="true" />
              <span className="icon-btn__badge" aria-hidden="true">
                {savedSlugs.length}
              </span>
            </button>
            <Link href="/cart" className="icon-btn" aria-label={`Bag, ${count} items`}>
              <Handbag size={22} aria-hidden="true" />
              <span className="icon-btn__badge" aria-hidden="true">
                {count}
              </span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={panel?.kind === "menu"}
              aria-controls="header-panel"
              onClick={() => toggle({ kind: "menu" })}
            >
              {panel?.kind === "menu" ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
              <span className="sr-only">{panel?.kind === "menu" ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>

        {panel ? (
          <div id="header-panel" className={`header-panel header-panel--${panel.kind}`}>
            <div className="container header-panel__inner">
              {panel.kind === "menu" ? (
                <nav className="drop-menu" aria-label="Mobile">
                  <Link href="/">Home</Link>
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  ))}
                  <Link href="/shop">Shop all</Link>
                  <Link href="/guide">Guide</Link>
                  <Link href="/faq">Questions</Link>
                </nav>
              ) : null}

              {panel.kind === "category" && openCategory ? (
                <>
                  <div className="drop-head">
                    <h2 className="drop-title">{openCategory.name}</h2>
                    <Link href={`/category/${openCategory.slug}`} className="textlink">
                      Shop all {openCategory.name.toLowerCase()}
                    </Link>
                  </div>
                  <ul className="drop-grid">
                    {productsIn(openCategory.slug).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/product/${p.slug}`}>
                          <span className="drop-swatch" style={{ ["--sw" as string]: swatchFor(p.colour) }} aria-hidden="true" />
                          <span className="drop-name">{p.name}</span>
                          <span className="drop-meta">{p.colour}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {panel.kind === "search" ? (
                <>
                  <label className="search-field">
                    <span className="sr-only">Search styles, colours and categories</span>
                    <input
                      ref={searchField}
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search styles, colours or categories"
                      autoComplete="off"
                    />
                  </label>
                  {!q ? (
                    <p className="drop-empty">Type a style, a colour or a category to start.</p>
                  ) : results.length === 0 ? (
                    <p className="drop-empty">No styles match “{query.trim()}”. Try a colour or a category.</p>
                  ) : (
                    <ul className="drop-grid">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/product/${p.slug}`}>
                            <span className="drop-swatch" style={{ ["--sw" as string]: swatchFor(p.colour) }} aria-hidden="true" />
                            <span className="drop-name">{p.name}</span>
                            <span className="drop-meta">
                              {p.colour} · {categoryBySlug(p.category)?.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : null}

              {panel.kind === "saved" ? (
                savedProducts.length === 0 ? (
                  <p className="drop-empty">
                    No saved pieces yet. Use the heart on a product page to keep one here.
                  </p>
                ) : (
                  <ul className="drop-grid">
                    {savedProducts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/product/${p.slug}`}>
                          <span className="drop-swatch" style={{ ["--sw" as string]: swatchFor(p.colour) }} aria-hidden="true" />
                          <span className="drop-name">{p.name}</span>
                          <span className="drop-meta">{p.colour}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              ) : null}
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
