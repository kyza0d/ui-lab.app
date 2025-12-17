"use client";
import Aura from "@/components/Aura";
import Link from "next/link";
import {
  FaBox,
  FaBrain,
  FaTerminal,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { Toaster } from "ui-lab-components";

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
];

export default function Home() {
  return (
    <div>
      <Toaster />

      <main className="mx-auto relative h-screen">
        <section className="absolute right-0 top-1/2 -translate-y-1/2 grid grid-cols-[4fr_6fr] border border-background-700 rounded-lg overflow-hidden h-[72vh] w-[1600px]" >
          <div className="h-full border-l border-background-700 flex flex-col justify-start pt-[90px]">
            <div className="ml-[10px] p-6 pb-3">
              <h1 className="leading-tight text-foreground-50 mb-4">
                Build beautiful, production-grade <br />
                products at lightning speed
              </h1>
              <p className="text-sm text-foreground-400 max-w-[66ch]! leading-relaxed">
                Component library that feels like an extension of your own codebase — beautiful, accessible,
                and obsessively polished, ready to ship the moment you install it.
              </p>
            </div>
            {/* Feature Cards */}
            <div className="grid grid-cols-1 mt-[90px]">
              {features.map((feature, i) => {
                const hasLink = !!feature.link;

                const cardContent = (
                  <div
                    className="flex w-full h-[100px] flex-row items-center gap-4.5 text-left p-4 border-background-700 border-t hover:bg-background-800/50 hover:border-background-600 group"
                  >
                    <div
                      className="h-full grid place-items-center rounded-md aspect-square mb-2 shrink-0"
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <strong
                        className={`font-semibold text-base block leading-tight`}
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
                      <p className={` text-sm mt-1.5 leading-relaxed`}>
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
          <div className="w-full h-full bg-background-950 border-l border-background-700">

          </div>
        </section>
      </main>

      {/* Aura glow below hero */}
      <div className="hidden bottom-0 left-0 absolute -z-10 pointer-events-none">
        <Aura />
      </div>

    </div>
  );
}
