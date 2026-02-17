"use client"

import * as React from 'react';
import { cn } from '@/lib/utils';
import { PageContext } from './page.context';
import { PageProps, PageContextValue, PagePadding } from './page.types';
import styles from './Page.module.css';

const paddingMap: Record<PagePadding, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
  xl: styles.paddingXl,
};

const PageRoot = React.forwardRef<HTMLDivElement, PageProps>(
  (
    {
      maxWidth = '1400px',
      padding = 'md',
      centered = true,
      fullscreen = false,
      className,
      children,
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

    return (
      <PageContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="main"
          className={cn(styles.page, paddingClass, className)}
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
