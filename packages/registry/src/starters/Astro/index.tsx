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
  pricing: {
    price: null,
    features: ['Static generation', 'Islands architecture', 'Minimal JavaScript', 'Fast loading', 'Content collections'],
  },
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
      code: `// TypeScript configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'src/layouts/BaseLayout.astro',
      language: 'html',
      code: `// Base layout component`,
      isEntryPoint: false,
    },
    {
      filename: 'src/pages/index.astro',
      language: 'html',
      code: `// Home page`,
      isEntryPoint: true,
    },
    {
      filename: 'src/pages/about.astro',
      language: 'html',
      code: `// About page`,
      isEntryPoint: false,
    },
    {
      filename: 'src/styles/global.css',
      language: 'css',
      code: `// Global styles`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Astro Starter

A modern static site generator with islands architecture.

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
      <SiAstro size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
