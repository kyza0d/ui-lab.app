'use client';

import { BreadcrumbsNav } from '@/features/navigation';
import { getAllPackages } from 'ui-lab-registry';
import { PackagesGridClient } from '@/features/packages';
import { GridCTA } from '@/features/landing/components/grid-cta';
import type { ElementPackageMetadata } from 'ui-lab-registry';

const placeholderPackages: ElementPackageMetadata[] = [
  {
    id: 'premium-ui-kit',
    name: 'Premium UI Kit',
    description: 'Advanced component collection with enterprise-grade styling and interactions.',
    tags: ['premium', 'enterprise', 'advanced'],
    elements: ['Button', 'Input', 'Modal', 'Dropdown'],
    pricing: { price: 49.99, gumroadProductId: 'premium-ui-kit' },
    gumroadProductId: 'premium-ui-kit',
  },
  {
    id: 'pro-components',
    name: 'Pro Components',
    description: 'Extended component library with specialized controls and complex interactions.',
    tags: ['pro', 'advanced', 'specialized'],
    elements: ['DatePicker', 'TimePicker', 'FileUpload', 'RichEditor'],
    pricing: { price: 29.99, gumroadProductId: 'pro-components' },
    gumroadProductId: 'pro-components',
  }
];

export default function ElementsPage() {
  const packages = getAllPackages();
  const allPackages = [...packages, ...placeholderPackages];

  return (
    <div className='mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="font-bold text-foreground-50">Packages</h2>
          <p className="text-foreground-400 max-w-2xl">
            Copy-paste ready UI elements organized into packages. Click any package to explore its elements.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="space-y-6">
            <PackagesGridClient packages={allPackages} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[200px]  pointer-events-none bg-gradient-to-b from-transparent from-0% via-background-950 via-70% to-background-950 to-100%" />
        </div>
        <div className="-mt-60 relative z-10 px-6 py-16">
          <GridCTA contentType="packages" />
        </div>
      </div>
    </div>
  );
}
