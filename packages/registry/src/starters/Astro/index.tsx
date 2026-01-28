import React from 'react';
import { SiAstro } from 'react-icons/si';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'astro-static',
  name: 'Astro Starter',
  description: 'Modern static site generator with islands architecture for zero-JavaScript by default',
  category: 'framework' as const,
  tags: ['astro', 'static-site', 'islands', 'zero-js'],
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
      name: 'Static Blog',
      description: 'Astro starter with markdown pages and static content',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "astro-blog-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
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
  integrations: [],
});`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsxImportSource": "react"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/BaseLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <style>
      :root {
        --text-color: #333;
        --background-color: #fff;
        --border-color: #ddd;
      }
      body {
        font-family: system-ui, sans-serif;
        margin: 0;
        padding: 0;
        color: var(--text-color);
        background-color: var(--background-color);
      }
      header {
        padding: 2rem;
        border-bottom: 1px solid var(--border-color);
      }
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>{title}</h1>
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/index.astro',
          language: 'html',
          code: `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <h1>Welcome to Astro</h1>
  <p>This is a static site built with Astro.</p>
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</BaseLayout>`,
          isEntryPoint: true,
        },
        {
          filename: 'src/pages/about.astro',
          language: 'html',
          code: `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <h1>About</h1>
  <p>Learn more about this Astro site.</p>
  <p>Astro lets you build faster websites with less JavaScript.</p>
</BaseLayout>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/blog/index.astro',
          language: 'html',
          code: `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Blog">
  <h1>Blog Posts</h1>
  <ul>
    <li><a href="/blog/first-post">First Post</a></li>
    <li><a href="/blog/second-post">Second Post</a></li>
  </ul>
</BaseLayout>`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Astro Static Blog Starter

A minimal blog starter built with Astro, featuring zero JavaScript by default.

## Features

- 🚀 Fast static site generation
- 📝 Markdown content support
- ⚡ Zero JavaScript by default
- 📱 Responsive design
- 🎯 SEO optimized

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

## File Structure

- \`src/pages/\` - Routes and pages
- \`src/layouts/\` - Page layouts
- \`src/components/\` - Reusable components`,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'With React Islands',
      description: 'Astro with interactive React components for dynamic functionality',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "astro-islands-starter",
  "version": "0.1.0",
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
    "@types/react": "^19",
    "@types/react-dom": "^19",
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
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsxImportSource": "react"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/layouts/BaseLayout.astro',
          language: 'html',
          code: `---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        margin: 0;
        padding: 0;
      }
      header {
        padding: 2rem;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>{title}</h1>
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/Counter.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface Props {
  initialCount?: number;
}

export default function Counter({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/components/TodoList.tsx',
          language: 'typescript',
          code: `import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Todo List</h3>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/index.astro',
          language: 'html',
          code: `---
import BaseLayout from '../layouts/BaseLayout.astro';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';
---

<BaseLayout title="Interactive Astro Site">
  <h1>Welcome to Astro with React Islands</h1>
  <p>Below are interactive React components that only load JavaScript when needed.</p>

  <Counter client:load initialCount={5} />
  <TodoList client:visible />
</BaseLayout>`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Astro + React Islands Starter

Build interactive websites with Astro's island architecture, loading React only where needed.

## Features

- 🏝️ Islands architecture
- ⚛️ React components where needed
- ⚡ Minimal JavaScript
- 🚀 Static generation
- 📱 Responsive design

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## How It Works

Components use \`client:load\` or \`client:visible\` directives to hydrate only interactive parts.

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
      <SiAstro size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
