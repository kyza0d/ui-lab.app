"use client";

import React from "react";
import { Frame } from "@/components/experimental";
import { ComponentDetail } from "@/types/component";

/**
 * A "Bracket" style path that only renders the corners.
 * Demonstrates non-contiguous paths.
 */
const buildBracketPath = (w: number, h: number) => {
  const s = 30; // length of bracket arm
  return `
    M 0,${s} V 0 H ${s}
    M ${w - s},0 H ${w} V ${s}
    M ${w},${h - s} V ${h} H ${w - s}
    M ${s},${h} H 0 V ${h - s}
  `;
};

/**
 * An aggressive "Blade" geometry with deep chamfers and a side-notch.
 */
const buildBladePath = (w: number, h: number) => {
  const c = 32; // chamfer size
  const notchH = 40;
  return `
    M ${c},0 
    H ${w} 
    V ${h - c} 
    L ${w - c},${h} 
    H ${c * 2} 
    L 0,${h - c * 2} 
    V ${h / 2 + notchH / 2} 
    L ${c / 2},${h / 2} 
    L 0,${h / 2 - notchH / 2} 
    V ${c} 
    Z
  `;
};

/**
 * A smooth "Organic/Liquid" path using Quadratic Bezier curves.
 */
const buildLiquidPath = (w: number, h: number) => {
  const r = 40;
  return `
    M 0,${r} 
    Q 0,0 ${r},0 
    H ${w - r} 
    Q ${w},0 ${w},${r} 
    V ${h - r * 1.5} 
    Q ${w},${h} ${w - r * 2},${h} 
    H ${r} 
    Q 0,${h} 0,${h - r} 
    Z
  `;
};

/**
 * An "Industrial Plate" with inner cutouts and bolt-hole aesthetics.
 */
const buildIndustrialPath = (w: number, h: number) => {
  const s = 15;
  return `
    M 0,0 H ${w} V ${h} H 0 Z
    M ${s},${s} L ${s * 2},${s} L ${s},${s * 2} Z
    M ${w - s},${s} L ${w - s * 2},${s} L ${w - s},${s * 2} Z
    M ${w - s},${h - s} L ${w - s * 2},${h - s} L ${w - s},${h - s * 2} Z
    M ${s},${h - s} L ${s * 2},${h - s} L ${s},${h - s * 2} Z
  `;
};

/* -------------------------------------------------------------------------- */
/* Component Detail                            */
/* -------------------------------------------------------------------------- */

export const frameDetail: ComponentDetail = {
  id: "frame",
  name: "Frame",
  description: "Advanced SVG-based container strategy for non-rectangular UI patterns.",

  overview: (
    <div className="space-y-4 text-zinc-400">
      <p>
        The <strong>Frame</strong> component bypasses the limitations of standard CSS borders. By using
        dynamic SVG path generation tied to a <code>ResizeObserver</code>, it allows for:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
        <li><strong>Non-contiguous borders:</strong> Strokes that don't need to connect.</li>
        <li><strong>Complex Chamfers:</strong> Multi-angled corners and "tech-style" notches.</li>
        <li><strong>Inner Cutouts:</strong> Negative space within the frame boundary.</li>
        <li><strong>Bezier Geometry:</strong> Smooth, non-circular organic curves.</li>
      </ul>
    </div>
  ),

  examples: [
    {
      id: "biometric-bracket",
      title: "Biometric Scanner",
      description: "A minimal, non-contiguous frame perfect for HUD overlays and target tracking.",
      preview: (
        <div className="w-full max-w-sm p-8 flex justify-center items-center">
          <Frame
            pathBuilder={buildBracketPath}
            variant="accent"
            padding="large"
            className="bg-cyan-500/[0.03] border-cyan-400"
          >
            <div className="relative flex flex-col items-center gap-4 py-6">
              <div className="w-24 h-24 rounded-full border border-cyan-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" />
                <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-cyan-400 font-mono text-sm tracking-widest">USER_IDENTIFIED</h4>
                <p className="text-[10px] text-cyan-400/50 font-mono mt-1 italic leading-tight">
                  MATCH PROBABILITY: 99.4%<br />
                  ORIGIN: SECTOR_7G
                </p>
              </div>
            </div>
          </Frame>
        </div>
      ),
    },
    {
      id: "tactical-blade",
      title: "The Blade Terminal",
      description: "Aggressive asymmetric geometry with integrated side-notch status indicators.",
      preview: (
        <div className="w-full max-w-md p-6">
          <Frame
            pathBuilder={buildBladePath}
            variant="default"
            padding="none"
            className="bg-zinc-950 shadow-[0_0_40px_rgba(0,0,0,0.5)] border-zinc-700"
          >
            <div className="flex h-48">
              {/* Sidebar Notch Area */}
              <div className="w-10 bg-zinc-900/50 flex flex-col items-center justify-center gap-4 border-r border-zinc-800">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>

              <div className="flex-1 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <span className="text-4xl font-black italic">B-01</span>
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Primary_Subsystem</h3>
                <div className="space-y-3">
                  <div className="h-1 w-full bg-zinc-800">
                    <div className="h-full bg-white w-3/4" />
                  </div>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed">
                    Neural engine synchronization at 75%. All thermal dampeners active.
                    Ready for deployment in Sector Beta.
                  </p>
                  <button className="px-4 py-1.5 border border-zinc-700 hover:bg-white hover:text-black transition-colors text-[10px] font-bold">
                    EXEC_INIT
                  </button>
                </div>
              </div>
            </div>
          </Frame>
        </div>
      ),
    },
    {
      id: "liquid-node",
      title: "Liquid Interface",
      description: "Utilizes Bezier curves for a more premium, high-end consumer hardware aesthetic.",
      preview: (
        <div className="w-full max-w-xs p-6">
          <Frame
            pathBuilder={buildLiquidPath}
            variant="subtle"
            padding="large"
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border-white/20"
          >
            <div className="text-center py-4">
              <span className="text-[10px] font-bold text-indigo-300/80 uppercase tracking-[0.3em]">Smart Hub</span>
              <div className="my-4">
                <span className="text-5xl font-light tracking-tighter text-white">24°</span>
              </div>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-1 w-4 rounded-full ${i < 4 ? 'bg-indigo-400' : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="mt-4 text-[11px] text-white/40">Air quality: Excellent</p>
            </div>
          </Frame>
        </div>
      ),
    },
    {
      id: "industrial-plate",
      title: "Industrial Chassis",
      description: "Demonstrates internal cutouts (sub-paths) to simulate mechanical details and bolts.",
      preview: (
        <div className="w-full max-w-md p-6">
          <Frame
            pathBuilder={buildIndustrialPath}
            variant="default"
            padding="medium"
            className="bg-zinc-900 border-zinc-700 shadow-inner"
          >
            <div className="grid grid-cols-3 gap-4 py-4">
              {[
                { label: "PWR", val: "ON", color: "text-emerald-500" },
                { label: "TMP", val: "38°", color: "text-orange-500" },
                { label: "RPM", val: "1200", color: "text-white" }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 p-3 border border-zinc-800 rounded flex flex-col items-center">
                  <span className="text-[8px] font-bold text-zinc-500 mb-1">{stat.label}</span>
                  <span className={`text-sm font-mono font-bold ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
              <div className="col-span-3 h-12 bg-black/20 border border-zinc-800 rounded flex items-center px-4 overflow-hidden">
                <div className="w-full h-1 bg-zinc-800 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500/40 translate-x-[-20%] animate-pulse" />
                </div>
              </div>
            </div>
          </Frame>
        </div>
      ),
    },
  ],
};
