"use client";

import { ReactNode } from "react";
import { FaExpand } from "react-icons/fa6";
import { Button } from "ui-lab-components";
import { CodeBlock } from "@/features/docs/components/code-display/code-block";
import { PreviewContainer } from "./resizable-preview-container";
import { useExternalWindow } from "@/features/preview/hooks/use-external-window";

interface PreviewCodeDisplayProps {
  code: string;
  language?: string;
  previewContent: ReactNode;
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  displayVariant: "mobile" | "tablet" | "desktop";
  onDeviceVariantChange: (variant: "mobile" | "tablet" | "desktop") => void;
  width: number;
  onWidthChange: (width: number) => void;
  previewClassName?: string;
  categoryId?: string;
  exampleId?: string;
  prompt?: string;
  onPromptClick?: () => void;
}

export function PreviewCodeDisplay({
  code,
  language = "typescript",
  previewContent,
  activeTab,
  onTabChange,
  displayVariant,
  onDeviceVariantChange,
  width,
  onWidthChange,
  previewClassName,
  categoryId,
  exampleId,
  prompt,
  onPromptClick,
}: PreviewCodeDisplayProps) {
  const { openWindow } = useExternalWindow();

  const handleOpenWindow = () => {
    if (categoryId && exampleId) {
      openWindow({
        categoryId,
        exampleId,
        width: 1200,
        height: 900,
      });
    }
  };

  return (
    <PreviewContainer
      deviceVariant={displayVariant}
      width={width}
      onWidthChange={onWidthChange}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onDeviceVariantChange={onDeviceVariantChange}
      prompt={prompt}
      onPromptClick={onPromptClick}
      rightContent={
        categoryId && exampleId ? (
          <Button variant="outline" size="sm" onClick={handleOpenWindow}>
            <FaExpand size={14} />
          </Button>
        ) : undefined
      }
      previewClassName={previewClassName}
    >
      {activeTab === "preview" ? previewContent :
        <CodeBlock className="border-0" language={language}>{code}</CodeBlock>}
    </PreviewContainer>
  );
}
