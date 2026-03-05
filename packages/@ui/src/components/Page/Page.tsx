"use client"

import * as React from 'react';
import { cn, type StyleValue } from '@/lib/utils';
import { type StylesProp, createStylesResolver } from '@/lib/styles';
import { PageContext } from './page.context';
import { PageProps, PageContextValue, PagePadding } from './page.types';
import css from './Page.module.css';

export interface PageStyleSlots {
  root?: StyleValue;
}

export type PageStylesProp = StylesProp<PageStyleSlots>;

const resolvePageBaseStyles = createStylesResolver(['root'] as const);

interface PageRootProps extends PageProps {
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: PageStylesProp;
}

const paddingMap: Record<PagePadding, string> = {
  none: css.paddingNone,
  sm: css.paddingSm,
  md: css.paddingMd,
  lg: css.paddingLg,
  xl: css.paddingXl,
};

const PageRoot = React.forwardRef<HTMLDivElement, PageRootProps>(
  (
    {
      maxWidth = '1400px',
      padding = 'md',
      centered = true,
      fullscreen = false,
      className,
      children,
      styles: stylesProp, // Renamed to avoid conflict with the module import
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const contextValue: PageContextValue = {
      pageWidth: fullscreen ? undefined : maxWidth,
      isMobile,
      pageMaxWidth: fullscreen ? undefined : maxWidth,
      pagePadding: padding,
    };

    const paddingClass = paddingMap[padding];
    const { root: resolvedRoot } = resolvePageBaseStyles(stylesProp);

    return (
      <PageContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="main"
          className={cn(css.page, paddingClass, className, resolvedRoot)}
          data-centered={centered}
          data-fullscreen={fullscreen}
          style={
            {
              maxWidth: !fullscreen ? maxWidth : undefined,
              ...props.style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </PageContext.Provider>
    );
  }
);

PageRoot.displayName = 'Page';

export const Page = PageRoot;
