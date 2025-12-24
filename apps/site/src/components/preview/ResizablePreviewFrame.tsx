"use client";

import { usePreviewContext, PreviewVariant } from "./PreviewContext";
import { ResizablePreview } from "../ResizablePreview";

interface ResizablePreviewFrameProps {
  children: React.ReactNode;
  variant: PreviewVariant;
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
