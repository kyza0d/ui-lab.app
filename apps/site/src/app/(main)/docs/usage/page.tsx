"use client";

import { DocumentationHeader } from "@/features/docs/components/documentation-header";

export default function UsagePage() {
  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          <DocumentationHeader

            title="Usage"

            description="How to use and integrate UI Lab components in your project."

          />
        </main>
        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  );
}
