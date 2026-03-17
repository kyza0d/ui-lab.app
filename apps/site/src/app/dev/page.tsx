import Link from "next/link";
import { generateMetadata as buildMetadata } from "@/shared/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  pathname: "/dev",
  title: "Dev Playground",
  description: "Internal development playground routes for UI Lab experiments and examples.",
});

const devRoutes = [
  { slug: "examples", title: "Examples" },
  { slug: "color", title: "Color" },
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
