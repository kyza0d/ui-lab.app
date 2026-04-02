"use client";

import Link from "next/link";
import { ComponentConfigurator } from "@/features/component-docs";
import { Toaster } from "ui-lab-components";
import { FaArrowLeft } from "react-icons/fa6";

type ConfiguratorProps = React.ComponentProps<typeof ComponentConfigurator>;

export interface DevExample {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code?: string;
  controls?: ConfiguratorProps["controls"];
  renderPreview?: ConfiguratorProps["renderPreview"];
  language?: ConfiguratorProps["language"];
  previewLayout?: "center" | "start" | "flex-start";
  resizable?: boolean;
}

interface DevExampleLayoutProps {
  title: string;
  description: string;
  examples: DevExample[];
  backHref?: string;
  backLabel?: string;
}

export function DevExampleLayout({ title, description, examples, backHref = "/dev", backLabel = "Dev Playground" }: DevExampleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-3">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground-200">
            <FaArrowLeft className="w-3 h-3" /> {backLabel}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-2 mb-24">
          <h1 className="text-xl font-bold text-foreground-50">{title}</h1>
          <p className="text-foreground-400">{description}</p>
        </div>

        <div className="space-y-24">
          {examples.map((example) => {
            const usesConfigurator = Boolean(
              example.code
              || example.renderPreview
              || (example.controls && example.controls.length > 0)
            );
            const previewLayout = example.previewLayout === "flex-start" ? "start" : example.previewLayout;

            if (usesConfigurator) {
              return (
                <div key={example.id} id={example.id} className="scroll-mt-20">
                  <ComponentConfigurator
                    title={example.title}
                    description={example.description}
                    code={example.code}
                    language={example.language ?? "tsx"}
                    controls={example.controls}
                    renderPreview={example.renderPreview}
                    previewLayout={previewLayout}
                    resizable={example.resizable}
                  >
                    {example.preview}
                  </ComponentConfigurator>
                </div>
              );
            }

            return (
              <div key={example.id} id={example.id} className="scroll-mt-20 space-y-2">
                <div className="mb-8">
                  <h2 className="text-md font-semibold text-foreground-100">{example.title}</h2>
                  <p className="text-sm text-foreground-400">{example.description}</p>
                </div>
                <div className="min-h-40 flex items-center justify-center w-full border border-background-700 rounded-sm">
                  {example.preview}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
