"use client";

import {
  FaBrain,
  FaPaintbrush,
  FaEye,
  FaTags,
} from "react-icons/fa6";
import { Button } from "ui-lab-components";

function HeroSection() {
  return (
    <>
      <div className="z-10 mt-12 sm:mt-0 overflow-hidden">
        <div className="relative h-full flex flex-col justify-between md:justify-center">
          <div className="flex items-center text-center flex-col pt-8 md:pt-0">
            <div className="flex gap-2 mb-4">
              <span className="flex h-[32px] font-medium items-center overflow-hidden gap-[9px] bg-background-950 border border-background-700 rounded-[8px] text-foreground-300 text-sm pl-[3px]">
                <div className="flex items-center text-accent-500 bg-accent-500/30 border-l-[1px] rounded-[5px] h-[20px] border-background-700 mr-[4px] px-[4px]"><FaTags /></div>
                <span className="text-xs font-smeibold">Release Notes</span>
                <span className="bg-background-800/50 border-l border-background-700 h-full text-xs font-smeibold pt-1 px-3">
                  v0.1.5
                </span>
              </span>
            </div>
            <h1 className="mb-2 max-w-[25ch] sm:max-w-[38ch] text-foreground-200">
              Component library built for modern workflows.
            </h1>
            <p className="text-foreground-400 w-full sm:w-[59ch] max-w-[59ch] px-4">
              Accessible, production-ready React components with intelligent
              metadata that enable AI to generate perfectly consistent interfaces.
            </p>
            <div className="flex gap-3 mt-8 mb-6 md:mt-10 md:mb-0">
              <Button variant="default" size="sm" className="font-semibold flex justify-evenly" href="/docs">
                Get Started
              </Button>
              <Button variant="outline" size="sm" className="font-semibold" href="/components">
                View Components
              </Button>
            </div>
          </div>
          <div className="hidden flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 w-full px-4 pb-4 md:pb-0 md:absolute md:bottom-0 md:left-0">
            <div className="p-3 md:p-[12px] text-foreground-400 flex gap-4 sm:gap-0 sm:space-x-[28px] w-full">
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
            <p className="hidden text-sm max-w-[41ch] text-foreground-400 px-4 md:mx-[4px] md:mb-[14px]">
              User Interface (UI) is the space where interactions between humans and machines occur.
            </p>
          </div>
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


