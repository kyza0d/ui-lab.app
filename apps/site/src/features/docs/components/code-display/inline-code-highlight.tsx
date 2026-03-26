'use client';

import { useEffect, useMemo, useState, useRef } from "react";
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
  const [highlightedCode, setHighlightedCode] = useState("");
  const htmlRef = useRef<HTMLElement>(null);

  const shikiTheme = useMemo<ShikiTheme | null>(() => {
    if (!currentThemeColors) return null;

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

    return generateShikiTheme(
      { ...palettes, ...syntaxPalettes },
      currentThemeMode,
      `custom-${currentThemeMode}`
    );
  }, [currentThemeColors, currentThemeMode]);

  useEffect(() => {
    const highlight = async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const theme = shikiTheme || (currentThemeMode === "light" ? "github-light" : "github-dark");
        const html = await codeToHtml(code, {
          lang: language,
          theme,
        });
        const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        const innerHtml = codeMatch ? codeMatch[1] : code;
        setHighlightedCode(innerHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(code);
      }
    };

    highlight();
  }, [code, language, currentThemeMode, shikiTheme]);

  useEffect(() => {
    if (htmlRef.current) {
      htmlRef.current.innerHTML = highlightedCode || code;
    }
  }, [highlightedCode, code]);

  return (
    <code
      ref={htmlRef}
      className={`font-mono text-xs ${className}`}
    />
  );
}
