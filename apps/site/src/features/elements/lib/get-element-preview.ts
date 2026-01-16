import dynamic from 'next/dynamic';
import type React from 'react';

type PreviewComponent = React.ComponentType<object>;

const previewComponentMap: Record<string, PreviewComponent> = {
  header: dynamic(() =>
    import('ui-lab-registry/elements/Header').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
  page: dynamic(() =>
    import('ui-lab-registry/elements/Page').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
  sidebar: dynamic(() =>
    import('ui-lab-registry/elements/Sidebar').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
};

export function getPreviewComponent(elementId: string): PreviewComponent | null {
  return previewComponentMap[elementId] || null;
}
