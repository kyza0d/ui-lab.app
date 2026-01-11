"use client";

import { useEffect, useRef, useState } from "react";
import { PreviewDeviceVariant } from "../lib/preview-device-utils";

interface ResizablePreviewProps {
  children: React.ReactNode;
  deviceVariant?: PreviewDeviceVariant;
  width: number;
  onWidthChange: (width: number) => void;
  className?: string;
  showWidthLabel?: boolean;
}

export function ResizablePreview({
  children,
  deviceVariant = "desktop",
  width,
  onWidthChange,
  className = "",
  showWidthLabel = true,
}: ResizablePreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const isDragging = useRef(false);
  const [maxWidth, setMaxWidth] = useState(1200);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (wrapperRef.current?.parentElement) {
        const parentWidth = wrapperRef.current.parentElement.clientWidth;
        setMaxWidth(parentWidth);
        if (width > parentWidth) {
          onWidthChange(parentWidth);
        }
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, [width, onWidthChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !wrapperRef.current) return;

      const parentRect = wrapperRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const parentLeft = parentRect.left;
      const currentXRelativeToParent = e.clientX - parentLeft;
      const delta = currentXRelativeToParent - startXRef.current;
      const newWidth = startWidthRef.current + delta;
      const clampedWidth = Math.max(300, Math.min(newWidth, maxWidth));
      onWidthChange(clampedWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [maxWidth, onWidthChange]);

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    const parentRect = wrapperRef.current?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    const parentLeft = parentRect.left;
    startXRef.current = e.clientX - parentLeft;
    startWidthRef.current = width;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="flex flex-col items-center w-full py-4">
      <div ref={wrapperRef} className="relative" style={{ width }}>
        <div
          className={`relative bg-background-950 border-[2px] border-background-700 rounded-[12px] overflow-auto ${className}`}
        >
          <div className="w-full h-full">{children}</div>
        </div>
        <div
          onMouseDown={startDrag}
          className="absolute right-0 top-1/2 w-6 h-12 bg-background-700 border border-background-600 rounded-full flex items-center justify-center cursor-ew-resize hover:bg-background-600 hover:border-background-500 transition-colors z-20"
          style={{ transform: "translate(50%, -50%)" }}
          title="Drag to resize"
        >
          <div className="flex flex-col gap-0.5">
            <div className="w-1 h-1 bg-background-400 rounded-full" />
            <div className="w-1 h-1 bg-background-400 rounded-full" />
            <div className="w-1 h-1 bg-background-400 rounded-full" />
          </div>
        </div>
      </div>
      {showWidthLabel && <div className="text-xs text-foreground-500 font-mono mt-3">{Math.round(width)}px</div>}
    </div>
  );
}
