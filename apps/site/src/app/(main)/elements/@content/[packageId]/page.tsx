import React from 'react';
import { cacheLife } from 'next/cache';
import { getPackageById, getElementsInPackage, getAllPackages } from 'ui-lab-registry';
import { BreadcrumbsNav } from '@/features/navigation';
import { ContentHeader } from '@/shared/components/content-header';
import PackageElementsClient from './client';

export function generateStaticParams() {
  const packages = getAllPackages();
  return packages.map((pkg) => ({ packageId: pkg.id }));
}

export default async function PackageElementsPage({
  params
}: {
  params: Promise<{ packageId: string }>
}) {
  'use cache';
  cacheLife('hours');

  const { packageId } = await params;
  const pkg = getPackageById(packageId);
  const elementIds = pkg ? getElementsInPackage(packageId) : [];

  return (
    <div className='pl-12 mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        {!pkg ? (
          <div className="space-y-4 mb-12">
            <p className="text-foreground-400">Package not found</p>
          </div>
        ) : (
          <>
            <ContentHeader title={pkg.name} description={pkg.description} pricing={pkg.pricing} purchaseUrl={pkg.pricing?.purchaseUrl}>
              <div className="w-full h-48 bg-background-800 rounded border border-background-700 flex items-center justify-center overflow-hidden">
                {pkg.getPreview ? (
                  <>{(pkg.getPreview() as any)()}</>
                ) : (
                  <div className="text-foreground-500">Preview</div>
                )}
              </div>
            </ContentHeader>
            <PackageElementsClient packageId={packageId} elementIds={elementIds} />
          </>
        )}
      </div>
    </div>
  );
}
