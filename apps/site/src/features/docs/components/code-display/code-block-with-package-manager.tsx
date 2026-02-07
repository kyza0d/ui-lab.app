'use client';

import { CodeBlock } from './code-block';
import { PackageManagerTabs } from './package-manager-tabs';

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
    <div className="my-8 pt-2 [&>div:last-child>div:first-child]:m-0! "> <div className='px-4'>
      <PackageManagerTabs value={packageManager} onValueChange={onPackageManagerChange} />
    </div>
      <div>
        <CodeBlock language={language}>{code}</CodeBlock>
      </div>
    </div>
  );
}
