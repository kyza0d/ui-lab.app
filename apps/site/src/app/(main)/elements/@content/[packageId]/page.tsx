import React, { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import { getPackageById, getElementsInPackage, getAllPackages } from 'ui-lab-registry';
import { BreadcrumbsNav } from '@/features/navigation';
import { ContentHeader } from '@/features/navigation/components/content-header';
import PackageElementsClientWrapper from './wrapper';

export function generateStaticParams() {
  const packages = getAllPackages();
  return packages.map((pkg) => ({ packageId: pkg.id }));
}

async function PackageContent({ packageId }: { packageId: string }) {
  'use cache';
  cacheLife('hours');

  const pkg = getPackageById(packageId);
  const elementIds = pkg ? getElementsInPackage(packageId) : [];

  if (!pkg) {
    return (
      <div className="space-y-4 mb-12">
        <p className="text-foreground-400">Package not found</p>
      </div>
    );
  }

  return (
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
      <PackageElementsClientWrapper packageId={packageId} elementIds={elementIds} isPremium={pkg.pricing?.price !== null} />
    </>
  );
}

export default async function PackageElementsPage({
  params
}: {
  params: Promise<{ packageId: string }>
}) {
  const { packageId } = await params;

  return (
    <div className='mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <Suspense fallback={<div className="py-12">Loading...</div>}>
          <PackageContent packageId={packageId} />
        </Suspense>
      </div>
    </div>
  );
}
