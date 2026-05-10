'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { generateThemePalettes, type OklchColor } from "@/features/theme/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/features/theme/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/features/theme/lib/themes/syntax-colors";
import { useApp } from "@/features/theme/lib/app-context";
import { resolveShikiLanguage } from "@/features/docs/lib/shiki-language";
import { CopyButton } from "./copy-button";
import { FaSort } from "react-icons/fa6";
import { LuChevronsDownUp } from "react-icons/lu";
import { cn } from "@/shared";
import { Button } from "ui-lab-components";

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c] || c));

function renderFallbackLine(line: string): string {
  if (line.length === 0) return " ";

  const leadingWhitespace = line.match(/^[\t ]+/)?.[0] ?? "";
  const content = line.slice(leadingWhitespace.length);

  let indentMarkup = "";
  let pendingSpaces = 0;

  for (const char of leadingWhitespace) {
    if (char === "\t") {
      if (pendingSpaces > 0) {
        indentMarkup += " ".repeat(pendingSpaces);
        pendingSpaces = 0;
      }
      indentMarkup += '<span class="indent">\t</span>';
      continue;
    }

    pendingSpaces += 1;
    if (pendingSpaces === 2) {
      indentMarkup += '<span class="indent">  </span>';
      pendingSpaces = 0;
    }
  }

  if (pendingSpaces > 0) {
    indentMarkup += " ".repeat(pendingSpaces);
  }

  const escapedContent = escapeHtml(content);
  return `${indentMarkup}${escapedContent || " "}`;
}

function generateFallbackHtml(code: string): string {
  const lines = code.split("\n");
  const lineMarkup = lines
    .map((line) => `<span class="line">${renderFallbackLine(line)}</span>`)
    .join("\n");

  return `<pre class="shiki"><code style="display: block; padding: 1rem;">${lineMarkup}</code></pre>`;
}

