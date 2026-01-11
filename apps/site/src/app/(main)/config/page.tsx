"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/features/theme";
import { generateFullThemeConfig } from "@/shared";
import { CodeDisplay } from "@/features/docs";

export default function ConfigPage() {
  const {
    currentThemeColors,
    currentThemeMode,
    typeSizeRatio,
    fontSizeScale,
    fontWeightScale,
    radius,
    borderWidth,
    spacingScale,
  } = useApp();

  const [generatedConfig, setGeneratedConfig] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Generate config whenever any design value changes
  useEffect(() => {
    if (!currentThemeColors) {
      setIsLoading(true);
      return;
    }

    const config = generateFullThemeConfig(
      currentThemeColors,
      currentThemeMode,
      typeSizeRatio,
      fontSizeScale,
      fontWeightScale,
      radius,
      borderWidth,
      spacingScale
    );

    setGeneratedConfig(config);
    setIsLoading(false);
  }, [
    currentThemeColors,
    currentThemeMode,
    typeSizeRatio,
    fontSizeScale,
    fontWeightScale,
    radius,
    borderWidth,
    spacingScale,
  ]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-8 py-12">
        {/* Configuration Display */}
        {isLoading ? (
          <div className="rounded-[12px] border-[2px] border-background-700 bg-background-900 p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-foreground-400">Loading configuration...</p>
          </div>
        ) : (
          <CodeDisplay
            code={generatedConfig}
            language="css"
            fileName="global.css"
            showCopyButton={true}
          />
        )}
      </div>
    </div>
  );
}
