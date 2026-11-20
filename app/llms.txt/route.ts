import { categories, products } from "@/lib/catalog";
import { faqs } from "@/lib/faq";
import { glossary } from "@/lib/glossary";
import { absoluteUrl, site } from "@/lib/site";

// llms.txt: a plain-text guide to the store for AI assistants and answer engines.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    "> Premium women's outerwear and layers: puffer jackets, sleeveless puffer vests, short-sleeve layers, caps, hats and accessories, in one store.",
  );
  lines.push("");
  lines.push(
    `${site.name} is an online store at ${site.url}. The catalogue is organised by sleeve length and category. Product details, prices and imagery are placeholders until the catalogue is finalised.`,
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push(`- Subject: women's puffer jackets, sleeveless puffer vests, short sleeve layers, caps, hats and accessories.`);
  lines.push("- Sizes: apparel XS to XL; accessories are one size, as stated on each product page.");
  lines.push("- Prices and ratings: not yet published. Shipping and returns are confirmed before checkout.");
  lines.push("- Fit and fill guidance: the buying guide and size guide explain how to choose and measure.");
  lines.push("- Imagery: stock photographs until product photography is added.");
  lines.push("");

  lines.push("## Categories");
  for (const c of categories) {
    lines.push(
      `- [${c.title}](${absoluteUrl(`/category/${c.slug}`)}): ${c.intro}`,
    );
  }
  lines.push("");

  lines.push("## Products");
  for (const p of products) {
    lines.push(
      `- [${p.name}](${absoluteUrl(`/product/${p.slug}`)}): ${p.colour}. ${p.summary}`,
    );
  }
  lines.push("");

  lines.push("## Guides");
  lines.push(`- [How to choose a puffer jacket](${absoluteUrl("/guide")}): fill, shell fabric, sleeve length, fit, layering and care.`);
  lines.push(`- [Size guide](${absoluteUrl("/size-guide")}): how to measure and the size chart.`);
  lines.push(`- [Puffer jacket questions](${absoluteUrl("/faq")}): fill power, fit, layering and care.`);
  lines.push("");

  lines.push("## Short answers");
  for (const f of faqs) {
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
  lines.push("- Checkout and the bag are private and are not indexed.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
