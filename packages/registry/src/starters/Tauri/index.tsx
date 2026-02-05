import React from 'react';
import { SiTauri } from 'react-icons/si';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'tauri-desktop',
  name: 'Tauri Desktop Starter',
  description: 'Cross-platform desktop app with Rust backend and React frontend using Tauri framework',
  category: 'framework' as const,
  tags: ['tauri', 'rust', 'desktop', 'electron-alternative'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
  pricing: {
    price: null,
    features: ['Cross-platform', 'Rust backend', 'React frontend', 'Small bundle size', 'Native performance'],
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
      filename: 'vite.config.ts',
      language: 'typescript',
      code: `// Vite configuration with Tauri plugin`,
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
      code: `// HTML entry point`,
      isEntryPoint: false,
    },
    {
      filename: 'src/main.tsx',
      language: 'typescript',
      code: `// React entry point`,
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
      filename: 'src-tauri/Cargo.toml',
      language: 'toml',
      code: `// Rust dependencies and configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'src-tauri/tauri.conf.json',
      language: 'json',
      code: `// Tauri application configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'src-tauri/src/main.rs',
      language: 'rust',
      code: `// Rust backend entry point`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Tauri Desktop App

A cross-platform desktop application.

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
      <SiTauri size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
