"use client";

import { useState, useRef, useEffect } from "react";
import { PreviewContext, PreviewContextType, PreviewActiveTab, PreviewVariant } from "./PreviewContext";

interface PreviewProviderProps {
  children: React.ReactNode;
  initialVariant?: PreviewVariant;
}

export function PreviewProvider({ children, initialVariant = "desktop" }: PreviewProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<PreviewActiveTab>("preview");
  const [variant, setVariant] = useState<PreviewVariant>(initialVariant);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [width, setWidth] = useState<number>(initialVariant === "mobile" ? 375 : 1000);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const minWidth = variant === "mobile" ? 375 : 640;

  useEffect(() => {
    const updateMaxWidth = () => {
      if (containerRef.current?.parentElement) {
        const parentWidth = containerRef.current.parentElement.clientWidth;
        const constrainedMax = Math.floor(parentWidth * 0.80);
        setMaxWidth(constrainedMax);
        setWidth(prev => Math.min(prev, constrainedMax));
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

  useEffect(() => {
    const defaultWidth = variant === "mobile" ? 375 : 1000;
    setWidth(prev => {
      const newWidth = Math.min(defaultWidth, maxWidth);
      return Math.max(newWidth, minWidth);
    });
  }, [variant, maxWidth, minWidth]);

  const value: PreviewContextType = {
    activeTab,
    setActiveTab,
    variant,
    setVariant,
    showPromptModal,
    setShowPromptModal,
    width,
    setWidth,
    maxWidth,
    minWidth,
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
