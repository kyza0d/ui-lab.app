import React from 'react';
import { FaPen } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'blog-platform',
  name: 'Blog Platform Starter',
  description: 'Blogging platform template with markdown content, categories, and social sharing',
  category: 'documentation' as const,
  tags: ['blog', 'astro', 'markdown', 'content'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
  pricing: {
    price: 49.99,
    features: ['Markdown support', 'Categories & tags', 'Social sharing', 'Search functionality', 'Comment system'],
    gumroadProductId: 'blog-starter',
  },
  gumroadProductId: 'blog-starter',
  bundledElements: ['toc', 'copypage', 'nextarticle'],
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  files: [
    {
      filename: 'package.json',
      language: 'json',
      code: `// Package dependencies and scripts`,
      isEntryPoint: true,
    },
    {
      filename: 'astro.config.mjs',
      language: 'javascript',
      code: `// Astro configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'tsconfig.json',
      language: 'json',
      code: `// TypeScript compiler options`,
      isEntryPoint: false,
    },
    {
      filename: 'src/layouts/BlogLayout.astro',
      language: 'html',
      code: `// Blog layout component`,
      isEntryPoint: false,
    },
    {
      filename: 'src/pages/index.astro',
      language: 'html',
      code: `// Blog home page`,
      isEntryPoint: true,
    },
    {
      filename: 'src/pages/posts/[...slug].astro',
      language: 'html',
      code: `// Individual blog post page`,
      isEntryPoint: false,
    },
    {
      filename: 'src/pages/archive.astro',
      language: 'html',
      code: `// Blog archive page`,
      isEntryPoint: false,
    },
    {
      filename: 'src/styles/blog.css',
      language: 'css',
      code: `// Blog styles`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Blog Platform

A markdown-based blogging platform.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\``,
      isEntryPoint: false,
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-3 w-full h-full">
      <FaPen size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
