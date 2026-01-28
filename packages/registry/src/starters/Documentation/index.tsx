import React from 'react';
import { FaBook } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'docs-site',
  name: 'Documentation Site Starter',
  description: 'Professional documentation site template with sidebar navigation and code highlighting',
  category: 'documentation' as const,
  tags: ['documentation', 'astro', 'markdown', 'api-docs'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  variants: [
    {
      name: 'API Documentation',
      description: 'Structured API documentation with code examples and navigation',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "docs-starter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'astro.config.mjs',
          language: 'javascript',
          code: `import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/DocsLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;

const sidebar = [
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Installation', href: '/docs/installation' },
  { label: 'Configuration', href: '/docs/configuration' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Examples', href: '/docs/examples' },
];
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} - Documentation</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #333;
        background: #fff;
      }
      .container {
        display: flex;
        min-height: 100vh;
      }
      .sidebar {
        width: 250px;
        background: #f8f9fa;
        padding: 2rem 1rem;
        border-right: 1px solid #e0e0e0;
        position: fixed;
        height: 100vh;
        overflow-y: auto;
      }
      .sidebar h2 {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        color: #666;
        margin-bottom: 1rem;
        margin-top: 1.5rem;
      }
      .sidebar a {
        display: block;
        padding: 0.5rem 0.75rem;
        color: #333;
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.9rem;
        transition: background 0.2s;
      }
      .sidebar a:hover {
        background: #e0e0e0;
      }
      .main-content {
        margin-left: 250px;
        flex: 1;
        padding: 2rem;
        max-width: 900px;
      }
      h1 {
        margin-bottom: 0.5rem;
        font-size: 2rem;
      }
      .description {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }
      h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 0.5rem;
      }
      code {
        background: #f5f5f5;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
      pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 1rem 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav class="sidebar">
        <h2>Documentation</h2>
        {sidebar.map(item => (
          <a href={item.href}>{item.label}</a>
        ))}
      </nav>
      <main class="main-content">
        <h1>{title}</h1>
        {description && <p class="description">{description}</p>}
        <slot />
      </main>
    </div>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/docs/getting-started.astro',
          language: 'html',
          code: `---
import DocsLayout from '../../layouts/DocsLayout.astro';
---

<DocsLayout title="Getting Started" description="Learn how to get started with our project">
  <h2>Installation</h2>
  <pre><code>npm install my-package</code></pre>

  <h2>Basic Usage</h2>
  <p>Here's a simple example to get you started:</p>
  <pre><code>import { MyClass } from 'my-package';

const instance = new MyClass();
instance.doSomething();</code></pre>

  <h2>Next Steps</h2>
  <p>Check out the <a href="/docs/api">API Reference</a> for more details.</p>
</DocsLayout>`,
          isEntryPoint: true,
        },
        {
          filename: 'src/pages/docs/api.astro',
          language: 'html',
          code: `---
import DocsLayout from '../../layouts/DocsLayout.astro';
---

<DocsLayout title="API Reference" description="Complete API documentation">
  <h2>Classes</h2>

  <h3>MyClass</h3>
  <p>Main class for core functionality.</p>
  <pre><code>class MyClass {
  constructor(config?: Config)
  doSomething(): void
  getValue(): string
}</code></pre>

  <h2>Functions</h2>

  <h3>helper()</h3>
  <p>A helper function for common tasks.</p>
  <pre><code>function helper(input: string): string</code></pre>
</DocsLayout>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/index.astro',
          language: 'html',
          code: `---
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Documentation</title>
    <style>
      body { font-family: sans-serif; margin: 0; padding: 2rem; }
      .hero { max-width: 800px; margin: 0 auto; text-align: center; }
      h1 { font-size: 3rem; margin-bottom: 1rem; }
      .button {
        display: inline-block;
        padding: 0.75rem 2rem;
        background: #0066cc;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>Documentation</h1>
      <p>Beautiful, fast documentation site powered by Astro</p>
      <a href="/docs/getting-started" class="button">Get Started</a>
    </div>
  </body>
</html>`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Documentation Site Starter

A professional documentation site template built with Astro.

## Features

- 📚 Sidebar navigation
- 🎨 Clean, readable design
- ⚡ Fast load times
- 📱 Responsive layout
- 🔍 SEO optimized

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Structure

- \`src/pages/\` - Documentation pages
- \`src/layouts/\` - Layout templates
- \`astro.config.mjs\` - Configuration

## Customization

Edit \`src/layouts/DocsLayout.astro\` to customize the sidebar and layout.`,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'Multi-Version Docs',
      description: 'Documentation with version switching and search functionality',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "versioned-docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@astrojs/react": "^3.0.0",
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'astro.config.mjs',
          language: 'javascript',
          code: `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://example.com',
});`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/VersionedDocsLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
  version?: string;
}

const { title, version = 'latest' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} - v{version}</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
        background: #fff;
      }
      header {
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .version-badge {
        background: #0066cc;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
      }
      main {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
      }
      h1 {
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>{title}</h1>
      <span class="version-badge">v{version}</span>
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/VersionSwitcher.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface Props {
  versions?: string[];
  currentVersion?: string;
}

export default function VersionSwitcher({
  versions = ['3.x', '2.x', '1.x'],
  currentVersion = 'latest'
}: Props) {
  const [selected, setSelected] = useState(currentVersion);

  return (
    <div style={{
      padding: '1rem',
      background: '#f5f5f5',
      borderRadius: '4px',
      marginBottom: '2rem'
    }}>
      <label htmlFor="version-select">Documentation Version:</label>
      <select
        id="version-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          marginLeft: '0.5rem',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
      >
        {versions.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
        You are viewing {selected} documentation
      </p>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/SearchDocs.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface SearchResult {
  title: string;
  url: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { title: 'Getting Started', url: '/docs/getting-started' },
  { title: 'API Reference', url: '/docs/api' },
  { title: 'Installation Guide', url: '/docs/installation' },
];

export default function SearchDocs() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 0) {
      const filtered = MOCK_RESULTS.filter(r =>
        r.title.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        type="search"
        placeholder="Search documentation..."
        value={query}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      {results.length > 0 && (
        <ul style={{
          listStyle: 'none',
          padding: '0.5rem 0',
          marginTop: '0.5rem'
        }}>
          {results.map(r => (
            <li key={r.url}>
              <a href={r.url} style={{ color: '#0066cc', textDecoration: 'none' }}>
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/docs/v3/index.astro',
          language: 'html',
          code: `---
import VersionedDocsLayout from '../../../layouts/VersionedDocsLayout.astro';
import VersionSwitcher from '../../../components/VersionSwitcher';
import SearchDocs from '../../../components/SearchDocs';
---

<VersionedDocsLayout title="Documentation" version="3.x">
  <SearchDocs client:load />
  <VersionSwitcher client:load versions={['3.x', '2.x', '1.x']} currentVersion="3.x" />

  <h2>Welcome to Version 3.x</h2>
  <p>This version includes major improvements and new features.</p>

  <h2>Changelog</h2>
  <ul>
    <li>New API endpoints</li>
    <li>Performance improvements</li>
    <li>Enhanced documentation</li>
    <li>Better TypeScript support</li>
  </ul>
</VersionedDocsLayout>`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Multi-Version Documentation Starter

Documentation site with version switching and search capabilities.

## Features

- 🔀 Version switching
- 🔍 Search functionality
- 📚 Multi-version support
- ⚛️ React components for interactivity
- 🎨 Professional design

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Adding Versions

Create new directories under \`src/pages/docs/\` for each version (v2, v3, etc.).

## Build

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-3 w-full h-full">
      <FaBook size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
