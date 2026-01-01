"use client";

import { useState, useRef, useEffect } from "react";
import { PreviewContext, PreviewContextType, PreviewActiveTab, PreviewDeviceVariant } from "./preview-context";
import { DEVICE_PRESETS, calculateVariantFromWidth } from "../lib/preview-device-utils";

interface PreviewProviderProps {
  children: React.ReactNode;
  initialVariant?: PreviewDeviceVariant;
}

export function PreviewProvider({ children, initialVariant = "desktop" }: PreviewProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<PreviewActiveTab>("preview");
  const [width, setWidth] = useState<number>(DEVICE_PRESETS[initialVariant]);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Always calculate display variant based on current width
  const displayVariant = calculateVariantFromWidth(width);

  // When user clicks a device button, set width to that device's preset
  const selectDevice = (device: PreviewDeviceVariant) => {
    const presetWidth = DEVICE_PRESETS[device];
    const constrainedWidth = Math.min(presetWidth, maxWidth);
    setWidth(constrainedWidth);
  };

  useEffect(() => {
    const updateMaxWidth = () => {
      if (containerRef.current?.parentElement) {
        const parentWidth = containerRef.current.parentElement.clientWidth;
        const constrainedMax = Math.floor(parentWidth * 0.80);
        setMaxWidth(constrainedMax);
        setWidth((prev) => Math.min(prev, constrainedMax));
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

  const value: PreviewContextType = {
    activeTab,
    setActiveTab,
    displayVariant,
    selectDevice,
    width,
    setWidth,
    maxWidth,
    showPromptModal,
    setShowPromptModal,
    highlightedCode,
    setHighlightedCode,
    copied,
    setCopied,
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
    </div>
  );
}
