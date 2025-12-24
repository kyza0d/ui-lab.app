'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BreadcrumbsNav } from '@/components/layout/BreadcrumbsNav';
import { FaArrowLeft } from 'react-icons/fa6';
import type { ElementMetadata, ElementFile } from 'ui-lab-registry';
import { ElementPreviewContent } from '@/components/elements/ElementPreview';
import { getDemoComponent } from '@/lib/get-element-demo';

interface VariantWithCode {
  name: string;
  description: string;
  demoPath?: string;
  files?: ElementFile[];
  sourceCode: string | null;
  index: number;
}

interface ElementDetailClientProps {
  element: ElementMetadata;
  variantsWithCode: VariantWithCode[];
  elementId?: string;
}

export default function ElementDetailClient({ element, variantsWithCode, elementId }: ElementDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Record<number, 'preview' | 'code'>>({});
  const [activeFile, setActiveFile] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState<Record<number, boolean>>({});
  const [deviceVariant, setDeviceVariant] = useState<Record<number, 'mobile' | 'desktop'>>({});
  const [width, setWidth] = useState<Record<number, number>>({});

  const getActiveTab = (index: number) => activeTab[index] ?? 'preview';
  const getActiveFile = (index: number, variant: VariantWithCode) => {
    const files = variant.files || [];
    return activeFile[index] || files.find(f => f.isEntryPoint)?.filename || files[0]?.filename || '';
  };
  const getCopied = (index: number) => copied[index] ?? false;
  const getDeviceVariant = (index: number) => deviceVariant[index] ?? 'desktop';
  const getWidth = (index: number) => width[index] ?? 1200;

  const handleCopy = (code: string, variantIndex: number) => {
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, [variantIndex]: true });
    setTimeout(() => setCopied(prev => ({ ...prev, [variantIndex]: false })), 2000);
  };

  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 max-w-4xl mx-auto min-h-screen flex flex-col pt-32 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1">
          <button
            onClick={() => router.push('/elements')}
            className="flex items-center gap-2 text-accent-500 hover:text-accent-400 mb-6 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Elements
          </button>

          <div className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground-50 mb-2">{element.name}</h1>
                <p className="text-foreground-400 max-w-2xl">{element.description}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-background-700 text-foreground-300 whitespace-nowrap">
                {element.category}
              </span>
            </div>

            {element.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {element.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 text-xs bg-background-800 text-foreground-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 flex-1">
            {variantsWithCode.map((variant) => {
              const DemoComponent = variant.demoPath ? getDemoComponent(variant.demoPath) : null;
              const currentTab = getActiveTab(variant.index);
              const currentFile = getActiveFile(variant.index, variant);
              const isCopied = getCopied(variant.index);
              const currentDeviceVariant = getDeviceVariant(variant.index);
              const currentWidth = getWidth(variant.index);

              return (
                <div key={variant.index} className="overflow-hidden">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground-50 mb-2">{variant.name}</h3>
                    <p className="text-sm text-foreground-400">{variant.description}</p>
                  </div>

                  <div>
                    {variant.files && variant.files.length > 0 && DemoComponent ? (
                      <ElementPreviewContent
                        variant={currentTab}
                        setVariant={(tab) => setActiveTab({ ...activeTab, [variant.index]: tab })}
                        files={variant.files}
                        activeFile={currentFile}
                        setActiveFile={(filename) => setActiveFile({ ...activeFile, [variant.index]: filename })}
                        copied={isCopied}
                        onCopy={() => {
                          const file = variant.files?.find(f => f.filename === currentFile);
                          if (file) handleCopy(file.code, variant.index);
                        }}
                        DemoComponent={DemoComponent}
                        deviceVariant={currentDeviceVariant}
                        onDeviceVariantChange={(dev) => setDeviceVariant({ ...deviceVariant, [variant.index]: dev })}
                        width={currentWidth}
                        onWidthChange={(w) => setWidth({ ...width, [variant.index]: w })}
                        elementId={elementId}
                        variantIndex={variant.index}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-background-900 rounded border border-background-700 flex items-center justify-center min-h-64 overflow-hidden">
                          {DemoComponent ? <DemoComponent /> : <div className="text-foreground-500">Preview</div>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {element.componentDependencies && element.componentDependencies.length > 0 && (
            <div className="mt-12 pt-12">
              <h3 className="text-lg font-semibold text-foreground-50 mb-4">Dependencies</h3>
              <div className="flex flex-wrap gap-2">
                {element.componentDependencies.map((dep) => (
                  <span
                    key={dep}
                    className="inline-block px-3 py-2 bg-background-800 text-foreground-300 rounded text-sm"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
