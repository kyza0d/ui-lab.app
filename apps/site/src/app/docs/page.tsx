'use client';

import { ArrowRight, Rows } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { TableOfContents } from "@/components/TableOfContents";
import { Table, type Column } from "@/components/table";
import { Logo } from "@/components/ui/logo";

const TailwindSvg = () => (
  <svg
    viewBox="0 0 256 154"
    width="256"
    height="154"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="w-8 h-8"
  >
    <defs>
      <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient">
        <stop stopColor="#2298BD" offset="0%" />
        <stop stopColor="#0ED7B5" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
      fill="url(#gradient)"
    />
  </svg>
);

const ReactAriaSvg = () => (
  <svg width="91" height="80" viewBox="0 0 91 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <g clipPath="url(#clip0_906_1839)">
      <path d="M56.9686 0H90.4318V80L56.9686 0Z" fill="#EB1000" />
      <path d="M33.4632 0H0V80L33.4632 0Z" fill="#EB1000" />
      <path d="M45.1821 29.4668L66.5199 80.0002H52.5657L46.1982 63.9461H30.6182L45.1821 29.4668Z" fill="#EB1000" />
    </g>
    <defs>
      <clipPath id="clip0_906_1839">
        <rect width="90.4318" height="80" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ReactSvg = () => (
  <svg viewBox="0 0 256 228" width="256" height="228" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="w-8 h-8">
    <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z" fill="#00D8FF" />
  </svg>
);

const TypeScriptSvg = () => (
  <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="w-8 h-8">
    <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6" />
    <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF" />
  </svg>
);

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

  const techStack = [
    { Icon: TailwindSvg, name: "Tailwind CSS", version: "v4.1", link: "https://tailwindcss.com" },
    { Icon: ReactAriaSvg, name: "React Aria", version: "v1.9", link: "https://react-spectrum.adobe.com/react-aria/" },
    { Icon: ReactSvg, name: "React", version: "v19.1", link: "https://react.dev" },
    { Icon: TypeScriptSvg, name: "TypeScript", version: "v5.8", link: "https://www.typescriptlang.org" },
  ];

  return (
    <div className="w-full text-foreground-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-2xl mx-auto w-full px-6 py-16 font-sans text-sm leading-relaxed antialiased">
          {/* Version badge */}
          <div className="mb-8 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-foreground-800 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v0.1.1
            </span>
            <span>·</span>
            <span>06 Dec 2025</span>
            <span>·</span>
            <span>Build 2f8e9a1</span>
          </div>

          <div className="w-full h-50 bg-gradient-to-b border border-background-700 from-background-900 to-background-950 rounded-xl mb-12  relative overflow-hidden">
            <Logo className="absolute text-foreground-500 opacity-10 top-1/2 left-0 -translate-y-40 -translate-x-10 w-90 h-90" />
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

            <CodeBlock filename="theme.css" language="css">
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

            <CodeBlock filename="app/globals.css" language="css">
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

          {/* Tech Stack*/}
          <section id="tech-stack" className="mb-12">
            <div className="mb-6 font-semibold text-foreground-50">Tech stack</div>
            <div className="grid grid-cols-2 gap-6">
              {techStack.map(({ Icon, name, version, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex  justify-end flex-col gap-4 px-6 py-4 h-30 rounded-lg border border-background-700 bg-background-800/50 backdrop-blur-sm transition-all hover:border-foreground-600 hover:bg-background-800 cursor-pointer"
                >
                  <div className="absolute top-4 left-6">
                    <Icon />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground-200">{name}</div>
                    <div className="text-sm text-foreground-400">{version}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Requirements table */}
          <section id="runtime-requirements" className="text-sm">
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