function stripSyntaxColorStyles(html: string): string {
  return html
    .replace(/background-color:\s*[^;"]+;?/g, "")
    .replace(/(?<!-)color:\s*[^;"]+;?/g, "");
}

function stripPreTabIndex(html: string): string {
  return html.replace(/<pre([^>]*)\s+tabindex="[^"]*"([^>]*)>/gi, "<pre$1$2>");
}

interface CodeProps {
  children: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  filename?: string;
  heading?: string;
  backgroundColor?: OklchColor;
  foregroundColor?: OklchColor;
  accentColor?: OklchColor;
  accentChromaLimit?: number;
  preHighlightedLight?: string;
  preHighlightedDark?: string;
}

const MAX_HEIGHT_LINES = 15;
type CodeToHtmlOptions = any;

export function Code({
  children,
  language = "ts",
  className,
  showLineNumbers = false,
  filename,
  heading,
  preHighlightedLight,
  preHighlightedDark
}: CodeProps) {
  const { currentThemeMode, currentThemeColors, isThemeInitialized } = useApp();

  // Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const [highlightedCode, setHighlightedCode] = useState<string>(() => {
    if (currentThemeMode === "light" && preHighlightedLight) return preHighlightedLight;
    if (currentThemeMode === "dark" && preHighlightedDark) return preHighlightedDark;
    return generateFallbackHtml(children);
  });

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
  const [dimensions, setDimensions] = useState({ contentScrollWidth: 0, viewportWidth: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const fallbackHtml = useMemo(() => generateFallbackHtml(children), [children]);
  const totalCodeLines = children.split('\n').length;
  const preferredHighlighted = currentThemeMode === "light" ? preHighlightedLight : preHighlightedDark;
  const themedHtml = preferredHighlighted ?? highlightedCode;
  const hasResolvedSyntax = isThemeInitialized && themedHtml !== fallbackHtml;
  const normalizedHtml = useMemo(() => stripPreTabIndex(themedHtml), [themedHtml]);
  const displayHtml = hasResolvedSyntax ? normalizedHtml : stripSyntaxColorStyles(normalizedHtml);

  const handleScrollTrack = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      viewportRef.current.scrollLeft = scrollTrackRef.current.scrollLeft;
    }
  }, []);

  const handleScrollViewport = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      const diff = Math.abs(scrollTrackRef.current.scrollLeft - viewportRef.current.scrollLeft);
      if (diff > 1) {
        scrollTrackRef.current.scrollLeft = viewportRef.current.scrollLeft;
      }
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (viewportRef.current) {
        viewportRef.current.scrollLeft += e.deltaX;
        e.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (preferredHighlighted) return;

    const highlight = async () => {
      try {
        const { bundledLanguages, bundledLanguagesAlias, codeToHtml } = await import("shiki");
        const { transformerRenderIndentGuides } = await import("@shikijs/transformers");

        const theme = shikiTheme || (currentThemeMode === "light" ? "github-light" : "github-dark");
        const html = await codeToHtml(children, {
          lang: resolveShikiLanguage(language, bundledLanguages, bundledLanguagesAlias) as CodeToHtmlOptions["lang"],
          theme,
          transformers: [transformerRenderIndentGuides()],
        });

        let styledHtml = html.replace(
          /<code>/,
          '<code style="display: block; padding: 1rem;">'
        );
        styledHtml = styledHtml.replace(/background-color:\s*[^;]+;?/g, '');
        styledHtml = stripPreTabIndex(styledHtml);
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(generateFallbackHtml(children));
      }
    };

    highlight();
  }, [children, language, currentThemeMode, preferredHighlighted, shikiTheme]);

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        setDimensions({
          contentScrollWidth: viewportRef.current.scrollWidth,
          viewportWidth: viewportRef.current.clientWidth,
        });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [displayHtml]);

  const hasHorizontalOverflow = dimensions.contentScrollWidth > dimensions.viewportWidth;
  const hiddenCodeLines = totalCodeLines - MAX_HEIGHT_LINES;
  const expanded = isExpanded;
  const shouldShowExpandButton = totalCodeLines > MAX_HEIGHT_LINES;

  return (
    <div
      className={cn(
        "rounded-sm border border-background-700 flex flex-col overflow-hidden w-full min-w-0",
        showLineNumbers && "code-block--line-numbers",
        className
      )}
    >
      {(filename || heading) && (
        <div className="flex-none bg-background-900/90 flex text-xs font-medium items-center justify-between border-b border-background-700 py-1.5 px-3 text-foreground-400">
          <span>{heading || filename}</span>
          {!heading && <span className="text-foreground-400">{language}</span>}
        </div>
      )}

      <div className="relative group flex-1 min-h-0 flex flex-col">
        {expanded && shouldShowExpandButton && (
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            size="icon"
            className="absolute right-11 top-2 p-1"
          >
            <LuChevronsDownUp size={14} />
          </Button>
        )}
        <CopyButton code={children} />
        <div
          ref={viewportRef}
          onScroll={handleScrollViewport}
          onWheel={handleWheel}
          dangerouslySetInnerHTML={{ __html: displayHtml }}
          className={cn(`
              overflow-y-auto overflow-x-hidden
              [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:w-fit
              [&_code]:text-foreground-400 [&_code]:whitespace-pre

              /* Custom Vertical Scrollbar Styling */
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-background-700
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb:hover]:bg-background-600
            `, !hasResolvedSyntax && "[&_pre]:text-foreground-400 [&_span]:!text-inherit")}
          style={{
            overflowY: expanded ? 'auto' : 'hidden',
            maxHeight: !expanded ? `calc(${MAX_HEIGHT_LINES} * 1.5em + 2rem)` : undefined,
            maskImage: !expanded && shouldShowExpandButton ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' : 'none',
            WebkitMaskImage: !expanded && shouldShowExpandButton ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' : 'none',
          }}
        />

        {hasHorizontalOverflow && (
          <div
            ref={scrollTrackRef}
            onScroll={handleScrollTrack}
            className="flex-none w-full overflow-x-auto bg-background-950/50 backdrop-blur-sm"
          >
            <div style={{ width: dimensions.contentScrollWidth, height: '12px' }} />
          </div>
        )}

        {shouldShowExpandButton && !expanded && (
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
