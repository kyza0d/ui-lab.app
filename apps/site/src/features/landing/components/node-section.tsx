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
        showBorderX && "border-x border-background-700",
        className
      )}
    >
      {showNodes && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px border-background-700 bg-background-700"
            aria-hidden="true"
          />
          <div
            className="absolute top-[-7px] -left-px w-[16px] h-[16px] rounded-[5px] border border-background-700 bg-background-950 -translate-x-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute top-[-7px] -right-px w-[17px] h-[16px] rounded-[5px] border border-background-700 bg-background-950 translate-x-1/2"
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </div>
  );
}
