'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { codeToHtml } from "shiki";
import { transformerRenderIndentGuides } from "@shikijs/transformers";
import { Copy, Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from "./Code.module.css";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c] || c));

function generateFallbackHtml(code: string): string {
  return `<pre><code style="display: block; padding: 1rem">${escapeHtml(code)}</code></pre>`;
}

function useColorScheme(colorScheme: 'light' | 'dark' | 'system'): 'light' | 'dark' {
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const domTheme = document.documentElement.getAttribute('data-theme');
    if (domTheme === 'light' || domTheme === 'dark') return domTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (colorScheme !== 'system') return;

    const update = () => {
      const domTheme = document.documentElement.getAttribute('data-theme');
      if (domTheme === 'light' || domTheme === 'dark') {
        setSystemMode(domTheme);
      } else {
        setSystemMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      }
    };

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', update);
    };
  }, [colorScheme]);

  return colorScheme === 'system' ? systemMode : colorScheme;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button onClick={handleCopy} className={styles['copy-button']}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export interface CodeProps {
  children: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Additional CSS class names */
  className?: string;
  /** Filename displayed in the header bar */
  filename?: string;
  /** Custom heading text displayed in the header bar instead of filename */
  heading?: string;
  /** Shiki theme name or separate light/dark theme names */
  theme?: string | { light: string; dark: string };
  /** Color scheme used for theme selection; 'system' follows the page data-theme attribute */
  colorScheme?: 'light' | 'dark' | 'system';
  /** Pre-highlighted HTML string for light mode to skip client-side Shiki processing */
  preHighlightedLight?: string;
  /** Pre-highlighted HTML string for dark mode to skip client-side Shiki processing */
  preHighlightedDark?: string;
}

const MAX_HEIGHT_LINES = 20;

export function Code({
  children,
  language = "ts",
  className,
  filename,
  heading,
  theme,
  colorScheme = 'system',
  preHighlightedLight,
  preHighlightedDark,
}: CodeProps) {
  const mode = useColorScheme(colorScheme);

  const lightTheme = typeof theme === 'string' ? theme : (theme?.light ?? 'github-light');
  const darkTheme = typeof theme === 'string' ? theme : (theme?.dark ?? 'github-dark');
  const activeTheme = mode === 'light' ? lightTheme : darkTheme;

  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const [highlightedCode, setHighlightedCode] = useState<string>(() => {
    if (mode === 'light' && preHighlightedLight) return preHighlightedLight;
    if (mode === 'dark' && preHighlightedDark) return preHighlightedDark;
    if (preHighlightedLight) return preHighlightedLight;
    return generateFallbackHtml(children);
  });

  const [contentScrollWidth, setContentScrollWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalCodeLines, setTotalCodeLines] = useState(0);

  const handleScrollTrack = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      viewportRef.current.scrollLeft = scrollTrackRef.current.scrollLeft;
    }
  }, []);

  const handleScrollViewport = useCallback(() => {
    if (viewportRef.current && scrollTrackRef.current) {
      const diff = Math.abs(scrollTrackRef.current.scrollLeft - viewportRef.current.scrollLeft);
      if (diff > 1) scrollTrackRef.current.scrollLeft = viewportRef.current.scrollLeft;
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
    if (mode === 'light' && preHighlightedLight) { setHighlightedCode(preHighlightedLight); return; }
    if (mode === 'dark' && preHighlightedDark) { setHighlightedCode(preHighlightedDark); return; }

    const highlight = async () => {
      try {
        const html = await codeToHtml(children, {
          lang: language as any,
          theme: activeTheme,
          transformers: [transformerRenderIndentGuides()],
        });
        let styledHtml = html.replace(/<code>/, '<code style="display: block; padding: 1rem;">');
        styledHtml = styledHtml.replace(/background-color:\s*[^;]+;?/g, '');
        setHighlightedCode(styledHtml);
      } catch {
        setHighlightedCode(generateFallbackHtml(children));
      }
    };

    highlight();
  }, [children, language, mode, activeTheme, preHighlightedLight, preHighlightedDark]);

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
    setTotalCodeLines(children.split('\n').length);
  }, [children]);

  useEffect(() => {
    if (totalCodeLines > MAX_HEIGHT_LINES) {
      setIsExpanded(totalCodeLines - MAX_HEIGHT_LINES < 30);
    } else {
      setIsExpanded(false);
    }
  }, [totalCodeLines]);

  const hasHorizontalOverflow = contentScrollWidth > viewportWidth;
  const hiddenCodeLines = totalCodeLines - MAX_HEIGHT_LINES;
  const shouldShowExpandButton = totalCodeLines > MAX_HEIGHT_LINES && hiddenCodeLines >= 30;

  return (
    <div className={cn(styles['code'], className)}>
      {(filename || heading) && (
        <div className={styles.header}>
          <span>{heading || filename}</span>
          {!heading && <span className={styles['header-lang']}>{language}</span>}
        </div>
      )}

      <div className={styles.body}>
        <CopyButton code={children} />
        <div
          ref={viewportRef}
          onScroll={handleScrollViewport}
          onWheel={handleWheel}
          className={styles.viewport}
          style={{
            overflowY: isExpanded ? 'auto' : 'hidden',
            maskImage: !isExpanded && shouldShowExpandButton
              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
              : 'none',
            WebkitMaskImage: !isExpanded && shouldShowExpandButton
              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
              : 'none',
          }}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />

        {hasHorizontalOverflow && (
          <div ref={scrollTrackRef} onScroll={handleScrollTrack} className={styles['scroll-track']}>
            <div style={{ width: contentScrollWidth, height: '12px' }} />
          </div>
        )}

        {shouldShowExpandButton && !isExpanded && (
          <button onClick={() => setIsExpanded(true)} className={styles['expand-button']}>
            <ChevronDown size={14} className={styles['expand-icon']} />
            Show {hiddenCodeLines} more lines
          </button>
        )}
      </div>
    </div>
  );
}
