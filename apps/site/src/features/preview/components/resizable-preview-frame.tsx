"use client";

import { usePreviewContext, type PreviewDeviceVariant } from "./preview-context";
import { ResizablePreview } from "./resizable-preview";

interface ResizablePreviewFrameProps {
  children: React.ReactNode;
  variant: PreviewDeviceVariant;
  className?: string;
}

export function ResizablePreviewFrame({ children, variant, className = "" }: ResizablePreviewFrameProps) {
  const { width, setWidth } = usePreviewContext();

  return (
    <ResizablePreview
      deviceVariant={variant}
      width={width}
      onWidthChange={setWidth}
      className={className}
    >
      {children}
    </ResizablePreview>
  );
}
