"use client";

import Link from "next/link";
import { cn } from "@/shared";
import { Divider } from "ui-lab-components";
import { FaWrench } from "react-icons/fa6";
import { toolsItems } from "./data";

interface ToolsDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ToolsDropdown({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: ToolsDropdownProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 z-50 bg-background-800",
        "overflow-hidden flex rounded-xl",
        "w-96"
      )}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full px-2 pb-2">
        <div className="grid gap-0 grid-cols-1">
          <div className="flex flex-col">
            <span className="flex text-sm items-center h-13 px-3 text-foreground-50">
              <FaWrench className="mr-3" /> Utilities
            </span>
            <Divider variant="dashed" className="mt-0 mb-2" />
            <div className="flex flex-col space-y-1 mt-2">
              {toolsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "rounded-lg p-1",
                      "text-foreground-300 hover:bg-background-700",
                      "flex items-center gap-3 group"
                    )}
                  >
                    <div className="group-hover:bg-background-600 w-10 h-10 rounded-lg bg-background-800/50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-foreground-100" />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground-50 text-sm">
                        {item.title}
                      </div>
                      <div className="text-sm text-foreground-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
