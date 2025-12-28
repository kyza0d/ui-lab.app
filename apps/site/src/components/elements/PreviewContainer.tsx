'use client';

import React from 'react';
import type { ElementMetadata, LayoutConfig } from 'ui-lab-registry';

interface PreviewContainerProps {
  element: ElementMetadata;
  layoutConfig: LayoutConfig;
  children: React.ReactNode;
}

function buildPreviewStyles(config?: LayoutConfig['previewConfig']): React.CSSProperties {
  const styles: React.CSSProperties = {};
  if (config?.scale !== undefined) {
    styles.transform = `scale(${config.scale})`;
    styles.transformOrigin = 'top center';
  }
  if (config?.maxHeight) {
    styles.maxHeight = config.maxHeight;
    styles.width = '100%';
  }
  return styles;
}

function getCenteringClass(strategy?: string): string {
  switch (strategy) {
    case 'horizontal':
      return 'items-center justify-start';
    case 'full':
      return 'items-center justify-center';
    case 'none':
      return '';
    default:
      return 'items-center justify-center';
  }
}

export function PreviewContainer({
  element,
  layoutConfig,
  children,
}: PreviewContainerProps) {
  const { previewConfig } = layoutConfig;
  const centeringClass = getCenteringClass(previewConfig?.centeringStrategy);

  return (
    <div className="relative w-full h-full min-h-56 bg-background-950 border-b border-background-700 overflow-hidden">
      <div className={`absolute inset-0 p-12 ${centeringClass}`}>
        <div className="flex h-full w-full items-center justify-center" style={buildPreviewStyles(previewConfig)}>
          {children}
        </div>
      </div>
    </div>
  );
}
