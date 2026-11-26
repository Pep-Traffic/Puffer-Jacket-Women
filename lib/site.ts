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
    "Women's puffer jackets and vests in sizes XS to XL, with plain advice on fit, fill, layering and care.",
  // Shown in the footer once each real value is supplied.
  contact: {
    phone: "",
    hours: "",
    address: "",
  },
  // Social profile links. Each icon in the footer becomes a link once its URL
  // is set. Empty until the profiles exist.
  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    pinterest: "",
  },
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}
