"use client";

import { useState, useEffect, useRef } from "react";
import { codeToHtml } from "shiki";
import { transformerRenderIndentGuides } from "@shikijs/transformers";
import { FaCheck, FaCopy } from "react-icons/fa6";
import {
  generateThemePalettes,
  generateShikiTheme,
  type ShikiTheme,
  generateSyntaxPalettes,
  useApp,
} from "@/features/theme";
import type { ElementFile } from "ui-lab-registry";

const MAX_HEIGHT_LINES = 32;
const LINE_HEIGHT_PX = 20;
const MAX_HEIGHT_PX = MAX_HEIGHT_LINES * LINE_HEIGHT_PX;

interface ElementFileViewerProps {
  file: ElementFile;
  onCopy: () => void;
  copied: boolean;
}

export function ElementFileViewer({
  file,
  onCopy,
  copied,
}: ElementFileViewerProps) {
  const { currentThemeMode, currentThemeColors } = useApp();
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isHighlighting, setIsHighlighting] = useState(true);

  const escapeHtml = (s: string) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[c] || c,
    );

  const generateFallbackHtml = (code: string): string => {
    return `<pre><code style="display: block; padding: 1rem;">${escapeHtml(code)}</code></pre>`;
  };

  useEffect(() => {
    const highlightCode = async () => {
      setIsHighlighting(true);
      try {
        let theme: string | ShikiTheme;

        if (currentThemeColors) {
          const palettes = generateThemePalettes(
            currentThemeColors.background,
            currentThemeColors.foreground,
            currentThemeColors.accent,
            currentThemeMode,
            0,
            currentThemeColors.semantic,
            currentThemeColors.accentChromaLimit ?? 0.3,
            currentThemeColors.accentEasing,
            currentThemeColors.accentChromaScaling,
          );
          const syntaxPalettes = generateSyntaxPalettes(
            currentThemeColors.background,
            currentThemeColors.accent,
            currentThemeMode,
            currentThemeColors.syntaxVariation ?? 0,
          );
          theme = generateShikiTheme(
            { ...palettes, ...syntaxPalettes },
            currentThemeMode,
            `custom-${currentThemeMode}`,
          );
        } else {
          theme = currentThemeMode === "light" ? "github-light" : "github-dark";
        }

        const html = await codeToHtml(file.code, {
          lang: file.language as any,
          theme,
          transformers: [transformerRenderIndentGuides()],
        });
        let styledHtml = html.replace(
          /<code>/,
          '<code style="display: block; padding: 1rem;">',
        );
        styledHtml = styledHtml.replace(/background-color:\s*[^;]+;?/g, "");
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(generateFallbackHtml(file.code));
      } finally {
        setIsHighlighting(false);
      }
    };

    highlightCode();
  }, [file.code, file.language, currentThemeMode, currentThemeColors]);

  return (
    <div className="relative bg-background-950">
      <button
        onClick={onCopy}
        className={`absolute right-4 top-4 p-2 rounded transition-colors z-10 ${copied ? "text-accent-500" : "text-foreground-400 hover:text-foreground-50"}`}
        title="Copy code"
      >
        {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
      </button>
      {isHighlighting ? (
        <div className="p-4 text-foreground-400 text-sm">
          Highlighting code...
        </div>
      ) : highlightedCode ? (
        <div
          className="text-sm [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:overflow-hidden [&_code]:text-foreground-300 [&_code]:whitespace-pre-wrap [&_code]:wrap-break-word"
          style={{
            maxHeight: `${MAX_HEIGHT_PX}px`,
            overflowX: 'auto',
            overflowY: 'auto',
          }}
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      ) : (
        <pre className="overflow-x-auto text-sm text-foreground-300 p-4 whitespace-pre-wrap break-words">
          {file.code}
        </pre>
      )}
    </div>
  );
}
