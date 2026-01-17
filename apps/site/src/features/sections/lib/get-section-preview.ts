import dynamic from 'next/dynamic';
import type React from 'react';

type PreviewComponent = React.ComponentType<object>;

const previewComponentMap: Record<string, PreviewComponent> = {
  hero: dynamic(() =>
    import('ui-lab-registry/sections/Hero').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
};

export function getPreviewComponent(sectionId: string): PreviewComponent | null {
  return previewComponentMap[sectionId] || null;
}
