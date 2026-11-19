// One marquee per page at most. It repeats a short list of category names.
// Motion stops under reduced motion (see globals.css).
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item" aria-hidden={i >= items.length}>
            {item}
            <span className="marquee__mark" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
