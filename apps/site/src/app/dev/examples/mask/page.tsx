"use client";

import React, { useState, useRef, useCallback } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Mask, Scroll, Button } from "ui-lab-components";

function ReadMorePreview() {
  const [expanded, setExpanded] = useState(false);

  const excerpt =
    "Performance optimization in React goes beyond just memoization. Understanding render cycles, component composition patterns, and how the reconciliation algorithm works is crucial for building applications that scale. In this guide, we'll explore practical techniques that have helped teams reduce bundle sizes by 40% while improving Time to Interactive.";

  return (
    <div className="w-full max-w-md">
      <div style={{ maxHeight: expanded ? "400px" : "120px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.43, 0.13, 0.23, 0.96)" }}>
        <Mask style={{ height: "100%" }}>
          {!expanded && <Mask.Fade direction="bottom" intensity={1.5} fixed />}
          <p className="text-foreground-300 leading-relaxed">
            {excerpt}
          </p>
        </Mask>
      </div>

      <Button
        size="sm"
        onPress={() => setExpanded(!expanded)}
      >
        {expanded ? "Read Less" : "Read More"} →
      </Button>
    </div>
  );
}

function HierarchyGradientPreview() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <Mask.Gradient gradient="linear-gradient(to right, var(--accent-50), var(--accent-500))">
        <h2 className="text-4xl font-bold leading-tight">
          Elevate Your Design System
        </h2>
      </Mask.Gradient>
    </div>
  );
}

const ASCII_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-=[]{}|;:,.<>?/~";
const ASCII_ROWS = 16;
const ASCII_COLS = 52;

function generateGrid() {
  return Array.from({ length: ASCII_ROWS }, () =>
    Array.from({ length: ASCII_COLS }, () =>
      ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
    ).join("")
  ).join("\n");
}

function AsciiRevealPreview() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState(generateGrid);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setGrid(generateGrid());
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-lg aspect-video rounded-lg overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      <Mask.Gradient
        gradient={`radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--accent-500) 5%, var(--background-950) 45%, var(--background-950) 90%)`}
      >
        <pre className="w-full h-full flex items-center justify-center text-[11px] leading-[1.15] select-none whitespace-pre overflow-hidden m-0 p-2">
          {grid}
        </pre>
      </Mask.Gradient>
    </div>
  );
}

function EdgeFadePreview() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    desc: "Item description",
  }));

  return (
    <div className="w-full max-w-md" style={{ height: "256px", overflow: "hidden" }}>
      <Mask style={{ height: "100%" }}>
        <Mask.Fade direction="top" intensity={0.6} />
        <Mask.Fade direction="bottom" intensity={0.8} />
        <Scroll maxHeight="100%">
          <ul className="space-y-2 p-4">
            {items.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-foreground-50">{item.title}</p>
                <p className="text-xs text-foreground-300">{item.desc}</p>
              </li>
            ))}
          </ul>
        </Scroll>
      </Mask>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "read-more",
    title: "Read More / Text Truncation",
    description:
      "Display content excerpts with a smooth fade that hints more text exists below. Perfect for blog cards, description fields, and preview sections.",
    code: `<div style={{ maxHeight: expanded ? "400px" : "120px", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
  <Mask style={{ height: "100%" }}>
    <Mask.Fade direction="bottom" intensity={1.5} fixed />
    <p className="text-foreground-300">Long text content...</p>
  </Mask>
</div>

<Button
  size="sm"
  onPress={() => setExpanded(!expanded)}
>
  {expanded ? "Read Less" : "Read More"} →
</Button>`,
    preview: <ReadMorePreview />,
    previewLayout: "center",
  },
  {
    id: "hierarchy-gradient",
    title: "Text Hierarchy with Color Gradient",
    description:
      "Create visual emphasis in headlines and feature descriptions using semantic color gradients that guide the viewer's eye.",
    code: `<Mask.Gradient gradient="linear-gradient(to right, var(--foreground-400), var(--accent-500))">
  <h2 className="text-4xl font-bold">
    Elevate Your Design System
  </h2>
</Mask.Gradient>`,
    preview: <HierarchyGradientPreview />,
    previewLayout: "center",
  },
  {
    id: "ascii-reveal",
    title: "ASCII Cursor Reveal",
    description:
      "Shuffling ASCII box-drawing characters with a radial gradient spotlight as their background via Mask.Gradient and background-clip: text. The cursor controls where the glow appears.",
    code: `const [pos, setPos] = useState({ x: 50, y: 50 });
const [grid, setGrid] = useState(generateGrid);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  setGrid(generateGrid());
};

<div onMouseMove={handleMouseMove} className="w-full aspect-video cursor-crosshair">
  <Mask.Gradient
    gradient={\`radial-gradient(circle at \${pos.x}% \${pos.y}%, var(--accent-400), var(--accent-600) 10%, var(--foreground-400) 35%)\`}
  >
    <pre className="text-[11px] leading-[1.15] select-none whitespace-pre">
      {grid}
    </pre>
  </Mask.Gradient>
</div>`,
    preview: <AsciiRevealPreview />,
    previewLayout: "center",
  },
  {
    id: "edge-fade",
    title: "Card / Content Edge Fade",
    description:
      "Add subtle fades to card edges to elegantly indicate scrollable content. Maintains a clean, minimalist design without harsh borders.",
    code: `<div style={{ height: "256px", overflow: "hidden" }}>
  <Mask style={{ height: "100%" }}>
    <Mask.Fade direction="top" intensity={0.6} />
    <Mask.Fade direction="bottom" intensity={0.8} />
    <Scroll maxHeight="100%">
      <ul className="space-y-2 p-4">
        {items.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </Scroll>
  </Mask>
</div>`,
    preview: <EdgeFadePreview />,
    previewLayout: "center",
  },
];

export default function MaskExamplesPage() {
  return (
    <DevExampleLayout
      title="Mask Examples"
      description="Practical web design patterns using the Mask component. From elegant text truncation to sophisticated image reveals, these examples solve real UI challenges developers face daily."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
