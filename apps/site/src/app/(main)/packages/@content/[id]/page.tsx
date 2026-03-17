import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPackageById, getElementsInPackage, getAllPackages } from 'ui-lab-registry';
import { ContentHeader } from '@/features/navigation/components/content-header';
import PackageElementsClientWrapper from './wrapper';
import { generateMetadata as buildMetadata } from '@/shared/lib/metadata';

export function generateStaticParams() {
  const packages = getAllPackages();
  return packages.map((pkg) => ({ id: pkg.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = getPackageById(id);

  return buildMetadata({
    pathname: `/packages/${id}`,
    title: pkg?.name ?? 'Package',
    description: pkg?.description ?? 'Explore package contents and included elements.',
  });
}

async function PackageContent({ packageId }: { packageId: string }) {
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
          {(() => {
            const Preview = pkg.getPreview?.() as (() => React.ReactNode) | undefined;

            return Preview ? <Preview /> : (
              <div className="text-foreground-400">Preview</div>
            );
          })()}
        </div>
      </ContentHeader>
      <PackageElementsClientWrapper packageId={packageId} elementIds={elementIds} isPremium={pkg.pricing?.price !== null} />
    </>
  );
}

export default async function PackageElementsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id: packageId } = await params;

  return (
    <div className='pt-(--header-height)'>
      <div className="w-full bg-background-950 px-4 mx-auto pt-4 pb-12">
        <Suspense fallback={<div className="py-12">Loading...</div>}>
          <PackageContent packageId={packageId} />
        </Suspense>
      </div>
    </div>
  );
}
