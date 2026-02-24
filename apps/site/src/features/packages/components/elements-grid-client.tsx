'use client';
import { GenericContentGrid } from '@/features/packages/components/generic-content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '@/features/packages/lib/get-element-preview';
import { usePurchaseModal } from './purchase-modal-client';
import type { ElementMetadata } from 'ui-lab-registry';
import { getPackageById } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
  packageId?: string;
  isPremium?: boolean;
}

function PremiumElementsGrid({ elements, packageId, isPremium }: ElementsGridClientProps) {
  const basePath = `/packages/${packageId}`;
  const modalContext = usePurchaseModal();

  const handleElementClick = (element: ElementMetadata) => {
    const pkg = getPackageById(packageId!);
    if (pkg) {
      modalContext.openModal(pkg);
    }
  };

  return (
    <GenericContentGrid
      items={elements}
      basePath={basePath}
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
      onItemClick={handleElementClick}
    />
  );
}

function FreeElementsGrid({ elements, packageId }: ElementsGridClientProps) {
  const basePath = packageId ? `/packages/${packageId}` : '/packages';

  return (
    <GenericContentGrid
      items={elements}
      basePath={basePath}
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
    />
  );
}

export function ElementsGridClient({ elements, packageId, isPremium = false }: ElementsGridClientProps) {
  if (isPremium && packageId) {
    return <PremiumElementsGrid elements={elements} packageId={packageId} isPremium={isPremium} />;
  }
  return <FreeElementsGrid elements={elements} packageId={packageId} isPremium={isPremium} />;
}
