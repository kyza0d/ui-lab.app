"use client";

import { cn } from "@/shared/lib/utils";

interface NodeSectionProps {
  children: React.ReactNode;
  className?: string;
  showNodes?: boolean;
  showBorderX?: boolean;
}

export function NodeSection({
  children,
  className,
  showNodes = true,
  showBorderX = true,
}: NodeSectionProps) {
  return (
    <div
      className={cn(
        "relative",
        showBorderX && "border-x-[2px] border-background-700",
        className
      )}
    >
      {showNodes && (
        <>
          <div
            className="absolute top-[-8px] left-0 w-[16px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 -translate-x-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute top-[-8px] right-0 w-[17px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 translate-x-1/2"
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </div>
  );
}
