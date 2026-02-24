'use client';

import { Code } from './code';
import { PackageManagerTabs } from './package-manager-tabs';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

interface CodeWithPackageManagerProps {
  code: string;
  packageManager: PackageManager;
  onPackageManagerChange: (manager: PackageManager) => void;
  language?: string;
}

export function CodeWithPackageManager({
  code,
  packageManager,
  onPackageManagerChange,
  language = 'bash',
}: CodeWithPackageManagerProps) {
  return (
    <div className="my-8 pt-2 [&>div:last-child>div:first-child]:m-0! "> <div className='px-4'>
      <PackageManagerTabs value={packageManager} onValueChange={onPackageManagerChange} />
    </div>
      <div>
        <Code language={language}>{code}</Code>
      </div>
    </div>
  );
}
