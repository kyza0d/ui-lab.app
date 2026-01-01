'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { codeToHtml } from "shiki";
import { transformerRenderIndentGuides } from "@shikijs/transformers";
import { generateThemePalettes, type OklchColor } from "@/features/theme/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/features/theme/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/features/theme/lib/themes/syntax-colors";
import { useApp } from "@/features/theme/lib/app-context";
import { CopyButton } from "./copy-button";
import { FaSort } from "react-icons/fa6";
import { cn } from "../lib/utils";

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c] || c));

function generateFallbackHtml(code: string): string {
  return `<pre><code style="display: block; padding: 1rem">${escapeHtml(code)}</code></pre>`;
}

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  filename?: string;
  heading?: string;
  backgroundColor?: OklchColor;
  foregroundColor?: OklchColor;
  accentColor?: OklchColor;
  accentChromaLimit?: number;
  preHighlightedLight?: string;
  preHighlightedDark?: string;
}

const MAX_HEIGHT_LINES = 20;

export function CodeBlock({
  children,
  language = "ts",
  className,
  filename,
  heading,
  preHighlightedLight,
  preHighlightedDark
}: CodeBlockProps) {
  const { currentThemeMode, currentThemeColors } = useApp();

  // Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const [highlightedCode, setHighlightedCode] = useState<string>(() => {
    if (currentThemeMode === "light" && preHighlightedLight) return preHighlightedLight;
    if (currentThemeMode === "dark" && preHighlightedDark) return preHighlightedDark;
    return generateFallbackHtml(children);
  });

  const [shikiTheme, setShikiTheme] = useState<ShikiTheme | null>(null);
  const [contentScrollWidth, setContentScrollWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalCodeLines, setTotalCodeLines] = useState(0);

  // -- Scroll Sync Logic --

  // 1. Track -> Viewport
  const handleScrollTrack = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      viewportRef.current.scrollLeft = scrollTrackRef.current.scrollLeft;
    }
  }, []);

  // 2. Viewport -> Track (e.g. during selection drag)
  // Even though overflow-x is hidden, scrollLeft can change via selection or JS
  const handleScrollViewport = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      const diff = Math.abs(scrollTrackRef.current.scrollLeft - viewportRef.current.scrollLeft);
      if (diff > 1) {
        scrollTrackRef.current.scrollLeft = viewportRef.current.scrollLeft;
      }
    }
  }, []);

  // 3. Wheel Event (Restores Trackpad Horizontal Swipe)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // If there is significant horizontal delta, we manually scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (viewportRef.current) {
        viewportRef.current.scrollLeft += e.deltaX;
        // Prevent browser back/forward navigation gestures
        e.preventDefault();
      }
    }
  }, []);

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

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        setContentScrollWidth(viewportRef.current.scrollWidth);
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [highlightedCode]);

  useEffect(() => {
    const lines = children.split('\n').length;
    setTotalCodeLines(lines);
  }, [children]);

  const hasHorizontalOverflow = contentScrollWidth > viewportWidth;
  const hiddenCodeLines = totalCodeLines - MAX_HEIGHT_LINES;
  const shouldShowExpandButton = totalCodeLines > MAX_HEIGHT_LINES;

  return (
    <div className={cn("w-full h-210 rounded-md border border-background-700 bg-background-950 flex flex-col overflow-hidden", className)}>
      {(filename || heading) && (
        <div className="flex-none flex text-sm font-semibold items-center justify-between border-b border-background-700 px-3 py-1.5 text-foreground-400">
          <span>{heading || filename}</span>
          {!heading && <span className="text-foreground-500">{language}</span>}
        </div>
      )}

      <div className="relative group flex-1 min-h-0 flex flex-col">
        <CopyButton code={children} />
        <div
          ref={viewportRef}
          onScroll={handleScrollViewport}
          onWheel={handleWheel}
          className={`
            w-full overflow-y-auto overflow-x-hidden
            [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:w-fit [&_pre]:min-w-full 
            [&_code]:text-foreground-300 [&_code]:whitespace-pre
            
            /* Custom Vertical Scrollbar Styling */
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-background-700
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-background-600
          `}
          style={{
            overflowY: isExpanded ? 'auto' : 'hidden',
            maskImage: !isExpanded && shouldShowExpandButton ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' : 'none',
            WebkitMaskImage: !isExpanded && shouldShowExpandButton ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' : 'none',
          }}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />

        {hasHorizontalOverflow && (
          <div
            ref={scrollTrackRef}
            onScroll={handleScrollTrack}
            className="flex-none w-full overflow-x-auto bg-background-950/50 backdrop-blur-sm"
          >
            <div style={{ width: contentScrollWidth, height: '12px' }} />
          </div>
        )}

        {shouldShowExpandButton && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full px-4 flex items-center py-2 hover:bg-background-800 text-foreground-300 text-sm font-medium transition-colors border-t border-background-700"
          >
            <FaSort className="text-foreground-400 inline mr-3" /> Show {hiddenCodeLines} more lines
          </button>
        )}
      </div>
    </div>
  );
}
