import Link from "next/link";
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getExampleCategories() {
  try {
    const entries = readdirSync(__dirname, { withFileTypes: true });

    const categories = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
      .map(entry => ({
        slug: entry.name,
        title: toTitleCase(entry.name),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));

    return categories;
  } catch (error) {
    console.error("Failed to read examples directory:", error);
    return [];
  }
}

export default function ExamplesIndexPage() {
  const exampleCategories = getExampleCategories();

  return (
    <div className="p-8">
      <Link href="/dev" className="hover:underline text-sm mb-6 inline-block">
        ← Dev Playground
      </Link>

      <h1 className="text-2xl font-bold mb-6">Examples in Development</h1>

      <ul className="space-y-2">
        {exampleCategories.map((category) => (
          <li key={category.slug}>
            <Link href={`/dev/examples/${category.slug}`} className="hover:underline">
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
