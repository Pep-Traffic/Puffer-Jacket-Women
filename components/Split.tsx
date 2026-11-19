import { Children } from "react";

// Headline weight pattern: the first half of the words in bold, the rest in
// regular weight. The text itself is unchanged, so SEO and screen readers
// read the full heading.
export default function Split({ children }: { children: React.ReactNode }) {
  const text = Children.toArray(children)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
    .join("");
  const words = text.split(" ");
  if (words.length < 2) return <strong>{text}</strong>;
  const cut = Math.ceil(words.length / 2);
  return (
    <>
      <strong>{words.slice(0, cut).join(" ")}</strong> {words.slice(cut).join(" ")}
    </>
  );
}
