// Site-wide facts. Change the domain or brand here and the metadata,
// sitemap, robots and llms.txt follow.
export const site = {
  name: "Puffer Jacket Women",
  url: "https://pufferjacketwomen.com",
  domain: "pufferjacketwomen.com",
  locale: "en_US",
  // PLACEHOLDER: confirm the real inbox before launch.
  contactEmail: "hello@pufferjacketwomen.com",
  description:
    "Shop women's puffer jackets, sleeveless vests, short-sleeve layers, caps, hats and accessories in one premium store.",
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}
