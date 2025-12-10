'use client';

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { generateThemePalettes, generateShikiTheme, type OklchColor, type ShikiTheme } from "@/lib/color-utils";
import { useHeader } from "@/lib/header-context";
import { CopyButton } from "./CopyButton";

function useThemeMode() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    if (currentTheme) {
      setThemeMode(currentTheme);
    }

    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
      if (newTheme) {
        setThemeMode(newTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return { themeMode, isClient };
}

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  heading?: string;
  backgroundColor?: OklchColor;
  foregroundColor?: OklchColor;
  accentColor?: OklchColor;
  accentChromaLimit?: number;
  preHighlightedLight?: string;
  preHighlightedDark?: string;
}

export function CodeBlock({
  children,
  language = "ts",
  filename,
  heading,
  preHighlightedLight,
  preHighlightedDark
}: CodeBlockProps) {
  const { currentThemeMode, currentThemeColors } = useHeader();
  const [highlightedCode, setHighlightedCode] = useState<string>(() => {
    if (currentThemeMode === "light" && preHighlightedLight) return preHighlightedLight;
    if (currentThemeMode === "dark" && preHighlightedDark) return preHighlightedDark;
    return `<pre><code style="display: block; padding: 1rem;">${children}</code></pre>`;
  });
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
      const customTheme = generateShikiTheme(palettes, currentThemeMode, `custom-${currentThemeMode}`);
      setShikiTheme(customTheme);
    }
  }, [currentThemeColors, currentThemeMode]);

  useEffect(() => {
    if (preHighlightedLight || preHighlightedDark) {
      const preHighlighted = currentThemeMode === "light" ? preHighlightedLight : preHighlightedDark;
      if (preHighlighted) {
        setHighlightedCode(preHighlighted);
        return;
      }
    }

    const highlight = async () => {
      try {
        const theme = shikiTheme || (currentThemeMode === "light" ? "github-light" : "github-dark");
        const html = await codeToHtml(children, {
          lang: language as any,
          theme,
        });
        const styledHtml = html.replace(
          /<code>/,
          '<code style="display: block; padding: 1rem;">'
        );
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code style="display: block; padding: 1rem;">${children}</code></pre>`);
      }
    };

    highlight();
  }, [children, language, currentThemeMode, shikiTheme, preHighlightedLight, preHighlightedDark]);

  return (
    <div className="my-8 overflow-hidden rounded border border-foreground-800 leading-snug">
      {(filename || heading) && (
        <div className="flex text-xs font-semibold items-center justify-between border-b border-foreground-800 bg-background-900 px-3 py-1.5 text-foreground-400">
          <span>{heading || filename}</span>
          {!heading && <span className="text-foreground-500">{language}</span>}
        </div>
      )}
      <div className="relative group">
        <CopyButton code={children} />
        <div
          className="overflow-x-auto [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_code]:text-foreground-100"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
