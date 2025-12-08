'use client';

import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { TableOfContents } from "@/components/TableOfContents";
import { Table, type Column } from "@/components/table";
import { useCodeHighlight } from "@/lib/use-code-highlight";

// Reusable link component with arrow icon
const DocLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center gap-1.5 text-foreground-400 underline underline-offset-4 transition-colors hover:text-foreground-100"
  >
    {children}
    <ArrowRight size={13} className="mt-0.5" />
  </a>
);

interface Requirement {
  category: string;
  technology: string;
  minimum: string;
}

function DocsContent() {
  const themeHighlight = useCodeHighlight('docs-theme-css');
  const globalsHighlight = useCodeHighlight('docs-globals-css');
  const tocItems = [
    { id: "core-principles", title: "Core principles" },
    { id: "background-system", title: "Background system" },
    { id: "global-token-contract", title: "Global token contract" },
    { id: "runtime-requirements", title: "Runtime requirements" },
    { id: "documentation", title: "Documentation" },
  ];

  const requirementData: Requirement[] = [
    { category: "Runtime", technology: "React", minimum: "19.0.0-rc" },
    { category: "Styling", technology: "Tailwind CSS", minimum: "4.0.0-alpha.20+" },
    { category: "Language", technology: "TypeScript", minimum: "5.6" },
    { category: "Bundler", technology: "Next.js App Router / Vite", minimum: "2024.12+" },
  ];

  const requirementColumns: Column<Requirement>[] = [
    { key: "category", label: "Category" },
    { key: "technology", label: "Technology" },
    { key: "minimum", label: "Minimum", render: (value) => <code className="text-foreground-400">{value}</code> },
  ];

  return (
    <div className="w-full text-foreground-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%]">
        <main className="max-w-2xl mx-auto w-full py-16 font-sans text-sm leading-relaxed antialiased">
          {/* Version badge */}
          <div className="mb-12 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-foreground-800 px-2 py-0.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v2.4.0
            </span>
            <span>·</span>
            <span>06 Dec 2025</span>
            <span>·</span>
            <span>Build 2f8e9a1</span>
          </div>

          {/* Title */}
          <div className="mb-10">
            <div className="text-base font-medium text-foreground-50">UI Lab</div>
            <div className="mt-1 text-foreground-300">
              Strict TypeScript component system for AI-augmented frontend development
            </div>
          </div>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Core principles */}
          <section id="core-principles" className="space-y-8 text-foreground-300">
            <div>
              <div className="mb-2 font-semibold text-foreground-50">Semantic background scale</div>
              <div className="text-sm">
                Single 50–950 numeric hierarchy defines visual depth. Values are perceptually uniform in oklch space and automatically invert semantic role between light and dark themes.
              </div>
            </div>

            <div>
              <div className="mb-2 font-semibold text-foreground-50">Zero-runtime styling</div>
              <div className="text-sm">
                Exclusively uses Tailwind CSS v4 Oxide engine. All design tokens declared via native @theme directive. No CSS-in-JS, no style injection at runtime.
              </div>
            </div>

            <div>
              <div className="mb-2 font-semibold text-foreground-50">LLM-native contract</div>
              <div className="text-sm">
                Includes <code className="text-foreground-400">llms.txt</code> specification and exhaustive declaration-map output. Enables deterministic component generation in Cursor, Copilot, and Claude.
              </div>
            </div>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Background system */}
          <section id="background-system" className="space-y-6 text-sm text-foreground-300">
            <div className="font-semibold text-foreground-50">Background scale semantics</div>
            <div className="leading-6">
              The scale is defined once in root @theme. Lower values represent the furthest visual plane in light mode and the nearest elevated plane in dark mode.
            </div>

            <CodeBlock filename="theme.css" language="css" {...themeHighlight}>
              {`@theme {
  --background-50:   oklch(99.2% 0.001 240);
  --background-100:  oklch(97.5% 0.002 240);
  --background-200:  oklch(95.0% 0.004 240);
  /* ... up to 950 */
  --background-950:  oklch(11.8% 0.018 240);

  /* Semantic aliases */
  --background-surface:   var(--background-100);
  --background-elevated:  var(--background-50);
  --background-contrast:  var(--background-950);
  --background-border:    var(--background-200 / 0.12);
}`}
            </CodeBlock>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Global token contract */}
          <section id="global-token-contract" className="space-y-6 text-sm text-foreground-300">
            <div className="font-semibold text-foreground-50">Root token contract</div>

            <CodeBlock filename="app/globals.css" language="css" {...globalsHighlight}>
              {`@theme {
  /* Brand */
  --color-primary: oklch(68% 0.22 245);
  --color-danger:  oklch(65% 0.28 25);

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Shadows */
  --shadow-card: 0 4px 16px rgb(0 0 0 / 0.10);
  --shadow-modal: 0 12px 48px rgb(0 0 0 / 0.24);

  /* Transitions */
  --transition-fast: 120ms cubic-bezier(0.2, 0, 0.4, 1);
}`}
            </CodeBlock>

            <div className="text-sm text-foreground-400">
              All component defaults are overridable at the root level.
            </div>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Requirements table */}
          <section id="runtime-requirements" className="text-sm">
            <div className="mb-4 font-semibold text-foreground-50">Runtime requirements</div>
            <Table<Requirement> data={requirementData} columns={requirementColumns} />
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Navigation section */}
          <section id="documentation" className="space-y-6 text-sm">
            <div className="font-semibold text-foreground-50">Documentation</div>
            <div className="space-y-3 text-foreground-400">
              <DocLink href="/docs/installation">
                Installation – CLI setup and Tailwind integration
              </DocLink>
              <DocLink href="/docs/ai-integration">
                AI integration – llms.txt specification and prompting patterns
              </DocLink>
              <DocLink href="/docs/theming">
                Theming reference – complete token contract
              </DocLink>
              <DocLink href="/docs/components">
                Component API – exhaustive prop tables and variants
              </DocLink>
              <DocLink href="/changelog">
                Changelog – version history and migration guides
              </DocLink>
            </div>
          </section>
        </main>
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}

export default DocsContent;
