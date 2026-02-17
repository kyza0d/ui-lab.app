"use client";

import React, { useRef } from "react";
import { useAnimationTimeline } from "./hooks/useAnimationTimeline";
import { createColorBlendTimeline } from "./utils/create-color-blend-timeline";
import { injectStyles } from "./utils/inject-styles";
import { COLOR_BLEND_CSS } from "./constants/animation-styles";

export function GridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const createTimeline = () => {
    if (!containerRef.current) return null;

    const items = Array.from(
      containerRef.current.querySelectorAll(".grid-item")
    ) as HTMLElement[];

    return createColorBlendTimeline(items, {
      0: { width: "59%", opacity: 0.9 },
      1: { width: "140px", opacity: 0.9 },
      2: { width: "140px", opacity: 0.9 },
      3: { width: "57%", opacity: 0.9 },
    });
  };

  useAnimationTimeline({
    containerRef,
    createTimeline,
    onBeforeMount: () => injectStyles("grid-animation-styles", COLOR_BLEND_CSS),
  });

  return (
    <div ref={containerRef} className="w-[60%]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="grid-item w-full h-10 border-[2px] border-background-700 rounded bg-background-950" />
          <div className="grid-item w-16 h-10 border-[2px] border-background-700 rounded bg-background-950" />
        </div>
        <div className="flex gap-2">
          <div className="grid-item w-12 h-10 border-[2px] border-background-700 rounded bg-background-950" />
          <div className="grid-item w-full h-10 border-[2px] border-background-700 rounded bg-background-950" />
        </div>
      </div>
    </div>
  );
}
