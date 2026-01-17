import dynamic from 'next/dynamic';
import type React from 'react';

type PreviewComponent = React.ComponentType<object>;

const previewComponentMap: Record<string, PreviewComponent> = {
  hero: dynamic(() =>
    import('ui-lab-registry/sections/Hero').then(mod => ({
      default: () => mod.getPreview(),
    }))
  ),
  'hero-simple': dynamic(() =>
    import('ui-lab-registry/sections/Hero/variations/01-simple').then(mod => ({
      default: mod.SimpleHero,
    }))
  ),
  'hero-with-cta': dynamic(() =>
    import('ui-lab-registry/sections/Hero/variations/02-with-cta').then(mod => ({
      default: mod.HeroWithCTA,
    }))
  ),
};

export function getPreviewComponent(sectionId: string): PreviewComponent | null {
  return previewComponentMap[sectionId] || null;
}
