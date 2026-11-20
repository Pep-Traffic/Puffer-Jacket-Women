// Photography from Burst by Shopify (free to use, see the footer credit).
// Images show a styled look for each category. They are stock photos, not
// the store's own products, and are labelled as such on product pages.

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photos = {
  heroYellowPuffer: {
    src: "/images/hero-yellow-puffer.webp",
    alt: "Woman in a mustard puffer jacket walking a forest path in winter",
    width: 1000,
    height: 1250,
  },
  longSleeveTrench: {
    src: "/images/long-sleeve-trench.webp",
    alt: "Woman in a long black coat standing in snowy woods",
    width: 1000,
    height: 800,
  },
  longSleevePark: {
    src: "/images/long-sleeve-park.webp",
    alt: "Woman in a dark jacket and red scarf in a snowy city park",
    width: 1000,
    height: 667,
  },
  longSleeveWhite: {
    src: "/images/long-sleeve-white.webp",
    alt: "Woman in a white zip-front jacket against a pale wall",
    width: 1000,
    height: 667,
  },
  capsPortrait: {
    src: "/images/caps-portrait.webp",
    alt: "Woman in a dark cap and wool coat standing in falling snow",
    width: 1000,
    height: 1250,
  },
  capsWood: {
    src: "/images/caps-wood.webp",
    alt: "Woman in a dark cap and long coat in a snowy wood",
    width: 1000,
    height: 667,
  },
  capsHat: {
    src: "/images/caps-hat.webp",
    alt: "Woman in a felt hat with her hand raised in warm light",
    width: 1000,
    height: 667,
  },
  shortSleeve: {
    src: "/images/short-sleeve.webp",
    alt: "Woman in a striped knit short-sleeve top and grey shorts",
    width: 1000,
    height: 1500,
  },
  accessoriesKnit: {
    src: "/images/accessories-knit.webp",
    alt: "Woman wrapped in a grey knit hood and scarf",
    width: 1000,
    height: 667,
  },
  accessoriesSilk: {
    src: "/images/accessories-silk.webp",
    alt: "Navy and white striped silk scarf laid on a white surface",
    width: 1000,
    height: 667,
  },
  accessoriesFolded: {
    src: "/images/accessories-folded.webp",
    alt: "Folded printed scarves in mustard, navy and grey",
    width: 1000,
    height: 667,
  },
  whiteQuilted: {
    src: "/images/white-quilted-jacket.webp",
    alt: "Woman in a white quilted jacket looking up against a pale sky",
    width: 1000,
    height: 1500,
  },
  snowCapScarf: {
    src: "/images/snow-cap-scarf.webp",
    alt: "Woman in a dark cap and red scarf standing in falling snow",
    width: 1000,
    height: 1499,
  },
  winterWoods: {
    src: "/images/winter-woods-portrait.webp",
    alt: "Woman in a dark knit cap in a sunlit snowy wood",
    width: 1000,
    height: 1499,
  },
  winterField: {
    src: "/images/winter-field-wide.webp",
    alt: "A lone figure walking across a wide snowy field",
    width: 1000,
    height: 667,
  },
} satisfies Record<string, Photo>;
