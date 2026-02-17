"use client";

import React from "react";

export const elementPreviews: Record<string, React.ComponentType<object>> = {
  header: () => (
    <div className="flex flex-col gap-2 w-full">
      <div style={{ height: 36 }} className="w-full gap-3 flex px-2 bg-background-900 items-center justify-between border border-background-700 rounded-sm">
        <div style={{ width: 32, height: 20 }} className="bg-background-700 rounded-sm" />
        <div className="flex gap-2">
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
        </div>
      </div>
    </div>
  ),

  page: () => (
    <div className="flex flex-col gap-1 w-full h-full">
      <div style={{ height: 28 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div style={{ height: 24 }} className="w-full flex gap-2 px-2">
        <div style={{ width: 80, height: 16 }} className="bg-background-900 border border-background-700 rounded-sm" />
        <div style={{ flex: 1, height: 16 }} className="bg-background-900 border border-background-700 rounded-sm opacity-70" />
      </div>
      <div style={{ flex: 1 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div style={{ height: 20 }} className="w-full bg-background-900 border border-background-700 rounded-sm opacity-60" />
    </div>
  ),

  sidebar: () => (
    <div className="flex flex-col gap-2 w-full h-full p-2 bg-background-950 border border-background-700 rounded-sm">
      <div style={{ height: 32 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div className="flex flex-col gap-1">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-3/4 bg-background-700 rounded-sm opacity-60" />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-5/6 bg-background-700 rounded-sm opacity-60" />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-4/5 bg-background-700 rounded-sm opacity-60" />
      </div>
    </div>
  ),

  toc: () => (
    <div className="flex flex-col gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <div className="space-y-2 text-xs">
        <div className="font-semibold text-foreground-200 mb-2">Contents</div>
        <div className="text-foreground-400">• Introduction</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Overview</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Getting Started</div>
        <div className="text-foreground-400">• Installation</div>
        <div className="text-foreground-400">• Usage</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Basic</div>
      </div>
    </div>
  ),

  nextarticle: () => (
    <div className="flex items-center justify-between w-full h-full p-4 bg-background-900 rounded-sm border border-background-700 cursor-pointer hover:bg-background-800 transition-colors">
      <div className="flex-1">
        <div className="text-xs text-foreground-400 mb-1">Next Article</div>
        <div className="text-sm font-medium text-foreground-200">Advanced Setup Guide</div>
      </div>
      <div className="text-foreground-500">→</div>
    </div>
  ),

  copypage: () => (
    <div className="flex items-center justify-center w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <button className="px-3 py-2 bg-accent-500 text-foreground-50 text-xs font-medium rounded hover:bg-accent-600 transition-colors flex items-center gap-2">
        <span>📋</span>
        Copy
      </button>
    </div>
  ),

  carousel: () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* Carousel placeholder preview */}
      </div>
    </div>
  ),

  timeline: () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* Timeline placeholder preview */}
      </div>
    </div>
  ),

  rating: () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* Rating placeholder preview */}
      </div>
    </div>
  ),

  "tree-view": () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* TreeView placeholder preview */}
      </div>
    </div>
  ),

  aichatinput: () => (
    <div className="flex items-center gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <input
        type="text"
        placeholder="Ask AI..."
        className="flex-1 bg-background-800 border border-background-700 rounded px-2 py-1 text-xs text-foreground-400 placeholder-foreground-500"
        readOnly
      />
      <button className="px-2 py-1 bg-accent-500 text-foreground-50 rounded text-xs font-medium hover:bg-accent-600">
        →
      </button>
    </div>
  ),

  chainofthought: () => (
    <div className="flex flex-col gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <span className="text-accent-500 font-bold">1.</span>
          <div className="text-foreground-400">Analyzing the problem</div>
        </div>
        <div className="flex items-start gap-2 ml-2 text-foreground-500">
          <span>→</span>
          <div>Breaking down requirements</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-accent-500 font-bold">2.</span>
          <div className="text-foreground-400">Evaluating options</div>
        </div>
      </div>
    </div>
  ),

  chat: () => (
    <div className="flex flex-col h-full w-full bg-background-900 rounded-sm border border-background-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-3 p-3">
        <div className="flex justify-start">
          <div className="bg-background-700 rounded px-3 py-2 max-w-xs text-xs text-foreground-400">
            Hello, how can I help?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-accent-500 rounded px-3 py-2 max-w-xs text-xs text-foreground-50">
            I need some assistance
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-background-700 rounded px-3 py-2 max-w-xs text-xs text-foreground-400">
            I'm here to help!
          </div>
        </div>
      </div>
      <div className="border-t border-background-700 p-2 bg-background-800">
        <div className="h-6 bg-background-700 rounded text-xs flex items-center px-2 text-foreground-500">
          Type a message...
        </div>
      </div>
    </div>
  ),
};
