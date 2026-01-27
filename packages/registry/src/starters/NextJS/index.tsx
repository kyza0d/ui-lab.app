import React from 'react';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'nextjs-basic',
  name: 'Next.js Starter',
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
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  variants: [
    {
      name: 'Basic',
      description: 'Minimal Next.js starter with essential configuration',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "nextjs-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
          isEntryPoint: false,
        },
        {
          filename: 'next.config.js',
          language: 'javascript',
          code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;`,
          isEntryPoint: false,
        },
        {
          filename: 'app/layout.tsx',
          language: 'tsx',
          code: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/page.tsx',
          language: 'tsx',
          code: `export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Next.js
      </h1>
      <p className="text-lg text-gray-600">
        Start building your app by editing app/page.tsx
      </p>
    </main>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/globals.css',
          language: 'css',
          code: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
    to bottom,
    transparent,
    rgb(var(--background-end-rgb))
  )
  rgb(var(--background-start-rgb));
}`,
          isEntryPoint: false,
        },
        {
          filename: '.gitignore',
          language: 'text',
          code: `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`,
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
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)`,
          isEntryPoint: false,
        },
      ],
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-3">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="currentColor"/>
          </mask>
          <g mask="url(#mask0)">
            <circle cx="90" cy="90" r="90" fill="currentColor" className="text-foreground-50"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/>
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" className="text-background-950"/>
              <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-background-950"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" className="text-background-950"/>
              <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-background-950"/>
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
