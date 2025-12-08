"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeBlockWithPackageManager } from "@/components/CodeBlockWithPackageManager";
import { TableOfContents } from "@/components/TableOfContents";
import { Card, Badge, ButtonGroup, ButtonGroupItem, Button } from "@ui-lab/components";

type Framework = "nextjs" | "vite" | "remix" | "tauri";
type Manager = "npm" | "pnpm" | "yarn" | "bun";

const NextJsSvg = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="w-6 h-6">
    <path d="M23.749 30.005c-0.119 0.063-0.109 0.083 0.005 0.025 0.037-0.015 0.068-0.036 0.095-0.061 0-0.021 0-0.021-0.1 0.036zM23.989 29.875c-0.057 0.047-0.057 0.047 0.011 0.016 0.036-0.021 0.068-0.041 0.068-0.047 0-0.027-0.016-0.021-0.079 0.031zM24.145 29.781c-0.057 0.047-0.057 0.047 0.011 0.016 0.037-0.021 0.068-0.043 0.068-0.048 0-0.025-0.016-0.020-0.079 0.032zM24.303 29.688c-0.057 0.047-0.057 0.047 0.009 0.015 0.037-0.020 0.068-0.041 0.068-0.047 0-0.025-0.016-0.020-0.077 0.032zM24.516 29.547c-0.109 0.073-0.147 0.12-0.047 0.068 0.067-0.041 0.181-0.131 0.161-0.131-0.043 0.016-0.079 0.043-0.115 0.063zM14.953 0.011c-0.073 0.005-0.292 0.025-0.484 0.041-4.548 0.412-8.803 2.86-11.5 6.631-1.491 2.067-2.459 4.468-2.824 6.989-0.129 0.88-0.145 1.14-0.145 2.333 0 1.192 0.016 1.448 0.145 2.328 0.871 6.011 5.147 11.057 10.943 12.927 1.043 0.333 2.136 0.563 3.381 0.704 0.484 0.052 2.577 0.052 3.061 0 2.152-0.24 3.969-0.771 5.767-1.688 0.276-0.14 0.328-0.177 0.291-0.208-0.88-1.161-1.744-2.323-2.609-3.495l-2.557-3.453-3.203-4.745c-1.068-1.588-2.14-3.172-3.229-4.744-0.011 0-0.025 2.109-0.031 4.681-0.011 4.505-0.011 4.688-0.068 4.792-0.057 0.125-0.151 0.229-0.276 0.287-0.099 0.047-0.188 0.057-0.661 0.057h-0.541l-0.141-0.088c-0.088-0.057-0.161-0.136-0.208-0.229l-0.068-0.141 0.005-6.271 0.011-6.271 0.099-0.125c0.063-0.077 0.141-0.14 0.229-0.187 0.131-0.063 0.183-0.073 0.724-0.073 0.635 0 0.74 0.025 0.907 0.208 1.296 1.932 2.588 3.869 3.859 5.812 2.079 3.152 4.917 7.453 6.312 9.563l2.537 3.839 0.125-0.083c1.219-0.813 2.328-1.781 3.285-2.885 2.016-2.308 3.324-5.147 3.767-8.177 0.129-0.88 0.145-1.141 0.145-2.333 0-1.193-0.016-1.448-0.145-2.328-0.871-6.011-5.147-11.057-10.943-12.928-1.084-0.343-2.199-0.577-3.328-0.697-0.303-0.031-2.371-0.068-2.631-0.041zM21.5 9.688c0.151 0.072 0.265 0.208 0.317 0.364 0.027 0.084 0.032 1.823 0.027 5.74l-0.011 5.624-0.989-1.52-0.995-1.521v-4.083c0-2.647 0.011-4.131 0.025-4.204 0.047-0.167 0.161-0.307 0.313-0.395 0.124-0.063 0.172-0.068 0.667-0.068 0.463 0 0.541 0.005 0.645 0.063z" fill="currentColor" />
  </svg>
);

