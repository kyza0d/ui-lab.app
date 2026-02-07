'use client';

import { getElementDemo, getSectionPreview } from 'ui-lab-registry/demo-registry';

interface PreviewRendererProps {
  type: 'element' | 'section';
  demoPath: string;
  elementName: string;
  variantName: string;
}

export function PreviewRenderer({ type, demoPath, elementName, variantName }: PreviewRendererProps) {
  const DemoComponent = type === 'element'
    ? getElementDemo(demoPath)
    : getSectionPreview(demoPath);

  if (!DemoComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground-400">Demo not available for {elementName} - {variantName}</p>
        </div>
      </div>
    );
  }

  return <DemoComponent />;
}
