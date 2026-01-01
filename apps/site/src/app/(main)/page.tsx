"use client";

import { useRef, useState } from "react";
import { Toaster } from "ui-lab-components";
import { HeroSection, Showcase, NodeSection } from "@/features/landing";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const installCommands: Record<PackageManager, string> = {
  npm: "npm install ui-lab-components",
  pnpm: "pnpm install ui-lab-components",
  yarn: "yarn add ui-lab-components",
  bun: "bun add ui-lab-components",
};

import {
  FaBox,
  FaBrain,
  FaWandMagicSparkles,
  FaTerminal,
  FaPalette,
  FaSun,
  FaTree,
  FaCopy,
} from "react-icons/fa6";
import Link from "next/link";
import { Aura } from "@/shared";

const features = [
  {
    icon: <FaBox size={20} />,
    title: "28 Production-Ready Components",
    highlight: "28+",
    desc: "Built with React Aria + Tailwind v4. 100% WAI-ARIA compliant out of the box.",
    link: "/components",
  },
  {
    icon: <FaWandMagicSparkles size={20} />,
    title: "Stunning Defaults, Total Control",
    desc: "Beautiful out-of-the-box design. Theme any component with ease.",
  },
  {
    icon: <FaTerminal size={20} />,
    title: "Powerful Built-in CLI",
    desc: "Install components, sync themes, measure bundle impact — all from terminal.",
  },
  {
    icon: <FaBrain size={20} />,
    title: "Claude & AI-First Types",
    desc: "Granular TypeScript, zero any. Claude, Cursor, Copilot autocomplete perfectly.",
  },
  {
    icon: <FaPalette size={20} />,
    title: "OKLCH-Powered Color System",
    highlight: "OKLCH",
    desc: "Modern perceptual color space for smoother gradients, better contrast, and predictable theming across light/dark modes.",
  },
  {
    icon: <FaSun size={20} />,
    title: "Seamless Light & Dark Modes",
    desc: "Built-in automatic dark mode with prefers-color-scheme support and manual toggle. Zero extra setup needed.",
  },
  {
    icon: <FaTree size={20} />,
    title: "Tree-Shakable & Tiny Bundle Size",
    desc: "Each component is fully tree-shakable. Import only what you use — average < 5kB gzipped per component.",
  },
  {
    icon: <FaCopy size={20} />,
    title: "Copy-Paste Ready Code",
    desc: "Every example includes clean, ready-to-copy code with installation commands and accessible props table.",
  },
];


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  const handleCopy = () => {
    const command = installCommands[packageManager];
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="pt-(--header-height) mx-auto" style={{ '--header-height': '3.75rem' } as React.CSSProperties}>
      <Toaster />
      <main className="mx-auto h-full max-w-[1100px]">
        <div>
          <div className="hidden fixed max-w-[1400px] border-x border-background-700 w-screen h-screen top-0 left-1/2 -translate-x-1/2">
            <Aura />
          </div>
          <section className="border-x border-background-700 grid-paper after:content-[''] bg-background-950 ml-auto grid grid-cols-[1fr] grid-rows-[400px]">
            <HeroSection
              packageManager={packageManager}
              onPackageManagerChange={setPackageManager}
              copied={copied}
              onCopy={handleCopy}
            />
          </section>
          <div className="after:absolute after:left-0 after:top-0 after:w-screen after:h-[2px] after:bg-background-500"></div>

          <NodeSection>
            <Showcase />
          </NodeSection>
          <NodeSection>
            <div className="bg-background-950 border-t border-background-700 grid px-[28px] grid-cols-2 gap-x-[24px] pt-[14px] space-y-[12px] overflow-scroll">
              {features.map((feature, i) => {
                const hasLink = !!feature.link;
                const cardContent = (
                  <>
                    <div className="flex rounded-[18px] w-full h-[140px] flex-row items-start gap-[14px] text-left p-4 border-background-700 -mt-[2px] hover:bg-background-800 hover:border-background-600 group transition-colors">
                      <div className="group-hover:bg-background-700 group-hover:text-foreground-300 bg-background-800 border-[2px] border-background-700 group-hover:border-background-600 text-foreground-300 h-13 grid place-items-center rounded-[12px] aspect-square mb-2 shrink-0 transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <strong className="font-semibold text-base block leading-tight text-foreground-100">
                          {feature.highlight ? (
                            <>
                              <span className="font-medium underline text-foreground-50">
                                {feature.highlight}
                              </span>{" "}
                              Production-Ready Components
                            </>
                          ) : (
                            feature.title
                          )}
                        </strong>
                        <p className="text-sm mt-1.5 leading-relaxed text-foreground-400">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </>
                );

                if (hasLink) {
                  return (
                    <Link key={i} href={feature.link!} className="block">
                      {cardContent}
                    </Link>
                  );
                }
                return <div key={i}>{cardContent}</div>;
              })}
            </div>
          </NodeSection>
        </div>
      </main>
    </div>
  );
}
