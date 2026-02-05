"use client"
import Link from "next/link";

const devRoutes = [
  { slug: "examples", title: "Examples" },
  { slug: "color", title: "Color" },
  { slug: "date", title: "Date" },
  { slug: "pattern", title: "Pattern" },
  { slug: "sidebar", title: "Sidebar" },
  { slug: "typography", title: "Typography" },
];

export default function DevIndexPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dev Playground</h1>
      <ul className="space-y-2">
        {devRoutes.map((route) => (
          <li key={route.slug}>
            <Link href={`/dev/${route.slug}`} className="hover:underline">
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
