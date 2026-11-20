import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";

// Checkout stays out of search results. No payment or personal details are
// collected here until a payment provider is connected before launch.
export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="container bag">
      <h1><Split>Checkout</Split></h1>
      <p className="muted" style={{ marginTop: 20, fontSize: 18 }}>
        Checkout connects to a payment provider before launch. No payment
        details are collected on this page yet.
      </p>

      <ol style={{ marginTop: 40, padding: 0, listStyle: "none", display: "grid", gap: 16 }}>
        <li className="summary-box" style={{ marginTop: 0 }}>
          <p className="label">1. Contact</p>
          <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>
            Added when the checkout provider is connected.
          </p>
        </li>
        <li className="summary-box" style={{ marginTop: 0 }}>
          <p className="label">2. Delivery</p>
          <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>
            Delivery options and fees are confirmed before launch.
          </p>
        </li>
        <li className="summary-box" style={{ marginTop: 0 }}>
          <p className="label">3. Payment</p>
          <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>
            Payment is handled by the connected provider.
          </p>
        </li>
      </ol>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <button type="button" className="btn" disabled>
          Place order
        </button>
        <Link href="/cart" className="textlink">
          Back to bag
        </Link>
      </div>
    </section>
  );
}
