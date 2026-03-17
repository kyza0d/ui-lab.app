"use client";

import { useState, useMemo } from "react";
import type { ElementFile } from "ui-lab-registry";
import { getElementById } from "ui-lab-registry";
import { ElementPreviewContent } from "@/features/packages";
import { getDemoComponent, getElementSourceCode } from "@/features/packages";
import { PreviewDeviceVariant } from "@/features/preview";
import { DetailPageShell } from "@/features/layout";

interface VariantWithCode {
  name: string;
  description: string;
  demoPath?: string;
  files?: ElementFile[];
  sourceCode: string | null;
  index: number;
  variantId: string;
}

interface ElementDetailClientProps {
  elementId: string;
}

export default function ElementDetailClient({
  elementId,
}: ElementDetailClientProps) {
  const element = useMemo(() => getElementById(elementId), [elementId]);

  const variantsWithCode = useMemo(() => {
    if (!element) return [];
    return element.variants.map((variant, index) => ({
      ...variant,
      sourceCode: variant.demoPath
        ? getElementSourceCode(variant.demoPath)
        : null,
      index,
      variantId: `variant-${index}`,
    }));
  }, [element]);

  const [activeTab, setActiveTab] = useState<Record<number, "preview" | "code">>({});
  const [activeFile, setActiveFile] = useState<Record<number, string>>({});
  const [deviceVariant, setDeviceVariant] = useState<Record<number, PreviewDeviceVariant>>({});
  const [width, setWidth] = useState<Record<number, number>>({});

  const getActiveTab = (index: number) => activeTab[index] ?? "preview";
  const getActiveFile = (index: number, variant: VariantWithCode) => {
    const files = variant.files || [];
    return (
      activeFile[index] ||
      files.find((f) => f.isEntryPoint)?.filename ||
      files[0]?.filename ||
      ""
    );
  };
  const getDeviceVariant = (index: number) => deviceVariant[index] ?? "desktop";
  const getWidth = (index: number) => width[index];

  if (!element) {
    return <DetailPageShell name="" description="" tags={[]} notFoundLabel="Element not found." />;
  }

  return (
    <DetailPageShell
      name={element.name}
      description={element.description}
      tags={element.tags}
      dependencies={element.componentDependencies}
    >
      {variantsWithCode.map((variant) => {
        const DemoComponent = variant.demoPath
          ? getDemoComponent(variant.demoPath)
          : null;
        const currentTab = getActiveTab(variant.index);
        const currentFile = getActiveFile(variant.index, variant);
        const currentDeviceVariant = getDeviceVariant(variant.index);
        const currentWidth = getWidth(variant.index);

        return (
          <div key={variant.variantId} className="overflow-hidden">
            <div>
              <h3 className="text-lg font-semibold text-foreground-50 mb-2">
                {variant.name}
              </h3>
              <p className="text-sm text-foreground-400">
                {variant.description}
              </p>
            </div>

            <div>
              {variant.files &&
                variant.files.length > 0 &&
                DemoComponent ? (
                <ElementPreviewContent
                  variant={currentTab}
                  setVariant={(tab) =>
                    setActiveTab({ ...activeTab, [variant.index]: tab })
                  }
                  files={variant.files}
                  activeFile={currentFile}
                  setActiveFile={(filename) =>
                    setActiveFile({
                      ...activeFile,
                      [variant.index]: filename,
                    })
                  }
                  DemoComponent={DemoComponent}
                  deviceVariant={currentDeviceVariant}
                  onDeviceVariantChange={(dev) =>
                    setDeviceVariant({
                      ...deviceVariant,
                      [variant.index]: dev,
                    })
                  }
                  width={currentWidth}
                  onWidthChange={(w) =>
                    setWidth({ ...width, [variant.index]: w })
                  }
                  elementId={elementId}
                  variantIndex={variant.index}
                />
              ) : (
                <div className="space-y-4">
                  <div className="bg-background-900 rounded border border-background-700 flex items-center justify-center min-h-64 overflow-hidden">
                    {DemoComponent ? (
                      <DemoComponent />
                    ) : (
                      <div className="text-foreground-400">Preview</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </DetailPageShell>
  );
}
