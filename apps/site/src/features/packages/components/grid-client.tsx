'use client';
import React from 'react';
import { GenericContentGrid } from './content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '@/features/packages/lib/get-element-preview';
import { usePurchaseModal } from './purchase-modal';
import type { ElementMetadata } from 'ui-lab-registry';
import { getPackageById } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
  packageId?: string;
  isPremium?: boolean;
}

function buildPreviews(elements: ElementMetadata[]) {
  const result: Record<string, React.ReactNode> = {};
  for (const el of elements) {
    const C = getPreviewComponent(el.id);
    if (C) result[el.id] = <C />;
  }
  return result;
}

function buildLayoutConfigs(elements: ElementMetadata[]) {
  const result: Record<string, ReturnType<typeof getLayoutConfig>> = {};
  for (const el of elements) {
    result[el.id] = getLayoutConfig(el);
  }
  return result;
}

function PremiumElementsGrid({ elements, packageId, isPremium }: ElementsGridClientProps) {
  const basePath = `/packages/${packageId}`;
  const modalContext = usePurchaseModal();
  const previews = buildPreviews(elements);
  const layoutConfigs = buildLayoutConfigs(elements);

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
      layoutConfigs={layoutConfigs}
      previews={previews}
      onItemClick={handleElementClick}
    />
  );
}

function FreeElementsGrid({ elements, packageId }: ElementsGridClientProps) {
  const basePath = packageId ? `/packages/${packageId}` : '/packages';
  const previews = buildPreviews(elements);
  const layoutConfigs = buildLayoutConfigs(elements);

  return (
    <GenericContentGrid
      items={elements}
      basePath={basePath}
      layoutConfigs={layoutConfigs}
      previews={previews}
    />
  );
}

export function ElementsGridClient({ elements, packageId, isPremium = false }: ElementsGridClientProps) {
  if (isPremium && packageId) {
    return <PremiumElementsGrid elements={elements} packageId={packageId} isPremium={isPremium} />;
  }
  return <FreeElementsGrid elements={elements} packageId={packageId} isPremium={isPremium} />;
}
