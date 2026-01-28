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
      filename: 'src/layouts/DocLayout.astro',
      language: 'html',
      code: `// Documentation layout with sidebar`,
      isEntryPoint: false,
    },
    {
      filename: 'src/pages/index.astro',
      language: 'html',
      code: `// Documentation home page`,
      isEntryPoint: true,
    },
    {
      filename: 'src/pages/api/[...slug].astro',
      language: 'html',
      code: `// API endpoint documentation`,
      isEntryPoint: false,
    },
    {
      filename: 'src/pages/guides/[...slug].astro',
      language: 'html',
      code: `// Guide pages`,
      isEntryPoint: false,
    },
    {
      filename: 'src/components/Sidebar.astro',
      language: 'html',
      code: `// Navigation sidebar`,
      isEntryPoint: false,
    },
    {
      filename: 'src/styles/docs.css',
      language: 'css',
      code: `// Documentation styles`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Documentation Site

A professional documentation site template.

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
      <FaBook size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
