"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/features/theme";
import { generateFullThemeConfig } from "@/shared";
import { CodeBlock } from "@/shared/components/code-block";

export default function ConfigPage() {
  const {
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    radius,
    borderWidth,
    spacingScale,
  } = useApp();

  const [generatedConfig, setGeneratedConfig] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentThemeColors) {
      setIsLoading(true);
      return;
    }

    const config = generateFullThemeConfig(
      currentThemeColors,
      currentThemeMode,
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      bodyFontWeightScale,
      radius,
      borderWidth,
      spacingScale
    );

    setGeneratedConfig(config);
    setIsLoading(false);
  }, [
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    radius,
    borderWidth,
    spacingScale,
  ]);

  return (
    <div className="h-300 relative">
      <div>
        {isLoading ? (
          <div className="rounded-[12px] border-[2px] border-background-700 bg-background-900 p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-foreground-400">Loading configuration...</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl absolute left-1/2 -translate-x-1/2 top-(--header-height) p-6">
            <CodeBlock
              language="css"
              filename="global.css"
            >
              {generatedConfig}
            </CodeBlock>
          </div>
        )}
      </div>
    </div>
  );
}
