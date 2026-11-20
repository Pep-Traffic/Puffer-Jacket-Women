import type { Metadata } from "next";
import BagView from "@/components/BagView";

// The bag is personal and session-based, so it stays out of search results.
export const metadata: Metadata = {
  title: "Bag",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <section className="container bag">
      <BagView />
    </section>
  );
}
