'use client';

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useApp } from "@/features/theme/lib/app-context";

interface EnumUnionHighlightProps {
  values: string[];
  className?: string;
}

export function EnumUnionHighlight({
  values,
  className = ""
}: EnumUnionHighlightProps) {
  const { currentThemeMode } = useApp();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        const unionType = values.map(v => `"${v}"`).join(" | ");
        const theme = currentThemeMode === "light" ? "github-light" : "github-dark";
        const html = await codeToHtml(unionType, {
          lang: "typescript",
          theme,
        });
        const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        const innerHtml = codeMatch ? codeMatch[1] : unionType;
        setHighlightedCode(innerHtml);
      } catch (error) {
        console.error("Failed to highlight enum union:", error);
        const unionType = values.map(v => `"${v}"`).join(" | ");
        setHighlightedCode(unionType);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [values, currentThemeMode]);

  return (
    <span
      className={`font-mono text-xs inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
