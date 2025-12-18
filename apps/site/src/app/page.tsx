"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  FaBox,
  FaBrain,
  FaRobot,
  FaTerminal,
  FaUser,
  FaWandMagicSparkles,
  FaChartLine,
  FaLayerGroup,
  FaArrowUp,
  FaArrowDownShortWide,
  FaHammer,
  FaCopy,
  FaCheck,
  FaPalette,
  FaSun,
  FaTree,
  FaArrowRight,
  FaArrowRightLong,
} from "react-icons/fa6";
import { Button, Toaster, Select, Divider } from "ui-lab-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InlineCodeHighlight } from "@/components/InlineCodeHighlight";
import Aura from "@/components/Aura";

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const installCommands: Record<PackageManager, string> = {
  npm: 'npm install ui-lab-components',
  pnpm: 'pnpm install ui-lab-components',
  yarn: 'yarn add ui-lab-components',
  bun: 'bun add ui-lab-components',
};

gsap.registerPlugin(useGSAP);

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
    icon: <FaSun size={20} />, // or <FaMoon /> if you prefer
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
  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const userChatRef = useRef<HTMLDivElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);
  const mcpStatusRef = useRef<HTMLDivElement>(null);

  // UI Construction Refs
  const uiContainerRef = useRef<HTMLDivElement>(null);
  const uiSidebarRef = useRef<HTMLDivElement>(null);
  const uiHeaderRef = useRef<HTMLDivElement>(null);
  const uiHeroRef = useRef<HTMLDivElement>(null);
  const uiChartRef = useRef<HTMLDivElement>(null);

  // Copy to clipboard state
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');

  const handleCopy = () => {
    const command = installCommands[packageManager];
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(
      [
        userChatRef.current,
        aiChatRef.current,
        mcpStatusRef.current,
        uiSidebarRef.current,
        uiHeaderRef.current,
        uiHeroRef.current,
        uiChartRef.current,
      ],
      { autoAlpha: 0, y: 20 }
    );
    gsap.set(uiContainerRef.current, { autoAlpha: 0, scale: 1.0 });

    tl.to(userChatRef.current, { autoAlpha: 1, y: -5, duration: 0.6, delay: 0.5 }) // User asks
      .to(aiChatRef.current, { autoAlpha: 1, y: -5, duration: 0.6 }, "+=0.3") // AI Responds
      .to(mcpStatusRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "+=0.1") // MCP Call visual

      // The Build "Aha Moment" - Now with fade-in from Y and X axes
      .to(uiContainerRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: -10,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.2")
      .to(uiSidebarRef.current, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(uiHeaderRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to([uiHeroRef.current, uiChartRef.current], {
        autoAlpha: 1,
        y: -10,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="max-w-[1900px] mx-auto">
      <Toaster />

      <main className="mx-auto relative h-screen overflow-hidden">
        {/* <div className="hidden"> */}
        <div className="opacity-80">
          <Aura />
        </div>
        <div className="absolute border-b-[2px] border-background-700 h-[80vh] right-0 left-0 top-1/2 -translate-y-1/2">
          <section className="h-full shadow-xl ml-auto w-[1600px] grid grid-cols-[4fr_8fr] border-[2px] border-b-0 border-r-0 border-background-700 rounded-tl-[22px] overflow-hidden">
            <div className="grid border-r-[2px] border-background-700 bg-background-900 backdrop-blur-sm z-10">
              <div className="p-[16px] flex flex-col justify-between">
                <div className="flex flex-col h-full justify-center">
                  <span className="hidden bg-background-800 flex  items-center gap-3 border-[2px] border-background-700 rounded-[8px] text-foreground-300 text-sm w-fit pl-[4px] pr-[12px] py-[4px] mb-4">
                    <div className="p-[6px] bg-accent-500/10 rounded-[5px]"><FaRobot className="text-accent-500 w-4 h-4" /></div> MCP now available
                  </span>
                  <h1 className="leading-tight text-4xl font-bold text-foreground-50 mb-4 tracking-tight">
                    Build beautiful, production-grade <br />
                    products at lightning speed
                  </h1>
                  <p className="text-sm text-foreground-400 max-w-[66ch] leading-relaxed">
                    Component library that feels like an extension of your own
                    codebase — beautiful, accessible, and obsessively polished,
                    ready to ship the moment you install it.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-background-950 border-[2px] border-background-700 rounded-lg p-1 w-fit">
                  <Select
                    selectedKey={packageManager}
                    defaultValue={packageManager}
                    onSelectionChange={(key) => setPackageManager(key as PackageManager)}
                  >
                    <Select.Trigger className="min-w-[40px] px-3 py-2 text-sm bg-background-800 border-[2px] border-background-600 rounded">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="npm" textValue="npm">
                        npm
                      </Select.Item>
                      <Select.Item value="pnpm" textValue="pnpm">
                        pnpm
                      </Select.Item>
                      <Select.Item value="yarn" textValue="yarn">
                        yarn
                      </Select.Item>
                      <Select.Item value="bun" textValue="bun">
                        bun
                      </Select.Item>
                    </Select.Content>
                  </Select>
                  <InlineCodeHighlight
                    code={installCommands[packageManager]}
                    language="bash"
                    className="text-foreground-100 whitespace-nowrap"
                  />
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-background-800 rounded transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <FaCheck size={16} className="text-accent-500" />
                    ) : (
                      <FaCopy size={16} className="text-foreground-400" />
                    )}
                  </button>
                </div>
              </div>
              {/* Feature Cards */}
              <div className="border-t-[2px] p-[12px] space-y-[12px] bg-background-950 border-background-700 max-h-100 overflow-scroll">
                {features.map((feature, i) => {
                  const hasLink = !!feature.link;
                  const cardContent = (
                    <>
                      <div className="flex rounded-[18px] w-full h-[90px] flex-row items-start gap-4.5 text-left p-4 border-background-700 -mt-[2px] hover:bg-background-800 hover:border-background-600 group transition-colors">
                        <div className="group-hover:bg-accent-500/20 group-hover:text-accent-500 bg-background-800 text-foreground-300 h-10 grid place-items-center rounded-[12px] aspect-square mb-2 shrink-0 transition-colors">
                          {feature.icon}
                        </div>
                        <div>
                          <strong className="font-semibold text-base block leading-tight text-foreground-100">
                            {feature.highlight ? (
                              <>
                                <span className="font-medium text-accent-500">
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
                      <Divider className="mt-[12px]" />
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
            </div>

            {/* RIGHT COLUMN: Interactive Showcase */}
            <div className="relative w-full h-screen bg-background-950 overflow-hidden isolate after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:shadow-[inset_0px_-300px_90px_0px] after:shadow-background-950 after:pointer-events-none">

              {/* MCP Status Indicator - Floating above the UI */}
              <div
                ref={mcpStatusRef}
                className="absolute top-6 left-12 z-20 flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-background-900 border-[2px] border-background-700 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-md h-2 w-2 bg-accent-500"></span>
                </span>
                <code className="font-mono">Calling MCP: @ui-lab/scaffold-saas...</code>
              </div>

              {/* Skewed UI Container */}
              <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute perspective-1000">
                {/* The "Generated" Interface */}
                <div className="scale-150 transform-gpu">
                  <div
                    ref={uiContainerRef}
                    className="shadow-xl bg-background-900  border-[2px] border-background-700 w-[600px] h-[400px] rounded-[12px] overflow-hidden grid grid-cols-[40px_1fr]"
                  >

                    {/* Mock Sidebar */}
                    <div ref={uiSidebarRef} className="bg-background-800 border-r border-background-700 h-full flex flex-col items-center py-4 gap-4">
                      <div className="w-6 h-6 rounded-md bg-accent-500/20 border-[2px] border-accent-500/40" />
                      <div className="w-full h-px bg-background-700 my-2" />
                      <div className="w-6 h-6 rounded bg-background-700/50" />
                      <div className="w-6 h-6 rounded bg-background-700/50" />
                      <div className="w-6 h-6 rounded bg-background-700/50" />
                    </div>

                    {/* Mock Content Area */}
                    <div className="flex flex-col h-full bg-background-950/80">

                      {/* Mock Header */}
                      <div ref={uiHeaderRef} className="h-12 border-b-[2px] border-background-700 flex items-center justify-between px-6 bg-background-900/50">
                        <div className="h-4 w-32 bg-background-700/50 rounded-md" />
                        <div className="flex gap-3">
                          <div className="h-8 w-20 bg-accent-600/20 border-[2px] border-accent-500/30 rounded-md" />
                          <div className="h-8 w-8 bg-background-700/50 rounded-md" />
                        </div>
                      </div>

                      {/* Mock Dashboard Body */}
                      <div className="p-6 flex flex-col gap-4">
                        {/* Hero Stats */}
                        <div ref={uiHeroRef} className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-30 bg-background-900 border-[2px] border-background-800 rounded-lg p-3">
                              <div className="h-8 w-8 mb-2 bg-background-800 rounded-md grid place-items-center">
                                <FaLayerGroup size={12} className="text-foreground-600" />
                              </div>
                              <div className="h-2 w-12 bg-background-700/50 rounded-md mb-2" />
                              <div className="h-4 w-20 bg-background-600/30 rounded-md" />
                            </div>
                          ))}
                        </div>

                        {/* Chart Area */}
                        <div ref={uiChartRef} className="flex-1 bg-background-900 border-[2px] border-background-800 rounded-lg py-7 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-t from-accent-500/5 to-transparent" />
                          <FaChartLine className="text-background-800 text-6xl opacity-50" />
                          <div className="absolute bottom-4 left-4 right-4 h-20 flex items-end justify-between gap-2 px-4">
                            {[40, 70, 45, 90, 60, 80, 50, 95].map((h, idx) => (
                              <div key={idx} style={{ height: `${h}%` }} className="w-full bg-accent-500/20 border-t-[2px] border-accent-500/40 rounded-t-sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Chat Interface - Fixed Position relative to container */}
              <div className="z-30 flex flex-col gap-4 bottom-60 right-12 absolute">
                {/* User Message */}
                <div
                  ref={userChatRef}
                  className="flex items-start gap-3 p-3 pr-4 bg-background-900 border-[2px] border-background-700 rounded-[19px] rounded-tr-sm ml-auto"
                >
                  <div className="max-w-[30ch] text-sm text-foreground-200 pt-1">
                    Build a SAAS Dashboard for our SEO search tool, use UI Lab MCP to help
                  </div>
                  <div className="w-8 h-8 grid place-items-center bg-background-800 border-[2px] border-background-700 rounded-[10px] shrink-0">
                    <FaUser size={12} className="text-foreground-400" />
                  </div>
                </div>
                {/* Agent Message */}
                <div
                  ref={aiChatRef}
                  className="flex items-start gap-3 p-3 pr-4 bg-background-900 border-[2px] border-background-700 rounded-[19px] rounded-tl-sm ml-auto"
                >
                  <div className="w-8 h-8 grid place-items-center bg-background-800 border-[2px] border-background-700 rounded-[10px] shrink-0">
                    <FaRobot size={14} className="text-foreground-400" />
                  </div>
                  <div className="max-w-[30ch] text-sm text-foreground-200 pt-1">
                    Got it! Calling the Component Agent to scaffold that for you now...
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="bg-background-950 w-full h-120 border-t-[2px] border-background-700">

          </div>
        </div>
      </main>
    </div>
  );
}
