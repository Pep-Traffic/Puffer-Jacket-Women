import Link from "next/link";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} aria-current={last ? "page" : undefined}>
              {last ? item.name : <Link href={item.path}>{item.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
