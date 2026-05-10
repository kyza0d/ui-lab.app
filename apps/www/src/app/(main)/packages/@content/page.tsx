import { getAllPackages } from 'ui-lab-registry';
import { GenericContentGrid } from '@/features/layout';
import { getPackageLayoutConfig, getPackagePreviewComponent } from '@/features/packages';
import { GridCTA } from '@/features/landing/components/grid-cta';
import type { ElementPackageMetadata } from 'ui-lab-registry';
import { Metadata } from 'next';
import { generateMetadata as buildMetadata } from '@/shared/lib/metadata';
import React from 'react';

export const metadata: Metadata = buildMetadata({
  pathname: '/packages',
  title: 'Packages',
  description: 'Browse UI Lab packages, premium kits, and bundled element collections.',
});

const placeholderPackages: ElementPackageMetadata[] = [
  {
    id: 'premium-ui-kit',
    name: 'Premium UI Kit',
    description: 'Advanced component collection with enterprise-grade styling and interactions.',
    tags: ['premium', 'enterprise', 'advanced'],
    elements: ['Button', 'Input', 'Modal', 'Dropdown'],
    pricing: { price: 49.99, gumroadProductId: 'premium-ui-kit' },
    layout: { columnSpan: 1 },
    gumroadProductId: 'premium-ui-kit',
  },
  {
    id: 'pro-components',
    name: 'Pro Components',
    description: 'Extended component library with specialized controls and complex interactions.',
    tags: ['pro', 'advanced', 'specialized'],
    elements: ['DatePicker', 'TimePicker', 'FileUpload', 'RichEditor'],
    layout: { columnSpan: 1 },
    pricing: { price: 29.99, gumroadProductId: 'pro-components' },
    gumroadProductId: 'pro-components',
  }
];

export default function ElementsPage() {
  const packages = getAllPackages();
  const allPackages = [...packages, ...placeholderPackages];
  const serializablePackages = allPackages.map(({ getPreview: _getPreview, ...rest }) => rest as ElementPackageMetadata);
  const previews: Record<string, React.ReactNode> = {};
  const layoutConfigs: Record<string, import('ui-lab-registry').LayoutConfig> = {};
  for (const pkg of allPackages) {
    const C = getPackagePreviewComponent(pkg.id);
    if (C) previews[pkg.id] = <C />;
    layoutConfigs[pkg.id] = getPackageLayoutConfig(pkg as ElementPackageMetadata);
  }

  return (
    <div className='mt-20 pt-(header-height) pointer-events-none'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="relative overflow-hidden h-screen">
          <div className="space-y-6">
            <GenericContentGrid
              items={serializablePackages}
              basePath="/packages"
              layoutConfigs={layoutConfigs}
              previews={previews}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-950/60 from-0% via-background-950/90 via-40% to-background-950 pointer-events-none z-20" />
          <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2 flex justify-center z-30 pointer-events-auto px-6 py-16">
            <GridCTA contentType="packages" />
          </div>
        </div>
      </div>
    </div>
  );
}
