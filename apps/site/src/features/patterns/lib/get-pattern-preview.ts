import type React from 'react';
import { patternPreviews } from '@/gallery/pattern-previews';

type PreviewComponent = React.ComponentType<object>;

export function getPreviewComponent(patternId: string): PreviewComponent | null {
  return (patternPreviews[patternId as keyof typeof patternPreviews] as PreviewComponent) || null;
}
