"use client";

import Link from "next/link";
import { FaBook, FaBox, FaBrain, FaBrush, FaPalette, FaRobot, FaRocket, FaShapes, FaTerminal, FaWandMagicSparkles } from "react-icons/fa6";
import { Divider, Toaster } from "ui-lab-components";
import { Button } from "ui-lab-components";

export default function Home() {
  return (
    <div>
      <div className="hidden fixed top-0 left-0 w-screen h-screen bg-background-700/10 backdrop-blur-md" />
      <Toaster />
      <main className="mx-auto max-w-[1700px] pt-8 pb-28">
        <div className="fixed top-0 left-0 w-screen h-screen bg-background-950 backdrop-blur-md -z-10" />
        <article>
          <section className="h-200 overflow-hidden rounded-lg mx-6 border border-background-700 grid grid-cols-[51%_auto]">
            <div className="grid grid-rows-[1fr_auto]">
              <div>
                <div className="grid grid-cols-2 gap-x-10 px-8 pt-12">
                  <div className="grid grid-rows-3 space-y-6">

                    <button className="cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaBox size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">
                          <span className="font-bold text-foreground-100">62+</span> Production-Ready Components
                        </strong>
                        <p className="text-sm text-foreground-400">
                          Built with React Aria + Tailwind v4. 100% WAI-ARIA compliant out of the box.
                        </p>
                      </div>
                    </button>

                    <button className="cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaPalette size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">Modern OKLCH Color System</strong>
                        <p className="text-sm text-foreground-400">
                          Perceptually uniform, wide-gamut colors. No more broken HSL lightness.
                        </p>
                      </div>
                    </button>

                    <button className="cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaWandMagicSparkles size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">Stunning Defaults, Total Control</strong>
                        <p className="text-sm text-foreground-400">
                          Beautiful out-of-the-box design. Override any part with zero effort.
                        </p>
                      </div>
                    </button>
                  </div>


                  <div className="grid grid-rows-3 space-y-6">
                    <button className="cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaTerminal size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">Powerful Built-in CLI</strong>
                        <p className="text-sm text-foreground-400">
                          Scaffold components, sync themes, measure bundle impact — all from terminal.
                        </p>
                      </div>
                    </button>
                    <button className="cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaRocket size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">Zero-JS Server Components</strong>
                        <p className="text-sm text-foreground-400">
                          Most components render zero client JS. Instant loads with RSC & streaming.
                        </p>
                      </div>
                    </button>
                    <button className="cursor-pointer cursor-pointer flex items-start gap-4 text-left p-2 pr-3 rounded-lg border border-transparent hover:bg-background-700/40 hover:border-background-600 transition">
                      <div className="p-2">
                        <FaBrain size={20} className="text-foreground-100" />
                      </div>
                      <div>
                        <strong className="font-semibold text-foreground">Claude & AI-First Types</strong>
                        <p className="text-sm text-foreground-400">
                          Granular TypeScript, zero any. Claude, Cursor, Copilot autocomplete perfectly.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

              </div>
              <Divider className="mt-8 my-0" />

              <div className="pt-6 bg-background-900 m-4 rounded-xl border border-background-600">
                <div className="px-6">
                  <h2 className="mb-4 text-foreground-300">
                    Accessible library <br />
                    built for <span className="text-foreground-50 px-1 py-0.5 rounded-sm">beautiful UI</span>
                  </h2>
                  <p className="mb-12 text-sm text-foreground-400">
                    Whether you're prototyping at lightning speed or building production-grade applications that need to scale, this is the component library that feels like an extension of your own codebase — beautiful, accessible, and obsessively polished, ready to ship the moment you install it.
                  </p>
                </div>
                <div className="flex p-3 gap-4 border-background-600">
                  <Link href="/components">
                    <Button variant="ghost" size="md">
                      <FaBook className="text-foreground-400 mr-4" />
                      Learn
                    </Button>
                  </Link>
                  <Link href="/components">
                    <Button size="md" variant="ghost">
                      <FaShapes className="text-foreground-400 mr-4" /> Components
                    </Button>
                  </Link>
                  <div className="ml-auto">
                    <Link href="/components">
                      <Button variant="ghost" size="md">
                        <FaBrush className="text-foreground-400 mr-4" />
                        Style Guide
                      </Button>
                    </Link>
                    <Link href="/components">
                      <Button variant="ghost" size="md">
                        <FaRobot className="text-foreground-400 mr-4" />
                        LLMs Reference
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-199 border-l border-background-700 w-full"></div>
          </section>
        </article>
      </main>
    </div>
  );
}
