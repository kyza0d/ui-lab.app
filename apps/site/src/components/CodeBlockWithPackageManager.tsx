'use client';

import { CodeBlock } from './CodeBlock';
import { PackageManagerTabs } from './PackageManagerTabs';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

interface CodeBlockWithPackageManagerProps {
  code: string;
  packageManager: PackageManager;
  onPackageManagerChange: (manager: PackageManager) => void;
  language?: string;
}

export function CodeBlockWithPackageManager({
  code,
  packageManager,
  onPackageManagerChange,
  language = 'bash',
}: CodeBlockWithPackageManagerProps) {
  return (
    <div className="my-8 overflow-hidden pt-2 rounded border border-foreground-800 [&>div:last-child>div:first-child]:!m-0 [&>div:last-child>div:first-child]:!rounded-none [&>div:last-child>div:first-child]:!border-none">
      <PackageManagerTabs value={packageManager} onValueChange={onPackageManagerChange} />
      <div>
        <CodeBlock language={language}>{code}</CodeBlock>
      </div>
    </div>
  );
}