const RemixSvg = () => (
  <svg viewBox="0 0 256 297" width="32" height="32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M141.675 0C218.047 0 256 36.35 256 94.414c0 43.43-26.707 71.753-62.785 76.474 30.455 6.137 48.259 23.604 51.54 58.065l.474 6.337.415 5.924.358 5.542.249 4.179.267 4.93.138 2.814.198 4.47.159 4.222.079 2.427.107 3.888.092 4.446.033 2.148.06 6.226.02 6.496v3.885h-78.758l.004-1.62.028-3.147.047-3.065.136-7.424.035-2.489.027-3.902-.004-2.496-.023-2.617-.032-2.054-.064-2.876-.094-3.05-.125-3.242-.16-3.455-.096-1.813-.16-2.833-.186-2.976-.287-4.204-.247-3.342a116.56 116.56 0 0 0-.247-3.02l-.202-1.934c-2.6-22.827-11.655-32.157-27.163-35.269l-1.307-.245a60.184 60.184 0 0 0-2.704-.408l-1.397-.164c-.236-.025-.472-.05-.71-.073l-1.442-.127-1.471-.103-1.502-.081-1.514-.058-1.544-.039-1.574-.018L0 198.74V136.9h127.62c2.086 0 4.108-.04 6.066-.12l1.936-.095 1.893-.122 1.85-.15c.305-.028.608-.056.909-.086l1.785-.193a86.3 86.3 0 0 0 3.442-.475l1.657-.28c20.709-3.755 31.063-14.749 31.063-36.2 0-24.075-16.867-38.666-50.602-38.666H0V0h141.675ZM83.276 250.785c10.333 0 14.657 5.738 16.197 11.23l.203.79.167.782.109.617.046.306.078.603.058.59.023.29.031.569.01.278.008.54v29.507H0v-46.102h83.276Z" fill="currentColor" fillRule="nonzero" />
  </svg>
);

const TauriSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6">
    <path fill="currentColor" d="M86.242 46.547a12.19 12.19 0 0 1-24.379 0c0-6.734 5.457-12.191 12.191-12.191a12.19 12.19 0 0 1 12.188 12.191zm0 0" />
    <path fill="currentColor" d="M41.359 81.453a12.19 12.19 0 1 1 24.383 0c0 6.734-5.457 12.191-12.191 12.191S41.36 88.187 41.36 81.453zm0 0" />
    <path fill="currentColor" d="M99.316 85.637a46.5 46.5 0 0 1-16.059 6.535 32.675 32.675 0 0 0 1.797-10.719 33.3 33.3 0 0 0-.242-4.02 32.69 32.69 0 0 0 6.996-3.418 32.7 32.7 0 0 0 12.066-14.035 32.71 32.71 0 0 0-21.011-44.934 32.72 32.72 0 0 0-33.91 10.527 32.85 32.85 0 0 0-1.48 1.91 54.32 54.32 0 0 0-17.848 5.184A46.536 46.536 0 0 1 60.25 2.094a46.53 46.53 0 0 1 26.34-.375c8.633 2.418 16.387 7.273 22.324 13.984s9.813 15 11.16 23.863a46.537 46.537 0 0 1-20.758 46.071zM30.18 41.156l11.41 1.402a32.44 32.44 0 0 1 1.473-6.469 46.44 46.44 0 0 0-12.883 5.066zm0 0" />
    <path fill="currentColor" d="M28.207 42.363a46.49 46.49 0 0 1 16.188-6.559 32.603 32.603 0 0 0-2.004 11.297 32.56 32.56 0 0 0 .188 3.512 32.738 32.738 0 0 0-6.859 3.371A32.7 32.7 0 0 0 23.652 68.02c-2.59 5.742-3.461 12.113-2.52 18.34s3.668 12.051 7.844 16.77 9.617 8.129 15.684 9.824 12.496 1.605 18.512-.262a32.72 32.72 0 0 0 15.402-10.266 34.9 34.9 0 0 0 1.484-1.918 54.283 54.283 0 0 0 17.855-5.223 46.528 46.528 0 0 1-8.723 16.012 46.511 46.511 0 0 1-21.918 14.609 46.53 46.53 0 0 1-26.34.375 46.6 46.6 0 0 1-22.324-13.984A46.56 46.56 0 0 1 7.453 88.434a46.53 46.53 0 0 1 3.582-26.098 46.533 46.533 0 0 1 17.172-19.973zm69.074 44.473c-.059.035-.121.066-.18.102.059-.035.121-.066.18-.102zm0 0" />
  </svg>
);

