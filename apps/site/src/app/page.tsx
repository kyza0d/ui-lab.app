"use client";
import Aura from "@/components/Aura";
import Link from "next/link";
import {
  FaBook,
  FaBox,
  FaBrain,
  FaBrush,
  FaPalette,
  FaRobot,
  FaRocket,
  FaShapes,
  FaTerminal,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { Divider, Toaster, Button } from "ui-lab-components";

const features = [
  {
    icon: <FaBox size={20} />,
    title: "20 Production-Ready Components",
    highlight: "20+",
    desc: "Built with React Aria + Tailwind v4. 100% WAI-ARIA compliant out of the box.",
    link: "/components",
  },
  {
    icon: <FaPalette size={20} />,
    title: "Modern OKLCH Color System",
    desc: "Perceptually uniform, wide-gamut colors. No more broken HSL lightness.",
    link: "/docs"
  },
  {
    icon: <FaWandMagicSparkles size={20} />,
    title: "Stunning Defaults, Total Control",
    desc: "Beautiful out-of-the-box design. Override any part with zero effort.",
  },
  {
    icon: <FaTerminal size={20} />,
    title: "Powerful Built-in CLI",
    desc: "Install components, sync themes, measure bundle impact — all from terminal.",
    disabled: true
  },
  {
    icon: <FaRocket size={20} />,
    title: "Zero-JS Server Components",
    desc: "Most components render zero client JS. Instant loads with RSC & streaming.",
  },
  {
    icon: <FaBrain size={20} />,
    title: "Claude & AI-First Types",
    desc: "Granular TypeScript, zero any. Claude, Cursor, Copilot autocomplete perfectly.",
    disabled: true
  },
];

export default function Home() {
  return (
    <div>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <Toaster />

        <main className="relative mx-auto max-w-[1800px] px-4 sm:px-6 pt-8">
          {/* Hero Section – 55/45 split on large screens */}
          <section
            className="relative overflow-hidden rounded-lg border border-background-700 
            bg-background-900/50 min-h-[900px]
            grid grid-cols-1 lg:grid-cols-20"
          >
            {/* Left: Content – 11 columns out of 20 (~55%) */}
            <div className="lg:col-span-11 flex flex-col">
              {/* Bottom Description + Buttons */}
              <div className="m-3">
                <div className="rounded-lg border border-background-600 bg-background-900/60 p-5 pb-3">
                  <h3 className="text-2xl sm:text-3xl font-light leading-tight text-foreground-50 mb-5">
                    Build beautiful, production-grade <br />
                    products at{" "}
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-accent-500/30 text-foreground-50 font-medium">
                      lightning speed
                    </span>
                  </h3>
                  <p className="text-sm text-foreground-400 max-w-2xl leading-relaxed">
                    Whether you're prototyping at lightning speed or building production-grade applications that need to scale,
                    this is the component library that feels like an extension of your own codebase — beautiful, accessible,
                    and obsessively polished, ready to ship the moment you install it.
                  </p>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mt-12">
                    <div className="flex flex-wrap gap-3">
                      <Link href="/docs">
                        <Button variant="ghost" size="md">
                          <FaBook size={20} className="mr-3" />
                          <span className="text-sm">Documentation</span>
                        </Button>
                      </Link>
                      <Link href="/components">
                        <Button variant="ghost" size="md">
                          <FaShapes size={20} className="mr-3" />
                          <span className="text-sm">Components</span>
                        </Button>
                      </Link>
                    </div>

                    <div className="ml-auto flex flex-wrap gap-3">
                      <Link href="/style-guide">
                        <Button variant="ghost" size="md" className="opacity-20" disabled>
                          <FaBrush size={20} className="mr-3" />
                          <span className="text-sm">Design System</span>
                        </Button>
                      </Link>
                      <Link href="/llms">
                        <Button className="opacity-20" variant="ghost" size="md" disabled>
                          <FaRobot size={20} className="mr-3" />
                          <span className="text-sm">
                            LLMs Reference
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Divider spacing="none" className="mb-4" />

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 px-4">
                {features.map((feature, i) => {
                  const isDisabled = feature.disabled;
                  const hasLink = !!feature.link && !isDisabled;

                  const cardContent = (
                    <div
                      className={`
                        flex items-start gap-3.5 text-left p-4 rounded-lg border
                        transition-all duration-200
                        ${isDisabled
                          ? "cursor-not-allowed opacity-40 border-transparent"
                          : "border-transparent hover:bg-background-800/50 hover:border-background-600 group"
                        }
                      `}
                    >
                      <div
                        className={`
                          p-3 shrink-0 transition-colors
                          ${isDisabled ? "text-foreground-500" : "text-foreground-100 group-hover:text-foreground-50"}
                        `}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <strong
                          className={`
                            font-semibold text-base block leading-tight transition-colors
                            ${isDisabled ? "text-foreground-500" : "text-foreground group-hover:text-foreground-50"}
                          `}
                        >
                          {feature.highlight ? (
                            <>
                              <span className="font-medium text-foreground-100">{feature.highlight}</span>{" "}
                              Production-Ready Components
                            </>
                          ) : (
                            feature.title
                          )}
                        </strong>
                        <p
                          className={`
                            text-sm mt-1.5 leading-relaxed
                            ${isDisabled ? "text-foreground-600" : "text-foreground-400"}
                          `}
                        >
                          {feature.desc}
                        </p>
                      </div>
                    </div>
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

            {/* Right: Visual Panel – 9 columns out of 20 (~45%) but feels wider */}
            <div className="hidden lg:block lg:col-span-9 relative border-l border-background-700 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-background-700/30 text-9xl font-black select-none">
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Aura glow below hero */}
      <div className="bottom-0 left-0 absolute -z-10 pointer-events-none">
        <Aura />
      </div>
    </div>
  );
}
