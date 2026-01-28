import { cacheLife } from 'next/cache';
import { getPackageById, getElementsInPackage, getAllPackages } from 'ui-lab-registry';
import { BreadcrumbsNav } from '@/features/navigation';
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
            <div className="space-y-4 mb-12">
              <h2 className="font-bold text-foreground-50">{pkg.name}</h2>
              <p className="text-foreground-400 max-w-2xl">{pkg.description}</p>
            </div>
            <PackageElementsClient packageId={packageId} elementIds={elementIds} />
          </>
        )}
      </div>
    </div>
  );
}
