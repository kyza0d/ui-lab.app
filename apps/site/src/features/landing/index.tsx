"use client";

import {
  FaBrain,
  FaPaintbrush,
  FaEye,
  FaTags,
  FaWaveSquare,
  FaHammer,
  FaShapes
} from "react-icons/fa6";
import { Button } from "ui-lab-components";

function HeroSection() {
  return (
    <>
      <div className="z-10 overflow-hidden">
        <div className=" relative h-full flex flex-col justify-center">
          {/* <Aura /> */}
          <div className="absolute flex gap-6 bottom-0 left-0 w-full px-2 ">
            <div className="p-[12px] text-foreground-400 flex space-x-[28px] w-full">
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
            <p className="text-sm max-w-[41ch] text-foreground-400 mx-[4px] mb-[14px]">
              User Interface (UI) is the space where interactions between humans and machines occur.
            </p>
          </div>
          <div className="pl-[8px] flex items-center text-center flex-col">
            <div className="flex gap-2 mb-8">
              <span className="flex h-[32px] items-center gap-[9px] bg-background-950 border border-background-700 rounded-[8px] text-foreground-300 text-sm pl-[3px] pr-[12px]">
                <div className="flex text-xs items-center text-accent-500 bg-accent-500/30 border-l-[1px] rounded-[5px] h-[20px] border-background-700 mr-[4px] px-[4px] font-bold"><FaTags /></div>
                Release Notes
              </span>
            </div>
            <h1 className="mb-0 max-w-[32ch] pb-[9px] text-foreground-200">
              Stunning and usable React components
            </h1>
            <p className="text-foreground-400 w-[59ch]">
              Accessible, production-ready React components with intelligent
              metadata that enable AI to generate perfectly consistent interfaces.
            </p>
            <div className="flex gap-3 mt-10">
              <Button variant="primary" icon={{ left: <FaHammer size={18} /> }} className="gap-3 px-6 flex justify-evenly">
                Start Building</Button>
              <Button variant="outline" icon={{ left: <FaShapes className="text-foreground-400" size={18} /> }} className="gap-3 bg-background-950 py-2">View Components</Button>
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
