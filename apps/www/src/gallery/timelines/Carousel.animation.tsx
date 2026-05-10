"use client";

import { Mask } from "ui-lab-components";
import config from "./config.json";

const Card = ({ active }: { active?: boolean }) => (
  <div
    className="flex-shrink-0 w-[112px] rounded-[8px] border flex flex-col gap-1.5 p-2"
    style={{
      borderColor: `color-mix(in srgb, currentColor ${active ? config.dim.strokeOpacity * 100 : config.dim.strokeOpacity * 50}%, transparent)`,
      backgroundColor: `color-mix(in srgb, currentColor ${active ? config.dim.fillOpacity * 200 : config.dim.fillOpacity * 100}%, transparent)`,
    }}
  >
    <div
      className="w-full h-[44px] rounded-[5px]"
      style={{ opacity: active ? 0.12 : 0.06, background: "currentColor" }}
    />
    <div className="flex flex-col gap-1">
      <div className="h-[4px] rounded-full w-[70%]" style={{ opacity: active ? 0.35 : 0.18, background: "currentColor" }} />
      <div className="h-[3px] rounded-full w-[50%]" style={{ opacity: active ? 0.2 : 0.1, background: "currentColor" }} />
    </div>
  </div>
);

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <polyline
      points={dir === "left" ? "10,3 5,8 10,13" : "6,3 11,8 6,13"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={config.dim.class}
      opacity={config.dim.strokeOpacity * 1.5}
    />
  </svg>
);

export function CarouselAnimation() {
  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row items-center gap-1.5">
          <Chevron dir="left" />
          {/* Constrained width so outer cards overflow into the fade zone */}
          <Mask className="w-[200px] overflow-hidden">
            <Mask.Fade direction="left" intensity={1.5} />
            <Mask.Fade direction="right" intensity={1.5} />
            <div className="flex flex-row gap-2 items-center justify-center">
              <Card />
              <Card active />
              <Card />
            </div>
          </Mask>
          <Chevron dir="right" />
        </div>
        <div className="flex flex-row items-center gap-1.5">
          {[-1, 0, 1].map((d) => (
            <div
              key={d}
              className="rounded-full"
              style={{
                width: d === 0 ? 6 : 4,
                height: d === 0 ? 6 : 4,
                opacity: d === 0 ? 0.45 : 0.2,
                background: "currentColor",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
