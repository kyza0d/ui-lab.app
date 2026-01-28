import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'productivity-app',
  name: 'Productivity App Starter',
  description: 'Task and note management application template with local storage persistence',
  category: 'productivity' as const,
  tags: ['productivity', 'nextjs', 'tasks', 'notes'],
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
      isEntryPoint: false,
    },
    {
      filename: 'next.config.js',
      language: 'javascript',
      code: `// Next.js configuration`,
      isEntryPoint: false,
    },
    {
      filename: 'tsconfig.json',
      language: 'json',
      code: `// TypeScript compiler options`,
      isEntryPoint: false,
    },
    {
      filename: 'app/layout.tsx',
      language: 'tsx',
      code: `// Root layout`,
      isEntryPoint: true,
    },
    {
      filename: 'app/page.tsx',
      language: 'tsx',
      code: `// Productivity app page`,
      isEntryPoint: true,
    },
    {
      filename: 'components/TaskInput.tsx',
      language: 'typescript',
      code: `// Task input component`,
      isEntryPoint: false,
    },
    {
      filename: 'components/TaskList.tsx',
      language: 'typescript',
      code: `// Task list component`,
      isEntryPoint: false,
    },
    {
      filename: 'app/globals.css',
      language: 'css',
      code: `// Global styles`,
      isEntryPoint: false,
    },
    {
      filename: 'README.md',
      language: 'markdown',
      code: `# Productivity App

A task and note management application.

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
      <FaCheck size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
