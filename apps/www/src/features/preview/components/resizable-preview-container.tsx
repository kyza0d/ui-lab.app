"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/shared";
import { Badge, Group, Tabs } from "ui-lab-components";
import { FaMobile, FaDesktop, FaTablet, FaFile } from "react-icons/fa6";

type PreviewDeviceVariant = "mobile" | "tablet" | "desktop";

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
  showCodeTab?: boolean;
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
  showCodeTab = true,
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

  const startDrag = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <div className="flex w-full flex-col items-center">
      <div
        ref={wrapperRef}
        className="relative max-w-full shrink-0 border-x border-background-700/40"
        style={{ width }}
      >
        {showWidthLabel && (
          <Badge
            size="sm"
            variant="secondary"
            className="pointer-events-none absolute top-3 right-3 z-999"
          >
            {Math.round(width)}px
          </Badge>
        )}
        <div
          className={cn("relative w-full overflow-auto", previewClassName)}
        >
          <div className="w-full h-full">{children}</div>
        </div>
        <button
          type="button"
          onMouseDown={startDrag}
          className="absolute -right-[3px] top-1/2 w-6 h-12 bg-background-900 border border-background-700 rounded-xs flex items-center justify-center cursor-ew-resize hover:bg-background-600 hover:border-background-500 transition-colors z-20"
          style={{ transform: "translate(50%, -50%)" }}
          title="Drag to resize"
          aria-label="Drag to resize preview"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="w-3 h-[2px] bg-background-500" />
            <div className="w-3 h-[2px] my-[2px] bg-background-500" />
            <div className="w-3 h-[2px] bg-background-500" />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`px-[12px] pt-[18px] flex flex-col h-full overflow-hidden ${className}`}>
      <div className="flex items-end justify-between shrink-0">
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
          {showCodeTab && (
            <Tabs variant="underline" value={activeTab} onValueChange={(value) => onTabChange(value as "preview" | "code")}>
              <Tabs.List>
                <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                <Tabs.Trigger value="code">Code</Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          )}
        </div>

        <div className="flex items-center gap-3 mb-2">
          <Group spacing="xs" className="[&_.button]:w-8  [&_.button]:px-0">
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

      <div className="border border-background-700 rounded-sm">
        {activeTab === "preview" ? renderPreviewContent() : children}
      </div>
    </div>
  );
}
