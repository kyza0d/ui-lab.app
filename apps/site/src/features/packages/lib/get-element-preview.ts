import type React from 'react';
import { elementPreviews } from '@/gallery/element-previews';

type PreviewComponent = React.ComponentType<object>;

export function getPreviewComponent(elementId: string): PreviewComponent | null {
  return (elementPreviews[elementId as keyof typeof elementPreviews] as PreviewComponent) || null;
}
