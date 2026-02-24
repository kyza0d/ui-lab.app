"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Group, Tabs, TabsList, TabsTrigger } from "ui-lab-components";
import { FaMobile, FaDesktop, FaTablet, FaFile } from "react-icons/fa6";

export type PreviewDeviceVariant = "mobile" | "tablet" | "desktop";

interface ResizablePreviewContainerProps {
  children: ReactNode;
  deviceVariant?: PreviewDeviceVariant;
  width: number;
  onWidthChange: (width: number) => void;
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  onDeviceVariantChange: (variant: PreviewDeviceVariant) => void;
  prompt?: string;
  onPromptClick?: () => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
  showWidthLabel?: boolean;
  previewClassName?: string;
}

export function PreviewContainer({
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
        setMaxWidth(parentWidth);

        if (widthRef.current > parentWidth) {
          onWidthChangeRef.current(Math.min(widthRef.current, parentWidth));
        }
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

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

  const renderPreviewContent = () => (
    <div className="flex flex-col items-center w-full">
      <div ref={wrapperRef} className="relative max-w-full" style={{ width }}>
        <div
          className={`relative overflow-auto ${previewClassName}`}
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
      {showWidthLabel && <div className="text-xs text-foreground-400 font-mono mt-3">{Math.round(width)}px</div>}
    </div>
  );

  return (
    <div className={`px-[12px] pt-[18px] flex flex-col h-full overflow-hidden ${className}`}>
      <div className="flex items-end justify-between flex-shrink-0">
        <div className="flex items-center gap-3 px-5">
          {leftContent}
          {prompt && (
            <button
              className="flex cursor-pointer items-center gap-2 text-sm! text-foreground-100!"
              onClick={onPromptClick}
            >
              <FaFile className="text-foreground-300" size={12} />
              Prompt
            </button>
          )}
          <Tabs variant="underline" value={activeTab} onValueChange={(value) => onTabChange(value as "preview" | "code")}>
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <Group variant="outline" spacing="none">
            <Group.Button
              variant={deviceVariant === "mobile" ? "secondary" : "ghost"}
              onClick={() => onDeviceVariantChange("mobile")}
              title="Mobile (375px)"
            >
              <FaMobile size={13} />
            </Group.Button>
            <Group.Button
              variant={deviceVariant === "tablet" ? "secondary" : "ghost"}
              onClick={() => onDeviceVariantChange("tablet")}
              title="Tablet (800px)"
            >
              <FaTablet size={13} />
            </Group.Button>
            <Group.Button
              variant={deviceVariant === "desktop" ? "secondary" : "ghost"}
              onClick={() => onDeviceVariantChange("desktop")}
              title="Desktop (1024px)"
            >
              <FaDesktop size={13} />
            </Group.Button>
          </Group>
          {rightContent}
        </div>
      </div>

      <div className="border border-background-700 rounded-md">
        {activeTab === "preview" ? renderPreviewContent() : children}
      </div>
    </div>
  );
}
