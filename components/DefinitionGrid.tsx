// Term and definition pairs. Definition lists are read well by search engines
// and AI assistants, and they scan quickly for a shopper.
export default function DefinitionGrid({
  items,
}: {
  items: { term: string; definition: string }[];
}) {
  return (
    <dl className="terms">
      {items.map((item) => (
        <div className="term" key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}
