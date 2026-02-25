'use client';

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { generateThemePalettes } from "@/features/theme/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/features/theme/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/features/theme/lib/themes/syntax-colors";
import { useApp } from "@/features/theme/lib/app-context";

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
  const { currentThemeMode, currentThemeColors } = useApp();
  const [highlightedCode, setHighlightedCode] = useState<string>(code);
  const [isLoading, setIsLoading] = useState(true);
  const [shikiTheme, setShikiTheme] = useState<ShikiTheme | null>(null);

  useEffect(() => {
    if (currentThemeColors) {
      const palettes = generateThemePalettes(
        currentThemeColors.background,
        currentThemeColors.foreground,
        currentThemeColors.accent,
        currentThemeMode,
        0,
        currentThemeColors.semantic,
        currentThemeColors.accentChromaLimit ?? 0.30,
        currentThemeColors.accentEasing,
        currentThemeColors.accentChromaScaling
      );
      const syntaxPalettes = generateSyntaxPalettes(
        currentThemeColors.background,
        currentThemeColors.accent,
        currentThemeMode,
        currentThemeColors.syntaxVariation ?? 0
      );
      const customTheme = generateShikiTheme(
        { ...palettes, ...syntaxPalettes },
        currentThemeMode,
        `custom-${currentThemeMode}`
      );
      setShikiTheme(customTheme);
    }
  }, [currentThemeColors, currentThemeMode]);

  useEffect(() => {
    const highlight = async () => {
      try {
        const theme = shikiTheme || (currentThemeMode === "light" ? "github-light" : "github-dark");
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
  }, [code, language, currentThemeMode, shikiTheme]);

  return (
    <code
      className={`font-mono text-xs ${className}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
