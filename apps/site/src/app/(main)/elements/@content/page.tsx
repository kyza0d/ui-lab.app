'use client';

import { BreadcrumbsNav } from '@/features/navigation';
import { getAllPackages } from 'ui-lab-registry';
import { PackagesGridClient } from '@/features/elements';

export default function ElementsPage() {
  const packages = getAllPackages();

  return (
    <div className='pl-12 mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="font-bold text-foreground-50">Elements</h2>
          <p className="text-foreground-400 max-w-2xl">
            Copy-paste ready UI elements organized into packages. Click any package to explore its elements.
          </p>
        </div>
        <div className="space-y-6">
          <PackagesGridClient packages={packages} />
        </div>
      </div>
    </div>
  );
}
