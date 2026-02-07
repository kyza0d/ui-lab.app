"use client";

import { useState, useMemo } from "react";
import type { SectionMetadata, ElementFile } from "ui-lab-registry";
import { getSectionById } from "ui-lab-registry";
import { SectionPreviewContent } from "@/features/sections";
import { PreviewDeviceVariant } from "@/features/preview";
import { getPreviewComponent } from "@/features/sections";

interface VariantWithCode {
  name: string;
  description: string;
  demoPath?: string;
  files?: ElementFile[];
  sourceCode: string | null;
  index: number;
  variantId: string;
}

interface SectionDetailClientProps {
  sectionId: string;
}

export default function SectionDetailClient({
  sectionId,
}: SectionDetailClientProps) {
  const section = useMemo(() => getSectionById(sectionId), [sectionId]);

  const variantsWithCode = useMemo(() => {
    if (!section) return [];
    return section.variants.map((variant, index) => ({
      ...variant,
      sourceCode: null,
      index,
      variantId: `variant-${index}`,
    }));
  }, [section]);

  const [activeTab, setActiveTab] = useState<Record<number, "preview" | "code">>({});
  const [deviceVariant, setDeviceVariant] = useState<Record<number, PreviewDeviceVariant>>({});
  const [width, setWidth] = useState<Record<number, number>>({});
  const [activeFile, setActiveFile] = useState<Record<number, string>>({});

  const getActiveTab = (index: number) => activeTab[index] ?? "preview";
  const getDeviceVariant = (index: number) => deviceVariant[index] ?? "desktop";
  const getWidth = (index: number) => width[index];
  const getActiveFile = (index: number, variant: VariantWithCode) => {
    const files = variant.files || [];
    return (
      activeFile[index] ||
      files.find((f) => f.isEntryPoint)?.filename ||
      files[0]?.filename ||
      ""
    );
  };

  if (!section) {
    return (
      <div className="w-full bg-background-950 mx-auto pt-12 pb-12">
        <div className="mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-foreground-400">Section not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-(header-height)">
      <div className="w-full bg-background-950 mx-auto min-h-screen flex flex-col pt-60 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1">
          <div className="mb-28">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground-50 mb-2">
                  {section.name}
                </h1>
                <p className="text-foreground-400 max-w-2xl">
                  {section.description}
                </p>
              </div>
            </div>

            {section.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 text-sm bg-background-900 border border-background-700 text-foreground-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-32 flex-1">
            {variantsWithCode.map((variant) => {
              const DemoComponent = variant.demoPath
                ? getPreviewComponent(variant.demoPath) ?? undefined
                : undefined;
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

                  <div className="mt-4">
                    <SectionPreviewContent
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
                      sectionId={sectionId}
                      variantIndex={variant.index}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {section.componentDependencies &&
            section.componentDependencies.length > 0 && (
              <div className="mt-12 pt-12">
                <h4 className="text-lg font-semibold text-foreground-50 mb-4">
                  Dependencies
                </h4>
                <div className="space-y-2">
                  {section.componentDependencies.map((dep) => (
                    <div
                      key={dep}
                      className="text-sm w-fit text-foreground-400 px-3 py-2 bg-background-800 rounded border border-background-700"
                    >
                      {dep}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
