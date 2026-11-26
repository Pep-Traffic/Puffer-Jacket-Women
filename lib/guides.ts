import { photos, type Photo } from "./images";

// Guide articles at /guide/<slug>. Each opens with a direct answer, then uses
// question headings. General garment knowledge only: no fill, weight, warmth
// rating, price or test result is claimed for any product in the store.

export type GuideSection = {
  id: string;
  heading: string;
  body?: string[];
  list?: string[];
  ordered?: boolean;
  after?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  card: string;
  published: string;
  updated: string;
  image: Photo;
  answer: string;
  table?: { caption: string; columns: string[]; rows: string[][] };
  sections: GuideSection[];
  products: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-wash-a-puffer-jacket",
    title: "How to wash a puffer jacket",
    description:
      "How to wash a puffer jacket at home: check the label, use a gentle cycle and mild detergent, then dry on low heat until the fill is fully dry.",
    card: "Washing and drying without flattening the fill.",
    published: "2026-11-26",
    updated: "2026-11-26",
    image: photos.accessoriesKnit,
    answer:
      "Check the care label first. If it allows machine washing, close every zip, wash on a gentle cycle with a mild detergent and no fabric softener, rinse well, and tumble dry on low heat with dryer balls until the fill is completely dry.",
    sections: [
      {
        id: "before",
        heading: "What should you check before washing?",
        body: ["A few minutes of preparation protects both the shell and the fill."],
        list: [
          "Read the care label. It overrides any general advice, including this guide.",
          "Empty the pockets, then close zips, snaps and flaps.",
          "Remove a detachable hood if the label tells you to wash it separately.",
          "Dab marks with a little mild detergent and water.",
          "Mend small tears first, so the fill cannot escape in the wash.",
        ],
      },
      {
        id: "machine",
        heading: "How do you machine wash a puffer jacket?",
        ordered: true,
        list: [
          "Use a machine without a central agitator if you can, because an agitator can twist and tear the jacket.",
          "Wash one jacket at a time, so it has room to move.",
          "Choose a gentle cycle and the water temperature on the label.",
          "Use a mild detergent, or one made for down if the jacket is down filled.",
          "Leave out fabric softener and bleach.",
          "Run an extra rinse so no soap stays in the fill, then spin to remove water.",
        ],
      },
      {
        id: "dry",
        heading: "How do you dry it without clumping?",
        body: [
          "A wet puffer looks flat and lumpy. That is normal, and drying brings the loft back. If the label allows tumble drying, use low heat and add two or three clean dryer balls.",
          "Pause now and then to break up clumps with your hands. Drying often takes a few hours. Feel the thickest channels and the seams: any cool or damp patch means it needs longer.",
          "Without a dryer, lay the jacket flat on a rack in a warm, airy room. Turn it and shake the fill apart regularly. This can take a day or more.",
        ],
      },
      {
        id: "hand",
        heading: "Can you hand wash a puffer jacket?",
        body: [
          "Yes, if the label allows it. Fill a clean tub with cool water and a small amount of mild detergent. Press the jacket gently under the water, then rinse until the water runs clear.",
          "Do not wring or twist it. Press the water out against the side of the tub, then roll the jacket in a towel before drying.",
        ],
      },
      {
        id: "often",
        heading: "How often should you wash it?",
        body: [
          "Wash it when it is dirty or smells, which for most people means only a few times a season. Wipe small marks between washes and air the jacket after wet days.",
        ],
      },
      {
        id: "avoid",
        heading: "What should you avoid?",
        list: [
          "High heat, which can damage the shell and the fill.",
          "Ironing the shell.",
          "Dry cleaning, unless the label asks for it.",
          "Putting the jacket away while any part is damp.",
          "Storing it squashed in a small bag for months.",
        ],
      },
    ],
    products: ["aurora-luxe-puffer-jacket", "sage-green-hooded-puffer-jacket", "navy-quilted-puffer-vest"],
  },
  {
    slug: "down-vs-synthetic-puffer-jacket",
    title: "Down vs synthetic puffer jackets",
    description:
      "Down or synthetic fill? Compare warmth for weight, wet weather, drying, care and price, and choose a women's puffer jacket that suits your climate.",
    card: "Which fill suits dry cold, wet days and frequent washing.",
    published: "2026-11-26",
    updated: "2026-11-26",
    image: photos.winterField,
    answer:
      "Choose down if you want the most warmth for the least weight and your winters are mostly cold and dry. Choose synthetic fill if you expect rain or damp, wash your jacket often, or want an animal-free option, which usually costs less.",
    table: {
      caption: "Down and synthetic fill compared",
      columns: ["What matters", "Down", "Synthetic"],
      rows: [
        ["Warmth for its weight", "Higher", "Lower"],
        ["When damp", "Loses much of its loft", "Keeps more of its warmth"],
        ["Drying", "Slow", "Faster"],
        ["Packing", "Compresses very small", "Usually bulkier"],
        ["Care", "Gentle wash and long drying", "Usually simpler"],
        ["Price", "Usually higher", "Usually lower"],
      ],
    },
    sections: [
      {
        id: "down",
        heading: "What is down fill?",
        body: [
          "Down is the soft, fluffy cluster found under the outer feathers of ducks and geese. The clusters trap a lot of still air for very little weight, which is why down jackets can feel light and warm at the same time.",
          "Many down jackets mix down with some small feathers. The label normally states the proportion.",
        ],
      },
      {
        id: "fill-power",
        heading: "What does fill power mean?",
        body: [
          "Fill power is the space, in cubic inches, that one ounce of down fills in a standard test. A rating of 700 means one ounce fills about 700 cubic inches. A higher number means more loft for the same weight.",
          "It does not tell you everything. The amount of down inside matters too, so a jacket with more down of a lower rating can be as warm as a lighter jacket with a higher one.",
        ],
      },
      {
        id: "synthetic",
        heading: "What is synthetic fill?",
        body: [
          "Synthetic fill is usually made of fine polyester fibres designed to hold air in a similar way to down. It is rated by weight rather than fill power. It tends to dry faster and copes better with repeated washing, although it can lose loft sooner after years of being compressed.",
        ],
      },
      {
        id: "rain",
        heading: "Which fill is better in rain?",
        body: [
          "Synthetic fill is the safer choice for damp weather because it keeps more warmth when wet. The shell matters as much as the fill: a water-resistant finish sheds light rain, while heavy rain calls for a waterproof layer with sealed seams.",
        ],
      },
      {
        id: "label",
        heading: "How can you tell what a jacket is filled with?",
        body: [
          "Look at the content label inside the jacket or the specification on the product page. If animal welfare matters to you, look for a certification such as the Responsible Down Standard.",
          "The shell and fill for the pieces in this store are still being confirmed. They will appear on each product page before ordering opens.",
        ],
      },
    ],
    products: ["aurora-luxe-puffer-jacket", "monarch-pearl-puffer-jacket", "celestine-burgundy-puffer"],
  },
  {
    slug: "hooded-puffer-jackets",
    title: "How to choose a hooded puffer jacket",
    description:
      "Fixed or detachable hood, drawcords, fit and length: how to choose a women's puffer jacket with a hood, with four hooded styles to compare.",
    card: "Hood types, fit checks and the hooded styles listed here.",
    published: "2026-11-26",
    updated: "2026-11-26",
    image: photos.longSleeveTrench,
    answer:
      "Pick a hood that turns with your head, adjusts with a drawcord and still lets you see to the side. A detachable hood gives you two looks from one jacket. Then choose the length: a hip-length cut covers more than a waist-length one on windy days.",
    sections: [
      {
        id: "worth",
        heading: "When is a hood worth having?",
        body: [
          "A hood helps when you walk, wait outdoors or deal with wind and drizzle. It also protects the ears and neck when you have no hat. If you mostly drive between warm places, a high collar may be enough.",
        ],
      },
      {
        id: "type",
        heading: "Fixed or detachable hood?",
        body: [
          "A fixed hood is always there and has no join for wind to find. A detachable hood can come off for a cleaner collar, or for washing if the label asks for that. Check that the zip or snaps that hold it feel secure.",
        ],
      },
      {
        id: "fit",
        heading: "How should the hood fit?",
        list: [
          "It covers your head without pulling the jacket up at the back.",
          "It turns with your head, so you can look to each side.",
          "A drawcord or tab closes the opening in wind.",
          "It still fits over a thin beanie.",
          "It lies comfortably on your shoulders when down.",
        ],
      },
      {
        id: "length",
        heading: "Which length goes with a hood?",
        body: [
          "A waist-length hooded puffer is easy to move in and works with high-waisted trousers. A hip-length hooded jacket gives more cover for walking and commuting.",
        ],
      },
      {
        id: "styles",
        heading: "Which styles here have a hood?",
        list: [
          "Celestine Burgundy Puffer: waist length with a detachable hood.",
          "Sage Green Hooded Puffer Jacket: hip length with a drawcord hood and black cuffs.",
          "Deep Plum Quilted Hooded Jacket: hip length, diamond quilted, with flap pockets.",
          "Navy Diamond Quilted Hooded Jacket: hip length, diamond quilted, with flap pockets.",
        ],
        after: ["Prices, shell and fill for these styles are still to be confirmed."],
      },
    ],
    products: [
      "celestine-burgundy-puffer",
      "sage-green-hooded-puffer-jacket",
      "deep-plum-quilted-hooded-jacket",
      "navy-diamond-quilted-hooded-jacket",
    ],
  },
  {
    slug: "long-vs-short-puffer-jackets",
    title: "Long vs short puffer jackets for women",
    description:
      "Compare long, hip-length and waist-length puffer jackets for women: coverage, movement, outfits and which length suits your day.",
    card: "How length changes warmth, movement and outfits.",
    published: "2026-11-26",
    updated: "2026-11-26",
    image: photos.longSleevePark,
    answer:
      "A long puffer coat covers the hips and thighs, so it suits very cold days and time spent standing outdoors. Hip length balances cover and movement for everyday wear. Waist length is the easiest to move and drive in, and pairs well with high-waisted trousers.",
    table: {
      caption: "Puffer jacket lengths compared",
      columns: ["Length", "Covers", "Suits"],
      rows: [
        ["Waist", "Torso to the waist", "Driving, layering and high-waisted outfits"],
        ["Hip", "Torso and most of the hips", "Commuting and everyday wear"],
        ["Longline", "Hips and thighs", "Cold mornings, waiting outdoors and dresses"],
      ],
    },
    sections: [
      {
        id: "long",
        heading: "When should you choose a long puffer coat?",
        body: [
          "Choose a long coat when your legs get cold: at a bus stop, on the school run or on a slow walk. It also sits neatly over dresses and skirts. Check that you can walk and sit comfortably, and look for a front that opens from the bottom or leaves room to stride.",
          "The Burgundy Diamond Quilted Longline Coat is the longline style listed here, with a corduroy collar and a button front.",
        ],
      },
      {
        id: "hip",
        heading: "When is hip length the best choice?",
        body: [
          "Hip length is the middle ground. It covers the waistband when you sit or bend, yet stays easy to move in. The Sage Green, Deep Plum and Navy Diamond hooded jackets are cut to the hip, as is the Classic Matte Black Puffer Jacket with its stand collar.",
        ],
      },
      {
        id: "waist",
        heading: "When does waist length work?",
        body: [
          "A waist-length or cropped-looking puffer keeps your legs free and shows the line of high-waisted trousers or a skirt. It covers less, so it suits milder days or short trips. The Aurora Luxe, Monarch Pearl and Celestine puffers are cut to the waist.",
        ],
      },
      {
        id: "try",
        heading: "How do you check the length when you try it on?",
        list: [
          "Raise both arms and see how far the hem lifts.",
          "Sit down and check that it neither digs in nor rides up.",
          "Take a few long steps in a long coat.",
          "Wear the shoes and trousers you use most in winter.",
        ],
      },
    ],
    products: [
      "burgundy-diamond-longline-coat",
      "sage-green-hooded-puffer-jacket",
      "classic-matte-black-puffer-jacket",
      "aurora-luxe-puffer-jacket",
    ],
  },
  {
    slug: "how-to-wear-a-puffer-vest",
    title: "How to wear a puffer vest",
    description:
      "How to wear a women's puffer vest: over knits and shirts, under a coat, with jeans or a skirt, plus how a vest should fit.",
    card: "Layering ideas and the fit checks for a vest.",
    published: "2026-11-26",
    updated: "2026-11-26",
    image: photos.longSleeveWhite,
    answer:
      "Wear a puffer vest over a fine knit, a shirt or a long-sleeve top with jeans or straight trousers. On cold days, wear it under a roomy coat. It should sit close at the armholes without pinching and skim the layer underneath.",
    sections: [
      {
        id: "under",
        heading: "What do you wear under a puffer vest?",
        body: [
          "Thin and medium layers work best: a roll-neck, a crew-neck knit, a cotton shirt or a long-sleeve top. A very thick sweater can strain the zip and bunch at the armholes.",
        ],
      },
      {
        id: "outfits",
        heading: "Which outfits work with a puffer vest?",
        list: [
          "A white shirt and straight jeans with ankle boots.",
          "A fine roll-neck and wool trousers for the office.",
          "A long-sleeve top, leggings and trainers for errands.",
          "A knit dress, tights and tall boots.",
        ],
      },
      {
        id: "coat",
        heading: "Can you wear a vest under a coat?",
        body: [
          "Yes. A slim vest adds warmth around the body without filling the coat sleeves. Try the coat over it and check that the shoulders still move freely.",
        ],
      },
      {
        id: "fit",
        heading: "How should a puffer vest fit?",
        list: [
          "The armholes sit close without rubbing.",
          "The front zips without pulling across the chest.",
          "The hem stays put when you sit and reach.",
          "The collar closes comfortably under your chin.",
        ],
      },
      {
        id: "warm",
        heading: "Is a vest warm enough on its own?",
        body: [
          "It can be on a mild, dry day, especially over a knit. Your arms get no extra cover, so on cold or windy days add a coat or choose a long sleeve jacket.",
        ],
      },
      {
        id: "colours",
        heading: "Which vest colours are listed here?",
        body: [
          "The vests come in navy, teal, plum, emerald, copper rust, burgundy red and olive green. Darker shades blend with most winter wardrobes, while copper rust and teal add colour to plain layers.",
        ],
      },
    ],
    products: [
      "plum-quilted-puffer-vest",
      "copper-rust-quilted-puffer-vest",
      "olive-green-utility-quilted-vest",
      "teal-chevron-puffer-vest",
    ],
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

// The guides that mention a product, for links from its page.
export function guidesForProduct(slug: string): Guide[] {
  return guides.filter((g) => g.products.includes(slug));
}
