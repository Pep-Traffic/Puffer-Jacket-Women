// Line icons for the five categories, drawn in one style: 32px grid, 1.5px
// stroke, round joins. Each icon is decorative; the category name beside it
// carries the meaning.
const paths: Record<string, React.ReactNode> = {
  "long-sleeve": (
    <>
      <path d="M12 4.5Q16 7.5 20 4.5L26 7.5L29 20L25 21.5L22.5 11.5V28.5H9.5V11.5L7 21.5L3 20L6 7.5Z" />
      <path d="M16 7.5V28.5" />
      <path d="M9.5 17H22.5" />
    </>
  ),
  sleeveless: (
    <>
      <path d="M11 5L9 9V28.5H23V9L21 5Q16 8.5 11 5Z" />
      <path d="M16 8.5V28.5" />
      <path d="M9 17H23" />
    </>
  ),
  "short-sleeve": (
    <>
      <path d="M12 4.5Q16 7.5 20 4.5L27.5 8.5L24.5 13.5L22.5 12V28.5H9.5V12L7.5 13.5L4.5 8.5Z" />
    </>
  ),
  "caps-hats": (
    <>
      <path d="M6.5 19.5Q6.5 6.5 16 6.5Q25.5 6.5 25.5 19.5" />
      <rect x="6" y="19.5" width="20" height="6" rx="1" />
      <path d="M10.5 19.5V25.5M14.5 19.5V25.5M17.5 19.5V25.5M21.5 19.5V25.5" />
      <circle cx="16" cy="4" r="1.6" />
    </>
  ),
  accessories: (
    <>
      <path d="M8 9Q16 5.5 24 9V12.5Q16 16 8 12.5Z" />
      <path d="M9 13L8.5 27H12.5L13 14.5" />
      <path d="M19 14.5L19.5 27H23.5L23 13" />
    </>
  ),
};

export default function CategoryIcon({ slug }: { slug: string }) {
  const art = paths[slug];
  if (!art) return null;
  return (
    <svg
      viewBox="0 0 32 32"
      width={36}
      height={36}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {art}
    </svg>
  );
}
