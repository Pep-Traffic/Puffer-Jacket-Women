"use client";

import Link from "next/link";
import { photoForProduct, productBySlug } from "@/lib/catalog";
import PhotoFrame from "./PhotoFrame";
import { useCart } from "./CartProvider";

export default function BagView() {
  const { items, count, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Your bag is empty</h1>
        <p className="muted" style={{ marginTop: 20, fontSize: 18 }}>
          Browse the collection and add a piece to start your bag.
        </p>
        <div style={{ marginTop: 36 }}>
          <Link href="/shop" className="btn">
            Shop all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Your bag ({count})</h1>

      <div style={{ marginTop: 40 }}>
        {items.map((item) => {
          const product = productBySlug(item.slug);
          return (
            <div className="bag-line" key={`${item.slug}-${item.size}`}>
              {product ? (
                <PhotoFrame photo={photoForProduct(product)} ratio="4 / 5" className="bag-line__photo" />
              ) : null}
              <div>
                <h2 className="bag-line__title">
                  <Link href={`/product/${item.slug}`}>{item.name}</Link>
                </h2>
                <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
                  {item.colour}, size {item.size}
                </p>
                <p style={{ marginTop: 12, fontSize: 14 }}>Price to confirm</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
                  <label className="label" htmlFor={`qty-${item.slug}-${item.size}`}>
                    Qty
                  </label>
                  <select
                    id={`qty-${item.slug}-${item.size}`}
                    className="input"
                    style={{ height: 40, width: 84 }}
                    value={item.qty}
                    onChange={(e) => setQty(item.slug, item.size, Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" className="text-button" onClick={() => remove(item.slug, item.size)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="summary-box">
        <p className="label">Subtotal</p>
        <p style={{ marginTop: 10, fontSize: 18 }}>To confirm</p>
        <p className="muted" style={{ marginTop: 10, fontSize: 14 }}>
          Prices are placeholders until the catalogue is confirmed. Totals appear once real prices are added.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link href="/checkout" className="btn btn--accent">
            Continue to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
