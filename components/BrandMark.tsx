import { brandMarks, type BrandMarkName } from "@/lib/brand-marks";

// A real brand mark, drawn from its official path and shown in its brand colour.
export default function BrandMark({ name, size = 20 }: { name: BrandMarkName; size?: number }) {
  const mark = brandMarks[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${mark.hex}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={mark.path} />
    </svg>
  );
}
