'use client';

import { useState } from 'react';
import { BreadcrumbsNav } from '@/features/navigation';
import { getPatternById } from 'ui-lab-registry';
import { getPatternDemo } from 'ui-lab-registry/demo-registry';
import { PreviewCodeDisplay, DEVICE_PRESETS } from '@/features/preview';
import type { PreviewDeviceVariant } from '@/features/preview';

interface PatternDetailContentProps {
  patternId: string;
}

export function PatternDetailContent({ patternId }: PatternDetailContentProps) {
  const pattern = getPatternById(patternId);

  const [tabs, setTabs] = useState<Record<string, 'preview' | 'code'>>({});
  const [devices, setDevices] = useState<Record<string, PreviewDeviceVariant>>({});
  const [widths, setWidths] = useState<Record<string, number>>({});

  const getTab = (key: string): 'preview' | 'code' => tabs[key] ?? 'preview';
  const getDevice = (key: string): PreviewDeviceVariant => devices[key] ?? 'desktop';
  const getWidth = (key: string) => widths[key] ?? DEVICE_PRESETS[devices[key] ?? 'desktop'];

  const setTab = (key: string, v: 'preview' | 'code') => setTabs(p => ({ ...p, [key]: v }));
  const setDevice = (key: string, v: PreviewDeviceVariant) => {
    setDevices(p => ({ ...p, [key]: v }));
    setWidths(p => ({ ...p, [key]: DEVICE_PRESETS[v] }));
  };
  const setWidth = (key: string, v: number) => setWidths(p => ({ ...p, [key]: v }));

  if (!pattern) {
    return (
      <div className="w-full bg-background-950 mx-auto pt-12 pb-12">
        <div className="text-center py-12">
          <p className="text-foreground-400">Pattern not found.</p>
        </div>
      </div>
    );
  }

  const MainDemo = getPatternDemo(patternId);

  return (
    <div className="pt-(header-height)">
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto min-h-screen flex flex-col pt-60 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1 max-w-4xl">

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground-50 mb-3">{pattern.name}</h1>
            <p className="text-foreground-400 max-w-2xl mb-6">{pattern.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-2.5 py-1 text-sm bg-background-900 border border-background-700 text-foreground-400 rounded">
                {pattern.category}
              </span>
              <span className="inline-block px-2.5 py-1 text-sm bg-background-900 border border-background-700 text-foreground-400 rounded">
                {pattern.complexity}
              </span>
            </div>
          </div>

          {pattern.code && (
            <div className="mb-10">
              <PreviewCodeDisplay
                code={pattern.code}
                language="tsx"
                previewContent={MainDemo ? <MainDemo /> : <div className="p-8 text-center text-foreground-400 text-sm">No preview available</div>}
                activeTab={getTab('main')}
                onTabChange={(v) => setTab('main', v)}
                displayVariant={getDevice('main')}
                onDeviceVariantChange={(v) => setDevice('main', v)}
                width={getWidth('main')}
                onWidthChange={(v) => setWidth('main', v)}
              />
            </div>
          )}

          {pattern.variations && pattern.variations.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Variations</h2>
              <div className="flex flex-col gap-8">
                {pattern.variations.map((variation) => {
                  const VariationDemo = getPatternDemo(variation.id);
                  return (
                    <div key={variation.id}>
                      <h3 className="text-sm font-semibold text-foreground-200 mb-1">{variation.name}</h3>
                      <p className="text-sm text-foreground-400 mb-3">{variation.description}</p>
                      <PreviewCodeDisplay
                        code={variation.code}
                        language="tsx"
                        previewContent={VariationDemo ? <VariationDemo /> : <div className="p-8 text-center text-foreground-400 text-sm">No preview available</div>}
                        activeTab={getTab(variation.id)}
                        onTabChange={(v) => setTab(variation.id, v)}
                        displayVariant={getDevice(variation.id)}
                        onDeviceVariantChange={(v) => setDevice(variation.id, v)}
                        width={getWidth(variation.id)}
                        onWidthChange={(v) => setWidth(variation.id, v)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
