"use client";

import {
  FaBrain,
  FaPaintbrush,
  FaEye,
  FaRocket,
  FaArrowRightLong,
  FaCube,
} from "react-icons/fa6";
import { Button } from "ui-lab-components";

function HeroSection() {
  return (
    <>
      <div className="z-10 mt-12 sm:mt-0 overflow-hidden">
        <div
          className="grid-paper relative h-full flex flex-col justify-between md:justify-center">

          <div className="flex items-center text-center flex-col pt-8 md:pt-0">
            <h1 className="isolate mb-2 text-xl max-w-[25ch] sm:max-w-[38ch] text-foreground-200">
              Beautiful Software Built for Everyone.
            </h1>
            <p className="text-foreground-400 w-full sm:w-[59ch] max-w-[59ch] px-4">
              Accessible, production-ready React components with intelligent
              metadata that enable AI to generate perfectly consistent interfaces.
            </p>
            <div className="w-90 *:flex-1 flex gap-2 mt-6 mb-6 md:mt-8 md:mb-0">
              <Button size="sm" variant="primary" href="/docs" >
                Documentation
              </Button>
              <Button
                variant="secondary" size="sm" className="font-semibold" href="/components">
                View Components
              </Button>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 w-full md:absolute md:bottom-0 md:left-0">
            <div className="hidden p-3  text-foreground-400 flex gap-4 sm:gap-0 sm:space-x-[28px] w-full">
              <span className="flex items-center gap-3 text-sm">
                <FaPaintbrush className="w-3.5 h-3.5" /> Customization
              </span>
              <span className="flex items-center gap-3 text-sm">
                <FaEye className="w-3.5 h-3.5" /> Accessible
              </span>
              <span className="flex items-center gap-3 text-sm">
                <FaBrain className="w-3.5 h-3.5" /> LLM Enabled
              </span>
            </div>

            <div className="hidden flex gap-2 ml-6">
              <span className="flex h-[32px] font-medium items-center overflow-hidden gap-[9px] bg-background-950 border border-background-700 rounded-[8px] text-foreground-300 text-sm pl-[3px]">
                <div className="flex p-1.5 text-foreground-400 rounded-[5px] border-background-700">
                  <FaRocket size={13} />
                </div>
                <span className="text-sm font-semibold">UI Lab Launches!</span>
                <span className="bg-background-800/50 flex items-center gap-3 border-l border-background-700 h-full text-sm font-smeibold px-3">
                  View Details <FaArrowRightLong className="text-foreground-400" />
                </span>
              </span>
            </div>

            <p className="ml-auto text-xs max-w-[41ch] text-foreground-400 md:mb-[14px]">
              "User Interface" (UI) is the space where interactions between humans and machines occur.
            </p>
          </div>

          <div
            className="-z-1 pointer-events-none absolute inset-x-0 top-0 h-50"
            style={{ boxShadow: "inset 0 50px 50px 20px var(--color-background-950)" }}
          />
        </div>
      </div>
    </>
  );
}

export { HeroSection };
export { Showcase } from "./components/showcase";
export { SettingsPanel } from "./components/settings-panel";
export { LandingThemeToggle as ThemeToggle } from "./components/theme-toggle";
export { NodeSection } from "./components/node-section";


