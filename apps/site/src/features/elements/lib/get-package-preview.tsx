import type React from 'react';
import type { ElementPackageMetadata } from 'ui-lab-registry';
import { elementPackages } from 'ui-lab-registry';

type PreviewComponent = React.ComponentType<object>;

const PackagePreview: React.FC<{ data: ElementPackageMetadata }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-background-900/50 rounded-lg border border-background-700">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground-100">{data.name}</h3>
        <p className="text-sm text-foreground-400 max-w-sm">{data.description}</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-background-800 text-foreground-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-4 text-sm text-foreground-500">
          {data.elements.length} element{data.elements.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export function getPackagePreviewComponent(packageId: string): PreviewComponent | null {
  const pkg = elementPackages[packageId];
  if (!pkg) return null;

  if (pkg.getPreview) {
    return pkg.getPreview();
  }

  return () => <PackagePreview data={pkg} />;
}
