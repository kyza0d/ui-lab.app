"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Button, Group } from "ui-lab-components";
import { FaMobile, FaDesktop, FaFile } from "react-icons/fa6";

interface ResizablePreviewContainerProps {
  children: ReactNode;
  deviceVariant?: "mobile" | "desktop";
  width: number;
  onWidthChange: (width: number) => void;
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  onDeviceVariantChange: (variant: "mobile" | "desktop") => void;
  prompt?: string;
  onPromptClick?: () => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
  showWidthLabel?: boolean;
  previewClassName?: string;
}

export function ResizablePreviewContainer({
  children,
  deviceVariant = "desktop",
  width,
  onWidthChange,
  activeTab,
  onTabChange,
  onDeviceVariantChange,
  prompt,
  onPromptClick,
  leftContent,
  rightContent,
  className = "",
  showWidthLabel = true,
  previewClassName = "",
}: ResizablePreviewContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const isDragging = useRef(false);
  const [maxWidth, setMaxWidth] = useState(1200);

  const minWidth = deviceVariant === "mobile" ? 375 : 640;

  const widthRef = useRef(width);
  const onWidthChangeRef = useRef(onWidthChange);

  useEffect(() => {
    widthRef.current = width;
    onWidthChangeRef.current = onWidthChange;
  }, [width, onWidthChange]);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (wrapperRef.current?.parentElement) {
        const parentWidth = wrapperRef.current.parentElement.clientWidth;
        const constrainedMax = Math.floor(parentWidth * 0.95);
        setMaxWidth(Math.max(constrainedMax, minWidth + 100));
        
        // Use refs to avoid dependency loop
        if (widthRef.current > constrainedMax) {
          onWidthChangeRef.current(Math.min(widthRef.current, constrainedMax));
        }
      }
    };

    // Initial check
    updateMaxWidth();

    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, [minWidth]); // Removed width and onWidthChange from dependencies

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !wrapperRef.current) return;

      const parentRect = wrapperRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const parentLeft = parentRect.left;
      const currentXRelativeToParent = e.clientX - parentLeft;
      const delta = currentXRelativeToParent - startXRef.current;
      const newWidth = startWidthRef.current + delta;
      const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
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
  }, [minWidth, maxWidth, onWidthChange]);

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

  const renderPreviewContent = () => (
    <div className="flex flex-col items-center w-full py-4">
      <div ref={wrapperRef} className="relative" style={{ width }}>
        <div
          className={`relative bg-background-950 border-[2px] border-background-700 rounded-[12px] overflow-auto ${previewClassName}`}
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

  return (
    <div className={`flex flex-col h-full bg-background-900/50 overflow-hidden ${className}`}>
      <div className="flex border-b border-background-700 h-16 items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {leftContent}
          <div className="flex gap-2">
            <Button
              onClick={() => onTabChange("preview")}
              variant={activeTab === "preview" ? "primary" : "outline"}
              size="sm"
            >
              Preview
            </Button>
            <Button
              onClick={() => onTabChange("code")}
              variant={activeTab === "code" ? "primary" : "outline"}
              size="sm"
            >
              Code
            </Button>
          </div>
          {prompt && (
            <Button
              className="gap-2"
              variant="outline"
              onClick={onPromptClick}
            >
              <FaFile size={14} />
              Prompt
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Group variant="outline" spacing="tight">
            <Group.Button
              variant={deviceVariant === "mobile" ? "primary" : "ghost"}
              onClick={() => onDeviceVariantChange("mobile")}
            >
              <FaMobile size={14} />
            </Group.Button>
            <Group.Button
              variant={deviceVariant === "desktop" ? "primary" : "ghost"}
              onClick={() => onDeviceVariantChange("desktop")}
            >
              <FaDesktop size={14} />
            </Group.Button>
          </Group>
          {rightContent}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background-950 p-[12px]">
        {activeTab === "preview" ? renderPreviewContent() : children}
      </div>
    </div>
  );
}
