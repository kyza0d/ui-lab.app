import dynamic from 'next/dynamic';
import type React from 'react';

type PreviewComponent = React.ComponentType<object>;

const previewComponentMap: Record<string, PreviewComponent> = {
  'nextjs-basic': dynamic(() =>
    import('ui-lab-registry/starters/NextJS').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
};

export function getPreviewComponent(starterId: string): PreviewComponent | null {
  return previewComponentMap[starterId] || null;
}
