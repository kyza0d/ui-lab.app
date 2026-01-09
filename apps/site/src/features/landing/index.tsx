"use client";

import {
  FaCopy,
  FaCheck,
  FaBook,
  FaBox,
  FaBrain,
  FaPaintbrush,
  FaBoxOpen,
  FaBoxArchive,
  FaEye
} from "react-icons/fa6";
import { Select, Button } from "ui-lab-components";
import { InlineCodeHighlight } from "@/shared";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const installCommands: Record<PackageManager, string> = {
  npm: "npm install ui-lab-components",
  pnpm: "pnpm install ui-lab-components",
  yarn: "yarn add ui-lab-components",
  bun: "bun add ui-lab-components",
};

interface HeroSectionProps {
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
  copied: boolean;
  onCopy: () => void;
}

function HeroSection({
  packageManager,
  onPackageManagerChange,
  copied,
  onCopy,
}: HeroSectionProps) {
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
            <div className="flex gap-3">
              <Button className="mt-10 flex justify-evenly w-38 gap-[4px]" variant="secondary">
                Learn More</Button>
              <Button className="mt-10 py-2" variant="secondary"><FaBoxArchive className="mr-4 text-foreground-400" /> View Components</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex justify-start items-center rounded-full mt-[30px] gap-3 bg-background-950 border-[2px] border-background-700 p-1">
        <Select
          className="w-fit"
          selectedKey={packageManager}
          defaultValue={packageManager}
          onSelectionChange={(key) => onPackageManagerChange(key as PackageManager)}
        >
          <Select.Trigger className="w-28 px-3 py-2 text-sm bg-background-800 border-[2px] border-background-600 rounded-full">
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
        <Button
          onClick={onCopy}
          variant="ghost"
          className="p-2! mr-0.5 ml-auto hover:bg-background-800 rounded-full transition-colors shrink-0"
          title="Copy to clipboard"
        >
          {copied ? (
            <FaCheck size={16} className="text-accent-500" />
          ) : (
            <FaCopy size={16} className="text-foreground-400" />
          )}
        </Button>
      </div>
    </>
  );
}

export { HeroSection };
export { Showcase } from "./components/showcase";
export { SettingsPanel } from "./components/settings-panel";
export { LandingThemeToggle as ThemeToggle } from "./components/theme-toggle";
export { NodeSection } from "./components/node-section";
