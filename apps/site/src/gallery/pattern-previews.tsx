"use client";

import React from "react";

export const patternPreviews: Record<string, React.ComponentType<object>> = {
  "media-object": () => (
    <div className="flex flex-col gap-3 p-4 w-full">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex gap-3 items-start">
          <div style={{ width: 36, height: 36 }} className="bg-background-800 border border-background-700 rounded-lg flex-shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div style={{ height: 7, width: `${[70, 55, 80][i]}%` }} className="bg-background-700 rounded" />
            <div style={{ height: 5 }} className="bg-background-800 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  ),

  "split-row": () => (
    <div className="flex flex-col w-full p-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-background-800">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div style={{ height: 6, width: `${[68, 80, 55][i]}%` }} className="bg-background-700 rounded" />
            <div style={{ height: 4, width: "45%" }} className="bg-background-800 rounded" />
          </div>
          <div style={{ width: 44, height: 18 }} className="bg-accent-900 border border-accent-700 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  ),

  "stat-block": () => (
    <div className="flex gap-6 p-5 w-full items-start">
      {[["48", "Active Users", true], ["1.2k", "Requests", false], ["99%", "Uptime", false]].map(([val, label, hasTrend], i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div style={{ height: 28, width: `${[40, 48, 36][i]}px` }} className="bg-background-600 rounded" />
          <div style={{ height: 5, width: `${[56, 48, 40][i]}px` }} className="bg-background-800 rounded" />
          {hasTrend && <div style={{ height: 4, width: 64 }} className="bg-accent-900 rounded" />}
        </div>
      ))}
    </div>
  ),

  "labeled-field": () => (
    <div className="flex flex-col gap-4 p-4 w-full">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div style={{ height: 5, width: `${[52, 72, 60][i]}px` }} className="bg-background-700 rounded" />
          <div style={{ height: 30 }} className="bg-background-900 border border-background-700 rounded w-full" />
          {i === 1 && <div style={{ height: 4, width: 120 }} className="bg-background-800 rounded" />}
        </div>
      ))}
    </div>
  ),

  "search-input": () => (
    <div className="flex flex-col gap-3 p-4 w-full">
      <div className="flex items-center gap-2 h-8 bg-background-900 border border-background-700 rounded px-3">
        <div style={{ width: 12, height: 12 }} className="bg-background-700 rounded-full flex-shrink-0" />
        <div style={{ height: 5 }} className="bg-background-800 rounded flex-1" />
      </div>
      <div className="flex items-center justify-between h-8 bg-background-900 border border-background-700 rounded px-3">
        <div className="flex items-center gap-2 flex-1">
          <div style={{ width: 12, height: 12 }} className="bg-background-700 rounded-full flex-shrink-0" />
          <div style={{ height: 5, width: "50%" }} className="bg-background-800 rounded" />
        </div>
        <div style={{ width: 28, height: 16 }} className="bg-background-800 border border-background-700 rounded" />
      </div>
      <div className="flex items-center gap-2 h-8 bg-background-900 border border-transparent rounded px-3">
        <div style={{ width: 12, height: 12 }} className="bg-background-700 rounded-full flex-shrink-0" />
        <div style={{ height: 5, width: "40%" }} className="bg-background-800 rounded" />
      </div>
    </div>
  ),

  "toggle-setting-row": () => (
    <div className="flex flex-col w-full p-3">
      {[true, false, false].map((on, i) => (
        <div key={i} className="flex items-start justify-between gap-3 py-2.5 border-b border-background-800">
          <div className="flex flex-col gap-1.5">
            <div style={{ height: 6, width: `${[80, 100, 64][i]}px` }} className="bg-background-700 rounded" />
            <div style={{ height: 4, width: `${[120, 96, 80][i]}px` }} className="bg-background-800 rounded" />
          </div>
          <div style={{ width: 28, height: 16 }} className={`rounded-full flex-shrink-0 ${on ? "bg-accent-700" : "bg-background-700"}`} />
        </div>
      ))}
    </div>
  ),

  "select-row": () => (
    <div className="flex flex-col w-full p-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-background-800">
          <div className="flex flex-col gap-1.5 flex-1">
            <div style={{ height: 6, width: `${[80, 64, 96][i]}px` }} className="bg-background-700 rounded" />
            {i !== 1 && <div style={{ height: 4, width: 100 }} className="bg-background-800 rounded" />}
          </div>
          <div style={{ width: 72, height: 26 }} className="bg-background-900 border border-background-700 rounded flex-shrink-0" />
        </div>
      ))}
    </div>
  ),

  "badge-row": () => (
    <div className="flex flex-col gap-3 p-4 w-full">
      <div className="flex flex-wrap gap-1.5">
        {[48, 56, 40, 64, 36].map((w, i) => (
          <div key={i} style={{ width: w, height: 20 }} className="bg-background-800 border border-background-700 rounded-full" />
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[[44, "bg-accent-900 border-accent-700"], [60, "bg-background-800 border-background-700"], [40, "bg-background-800 border-background-700"], [52, "bg-background-700 border-background-600"]].map(([w, cls], i) => (
          <div key={i} style={{ width: w as number, height: 20 }} className={`${cls} border rounded-full`} />
        ))}
      </div>
    </div>
  ),

  "progress-metric": () => (
    <div className="flex flex-col gap-3 p-4 w-full">
      {[[70, "w-28"], [45, "w-24"], [85, "w-32"]].map(([pct, labelCls], i) => (
        <div key={i} className="flex items-center gap-3">
          <div style={{ height: 5 }} className={`${labelCls} bg-background-700 rounded flex-shrink-0`} />
          <div className="flex-1 h-1.5 bg-background-800 rounded-full overflow-hidden">
            <div style={{ width: `${pct}%` }} className="h-full bg-accent-700 rounded-full" />
          </div>
          <div style={{ width: 24, height: 5 }} className="bg-background-700 rounded flex-shrink-0" />
        </div>
      ))}
    </div>
  ),

  "data-table-row": () => (
    <div className="flex flex-col w-full">
      {[["bg-accent-900 border-accent-800", 65], ["bg-background-700 border-background-600", 80], ["bg-background-800 border-background-700", 50]].map(([badgeCls, w], i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 border-b border-background-800">
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <div style={{ height: 6, width: `${w}%` }} className="bg-background-700 rounded" />
            <div style={{ height: 4, width: "40%" }} className="bg-background-800 rounded" />
          </div>
          <div style={{ width: 44, height: 5 }} className="bg-background-800 rounded flex-shrink-0" />
          <div style={{ width: 40, height: 18 }} className={`${badgeCls} border rounded-full flex-shrink-0`} />
        </div>
      ))}
    </div>
  ),

  "button-group-pattern": () => (
    <div className="flex flex-col gap-4 p-4 w-full items-start">
      <div className="flex">
        {["Bold", "Italic", "Under"].map((_, i) => (
          <div key={i} style={{ height: 28, width: 44 }} className={`flex items-center justify-center bg-background-900 border-y border-r border-background-700 ${i === 0 ? "border-l rounded-l-md" : ""} ${i === 2 ? "rounded-r-md" : ""}`}>
            <div style={{ width: 24, height: 5 }} className="bg-background-700 rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {[36, 36, 1, 36, 36].map((w, i) => (
          i === 2
            ? <div key={i} style={{ width: 1, height: 20 }} className="bg-background-700 mx-0.5" />
            : <div key={i} style={{ width: w, height: 28 }} className="bg-background-900 border border-background-700 rounded-md" />
        ))}
      </div>
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ height: 28, width: 36 }} className={`flex items-center justify-center bg-background-900 border-y border-r border-background-700 ${i === 0 ? "border-l rounded-l-md" : ""} ${i === 2 ? "rounded-r-md" : ""}`}>
            <div style={{ width: 14, height: 14 }} className="bg-background-700 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  ),

  "icon-action-bar": () => (
    <div className="flex flex-col w-full p-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-background-800">
          <div className="flex flex-col gap-1.5 flex-1">
            <div style={{ height: 6, width: `${[72, 85, 60][i]}%` }} className="bg-background-700 rounded" />
            <div style={{ height: 4, width: "40%" }} className="bg-background-800 rounded" />
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {[0, 1, 2].map((j) => (
              <div key={j} style={{ width: 26, height: 26 }} className="bg-background-800 border border-background-700 rounded flex items-center justify-center">
                <div style={{ width: 10, height: 10 }} className="bg-background-600 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),

  "tab-content-header": () => (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-background-800">
        <div className="flex flex-col gap-2">
          <div style={{ height: 8, width: 100 }} className="bg-background-700 rounded" />
          <div style={{ height: 5, width: 140 }} className="bg-background-800 rounded" />
        </div>
        <div style={{ width: 52, height: 26 }} className="bg-background-900 border border-background-700 rounded flex-shrink-0" />
      </div>
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-background-800">
        <div style={{ height: 8, width: 80 }} className="bg-background-700 rounded" />
        <div style={{ width: 44, height: 26 }} className="bg-background-900 border border-background-700 rounded flex-shrink-0" />
      </div>
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-background-800">
        <div className="flex items-center gap-2">
          <div style={{ height: 8, width: 72 }} className="bg-background-700 rounded" />
          <div style={{ width: 22, height: 18 }} className="bg-background-800 border border-background-700 rounded" />
        </div>
        <div style={{ width: 52, height: 26 }} className="bg-background-900 border border-background-700 rounded flex-shrink-0" />
      </div>
    </div>
  ),

  "inline-alert": () => (
    <div className="flex flex-col gap-2 p-4 w-full">
      {[
        ["bg-background-800", "border-background-600", "bg-accent-800"],
        ["bg-background-800", "border-background-600", "bg-background-600"],
        ["bg-background-900", "border-background-700", "bg-background-700"],
      ].map(([bg, border, iconBg], i) => (
        <div key={i} className={`flex gap-2.5 px-3 py-2.5 rounded-lg border ${bg} ${border}`}>
          <div style={{ width: 14, height: 14 }} className={`${iconBg} rounded-full flex-shrink-0 mt-0.5`} />
          <div className="flex flex-col gap-1.5 flex-1">
            <div style={{ height: 6 }} className="bg-background-700 rounded w-3/4" />
            <div style={{ height: 4 }} className="bg-background-800 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  ),

  "empty-state-pattern": () => (
    <div className="flex flex-col items-center justify-center gap-4 p-4 h-full w-full text-center">
      <div style={{ width: 44, height: 44 }} className="bg-background-800 border border-background-700 rounded-full" />
      <div className="flex flex-col gap-2 items-center">
        <div style={{ height: 7, width: 100 }} className="bg-background-700 rounded" />
        <div style={{ height: 5, width: 140 }} className="bg-background-800 rounded" />
      </div>
      <div style={{ width: 80, height: 28 }} className="bg-background-900 border border-background-700 rounded" />
    </div>
  ),
};
