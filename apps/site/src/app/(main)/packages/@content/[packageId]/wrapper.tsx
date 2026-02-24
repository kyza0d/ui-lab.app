'use client';

import { PurchaseModalClient } from '@/features/packages';
import PackageElementsClient from './client';

interface PackageElementsClientWrapperProps {
  packageId: string;
  elementIds: string[];
  isPremium: boolean;
}

export default function PackageElementsClientWrapper({ packageId, elementIds, isPremium }: PackageElementsClientWrapperProps) {
  return (
    <PurchaseModalClient type="element">
      <PackageElementsClient packageId={packageId} elementIds={elementIds} isPremium={isPremium} />
    </PurchaseModalClient>
  );
}
