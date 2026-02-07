'use client';
import { GenericContentGrid } from '@/features/elements/components/generic-content-grid';
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
      basePath="/elements"
      getLayoutConfig={getPackageLayoutConfig}
      getPreviewComponent={getPackagePreviewComponent}
      showCTA={true}
      ctaContentType="elements"
    />
  );
}
