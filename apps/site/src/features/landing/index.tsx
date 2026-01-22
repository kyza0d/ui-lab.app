"use client";

import {
  FaBook,
  FaBrain,
  FaPaintbrush,
  FaBoxArchive,
  FaEye
} from "react-icons/fa6";
import { Button } from "ui-lab-components";

function HeroSection() {
  return (
    <>
      <div className="z-10 rounded-t-none! border-t-0! overflow-hidden">
        <div className="grid-paper relative border-background-700 mx-auto h-full flex flex-col justify-center">
          {/* <Aura /> */}
          <div className="absolute flex gap-6 bottom-0 left-0 w-full">
            <div className="p-[12px] text-foreground-400 flex space-x-[28px] w-full">
              <div className="flex items-center gap-3 text-sm">
                <FaPaintbrush className="w-3.5 h-3.5" /> Customization
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaEye className="w-3.5 h-3.5" /> Accessible
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaBrain className="w-3.5 h-3.5" /> LLM Enabled
              </div>
            </div>
            <p className="text-sm text-foreground-400 mx-[4px] mb-[14px]">
              User Interface (UI) is the space where interactions between humans and machines occur.
            </p>
          </div>
          <div className="pl-[8px] flex items-center text-center flex-col">
            <span className="flex h-[32px] w-60 items-center justify-between gap-[9px] bg-background-950 border-[2px] border-background-700 rounded-[8px] text-foreground-300 text-sm pl-[2px]  mb-4">
              <div className="p-[4px] rounded-[5px]">
                <FaBook className="text-foreground-400 w-4 h-4" />
              </div>{" "}
              Release Notes <div className="flex items-center bg-background-800/60 border-l-[1px] rounded-r-[8px] pr-[10px] h-[30px] border-background-700 pl-[9px] font-bold">v0.1.5</div>
            </span>
            <h1 className="leading-tight mb-0 max-w-[32ch] pb-[9px] font-bold text-foreground-200 tracking-tight">
              Beautiful UIs which are usable.
            </h1>
            <p className="text-sm text-foreground-400 w-[59ch] leading-relaxed">
              Accessible, production-ready React components with intelligent
              metadata that enable AI to generate perfectly consistent interfaces.
            </p>
            <div className="flex gap-3 mt-10">
              <Button className="flex justify-evenly gap-[4px]" variant="primary">
                Get Started</Button>
              <Button className="py-2" variant="default">View Components</Button>
            </div>
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
