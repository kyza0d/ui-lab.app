"use client";

import { useState, useMemo } from "react";
import type { SectionMetadata } from "ui-lab-registry";
import { getSectionById } from "ui-lab-registry";
import { getPreviewComponent } from "@/features/sections";

interface VariantWithCode {
  name: string;
  description: string;
  demoPath?: string;
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
    <div className="pl-12 pt-(header-height)">
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
                ? getPreviewComponent(variant.demoPath)
                : null;

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
                    {DemoComponent ? (
                      <div className="space-y-4 mt-4">
                        <div className="bg-background-900 rounded border border-background-700 flex items-center justify-center min-h-96 overflow-hidden">
                          <DemoComponent />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 mt-4">
                        <div className="bg-background-900 rounded border border-background-700 flex items-center justify-center min-h-96 overflow-hidden">
                          <div className="text-foreground-500">Preview</div>
                        </div>
                      </div>
                    )}
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
