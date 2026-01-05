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
import { SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

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

const TailwindSvg = () => (
  <SiTailwindcss className="w-8 h-8 text-accent-500" />
);

const ReactAriaSvg = () => (
  <svg
    viewBox="200 206 800 790"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
  >
    <path
      d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
      fill="var(--accent-500)"
    />
  </svg>
);

const ReactSvg = () => (
  <SiReact className="w-8 h-8 text-accent-500" />
);

const TypeScriptSvg = () => (
  <SiTypescript className="w-8 h-8 rounded-[4px] text-accent-500" />
);


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
      <main className="mx-auto h-full max-w-[1100px] ">
        <div className="fixed h-full bg-background-950 border-x border-background-700 w-screen top-0 left-1/2 -translate-x-1/2">
        </div>
        <div className="fixed max-w-[94vw] bg-background-950 border-x border-background-700 w-screen h-screen top-0 left-1/2 -translate-x-1/2">
          <div className="hidden grid-paper" />
        </div>
        <div>
          <section className="border-x border-background-700 relative isolate after:content-[''] bg-background-950 ml-auto grid grid-cols-[1fr] grid-rows-[474px]">
            <HeroSection
              packageManager={packageManager}
              onPackageManagerChange={setPackageManager}
              copied={copied}
              onCopy={handleCopy}
            />
          </section>
          <div className="after:absolute after:left-0 after:top-0 after:w-screen after:h-[2px] after:bg-accent-500"></div>
          <NodeSection>
            <div className="w-full border-t border-background-700 ml-auto">
              <div className="space-y-3">
                <div className="px-[6px] gap-[6px] grid grid-cols-4 items-center">
                  {[
                    {
                      Icon: TailwindSvg,
                      name: "Tailwind CSS",
                      version: "v4.1",
                      link: "https://tailwindcss.com",
                    },
                    {
                      Icon: ReactSvg,
                      name: "React",
                      version: "v19.1",
                      link: "https://react.dev",
                    },
                    {
                      Icon: ReactAriaSvg,
                      name: "React Aria",
                      version: "v3.4",
                      link: "https://react-spectrum.adobe.com/react-aria/",
                    },
                    {
                      Icon: TypeScriptSvg,
                      name: "TypeScript",
                      version: "v5.9",
                      link: "https://www.typescriptlang.org",
                    },
                  ].map(({ Icon, name, version, link }) => (
                    <div key={name}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative my-[6px] px-[8px] py-[8px] flex justify-start items-start flex-row gap-[20px] rounded-[15px] border-[2px] border-background-700 bg-background-800/50 backdrop-blur-sm transition-all hover:border-background-600 hover:bg-background-800 cursor-pointer"
                      >
                        <div className="bg-accent-500/20 p-[12px] rounded-[8px]">
                          <Icon />
                        </div>
                        <div className="gap-[5px]">
                          <div className="text-sm font-medium text-foreground-200">
                            {name}
                          </div>
                          <div className="text-sm text-foreground-400">{version}</div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </NodeSection>

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
