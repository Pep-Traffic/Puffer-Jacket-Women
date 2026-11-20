// General product knowledge only. No store policy, price, stock or
// review claims. Placeholder details are marked as such in the answers.

export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Fill and warmth",
    items: [
      {
        q: "What is a puffer jacket?",
        a: "A puffer jacket is a padded jacket filled with insulation, usually down or a synthetic fill. Stitched channels or baffles hold the fill in place so it does not shift.",
      },
      {
        q: "What does fill power mean?",
        a: "Fill power measures how much space one ounce of down takes up once it is compressed and released. Higher fill power generally gives more warmth for less weight. Synthetic fills are rated by weight instead.",
      },
      {
        q: "Down or synthetic: which is better?",
        a: "Down is light, compresses small and holds its loft in dry cold. Synthetic fills keep some warmth when damp and are often easier to wash. Choose by the weather you expect most.",
      },
      {
        q: "Is a puffer jacket warm enough for snow?",
        a: "Warmth depends on the fill, the shell and the cut. A heavier fill and a longer cut suit snow. A lighter piece suits cool days and layering.",
      },
    ],
  },
  {
    title: "Fit and layering",
    items: [
      {
        q: "How should a women's puffer jacket fit?",
        a: "A puffer should close comfortably over a knit without restricting the arms. Lift your arms to check the sleeve length, and sit down to check that the hem still covers your waistband.",
      },
      {
        q: "Can I wear a puffer vest under a coat?",
        a: "Yes. A sleeveless puffer adds warmth at the core without bulk at the arms, so it fits under a tailored coat or over a jumper.",
      },
      {
        q: "What should I wear under a puffer?",
        a: "A fine knit or a shirt works well. Avoid a bulky sweater under a tight puffer, because the layers will bunch and lose warmth at the cuffs.",
      },
      {
        q: "How do I measure for the size guide?",
        a: "Measure your bust, waist, hips and sleeve length over light clothing. Keep the tape level and snug without pulling it tight. Compare your measurements with the size chart.",
      },
    ],
  },
  {
    title: "Care",
    items: [
      {
        q: "How do I care for a puffer jacket?",
        a: "Follow the care label on the jacket. As a general rule, wash down-filled pieces gently, dry them fully, and add clean dryer balls to help restore loft.",
      },
      {
        q: "How should I store a puffer jacket?",
        a: "Store it loosely folded or hung. Keeping it compressed in a small bag for long periods can flatten the fill.",
      },
      {
        q: "Can I put a puffer jacket in the dryer?",
        a: "Only if the care label allows tumble drying, and then on a low heat setting. Air drying is the safest default for any puffer.",
      },
    ],
  },
  {
    title: "Caps, hats and accessories",
    items: [
      {
        q: "Which hat keeps the most warmth?",
        a: "A close-fitting knit beanie covers the ears and holds heat well. A cap is better for shade and for wind on the face.",
      },
      {
        q: "How do I wear a scarf with a puffer?",
        a: "Wrap a long scarf once so it sits over the collar. A knotted scarf can gap when you move, so keep the ends tucked in.",
      },
      {
        q: "Do the gloves work with touchscreens?",
        a: "Some gloves have touchscreen-friendly fingertips. Check the product details on each listing.",
      },
    ],
  },
  {
    title: "Shopping",
    items: [
      {
        q: "What is the best puffer jacket for women?",
        a: "The best puffer jacket for women depends on the weather, the fit and how you layer. For the coldest days choose a long, well-filled jacket. For layering choose a sleeveless vest or a short sleeve layer. The buying guide explains each choice step by step.",
      },
      {
        q: "How should a women's puffer jacket fit?",
        a: "It should close without pulling across the chest, and the sleeves should reach your wrist with your arms down. Try it over the knit you will wear most, then check the size guide for the measurements that matter.",
      },
      {
        q: "Can you wear a puffer jacket with a dress?",
        a: "Yes. A long coat-length puffer works over a dress with tights and boots. A cropped puffer suits a dress with a high waist. Keep the dress simple so the jacket is the feature.",
      },
      {
        q: "How do I know a jacket will fit?",
        a: "Use the size guide, check the fit notes for the category, and compare your measurements with a jacket you already wear and like.",
      },
      {
        q: "Can I return a purchase?",
        a: "Return details are confirmed before launch and will be listed on this page once they are final.",
      },
    ],
  },
];

// Flat list, used for structured data and the home page questions.
export const faqs: FaqItem[] = faqGroups.flatMap((group) => group.items);
