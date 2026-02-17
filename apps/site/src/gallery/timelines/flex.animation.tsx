"use client";

import React, { useRef } from "react";
import { useAnimationTimeline } from "./hooks/useAnimationTimeline";
import { createColorBlendTimeline } from "./utils/create-color-blend-timeline";
import { injectStyles } from "./utils/inject-styles";
import { FLEX_BLEND_CSS } from "./constants/animation-styles";

export function FlexAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const createTimeline = () => {
    if (!containerRef.current) return null;

    const items = Array.from(
      containerRef.current.querySelectorAll(".flex-item")
    ) as HTMLElement[];

    return createColorBlendTimeline(items, {
      0: { width: "80px", opacity: 0.9 },
      1: { width: "120px", opacity: 0.9 },
      2: { width: "80px", opacity: 0.9 },
    });
  };

  useAnimationTimeline({
    containerRef,
    createTimeline,
    onBeforeMount: () => injectStyles("flex-animation-styles", FLEX_BLEND_CSS),
  });

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div className="flex gap-2 overflow-hidden" style={{ width: "256px" }}>
        <div className="flex-item w-14 h-10 border-[2px] border-background-700 rounded bg-background-950" />
        <div className="flex-item w-50 h-10 border-[2px] border-background-700 rounded bg-background-950" />
        <div className="flex-item w-14 h-10 border-[2px] border-background-700 rounded bg-background-950" style={{ marginLeft: "auto" }} />
      </div>
    </div>
  );
}
