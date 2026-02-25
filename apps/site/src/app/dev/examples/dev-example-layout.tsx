"use client";

import Link from "next/link";
import { Toaster } from "ui-lab-components";
import { FaArrowLeft } from "react-icons/fa6";

export interface DevExample {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code?: string;
  controls?: unknown;
  renderPreview?: unknown;
  previewLayout?: "center" | "start" | "flex-start";
}

export interface DevExampleLayoutProps {
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

        <div className="space-y-8">
          {examples.map((example) => (
            <div key={example.id} id={example.id} className="scroll-mt-20 space-y-2">
              <div>
                <h2 className="text-base font-semibold text-foreground-100">{example.title}</h2>
                <p className="text-sm text-foreground-400">{example.description}</p>
              </div>
              <div className={`border border-background-700 relative p-24 flex rounded-lg ${example.previewLayout === "center" ? "justify-center items-center" : example.previewLayout === "start" ? "justify-start items-start" : ""}`}>
                {example.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
