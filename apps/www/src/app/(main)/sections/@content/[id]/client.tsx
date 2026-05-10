"use client";

import { useState, useMemo } from "react";
import type { ElementFile } from "ui-lab-registry";
import { getSectionById } from "ui-lab-registry";
import { SectionPreviewContent } from "@/features/sections";
import { PreviewDeviceVariant } from "@/features/preview";
import { getPreviewComponent } from "@/features/sections";
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
    return <DetailPageShell name="" description="" tags={[]} notFoundLabel="Section not found." />;
  }

  return (
    <DetailPageShell
      name={section.name}
      description={section.description}
      tags={section.tags}
      dependencies={section.componentDependencies}
    >
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
    </DetailPageShell>
  );
}
