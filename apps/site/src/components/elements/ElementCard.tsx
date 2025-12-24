'use client';

import { ReactNode } from 'react';
import { Card } from 'ui-lab-components';
import type { ElementMetadata } from 'ui-lab-registry';
import { getDemoComponent } from '@/lib/get-element-demo';

interface ElementCardProps {
  element: ElementMetadata;
  onClick?: () => void;
}

export function ElementCard({ element, onClick }: ElementCardProps) {
  const firstVariant = element.variants[0];
  const DemoComponent = firstVariant?.demoPath ? getDemoComponent(firstVariant.demoPath) : null;

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:border-accent-500 transition-colors"
      onClick={onClick}
    >
      <div className="aspect-video bg-background-950 border-b border-background-700 flex items-center justify-center overflow-hidden">
        <div className='scale-50'>{DemoComponent ? <DemoComponent /> : <div className="text-foreground-500">Preview</div>}</div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <strong className="font-semibold text-foreground-50">{element.name}</strong>
            <p className="text-sm text-foreground-400 mt-1 line-clamp-2">{element.description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