const ViteSvg = () => (
  <svg viewBox="0 0 256 257" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="w-6 h-6">
    <defs>
      <linearGradient x1="-.828%" y1="7.652%" x2="57.636%" y2="78.411%" id="a">
        <stop stopColor="var(--color-foreground-400)" offset="0%" />
        <stop stopColor="var(--color-foreground-400)" offset="100%" />
      </linearGradient>
      <linearGradient x1="43.376%" y1="2.242%" x2="50.316%" y2="89.03%" id="b">
        <stop stopColor="var(--color-foreground-50)" offset="0%" />
        <stop stopColor="var(--color-foreground-50)" offset="100%" />
      </linearGradient>
    </defs>
    <path d="M255.153 37.938 134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z" fill="url(#a)" />
    <path d="M185.432.063 96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028 72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z" fill="url(#b)" />
  </svg>
);

export default function InstallationPage() {
  const [framework, setFramework] = useState<Framework>("nextjs");
  const [manager, setManager] = useState<Manager>("npm");
  const [method, setMethod] = useState<"cli" | "manual">("cli");

  const managerCommands = {
    npm: "npm i",
    pnpm: "pnpm add",
    yarn: "yarn add",
    bun: "bun add",
  };

  const frameworkIcons: Record<Framework, React.ReactNode> = {
    nextjs: <NextJsSvg />,
    vite: <ViteSvg />,
    remix: <RemixSvg />,
    tauri: <TauriSvg />,
  };

  const installCmd = `${managerCommands[manager]} @ui-lab/components`;

  const tocItems = [
    { id: "target-framework", title: "Target framework" },
    { id: "installation-method", title: "Installation method" },
    { id: "automated-setup", title: "Automated setup via CLI" },
    { id: "manual-installation", title: "Manual installation steps" },
    { id: "verification", title: "Verification" },
    { id: "continue-reading", title: "Continue reading" },
  ];

  return (
    <div className="w-full  text-foreground-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-2xl mx-auto w-full px-6 py-16 font-sans text-sm leading-relaxed antialiased">

          {/* Version badge */}
          <div className="mb-12 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-foreground-800 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v2.4.0
            </span>
            <span>·</span>
            <span>Installation</span>
          </div>

          {/* Title */}
          <div className="mb-10">
            <div className="text-base font-medium text-foreground-50">Installation</div>
            <div className="mt-1 text-foreground-300">
              Add UI Lab to any Tailwind v4 project in under one minute.
            </div>
          </div>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Framework selector – grid layout */}
          <section id="target-framework" className="mb-10">
            <div className="text-foreground-400 mb-6">Target framework</div>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["nextjs", "Next.js"],
                  ["vite", "Vite"],
                  ["remix", "Remix"],
                  ["tauri", "Tauri"],
                ] as [Framework, string][]
              ).map(([key, label]) => (
                <div key={key} className="relative">
                  <Card
                    onClick={() => setFramework(key)}
                    className={`cursor-pointer p-3 relative rounded-lg border ${framework === key
                      ? "bg-background-700 border-background-600"
                      : "bg-background-900 border-background-700 hover:border-background-600"
                      } ${['vite', 'remix', 'tauri'].includes(key) ? 'opacity-50' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-3 text-foreground-200">
                      {frameworkIcons[key]}
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </Card>
                  {['vite', 'remix', 'tauri'].includes(key) && (
                    <Badge size="sm" pill className="absolute top-2 right-2">
                      Coming soon
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Installation method */}
          <section id="installation-method">
            <div className="text-foreground-400 mb-3">Installation method</div>
            <ButtonGroup variant="outline">
              <ButtonGroupItem
                isSelected={method === "cli"}
                onClick={() => setMethod("cli")}
              >
                CLI (recommended)
              </ButtonGroupItem>
              <ButtonGroupItem
                isSelected={method === "manual"}
                onClick={() => setMethod("manual")}
              >
                Manual
              </ButtonGroupItem>
            </ButtonGroup>
          </section>

          <div className="h-px bg-foreground-800 mt-4 mb-12"></div>

          {/* CLI Setup */}
          {method === "cli" && (
            <section id="automated-setup" className="space-y-10 text-foreground-300">
              <div className="font-medium text-foreground-200">Automated setup via CLI</div>

              <div className="text-sm leading-6">
                The official installer configures Tailwind, injects the required @theme tokens, and optionally copies component source.
              </div>

              <CodeBlockWithPackageManager
                code={installCmd}
                packageManager={manager}
                onPackageManagerChange={setManager}
                language="bash"
              />

              <div className="text-sm text-foreground-400 space-y-2">
                <div>• Installs <code className="text-foreground-300">@ui-lab/components</code> and peer dependencies</div>
                <div>• Detects Tailwind v4 and injects required content paths</div>
                <div>• Adds <code className="text-foreground-300">@theme</code> defaults to your root stylesheet</div>
                <div>• Optional interactive component selection</div>
              </div>
            </section>
          )}

          {/* Manual Setup */}
          {method === "manual" && (
            <section id="manual-installation" className="space-y-10 text-sm text-foreground-300">
              <div className="font-medium text-foreground-200">Manual installation steps</div>

              <div className="space-y-8">

                {/* 1. Install package */}
                <div>
                  <div className="mb-2 text-foreground-200">1. Install core package</div>
                  <CodeBlockWithPackageManager
                    code={installCmd}
                    packageManager={manager}
                    onPackageManagerChange={setManager}
                    language="bash"
                  />
                </div>

                {/* 2. Tailwind content */}
                <div>
                  <div className="mb-2 text-foreground-200">2. Extend Tailwind content paths</div>
                  <CodeBlock language="typescript" heading="tailwind.config.ts">
                    {`export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ui-lab/components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...existing config
}`}
                  </CodeBlock>
                </div>

                {/* 3. Root @theme */}
                <div>
                  <div className="mb-2 text-foreground-200">3. Add root theme (globals.css or equivalent)</div>
                  <CodeBlock language="css" heading="app/globals.css">
                    {`@import "@ui-lab/components/styles/base.css";

@theme {
  --background-50:  oklch(99%  0.001 240);
  --background-100: oklch(97%  0.002 240);
  /* ...950 */
  --background-surface: var(--background-100);
  --background-contrast: var(--background-950);

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}`}
                  </CodeBlock>
                </div>

                {/* 4. Import globals */}
                <div>
                  <div className="mb-2 text-foreground-200">4. Import stylesheet in root layout/entry</div>
                  <CodeBlock language="typescript">{`import "./globals.css";`}</CodeBlock>
                </div>

              </div>
            </section>
          )}

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Verification */}
          <section id="verification" className="space-y-6 text-sm text-foreground-300">
            <div className="font-medium text-foreground-200">Verification</div>
            <div className="leading-6">
              Start your dev server and render a test component:
            </div>
            <CodeBlock language="typescript">{`import { Button } from "@ui-lab/components";

export default function Home() {
  return <Button>UI Lab ready</Button>;
}`}</CodeBlock>
            <div className="text-sm text-foreground-400">
              No runtime errors and correct styling confirms successful installation.
            </div>
          </section>

          <div className="h-px bg-foreground-800 my-12"></div>

          {/* Continue reading */}
          <section id="continue-reading" className="space-y-6 text-sm">
            <div className="font-medium text-foreground-200">Continue reading</div>
            <div className="space-y-3 text-foreground-400">
              <a href="/docs/theming" className="block underline underline-offset-4 hover:text-foreground-100">
                Theming reference → Full token contract and extension guide
              </a>
              <a href="/docs/ai-integration" className="block underline underline-offset-4 hover:text-foreground-100">
                AI integration → Using llms.txt with Cursor, Claude, and Copilot
              </a>
              <a href="/docs/components" className="block underline underline-offset-4 hover:text-foreground-100">
                Component catalogue → Props, variants, and source
              </a>
            </div>
          </section>

          <div className="mt-20 text-sm text-foreground-500">
            © 2025 UI Lab • Built for humans and machines
          </div>

        </main>
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
