---
name: Puffer Jacket Women
description: Premium women's outerwear store. Ink on white, one oxblood accent, Marcellus display and Figtree UI, real photography.
colors:
  ink: "#121212"
  paper: "#ffffff"
  stone: "#f5f3ef"
  tint: "#faf9f6"
  hairline: "#ddd9d2"
  muted: "#5f5b56"
  accent-oxblood: "#6a1e2b"
  accent-oxblood-deep: "#521722"
typography:
  display:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.9rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  sub:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.08
  closing:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(2.3rem, 4.8vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.08
  product:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(2.3rem, 3.8vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.08
  marquee:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "clamp(1.3rem, 2.4vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1.2
  related:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  wordmark:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "1.2rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  wordmark-sm:
    fontFamily: "Marcellus, \"Times New Roman\", serif"
    fontSize: "0.84rem"
    fontWeight: 400
    letterSpacing: "0.05em"
  lede:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.8
  small:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.14em"
  plus:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 300
    lineHeight: 1
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  container: "1360px"
  section: "clamp(80px, 10vw, 136px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-accent:
    backgroundColor: "{colors.accent-oxblood}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-accent-hover:
    backgroundColor: "{colors.accent-oxblood-deep}"
    textColor: "{colors.paper}"
  button-disabled:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.muted}"
  section-stone:
    backgroundColor: "{colors.stone}"
  section-tint:
    backgroundColor: "{colors.tint}"
---

# Design System: Puffer Jacket Women

## Overview

**Creative North Star: "The Quiet Rail"**

The store is a calm, bright rail of outerwear. Photographs of real people in winter clothing carry the product story. Everything else steps back: ink type on white, stone and tint bands between sections, and one oxblood accent that marks only the action the visitor should take next. It is the category standard, played straight and built to the bar of premium US outerwear sites. Premium comes from restraint, even grids, precise type and motion that explains rather than decorates.

Design dials for this build: variance 7 (asymmetric hero, bento and sticky layering, but an even 12-column grid underneath), motion 6 (scroll reveals, one sticky stack, one marquee, slow photo settle), density 3 (airy, generous section padding).

Density is airy. Grids are even: four product columns on desktop and two on mobile. Anti-references: gradients, glass, neon, gamified badges, line-drawn illustrations standing in for photographs, and cream-and-serif editorial costume.

**Key Characteristics:**
- Ink on white, with stone and tint bands and one oxblood accent.
- Marcellus display headlines; Figtree UI in small, uppercase, tracked labels.
- Square corners, hairline dividers, no shadows.
- Real photography for every category and every product (stock photos until the store's own photography is supplied, and labelled as such).

**Serif justification.** Marcellus is a flared display serif. It is used here because the brand is premium outerwear, and the reference sites the brief named (Mytheresa, Moncler US) use flared or humanist display type for headlines. The sans is Figtree, so the serif appears only at display sizes.

## Colors

A restrained, neutral-led palette with one accent.

### Primary
- **Oxblood** (#6a1e2b): primary action buttons (Shop puffer jackets, Add to bag, Continue to checkout). One per screen.
- **Oxblood Deep** (#521722): hover state for oxblood buttons.

### Neutral
- **Ink** (#121212): headings, body text, primary buttons, the footer ground.
- **Paper** (#ffffff): page ground, and text on ink buttons.
- **Stone** (#f5f3ef): alternate section bands and the placeholder ground for photographs while they load.
- **Tint** (#faf9f6): a second, quieter band colour, used beside stone so sections do not all look alike.
- **Hairline** (#ddd9d2): dividers, rules between tiles, table rules.
- **Muted** (#5f5b56): secondary text, captions, and disabled labels.

### Named Rules
**The One Accent Rule.** Oxblood marks the single action a visitor should take on a screen. It never decorates, and checkmarks and icons stay ink.

**The Honest Photo Rule.** Every photograph is labelled as a stock photo on product pages. A photograph never implies a real product, price, rating or stock level.

## Typography

**Display Font:** Marcellus (with Times New Roman, serif)
**Body Font:** Figtree (with system-ui, sans-serif)
**Label Font:** Figtree, uppercase and tracked

**Character:** Marcellus gives headlines a tailored, luxury voice. Figtree is a geometric humanist sans with neutral, legible UI forms.

### Scale
Every font size in the stylesheet is one of these named steps. Nothing is set by hand.
- **Display** (400, clamp(2.6rem, 5.4vw, 4.9rem), line-height 0.98, letter-spacing -0.02em): hero titles. One per page.
- **Headline** (400, clamp(2rem, 3.6vw, 3.1rem)): section titles such as "Shop by category" and "Featured pieces".
- **Sub** (400, clamp(1.8rem, 2.8vw, 2.4rem)): layer titles and guide section titles.
- **Closing** (400, clamp(2.3rem, 4.8vw, 4.2rem)): the closing band and the guide title.
- **Product** (400, clamp(2.3rem, 3.8vw, 3.4rem)): the product name on product pages.
- **Marquee** (400, clamp(1.3rem, 2.4vw, 2rem)): the one strip of category names.
- **Title** (400, 1.4rem): card and step headings.
- **Related** (400, 1.5rem): related category names.
- **Wordmark** (400, 1.2rem, tracking 0.1em, uppercase): the logo in the header and footer. 0.84rem on phones.
- **Lede** (400, 18px, line-height 1.6): hero and intro paragraphs.
- **Body** (400, 17px, line-height 1.8, 65ch maximum): running copy in guides and product detail.
- **Small** (400, 15px, line-height 1.6): card and step copy.
- **Meta** (400, 14px): prices and secondary meta lines.
- **Caption** (400, 13px): breadcrumbs, photo captions, and text links.
- **Micro** (600, 11px, tracking 0.14em, uppercase): the tiny photo caption label.
- **Label** (600, 12px, letter-spacing 0.14em, uppercase): navigation, buttons and jump links.

### Named Rules
**The Measured Headline Rule.** Display never exceeds 4.9rem (78px), and headlines always wrap with balanced lines.

## Layout

- **Container:** maximum 1360px, with a horizontal gutter of clamp(20px, 4vw, 48px).
- **Section rhythm:** section padding is clamp(80px, 10vw, 136px). Section intros sit 40 to 64px above their content.
- **Hero:** two columns (text and a 4:5 photograph). The photograph is capped by viewport height, so the first screen shows the headline, the actions and the top of the category row at 1440 by 900.
- **Category bento:** a 12-column grid. Long sleeve takes seven columns across two rows; sleeveless and short sleeve take five columns each; caps and accessories take six columns each.
- **Layering stack:** three cards pin as the reader scrolls on desktop. Each card sits 16px lower than the one before, and the card beneath eases back as the next arrives.
- **Products:** four columns on desktop, three at 1100px and below, two on tablet and phone.
- **Tablet and phone (900px and below):** single-column hero, categories and split sections; the layering stack becomes static cards; the steps line hides.
- **Phone (520px and below):** the header compresses; product card metadata stacks.
- **Header:** 76px tall (68px on tablet and phone), sticky, with a hairline rule. Links move behind the Menu button below 1200px.

## Elevation & Depth

No shadows. Depth comes from stone and tint bands, hairline rules and photography. Photographs settle with a slow scale-down on first view and zoom slightly on hover.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat. Separation comes from rules and tone, never from shadow.

## Shapes

Square corners everywhere (radius 0px). Buttons and inputs use a 1px ink border. Photographs are rectangles in 4:5, 4:3, 3:4 or 5:4 ratios. Dividers are 1px hairlines. There are no pills and no circles.

## Components

### Buttons
- **Shape:** square (0px), minimum height 52px, padding 0 28px.
- **Primary (ink):** ink fill, white label, 13px, 600, uppercase, letter-spacing 0.14em. Hover brightens slightly.
- **Accent (oxblood):** oxblood fill, hover oxblood deep. Reserved for the one primary action per screen.
- **Ghost / text:** transparent, ink label. Hover inverts to an ink fill.
- **Disabled:** stone fill, hairline border, muted label, not-allowed cursor. Used for "Select a size" and "Place order".
- **Focus:** 2px oxblood outline with a 3px offset.

### Text links
Uppercase 13px label with a 1px ink underline. The underline lifts on hover.

### Photographs
A fixed-ratio box with a stone ground. Images cover the box. On hover, a card photograph zooms to 1.04. The bento photographs zoom to 1.03. Captions sit below the photograph in muted 13px.

### Marquee
One strip per page at most, on the home page only. Ink category names in serif, separated by small ink squares, scrolling slowly. It stops under reduced motion.

### Layering stack
Desktop only. Three sticky cards with a photograph and text. Each card's name is a small uppercase label, its title is a sub-heading, and its copy is muted.

### Steps
Three steps on a drawn hairline. Each step has an ink-bordered square icon, a title and muted copy. The line draws across the width when the section enters view.

### Facts
Three stacked facts with a hairline above each. Each has an ink icon, a title and muted copy.

### Checklists
Ink checkmark icons, one item per row, with a hairline under each item.

### Navigation
Uppercase 12px links with 0.14em tracking and a 1px ink underline on hover and on the current page. Below 1200px, a bordered Menu button opens a full-width stacked list with hairline separators.

### FAQ
Hairline-ruled details elements. Summary 18px/500 with a plus sign that becomes a minus sign when open.

### Product cards
A 4:5 photograph with a "Stock photo" caption, the product name, colour, and "Price to confirm".

### Footer
Ink ground with paper text. Four columns that collapse to two on tablet. The legal line credits the photography and states that products and prices are placeholders.

### Use-case cases (home)
Two columns of four cases on desktop, one on phone. Each case has an ink icon, a title, a short paragraph and a text link. The top rule is ink, so each case reads as a deliberate entry point.

### Shell fabric row (home)
A horizontal row of cards that snaps as it scrolls. Each card is paper on a hairline border with an icon, a title and muted copy. On desktop the next card peeks in at the edge, which signals that the row scrolls.

### Comparison table
A plain table with an uppercase caption, a bold header rule and hairline row rules. The first column is the row heading. On small screens the table scrolls sideways inside its box.

### Definition grid
Term and definition pairs in two columns on desktop, one on phone. Terms use the Title step in serif, and definitions use the Small step in muted ink. Used for the glossary.

### Guide table of contents
A sticky list on desktop, with a hairline rule down the left and the active link in ink. On phone it becomes a two-column list above the article. The article shows a thin ink progress bar across the top of the screen as the reader moves down the page.

### Motion grammar
- Reveal: blocks rise 28px and fade in once, over 0.9s with an ease-out expo curve. Stagger delays are 90ms between siblings.
- Hero photograph: settles from 1.06 scale over 1.6s on load.
- Stack: layer cards scale to 0.94 as the next layer arrives.
- Everything honours prefers-reduced-motion: reveals show at once, the marquee stops, and transitions are removed.

## Do's and Don'ts

### Do:
- **Do** use one oxblood action per screen (#6a1e2b).
- **Do** keep headlines in Marcellus at weight 400 and balance their lines.
- **Do** label every stock photograph on product pages with "Stock photo".
- **Do** keep forms and bag controls flat, with 1px ink borders.
- **Do** use the named type scale. Add a new step here before using a new size.

### Don't:
- **Don't** add shadows, gradients, glass or blur.
- **Don't** introduce a second accent colour.
- **Don't** draw line illustrations in place of photographs.
- **Don't** invent prices, ratings, stock or review counts in copy or structured data.
- **Don't** use rounded corners or pill shapes.
- **Don't** centre long body copy; keep the 65ch measure.
