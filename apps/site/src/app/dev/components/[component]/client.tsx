"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ComponentConfigurator } from "@/features/component-docs";
import { getComponentById, getComponentMetadata, componentRegistry } from "@/features/component-docs";
import { Toaster, Flex, Button, Grid } from "ui-lab-components";
import { FaArrowLeft, FaArrowRight, FaFlask, FaUpRightFromSquare } from "react-icons/fa6";

export function DevComponentClient({ componentId }: { componentId: string }) {
  const component = useMemo(() => getComponentById(componentId), [componentId]);
  const metadata = useMemo(() => getComponentMetadata(componentId), [componentId]);
  const allComponents = useMemo(() => componentRegistry.sort((a, b) => a.name.localeCompare(b.name)), []);
  const currentIndex = allComponents.findIndex((c) => c.id === componentId);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  if (!component) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/dev" className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground-200 mb-8">
            <FaArrowLeft className="w-3 h-3" /> Back to Dev
          </Link>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground-100">Component Not Found</h2>
            <p className="text-foreground-400 mt-2">The component "{componentId}" doesn't exist in the registry.</p>
          </div>
        </div>
      </div>
    );
  }

  const firstExample = component.examples[0];
  const remainingExamples = component.examples.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-background-700">
        <div className="max-w-4xl mx-auto px-8 py-3">
          <Flex justify="space-between" align="center">
            <Link href="/dev" className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground-200">
              <FaArrowLeft className="w-3 h-3" /> Dev Playground
            </Link>
            <Flex gap="sm">
              {prevComponent && (
                <Link href={`/dev/components/${prevComponent.id}`}>
                  <Button variant="ghost" size="sm"><FaArrowLeft className="w-3 h-3 mr-2" /> {prevComponent.name}</Button>
                </Link>
              )}
              {nextComponent && (
                <Link href={`/dev/components/${nextComponent.id}`}>
                  <Button variant="ghost" size="sm">{nextComponent.name} <FaArrowRight className="w-3 h-3 ml-2" /></Button>
                </Link>
              )}
            </Flex>
          </Flex>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-2 mb-8">
          <Flex align="center" gap="sm">
            <h1 className="text-3xl font-bold text-foreground-50">{component.name}</h1>
            {(metadata as any)?.experimental && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-accent-500/20 text-accent-300 rounded">
                <FaFlask className="w-3 h-3" /> Experimental
              </span>
            )}
          </Flex>
          <p className="text-foreground-400">{component.description}</p>
          <Flex gap="sm" className="mt-4">
            <Link href={`/components/${componentId}`} target="_blank">
              <Button variant="outline" size="sm">
                <FaUpRightFromSquare className="w-3 h-3 mr-2" /> View Production
              </Button>
            </Link>
          </Flex>
        </div>

        {firstExample && (
          <div className="mb-12">
            <ComponentConfigurator
              title=""
              description=""
              code={firstExample.code}
              language="typescript"
              controls={firstExample.controls}
              renderPreview={firstExample.renderPreview}
              previewHeight={firstExample.previewHeight}
              previewLayout={firstExample.previewLayout}
            >
              {firstExample.preview}
            </ComponentConfigurator>
          </div>
        )}

        {remainingExamples.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-foreground-100 border-b border-background-700 pb-4">Examples</h2>
            {remainingExamples.map((example) => (
              <div key={example.id} id={example.id} className="scroll-mt-20">
                <ComponentConfigurator
                  title={example.title}
                  description={example.description}
                  code={example.code}
                  language="typescript"
                  controls={example.controls}
                  renderPreview={example.renderPreview}
                  previewHeight={example.previewHeight}
                  previewLayout={example.previewLayout}
                >
                  {example.preview}
                </ComponentConfigurator>
              </div>
            ))}
          </div>
        )}

        {component.variants && component.variants.length > 0 && (
          <div className="mt-16 space-y-8">
            <h2 className="text-xl font-semibold text-foreground-100 border-b border-background-700 pb-4">Variants</h2>
            <Grid columns="2" gap="md">
              {component.variants.map((variant) => (
                <div key={variant.id} className="border border-background-700 rounded-lg overflow-hidden">
                  <div className="p-6 bg-background-900 flex items-center justify-center min-h-32">
                    {variant.preview}
                  </div>
                  <div className="p-4 border-t border-background-700">
                    <h3 className="font-medium text-foreground-100">{variant.name}</h3>
                    <p className="text-xs text-foreground-500 mt-1">{variant.description}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-background-700">
          <Flex justify="space-between">
            {prevComponent ? (
              <Link href={`/dev/components/${prevComponent.id}`}>
                <Button variant="ghost"><FaArrowLeft className="w-3 h-3 mr-2" /> {prevComponent.name}</Button>
              </Link>
            ) : <div />}
            {nextComponent && (
              <Link href={`/dev/components/${nextComponent.id}`}>
                <Button variant="ghost">{nextComponent.name} <FaArrowRight className="w-3 h-3 ml-2" /></Button>
              </Link>
            )}
          </Flex>
        </div>
      </div>
    </div>
  );
}
