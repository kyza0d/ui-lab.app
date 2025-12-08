'use client';

import { Tabs, TabsList, TabsTrigger } from '@ui-lab/components';
import { FaNpm, FaYarn, FaBox } from 'react-icons/fa6';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

interface PackageManagerTabsProps {
  value: PackageManager;
  onValueChange: (value: PackageManager) => void;
}

const packageManagers = [
  { id: 'npm', label: 'npm', icon: <FaNpm size={16} /> },
  { id: 'pnpm', label: 'pnpm', icon: <FaBox size={16} /> },
  { id: 'yarn', label: 'yarn', icon: <FaYarn size={16} /> },
  { id: 'bun', label: 'bun', icon: <FaBox size={16} /> },
] as const;

export function PackageManagerTabs({ value, onValueChange }: PackageManagerTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange as any}>
      <TabsList variant="underline" className="border-b border-foreground-800 rounded-none px-0">
        {packageManagers.map((pm) => (
          <TabsTrigger
            key={pm.id}
            value={pm.id}
            icon={pm.icon}
            className="rounded-none"
          >
            {pm.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
