'use client';

function SplitRowMeta({ title, description, primaryMeta, secondaryMeta }: { title: string; description: string; primaryMeta: string; secondaryMeta: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-background-800">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-200 truncate">{title}</p>
        <p className="text-xs text-foreground-400 truncate">{description}</p>
      </div>
      <div className="flex flex-col items-end flex-shrink-0">
        <span className="text-xs font-medium text-foreground-300">{primaryMeta}</span>
        <span className="text-xs text-foreground-500">{secondaryMeta}</span>
      </div>
    </div>
  );
}

export function SplitRowMetaDemo() {
  return (
    <div className="p-6 flex flex-col max-w-lg w-full">
      <SplitRowMeta title="design-system.fig" description="Figma · Shared with team" primaryMeta="4.2 MB" secondaryMeta="Jan 12, 2025" />
      <SplitRowMeta title="brand-assets.zip" description="S3 · us-east-1" primaryMeta="128 MB" secondaryMeta="Dec 3, 2024" />
      <SplitRowMeta title="icon-set.svg" description="GitHub · public" primaryMeta="18 KB" secondaryMeta="Nov 28, 2024" />
    </div>
  );
}
