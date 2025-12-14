'use client';

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useHeader } from "@/lib/header-context";

interface InlineCodeHighlightProps {
  code: string;
  language?: string;
  className?: string;
}

export function InlineCodeHighlight({
  code,
  language = "typescript",
  className = ""
}: InlineCodeHighlightProps) {
  const { currentThemeMode } = useHeader();
  const [highlightedCode, setHighlightedCode] = useState<string>(code);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        const theme = currentThemeMode === "light" ? "github-light" : "github-dark";
        const html = await codeToHtml(code, {
          lang: language as any,
          theme,
        });
        const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        const innerHtml = codeMatch ? codeMatch[1] : code;
        setHighlightedCode(innerHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(code);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language, currentThemeMode]);

  return (
    <code
      className={`font-mono text-xs ${className}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
