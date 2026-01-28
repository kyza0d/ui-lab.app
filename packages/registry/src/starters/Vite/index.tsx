import React from 'react';
import { SiVite } from 'react-icons/si';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'vite-react',
  name: 'Vite + React Starter',
  description: 'Modern, fast build tool with React 19 and TypeScript for instant development experience',
  category: 'framework' as const,
  tags: ['vite', 'react', 'typescript', 'fast-refresh'],
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
      filename: 'vite.config.ts',
      language: 'typescript',
      code: `// Vite configuration with React plugin`,
      isEntryPoint: false,
    },
    {
      filename: 'tsconfig.json',
      language: 'json',
      code: `// TypeScript compiler options`,
      isEntryPoint: false,
    },
    {
      filename: 'index.html',
      language: 'html',
      code: `// HTML entry point with root div`,
      isEntryPoint: false,
    },
    {
      filename: 'src/main.tsx',
      language: 'typescript',
      code: `// Application entry point`,
      isEntryPoint: true,
    },
    {
      filename: 'src/App.tsx',
      language: 'typescript',
      code: `// Main app component`,
      isEntryPoint: true,
    },
    {
      filename: 'src/index.css',
      language: 'css',
      code: `// Global styles`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Vite + React Starter

A modern, lightweight starter template using Vite and React 19 with TypeScript.

## Getting Started

Install dependencies:
\`\`\`bash
npm install
\`\`\`

Start development server:
\`\`\`bash
npm run dev
\`\`\``,
      isEntryPoint: false,
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-3 w-full h-full">
      <SiVite size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
