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
import Image from "next/image"

const features = [
  {
    icon: <FaBox size={20} />,
    title: "28 Production-Ready Components",
    highlight: "28+",
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
    desc: "Beautiful out-of-the-box design. Theme any component with ease.",
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
    <div className="h-screen relative">
      <div className="hidden fixed top-0 left-0 w-screen h-screen bg-black/20 z-999 backdrop-blur-lg" />
      <div>
        <Toaster />

        <main>
          {/* Hero Section – 55/45 split on large screens */}
          <section className="absolute left-1/2 top-1/2 -translate-1/2 w-full max-w-(--page-width) grid grid-cols-1 lg:grid-cols-20" >
            {/* Left: Content – 11 columns out of 20 (~55%) */}
            <div className="lg:col-span-11 flex flex-col mr-12 pt-12 pr-12">
              {/* Bottom Description + Buttons */}
              <div className="image space-y-40">
                <div className="rounded-lg p-6 pb-3">
                  <h1 className="leading-tight text-foreground-50 mb-4">
                    Build beautiful, production-grade <br />
                    products at lightning speed
                  </h1>
                  <p className="text-sm text-foreground-400 max-w-[66ch]! leading-relaxed">
                    Component library that feels like an extension of your own codebase — beautiful, accessible,
                    and obsessively polished, ready to ship the moment you install it.
                  </p>
                </div>
              </div>
              <Divider spacing="none" className="mb-4 mt-32 mx-5" />

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {features.map((feature, i) => {
                  const isDisabled = feature.disabled;
                  const hasLink = !!feature.link && !isDisabled;

                  const cardContent = (
                    <div
                      className={`
                        flex flex-col items-start gap-3.5 text-left p-4 rounded-lg border
                        transition-all duration-200
                        ${isDisabled
                          ? "cursor-not-allowed opacity-40 border-transparent"
                          : "border-transparent hover:bg-background-800/50 hover:border-background-600 group"
                        }
                      `}
                    >
                      <div
                        className={`
                          hidden mb-2 shrink-0 transition-colors
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
            <div className="absolute right-0 top-0 ml-12 w-150 h-180 lg:col-span-9 rounded-lg border border-background-700">
              <div className="text-background-700/30 text-9xl font-black select-none">
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Aura glow below hero */}
      <div className="hidden bottom-0 left-0 absolute -z-10 pointer-events-none">
        <Aura />
      </div>
    </div>
  );
}
