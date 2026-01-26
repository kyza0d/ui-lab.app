import { readdir } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { Suspense } from 'react';

interface DevRoute {
  slug: string;
  title: string;
  href: string;
}

async function getDevRoutes(): Promise<DevRoute[]> {
  try {
    const devDir = path.join(process.cwd(), 'src/app/dev');
    const entries = await readdir(devDir, { withFileTypes: true });

    const routes: DevRoute[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      if (
        entry.name.startsWith('.') ||
        entry.name.startsWith('@') ||
        entry.name.includes('(') ||
        entry.name.includes(')') ||
        entry.name.includes('[') ||
        entry.name.includes(']') ||
        entry.name === 'node_modules'
      ) {
        continue;
      }

      const dirPath = path.join(devDir, entry.name);
      try {
        const dirContents = await readdir(dirPath);
        if (!dirContents.includes('page.tsx')) continue;
      } catch {
        continue;
      }

      routes.push({
        slug: entry.name,
        title: formatTitle(entry.name),
        href: `/dev/${entry.name}`,
      });
    }

    return routes.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error scanning dev directory:', error);
    return [];
  }
}

function formatTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function DevRoutesList() {
  const routes = await getDevRoutes();

  if (routes.length === 0) {
    return (
      <div className="p-4 text-foreground-400">No dev routes found.</div>
    );
  }

  return (
    <div className="border border-background-700 rounded-md overflow-hidden">
      <ul className="divide-y divide-background-700">
        {routes.map((route) => (
          <li key={route.slug}>
            <Link
              href={route.href}
              className="block px-6 py-4 hover:bg-background-800/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground-100 font-medium">{route.title}</span>
                <span className="text-foreground-500 text-sm font-mono">{route.href}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DevIndexPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground-50">Dev Routes</h1>
          <p className="text-foreground-400">
            Development pages for component testing and experimentation.
          </p>
        </div>

        <Suspense fallback={<div className="p-4 text-foreground-400">Loading routes...</div>}>
          <DevRoutesList />
        </Suspense>
      </div>
    </div>
  );
}
