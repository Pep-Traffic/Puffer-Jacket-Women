"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, Ruler, Truck, ArrowsClockwise, Drop, Check } from "@phosphor-icons/react";
import { useCart } from "./CartProvider";

type Props = {
  slug: string;
  name: string;
  colour: string;
  sizes: string[];
};

// Swatch colours for the colour names used in the catalogue. Only the
// product's own colour is offered: no colours are invented.
const SWATCH: Record<string, string> = {
  Black: "#121212",
  Ink: "#1d1f24",
  Oxblood: "#5a1a24",
  Stone: "#cfc8bd",
  Navy: "#1f2a44",
  Olive: "#5b5d3a",
  Ivory: "#f1ece1",
  Oat: "#d8c9ad",
};

export default function AddToBag({ slug, name, colour, sizes }: Props) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  // Saved pieces live only in this browser.
  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("pjw-saved") || "[]") as string[];
      setSaved(list.includes(slug));
    } catch {
      /* storage unavailable: start unsaved */
    }
  }, [slug]);

  function toggleSave() {
    const next = !saved;
    setSaved(next);
    try {
      const list = new Set(JSON.parse(localStorage.getItem("pjw-saved") || "[]") as string[]);
      if (next) list.add(slug);
      else list.delete(slug);
      localStorage.setItem("pjw-saved", JSON.stringify([...list]));
    } catch {
      /* storage unavailable: keep the state for this visit only */
    }
  }

  function handleAdd() {
    if (!size) return;
    for (let i = 0; i < qty; i += 1) add({ slug, name, colour, size });
    setAdded(true);
  }

  return (
    <div className="buy">
      <div className="buy__row">
        <p className="buy__label">
          Colour <span>{colour}</span>
        </p>
        <div className="swatches" role="radiogroup" aria-label="Colour">
          <span
            role="radio"
            aria-checked="true"
            aria-label={colour}
            className="swatch is-on"
            style={{ ["--sw" as string]: SWATCH[colour] ?? "#cfc8bd" }}
          />
        </div>
      </div>

      <fieldset className="buy__row buy__sizes">
        <legend className="buy__label">
          Size {sizes.length > 1 ? <span>{size ?? "Choose one"}</span> : null}
          <Link href="/size-guide" className="buy__guide">
            <Ruler size={16} aria-hidden="true" /> Size guide
          </Link>
        </legend>
        {sizes.length === 1 ? (
          <p className="buy__onesize">
            <strong>{sizes[0]}</strong>
            <span>No size to choose. Add it straight to your bag.</span>
          </p>
        ) : (
          <div className="sizes" role="group" aria-label="Choose a size">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className="size"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      <div className="buy__actions">
        <div className="qty" role="group" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>
            <Minus size={16} aria-hidden="true" />
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} disabled={qty >= 10}>
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
        <button type="button" className="btn btn--accent buy__add" disabled={!size} onClick={handleAdd}>
          {size ? "Add to bag" : "Select a size"}
        </button>
        <button
          type="button"
          className={`buy__save${saved ? " is-on" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved pieces" : "Save for later"}
          onClick={toggleSave}
        >
          <Heart size={20} weight={saved ? "fill" : "regular"} aria-hidden="true" />
        </button>
      </div>

      <p className={`buy__status${added ? " is-on" : ""}`} role="status" aria-live="polite">
        {added ? (
          <>
            <Check size={18} aria-hidden="true" /> {qty > 1 ? `${qty} × ` : ""}
            {name}, size {size}, added to your bag.{" "}
            <Link href="/cart" className="textlink">
              View bag
            </Link>
          </>
        ) : null}
      </p>

      <div className="buy__info">
        <details>
          <summary>
            <Truck size={20} aria-hidden="true" /> Delivery
          </summary>
          <p>Delivery options, times and fees are confirmed at checkout before you pay.</p>
        </details>
        <details>
          <summary>
            <ArrowsClockwise size={20} aria-hidden="true" /> Returns
          </summary>
          <p>The returns policy is published before launch and shown on this page and at checkout.</p>
        </details>
        <details>
          <summary>
            <Ruler size={20} aria-hidden="true" /> Fit and sizing
          </summary>
          <p>
            Try it over the knit you wear most. It should close without pulling and the sleeves should reach your
            wrist. Between sizes? The <Link href="/size-guide">size guide</Link> explains which way to go.
          </p>
        </details>
        <details>
          <summary>
            <Drop size={20} aria-hidden="true" /> Care
          </summary>
          <p>Follow the care label. Wash gently on a cool setting and dry fully to restore the loft.</p>
        </details>
      </div>
    </div>
  );
}
