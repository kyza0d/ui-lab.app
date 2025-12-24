"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaUser,
  FaRobot,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

interface AnimatedShowcaseProps {
  containerRef: RefObject<HTMLDivElement | null>;
  userChatRef: RefObject<HTMLDivElement | null>;
  aiChatRef: RefObject<HTMLDivElement | null>;
  mcpStatusRef: RefObject<HTMLDivElement | null>;
  uiContainerRef: RefObject<HTMLDivElement | null>;
  uiSidebarRef: RefObject<HTMLDivElement | null>;
  uiHeaderRef: RefObject<HTMLDivElement | null>;
  uiHeroRef: RefObject<HTMLDivElement | null>;
  uiChartRef: RefObject<HTMLDivElement | null>;
}

export function AnimatedShowcase({
  containerRef,
  userChatRef,
  aiChatRef,
  mcpStatusRef,
  uiContainerRef,
  uiSidebarRef,
  uiHeaderRef,
  uiHeroRef,
  uiChartRef,
}: AnimatedShowcaseProps) {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(
      [
        userChatRef.current,
        aiChatRef.current,
        mcpStatusRef.current,
        uiSidebarRef.current,
        uiHeaderRef.current,
        uiHeroRef.current,
        uiChartRef.current,
      ],
      { autoAlpha: 0, y: 20 }
    );
    gsap.set(uiContainerRef.current, { autoAlpha: 0, scale: 1.0 });

    tl.to(userChatRef.current, { autoAlpha: 1, y: -5, duration: 0.6, delay: 0.5 })
      .to(aiChatRef.current, { autoAlpha: 1, y: -5, duration: 0.6 }, "+=0.3")
      .to(mcpStatusRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "+=0.1")

      .to(
        uiContainerRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: -10,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.2"
      )
      .to(uiSidebarRef.current, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(uiHeaderRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(
        [uiHeroRef.current, uiChartRef.current],
        {
          autoAlpha: 1,
          y: -10,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }, { scope: containerRef });

  return (
    <div className="relative w-full max-h-190 h-[calc(100vh-16rem)] bg-background-950 overflow-hidden">
      <div className="h-[calc(100vh-16rem)] ">
        {/* MCP Status Indicator - Floating above the UI */}
        {/* Skewed UI Container */}
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 absolute perspective-1000">
          {/* The "Generated" Interface */}
          <div className="scale-170 transform-gpu">
            <div
              ref={uiContainerRef}
              className="bg-background-900  border-[1px] border-background-700 w-[600px] h-[400px] rounded-[12px] overflow-hidden grid grid-cols-[30px_1fr]"
            >
              {/* Mock Sidebar */}
              <div
                ref={uiSidebarRef}
                className="bg-background-800 border-r-[1px] border-background-700 h-full flex flex-col items-center py-4 gap-2"
              >
                <div className="w-4 h-4 bg-background-600/20 border-[1px] border-background-600/30" />
                <div className="w-full h-px bg-background-700 my-0.5" />
                <div className="w-4 h-4 rounded bg-background-700/50" />
                <div className="w-4 h-4 rounded bg-background-700/50" />
                <div className="w-4 h-4 rounded bg-background-700/50" />
              </div>

              {/* Mock Content Area */}
              <div className="flex flex-col h-full bg-background-950/80">
                {/* Mock Header */}
                <div
                  ref={uiHeaderRef}
                  className="h-8 border-b-[1px] border-background-700 flex items-center justify-between px-6"
                >
                  <div className="h-4 w-32 bg-background-700/50" />
                  <div className="flex gap-3">
                    <div className="h-4 w-20 bg-background-600/20 border-[1px] border-background-600/30" />
                    <div className="h-4 w-8 bg-background-700/50" />
                  </div>
                </div>

                {/* Mock Dashboard Body */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Hero Stats */}
                  <div ref={uiHeroRef} className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-30 bg-background-900 border-[1px] border-background-800 p-3"
                      >
                        <div className="h-8 w-8 mb-2 bg-background-800 grid place-items-center">
                          <FaLayerGroup size={12} className="text-foreground-600" />
                        </div>
                        <div className="h-2 w-12 bg-background-700/50 mb-2" />
                        <div className="h-4 w-20 bg-background-600/30" />
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div
                    ref={uiChartRef}
                    className="flex-1 py-15 bg-background-900 border-[1px] border-background-800 flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute bottom-4 left-4 right-4 h-20 flex items-end justify-between gap-2 px-4">
                      {[40, 70, 45, 90, 60, 80, 50, 95].map((h, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${h}%` }}
                          className="w-full rounded-t-[6px] bg-background-600/30"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface - Fixed Position relative to container */}
      <div className="z-30 flex flex-col gap-4 bottom-4 right-4 absolute">
        {/* User Message */}
        <div
          ref={userChatRef}
          className="flex items-start gap-3 p-3 pr-4 bg-background-900 border-[1px] border-background-700 rounded-[19px] rounded-tr-sm ml-auto"
        >
          <div className="max-w-[30ch] text-sm text-foreground-200 pt-1">
            Build a SAAS Dashboard for our SEO search tool, use UI Lab MCP to
            help
          </div>
          <div className="w-8 h-8 grid place-items-center bg-background-800 border-[1px] border-background-700 rounded-[10px] shrink-0">
            <FaUser size={12} className="text-foreground-400" />
          </div>
        </div>

        {/* Agent Message */}
        <div
          ref={aiChatRef}
          className="flex items-start gap-3 p-3 pr-4 bg-background-900 border-[1px] border-background-700 rounded-[19px] rounded-tl-sm ml-auto"
        >
          <div className="w-8 h-8 grid place-items-center bg-background-800 border-[1px] border-background-700 rounded-[10px] shrink-0">
            <FaRobot size={14} className="text-foreground-400" />
          </div>
          <div className="max-w-[30ch] text-sm text-foreground-200 pt-1">
            Got it! Calling the Component Agent to scaffold that for you now...
          </div>
        </div>
        <div
          ref={mcpStatusRef}
          className="z-20 flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-background-900 border-[2px] border-background-700 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-accent-500 opacity-75"></span>
            <span className="relative inline-flex rounded-md h-2 w-2 bg-accent-500"></span>
          </span>
          <code className="font-mono">Calling MCP: @ui-lab/scaffold-saas...</code>
        </div>

      </div>
    </div>
  );
}
