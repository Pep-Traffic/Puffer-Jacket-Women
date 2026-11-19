"use client";

import Link from "next/link";
import { useState } from "react";
import { Handbag, List, X } from "@phosphor-icons/react";
import { categories } from "@/lib/catalog";
import { useCart } from "./CartProvider";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label="Puffer Jacket Women, home">
          <strong>Puffer Jacket</strong> Women
        </Link>

        <nav id="main-nav" className="nav" aria-label="Main">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              onClick={() => setOpen(false)}
            >
              {c.name}
            </Link>
          ))}
          <Link href="/guide" onClick={() => setOpen(false)}>
            Guide
          </Link>
        </nav>

        <div className="header-actions">
          <Link href="/cart" className="bag-link" aria-label={`Bag, ${count} items`}>
            <Handbag size={20} weight="regular" aria-hidden="true" />
            <span className="bag-link__count">{count}</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
