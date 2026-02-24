'use client';
import { GenericContentGrid } from '@/features/packages/components/generic-content-grid';
import { getPackageLayoutConfig } from '../lib/get-package-layout-config';
import { getPackagePreviewComponent } from '../lib/get-package-preview';
import type { ElementPackageMetadata } from 'ui-lab-registry';

interface PackagesGridClientProps {
  packages: ElementPackageMetadata[];
}

export function PackagesGridClient({ packages }: PackagesGridClientProps) {
  return (
    <GenericContentGrid
      items={packages}
      basePath="/packages"
      getLayoutConfig={getPackageLayoutConfig}
      getPreviewComponent={getPackagePreviewComponent}
      showCTA={true}
      ctaContentType="packages"
    />
  );
}
