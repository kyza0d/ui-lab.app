import React from 'react';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'nextjs-basic',
  name: 'Next.js 16 Starter',
  description: 'Basic Next.js App Router starter with TypeScript and modern best practices',
  category: 'app' as const,
  tags: ['nextjs', 'typescript', 'app-router', 'react'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
  pricing: {
    price: null,
    features: ['App Router', 'TypeScript support', 'Modern tooling', 'Optimized build', 'Best practices'],
  },
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  files: [
    {
      filename: 'package.json',
      language: 'json',
      code: `// Package dependencies and scripts`,
      isEntryPoint: false,
    },
    {
      filename: 'tsconfig.json',
      language: 'json',
      code: `// TypeScript compiler options`,
      isEntryPoint: false,
    },
    {
      filename: 'next.config.js',
      language: 'javascript',
      code: `// Next.js configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'app/layout.tsx',
      language: 'tsx',
      code: `// Root layout component`,
      isEntryPoint: true,
    },
    {
      filename: 'app/page.tsx',
      language: 'tsx',
      code: `// Home page component`,
      isEntryPoint: true,
    },
    {
      filename: 'app/globals.css',
      language: 'css',
      code: `// Global styles`,
      isEntryPoint: false,
    },
    {
      filename: '.gitignore',
      language: 'text',
      code: `// Git ignore patterns`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Next.js Starter

This is a basic Next.js starter template with TypeScript and App Router.

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.`,
      isEntryPoint: false,
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-3">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="currentColor" />
          </mask>
          <g mask="url(#mask0)">
            <circle cx="90" cy="90" r="90" fill="currentColor" className="text-foreground-50" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" className="text-background-950" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-background-950" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" className="text-background-950" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-background-950" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="text-sm font-semibold text-foreground-50">Next.js</div>
          <div className="text-xs text-foreground-400">App Router + TypeScript</div>
        </div>
      </div>
      <div className="flex-1 border border-background-700 rounded bg-background-900/50 p-2 text-xs font-mono">
        <div className="text-foreground-300 mb-1">📁 Project Structure</div>
        <div className="pl-2 text-foreground-500 space-y-0.5">
          <div>📄 package.json</div>
          <div>📄 tsconfig.json</div>
          <div>📄 next.config.js</div>
          <div>📁 app/</div>
          <div className="pl-3">
            <div>📄 layout.tsx</div>
            <div>📄 page.tsx</div>
            <div>📄 globals.css</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
