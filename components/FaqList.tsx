import type { FaqGroup, FaqItem } from "@/lib/faq";

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

export function FaqGroups({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="faq-groups">
      {groups.map((group) => (
        <section key={group.title} className="faq-group" aria-labelledby={`faq-${slug(group.title)}`}>
          <h3 id={`faq-${slug(group.title)}`} className="faq-group__title">
            {group.title}
          </h3>
          <FaqList items={group.items} />
        </section>
      ))}
    </div>
  );
}

function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
