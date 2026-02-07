import React from 'react';
import { FaBriefcase } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'crm-starter',
  name: 'CRM System Starter',
  description: 'Customer Relationship Management template with contact management and interaction tracking',
  category: 'crm' as const,
  tags: ['crm', 'customers', 'sales', 'nextjs'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
  pricing: {
    price: 49.99,
    features: ['Contact management', 'Customer tracking', 'Interaction history', 'Dashboard', 'Reporting tools'],
    gumroadProductId: 'crm-starter',
  },
  gumroadProductId: 'crm-starter',
  bundledElements: ['table', 'form', 'chart'],
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
      code: `// Root layout with sidebar`,
      isEntryPoint: true,
    },
    {
      filename: 'app/page.tsx',
      language: 'tsx',
      code: `// Dashboard page`,
      isEntryPoint: true,
    },
    {
      filename: 'app/customers/page.tsx',
      language: 'tsx',
      code: `// Customers list page`,
      isEntryPoint: false,
    },
    {
      filename: 'app/customers/[id]/page.tsx',
      language: 'tsx',
      code: `// Customer detail page`,
      isEntryPoint: false,
    },
    {
      filename: 'app/contacts/page.tsx',
      language: 'tsx',
      code: `// Contacts management page`,
      isEntryPoint: false,
    },
    {
      filename: 'components/CustomerForm.tsx',
      language: 'typescript',
      code: `// Customer form component`,
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
      code: `# CRM System

A customer relationship management system.

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
      <FaBriefcase size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
