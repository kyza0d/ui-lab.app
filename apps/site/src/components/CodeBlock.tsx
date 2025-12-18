'use client';

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { transformerRenderIndentGuides } from "@shikijs/transformers";
import { generateThemePalettes, type OklchColor, oklchToCss } from "@/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/lib/themes/syntax-colors";
import { useApp } from "@/lib/app-context";
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

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c] || c));

function generateFallbackHtml(code: string): string {
  return `<pre><code style="display: block; padding: 1rem;">${escapeHtml(code)}</code></pre>`;
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
  const { currentThemeMode, currentThemeColors } = useApp();
  const [highlightedCode, setHighlightedCode] = useState<string>(() => {
    if (currentThemeMode === "light" && preHighlightedLight) return preHighlightedLight;
    if (currentThemeMode === "dark" && preHighlightedDark) return preHighlightedDark;
    return generateFallbackHtml(children);
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
          transformers: [transformerRenderIndentGuides()],
        });
        let styledHtml = html.replace(
          /<code>/,
          '<code style="display: block; padding: 1rem;">'
        );
        styledHtml = styledHtml.replace(/background-color:\s*[^;]+;?/g, '');
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(generateFallbackHtml(children));
      }
    };

    highlight();
  }, [children, language, currentThemeMode, shikiTheme, preHighlightedLight, preHighlightedDark]);

  return (
    <div className="mt-8 mb-12 max-w-full overflow-hidden rounded-md border border-background-700 leading-snug">
      {(filename || heading) && (
        <div className="flex text-xs font-semibold items-center justify-between border-b border-background-700 bg-background-900 px-3 py-1.5 text-foreground-400">
          <span>{heading || filename}</span>
          {!heading && <span className="text-foreground-500">{language}</span>}
        </div>
      )}
      <div className="relative group bg-background-950 text-foreground-300">
        <CopyButton code={children} />
        <div
          className="overflow-x-auto [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:overflow-hidden [&_code]:text-foreground-300 [&_code]:whitespace-pre-wrap [&_code]:wrap-break-word"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
