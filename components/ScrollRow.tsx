import type { ReactNode } from "react";

// A horizontal row of cards that snaps as it scrolls. On a phone it is the
// natural way to browse; on a wide screen the next card peeks in at the edge.
export default function ScrollRow({
  items,
}: {
  items: { title: string; body: string; icon: ReactNode }[];
}) {
  return (
    <div className="scroll-row" tabIndex={0} aria-label="Shell fabrics, scroll sideways to read more">
      {items.map((item) => (
        <article className="scroll-row__card" key={item.title}>
          <span className="scroll-row__icon" aria-hidden="true">
            {item.icon}
          </span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
