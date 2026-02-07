"use client";

import { useState } from "react";
import Link from "next/link";
import { ComponentConfigurator } from "@/features/component-docs";
import { CodeBlock } from "@/features/docs/components/code-display/code-block";
import { cn } from "@/shared";
import { Toaster, Flex, Button, Tabs, TabsList, TabsTrigger, TabsContent } from "ui-lab-components";
import { FaArrowLeft } from "react-icons/fa6";

export interface DevExample {
  id: string;
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
  controls?: any[];
  renderPreview?: (props: Record<string, any>) => React.ReactNode;
  previewHeight?: string;
  previewLayout?: "center" | "start";
}

export interface DevExampleLayoutProps {
  title: string;
  description: string;
  examples: DevExample[];
  backHref?: string;
  backLabel?: string;
}

export function DevExampleLayout({ title, description, examples, backHref = "/dev", backLabel = "Dev Playground" }: DevExampleLayoutProps) {
  const firstExample = examples[0];
  const remainingExamples = examples.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-background-700">
        <div className="max-w-4xl mx-auto px-8 py-3">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground-200">
            <FaArrowLeft className="w-3 h-3" /> {backLabel}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground-50">{title}</h1>
          <p className="text-foreground-400">{description}</p>
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
      </div>
    </div>
  );
}
