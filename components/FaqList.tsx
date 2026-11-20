import type { FaqItem } from "@/lib/faq";

// Question and answer pairs as native disclosure widgets. The answer is in
// the markup from the start, so it is readable without JavaScript.
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

