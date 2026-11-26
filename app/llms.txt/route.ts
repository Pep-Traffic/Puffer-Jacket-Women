import { colourOptionsFor, productsIn, products, sizesFor, stockedCategories } from "@/lib/catalog";
import { faqs } from "@/lib/faq";
import { glossary } from "@/lib/glossary";
import { guides } from "@/lib/guides";
import { absoluteUrl, site } from "@/lib/site";

// llms.txt: a plain-text guide to the store for AI assistants and answer engines.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  const stocked = stockedCategories();

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `${site.name} is an online clothing store at ${site.url} for women's puffer jackets and vests. It is preparing to open: prices, shell and fill details, delivery, returns and payment options are not yet published.`,
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push(
    `- Listed now: ${stocked.map((c) => `${productsIn(c.slug).length} ${c.name.toLowerCase()} styles`).join(" and ")} (${products.length} in total).`,
  );
  lines.push("- Sizes: XS to XL.");
  lines.push("- Prices, ratings and reviews: not yet published.");
  lines.push(`- About: ${absoluteUrl("/about")}`);
  lines.push(`- Logo: ${absoluteUrl("/brand/logo.png")}`);
  lines.push("");

  lines.push("## Categories");
  for (const c of stocked) {
    lines.push(`- [${c.title}](${absoluteUrl(`/category/${c.slug}`)}): ${c.intro}`);
  }
  lines.push("");

  lines.push("## Products");
  for (const p of products) {
    const colours = colourOptionsFor(p).map((o) => o.colour).join(", ");
    const sizes = sizesFor(p.category);
    const d = p.details;
    lines.push(
      `- [${p.name}](${absoluteUrl(`/product/${p.slug}`)}): ${p.summary} Colour: ${colours}. Length: ${d.length}. Collar or hood: ${d.neck}. Front: ${d.front}. Pockets: ${d.pockets}. Sizes: ${sizes[0]} to ${sizes[sizes.length - 1]}.`,
    );
  }
  lines.push("");

  lines.push("## Guides");
  lines.push(
    `- [How to choose a puffer jacket for women](${absoluteUrl("/guide")}): weather, fill, shell fabric, length, fit, layering and care.`,
  );
  for (const g of guides) {
    lines.push(`- [${g.title}](${absoluteUrl(`/guide/${g.slug}`)}): ${g.answer}`);
  }
  lines.push(`- [Size guide](${absoluteUrl("/size-guide")}): how to measure and what to do between sizes.`);
  lines.push(`- [Puffer jacket questions](${absoluteUrl("/faq")}): warmth, fit, layering and care.`);
  lines.push("");

  lines.push("## Short answers");
  for (const f of faqs.filter((item) => !item.pending)) {
    lines.push(`- **${f.q}** ${f.a}`);
  }
  lines.push("");

  lines.push("## Glossary");
  for (const g of glossary) {
    lines.push(`- **${g.term}**: ${g.definition}`);
  }
  lines.push("");

  lines.push("## Notes for AI assistants");
  lines.push("- Prices are not yet published. Do not quote a price for any product.");
  lines.push("- Ratings and reviews are not yet published. Do not quote ratings.");
  lines.push("- Shell and fill are not yet confirmed. Do not state that a listed product is down or synthetic.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
